'use strict';

ngObibaMica.search
  .controller('GraphicsResultController', [
    'GraphicChartsConfig',
    'GraphicChartsUtils',
    'RqlQueryService',
    '$filter',
    '$scope',
    'D3GeoConfig',
    'D3ChartConfig',
    function (GraphicChartsConfig,
      GraphicChartsUtils,
      RqlQueryService,
      $filter,
      $scope, D3GeoConfig, D3ChartConfig) {

      $scope.hasChartObjects = function () {
        return $scope.chartObjects && Object.keys($scope.chartObjects).length > 0;
      };

      var setChartObject = function (vocabulary, dtoObject, header, options, isTable) {

        return GraphicChartsUtils.getArrayByAggregation(vocabulary, dtoObject)
          .then(function (entries) {
            var data = entries.map(function (e) {
              if (e.participantsNbr && isTable) {
                return [e.title, e.value, e.participantsNbr];
              }
              else {
                return [e.title, e.value];
              }
            });

            if (data.length > 0) {
              data.unshift(header);

              return {
                data: data,
                entries: entries,
                options: options,
                vocabulary: vocabulary
              };
            }
          });

      };

      var charOptions = GraphicChartsConfig.getOptions().ChartsOptions;

      $scope.updateCriteria = function (key, vocabulary) {
        RqlQueryService.createCriteriaItem('study', 'Mica_study', vocabulary, key).then(function (item) {
          $scope.onUpdateCriteria(item, 'studies');
        });
      };

      $scope.$watch('result', function (result) {
        $scope.chartObjects = {};
        $scope.noResults = true;

        if (result && result.studyResultDto.totalHits) {
          $scope.noResults = false;
          setChartObject('populations-model-selectionCriteria-countriesIso',
            result.studyResultDto,
            [$filter('translate')(charOptions.geoChartOptions.header[0]), $filter('translate')(charOptions.geoChartOptions.header[1])],
            charOptions.geoChartOptions.options).then(function (geoStudies) {
              if (geoStudies) {
                var d3Config = new D3GeoConfig()
                  .withData(geoStudies.entries);
                angular.extend(geoStudies.options, { title: $filter('translate')(charOptions.geoChartOptions.title)});
                angular.extend(geoStudies.options, { subtitle: $filter('translate')(charOptions.geoChartOptions.subtitle)});
                d3Config.withColor(charOptions.geoChartOptions.options.colors);
                var chartObject = {
                  geoChartOptions: {
                    directiveTitle: geoStudies.options.title,
                    chartObject: {
                      title: geoStudies.options.title,
                      subtitle: geoStudies.options.subtitle,
                      options: geoStudies.options,
                      type: 'GeoChart',
                      vocabulary: geoStudies.vocabulary,
                      data: geoStudies.data,
                      entries: geoStudies.entries,
                      d3Config: d3Config,
                      sortedby:['title', 'value']
                    }
                  }
                };
                chartObject.geoChartOptions.getTable = function () {
                  return chartObject.geoChartOptions.chartObject;
                };
                angular.extend($scope.chartObjects, chartObject);
              }
            });
          // Study design chart.
          setChartObject('model-methods-design',
            result.studyResultDto,
            [$filter('translate')(charOptions.studiesDesigns.header[0]),
            $filter('translate')(charOptions.studiesDesigns.header[1])
            ],
            charOptions.studiesDesigns.options).then(function (methodDesignStudies) {
              if (methodDesignStudies) {
                var d3Config = new D3ChartConfig(methodDesignStudies.vocabulary)
                  .withType('multiBarHorizontalChart');
                d3Config.options.chart.showLegend = false;
                d3Config.options.chart.color = charOptions.numberParticipants.options.colors;
                var chartObject = {
                  studiesDesigns: {
                    directiveTitle: methodDesignStudies.options.title ,
                    headerTitle: $filter('translate')('graphics.study-design'),
                    chartObject: {
                      title: charOptions.studiesDesigns.title,
                      options: methodDesignStudies.options,
                      type: 'BarChart',
                      data: methodDesignStudies.data,
                      vocabulary: methodDesignStudies.vocabulary,
                      entries: methodDesignStudies.entries,
                      d3Config: d3Config,
                      sortedby: []
                    }
                  }
                };
                angular.extend($scope.chartObjects, chartObject);
              }
            });

          // Study design table.
          setChartObject('model-methods-design',
            result.studyResultDto,
            [$filter('translate')(charOptions.studiesDesigns.header[0]),
            $filter('translate')(charOptions.studiesDesigns.header[1]),
            $filter('translate')(charOptions.studiesDesigns.header[2]),
            $filter('translate')(charOptions.studiesDesigns.header[3])
            ],
            charOptions.studiesDesigns.options, true).then(function (methodDesignStudies) {
              if (methodDesignStudies) {
                var chartObject = {
                  chartObjectTable: {
                    title: charOptions.studiesDesigns.title,
                    options: methodDesignStudies.options,
                    type: 'BarChart',
                    data: methodDesignStudies.data,
                    vocabulary: methodDesignStudies.vocabulary,
                    entries: methodDesignStudies.entries,
                    sortedby: []
                  }

                };
                chartObject.getTable = function () {
                  return chartObject.chartObjectTable;
                };
                angular.extend($scope.chartObjects.studiesDesigns, chartObject);
              }
            });

          setChartObject('model-numberOfParticipants-participant-number-range',
            result.studyResultDto,
            [$filter('translate')(charOptions.numberParticipants.header[0]), $filter('translate')(charOptions.numberParticipants.header[1])],
            charOptions.numberParticipants.options).then(function (numberParticipant) {
              if (numberParticipant) {
                var chartConfig = new D3ChartConfig(numberParticipant.vocabulary)
                  .withType('pieChart')
                  .withData(angular.copy(numberParticipant.entries), true);
                chartConfig.options.chart.legendPosition = 'right';
                chartConfig.options.chart.color = charOptions.numberParticipants.options.colors;
                var chartObject = {
                  numberParticipants: {
                    headerTitle: $filter('translate')('graphics.number-participants'),
                    chartObject: {
                      title: charOptions.numberParticipants.title,
                      options: numberParticipant.options,
                      type: 'PieChart',
                      data: numberParticipant.data,
                      vocabulary: numberParticipant.vocabulary,
                      entries: numberParticipant.entries,
                      d3Config: chartConfig,
                      sortedby: []
                    }
                  }
                };
                chartObject.numberParticipants.getTable = function () {
                  return chartObject.numberParticipants.chartObject;
                };
                angular.extend($scope.chartObjects, chartObject);
              }
            });

          setChartObject('populations-dataCollectionEvents-model-bioSamples',
            result.studyResultDto,
            [$filter('translate')(charOptions.biologicalSamples.header[0]), $filter('translate')(charOptions.biologicalSamples.header[1])],
            charOptions.biologicalSamples.options).then(function (bioSamplesStudies) {
              if (bioSamplesStudies) {
                var d3Config = new D3ChartConfig(bioSamplesStudies.vocabulary)
                  .withType('multiBarHorizontalChart')
                  .withData(angular.copy(bioSamplesStudies.entries), false, $filter('translate')('graphics.nbr-studies'));
                d3Config.options.chart.showLegend = false;
                d3Config.options.chart.color = charOptions.numberParticipants.options.colors;
                var chartObject = {
                  biologicalSamples: {
                    headerTitle: $filter('translate')('graphics.bio-samples'),
                    chartObject: {
                      title: charOptions.biologicalSamples.title,
                      options: bioSamplesStudies.options,
                      type: 'BarChart',
                      data: bioSamplesStudies.data,
                      vocabulary: bioSamplesStudies.vocabulary,
                      entries: bioSamplesStudies.entries,
                      d3Config: d3Config,
                      sortedby: []
                    }
                  }
                };
                chartObject.biologicalSamples.getTable = function () {
                  return chartObject.biologicalSamples.chartObject;
                };
                angular.extend($scope.chartObjects, chartObject);
              }
            });
          $scope.dtosResult = result;
        }
      });
    }])

  .directive('graphicsResult', [function () {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        result: '=',
        loading: '=',
        onUpdateCriteria: '='
      },
      controller: 'GraphicsResultController',
      templateUrl: 'search/components/result/graphics-result/component.html'
    };
  }]);