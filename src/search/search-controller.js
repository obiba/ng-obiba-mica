/*
 * Copyright (c) 2016 OBiBa. All rights reserved.
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

/**
 * State shared between Criterion DropDown and its content directives
 *
 * @constructor
 */
function CriterionState() {
  var onOpenCallbacks = [];
  var onCloseCallbacks = [];

  this.dirty = false;
  this.open = false;
  this.loading = true;

  this.addOnOpen = function (callback) {
    onOpenCallbacks.push(callback);
  };

  this.addOnClose = function (callback) {
    onCloseCallbacks.push(callback);
  };

  this.onOpen = function () {
    onOpenCallbacks.forEach(function (callback) {
      callback();
    });
  };

  this.onClose = function () {
    onCloseCallbacks.forEach(function (callback) {
      callback();
    });
  };
}

angular.module('obiba.mica.search')

  .controller('SearchController', [
    '$scope',
    '$timeout',
    '$routeParams',
    '$location',
    'TaxonomiesSearchResource',
    'TaxonomiesResource',
    'TaxonomyResource',
    'VocabularyResource',
    'ngObibaMicaSearchTemplateUrl',
    'ngObibaMicaSearch',
    'JoinQuerySearchResource',
    'JoinQueryCoverageResource',
    'AlertService',
    'ServerErrorUtils',
    'LocalizedValues',
    'RqlQueryService',
    'RqlQueryUtils',
    'SearchContext',
    function ($scope,
              $timeout,
              $routeParams,
              $location,
              TaxonomiesSearchResource,
              TaxonomiesResource,
              TaxonomyResource,
              VocabularyResource,
              ngObibaMicaSearchTemplateUrl,
              ngObibaMicaSearch,
              JoinQuerySearchResource,
              JoinQueryCoverageResource,
              AlertService,
              ServerErrorUtils,
              LocalizedValues,
              RqlQueryService,
              RqlQueryUtils,
              SearchContext) {
      $scope.options = ngObibaMicaSearch.getOptions();
      $scope.taxonomyTypeMap = { //backwards compatibility for pluralized naming in configs.
        variable: 'variables',
        study: 'studies',
        network: 'networks',
        dataset: 'datasets'
      };
      var taxonomyTypeInverseMap = Object.keys($scope.taxonomyTypeMap).reduce(function (prev, k) {
        prev[$scope.taxonomyTypeMap[k]] = k;
        return prev;
      }, {});

      $scope.lang = LocalizedValues.getLocal();
      $scope.metaTaxonomy = TaxonomyResource.get({
        target: 'taxonomy',
        taxonomy: 'Mica_taxonomy'
      });

      var searchTaxonomyDisplay = {
        variable: $scope.options.variables.showSearchTab,
        dataset: $scope.options.datasets.showSearchTab,
        study: $scope.options.studies.showSearchTab,
        network: $scope.options.networks.showSearchTab
      };

      function initSearchTabs() {
        $scope.taxonomyNav = [];

        function getTabsOrderParam(arg) {
          var value = $location.search()[arg];

          return value && value.split(',')
              .filter(function (t) { return t; })
              .map(function (t) { return t.trim(); });
        }

        var taxonomyTabsOrderParam = getTabsOrderParam('taxonomyTabsOrder');
        $scope.taxonomyTabsOrder = (taxonomyTabsOrderParam || $scope.options.taxonomyTabsOrder).filter(function (t) {
          return searchTaxonomyDisplay[t];
        });

        var searchTabsOrderParam = getTabsOrderParam('searchTabsOrder');
        $scope.searchTabsOrder = searchTabsOrderParam || $scope.options.searchTabsOrder;

        var resultTabsOrderParam = getTabsOrderParam('resultTabsOrder');
        $scope.resultTabsOrder = (resultTabsOrderParam || $scope.options.resultTabsOrder).filter(function (t) {
          return searchTaxonomyDisplay[t];
        });

        $scope.metaTaxonomy.$promise.then(function(metaTaxonomy){
          $scope.taxonomyTabsOrder.forEach(function(target) {
            var targetVocabulary = metaTaxonomy.vocabularies.filter(function(vocabulary){
              return vocabulary.name === target;
            }).pop();
            if(targetVocabulary && targetVocabulary.terms) {
              targetVocabulary.terms.forEach(function(term) {
                term.target = target;
                var title = term.title.filter(function (t) { return t.locale === $scope.lang; })[0];
                var description = term.description ? term.description.filter(function (t) { return t.locale === $scope.lang; })[0] : undefined;
                term.locale = {
                  title: title,
                  description: description
                };
                if(term.terms) {
                  term.terms.forEach(function(trm) {
                    var title = trm.title.filter(function (t) { return t.locale === $scope.lang; })[0];
                    var description = trm.description ? trm.description.filter(function (t) { return t.locale === $scope.lang; })[0] : undefined;
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
        });
      }

      initSearchTabs();

      function onError(response) {
        AlertService.alert({
          id: 'SearchController',
          type: 'danger',
          msg: ServerErrorUtils.buildMessage(response),
          delay: 5000
        });
      }

      function validateType(type) {
        if (!type || !QUERY_TYPES[type.toUpperCase()]) {
          throw new Error('Invalid type: ' + type);
        }
      }

      function validateBucket(bucket) {
        if (!bucket || !BUCKET_TYPES[bucket.toUpperCase()]) {
          throw new Error('Invalid bucket: ' + bucket);
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

      function getDefaultBucketType() {
        // TODO settings
        return BUCKET_TYPES.STUDY;
      }

      function getDefaultDisplayType() {
        return $scope.searchTabsOrder[0] || DISPLAY_TYPES.LIST;
      }

      function validateQueryData() {
        try {
          var search = $location.search();
          var type = $scope.resultTabsOrder.indexOf(taxonomyTypeInverseMap[search.type]) > -1 ? search.type : getDefaultQueryType();
          var bucket = search.bucket || getDefaultBucketType();
          var display = $scope.searchTabsOrder.indexOf(search.display) > -1 ? search.display : getDefaultDisplayType();
          var query = search.query || '';
          validateType(type);
          validateBucket(bucket);
          validateDisplay(display);
          $scope.search.type = type;
          $scope.search.bucket = bucket;
          $scope.search.display = display;
          $scope.search.query = query;
          $scope.search.rqlQuery = new RqlParser().parse(query);

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

      var clearSearchQuery = function() {
        var search = $location.search();
        delete search.query;
        $location.search(search).replace();
      };

      function executeSearchQuery() {
        if (validateQueryData()) {
          // build the criteria UI
          RqlQueryService.createCriteria($scope.search.rqlQuery, $scope.lang).then(function (result) {
            // criteria UI is updated here
            $scope.search.criteria = result.root;
            if ($scope.search.criteria && $scope.search.criteria.children) {
              $scope.search.criteria.children.sort(function (a, b) {
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
            $scope.search.criteriaItemMap = result.map;
          });

          var localizedQuery =
            RqlQueryService.prepareSearchQuery(
              $scope.search.type,
              $scope.search.rqlQuery,
              $scope.search.pagination,
              $scope.lang,
              $scope.search.type === 'variables' ? 'name' : 'acronym.' + $scope.lang
            );

          $scope.search.loading = true;
          switch ($scope.search.display) {
            case DISPLAY_TYPES.LIST:
              $scope.search.executedQuery = localizedQuery;
              JoinQuerySearchResource[$scope.search.type]({query: localizedQuery},
                function onSuccess(response) {
                  $scope.search.result.list = response;
                  $scope.search.loading = false;
                },
                onError);
              break;
            case DISPLAY_TYPES.COVERAGE:
              $scope.search.executedQuery = RqlQueryService.prepareCoverageQuery(localizedQuery, $scope.search.bucket);
              JoinQueryCoverageResource.get({query: $scope.search.executedQuery},
                function onSuccess(response) {
                  $scope.search.result.coverage = response;
                  $scope.search.loading = false;
                },
                onError);
              break;
            case DISPLAY_TYPES.GRAPHICS:
              $scope.search.executedQuery = RqlQueryService.prepareGraphicsQuery(localizedQuery,
                ['Mica_study.populations-selectionCriteria-countriesIso', 'Mica_study.populations-dataCollectionEvents-bioSamples', 'Mica_study.numberOfParticipants-participant-number'],
                ['Mica_study.methods-designs']);
              JoinQuerySearchResource.studies({query: $scope.search.executedQuery},
                function onSuccess(response) {
                  $scope.search.result.graphics = response;
                  $scope.search.loading = false;
                },
                onError);
              break;
          }
        }
      }

      ngObibaMicaSearch.getLocale(function (locales) {
        if (angular.isArray(locales)) {
          $scope.tabs = locales;
          $scope.setLocale(locales[0]);
        } else {
          $scope.setLocale(locales || $scope.lang);
        }
      });

      $scope.setLocale = function (locale) {
        $scope.lang = locale;
        SearchContext.setLocale($scope.lang);
        executeSearchQuery();
      };

      var showTaxonomy = function(target, name) {
        $scope.target = target;
        $scope.taxonomyName = name;
      };

      var clearTaxonomy = function() {
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
        $location.search(search).replace();
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
        return TaxonomiesSearchResource.get({
          query: query, locale: $scope.lang, target: $scope.documents.search.target
        }).$promise.then(function (response) {
          if (response) {
            var results = [];
            var total = 0;
            var size = 10;
            response.forEach(function (bundle) {
              var target = bundle.target;
              var taxonomy = bundle.taxonomy;
              if (taxonomy.vocabularies) {
                taxonomy.vocabularies.filter(function(vocabulary) {
                  // exclude results which are ids used for relations
                  return !(['dceIds', 'studyId', 'studyIds', 'networkId', 'datasetId'].filter(function(val) {
                    return vocabulary.name === val;
                  }).pop());
                }).forEach(function (vocabulary) {
                  if (vocabulary.terms) {
                    vocabulary.terms.forEach(function (term) {
                      if (results.length < size) {
                        results.push(RqlQueryService.createCriteriaItem(target, taxonomy, vocabulary, term, $scope.lang));
                      }
                      total++;
                    });
                  } else {
                    if (results.length < size) {
                      results.push(RqlQueryService.createCriteriaItem(target, taxonomy, vocabulary, null, $scope.lang));
                    }
                    total++;
                  }
                });
              }
            });
            if (total > results.length) {
              var note = {
                query: query,
                total: total,
                size: size,
                message: 'Showing ' + size + ' / ' + total,
                status: 'has-warning'
              };
              results.push(note);
            }
            return results;
          } else {
            return [];
          }
        });
      };

      /**
       * Propagates a Scope change that results in criteria panel update
       * @param item
       */
      var selectCriteria = function (item, logicalOp, replace) {
        if (item.id) {
          var id = CriteriaIdGenerator.generate(item.taxonomy, item.vocabulary);
          var existingItem = $scope.search.criteriaItemMap[id];

          if (existingItem) {
            RqlQueryService.updateCriteriaItem(existingItem, item, replace);
          } else {
            RqlQueryService.addCriteriaItem($scope.search.rqlQuery, item, logicalOp);
          }

          refreshQuery();
          $scope.selectedCriteria = null;
        } else {
          $scope.selectedCriteria = item.query;
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
          $location.search(search).replace();
        }
      };

      var onBucketChanged = function (bucket) {
        if (bucket) {
          validateBucket(bucket);
          var search = $location.search();
          search.bucket = bucket;
          $location.search(search).replace();
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
          $location.search(search).replace();
        }
      };

      var onUpdateCriteria = function (item, type, useCurrentDisplay, replaceTarget) {
        if (type) {
          onTypeChanged(type);
        }

        if(replaceTarget) {
          Object.keys($scope.search.criteriaItemMap).forEach(function(k) {
            if($scope.search.criteriaItemMap[k].target === item.target) {
              RqlQueryService.removeCriteriaItem($scope.search.criteriaItemMap[k]);
              delete $scope.search.criteriaItemMap[k];
            }
          });
        }

        onDisplayChanged(useCurrentDisplay && $scope.search.display ? $scope.search.display : DISPLAY_TYPES.LIST);
        selectCriteria(item, RQL_NODE.AND, true);
      };

      var onSelectTerm = function (target, taxonomy, vocabulary, term) {
        if (vocabulary && RqlQueryUtils.isNumericVocabulary(vocabulary)) {
          selectCriteria(RqlQueryService.createCriteriaItem(target, taxonomy, vocabulary, null, $scope.lang));
          return;
        }

        selectCriteria(RqlQueryService.createCriteriaItem(target, taxonomy, vocabulary, term, $scope.lang));
      };

      var selectSearchTarget = function(target) {
        $scope.documents.search.target = target;
      };

      /**
       * Removes the item from the criteria tree
       * @param item
       */
      var removeCriteriaItem = function (item) {
        RqlQueryService.removeCriteriaItem(item);
        refreshQuery();
      };

      $scope.QUERY_TYPES = QUERY_TYPES;
      $scope.BUCKET_TYPES = BUCKET_TYPES;

      $scope.search = {
        pagination: {},
        query: null,
        rqlQuery: null,
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

      $scope.documents = {
        search: {
          text: null,
          active: false,
          target: QUERY_TARGETS.VARIABLE
        }
      };

      $scope.headerTemplateUrl = ngObibaMicaSearchTemplateUrl.getHeaderUrl('view');
      $scope.selectSearchTarget = selectSearchTarget;
      $scope.searchCriteria = searchCriteria;
      $scope.selectCriteria = selectCriteria;
      $scope.searchKeyUp = searchKeyUp;

      $scope.showTaxonomy = showTaxonomy;
      $scope.clearTaxonomy = clearTaxonomy;

      $scope.removeCriteriaItem = removeCriteriaItem;
      $scope.refreshQuery = refreshQuery;
      $scope.clearSearchQuery = clearSearchQuery;

      $scope.onTypeChanged = onTypeChanged;
      $scope.onBucketChanged = onBucketChanged;
      $scope.onDisplayChanged = onDisplayChanged;
      $scope.onUpdateCriteria = onUpdateCriteria;
      $scope.onSelectTerm = onSelectTerm;
      $scope.QUERY_TARGETS = QUERY_TARGETS;

      $scope.onPaginate = onPaginate;

      $scope.$watch('search', function () {
        executeSearchQuery();
      });

      $scope.$on('$locationChangeSuccess', function (newLocation, oldLocation) {
        initSearchTabs();
        if (newLocation !== oldLocation) {
          executeSearchQuery();
        }
      });
    }])

  .controller('TaxonomiesPanelController', ['$scope', 'VocabularyResource', 'TaxonomyResource', 'TaxonomiesResource',
    function($scope, VocabularyResource, TaxonomyResource, TaxonomiesResource) {
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
        target: 'variable',
        taxonomy: null,
        vocabulary: null
      };

      var groupTaxonomies = function (taxonomies, target) {
        var res = taxonomies.reduce(function (res, t) {
          res[t.name] = t;
          return res;
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
            var title = v.title.filter(function (t) { return t.locale === $scope.lang; })[0];
            var description = v.description ? v.description.filter(function (t) { return t.locale === $scope.lang; })[0] : undefined;

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

      var filterTaxonomies = function (query) {
        $scope.taxonomies.search.active = true;
        if (query && query.length === 1) {
          $scope.taxonomies.search.active = false;
          return;
        }
        // taxonomy filter
        if ($scope.taxonomies.taxonomy) {
          if ($scope.taxonomies.vocabulary) {
            VocabularyResource.get({
              target: $scope.taxonomies.target,
              taxonomy: $scope.taxonomies.taxonomy.name,
              vocabulary: $scope.taxonomies.vocabulary.name,
              query: query
            }, function onSuccess(response) {
              $scope.taxonomies.vocabulary.terms = response.terms;
              $scope.taxonomies.search.active = false;
            });
          } else {
            TaxonomyResource.get({
              target: $scope.taxonomies.target,
              taxonomy: $scope.taxonomies.taxonomy.name,
              query: query
            }, function onSuccess(response) {
              $scope.taxonomies.taxonomy.vocabularies = response.vocabularies;
              $scope.taxonomies.search.active = false;
            });
          }
        } else {
          TaxonomiesResource.get({
            target: $scope.taxonomies.target,
            query: query
          }, function onSuccess(taxonomies) {
            $scope.taxonomies.all = taxonomies;
            groupTaxonomies(taxonomies, $scope.taxonomies.target);
            $scope.taxonomies.search.active = false;
          });
        }
      };

      var navigateTaxonomy = function (taxonomy, vocabulary, term) {
        var toFilter = ($scope.taxonomies.taxonomy && !taxonomy) || ($scope.taxonomies.vocabulary && !vocabulary);
        $scope.taxonomies.taxonomy = taxonomy;
        $scope.taxonomies.vocabulary = vocabulary;
        $scope.taxonomies.term = term;

        if (toFilter) {
          filterTaxonomies($scope.taxonomies.search.text);
        }
      };

      var selectTerm = function (target, taxonomy, vocabulary, term) {
         $scope.onSelectTerm(target, taxonomy, vocabulary, term);
      };

      $scope.$watchGroup(['taxonomyName', 'target'], function(newVal) {
        if(newVal[0] && newVal[1]) {
          if($scope.showTaxonomies) {
            $scope.showTaxonomies();
          }
          $scope.taxonomies.target = newVal[1];
          $scope.taxonomies.search.active = false;
          $scope.taxonomies.all = null;
          $scope.taxonomies.taxonomy = null;
          $scope.taxonomies.vocabulary = null;
          $scope.taxonomies.term = null;
          TaxonomyResource.get({
            target: newVal[1],
            taxonomy: newVal[0]
          }, function onSuccess(response) {
            $scope.taxonomies.taxonomy = response;
            $scope.taxonomies.search.active = false;
          });
        } else if (newVal[1]) {
          $scope.taxonomies.target = newVal[1];
          $scope.taxonomies.search.active = false;
          $scope.taxonomies.all = null;
          $scope.taxonomies.taxonomy = null;
          $scope.taxonomies.vocabulary = null;
          $scope.taxonomies.term = null;
          TaxonomiesResource.get({
            target: $scope.taxonomies.target
          }, function onSuccess(taxonomies) {
            $scope.taxonomies.all = taxonomies;
            groupTaxonomies(taxonomies, $scope.taxonomies.target);
            $scope.taxonomies.search.active = false;
          });
        }
      });

      $scope.navigateTaxonomy = navigateTaxonomy;
      $scope.selectTerm = selectTerm;
  }])

  .controller('SearchResultController', [
    '$scope',
    'ngObibaMicaSearch',
    function ($scope,
              ngObibaMicaSearch) {

      function updateTarget(type) {
        Object.keys($scope.activeTarget).forEach(function(key){
          $scope.activeTarget[key].active = type === key;
        });
      }

      $scope.targetTypeMap = $scope.$parent.taxonomyTypeMap;
      $scope.QUERY_TARGETS = QUERY_TARGETS;
      $scope.QUERY_TYPES = QUERY_TYPES;
      $scope.options = ngObibaMicaSearch.getOptions();
      $scope.activeDisplay = {};
      $scope.activeDisplay[$scope.display] = true;
      $scope.activeTarget = {};
      $scope.activeTarget[QUERY_TYPES.VARIABLES] = {active: false, name: QUERY_TARGETS.VARIABLE, totalHits: 0};
      $scope.activeTarget[QUERY_TYPES.DATASETS] = {active: false, name: QUERY_TARGETS.DATASET, totalHits: 0};
      $scope.activeTarget[QUERY_TYPES.STUDIES] = {active: false, name: QUERY_TARGETS.STUDY, totalHits: 0};
      $scope.activeTarget[QUERY_TYPES.NETWORKS] = {active: false, name: QUERY_TARGETS.NETWORK, totalHits: 0};

      $scope.selectDisplay = function (display) {
        $scope.activeDisplay = {};
        $scope.activeDisplay[display] = true;
        $scope.display = display;
        $scope.$parent.onDisplayChanged(display);
      };

      $scope.selectTarget = function (type) {
        updateTarget(type);
        $scope.type = type;
        $scope.$parent.onTypeChanged(type);
      };

      $scope.$watchCollection('result', function () {
        if ($scope.result.list) {
          $scope.activeTarget[QUERY_TYPES.VARIABLES].totalHits = $scope.result.list.variableResultDto.totalHits;
          $scope.activeTarget[QUERY_TYPES.DATASETS].totalHits = $scope.result.list.datasetResultDto.totalHits;
          $scope.activeTarget[QUERY_TYPES.STUDIES].totalHits = $scope.result.list.studyResultDto.totalHits;
          $scope.activeTarget[QUERY_TYPES.NETWORKS].totalHits = $scope.result.list.networkResultDto.totalHits;
        }
      });


      $scope.$watch('type', function (type) {
        updateTarget(type);
      });

      $scope.$watch('display', function (display) {
        $scope.activeDisplay = {};
        $scope.activeDisplay[display] = true;
      });

      $scope.DISPLAY_TYPES = DISPLAY_TYPES;
    }])

  .controller('CriterionLogicalController', [
    '$scope',
    function ($scope) {
      $scope.updateLogical = function (operator) {
        $scope.item.rqlQuery.name = operator;
        $scope.$emit(CRITERIA_ITEM_EVENT.refresh);
      };
    }])

  .controller('CriterionDropdownController', [
    '$scope',
    '$filter',
    'LocalizedValues',
    'RqlQueryUtils',
    'StringUtils',
    function ($scope, $filter, LocalizedValues, RqlQueryUtils, StringUtils) {
      var closeDropdown = function () {
        if (!$scope.state.open) {
          return;
        }

        $scope.state.onClose();

        var wasDirty = $scope.state.dirty;
        $scope.state.open = false;
        $scope.state.dirty = false;
        if (wasDirty) {
          // trigger a query update
          $scope.$emit(CRITERIA_ITEM_EVENT.refresh);
        }
      };

      var openDropdown = function () {
        if ($scope.state.open) {
          closeDropdown();
          return;
        }

        $scope.state.open = true;
        $scope.state.onOpen();
      };

      var remove = function () {
        $scope.$emit(CRITERIA_ITEM_EVENT.deleted, $scope.criterion);
      };

      var onKeyup = function(event) {
        if (event.keyCode === 13) {
          closeDropdown();
        }
      };

      $scope.state = new CriterionState();
      $scope.localize = function (values) {
        return LocalizedValues.forLocale(values, $scope.criterion.lang);
      };
      $scope.localizeCriterion = function () {
        var rqlQuery = $scope.criterion.rqlQuery;
        if (rqlQuery.name === RQL_NODE.IN && $scope.criterion.selectedTerms && $scope.criterion.selectedTerms.length > 0) {
          return $scope.criterion.selectedTerms.map(function (t) {
            if (!$scope.criterion.vocabulary.terms) {
              return t;
            }
            var found = $scope.criterion.vocabulary.terms.filter(function (arg) {
              return arg.name === t;
            }).pop();
            return found ? LocalizedValues.forLocale(found.title, $scope.criterion.lang) : t;
          }).join(' | ');
        }
        var operation = rqlQuery.name;
        switch (rqlQuery.name) {
          case RQL_NODE.EXISTS:
            operation = ':' + $filter('translate')('any');
            break;
          case RQL_NODE.MISSING:
            operation = ':' + $filter('translate')('none');
            break;
          case RQL_NODE.EQ:
            operation = '=' + rqlQuery.args[1];
            break;
          case RQL_NODE.GE:
            operation = '>' + rqlQuery.args[1];
            break;
          case RQL_NODE.LE:
            operation = '<' + rqlQuery.args[1];
            break;
          case RQL_NODE.BETWEEN:
            operation = ':[' + rqlQuery.args[1] + ')';
            break;
          case RQL_NODE.IN:
            operation = '';
            break;
          case RQL_NODE.MATCH:
            operation = ':match('+rqlQuery.args[0]+')';
            break;
        }
        return LocalizedValues.forLocale($scope.criterion.vocabulary.title, $scope.criterion.lang) + operation;
      };
      $scope.vocabularyType = function (vocabulary) {
        return RqlQueryUtils.vocabularyType(vocabulary);
      };
      $scope.onKeyup = onKeyup;
      $scope.truncate = StringUtils.truncate;
      $scope.remove = remove;
      $scope.openDropdown = openDropdown;
      $scope.closeDropdown = closeDropdown;
      $scope.RqlQueryUtils = RqlQueryUtils;
    }])

  .controller('MatchCriterionTermsController', [
    '$scope',
    'RqlQueryService',
    'LocalizedValues',
    'JoinQuerySearchResource',
    'RqlQueryUtils',
    'SearchContext',
    function ($scope, RqlQueryService, LocalizedValues, JoinQuerySearchResource, RqlQueryUtils, SearchContext) {
      $scope.lang = SearchContext.currentLocale();

      var update = function () {
        $scope.state.dirty = true;
        RqlQueryUtils.updateMatchQuery($scope.criterion.rqlQuery, $scope.match);
      };

      var queryString = $scope.criterion.rqlQuery.args[0];
      $scope.match = queryString === '*' ? '' : queryString;
      $scope.update = update;

    }])

  .controller('NumericCriterionController', [
    '$scope',
    'RqlQueryService',
    'LocalizedValues',
    'JoinQuerySearchResource',
    'RqlQueryUtils',
    'SearchContext',
    function ($scope, RqlQueryService, LocalizedValues, JoinQuerySearchResource, RqlQueryUtils, SearchContext) {
      $scope.lang = SearchContext.currentLocale();
      var range = $scope.criterion.rqlQuery.args[1];

      if (angular.isArray(range)) {
        $scope.from = $scope.criterion.rqlQuery.args[1][0];
        $scope.to = $scope.criterion.rqlQuery.args[1][1];
      } else {
        $scope.from = $scope.criterion.rqlQuery.name === RQL_NODE.GE ? range : null;
        $scope.to = $scope.criterion.rqlQuery.name === RQL_NODE.LE ? range : null;
      }

      var updateLimits = function () {
        var target = $scope.criterion.target,
          joinQuery = RqlQueryService.prepareCriteriaTermsQuery($scope.query, $scope.criterion);
        JoinQuerySearchResource[targetToType(target)]({query: joinQuery}).$promise.then(function (joinQueryResponse) {
          var stats = RqlQueryService.getTargetAggregations(joinQueryResponse, $scope.criterion, $scope.lang);

          if (stats && stats.default) {
            $scope.min = stats.default.min;
            $scope.max = stats.default.max;
          }
        });
      };

      var onOpen = function () {
        updateLimits();
      };

      var onClose = function () {
        $scope.updateSelection();
      };

      $scope.updateSelection = function () {
        RqlQueryUtils.updateRangeQuery($scope.criterion.rqlQuery, $scope.from, $scope.to, $scope.selectMissing);
        $scope.state.dirty = true;
      };

      $scope.selectMissing = $scope.criterion.rqlQuery.name === RQL_NODE.MISSING;
      $scope.state.addOnClose(onClose);
      $scope.state.addOnOpen(onOpen);
    }])

  .controller('StringCriterionTermsController', [
    '$scope',
    'RqlQueryService',
    'LocalizedValues',
    'StringUtils',
    'JoinQuerySearchResource',
    'RqlQueryUtils',
    'SearchContext',
    '$filter',
    function ($scope,
              RqlQueryService,
              LocalizedValues,
              StringUtils,
              JoinQuerySearchResource,
              RqlQueryUtils,
              SearchContext,
              $filter) {
      $scope.lang = SearchContext.currentLocale();

      var isSelected = function (name) {
        return $scope.checkboxTerms.indexOf(name) !== -1;
      };

      var updateSelection = function () {
        $scope.state.dirty = true;
        var selected = [];
        Object.keys($scope.checkboxTerms).forEach(function (key) {
          if ($scope.checkboxTerms[key]) {
            selected.push(key);
          }
        });
        RqlQueryUtils.updateQuery($scope.criterion.rqlQuery, selected);
      };

      var updateFilter = function () {
        RqlQueryUtils.updateQuery($scope.criterion.rqlQuery, [], RQL_NODE.MISSING === $scope.selectedFilter);
        $scope.state.dirty = true;
      };

      var isInFilter = function () {
        return $scope.selectedFilter === RQL_NODE.IN;
      };

      var onOpen = function () {
        $scope.state.loading = true;
        var target = $scope.criterion.target;
        var joinQuery = RqlQueryService.prepareCriteriaTermsQuery($scope.query, $scope.criterion, $scope.lang);

        JoinQuerySearchResource[targetToType(target)]({query: joinQuery}).$promise.then(function (joinQueryResponse) {
          $scope.state.loading = false;
          $scope.terms = RqlQueryService.getTargetAggregations(joinQueryResponse, $scope.criterion, $scope.lang);
          if ($scope.terms) {
            $scope.terms.forEach(function (term) {
              $scope.checkboxTerms[term.key] =
                $scope.criterion.selectedTerms && $scope.criterion.selectedTerms.indexOf(term.key) !== -1;
            });

            $scope.terms = $filter('orderBySelection')($scope.terms, $scope.checkboxTerms);
          }
        });
      };

      $scope.state.addOnOpen(onOpen);
      $scope.checkboxTerms = {};
      $scope.RQL_NODE = RQL_NODE;
      $scope.selectedFilter = $scope.criterion.type;
      $scope.isSelected = isSelected;
      $scope.updateFilter = updateFilter;
      $scope.localize = function (values) {
        return LocalizedValues.forLocale(values, $scope.criterion.lang);
      };
      $scope.truncate = StringUtils.truncate;
      $scope.isInFilter = isInFilter;
      $scope.updateSelection = updateSelection;
    }])

  .controller('CoverageResultTableController', [
    '$scope',
    '$location',
    '$q',
    'PageUrlService',
    'RqlQueryUtils',
    'RqlQueryService',
    function ($scope, $location, $q, PageUrlService, RqlQueryUtils, RqlQueryService) {
      $scope.showMissing = true;
      $scope.toggleMissing = function (value) {
        $scope.showMissing = value;
      };

      $scope.selectBucket = function (bucket) {
        $scope.bucket = bucket;
        $scope.$parent.onBucketChanged(bucket);
      };
      $scope.rowspans = {};

      $scope.getSpan = function (study, population) {
        var length = 0;
        if (population) {
          var prefix = study + ':' + population;
          length = $scope.result.rows.filter(function (row) {
            return row.title.startsWith(prefix + ':');
          }).length;
          $scope.rowspans[prefix] = length;
          return length;
        } else {
          length = $scope.result.rows.filter(function (row) {
            return row.title.startsWith(study + ':');
          }).length;
          $scope.rowspans[study] = length;
          return length;
        }
      };

      $scope.hasSpan = function (study, population) {
        if (population) {
          return $scope.rowspans[study + ':' + population] > 0;
        } else {
          return $scope.rowspans[study] > 0;
        }
      };

      $scope.hasVariableTarget = function() {
        var query = $location.search().query;
        return query && RqlQueryUtils.hasTargetQuery(new RqlParser().parse(query), RQL_NODE.VARIABLE);
      };

      $scope.hasSelected = function () {
        return $scope.table && $scope.table.rows && $scope.table.rows.filter(function(r) { return r.selected; }).length;
      };

      function getBucketUrl(bucket, id) {
        switch (bucket) {
          case BUCKET_TYPES.STUDY:
          case BUCKET_TYPES.DCE:
            return PageUrlService.studyPage(id);
          case BUCKET_TYPES.NETWORK:
            return PageUrlService.networkPage(id);
          case BUCKET_TYPES.DATASCHEMA:
            return PageUrlService.datasetPage(id,'harmonization');
          case BUCKET_TYPES.DATASET:
            return PageUrlService.datasetPage(id,'study');
        }

        return '';
      }

      function splitIds() {
        var cols = {
          colSpan: $scope.bucket === BUCKET_TYPES.DCE ? 3 : 1,
          ids: {}
        };

        var rowSpans = {};

        function appendRowSpan(id) {
          var rowSpan;
          if (!rowSpans[id]) {
            rowSpan = 1;
            rowSpans[id] = 1;
          } else {
            rowSpan = 0;
            rowSpans[id] = rowSpans[id] + 1;
          }
          return rowSpan;
        }

        $scope.result.rows.forEach(function (row) {
          cols.ids[row.value] = [];
          if ($scope.bucket === BUCKET_TYPES.DCE) {
            var ids = row.value.split(':');
            var titles = row.title.split(':');
            var descriptions = row.description.split(':');
            var rowSpan;
            var id;

            // study
            id = ids[0];
            rowSpan = appendRowSpan(id);
            cols.ids[row.value].push({
              id: id,
              url: PageUrlService.studyPage(id),
              title: titles[0],
              description: descriptions[0],
              rowSpan: rowSpan
            });

            // population
            id = ids[0] + ':' + ids[1];
            rowSpan = appendRowSpan(id);
            cols.ids[row.value].push({
              id: id,
              url: PageUrlService.studyPopulationPage(ids[0], ids[1]),
              title: titles[1],
              description: descriptions[1],
              rowSpan: rowSpan
            });

            // dce
            cols.ids[row.value].push({
              id: row.value,
              title: titles[2],
              url: PageUrlService.studyPopulationPage(ids[0], ids[1]),
              description: descriptions[2],
              rowSpan: 1
            });
          } else {
            cols.ids[row.value].push({
              id: row.value,
              url: getBucketUrl($scope.bucket, row.value),
              title: row.title,
              description: row.description,
              rowSpan: 1
            });
          }
        });

        // adjust the rowspans
        if ($scope.bucket === BUCKET_TYPES.DCE) {
          $scope.result.rows.forEach(function (row) {
            if (cols.ids[row.value][0].rowSpan > 0) {
              cols.ids[row.value][0].rowSpan = rowSpans[cols.ids[row.value][0].id];
            }
            if (cols.ids[row.value][1].rowSpan > 0) {
              cols.ids[row.value][1].rowSpan = rowSpans[cols.ids[row.value][1].id];
            }
          });
        }

        return cols;
      }

      $scope.BUCKET_TYPES = BUCKET_TYPES;

      $scope.downloadUrl = function () {
        return PageUrlService.downloadCoverage($scope.query);
      };

      $scope.$watch('result', function () {
        $scope.table = {};
        $scope.table.cols = [];
        if ($scope.result && $scope.result.rows) {
          $scope.table = $scope.result;
          $scope.table.cols = splitIds();
        }
      });

      var targetMap = {};
      targetMap[BUCKET_TYPES.NETWORK] = QUERY_TARGETS.NETWORK;
      targetMap[BUCKET_TYPES.STUDY] = QUERY_TARGETS.STUDY;
      targetMap[BUCKET_TYPES.DCE] = QUERY_TARGETS.VARIABLE;
      targetMap[BUCKET_TYPES.DATASCHEMA] = QUERY_TARGETS.DATASET;
      targetMap[BUCKET_TYPES.DATASET] = QUERY_TARGETS.DATASET;

      $scope.updateDisplay = function() {
        $location.search('display', DISPLAY_TYPES.LIST);
      };

      $scope.updateCriteria = function (id, term, idx, type) {
        var vocabulary = $scope.bucket === BUCKET_TYPES.DCE ? 'dceIds' : 'id',
            taxonomyHeader = $scope.table.taxonomyHeaders[0].entity,
            vocabularyHeader, countTerms = 0;

        for(var i = 0; i < $scope.table.vocabularyHeaders.length; i++) {
          countTerms += $scope.table.vocabularyHeaders[i].termsCount;
          if(idx < countTerms) {
            vocabularyHeader = $scope.table.vocabularyHeaders[i].entity;
            break;
          }
        }

        RqlQueryService.createCriteriaItem(QUERY_TARGETS.VARIABLE, taxonomyHeader.name, vocabularyHeader.name, term.entity.name).then(function(varItem) {
          RqlQueryService.createCriteriaItem(targetMap[$scope.bucket], 'Mica_' + targetMap[$scope.bucket], vocabulary, id).then(function (item) {
            $scope.onUpdateCriteria(varItem, type, false, true);
            $scope.onUpdateCriteria(item, type);
          });
        });
      };

      $scope.updateFilterCriteria = function() {
        var vocabulary = $scope.bucket === BUCKET_TYPES.DCE ? 'dceIds' : 'id',
          selected = $scope.table.rows.filter(function(r) { return r.selected; });

        $q.all(selected.map(function(r) {
          return RqlQueryService.createCriteriaItem(targetMap[$scope.bucket], 'Mica_' + targetMap[$scope.bucket], vocabulary, r.value);
        })).then(function (items) {
          if(!items.length) {
            return;
          }

          var selectionItem = items.reduce(function(prev, item) {
            if(prev) {
              RqlQueryService.updateCriteriaItem(prev, item);

              return prev;
            }

            item.rqlQuery = RqlQueryUtils.buildRqlQuery(item);
            return item;
          }, null);

          $scope.onUpdateCriteria(selectionItem, 'variables', true);
        });
      };
    }])

  .controller('GraphicsResultController', [
    'GraphicChartsConfig',
    'GraphicChartsUtils',
    'RqlQueryService',
    '$filter',
    '$scope',
    function (GraphicChartsConfig,
              GraphicChartsUtils,
              RqlQueryService,
              $filter,
              $scope) {

      var setChartObject = function (vocabulary, dtoObject, header, title, options) {
        var entries = GraphicChartsUtils.getArrayByAggregation(vocabulary, dtoObject),
          data = entries.map(function(e) {
            if(e.participantsNbr) {
              return [e.title, e.value, e.participantsNbr];
            }
            else{
              return [e.title, e.value];
            }
          });

        if (data.length > 0) {
          data.unshift(header);
          angular.extend(options, {title: title});

          return {
            data: data,
            entries: entries,
            options: options,
            vocabulary: vocabulary
          };
        }

        return false;
      };

      var charOptions = GraphicChartsConfig.getOptions().ChartsOptions;

      $scope.updateCriteria = function(key, vocabulary) {
        RqlQueryService.createCriteriaItem('study', 'Mica_study', vocabulary, key).then(function (item) {
          $scope.onUpdateCriteria(item, 'studies');
        });
      };

      $scope.$watch('result', function (result) {
        $scope.chartObjects = {};
        $scope.noResults = true;

        if (result && result.studyResultDto.totalHits) {
          $scope.noResults = false;
          var geoStudies = setChartObject('populations-selectionCriteria-countriesIso',
            result.studyResultDto,
            [$filter('translate')(charOptions.geoChartOptions.header[0]), $filter('translate')(charOptions.geoChartOptions.header[1])],
            $filter('translate')(charOptions.geoChartOptions.title) + ' (N = ' + result.studyResultDto.totalHits + ')',
            charOptions.geoChartOptions.options);

          var methodDesignStudies = setChartObject('methods-designs',
            result.studyResultDto,
            [$filter('translate')(charOptions.studiesDesigns.header[0]), $filter('translate')(charOptions.studiesDesigns.header[1]), $filter('translate')(charOptions.studiesDesigns.header[2])],
            $filter('translate')(charOptions.studiesDesigns.title) + ' (N = ' + result.studyResultDto.totalHits + ')',
            charOptions.studiesDesigns.options);

          var numberParticipant = setChartObject('numberOfParticipants-participant-range',
            result.studyResultDto,
            [$filter('translate')(charOptions.numberParticipants.header[0]), $filter('translate')(charOptions.numberParticipants.header[1])],
            $filter('translate')(charOptions.numberParticipants.title) + ' (N = ' + result.studyResultDto.totalHits + ')',
            charOptions.numberParticipants.options);

          var bioSamplesStudies = setChartObject('populations-dataCollectionEvents-bioSamples',
            result.studyResultDto,
            [$filter('translate')(charOptions.biologicalSamples.header[0]), $filter('translate')(charOptions.biologicalSamples.header[1])],
            $filter('translate')(charOptions.biologicalSamples.title) + ' (N = ' + result.studyResultDto.totalHits + ')',
            charOptions.biologicalSamples.options);

          if (geoStudies) {
            angular.extend($scope.chartObjects,
              {
                geoChartOptions: {
                  chartObject: {
                    geoTitle: geoStudies.options.title,
                    options: geoStudies.options,
                    type: 'GeoChart',
                    vocabulary: geoStudies.vocabulary,
                    data: geoStudies.data,
                    entries: geoStudies.entries
                  }
                }
              });
          }
          if (methodDesignStudies) {
            angular.extend($scope.chartObjects, {
              studiesDesigns: {
                chartObject: {
                  options: methodDesignStudies.options,
                  type: 'google.charts.Bar',
                  data: methodDesignStudies.data,
                  vocabulary: methodDesignStudies.vocabulary,
                  entries: methodDesignStudies.entries
                }
              }
            });
          }
          if (numberParticipant) {
            angular.extend($scope.chartObjects, {
              numberParticipants: {
                chartObject: {
                  options: numberParticipant.options,
                  type: 'PieChart',
                  data: numberParticipant.data,
                  vocabulary: numberParticipant.vocabulary,
                  entries: numberParticipant.entries
                }
              }
            });
          }
          if (bioSamplesStudies) {
            angular.extend($scope.chartObjects, {
              biologicalSamples: {
                chartObject: {
                  options: bioSamplesStudies.options,
                  type: 'PieChart',
                  data: bioSamplesStudies.data,
                  vocabulary: bioSamplesStudies.vocabulary,
                  entries: bioSamplesStudies.entries
                }
              }
            });
          }
        }
      });
    }])

  .controller('SearchResultPaginationController', ['$scope', function ($scope) {

    function updateMaxSize() {
      $scope.maxSize = Math.min(3, Math.ceil($scope.totalHits / $scope.pagination.selected.value));
    }

    function calculateRange() {
      var pageSize = $scope.pagination.selected.value;
      var current = $scope.pagination.currentPage;
      $scope.pagination.from = pageSize * (current - 1) + 1;
      $scope.pagination.to = Math.min($scope.totalHits, pageSize * current);
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

    $scope.pageChanged = pageChanged;
    $scope.pageSizeChanged = pageSizeChanged;
    $scope.pageSizes = [
      {label: '10', value: 10},
      {label: '20', value: 20},
      {label: '50', value: 50},
      {label: '100', value: 100}
    ];

    $scope.pagination = {
      selected: $scope.pageSizes[0],
      currentPage: 1
    };

    $scope.$watch('totalHits', function () {
      updateMaxSize();
      calculateRange();
    });
  }]);

