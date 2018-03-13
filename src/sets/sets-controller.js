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
  ngObibaMica.sets
  .controller('CartController', [
    '$scope',
    '$location',
    'SetService',
    'AlertService',
    'ServerErrorUtils',
    'ngObibaMicaSetsTemplateUrl',
    function($scope, $location, SetService, AlertService, ServerErrorUtils, ngObibaMicaSetsTemplateUrl) {
      $scope.cartHeaderTemplateUrl = ngObibaMicaSetsTemplateUrl.getHeaderUrl('cart');
      $scope.loading = true;
      var limit = 100;

      var onDocuments = function(variables) {
        $scope.loading = false;
        $scope.variables = variables;
      };

      var promisedDocs = SetService.getCartDocuments('variables', 0, limit);
      if (promisedDocs) {
        promisedDocs.then(onDocuments);
      } else {
        $scope.variables = { total: 0 };
      }
      
      $scope.$on('cart-cleared', function(event, type) {
        $scope.loading = true;
        SetService.getCartDocuments(type, 0, limit).then(onDocuments);
      });

      $scope.onPaginate = function(type, from) {
        SetService.getCartDocuments(type, from, limit).then(onDocuments);
      };
    }]); 
})();
