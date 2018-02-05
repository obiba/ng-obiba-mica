'use strict';

ngObibaMica.search
  .controller('SearchResultPaginationController', ['$scope', 'ngObibaMicaSearch', function ($scope, ngObibaMicaSearch) {

    function updateMaxSize() {
      $scope.maxSize = Math.min(3, Math.ceil($scope.totalHits / $scope.pagination.selected.value));
    }

    function calculateRange() {
      var pageSize = $scope.pagination.selected.value;
      var current = $scope.pagination.currentPage;
      $scope.pagination.from = pageSize * (current - 1) + 1;
      $scope.pagination.to = Math.min($scope.totalHits, pageSize * current);
    }

    function canShow() {
      return angular.isUndefined($scope.showTotal) || true === $scope.showTotal;
    }

    var pageChanged = function () {
      calculateRange();
      if ($scope.onChange) {
        $scope.onChange(
          $scope.target,
          ($scope.pagination.currentPage - 1) * $scope.pagination.selected.value,
          $scope.pagination.selected.value
        );
      }
    };

    var pageSizeChanged = function () {
      updateMaxSize();
      $scope.pagination.currentPage = 1;
      pageChanged();
    };

    $scope.canShow = canShow;
    $scope.pageChanged = pageChanged;
    $scope.pageSizeChanged = pageSizeChanged;
    $scope.pageSizes = [
      { label: '10', value: 10 },
      { label: '20', value: 20 },
      { label: '50', value: 50 },
      { label: '100', value: 100 }
    ];

    var listPageSize = ngObibaMicaSearch.getDefaultListPageSize($scope.target);
    var initialTargetPageSize = $scope.pageSizes.filter(function (p) {
      return p.value === listPageSize;
    });

    $scope.pagination = {
      selected: initialTargetPageSize.length > 0 ? initialTargetPageSize[0] : $scope.pageSizes[0],
      currentPage: 1
    };

    $scope.$watch('totalHits', function () {
      updateMaxSize();
      calculateRange();
    });
  }])
  
  .directive('searchResultPagination', [function() {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        showTotal: '=',
        target: '=',
        totalHits: '=',
        onChange: '='
      },
      controller: 'SearchResultPaginationController',
      templateUrl: 'search/components/result/pagination/component.html'
    };
  }]);