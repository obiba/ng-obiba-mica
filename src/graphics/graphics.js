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

function GraphicChartsDataProvider() {

  function DataProvider(dataResponse) {
    var data = dataResponse;
    this.getData = function (callback) {
      if (callback) {
        data.$promise.then(callback);
      }
    };
  }

  this.$get = function (JoinQuerySearchResource,ServerErrorUtils,AlertService, GraphicChartsConfig, GraphicChartsQuery) {
    function onError(response) {
      AlertService.alert({
        id: 'SearchController',
        type: 'danger',
        msg: ServerErrorUtils.buildMessage(response),
        delay: 5000
      });
    }
    var queryDto = GraphicChartsQuery.queryDtoBuilder(GraphicChartsConfig.getOptions().entityIds, GraphicChartsConfig.getOptions().entityType);

    return new DataProvider(JoinQuerySearchResource.studies({
      query: queryDto},
    function onSuccess(response) {
    return response;
    },
    onError));
  };
}

angular.module('obiba.mica.graphics', [
    'googlechart',
    'obiba.utils',
    'templates-ngObibaMica'
  ])
  .config(['$provide', function ($provide) {
    $provide.provider('GraphicChartsData', GraphicChartsDataProvider);
  }])
  .run(['GraphicChartsConfigurations',
  function (GraphicChartsConfigurations) {
    GraphicChartsConfigurations.setClientConfig();
  }]);
