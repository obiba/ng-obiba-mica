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
  function manageSearchHelpText($scope, $translate, $cookies) {
    var cookiesSearchHelp = 'micaHideSearchHelpText';
    var cookiesClassificationHelp = 'micaHideClassificationHelpBox';

    $translate(['search.help', 'search.coverage-help'])
      .then(function (translation) {
        if (!$scope.options.SearchHelpText && !$cookies.get(cookiesSearchHelp)) {
          $scope.options.SearchHelpText = translation['search.help'];
        }
        if (!$scope.options.ClassificationHelpText && !$cookies.get(cookiesClassificationHelp)) {
          $scope.options.ClassificationHelpText = translation['classifications.help'];
        }
      });

    // Close the Help search box and set the local cookies
    $scope.closeHelpBox = function () {
      $cookies.put(cookiesSearchHelp, true);
      $scope.options.SearchHelpText = null;
    };

    // Close the Help classification box and set the local cookies
    $scope.closeClassificationHelpBox = function () {
      $cookies.put(cookiesClassificationHelp, true);
      $scope.options.ClassificationHelpText = null;
    };

    // Retrieve from local cookies if user has disabled the Help Search Box and hide the box if true
    if ($cookies.get(cookiesSearchHelp)) {
      $scope.options.SearchHelpText = null;
    }

    // Retrieve from local cookies if user has disabled the Help Classification Box and hide the box if true
    if ($cookies.get(cookiesClassificationHelp)) {
      $scope.options.ClassificationHelpText = null;
    }
  }

  ngObibaMica.search
    .controller('SearchController', ['$timeout',
      '$scope',
      '$rootScope',
      '$location',
      '$translate',
      '$filter',
      '$cookies',
      'ngObibaMicaSearchTemplateUrl',
      'AlertService',
      'LocalizedValues',
      'options',
      function ($timeout, $scope,
        $rootScope,
        $location,
        $translate,
        $filter,
        $cookies,
        ngObibaMicaSearchTemplateUrl,
        AlertService,
        LocalizedValues,
        options) {

        $scope.options = options;
        manageSearchHelpText($scope, $translate, $cookies);

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

        $scope.classificationsHeaderTemplateUrl = ngObibaMicaSearchTemplateUrl.getHeaderUrl('classifications');
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
      }])

    .controller('ResultTabsOrderCountController', [function () {
    }]);
})();
