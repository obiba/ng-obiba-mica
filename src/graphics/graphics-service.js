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
  .factory('GraphicChartsGetData', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
      return $resource(ngObibaMicaUrl.getUrl('getStudiesStatistics'), {}, {
        'get': {method: 'GET', errorHandler: true}
      });
    }])
  .service('GraphicChartsConfig', function () {
    var factory = {
      options: {
        IdNetworks: 'NaN',
        ChartsOptions: {
          geoChartOptions: {
            header: null,
            type: 'GeoChart',
            options: {
              title: null
            }
          },
          recruitmentResources: {
            header: null,
            options: {
              title: null,
              colors: ['#006600', '#009900', '#009966', '#009933', '#66CC33'],
              width: 500,
              height: 300
            }
          },
          studiesDesigns: {
            header: null,
            options: {
              title: null,
              colors: ['#006600', '#009900', '#009966', '#009933', '#66CC33'],
              width: 500,
              height: 300
            }
          },
          biologicalSamples: {
            header: null,
            options: {
              title: null,
              colors: ['#006600', '#009900', '#009966', '#009933', '#66CC33'],
              width: 500,
              height: 300
            }
          },
          access: {
            header: null,
            options: {
              title: null,
              colors: ['#006600', '#009900', '#009966', '#009933', '#66CC33'],
              width: 500,
              height: 300
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
  .service('GraphicChartsUtils', [
    'CountriesIsoUtils',
    'LocalizedStringService',
    function (CountriesIsoUtils,
              LocalizedStringService) {

      this.getArrayByAggregation = function (AggregationName, EntityDto, fieldTransformer) {
        var ArrayData = [];
        angular.forEach(EntityDto.aggs, function (aggragation) {
          var itemName = [];
          if (aggragation.aggregation === AggregationName) {
            var i = 0;
            angular.forEach(aggragation['obiba.mica.TermsAggregationResultDto.terms'], function (term) {
              switch (fieldTransformer) {
                case 'country' :
                  itemName.name = CountriesIsoUtils.findByCode(term.title.toUpperCase(), LocalizedStringService.getLocal());
                  break;
                default :
                  itemName.name = term.title;
                  break;
              }
              if (term.count) {
                ArrayData[i] = [itemName.name, term.count];
                i ++;
              }
            });
          }
        });
        return ArrayData;
      };
    }]);
