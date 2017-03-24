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

angular.module('obiba.mica.graphics')

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
    'D3GeoConfig', 'D3ChartConfig',  
    function ($rootScope,
              $scope,
              $filter,
              $window,
              GraphicChartsConfig,
              GraphicChartsUtils,
              GraphicChartsData,
              RqlQueryService,
              ngObibaMicaUrl,
              D3GeoConfig, D3ChartConfig) {

      function initializeChartData() {
        $scope.chartObject = {};
        GraphicChartsData.getData(function (StudiesData) {
          if (StudiesData) {
            GraphicChartsUtils.getArrayByAggregation($scope.chartAggregationName, StudiesData[$scope.chartEntityDto])
              .then(function(entries){

                var data = entries.map(function(e) {
                  if(e.participantsNbr) {
                    return [e.title, e.value, e.participantsNbr];
                  }
                  else{
                    return [e.title, e.value];
                  }
                });


                $scope.updateCriteria = function(key, vocabulary) {
                  RqlQueryService.createCriteriaItem('study', 'Mica_study', vocabulary, key).then(function (item) {
                    var entity = GraphicChartsConfig.getOptions().entityType;
                    var id = GraphicChartsConfig.getOptions().entityIds;
                    var parts = item.id.split('.');

                    var urlRedirect = ngObibaMicaUrl.getUrl('GraphicsSearchRootUrl') + '?type=studies&query=' +
                      entity + '(in(Mica_' + entity + '.id,' + id + ')),study(in(' + parts[0] + '.' + parts[1] + ',' +
                      parts[2].replace(':', '%253A') + '))';

                    $window.location.href = ngObibaMicaUrl.getUrl('BaseUrl') + urlRedirect;
                  });
                };

                if (data) {
                  if (/^Table-/.exec($scope.chartType) !== null) {
                    $scope.chartObject.ordered = $scope.chartOrdered;
                    $scope.chartObject.notOrdered = $scope.chartNotOrdered;
                    if($scope.chartHeader.length<3){
                      $scope.chartObject.header = [
                        $filter('translate')($scope.chartHeader[0]),
                        $filter('translate')($scope.chartHeader[1])
                      ];
                    }
                    else{
                      $scope.chartObject.header = [
                        $filter('translate')($scope.chartHeader[0]),
                        $filter('translate')($scope.chartHeader[1]),
                        $filter('translate')($scope.chartHeader[2])
                      ];
                    }
                    $scope.chartObject.type = $scope.chartType;
                    $scope.chartObject.data = data;
                    $scope.chartObject.vocabulary = $scope.chartAggregationName;
                    $scope.chartObject.entries = entries;
                    $scope.chartObject.getTable= function(){
                      return $scope.chartObject;
                    };
                  }
                  else {
                    if($scope.chartHeader.length<3){
                      data.unshift([$filter('translate')($scope.chartHeader[0]), $filter('translate')($scope.chartHeader[1])]);
                    }
                    else{
                      data.map(function(item){
                        item.pop();
                        return item;
                      });
                      data.unshift([
                        $filter('translate')($scope.chartHeader[0]),
                        $filter('translate')($scope.chartHeader[1])
                      ]);
                    }
                    $scope.chartObject.term = true;
                    $scope.chartObject.type = $scope.chartType;
                    $scope.chartObject.data = data;
                    $scope.chartObject.options = {backgroundColor: {fill: 'transparent'}};
                    angular.extend($scope.chartObject.options, $scope.chartOptions);
                    $scope.chartObject.options.title = $filter('translate')($scope.chartTitleGraph) + ' (N=' + StudiesData.studyResultDto.totalHits + ')';
                    $scope.$parent.directive = {title: $scope.chartObject.options.title};
                  }
                }
                
                if ($scope.chartType === 'GeoChart') {
                  $scope.chartObject.d3Config = new D3GeoConfig().withData(entries).withTitle($scope.chartObject.options.title);
                  if ($scope.chartObject.options && $scope.chartObject.options.colorAxis && $scope.chartObject.options.colorAxis.colors) {
                    $scope.chartObject.d3Config.withColor($scope.chartObject.options.colorAxis.colors);
                  }
                } else {

                  $scope.chartObject.d3Config = new D3ChartConfig($scope.chartAggregationName).withType($scope.chartType === 'PieChart' ? 'pieChart' : 'multiBarHorizontalChart')
                      .withData(entries, $scope.chartType === 'PieChart', $filter('translate')('graphics.nbr-studies'))
                      .withTitle($filter('translate')($scope.chartTitleGraph) + ' (N=' + StudiesData.studyResultDto.totalHits + ')');

                  if ($scope.chartType !== 'PieChart') {
                    $scope.chartObject.d3Config.options.chart.showLegend = false;
                  }

                  if ($scope.chartObject.options && $scope.chartObject.options.colors) {
                    $scope.chartObject.d3Config.options.chart.color = $scope.chartOptions.colors;
                  }
                  $scope.chartObject.d3Config.options.chart.legendPosition = 'right';
                  $scope.chartObject.d3Config.options.chart.legend = {margin : {
                    top: 0,
                    right:10,
                    bottom: 0,
                    left: 0
                  }};
                }
              });
          }
        });

      }

      $scope.ready = true;

      $scope.$watch('chartAggregationName', function() {
        if ($scope.chartAggregationName) {
          initializeChartData();
        }
      });

    }]);
