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

  function SearchResultPaginationController ($scope, ngObibaMicaSearch, PaginationService) {

    function canShow () {
      return angular.isUndefined ($scope.showTotal) || true === $scope.showTotal;
    }

    function onUpdate(state, preventPageChangeEvent) {
      $scope.preventPageChangeEvent = preventPageChangeEvent;
      $scope.pagination = state;
    }

    var pageChanged = function () {
      if ($scope.onChange) {
        $scope.onChange (
          $scope.target,
          ($scope.pagination.currentPage - 1) * $scope.pagination.selected.value,
          $scope.pagination.selected.value,
          true === $scope.preventPageChangeEvent
        );

        $scope.preventPageChangeEvent = false;
      }
    };

    var pageSizeChanged = function () {
      pageChanged ();
    };

    $scope.canShow = canShow;
    $scope.pageChanged = pageChanged;
    $scope.pageSizeChanged = pageSizeChanged;
    this.onUpdate = onUpdate;

    PaginationService.registerListener($scope.target, this);
  }

  ngObibaMica.search.directive ('searchResultPagination', [function () {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        showTotal: '<',
        target: '<',
        onChange: '='
      },
      controller: ['$scope', 'ngObibaMicaSearch', 'PaginationService', SearchResultPaginationController],
      templateUrl: 'search/components/result/pagination/component.html'
    };
  }]);

}) ();