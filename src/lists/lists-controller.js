/*
 * Copyright (c) 2017 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

angular.module('obiba.mica.lists')

  .controller('listSearchWidgetController', ['$scope', '$rootScope',
    function ($scope, $rootScope) {
      var emitter = $rootScope.$new();

      $scope.selectSuggestion = function (suggestion) {
        emitter.$emit('ngObibaMicaSearch.searchChange', suggestion);
      };

      $scope.search = function() {
        emitter.$emit('ngObibaMicaSearch.searchChange', $scope.searchFilter);
      };
    }])
  .controller('listSortWidgetController', ['$scope', '$rootScope', 'sortWidgetService',
    function ($scope, $rootScope, sortWidgetService) {

      var emitter = $rootScope.$new();
      $scope.selectSort = sortWidgetService.getSortOptions();
      $scope.selectOrder = sortWidgetService.getOrderOptions();
      $scope.selectedSort =  $scope.selectSort.options[0].value;
      $scope.selectedOrder = $scope.selectOrder.options[0].value;

      var selectedOptions = sortWidgetService.getSortArg();
      if (selectedOptions) {
        $scope.selectedSort = selectedOptions.selectedSort ? selectedOptions.selectedSort.value : $scope.selectSort.options[0].value;
        $scope.selectedOrder = selectedOptions.slectedOrder ? selectedOptions.slectedOrder.value : $scope.selectOrder.options[0].value;
      }
      $scope.buttonClick = function () {
        var sortParam ={
          sort: '_score',
          order: '-'
        };
        $scope.selectedSort = '_score';
        $scope.selectedOrder= '-';
        emitter.$emit('ngObibaMicaSearch.sortChange', sortParam);
      };

      $scope.radioCheked = function(){
        if($scope.selectedSort!=='_score'){
          var sortParam ={
            sort: $scope.selectedSort,
            order: $scope.selectedOrder
          };
          emitter.$emit('ngObibaMicaSearch.sortChange', sortParam);
        }
      };
    }]);