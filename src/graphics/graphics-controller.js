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
  .controller('GraphicGeoChartsController', [
    '$rootScope',
    '$scope',
    '$filter',
    'GraphicChartsConfig',
    'GraphicChartsUtils',
    'GraphicChartsData',
    function ($rootScope,
              $scope,
              $filter,
              GraphicChartsConfig,
              GraphicChartsUtils,
              GraphicChartsData) {

      var geoChartConfig = GraphicChartsConfig.getOptions();
      GraphicChartsData.getData(function (StudiesByCountriesData) {
        if (StudiesByCountriesData) {
          $scope.ItemDataJSon = GraphicChartsUtils.getArrayByAggregation('populations-selectionCriteria-countriesIso', StudiesByCountriesData.studyResultDto, 'country');
          $scope.ItemDataJSon.unshift(geoChartConfig.GeoChartOptions.header);
          if ($scope.ItemDataJSon) {
            $scope.geoChartObject = {};
            $scope.geoChartObject.type = 'GeoChart';
            $scope.geoChartObject.data = $scope.ItemDataJSon;
            $scope.geoChartObject.options = {backgroundColor: {fill: 'transparent'}};
            angular.extend($scope.geoChartObject.options, geoChartConfig.GeoChartOptions.options);
          }
        }
      });

    }])

  .controller('GraphicRecruitmentResourcesChartsController', [
    '$rootScope',
    '$scope',
    'GraphicChartsConfig',
    'GraphicChartsUtils',
    'GraphicChartsData',
    function ($rootScope,
              $scope,
              GraphicChartsConfig,
              GraphicChartsUtils,
              GraphicChartsData) {

      var piChartConfig = GraphicChartsConfig.getOptions();
      GraphicChartsData.getData(function (RecruitmentResourcesData) {
        if (RecruitmentResourcesData) {
          var ItemDataJSon = GraphicChartsUtils.getArrayByAggregation('populations-recruitment-dataSources', RecruitmentResourcesData.studyResultDto);
          ItemDataJSon.unshift(piChartConfig.ChartsOptions.recruitmentResources.header);
          $scope.chartObject = {};
          $scope.chartObject.options = {};
          $scope.chartObject.type = 'PieChart';
          $scope.chartObject.data = ItemDataJSon;
          $scope.chartObject.options = {backgroundColor: {fill: 'transparent'}};
          angular.extend($scope.chartObject.options, piChartConfig.ChartsOptions.recruitmentResources.options);
          $scope.chartObject.options.title = $scope.chartObject.options.title + ' (N=' + RecruitmentResourcesData.studyResultDto.totalHits + ')';

        } else {
          $scope.chartObject = {};
        }
      });

    }])

  .controller('GraphicStudyDesignChartsController', [
    '$rootScope',
    '$scope',
    'GraphicChartsConfig',
    'GraphicChartsUtils',
    'GraphicChartsData',
    function ($rootScope,
              $scope,
              GraphicChartsConfig,
              GraphicChartsUtils,
              GraphicChartsData) {

      var piChartConfig = GraphicChartsConfig.getOptions();
      GraphicChartsData.getData(function (StudiesDesignData) {
          if (StudiesDesignData) {
            var ItemDataJSon = GraphicChartsUtils.getArrayByAggregation('methods-designs', StudiesDesignData.studyResultDto);
            ItemDataJSon.unshift(piChartConfig.ChartsOptions.studyDesign.header);
            $scope.chartObject = {};
            $scope.chartObject.options = {};
            $scope.chartObject.type = 'PieChart';
            $scope.chartObject.data = ItemDataJSon;
            $scope.chartObject.options = {backgroundColor: {fill: 'transparent'}};
            angular.extend($scope.chartObject.options,piChartConfig.ChartsOptions.studyDesign.options );
            $scope.chartObject.options.title = $scope.chartObject.options.title + ' (N=' + StudiesDesignData.studyResultDto.totalHits + ')';

          } else {
            $scope.chartObject = {};
          }
      });
    }])

  .controller('GraphicBiologicalSamplesChartsController', [
    '$rootScope',
    '$scope',
    'GraphicChartsConfig',
    'GraphicChartsUtils',
    'GraphicChartsData',
    function ($rootScope,
              $scope,
              GraphicChartsConfig,
              GraphicChartsUtils,
              GraphicChartsData) {

      var piChartConfig = GraphicChartsConfig.getOptions();
      GraphicChartsData.getData(function (BiologicalSamples) {
          if (BiologicalSamples) {
            var ItemDataJSon = GraphicChartsUtils.getArrayByAggregation('populations-dataCollectionEvents-bioSamples', BiologicalSamples.studyResultDto);
            ItemDataJSon.unshift(piChartConfig.ChartsOptions.biologicalSamples.header);
            $scope.chartObject = {};
            $scope.chartObject.options = {};
            $scope.chartObject.type = 'PieChart';
            $scope.chartObject.data = ItemDataJSon;
            $scope.chartObject.options = {backgroundColor: {fill: 'transparent'}};
            angular.extend($scope.chartObject.options,piChartConfig.ChartsOptions.biologicalSamples.options );
            $scope.chartObject.options.title = $scope.chartObject.options.title + ' (N=' + BiologicalSamples.studyResultDto.totalHits + ')';

          } else {
            $scope.chartObject = {};
          }
      });
    }])

  .controller('GraphicAccessChartsController', [
    '$rootScope',
    '$scope',
    'GraphicChartsConfig',
    'GraphicChartsUtils',
    'GraphicChartsData',
    function ($rootScope,
              $scope,
              GraphicChartsConfig,
              GraphicChartsUtils,
              GraphicChartsData) {

      var piChartConfig = GraphicChartsConfig.getOptions();
      GraphicChartsData.getData(function (Access) {
          if (Access) {
            var ItemDataJSon = GraphicChartsUtils.getArrayByAggregation('access', Access.studyResultDto);
            ItemDataJSon.unshift(piChartConfig.ChartsOptions.access.header);
            $scope.chartObject = {};
            $scope.chartObject.options = {};
            $scope.chartObject.type = 'BarChart';
            $scope.chartObject.data = ItemDataJSon;
            $scope.chartObject.options = {backgroundColor: {fill: 'transparent'}};
            angular.extend($scope.chartObject.options,piChartConfig.ChartsOptions.access.options );
            $scope.chartObject.options.title = $scope.chartObject.options.title + ' (N=' + Access.studyResultDto.totalHits + ')';

          } else {
            $scope.chartObject = {};
          }
      });
    }]);
