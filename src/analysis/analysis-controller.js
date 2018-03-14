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

(function() {
  ngObibaMica.analysis
  .controller('EntitiesCountController', [
    '$scope',
    '$location',
    'EntitiesCountResource',
    'AlertService',
    'ServerErrorUtils',
    'ngObibaMicaAnalysisTemplateUrl',
    function($scope, $location, EntitiesCountResource, AlertService, ServerErrorUtils, ngObibaMicaAnalysisTemplateUrl) {
      $scope.entitiesHeaderTemplateUrl = ngObibaMicaAnalysisTemplateUrl.getHeaderUrl('entities');
      $scope.result = {};
      $scope.query = $location.search().query;
      $scope.loading = false;
  
      function refresh() {
        if ($scope.query) {
          $scope.loading = true;
  
          EntitiesCountResource.get({ query: $scope.query },
            function onSuccess(response) {
              $scope.result = response;
              $scope.loading = false;
            },
            function onError(response) {
              $scope.result = {};
              $scope.loading = false;
              AlertService.alert({
                id: 'EntitiesCountController',
                type: 'danger',
                msg: ServerErrorUtils.buildMessage(response),
                delay: 5000
              });
            });
        } else {
          $scope.result = {};
        }
      }
  
      refresh();
  
      $scope.$on('$locationChangeSuccess', function() {
        $scope.query = $location.search().query;
        refresh();
      });
  
    }]); 
})();
