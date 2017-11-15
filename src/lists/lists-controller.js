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

  .controller('listSearchWidgetController', ['$scope', '$rootScope', '$location', 'RqlQueryService', 'ngObibaMicaUrl',
    function ($scope, $rootScope, $location, RqlQueryService, ngObibaMicaUrl) {
      function initMatchInput() {
        $scope.query = $location.search().query;

        if ($scope.query) {
          var targetQuery = RqlQueryService.findTargetQuery(typeToTarget($scope.type), RqlQueryService.parseQuery($scope.query));
          var foundFulltextMatchQuery = targetQuery.args.filter(function (arg) { return arg.name === RQL_NODE.MATCH && arg.args.length === 1; });
          if (foundFulltextMatchQuery.length === 1) {
            $scope.searchFilter = foundFulltextMatchQuery[0].args[0][0];
          } else {
            $scope.searchFilter = null;
          }
        }
      }

      /**
       * Removes all other query parts except the ID or className criterion
       *
       * @returns query urk
       */
      $scope.navigateToSearchPage = function() {
        var targetQuery =
          RqlQueryService.findTargetQuery(typeToTarget($scope.type), RqlQueryService.parseQuery($scope.query));

        if (targetQuery) {
          var query = RqlQueryService.findQueryInTargetByVocabulary(targetQuery, 'className') ||
            RqlQueryService.findQueryInTargetByVocabulary(targetQuery, 'id');
          if (query) {
            targetQuery.args = [query];
            var containerQuery = new RqlQuery(RQL_NODE.AND);
            containerQuery.args.push(targetQuery);
            return ngObibaMicaUrl.getUrl('BaseUrl') + ngObibaMicaUrl.getUrl('SearchBaseUrl') + '?type=' +
              $scope.type +
              '&query=' +
              (new RqlQuery().serializeArgs(containerQuery.args)) +
              '&display=list';
          }
        }

        return '';
      };

      $scope.$on('$locationChangeSuccess', function () {
        initMatchInput();
      });

      var emitter = $rootScope.$new();

      $scope.selectSuggestion = function (suggestion) {
        emitter.$emit('ngObibaMicaSearch.searchChange', suggestion);
      };

      $scope.search = function() {
        emitter.$emit('ngObibaMicaSearch.searchChange', $scope.searchFilter.replace(/\/.*/g, ''));
      };

      initMatchInput();
    }])
  .controller('listSortWidgetController', ['$scope', '$rootScope', 'sortWidgetService',
    function ($scope, $rootScope, sortWidgetService) {

      var emitter = $rootScope.$new();
      $scope.selectSortOrder = sortWidgetService.getSortOrderOptions();
      $scope.getLabel = sortWidgetService.getLabel;
      $scope.selected = $scope.selectSortOrder.options.defaultValue;
      intiSelectedOptions();

      $scope.$on('$locationChangeSuccess', function () {
        intiSelectedOptions();
      });

      $scope.selectSortOrderOption = function (option) {
        $scope.selected = option;
        emitter.$emit('ngObibaMicaSearch.sortChange', option.value);
      };

      function intiSelectedOptions() {
        $scope.selected = sortWidgetService.getSortOrderOption(sortWidgetService.getSortArg());
      }
    }]);