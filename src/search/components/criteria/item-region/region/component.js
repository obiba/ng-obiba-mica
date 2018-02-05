'use strict';

ngObibaMica.search
  .controller('searchCriteriaRegionController', ['$scope', 'RqlQueryService', function ($scope, RqlQueryService) {
    var canShow = false;

    $scope.$watchCollection('search.criteria', function () {
      $scope.renderableTargets = RqlQueryService.getRenderableTargetCriteriaFromRoot($scope.search.criteria);
    });

    $scope.$watchCollection('search.criteriaItemMap', function () {
      if ($scope.search.criteriaItemMap) {
        canShow = Object.keys($scope.search.criteriaItemMap).length > 1;
      }
    });
    var canShowCriteriaRegion = function () {
      return ($scope.options.studyTaxonomiesOrder.length || $scope.options.datasetTaxonomiesOrder.length || $scope.options.networkTaxonomiesOrder.length) && canShow;
    };
    $scope.canShowCriteriaRegion = canShowCriteriaRegion;
  }])

  .directive('searchCriteriaRegion', ['ngObibaMicaSearchTemplateUrl', function (ngObibaMicaSearchTemplateUrl) {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        options: '=',
        search: '='
      },
      controller: 'searchCriteriaRegionController',
      templateUrl: ngObibaMicaSearchTemplateUrl.getTemplateUrl('searchCriteriaRegionTemplate')
    };
  }]);