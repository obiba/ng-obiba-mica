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
    'D3GeoConfig',
    'D3ChartConfig',
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
              D3GeoConfig,
              D3ChartConfig,
              LocalizedValues) {

      function initializeChartData(StudiesData, chartAggregationName) {
        $scope.chartObject = {};
        if($scope.chartEntityDto){
            GraphicChartsUtils.getArrayByAggregation(chartAggregationName, StudiesData[$scope.chartEntityDto])
              .then(function(entries){

                var data = entries.map(function(e) {
                  if(e.participantsNbr) {
                    return [e.title, e.value, e.participantsNbr, e.perc];
                  }
                  else{
                    return [e.title, e.value];
                  }
                });

                if (data) {
                  if (/^Table-/.exec($scope.chartType) !== null) {
                    $scope.chartObject.ordered = $scope.chartOrdered;
                    $scope.chartObject.notOrdered = $scope.chartNotOrdered;
                    $scope.chartObject.sortedby = $scope.chartSortedby;
                    if($scope.chartHeader.length<3){
                      $scope.chartObject.header = {
                        title: $filter('translate')($scope.chartHeader[0]),
                        value: $filter('translate')($scope.chartHeader[1])
                    };
                    }
                    else{
                      $scope.chartObject.header = {
                        title: $filter('translate')($scope.chartHeader[0]),
                        value: $filter('translate')($scope.chartHeader[1]),
                        key: $filter('translate')($scope.chartHeader[2]),
                        perc: $filter('translate')($scope.chartHeader[3])
                      };
                      if(entries.length>1){
                          entries.push(entries.reduce(function (a, b){
                            return {
                              title: $filter('translate')('total'),
                              value: a.value + b.value,
                              participantsNbr:  parseFloat(a.participantsNbr) + parseFloat(b.participantsNbr),
                              key: '-',
                              perc: (parseFloat(a.perc) + parseFloat(b.perc)).toFixed(2)
                            };
                          }));
                        }
                      }
                    $scope.chartObject.type = $scope.chartType;
                    $scope.chartObject.data = data;
                    $scope.chartObject.vocabulary = $scope.chartAggregationName;
                    $scope.chartObject.entries = entries;
                    $scope.chartObject.getTable= function(){
                      return $scope.chartObject;
                    };
                    if($scope.chartObject.sortedby.length > 0){
                      $scope.sort = {
                        sortingOrder : $scope.chartObject.sortedby[0],
                        reverse : false
                      };
                      if ($scope.sort.sortingOrder !== '') {
                        $scope.chartObject.entries = Object.keys($scope.chartObject.entries).map(function(key){
                          return $scope.chartObject.entries[key];
                        });
                        $scope.chartObject.entries = $filter('orderBy')(entries, $scope.sort.sortingOrder, $scope.sort.reverse);
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
                        }
                      };
                      $scope.selectedCls2 = function (column) {
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
                    $scope.chartObject.options.subtitle = $filter('translate')($scope.chartSubtitleGraph);
                    $scope.$parent.directive = {
                      title: $scope.chartObject.options.title,
                      subtitle: $scope.chartObject.options.subtitle
                  };
                  $scope.chartObject.d3Config = new D3GeoConfig().withData(entries)
                    .withTitle($scope.chartObject.options.title)
                    .withSubtitle($scope.chartObject.options.subtitle);
                  if ($scope.chartObject.options ) {
                    $scope.chartObject.d3Config.withColor($scope.chartOptions.colors);
                  }
                } else {

                  $scope.chartObject.d3Config = new D3ChartConfig(chartAggregationName).withType($scope.chartType === 'PieChart' ? 'pieChart' : 'multiBarHorizontalChart')
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

      }

      $scope.updateCriteria = function(key, vocabulary) {
        RqlQueryService.createCriteriaItem('study', 'Mica_study', vocabulary, key).then(function (item) {
          var entity = GraphicChartsConfig.getOptions().entityType;
          var id = GraphicChartsConfig.getOptions().entityIds;
          var parts = item.id.split('.');
          var urlRedirect = ngObibaMicaUrl.getUrl('SearchBaseUrl') + '?type=studies&query=' +
            entity + '(in(Mica_' + entity + '.id,' + id + ')),study(in(' + parts[0] + '.' + parts[1] + ',' +
            parts[2].replace(':', '%253A') + '))';

          $window.location.href = ngObibaMicaUrl.getUrl('BaseUrl') + urlRedirect;
        });
      };

      $scope.ready = true;

      if($scope.chartStudiesData){
        initializeChartData($scope.chartStudiesData, $scope.chartAggregationName);
      }
      else{
        $scope.$watch('chartAggregationName', function() {
          if ($scope.chartAggregationName) {
            GraphicChartsData.getData(function (StudiesData) {
              if (StudiesData) {
                initializeChartData(StudiesData, $scope.chartAggregationName);
              }
            });
          }
        });
      }

    }]);
