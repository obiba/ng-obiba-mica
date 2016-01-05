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
  .controller('GraphicStudyDesignChartsController', [
    '$rootScope',
    '$scope',
    'GraphicChartsStudiesDesignGetData',
    'GraphicChartsConfig',
    function ($rootScope,
              $scope,
              GraphicChartsStudiesDesignGetData,
              GraphicChartsConfig) {
      GraphicChartsStudiesDesignGetData.get({id: GraphicChartsConfig.getOptions().IdNetworks}, function onSuccess(StudiesDesignData) {
        $scope.chartObject = {};
        $scope.chartObject.type = "PieChart";
        $scope.chartObject.data = JSON.parse(StudiesDesignData.PieData);
        $scope.chartObject.options = {
          colors: ['#006600', '#009900', '#009966', '#009933', '#66CC33'],
          width: 400,
          height: 200,
          backgroundColor: {fill: 'transparent'},
          chartArea: {left: 10, top: 10, bottom: 0, height: "100%"}
        };

        $scope.chartObject.formatters = {
          number: [{
            columnNum: 1,
            pattern: "$ #,##0.00"
          }]
        };
      });

    }]);

angular.module('obiba.mica.graphics')
  .controller('GraphicGeoChartsController', [
    '$rootScope',
    '$scope',
    'GraphicChartsGeoChartGetData',
    'GraphicChartsConfig',
    function ($rootScope,
              $scope,
              GraphicChartsGeoChartGetData,
              GraphicChartsConfig) {

      GraphicChartsGeoChartGetData.get({id: GraphicChartsConfig.getOptions().IdNetworks}, function onSuccess(StudiesByCountriesData) {
        $scope.geoChartObject = {};
        $scope.geoChartObject.type = "GeoChart";
        $scope.geoChartObject.data = JSON.parse(StudiesByCountriesData.ChartData);
console.log(StudiesByCountriesData);
        $scope.geoChartObject.options = {
          colors: ['#006600', '#009900', '#009966', '#009933', '#66CC33'],
          backgroundColor: {fill: 'transparent'},
          legend: "none",
          title: "Study Design Pie chart (N=15)"
        };
      });
    }]);
