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
      data.$promise.then(callback);
    };
  }

  this.$get = function (GraphicChartsGetData, GraphicChartsConfig) {
    return new DataProvider(GraphicChartsGetData.get({id: GraphicChartsConfig.getOptions().IdNetworks}));
  };
}

angular.module('obiba.mica.graphics', [
    'googlechart',
    'obiba.utils'
  ])
  .config(['$provide', function ($provide) {
    $provide.provider('GraphicChartsData', GraphicChartsDataProvider);
  }]);
