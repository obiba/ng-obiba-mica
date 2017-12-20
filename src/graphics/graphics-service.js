/*
 * Copyright (c) 2017 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

ngObibaMica.graphics
  .factory('GraphicChartsDataResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
      var resourceUrl = ngObibaMicaUrl.getUrl('JoinQuerySearchResource');
      var method = resourceUrl.indexOf(':query') === -1 ? 'POST' : 'GET';
      var contentType = method === 'POST' ? 'application/x-www-form-urlencoded' : 'application/json';
      var requestTransformer = function(obj) {
        var str = [];
        for(var p in obj) {
          str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        }
        return str.join('&');
      };
      return $resource(resourceUrl, {}, {
        'studies': {
          method: method,
          headers: {
            'Content-Type': contentType
          },
          errorHandler: true,
          params: {type: 'studies'},
          transformRequest : requestTransformer
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
  .service('GraphicChartsUtils', ['LocalizedValues', 'TaxonomyResource', 'VocabularyService', '$q', '$translate',
    function (LocalizedValues, TaxonomyResource, VocabularyService, $q, $translate) {
      var studyTaxonomy = {};

      studyTaxonomy.getTerms = function (aggregationName) {
        var deferred = $q.defer();

        function getTerms() {
          var terms = null;
          if (studyTaxonomy.vocabularies){
            angular.forEach(studyTaxonomy.vocabularies, function (vocabulary) {
              if (VocabularyService.vocabularyAlias(vocabulary) === aggregationName) {
                terms = vocabulary.terms;
              }
            });
          }

          deferred.resolve(terms);
        }

        if (!studyTaxonomy.vocabularies) {
          TaxonomyResource.get({
            target: 'study',
            taxonomy: 'Mica_study'
          }).$promise.then(function(taxonomy){
            studyTaxonomy.vocabularies = angular.copy(taxonomy.vocabularies);
            getTerms();
          });

        } else {
          getTerms();
        }

        return deferred.promise;
      };

      this.getArrayByAggregation = function (aggregationName, entityDto) {
        var deferred = $q.defer();

        if (!aggregationName || !entityDto) {
          deferred.resolve([]);
        }

        var arrayData = [];
        studyTaxonomy.getTerms(aggregationName).then(function(terms) {
          var sortedTerms = terms;
          var i = 0;
          angular.forEach(entityDto.aggs, function (aggregation) {
            if (aggregation.aggregation === aggregationName) {
              if (aggregation['obiba.mica.RangeAggregationResultDto.ranges']) {
                i = 0;
                angular.forEach(sortedTerms, function (sortTerm) {
                  angular.forEach(aggregation['obiba.mica.RangeAggregationResultDto.ranges'], function (term) {
                    if (sortTerm.name === term.key) {
                      if (term.count) {
                        arrayData[i] = {title: LocalizedValues.forLocale(sortTerm.title, $translate.use()), value: term.count, key: term.key};
                        i++;
                      }
                    }
                  });
                });
              }
              else {
                // MK-924 sort countries by title in the display language
                if (aggregation.aggregation === 'populations-model-selectionCriteria-countriesIso') {
                  var locale = $translate.use();
                  sortedTerms.sort(function(a, b) {
                    var textA = LocalizedValues.forLocale(a.title, locale);
                    var textB = LocalizedValues.forLocale(b.title, locale);
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                  });
                }
                var numberOfParticipant = 0;
                i = 0;
                angular.forEach(sortedTerms, function (sortTerm) {
                  angular.forEach(aggregation['obiba.mica.TermsAggregationResultDto.terms'], function (term) {
                    if (sortTerm.name === term.key) {
                      if (term.count) {
                        if (aggregation.aggregation === 'model-methods-design') {

                          angular.forEach(term.aggs, function (aggBucket) {
                            if (aggBucket.aggregation === 'model-numberOfParticipants-participant-number') {
                              var aggregateBucket = aggBucket['obiba.mica.StatsAggregationResultDto.stats'];
                              numberOfParticipant = LocalizedValues.formatNumber(aggregateBucket ? aggregateBucket.data.sum : 0);
                            }
                          });
                          arrayData[i] = {
                            title: LocalizedValues.forLocale(sortTerm.title, $translate.use()),
                            value: term.count,
                            participantsNbr: numberOfParticipant,
                            key: term.key
                          };
                        } else {
                          arrayData[i] = {title: LocalizedValues.forLocale(sortTerm.title, $translate.use()), value: term.count, key: term.key};
                        }
                        i++;
                      }
                    }
                  });
                });
              }
            }
          });
          
          deferred.resolve(arrayData);
        });
        return deferred.promise;
      };
    }])

  .service('GraphicChartsQuery', ['RqlQueryService', 'RqlQueryUtils','$translate', function (RqlQueryService, RqlQueryUtils, $translate) {
    this.queryDtoBuilder = function (entityIds, entityType) {
      var query;
      if (!(entityIds) || entityIds === 'NaN') {
        query =  'study(exists(Mica_study.id))';
      }
      if(entityType && entityIds !== 'NaN') {
        query =  entityType + '(in(Mica_'+ entityType +'.id,(' + entityIds + ')))';
      }
      var localizedRqlQuery = angular.copy(RqlQueryService.parseQuery(query));
      RqlQueryUtils.addLocaleQuery(localizedRqlQuery, $translate.use());
      var localizedQuery = new RqlQuery().serializeArgs(localizedRqlQuery.args);
      return RqlQueryService.prepareGraphicsQuery(localizedQuery,
        ['Mica_study.populations-selectionCriteria-countriesIso', 'Mica_study.populations-dataCollectionEvents-bioSamples', 'Mica_study.numberOfParticipants-participant-number'],
        ['Mica_study.methods-design']
      );
    };
  }]);
