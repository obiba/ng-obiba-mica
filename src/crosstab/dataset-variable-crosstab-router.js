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

(function () {

  ngObibaMica.DatasetVariableCrosstab.config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider
        .when('/crosstab/:type/:ds', {
          templateUrl: 'analysis/crosstab/views/crosstab-variable-crosstab.html',
          controller: 'DatasetVariableCrosstabController'
        })

        .when('/crosstab/:type/:ds/variable/:varId', {
          templateUrl:'analysis/crosstab/views/crosstab-variable-crosstab.html',
          controller: 'DatasetVariableCrosstabController'
        })

        .when('/crosstab/:type/:ds/variable/:varId/by/:byId', {
          templateUrl: 'analysis/crosstab/views/crosstab-variable-crosstab.html',
          controller: 'DatasetVariableCrosstabController'
        });
    }]);

})();
