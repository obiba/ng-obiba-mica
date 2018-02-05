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

/* global CRITERIA_ITEM_EVENT */
/* global QUERY_TARGETS */
/* global QUERY_TYPES */
/* global BUCKET_TYPES */
/* global RQL_NODE */
/* global DISPLAY_TYPES */
/* global CriteriaIdGenerator */
/* global targetToType */
/* global SORT_FIELDS */

/**
 * Base controller for taxonomies and classification panels.
 *
 * @param $scope
 * @param $location
 * @param TaxonomyResource
 * @param TaxonomiesResource
 * @param ngObibaMicaSearch
 * @constructor
 */
function BaseTaxonomiesController($rootScope,
                                  $scope,
                                  $translate,
                                  $location,
                                  TaxonomyResource,
                                  TaxonomiesResource,
                                  ngObibaMicaSearch,
                                  RqlQueryUtils,
                                  $cacheFactory,
                                  VocabularyService) {

  $scope.options = ngObibaMicaSearch.getOptions();
  $scope.RqlQueryUtils = RqlQueryUtils;
  $scope.metaTaxonomy = TaxonomyResource.get({
    target: 'taxonomy',
    taxonomy: 'Mica_taxonomy'
  });

  $scope.taxonomies = {
    all: [],
    search: {
      text: null,
      active: false
    },
    target: $scope.target || 'variable',
    taxonomy: null,
    vocabulary: null
  };

  $rootScope.$on('$translateChangeSuccess', function () {
    if ($scope.taxonomies && $scope.taxonomies.vocabulary) {
      VocabularyService.sortVocabularyTerms($scope.taxonomies.vocabulary, $translate.use());
    }
  });

  // vocabulary (or term) will appear in navigation iff it doesn't have the 'showNavigate' attribute
  $scope.canNavigate = function(vocabulary) {
    if ($scope.options.hideNavigate.indexOf(vocabulary.name) > -1) {
      return false;
    }

    return (vocabulary.attributes || []).filter(function (attr) { return attr.key === 'showNavigate'; }).length === 0;
  };

  this.navigateTaxonomy = function (taxonomy, vocabulary, term) {
    $scope.taxonomies.term = term;

    if ($scope.isHistoryEnabled) {
      var search = $location.search();
      search.taxonomy = taxonomy ? taxonomy.name : null;

      if (vocabulary && search.vocabulary !== vocabulary.name) {
        VocabularyService.sortVocabularyTerms(vocabulary, $scope.lang);
        search.vocabulary = vocabulary.name;
      } else {
        search.vocabulary = null;
      }

      $location.search(search);
    } else {
      $scope.taxonomies.taxonomy = taxonomy;

      if (!$scope.taxonomies.vocabulary || $scope.taxonomies.vocabulary.name !== vocabulary.name) {
        VocabularyService.sortVocabularyTerms(vocabulary, $scope.lang);
      }

      $scope.taxonomies.vocabulary = vocabulary;
    }
  };

  this.updateStateFromLocation = function () {
    var search = $location.search();
    var taxonomyName = search.taxonomy,
      vocabularyName = search.vocabulary, taxonomy = null, vocabulary = null;

    if (!$scope.taxonomies.all) { //page loading
      return;
    }

    $scope.taxonomies.all.forEach(function (t) {
      if (t.name === taxonomyName) {
        taxonomy = t;
        t.vocabularies.forEach(function (v) {
          if (v.name === vocabularyName) {
            vocabulary = v;
          }
        });
      }
    });

    if (!angular.equals($scope.taxonomies.taxonomy, taxonomy) || !angular.equals($scope.taxonomies.vocabulary, vocabulary)) {
      $scope.taxonomies.taxonomy = taxonomy;

      if(vocabulary) {
        VocabularyService.sortVocabularyTerms(vocabulary, $scope.lang);
      }

      $scope.taxonomies.vocabulary = vocabulary;
    }
  };

  this.selectTerm = function (target, taxonomy, vocabulary, args) {
    $scope.onSelectTerm(target, taxonomy, vocabulary, args);
  };

  this.clearCache = function () {
    var taxonomyResourceCache = $cacheFactory.get('taxonomyResource');
    if (taxonomyResourceCache) {
      taxonomyResourceCache.removeAll();
    }
  };

  var self = this;

  $scope.$on('$locationChangeSuccess', function () {
    if ($scope.isHistoryEnabled) {
      self.updateStateFromLocation();
    }
  });
  $scope.$watch('taxonomies.vocabulary', function(value) {
    if(RqlQueryUtils && value) {
      $scope.taxonomies.isNumericVocabulary = VocabularyService.isNumericVocabulary($scope.taxonomies.vocabulary);
      $scope.taxonomies.isMatchVocabulary = VocabularyService.isMatchVocabulary($scope.taxonomies.vocabulary);
    } else {
      $scope.taxonomies.isNumericVocabulary = null;
      $scope.taxonomies.isMatchVocabulary = null;
    }
  });

  $scope.navigateTaxonomy = this.navigateTaxonomy;
  $scope.selectTerm = this.selectTerm;
  $scope.clearCache = this.clearCache;
}
/**
 * TaxonomiesPanelController
 *
 * @param $rootScope
 * @param $scope
 * @param $translate
 * @param $location
 * @param TaxonomyResource
 * @param TaxonomiesResource
 * @param ngObibaMicaSearch
 * @param RqlQueryUtils
 * @param $cacheFactory
 * @param AlertService
 * @param ServerErrorUtils
 * @constructor
 */
function TaxonomiesPanelController($rootScope,
                                   $scope,
                                   $translate,
                                   $location,
                                   TaxonomyResource,
                                   TaxonomiesResource,
                                   ngObibaMicaSearch,
                                   RqlQueryUtils,
                                   $cacheFactory,
                                   AlertService,
                                   ServerErrorUtils,
                                   VocabularyService) {
  BaseTaxonomiesController.call(this,
    $rootScope,
    $scope,
    $translate,
    $location,
    TaxonomyResource,
    TaxonomiesResource,
    ngObibaMicaSearch,
    RqlQueryUtils,
    $cacheFactory,
    VocabularyService);

  function getPanelTaxonomies(target, taxonomyName) {
    TaxonomyResource.get({
      target: target,
      taxonomy: taxonomyName
    }, function onSuccess(response) {
      $scope.taxonomies.taxonomy = response;
      $scope.taxonomies.vocabulary = null;
      $scope.taxonomies.term = null;
      $scope.taxonomies.search.active = false;
    }, function onError(response) {
      $scope.taxonomies.search.active = false;

      AlertService.alert({
        id: 'SearchController',
        type: 'danger',
        msg: ServerErrorUtils.buildMessage(response),
        delay: 5000
      });
    });
  }

  $scope.$watchGroup(['taxonomyName', 'target'], function (newVal) {
    if (newVal[0] && newVal[1]) {
      if ($scope.showTaxonomies) {
        $scope.showTaxonomies();
      }
      $scope.taxonomies.target = newVal[1];
      $scope.taxonomies.search.active = true;
      $scope.taxonomies.all = null;
      $scope.taxonomies.taxonomy = null;
      $scope.taxonomies.vocabulary = null;
      $scope.taxonomies.term = null;

      getPanelTaxonomies(newVal[1], newVal[0]);
    }
  });

  this.refreshTaxonomyCache = function (target, taxonomyName) {
    $scope.clearCache();
    getPanelTaxonomies(target, taxonomyName);
  };

  $scope.refreshTaxonomyCache = this.refreshTaxonomyCache;
}
/**
 * ClassificationPanelController
 * 
 * @param $rootScope
 * @param $scope
 * @param $translate
 * @param $location
 * @param TaxonomyResource
 * @param TaxonomiesResource
 * @param ngObibaMicaSearch
 * @param RqlQueryUtils
 * @param $cacheFactory
 * @param VocabularyService
 * @constructor
 */
function ClassificationPanelController($rootScope,
                                       $scope,
                                       $translate,
                                       $location,
                                       TaxonomyResource,
                                       TaxonomiesResource,
                                       ngObibaMicaSearch,
                                       RqlQueryUtils,
                                       $cacheFactory,
                                       VocabularyService) {
  BaseTaxonomiesController.call(this,
    $rootScope,
    $scope,
    $translate,
    $location,
    TaxonomyResource,
    TaxonomiesResource,
    ngObibaMicaSearch,
    RqlQueryUtils,
    $cacheFactory,
    VocabularyService);

  var groupTaxonomies = function (taxonomies, target) {
    var res = taxonomies.reduce(function (res, t) {
      if(target){
        t.vocabularies = VocabularyService.visibleVocabularies(t.vocabularies);
        res[t.name] = t;
        return res;
      }
    }, {});

    return $scope.metaTaxonomy.$promise.then(function (metaTaxonomy) {
      var targetVocabulary = metaTaxonomy.vocabularies.filter(function (v) {
        return v.name === target;
      })[0];

      $scope.taxonomyGroups = targetVocabulary.terms.map(function (v) {
        if (!v.terms) {
          var taxonomy = res[v.name];

          if (!taxonomy) {
            return null;
          }

          taxonomy.title = v.title;
          taxonomy.description = v.description;
          return {title: null, taxonomies: [taxonomy]};
        }

        var taxonomies = v.terms.map(function (t) {
          var taxonomy = res[t.name];

          if (!taxonomy) {
            return null;
          }

          taxonomy.title = t.title;
          taxonomy.description = t.description;
          return taxonomy;
        }).filter(function (t) {
          return t;
        });
        var title = v.title.filter(function (t) {
          return t.locale === $scope.lang;
        })[0];
        var description = v.description ? v.description.filter(function (t) {
          return t.locale === $scope.lang;
        })[0] : undefined;

        return {
          title: title ? title.text : null,
          description: description ? description.text : null,
          taxonomies: taxonomies
        };
      }).filter(function (t) {
        return t;
      });
    });
  };

  var self = this;

  function getClassificationTaxonomies() {
    TaxonomiesResource.get({
      target: $scope.taxonomies.target
    }, function onSuccess(taxonomies) {
      $scope.taxonomies.all = taxonomies;
      groupTaxonomies(taxonomies, $scope.taxonomies.target);
      $scope.taxonomies.search.active = false;
      self.updateStateFromLocation();
    });
  }

  $scope.$watch('target', function (newVal) {
    if (newVal) {
      $scope.taxonomies.target = newVal;
      $scope.taxonomies.search.active = true;
      $scope.taxonomies.all = null;
      $scope.taxonomies.taxonomy = null;
      $scope.taxonomies.vocabulary = null;
      $scope.taxonomies.term = null;

      getClassificationTaxonomies();
    }
  });

  this.refreshTaxonomyCache = function () {
    $scope.clearCache();
    getClassificationTaxonomies();
  };

  $scope.refreshTaxonomyCache = this.refreshTaxonomyCache;
}

ngObibaMica.search

  .controller('SearchController', [
    '$scope',
    '$rootScope',
    '$timeout',
    '$routeParams',
    '$location',
    '$translate',
    '$filter',
    '$cookies',
    'TaxonomiesSearchResource',
    'TaxonomiesResource',
    'TaxonomyResource',
    'VocabularyResource',
    'ngObibaMicaSearchTemplateUrl',
    'ObibaServerConfigResource',
    'JoinQuerySearchResource',
    'JoinQueryCoverageResource',
    'AlertService',
    'ServerErrorUtils',
    'LocalizedValues',
    'RqlQueryService',
    'RqlQueryUtils',
    'SearchContext',
    'CoverageGroupByService',
    'VocabularyService',
    'LocaleStringUtils',
    'StringUtils',
    'EntitySuggestionRqlUtilityService',
    'options',
    function ($scope,
              $rootScope,
              $timeout,
              $routeParams,
              $location,
              $translate,
              $filter,
              $cookies,
              TaxonomiesSearchResource,
              TaxonomiesResource,
              TaxonomyResource,
              VocabularyResource,
              ngObibaMicaSearchTemplateUrl,
              ObibaServerConfigResource,
              JoinQuerySearchResource,
              JoinQueryCoverageResource,
              AlertService,
              ServerErrorUtils,
              LocalizedValues,
              RqlQueryService,
              RqlQueryUtils,
              SearchContext,
              CoverageGroupByService,
              VocabularyService,
              LocaleStringUtils,
              StringUtils,
              EntitySuggestionRqlUtilityService,
              options) {

      $scope.options = options;
      var cookiesSearchHelp = 'micaHideSearchHelpText';
      var cookiesClassificationHelp = 'micaHideClassificationHelpBox';

      $translate(['search.help', 'search.coverage-help'])
        .then(function (translation) {
          if(!$scope.options.SearchHelpText && !$cookies.get(cookiesSearchHelp)){
            $scope.options.SearchHelpText = translation['search.help'];
          }
          if(!$scope.options.ClassificationHelpText && !$cookies.get(cookiesClassificationHelp)){
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
      var taxonomyTypeInverseMap = Object.keys($scope.taxonomyTypeMap).reduce(function (prev, k) {
        prev[$scope.taxonomyTypeMap[k]] = k;
        return prev;
      }, {});
      $scope.targets = [];
      $scope.lang = $translate.use();
      $scope.metaTaxonomy = TaxonomyResource.get({
        target: 'taxonomy',
        taxonomy: 'Mica_taxonomy'
      }, function (t) {
        var stuff = t.vocabularies.map(function (v) {
          return v.name;
        });

        $scope.targets = stuff.filter(function (target) {
          return searchTaxonomyDisplay[target];
        });

        function flattenTaxonomies(terms){
          function inner(acc, terms) {
            angular.forEach(terms, function(t) {
              if(!t.terms) {
                acc.push(t);
                return;
              }

              inner(acc, t.terms);
            });

            return acc;
          }

          return inner([], terms);
        }

        $scope.hasFacetedTaxonomies = false;

        $scope.facetedTaxonomies = t.vocabularies.reduce(function(res, target) {
          var taxonomies = flattenTaxonomies(target.terms);

          function getTaxonomy(taxonomyName) {
            return taxonomies.filter(function(t) {
              return t.name === taxonomyName;
            })[0];
          }

          function notNull(t) {
            return t !== null && t !== undefined;
          }

          if($scope.options.showAllFacetedTaxonomies) {
            res[target.name] = taxonomies.filter(function(t) {
              return t.attributes && t.attributes.some(function(att) {
                  return att.key === 'showFacetedNavigation' &&  att.value.toString() === 'true';
                });
            });
          } else {
            res[target.name] = ($scope.options[target.name + 'TaxonomiesOrder'] || []).map(getTaxonomy).filter(notNull);
          }

          $scope.hasFacetedTaxonomies = $scope.hasFacetedTaxonomies || res[target.name].length;

          return res;
        }, {});
      });

      function initSearchTabs() {
        $scope.taxonomyNav = [];

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

        var searchTabsOrderParam = getTabsOrderParam('searchTabsOrder');
        $scope.searchTabsOrder = searchTabsOrderParam || $scope.options.searchTabsOrder;

        var resultTabsOrderParam = getTabsOrderParam('resultTabsOrder');
        $scope.resultTabsOrder = (resultTabsOrderParam || $scope.options.resultTabsOrder).filter(function (t) {
          return searchTaxonomyDisplay[t];
        });

        if($location.search().target) {
          $scope.target = $location.search().target;
        } else if (!$scope.target) {
          $scope.target = $scope.targetTabsOrder[0];
        }

        $scope.metaTaxonomy.$promise.then(function (metaTaxonomy) {
          var tabOrderTodisplay = [];
          $scope.targetTabsOrder.forEach(function (target) {
            var targetVocabulary = metaTaxonomy.vocabularies.filter(function (vocabulary) {
              if(vocabulary.name === target){
                tabOrderTodisplay.push(target);
                return true;
              }
            }).pop();
            if (targetVocabulary && targetVocabulary.terms) {
              targetVocabulary.terms.forEach(function (term) {
                term.target = target;
                var title = term.title.filter(function (t) {
                  return t.locale === $scope.lang;
                })[0];
                var description = term.description ? term.description.filter(function (t) {
                  return t.locale === $scope.lang;
                })[0] : undefined;
                term.locale = {
                  title: title,
                  description: description
                };
                if (term.terms) {
                  term.terms.forEach(function (trm) {
                    var title = trm.title.filter(function (t) {
                      return t.locale === $scope.lang;
                    })[0];
                    var description = trm.description ? trm.description.filter(function (t) {
                      return t.locale === $scope.lang;
                    })[0] : undefined;
                    trm.locale = {
                      title: title,
                      description: description
                    };
                  });
                }
                $scope.taxonomyNav.push(term);
              });
            }
          });
          $scope.targetTabsOrder = tabOrderTodisplay;
        });
      }

      function onError(response) {
        $scope.search.result = {};
        $scope.search.loading = false;
        AlertService.alert({
          id: 'SearchController',
          type: 'danger',
          msg: ServerErrorUtils.buildMessage(response),
          delay: 5000
        });
      }

      function canExecuteWithEmptyQuery() {
        return $scope.search.layout === 'layout2' || $scope.search.query;
      }

      function validateType(type) {
        if (!type || !QUERY_TYPES[type.toUpperCase()]) {
          throw new Error('Invalid type: ' + type);
        }
      }

      function validateBucket(bucket) {
        if (bucket &&
            (!BUCKET_TYPES[bucket.replace('-', '_').toUpperCase()] || !CoverageGroupByService.canGroupBy(bucket))) {
          throw new Error('Invalid bucket ' + bucket);
        }
      }

      function validateDisplay(display) {
        if (!display || !DISPLAY_TYPES[display.toUpperCase()]) {
          throw new Error('Invalid display: ' + display);
        }
      }

      function getDefaultQueryType() {
        return $scope.taxonomyTypeMap[$scope.resultTabsOrder[0]];
      }

      function getDefaultDisplayType() {
        return $scope.searchTabsOrder[0] || DISPLAY_TYPES.LIST;
      }

      function resolveLayout(resolvedOptions) {
        return resolvedOptions.listLayout ? resolvedOptions.listLayout :
            resolvedOptions.searchLayout ? resolvedOptions.searchLayout : 'layout2';
      }

      function validateQueryData() {
        try {
          var search = $location.search();
          var type = $scope.resultTabsOrder.indexOf(taxonomyTypeInverseMap[search.type]) > -1 ? search.type : getDefaultQueryType();
          var bucket = search.bucket && CoverageGroupByService.canGroupBy(search.bucket) ? search.bucket : CoverageGroupByService.defaultBucket();
          var display = $scope.searchTabsOrder.indexOf(search.display) > -1 ? search.display : getDefaultDisplayType();
          var query = search.query || '';
          validateType(type);
          validateBucket(bucket);
          validateDisplay(display);
          $scope.search.type = type;
          $scope.search.bucket = bucket;
          $scope.search.display = display;
          $scope.search.query = query;
          $scope.search.rqlQuery = RqlQueryService.parseQuery(query);
          $scope.search.layout = setLayout(search.layout ? search.layout : resolveLayout($scope.options));

          return true;
        } catch (e) {
          AlertService.alert({
            id: 'SearchController',
            type: 'danger',
            msg: e.message,
            delay: 5000
          });
        }

        return false;
      }

      function setLayout(layout) {
        return layout ? (['layout1', 'layout2'].indexOf(layout) > -1 ? layout : 'layout2') : 'layout2';
      }

      var clearSearchQuery = function () {
        var search = $location.search();
        delete search.query;
        $location.search(search);
      };

      var toggleSearchQuery = function () {
        $scope.search.advanced = !$scope.search.advanced;
      };

      var showAdvanced = function() {
        var children = $scope.search.criteria.children || [];
        for(var i = children.length; i--;) {
          var vocabularyChildren = children[i].children || [];
          for (var j = vocabularyChildren.length; j--;) {
            if (vocabularyChildren[j].type === RQL_NODE.OR || vocabularyChildren[j].type === RQL_NODE.AND) {
              return true;
            }
          }
        }
      };

      function sortCriteriaItems(items) {
        items.sort(function (a, b) {
          if (a.target === 'network' || b.target === 'variable') {
            return -1;
          }
          if (a.target === 'variable' || b.target === 'network') {
            return 1;
          }
          if (a.target < b.target) {
            return 1;
          }
          if (a.target > b.target) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      }

      function loadResults() {
        // execute search only when results are to be shown
        if ($location.path() !== '/search') {
          return;
        }

        function updateSortByType() {
          var rqlSort = RqlQueryService.getTargetQuerySort($scope.search.type, $scope.search.rqlQuery);
          var sort = rqlSort && rqlSort.args ? rqlSort.args : null;

          if (!sort) {
            sort = $scope.search.type === QUERY_TYPES.VARIABLES ? SORT_FIELDS.NAME : SORT_FIELDS.ACRONYM;

            if ($scope.search.type === QUERY_TYPES.VARIABLES) {
              sort = [SORT_FIELDS.VARIABLE_TYPE, SORT_FIELDS.CONTAINER_ID, SORT_FIELDS.POPULATION_WEIGHT, SORT_FIELDS.DATA_COLLECTION_EVENT_WEIGHT, SORT_FIELDS.DATASET_ID, SORT_FIELDS.INDEX, SORT_FIELDS.NAME];
            } else if ($scope.search.type === QUERY_TYPES.DATASETS) {
              sort = [SORT_FIELDS.STUDY_TABLE.STUDY_ID, SORT_FIELDS.STUDY_TABLE.POPULATION_WEIGHT, SORT_FIELDS.STUDY_TABLE.DATA_COLLECTION_EVENT_WEIGHT, SORT_FIELDS.ACRONYM];
            }
          }

          return sort;
        }

        var localizedQuery =
          RqlQueryService.prepareSearchQueryAndSerialize(
            $scope.search.display,
            $scope.search.type,
            $scope.search.rqlQuery,
            $scope.search.pagination,
            $scope.lang,
            updateSortByType()
          );

        function getCountResultFromJoinQuerySearchResponse(response) {
          return {
            studyTotalCount: {
              total: response.studyResultDto.totalCount,
              hits: response.studyResultDto.totalHits
            },
            datasetTotalCount: {
              total: response.datasetResultDto.totalCount,
              hits: response.datasetResultDto.totalHits
            },
            variableTotalCount: {
              total: response.variableResultDto.totalCount,
              hits: response.variableResultDto.totalHits
            },
            networkTotalCount: {
              total: response.networkResultDto.totalCount,
              hits: response.networkResultDto.totalHits
            }
          };
        }

        switch ($scope.search.display) {
          case DISPLAY_TYPES.LIST:
            $scope.search.loading = true;
            $scope.search.executedQuery = localizedQuery;
            JoinQuerySearchResource[$scope.search.type]({query: localizedQuery},
              function onSuccess(response) {
                $scope.search.result.list = response;
                $scope.search.loading = false;
                $scope.search.countResult = getCountResultFromJoinQuerySearchResponse(response);
              },
              onError);
            break;
          case DISPLAY_TYPES.COVERAGE:
            var hasVariableCriteria = Object.keys($scope.search.criteriaItemMap).map(function (k) {
                return $scope.search.criteriaItemMap[k];
              }).filter(function (item) {
                return QUERY_TARGETS.VARIABLE  === item.getTarget() && item.taxonomy.name !== 'Mica_variable';
              }).length > 0;

            if (hasVariableCriteria) {
              $scope.search.loading = true;
              $scope.search.executedQuery = RqlQueryService.prepareCoverageQuery(localizedQuery, $scope.search.bucket);
              JoinQueryCoverageResource.get({query: $scope.search.executedQuery},
                function onSuccess(response) {
                  $scope.search.result.coverage = response;
                  $scope.search.loading = false;
                  $scope.search.countResult = response.totalCounts;
                },
                onError);
            } else {
              $scope.search.result = {};
            }

            break;
          case DISPLAY_TYPES.GRAPHICS:
            $scope.search.loading = true;
            $scope.search.executedQuery = RqlQueryService.prepareGraphicsQuery(localizedQuery,
              ['Mica_study.populations-selectionCriteria-countriesIso', 'Mica_study.populations-dataCollectionEvents-bioSamples', 'Mica_study.numberOfParticipants-participant-number'],
              ['Mica_study.methods-design']);
            JoinQuerySearchResource.studies({query: $scope.search.executedQuery},
              function onSuccess(response) {
                $scope.search.result.graphics = response;
                $scope.search.loading = false;
                $scope.search.countResult = getCountResultFromJoinQuerySearchResponse(response);
              },
              onError);
            break;
        }

      }

      function findAndSetCriteriaItemForTaxonomyVocabularies(target, taxonomy) {
        if (Array.isArray(taxonomy)) {
          taxonomy.forEach(function (subTaxonomy) {
            subTaxonomy.vocabularies.forEach(function (taxonomyVocabulary) {
              taxonomyVocabulary.existingItem =
                  RqlQueryService.findCriteriaItemFromTreeById(target,
                      CriteriaIdGenerator.generate(subTaxonomy, taxonomyVocabulary), $scope.search.criteria, true);
            });
          });
        } else {
          taxonomy.vocabularies.forEach(function (taxonomyVocabulary) {
            taxonomyVocabulary.existingItem =
                RqlQueryService.findCriteriaItemFromTreeById(target,
                    CriteriaIdGenerator.generate(taxonomy, taxonomyVocabulary), $scope.search.criteria, true);
          });
        }
      }

      function executeSearchQuery() {
        if (validateQueryData()) {
          // build the criteria UI
          RqlQueryService.createCriteria($scope.search.rqlQuery, $scope.lang).then(function (result) {
            // criteria UI is updated here
            $scope.search.criteria = result.root;

            if ($scope.search.criteria && $scope.search.criteria.children) {
              sortCriteriaItems($scope.search.criteria.children);
            }

            $scope.search.criteriaItemMap = result.map;

             if (canExecuteWithEmptyQuery()) {
              loadResults();
             }

            if ($scope.search.selectedTarget && $scope.search.selectedTaxonomy) {
              findAndSetCriteriaItemForTaxonomyVocabularies($scope.search.selectedTarget, $scope.search.selectedTaxonomy);
            }

            $scope.$broadcast('ngObibaMicaQueryUpdated', $scope.search.criteria);
          });
        }
      }

      function processTaxonomyVocabulary(target, taxonomy, taxonomyVocabulary) {
        function processExistingItem(existingItem) {
          if (existingItem) {
            if (VocabularyService.isNumericVocabulary(taxonomyVocabulary)) {
              taxonomyVocabulary.rangeTerms = existingItem.getRangeTerms();
            }

            if (VocabularyService.isMatchVocabulary(taxonomyVocabulary)) {
              taxonomyVocabulary.matchString = existingItem.selectedTerms.join('');
            }

            // when vocabulary has terms
            taxonomyVocabulary.wholeVocabularyIsSelected = ['exists','match'].indexOf(existingItem.type) > -1;
            (taxonomyVocabulary.terms || []).forEach(function (term) {
              term.selected = existingItem.type === 'exists' || existingItem.selectedTerms.indexOf(term.name) > -1;
            });
          } else {
            taxonomyVocabulary.rangeTerms = {};
            taxonomyVocabulary.matchString = null;

            // when vocabulary has terms
            taxonomyVocabulary.wholeVocabularyIsSelected = false;
            (taxonomyVocabulary.terms || []).forEach(function (term) {
              term.selected = false;
            });
          }

          taxonomyVocabulary._existingItem = existingItem;
        }

        taxonomyVocabulary.__defineSetter__('existingItem', processExistingItem);
        taxonomyVocabulary.__defineGetter__('existingItem', function () {  return taxonomyVocabulary._existingItem; });

        taxonomyVocabulary.existingItem =
            RqlQueryService.findCriteriaItemFromTreeById(target,
                CriteriaIdGenerator.generate(taxonomy, taxonomyVocabulary), $scope.search.criteria, true);
      }

      function onTaxonomyFilterPanelToggleVisibility(target, taxonomy) {
        if (target && taxonomy) {
          if (Array.isArray(taxonomy)) {
            taxonomy.forEach(function (subTaxonomy) {
              subTaxonomy.vocabularies.forEach(function (taxonomyVocabulary) {
                processTaxonomyVocabulary(target, subTaxonomy, taxonomyVocabulary);
              });
            });
          } else {
            taxonomy.vocabularies.forEach(function (taxonomyVocabulary) {
              processTaxonomyVocabulary(target, taxonomy, taxonomyVocabulary);
            });
          }
        }

        $scope.search.selectedTarget = target;
        $scope.search.selectedTaxonomy = taxonomy;
        $scope.search.showTaxonomyPanel = taxonomy !== null;

        // QUICKFIX for MK-1772 - there is a digest desync and UI misses info, resend the request upon closing
        // A good solution may be a RequestQueue.
        if (!$scope.search.showTaxonomyPanel) {
          loadResults();
        }
      }

      $scope.translateTaxonomyNav = function(t, key) {
        var value = t[key] && t[key].filter(function(item) {
          return item.locale === $translate.use();
        }).pop();

        return value ? value.text : key;
      };

      $rootScope.$on('$translateChangeSuccess', function (event, value) {
        if (value.language !== SearchContext.currentLocale()) {
          $scope.lang = $translate.use();
          SearchContext.setLocale($scope.lang);
          executeSearchQuery();
        }
      });

      var showTaxonomy = function (target, name) {
        if ($scope.target === target && $scope.taxonomyName === name && $scope.taxonomiesShown) {
          $scope.taxonomiesShown = false;
          return;
        }

        $scope.taxonomiesShown = true;
        $scope.target = target;
        $scope.taxonomyName = name;
      };

      var clearTaxonomy = function () {
        $scope.target = null;
        $scope.taxonomyName = null;
      };

      /**
       * Updates the URL location triggering a query execution
       */
      var refreshQuery = function () {
        var query = new RqlQuery().serializeArgs($scope.search.rqlQuery.args);
        var search = $location.search();
        if ('' === query) {
          delete search.query;
        } else {
          search.query = query;
        }
        $location.search(search);
      };

      var clearSearch = function () {
        $scope.documents.search.text = null;
        $scope.documents.search.active = false;
      };

      /**
       * Searches the criteria matching the input query
       *
       * @param query
       * @returns {*}
       */
      var searchCriteria = function (query) {
        // search for taxonomy terms
        // search for matching variables/studies/... count

        function score(item) {
          var result = 0;
          var regExp = new RegExp(query, 'ig');

          if (item.itemTitle.match(regExp)) {
            result = 10;
          } else if (item.itemDescription && item.itemDescription.match(regExp)) {
            result = 8;
          } else if (item.itemParentTitle.match(regExp)) {
            result = 6;
          } else if (item.itemParentDescription && item.itemParentDescription.match(regExp)) {
            result = 4;
          }

          return result;
        }

        // vocabulary (or term) can be used in search if it doesn't have the 'showSearch' attribute
        function canSearch(taxonomyEntity, hideSearchList) {
          if ((hideSearchList || []).indexOf(taxonomyEntity.name) > -1) {
            return false;
          }

          return (taxonomyEntity.attributes || []).filter(function (attr) { return attr.key === 'showSearch'; }).length === 0;
        }

        function processBundle(bundle) {
          var results = [];
          var total = 0;
          var target = bundle.target;
          var taxonomy = bundle.taxonomy;
          if (taxonomy.vocabularies) {
            taxonomy.vocabularies.filter(function (vocabulary) {
              return VocabularyService.isVisibleVocabulary(vocabulary) && canSearch(vocabulary, $scope.options.hideSearch);
            }).forEach(function (vocabulary) {
              if (vocabulary.terms) {
                vocabulary.terms.filter(function (term) {
                  return canSearch(term, $scope.options.hideSearch);
                }).forEach(function (term) {
                  var item = RqlQueryService.createCriteriaItem(target, taxonomy, vocabulary, term, $scope.lang);
                  results.push({
                    score: score(item),
                    item: item
                  });
                  total++;
                });
              } else {
                var item = RqlQueryService.createCriteriaItem(target, taxonomy, vocabulary, null, $scope.lang);
                results.push({
                  score: score(item),
                  item: item
                });
                total++;
              }
            });
          }
          return {results: results, total: total};
        }

        var criteria = TaxonomiesSearchResource.get({
          query: StringUtils.quoteQuery(query.replace(/\/.*/g, '')), locale: $scope.lang, target: $scope.documents.search.target
        }).$promise.then(function (response) {
          if (response) {
            var results = [];
            var total = 0;
            var size = 10;

            response.forEach(function (bundle) {
              var rval = processBundle(bundle);
              results.push.apply(results, rval.results);
              total = total + rval.total;
            });

            results.sort(function (a, b) {
              return b.score - a.score;
            });

            results = results.splice(0, size);

            if (total > results.length) {
              var note = {
                query: query,
                total: total,
                size: size,
                message: LocaleStringUtils.translate('search.showing', [size, total]),
                status: 'has-warning'
              };
              results.push({score: -1, item: note});
            }

            return results.map(function (result) {
              return result.item;
            });
          } else {
            return [];
          }
        }, function (response) {
          AlertService.alert({
            id: 'SearchController',
            type: 'danger',
            msg: ServerErrorUtils.buildMessage(response),
            delay: 5000
          });
        });

        return criteria;
      };

      /**
       * Removes the item from the criteria tree
       * @param item
       */
      var removeCriteriaItem = function (item) {
        RqlQueryService.removeCriteriaItem(item);
        refreshQuery();
      };

      /**
       * Propagates a Scope change that results in criteria panel update
       * @param item
       */
      var selectCriteria = function (item, logicalOp, replace, showNotification, fullCoverage) {
        if (angular.isUndefined(showNotification)) {
          showNotification = true;
        }

        if (item.id) {
          var id = CriteriaIdGenerator.generate(item.taxonomy, item.vocabulary);
          var existingItem = RqlQueryService.findCriteriaItemFromTree(item, $scope.search.criteria);
          var growlMsgKey;

          if (existingItem && id.indexOf('dceId') !== -1 && fullCoverage) {
            removeCriteriaItem(existingItem);
            growlMsgKey = 'search.criterion.updated';
            RqlQueryService.addCriteriaItem($scope.search.rqlQuery, item, logicalOp);
          } else if (existingItem) {
            growlMsgKey = 'search.criterion.updated';
            RqlQueryService.updateCriteriaItem(existingItem, item, replace);
          } else {
            growlMsgKey = 'search.criterion.created';
            RqlQueryService.addCriteriaItem($scope.search.rqlQuery, item, logicalOp);
          }

          if (showNotification) {
            AlertService.growl({
              id: 'SearchControllerGrowl',
              type: 'info',
              msgKey: growlMsgKey,
              msgArgs: [LocalizedValues.forLocale(item.vocabulary.title, $scope.lang), $filter('translate')('taxonomy.target.' + item.target)],
              delay: 3000
            });
          }

          refreshQuery();
          $scope.search.selectedCriteria = null;
        } else {
          $scope.search.selectedCriteria = item.query;
        }
      };

      var searchKeyUp = function (event) {
        switch (event.keyCode) {
          case 27: // ESC
            if ($scope.documents.search.active) {
              clearSearch();
            }
            break;

          default:
            if ($scope.documents.search.text) {
              searchCriteria($scope.documents.search.text);
            }
            break;
        }
      };

      var onTypeChanged = function (type) {
        if (type) {
          validateType(type);
          var search = $location.search();
          search.type = type;
          search.display = DISPLAY_TYPES.LIST;
          $location.search(search);
        }
      };

      var onBucketChanged = function (bucket) {
        if (bucket) {
          validateBucket(bucket);
          var search = $location.search();
          search.bucket = bucket;
          $location.search(search);
        }
      };

      var onPaginate = function (target, from, size) {
        $scope.search.pagination[target] = {from: from, size: size};
        executeSearchQuery();
      };

      var onDisplayChanged = function (display) {
        if (display) {
          validateDisplay(display);

          var search = $location.search();
          search.display = display;
          $location.search(search);
        }
      };

      /**
       * Reduce the current query such that all irrelevant criteria is removed but the criterion. The exceptions are
       * when the criterion is inside an AND, in this case this latter is reduced.
       *
       * @param parentItem
       * @param criteriaItem
       */
      function reduce(parentItem, criteriaItem) {
        if (parentItem.type === RQL_NODE.OR) {
          var grandParentItem = parentItem.parent;
          var parentItemIndex = grandParentItem.children.indexOf(parentItem);
          grandParentItem.children[parentItemIndex] = criteriaItem;

          var parentRql = parentItem.rqlQuery;
          var grandParentRql = grandParentItem.rqlQuery;
          var parentRqlIndex = grandParentRql.args.indexOf(parentRql);
          grandParentRql.args[parentRqlIndex] = criteriaItem.rqlQuery;

          if (grandParentItem.type !== QUERY_TARGETS.VARIABLE) {
            reduce(grandParentItem, criteriaItem);
          }
        } else if (criteriaItem.type !== RQL_NODE.VARIABLE && parentItem.type === RQL_NODE.AND) {
          // Reduce until parent is Variable node or another AND node
          reduce(parentItem.parent, parentItem);
        }
      }

      var onUpdateCriteria = function (item, type, useCurrentDisplay, replaceTarget, showNotification, fullCoverage) {
        if (type) {
          onTypeChanged(type);
        }

        if (replaceTarget) {
          var criteriaItem = RqlQueryService.findCriteriaItemFromTree(item, $scope.search.criteria);
          if (criteriaItem) {
            reduce(criteriaItem.parent, criteriaItem);
          }
        }

        onDisplayChanged(useCurrentDisplay && $scope.search.display ? $scope.search.display : DISPLAY_TYPES.LIST);
        selectCriteria(item, RQL_NODE.AND, true, showNotification, fullCoverage);
      };

      var onRemoveCriteria = function(item) {
        var found = RqlQueryService.findCriterion($scope.search.criteria, item.id);
        removeCriteriaItem(found);
      };

      var onSelectTerm = function (target, taxonomy, vocabulary, args) {
        args = args || {};

        if (args.text) {
          args.text = args.text.replace(/[^a-zA-Z0-9" _-]/g, '');
        }

        if(angular.isString(args)) {
          args = {term: args};
        }

        if (vocabulary) {
          var item;
          if (VocabularyService.isNumericVocabulary(vocabulary)) {
            item = RqlQueryService.createCriteriaItem(target, taxonomy, vocabulary, null, $scope.lang);
            item.rqlQuery = RqlQueryUtils.buildRqlQuery(item);
            RqlQueryUtils.updateRangeQuery(item.rqlQuery, args.from, args.to);
            selectCriteria(item, null, true);

            return;
          } else if(VocabularyService.isMatchVocabulary(vocabulary)) {
            item = RqlQueryService.createCriteriaItem(target, taxonomy, vocabulary, null, $scope.lang);
            item.rqlQuery = RqlQueryUtils.buildRqlQuery(item);
            RqlQueryUtils.updateMatchQuery(item.rqlQuery, args.text);
            selectCriteria(item, null, true);

            return;
          }
        }

        if (options.searchLayout === 'layout1') {
          selectCriteria(RqlQueryService.createCriteriaItem(target, taxonomy, vocabulary, args && args.term, $scope.lang));
        } else {
          // TODO externalize TermsVocabularyFacetController.selectTerm and use it for terms case
          var selected = vocabulary.terms.filter(function(t) {return t.selected;}).map(function(t) { return t.name; }),
              criterion = RqlQueryService.findCriterion($scope.search.criteria, CriteriaIdGenerator.generate(taxonomy, vocabulary));

          if(criterion) {
            if (selected.length === 0) {
              RqlQueryService.removeCriteriaItem(criterion);
            } else if (Object.keys(args).length === 0) {
              RqlQueryService.updateCriteriaItem(criterion, RqlQueryService.createCriteriaItem(target, taxonomy, vocabulary, args && args.term, $scope.lang), true);
            } else {
              criterion.rqlQuery.name = RQL_NODE.IN;
              RqlQueryUtils.updateQuery(criterion.rqlQuery, selected);

              if (vocabulary.terms.length > 1 && selected.length === vocabulary.terms.length) {
                criterion.rqlQuery.name = RQL_NODE.EXISTS;
                criterion.rqlQuery.args.pop();
              }
            }

            $scope.refreshQuery();
          } else {
            var setExists = vocabulary.terms.length > 1 && selected.length === vocabulary.terms.length;
            selectCriteria(RqlQueryService.createCriteriaItem(target, taxonomy, vocabulary, !setExists && (args && args.term), $scope.lang));
          }
        }
      };

      var selectSearchTarget = function (target) {
        $scope.documents.search.target = target;
      };

      var VIEW_MODES = {
        SEARCH: 'search',
        CLASSIFICATION: 'classification'
      };

      const SUGGESTION_FIELDS_MAP = new Map([
        [QUERY_TARGETS.NETWORK, ['acronym', 'name']],
        [QUERY_TARGETS.STUDY, ['acronym', 'name']],
        [QUERY_TARGETS.DATASET, ['acronym', 'name']],
        [QUERY_TARGETS.VARIABLE, ['name', 'label']]
      ]);

      function searchSuggestion(target, suggestion, withSpecificFields) {
        var rqlQuery = angular.copy($scope.search.rqlQuery);
        var targetQuery = RqlQueryService.findTargetQuery(target, rqlQuery);

        if (!targetQuery) {
          targetQuery = new RqlQuery(target);
          rqlQuery.push(targetQuery);
        }

        // get filter fields
        var filterFields;
        if (withSpecificFields) {
          filterFields = SUGGESTION_FIELDS_MAP.get(target);
        }

        var matchQuery = EntitySuggestionRqlUtilityService.createMatchQuery(suggestion, filterFields);
        if (!matchQuery) {
          EntitySuggestionRqlUtilityService.removeFilteredMatchQueryFromTargetQuery(targetQuery);
        } else {
          var filterQuery = EntitySuggestionRqlUtilityService.givenTargetQueryGetFilterQuery(targetQuery);
          if (!filterQuery) {
            targetQuery.push(new RqlQuery(RQL_NODE.FILTER).push(matchQuery));
          } else {
            var currentMatchQuery = EntitySuggestionRqlUtilityService.givenFilterQueryGetMatchQuery(filterQuery);
            if (currentMatchQuery) {
              currentMatchQuery.args = matchQuery.args;
            } else {
              filterQuery.push(matchQuery);
            }
          }
        }

        $scope.search.rqlQuery = rqlQuery;
        refreshQuery();
      }

      $scope.searchSuggestion = searchSuggestion;
      $scope.goToSearch = function () {
        $scope.viewMode = VIEW_MODES.SEARCH;
        $location.search('taxonomy', null);
        $location.search('vocabulary', null);
        $location.search('target', null);
        $location.path('/search');
      };

      $scope.goToClassifications = function () {
        $scope.viewMode = VIEW_MODES.CLASSIFICATION;
        $location.path('/classifications');
        $location.search('target', $scope.targetTabsOrder[0]);
      };

      $scope.navigateToTarget = function(target) {
        $location.search('target', target);
        $location.search('taxonomy', null);
        $location.search('vocabulary', null);
        $scope.target = target;
      };

      $scope.QUERY_TYPES = QUERY_TYPES;
      $scope.BUCKET_TYPES = BUCKET_TYPES;

      $scope.search = {
        selectedCriteria: null,
        layout: 'layout2',
        pagination: {},
        query: null,
        advanced: false,
        rqlQuery: new RqlQuery(),
        executedQuery: null,
        type: null,
        bucket: null,
        result: {
          list: null,
          coverage: null,
          graphics: null
        },
        criteria: [],
        criteriaItemMap: {},
        loading: false
      };

      $scope.viewMode = VIEW_MODES.SEARCH;
      $scope.documents = {
        search: {
          text: null,
          active: false,
          target: null
        }
      };

      $scope.searchHeaderTemplateUrl = ngObibaMicaSearchTemplateUrl.getHeaderUrl('search');
      $scope.classificationsHeaderTemplateUrl = ngObibaMicaSearchTemplateUrl.getHeaderUrl('classifications');
      $scope.onTaxonomyFilterPanelToggleVisibility = onTaxonomyFilterPanelToggleVisibility;
      $scope.selectSearchTarget = selectSearchTarget;
      $scope.selectDisplay = onDisplayChanged;
      $scope.searchCriteria = searchCriteria;
      $scope.selectCriteria = selectCriteria;
      $scope.searchKeyUp = searchKeyUp;

      $scope.showTaxonomy = showTaxonomy;
      $scope.clearTaxonomy = clearTaxonomy;

      $scope.removeCriteriaItem = removeCriteriaItem;
      $scope.refreshQuery = refreshQuery;
      $scope.clearSearchQuery = clearSearchQuery;
      $scope.toggleSearchQuery = toggleSearchQuery;
      $scope.showAdvanced = showAdvanced;

      $scope.onTypeChanged = onTypeChanged;
      $scope.onBucketChanged = onBucketChanged;
      $scope.onDisplayChanged = onDisplayChanged;
      $scope.onUpdateCriteria = onUpdateCriteria;
      $scope.onRemoveCriteria = onRemoveCriteria;
      $scope.onSelectTerm = onSelectTerm;
      $scope.QUERY_TARGETS = QUERY_TARGETS;
      $scope.onPaginate = onPaginate;
      $scope.canExecuteWithEmptyQuery = canExecuteWithEmptyQuery;
      $scope.inSearchMode = function() {
        return $scope.viewMode === VIEW_MODES.SEARCH;
      };
      $scope.toggleFullscreen = function() {
        $scope.isFullscreen = !$scope.isFullscreen;
      };
      $scope.isSearchAvailable = true;
      ObibaServerConfigResource.get(function(micaConfig){
        $scope.isSearchAvailable = !micaConfig.isSingleStudyEnabled ||
          (micaConfig.isNetworkEnabled && !micaConfig.isSingleNetworkEnabled) ||
          micaConfig.isCollectedDatasetEnabled || micaConfig.isHarmonizedDatasetEnabled;
      });

      $scope.$on('$locationChangeSuccess', function (event, newLocation, oldLocation) {
        initSearchTabs();

        if (newLocation !== oldLocation) {
          try {
            validateBucket($location.search().bucket);
            executeSearchQuery();
          } catch (error) {
            var defaultBucket = CoverageGroupByService.defaultBucket();
            $location.search('bucket', defaultBucket).replace();
          }
        }
      });

      $rootScope.$on('ngObibaMicaSearch.fullscreenChange', function(obj, isEnabled) {
        $scope.isFullscreen = isEnabled;
      });

      $rootScope.$on('ngObibaMicaSearch.sortChange', function(obj, sort) {
        $scope.search.rqlQuery = RqlQueryService.prepareSearchQueryNoFields(
          $scope.search.display,
          $scope.search.type,
          $scope.search.rqlQuery,
          {},
          $scope.lang,
          sort
        );
        refreshQuery();
      });

      $rootScope.$on('ngObibaMicaSearch.searchSuggestion', function (event, suggestion, target, withSpecificFields) {
        searchSuggestion(target, suggestion, withSpecificFields);
      });

      function init() {
        $scope.lang = $translate.use();
        SearchContext.setLocale($scope.lang);
        initSearchTabs();
        executeSearchQuery();
      }

      init();
    }])

  .controller('NumericVocabularyPanelController', ['$scope', function($scope) {
    $scope.$watch('taxonomies', function() {
      $scope.from = null;
      $scope.to = null;
    }, true);
  }])

  .controller('MatchVocabularyPanelController', ['$scope', function($scope) {
    $scope.$watch('taxonomies', function() {
      $scope.text = null;
    }, true);
  }])

  .controller('NumericVocabularyFacetController', ['$scope','JoinQuerySearchResource', 'RqlQueryService',
    'RqlQueryUtils', function($scope, JoinQuerySearchResource, RqlQueryService, RqlQueryUtils) {
    function updateLimits (criteria, vocabulary) {
      function createExistsQuery(criteria, criterion) {
        var rootQuery = angular.copy(criteria.rqlQuery);
        criterion.rqlQuery = RqlQueryUtils.buildRqlQuery(criterion);
        RqlQueryService.addCriteriaItem(rootQuery, criterion);
        return rootQuery;
      }

      var criterion = RqlQueryService.findCriterion(criteria, CriteriaIdGenerator.generate($scope.$parent.taxonomy, vocabulary));

      if(!criterion) {
        criterion = RqlQueryService.createCriteriaItem($scope.target, $scope.$parent.taxonomy, $scope.vocabulary);
      }

      if(criterion.rqlQuery && criterion.rqlQuery.args[1]) {
        if(angular.isArray(criterion.rqlQuery.args[1])) {
          $scope.from = criterion.rqlQuery.args[1][0];
          $scope.to = criterion.rqlQuery.args[1][1];
        } else {
          if(criterion.rqlQuery.name === RQL_NODE.GE) {
            $scope.from = criterion.rqlQuery.args[1];
          } else {
            $scope.to = criterion.rqlQuery.args[1];
          }
        }
      } else {
        $scope.from = null;
        $scope.to = null;
        $scope.min = null;
        $scope.max = null;
      }

      var query = RqlQueryUtils.hasTargetQuery(criteria.rqlQuery, criterion.target) ? angular.copy(criteria.rqlQuery) : createExistsQuery(criteria, criterion);
      var joinQuery = RqlQueryService.prepareCriteriaTermsQuery(query, criterion);
      JoinQuerySearchResource[targetToType($scope.target)]({query: joinQuery}).$promise.then(function (joinQueryResponse) {
        var stats = RqlQueryService.getTargetAggregations(joinQueryResponse, criterion, $scope.lang);

        if (stats && stats.default) {
          $scope.min = stats.default.min;
          $scope.max = stats.default.max;
        }
      });
    }

    function updateCriteria() {
      $scope.$parent.selectTerm($scope.$parent.target, $scope.$parent.taxonomy, $scope.vocabulary, {from: $scope.from, to: $scope.to});
    }

    $scope.onKeypress = function(ev) {
      if(ev.keyCode === 13 || ev.type==='click') { updateCriteria(); }
    };

    $scope.$on('ngObibaMicaQueryUpdated', function(ev, criteria) {
      if ($scope.vocabulary.isNumeric && $scope.vocabulary.isOpen) {
        updateLimits(criteria, $scope.vocabulary);
      }
    });

    $scope.$on('ngObibaMicaLoadVocabulary', function(ev, taxonomy, vocabulary) {
      if ($scope.vocabulary.isNumeric &&
        vocabulary.name === $scope.vocabulary.name && !vocabulary.isOpen) {
        updateLimits($scope.criteria, vocabulary);
      }
    });
  }])

  .controller('MatchVocabularyFacetController', ['$scope', 'RqlQueryService', function($scope, RqlQueryService) {
    function updateMatch (criteria, vocabulary) {
      var criterion = RqlQueryService.findCriterion(criteria, CriteriaIdGenerator.generate($scope.$parent.taxonomy, vocabulary));
      if(criterion && criterion.rqlQuery && criterion.rqlQuery.args[1]) {
        $scope.text = criterion.rqlQuery.args[0];
      } else {
        $scope.text = null;
      }
    }

    function updateCriteria() {
      $scope.$parent.selectTerm($scope.$parent.target, $scope.$parent.taxonomy, $scope.vocabulary, {text: $scope.text || '*'});
    }

    $scope.onKeypress = function(ev) {
      if(ev.keyCode === 13 || ev.type==='click') {
        updateCriteria();
      }
    };

    $scope.$on('ngObibaMicaQueryUpdated', function(ev, criteria) {
      if ($scope.vocabulary.isMatch && $scope.vocabulary.isOpen) {
        updateMatch(criteria, $scope.vocabulary);
      }
    });

    $scope.$on('ngObibaMicaLoadVocabulary', function(ev, taxonomy, vocabulary) {
      if (vocabulary.name === $scope.vocabulary.name && !vocabulary.isOpen) {
        updateMatch($scope.criteria, vocabulary);
      }
    });
  }])

  .controller('TermsVocabularyFacetController', ['$scope', '$filter', 'JoinQuerySearchResource', 'RqlQueryService',
    'RqlQueryUtils',
    function($scope, $filter, JoinQuerySearchResource, RqlQueryService, RqlQueryUtils) {
      function isSelectedTerm (criterion, term) {
        return criterion.selectedTerms && (criterion.rqlQuery.name === RQL_NODE.EXISTS || criterion.selectedTerms.indexOf(term.key) !== -1);
      }

      $scope.loading = false;
      $scope.selectTerm = function (target, taxonomy, vocabulary, args) {
        var selected = vocabulary.terms.filter(function(t) {return t.selected;}).map(function(t) { return t.name; }),
          criterion = RqlQueryService.findCriterion($scope.criteria, CriteriaIdGenerator.generate(taxonomy, vocabulary));

        if(criterion) {
          if (selected.length === 0) {
            RqlQueryService.removeCriteriaItem(criterion);
          } else {
            criterion.rqlQuery.name = RQL_NODE.IN;
            RqlQueryUtils.updateQuery(criterion.rqlQuery, selected);
          }

          $scope.onRefresh();
        } else {
          $scope.onSelectTerm(target, taxonomy, vocabulary, args);
        }
      };

      function updateCounts(criteria, vocabulary) {
        var query = null, isCriterionPresent = false;
        $scope.loading = true;

        function createExistsQuery(criteria, criterion) {
          var rootQuery = angular.copy(criteria.rqlQuery);
          criterion.rqlQuery = RqlQueryUtils.buildRqlQuery(criterion);
          RqlQueryService.addCriteriaItem(rootQuery, criterion);
          return rootQuery;
        }

        var criterion = RqlQueryService.findCriterion(criteria,
          CriteriaIdGenerator.generate($scope.$parent.taxonomy, vocabulary));

        if(criterion) {
          isCriterionPresent = true;
        } else {
          criterion = RqlQueryService.createCriteriaItem($scope.target, $scope.$parent.taxonomy, $scope.vocabulary);
        }

        if(RqlQueryUtils.hasTargetQuery(criteria.rqlQuery, criterion.target)) {
          query = angular.copy(criteria.rqlQuery);

          if(!isCriterionPresent) {
            var operator = criterion.target === QUERY_TARGETS.VARIABLE && criterion.taxonomy.name !== 'Mica_variable' ?
              RQL_NODE.OR :
              RQL_NODE.AND;

            RqlQueryService.addCriteriaItem(query, criterion, operator);
          }
        } else {
          query = createExistsQuery(criteria, criterion);
        }

        var joinQuery = RqlQueryService.prepareCriteriaTermsQuery(query, criterion, criterion.lang);
        JoinQuerySearchResource[targetToType($scope.target)]({query: joinQuery}).$promise.then(function (joinQueryResponse) {
          $scope.vocabulary.visibleTerms = 0;
          RqlQueryService.getTargetAggregations(joinQueryResponse, criterion, criterion.lang).forEach(function (term) {
            $scope.vocabulary.terms.some(function(t) {
              if (t.name === term.key) {
                t.selected = isSelectedTerm(criterion, term);
                t.count = term.count;
                t.isVisible = $scope.options.showFacetTermsWithZeroCount || term.count > 0;
                $scope.vocabulary.visibleTerms += t.isVisible;
                return true;
              }
            });
          });
          $scope.loading = false;
        });
      }

      $scope.$on('ngObibaMicaQueryUpdated', function(ev, criteria) {
        if(!$scope.vocabulary.isNumeric && !$scope.vocabulary.isMatch && $scope.vocabulary.isOpen) {
          updateCounts(criteria, $scope.vocabulary);
        }
      });

      $scope.$on('ngObibaMicaLoadVocabulary', function(ev, taxonomy, vocabulary) {
        if(vocabulary.name === $scope.vocabulary.name && !$scope.vocabulary.isNumeric && !$scope.vocabulary.isMatch &&
          !vocabulary.isOpen) {
          updateCounts($scope.criteria, vocabulary);
        }
      });
  }])

  .controller('TaxonomiesPanelController', ['$rootScope',
    '$scope',
    '$translate',
    '$location',
    'TaxonomyResource',
    'TaxonomiesResource',
    'ngObibaMicaSearch',
    'RqlQueryUtils',
    '$cacheFactory',
    'AlertService',
    'ServerErrorUtils',
    'VocabularyService',
    TaxonomiesPanelController])

  .controller('ClassificationPanelController', ['$rootScope',
    '$scope',
    '$translate',
    '$location',
    'TaxonomyResource',
    'TaxonomiesResource',
    'ngObibaMicaSearch',
    'RqlQueryUtils',
    '$cacheFactory',
    'VocabularyService',
    ClassificationPanelController])

  .controller('TaxonomiesFacetsController', ['$scope',
    '$timeout',
    'TaxonomyResource',
    'TaxonomiesResource',
    'LocalizedValues',
    'ngObibaMicaSearch',
    'RqlQueryUtils',
    'VocabularyService',
    function ($scope,
      $timeout,
      TaxonomyResource,
      TaxonomiesResource,
      LocalizedValues,
      ngObibaMicaSearch,
      RqlQueryUtils,
      VocabularyService) {

      $scope.options = ngObibaMicaSearch.getOptions();
      $scope.taxonomies = {};
      $scope.targets = [];
      $scope.RqlQueryUtils = RqlQueryUtils;

      $scope.$watch('facetedTaxonomies', function(facetedTaxonomies) {
        if(facetedTaxonomies) {
          $scope.targets = $scope.options.targetTabsOrder.filter(function (t) {
            if(facetedTaxonomies[t]){
              return facetedTaxonomies[t].length;
            }
          });

          $scope.target = $scope.targets[0];
          init($scope.target);
        }
      });

      $scope.selectTerm = function(target, taxonomy, vocabulary, args) {
        $scope.onSelectTerm(target, taxonomy, vocabulary, args);
      };

      $scope.setTarget = function(target) {
        $scope.target=target;
        init(target);
      };

      $scope.loadVocabulary = function(taxonomy, vocabulary) {
        $scope.$broadcast('ngObibaMicaLoadVocabulary', taxonomy, vocabulary);
      };

      $scope.localize = function (values) {
        return LocalizedValues.forLocale(values, $scope.lang);
      };

      function init(target) {
        if($scope.taxonomies[target]) { return; }

        TaxonomiesResource.get({
          target: target
        }, function onSuccess(taxonomies) {
          $scope.taxonomies[target] = $scope.facetedTaxonomies[target].map(function(f) {
            return taxonomies.filter(function(t) {
              return f.name === t.name;
            })[0];
          }).filter(function(t) { return t; }).map(function(t) {
            t.isOpen = false;
            t.vocabularies = 'Maelstrom Research' === t.author ?
              t.vocabularies :
              VocabularyService.visibleFacetVocabularies(t.vocabularies);

            t.vocabularies.map(function (v) {
              var facetAttributes = VocabularyService.findVocabularyAttributes(v, /^facet/i);
              v.isOpen = 'true' === facetAttributes.facetExpanded;
              v.position = parseInt(facetAttributes.facetPosition);
              v.limit = 10;
              v.isMatch = VocabularyService.isMatchVocabulary(v);
              v.isNumeric = VocabularyService.isNumericVocabulary(v);

              t.isOpen = t.isOpen || v.isOpen;
            });

            return t;
          });

          if($scope.taxonomies[target].length === 1) {
            $scope.taxonomies[target][0].isOpen = 1;
          }

          if ($scope.criteria) {
            $timeout(function(){
              $scope.$broadcast('ngObibaMicaQueryUpdated', $scope.criteria);
            });
          }
        });
      }

      $scope.$on('ngObibaMicaQueryUpdated', function(ev, criteria) {
        $scope.criteria = criteria;
      });
    }
  ])
  .controller('CriterionLogicalController', [
    '$scope',
    function ($scope) {
      $scope.updateLogical = function (operator) {
        $scope.item.rqlQuery.name = operator;
        $scope.$emit(CRITERIA_ITEM_EVENT.refresh);
      };
    }])
   
  .controller('ResultTabsOrderCountController', [function(){
  }]);
