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

/* exported QUERY_GROWL_EVENT */
var QUERY_GROWL_EVENT = 'query.growl-event';

(function () {
  ngObibaMica.search
    .controller('SearchController', ['$timeout',
      '$scope',
      '$location',
      '$translate',
      '$filter',
      'AlertService',
      'LocalizedValues',
      'options',
      function ($timeout, $scope,
        $location,
        $translate,
        $filter,
        AlertService,
        LocalizedValues,
        options) {

        $scope.options = options;

        $scope.taxonomyTypeMap = { //backwards compatibility for pluralized naming in configs.
          variable: 'variables',
          study: 'studies',
          network: 'networks',
          dataset: 'datasets'
        };

        $translate(['search.classifications-title', 'search.classifications-link', 'search.faceted-navigation-help'])
          .then(function (translation) {
            $scope.hasClassificationsTitle = translation['search.classifications-title'];
            $scope.hasClassificationsLinkLabel = translation['search.classifications-link'];
            $scope.hasFacetedNavigationHelp = translation['search.faceted-navigation-help'];
          });

        var searchTaxonomyDisplay = {
          variable: $scope.options.variables.showSearchTab,
          dataset: $scope.options.datasets.showSearchTab,
          study: $scope.options.studies.showSearchTab,
          network: $scope.options.networks.showSearchTab
        };

        $scope.lang = $translate.use();

        function initSearchTabs() {
          function getTabsOrderParam(arg) {
            var value = $location.search()[arg];

            return value && value.split(',')
              .filter(function (t) {
                return t;
              })
              .map(function (t) {
                return t.trim();
              });
          }

          var targetTabsOrderParam = getTabsOrderParam('targetTabsOrder');
          $scope.targetTabsOrder = (targetTabsOrderParam || $scope.options.targetTabsOrder).filter(function (t) {
            return searchTaxonomyDisplay[t];
          });

          if ($location.search().target) {
            $scope.target = $location.search().target;
          } else if (!$scope.target) {
            $scope.target = $scope.targetTabsOrder[0];
          }
        }

        var onSelectTerm = function (target, taxonomy, vocabulary, args) {
          args = args || {};

          if (args.text) {
            args.text = args.text.replace(/[^a-zA-Z0-9*" _-]/g, '');
          }

          if (angular.isString(args)) {
            args = { term: args };
          }

          console.log('onSelectTerm');
        };

        $scope.navigateToTarget = function (target) {
          $location.search('target', target);
          $location.search('taxonomy', null);
          $location.search('vocabulary', null);
          $scope.target = target;
        };

        $scope.$on(QUERY_GROWL_EVENT, function(event, vocabularyTitle, lang, target, msgKey) {
          msgKey = msgKey || 'search.criterion.updated';

          AlertService.growl({
            id: 'SearchControllerGrowl',
            type: 'info',
            msgKey: msgKey,
            msgArgs: [LocalizedValues.forLocale(vocabularyTitle, lang), $filter('translate')('taxonomy.target.' + target)],
            delay: 3000
          });
        });

        $scope.onSelectTerm = onSelectTerm;

        $scope.toggleFullscreen = function (fullscreen) {
          if ($scope.isFullscreen && $scope.isFullscreen !== fullscreen) {
            // in case the ESC key was pressed
            $timeout(function() {$scope.isFullscreen = fullscreen;});
          } else {
            $scope.isFullscreen = fullscreen;
          }
        };

        $scope.isFullscreen = false;

        function init() {
          $scope.lang = $translate.use();
          initSearchTabs();
        }

        init();
      }]);
})();
