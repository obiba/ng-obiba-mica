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

/* global RQL_NODE */
/* global typeToTarget */

angular.module('obiba.mica.lists')

  .controller('listSearchWidgetController', ['$scope', '$rootScope', '$location', 'RqlQueryService',
    function ($scope, $rootScope, $location, RqlQueryService) {
      $scope.query = $location.search().query;

      if ($scope.query) {
        var targetQuery = RqlQueryService.findTargetQuery(typeToTarget($scope.type), RqlQueryService.parseQuery($scope.query));

        var foundFulltextMatchQuery = targetQuery.args.filter(function (arg) { return arg.name === RQL_NODE.MATCH && arg.args.length === 1; });
        if (foundFulltextMatchQuery.length === 1) {
          $scope.searchFilter = foundFulltextMatchQuery[0].args[0][0];
        }
      }

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
      $scope.getLabel = sortWidgetService.getLabel;

      $scope.selected = {
        sort:  $scope.selectSort.options[0].value,
        order: $scope.selectOrder.options[0].value
      };

      angular.forEach($scope.selectSort, function(sortOption){
        $scope.selected[sortOption] = {
          order: $scope.selectOrder.options[0].value
        };
      });


      intiSelectedOptions();

      $scope.$on('$locationChangeSuccess', function () {
        intiSelectedOptions();
      });

      var sortParam;
      $scope.radioCheked = function (selectedSort) {
        angular.forEach($scope.selectSort.options, function (sortOption) {
          if (selectedSort === sortOption.value) {
            sortParam = {
              sort: selectedSort,
              order: $scope.selected[sortOption.value].order
            };
            $scope.selected.order = $scope.selected[sortOption.value].order;
          }
          else {
            $scope.selected[sortOption.value] = null;
          }
        });

        $scope.selected.sort = selectedSort;
        emitter.$emit('ngObibaMicaSearch.sortChange', sortParam);
      };

      function intiSelectedOptions() {
        var selectedOptions = sortWidgetService.getSortArg();
        if (selectedOptions) {
          $scope.selected = {
            sort: selectedOptions.selectedSort ? selectedOptions.selectedSort.value : $scope.selectSort.options[0].value,
            order: selectedOptions.slectedOrder ? selectedOptions.slectedOrder.value : $scope.selectOrder.options[0].value
          };

          $scope.selected[selectedOptions.selectedSort.value] = {
            order: selectedOptions.slectedOrder ? selectedOptions.slectedOrder.value : $scope.selectOrder.options[0].value
          };
        }
      }
    }]);