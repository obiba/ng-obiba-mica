/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

ngObibaMica.graphics

  .controller('GraphicChartsController', [
    '$rootScope',
    '$scope',
    '$filter',
    '$window',
    'GraphicChartsConfig',
    'GraphicChartsUtils',
    'GraphicChartsData',
    'RqlQueryService',
    'ngObibaMicaUrl',
    'LocalizedValues',
    function ($rootScope,
              $scope,
              $filter,
              $window,
              GraphicChartsConfig,
              GraphicChartsUtils,
              GraphicChartsData,
              RqlQueryService,
              ngObibaMicaUrl,
              LocalizedValues) {
      var graphOptions =  GraphicChartsConfig.getOptions();

      function updateTableData(graphOptions){
        $scope.chartObject.ordered = graphOptions.ChartsOptions[$scope.chartConfig.chartType].ordered;
        $scope.chartObject.notOrdered = graphOptions.ChartsOptions[$scope.chartConfig.chartType].notOrdered;
        $scope.chartObject.sortedby = graphOptions.ChartsOptions[$scope.chartConfig.chartType].sortedby;
        $scope.chartObject.getTable= function(){
          return $scope.chartObject.data;
        };
        if($scope.chartObject.sortedby.length > 0){
          $scope.sort = {
            sortingOrder : $scope.chartObject.sortedby[0],
            reverse : false
          };
          if ($scope.sort.sortingOrder !== '' && $scope.chartObject.ordered) {
            $scope.chartObject.entries = Object.keys($scope.chartObject.entries).map(function(key){
              return $scope.chartObject.entries[key];
            });
            $scope.chartObject.entries = $filter('orderBy')($scope.chartObject.entries, $scope.sort.sortingOrder, $scope.sort.reverse);
          }
        }
        else{
          $scope.sort = {
            sortingOrder : false,
            reverse : false
          };
        }
      }

      $scope.changeSorting = function (column) {
        if($scope.chartObject.sortedby.length > 0) {
          var sort = $scope.sort;
          if (sort.sortingOrder === column) {
            sort.reverse = !$scope.sort.reverse;
          } else {
            sort.sortingOrder = column;
            sort.reverse = false;
          }
          $scope.sort = sort;
        }
      };
      $scope.columnOrderClass = function (column) {
        if($scope.chartObject.sortedby.length > 0) {
          if (column === $scope.sort.sortingOrder) {
            return ('fa fa-chevron-' + (($scope.sort.reverse) ? 'down' : 'up'));
          } else {
            return 'fa fa-sort';
          }
        }
      };
      $scope.localizedNumber = function (number){
        return LocalizedValues.formatNumber(number);
      };

      $scope.updateCriteria = function(key, vocabulary) {
        RqlQueryService.createCriteriaItem('study', 'Mica_study', vocabulary, key).then(function (item) {
          var entity = graphOptions.entityType;
          var id = graphOptions.entityIds;
          var parts = item.id.split('.');
          var urlRedirect;
          if(entity && id){
            urlRedirect = ngObibaMicaUrl.getUrl('SearchBaseUrl') +
              '?type=studies&query=' +
              entity + '(in(Mica_' + entity + '.id,' + id + '))' +
              ((typeof parts[2] !== 'undefined')?
                ',study(in(' + parts[0] + '.' + parts[1] + ',' + parts[2].replace(':', '%253A'):
                ',study(exists(' + parts[0] + '.' + parts[1]) +
              '))';
            $window.location.href = ngObibaMicaUrl.getUrl('BaseUrl') + urlRedirect;
          }
          else{
            $scope.onUpdateCriteria(item, 'studies');
          }
        });
      };

      $scope.ready = true;
      $scope.chartObject = [];
      if($scope.chartStudiesData){
        GraphicChartsUtils.initializeChartData($scope.chartStudiesData.studyResultDto, graphOptions.ChartsOptions, $scope.chartAggregationName, $scope.chartConfig, $scope.chartType).then(function(returnedScope){
          angular.extend($scope.chartObject, returnedScope.chartObject);
          if (/^Table-/.exec($scope.chartType) !== null) {
            updateTableData(graphOptions);
          }
        });
      }
      else{
        $scope.__defineSetter__('chartAggregationName', function(value) {
          if (value) {
            $scope._chartAggregationName = value;
            GraphicChartsData.getData(function (resultDto) {
              if (resultDto) {
                GraphicChartsUtils.initializeChartData(resultDto.studyResultDto, graphOptions.ChartsOptions, $scope.chartAggregationName, $scope.chartConfig, $scope.chartType ).then(function(returnScope){
                  angular.extend($scope.chartObject, returnScope.chartObject);
                  if (/^Table-/.exec($scope.chartType) !== null) {
                    updateTableData(graphOptions);
                  }
                });
              }
            });
          }
        });
        $scope.__defineGetter__('chartAggregationName', function() {
          return $scope._chartAggregationName;
        });
      }

    }]);
