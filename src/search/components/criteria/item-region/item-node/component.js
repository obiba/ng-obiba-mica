'use strict';

/* global CRITERIA_ITEM_EVENT */

(function () {
  var TEMPLATE_URL = 'search/components/criteria/item-region/item-node/component.html';

  ngObibaMica.search
    .controller('CriterionLogicalController', [
      '$scope',
      function ($scope) {
        $scope.updateLogical = function (operator) {
          $scope.item.rqlQuery.name = operator;
          $scope.$emit(CRITERIA_ITEM_EVENT.refresh);
        };
      }])

    .directive('criteriaNode', [function () {
      return {
        restrict: 'EA',
        replace: true,
        scope: {
          item: '=',
          query: '=',
          advanced: '='
        },
        controller: 'CriterionLogicalController',
        templateUrl: TEMPLATE_URL
      };
    }])

    /**
     * This directive creates a hierarchical structure matching that of a RqlQuery tree.
     */
    .directive('criteriaLeaf', ['CriteriaNodeCompileService', function (CriteriaNodeCompileService) {
      return {
        restrict: 'EA',
        replace: true,
        scope: {
          item: '=',
          query: '=',
          advanced: '='
        },
        controller: 'CriterionLogicalController',
        link: function (scope, element) {
          CriteriaNodeCompileService.compile(scope, element);
        }
      };
    }])

    .factory('CriteriaNodeCompileService', ['$templateCache', '$compile', function ($templateCache, $compile) {
      return {
        compile: function (scope, element) {
          var template = '';
          if (scope.item.type === RQL_NODE.OR || scope.item.type === RQL_NODE.AND || scope.item.type === RQL_NODE.NAND || scope.item.type === RQL_NODE.NOR) {
            template = angular.element($templateCache.get(TEMPLATE_URL));
          } else {
            template = angular.element('<criterion-dropdown criterion="item" query="query"></criterion-dropdown>');
          }

          if (scope.item.rqlQuery.args) {
            $compile(template)(scope, function (cloned) {
              element.replaceWith(cloned);
            });
          }
        }
      };

    }]);
})();