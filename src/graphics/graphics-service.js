/*
 * Copyright (c) 2014 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

angular.module('obiba.mica.graphics')
  .factory('GraphicChartsDataResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
      return $resource(ngObibaMicaUrl.getUrl('JoinQuerySearchResource'), {}, {
        'studies': {
          method: 'GET',
          errorHandler: true,
          params: {type: 'studies'}
        }
      });
    }])
  .service('GraphicChartsConfig', function () {
    var factory = {
      options: {
        entityIds: 'NaN',
        entityType: null,
        ChartsOptions: {
          geoChartOptions: {
            header : ['graphics.country', 'graphics.nbr-studies'],
            title : 'graphics.geo-chart-title',
            options: {
              backgroundColor: {fill: 'transparent'},
              colors: [
                '#e5edfb',
                '#cfddf5',
                '#b8cbed',
                '#a0b8e2',
                '#88a4d4'
              ]
            }
          },
          studiesDesigns: {
            header: ['graphics.study-design', 'graphics.nbr-studies', 'graphics.number-participants'],
            title : 'graphics.study-design-chart-title',
            options: {
              bars: 'horizontal',
              series: {
                0: { axis: 'nbrStudies' }, // Bind series 1 to an axis
                1: { axis: 'nbrParticipants' } // Bind series 0 to an axis
              },
              axes: {
                x: {
                  nbrStudies: {side: 'top', label: 'Number of Studies'}, // Top x-axis.
                  nbrParticipants: {label: 'Number of Participants'} // Bottom x-axis.
                }
              },
              backgroundColor: {fill: 'transparent'},
              colors: ['#b8cbed',
                '#e5edfb',
                '#cfddf5',
                '#a0b8e2',
                '#88a4d4']
            }
          },
          numberParticipants: {
            header: ['graphics.number-participants', 'graphics.nbr-studies'],
            title: 'graphics.number-participants-chart-title',
            options: {
              backgroundColor: {fill: 'transparent'},
              colors: ['#b8cbed',
                '#e5edfb',
                '#cfddf5',
                '#a0b8e2',
                '#88a4d4'],
              pieSliceTextStyle: {color: '#000000'}
            }
          },
          biologicalSamples: {
            header : ['graphics.bio-samples', 'graphics.nbr-studies'],
            title : 'graphics.bio-samples-chart-title',
            options: {
              bars: 'horizontal',
              series: {
                0: { axis: 'nbrStudies' } // Bind series 1 to an axis
              },
              axes: {
                x: {
                  nbrStudies: {side: 'top', label: 'Number of Studies'} // Top x-axis.
                }
              },
              backgroundColor: {fill: 'transparent'},
              colors: ['#b8cbed',
                '#e5edfb',
                '#cfddf5',
                '#a0b8e2',
                '#88a4d4']
            }
          }

        }

      }
    };
    factory.setOptions = function (newOptions) {
      if (typeof(newOptions) === 'object') {
        Object.keys(newOptions).forEach(function (option) {
          if (option in factory.options) {
            factory.options[option] = newOptions[option];
          }
        });
      }
    };

    factory.getOptions = function () {
      return angular.copy(factory.options);
    };
    return factory;

  })
  .service('GraphicChartsUtils', ['LocalizedValues',
    function (LocalizedValues) {
      this.getArrayByAggregation = function (aggregationName, entityDto) {
        var arrayData = [];
        var others = null;
        if (!entityDto) {
          return arrayData;
        }
        var i = 0;
        angular.forEach(entityDto.aggs, function (aggregation) {
          if (aggregation.aggregation === aggregationName) {
            if (aggregation['obiba.mica.RangeAggregationResultDto.ranges']) {
              i = 0;
              angular.forEach(aggregation['obiba.mica.RangeAggregationResultDto.ranges'], function (term) {
                if (term.count) {
                  arrayData[i] = {title: term.title, value: term.count, key: term.key};
                  i++;
                }
              });
            }
            else {
              if (aggregation.aggregation === 'methods-designs') {
                var numberOfParticipant = 0;
                i = 0;
                others = null;
                angular.forEach(aggregation['obiba.mica.TermsAggregationResultDto.terms'], function (term) {
                  angular.forEach(term.aggs, function (aggBucket) {
                    if (aggBucket.aggregation === 'numberOfParticipants-participant-number') {
                      numberOfParticipant = LocalizedValues.formatNumber(aggBucket['obiba.mica.StatsAggregationResultDto.stats'].data.sum);
                    }
                  });
                  if (term.count) {
                    if(term.key !== 'others') {
                      arrayData[i] = {
                        title: term.title,
                        value: term.count,
                        participantsNbr: numberOfParticipant,
                        key: term.key
                      };
                      i++;
                    }
                    else{
                      others = {
                        title: term.title,
                        value: term.count,
                        participantsNbr: numberOfParticipant,
                        key: term.key
                      };
                    }
                  }
                });
                if(others){
                  arrayData[i] = others;
                }
              }
              else {
                i = 0;
                others = null;
                angular.forEach(aggregation['obiba.mica.TermsAggregationResultDto.terms'], function (term) {
                  if (term.count) {
                    if(term.key !== 'others'){
                    arrayData[i] = {title: term.title, value: term.count, key: term.key};
                      i++;
                    }
                    else{
                      others = {title: term.title, value: term.count, key: term.key};
                    }
                  }
                });
                if(others){
                  arrayData[i] = others;
                }
              }
            }
          }
        });
        return arrayData;
      };
    }])
  .service('GraphicChartsQuery', ['RqlQueryService', 'RqlQueryUtils','LocalizedValues', function (RqlQueryService, RqlQueryUtils,LocalizedValues) {
    this.queryDtoBuilder = function (entityIds, entityType) {
      var query;
      if (!(entityIds) || entityIds === 'NaN') {
        query =  'study(exists(Mica_study.id))';
      }
      if(entityType && entityIds !== 'NaN') {
        query =  entityType + '(in(Mica_'+ entityType +'.id,(' + entityIds + ')))';
      }
      var localizedRqlQuery = angular.copy(new RqlParser().parse(query));
      RqlQueryUtils.addLocaleQuery(localizedRqlQuery, LocalizedValues.getLocal());
      var localizedQuery = new RqlQuery().serializeArgs(localizedRqlQuery.args);
      return RqlQueryService.prepareGraphicsQuery(localizedQuery,
        ['Mica_study.populations-selectionCriteria-countriesIso', 'Mica_study.populations-dataCollectionEvents-bioSamples', 'Mica_study.numberOfParticipants-participant-number'],
        ['Mica_study.methods-designs']
      );
    };
  }]);
