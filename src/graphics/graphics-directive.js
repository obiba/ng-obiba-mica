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

  .directive('obibaChart', [function () {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        chartConfig: '=',
        chartType: '=',
        chartAggregationName: '=',
        chartStudiesData: '='
      },
      templateUrl: 'graphics/views/charts-directive.html',
      controller: 'GraphicChartsController'
    };
  }])
  .directive('obibaTable', ['ngObibaMicaGraphicTemplateUrl', function (ngObibaMicaGraphicTemplateUrl) {
  return {
    restrict: 'EA',
    replace: true,
    scope: {
      chartConfig: '=',
      chartType: '@',
      chartAggregationName: '=',
      chartStudiesData: '=',
      onUpdateCriteria: '='
    },
    templateUrl: ngObibaMicaGraphicTemplateUrl.getTemplateUrl('graphicTableDirectiveTemplate'),
    controller: 'GraphicChartsController'
  };
}]);