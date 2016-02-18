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
/* global RQL_NODE */
/* global CriteriaIdGenerator */

function targetToType(target) {
  switch (target.toLocaleString()) {
    case QUERY_TARGETS.NETWORK:
      return QUERY_TYPES.NETWORKS;
    case QUERY_TARGETS.STUDY:
      return QUERY_TYPES.STUDIES;
    case QUERY_TARGETS.DATASET:
      return QUERY_TYPES.DATASETS;
    case QUERY_TARGETS.VARIABLE:
      return QUERY_TYPES.VARIABLES;
  }

  throw new Error('Invalid target: ' + target);
}

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

var DISPLAY_TYPES = {
  LIST: 'list',
  COVERAGE: 'coverage',
  GRAPHICS: 'graphics'
};

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
    'ObibaSearchConfig',
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
              ObibaSearchConfig,
              RqlQueryService,
              RqlQueryUtils,
              SearchContext) {
      $scope.lang = LocalizedValues.getLocal();

      ngObibaMicaSearch.getLocale(function(locales) {
        if (angular.isArray(locales)) {
          $scope.tabs = locales;
          $scope.setLocale(locales[0]);
        } else {
          $scope.setLocale(locales || $scope.lang);
        }
      });

      $scope.setLocale = function(locale) {
        $scope.lang = locale;
        SearchContext.setLocale($scope.lang);
        executeSearchQuery();
      };

      $scope.settingsDisplay = ObibaSearchConfig.getOptions();

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

      function validateDisplay(display) {
        if (!display || !DISPLAY_TYPES[display.toUpperCase()]) {
          throw new Error('Invalid display: ' + display);
        }
      }

      function getDefaultQueryType() {
        if ($scope.settingsDisplay.variables.showSearchTab) {
          return QUERY_TYPES.VARIABLES;
        }
        else {
          var result = Object.keys($scope.settingsDisplay).filter(function (key) {
            return $scope.settingsDisplay[key].showSearchTab === 1;
          });

          return result[result.length - 1];
        }
      }

      function validateQueryData() {
        try {
          var search = $location.search();
          var type = search.type || getDefaultQueryType();
          var display = search.display || DISPLAY_TYPES.LIST;
          var query = search.query || '';
          validateType(type);
          validateDisplay(display);

          $scope.search.type = type;
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

      function executeSearchQuery() {
        if (validateQueryData()) {
          // build the criteria UI
          RqlQueryService.createCriteria($scope.search.rqlQuery, $scope.lang).then(function (result) {
            // criteria UI is updated here
            console.log(result.root);
            $scope.search.criteria = result.root;
            if($scope.search.criteria && $scope.search.criteria.children) {
              $scope.search.criteria.children.sort(function(a,b){
                if(a.target === 'network' || b.target === 'variable') {
                  return -1;
                }
                if(a.target === 'variable' || b.target === 'network') {
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

          var localizedRqlQuery = angular.copy($scope.search.rqlQuery);
          RqlQueryUtils.addLocaleQuery(localizedRqlQuery, $scope.lang);
          var localizedQuery = new RqlQuery().serializeArgs(localizedRqlQuery.args);

          $scope.search.loading = true;
          switch ($scope.search.display) {
            case DISPLAY_TYPES.LIST:
              JoinQuerySearchResource[$scope.search.type]({query: localizedQuery},
                function onSuccess(response) {
                  $scope.search.result.list = response;
                  $scope.search.loading = false;
                },
                onError);
              break;
            case DISPLAY_TYPES.COVERAGE:
              JoinQueryCoverageResource.get({query: RqlQueryService.prepareCoverageQuery(localizedQuery, ['studyIds'])},
                function onSuccess(response) {
                  $scope.search.result.coverage = response;
                  $scope.search.loading = false;
                },
                onError);
              break;
            case DISPLAY_TYPES.GRAPHICS:
              JoinQuerySearchResource.studies({
                  query: RqlQueryService.prepareGraphicsQuery(localizedQuery,
                    ['methods.designs', 'populations.selectionCriteria.countriesIso', 'populations.dataCollectionEvents.bioSamples', 'numberOfParticipants.participant.number'])
                },
                function onSuccess(response) {
                  $scope.search.result.graphics = response;
                  $scope.search.loading = false;
                },
                onError);
              break;
          }
        }
      }

      var closeTaxonomies = function () {
        angular.element('#taxonomies').collapse('hide');
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
          }, function onSuccess(response) {
            $scope.taxonomies.all = response;
            $scope.taxonomies.search.active = false;
          });
        }
      };

      var selectTaxonomyTarget = function (target) {
        if (!$scope.taxonomiesShown) {
          angular.element('#taxonomies').collapse('show');
        } else if ($scope.taxonomies.target === target) {
          closeTaxonomies();
        }
        if ($scope.taxonomies.target !== target) {
          $scope.taxonomies.target = target;
          $scope.taxonomies.taxonomy = null;
          $scope.taxonomies.vocabulary = null;
          filterTaxonomies($scope.taxonomies.search.text);
        }
      };

      var clearFilterTaxonomies = function () {
        $scope.taxonomies.search.text = null;
        $scope.taxonomies.search.active = false;
        filterTaxonomies(null);
      };

      var filterTaxonomiesKeyUp = function (event) {
        switch (event.keyCode) {
          case 27: // ESC
            if (!$scope.taxonomies.search.active) {
              clearFilterTaxonomies();
            }
            break;

          case 13: // Enter
            filterTaxonomies($scope.taxonomies.search.text);
            break;
        }
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
          query: query, locale: $scope.lang
        }).$promise.then(function (response) {
          if (response) {
            var results = [];
            var total = 0;
            var size = 10;
            response.forEach(function (bundle) {
              var target = bundle.target;
              var taxonomy = bundle.taxonomy;
              if (taxonomy.vocabularies) {
                taxonomy.vocabularies.forEach(function (vocabulary) {
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
      var selectCriteria = function (item) {
        if (item.id) {
          var id = CriteriaIdGenerator.generate(item.taxonomy, item.vocabulary);
          var existingItem = $scope.search.criteriaItemMap[id];
          if (existingItem) {
            RqlQueryService.updateCriteriaItem(existingItem, item);

          } else {
            RqlQueryService.addCriteriaItem($scope.search.rqlQuery, item);
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

      var navigateTaxonomy = function (taxonomy, vocabulary, term) {
        var toFilter = ($scope.taxonomies.taxonomy && !taxonomy) || ($scope.taxonomies.vocabulary && !vocabulary);
        $scope.taxonomies.taxonomy = taxonomy;
        $scope.taxonomies.vocabulary = vocabulary;
        $scope.taxonomies.term = term;

        if (toFilter) {
          filterTaxonomies($scope.taxonomies.search.text);
        }
      };

      /**
       * Callback used in the views
       *
       * @param target
       * @param taxonomy
       * @param vocabulary
       * @param term
       */
      var selectTerm = function (target, taxonomy, vocabulary, term) {
        if (vocabulary && RqlQueryUtils.isNumericVocabulary(vocabulary)) {
          selectCriteria(RqlQueryService.createCriteriaItem($scope.taxonomies.target, taxonomy, vocabulary, null, $scope.lang));
          return;
        }

        selectCriteria(RqlQueryService.createCriteriaItem(target, taxonomy, vocabulary, term, $scope.lang));
      };

      var onTypeChanged = function (type) {
        if (type) {
          validateType(type);
          var search = $location.search();
          search.type = type;
          $location.search(search).replace();
        }
      };

      var onDisplayChanged = function (display) {
        if (display) {
          validateDisplay(display);
          var search = $location.search();
          search.display = display;
          $location.search(search).replace();
        }
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

      $scope.search = {
        query: null,
        rqlQuery: null,
        type: null,
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
          active: false
        }
      };

      $scope.taxonomies = {
        all: TaxonomiesResource.get({target: 'variable'}),
        search: {
          text: null,
          active: false
        },
        target: 'variable',
        taxonomy: null,
        vocabulary: null
      };

      $scope.headerTemplateUrl = ngObibaMicaSearchTemplateUrl.getHeaderUrl('view');
      $scope.clearFilterTaxonomies = clearFilterTaxonomies;
      $scope.searchCriteria = searchCriteria;
      $scope.selectCriteria = selectCriteria;
      $scope.searchKeyUp = searchKeyUp;
      $scope.filterTaxonomiesKeyUp = filterTaxonomiesKeyUp;
      $scope.navigateTaxonomy = navigateTaxonomy;
      $scope.selectTaxonomyTarget = selectTaxonomyTarget;
      $scope.selectTerm = selectTerm;
      $scope.removeCriteriaItem = removeCriteriaItem;
      $scope.refreshQuery = refreshQuery;
      $scope.closeTaxonomies = closeTaxonomies;
      $scope.onTypeChanged = onTypeChanged;
      $scope.onDisplayChanged = onDisplayChanged;
      $scope.taxonomiesShown = false;

      angular.element('#taxonomies').on('show.bs.collapse', function () {
        $scope.taxonomiesShown = true;
      });
      angular.element('#taxonomies').on('hide.bs.collapse', function () {
        $scope.taxonomiesShown = false;
      });

      $scope.$watch('search', function () {
        executeSearchQuery();
      });

      $scope.$on('$locationChangeSuccess', function (newLocation, oldLocation) {
        if (newLocation !== oldLocation) {
          executeSearchQuery();
        }
      });

    }])

  .controller('SearchResultController', [
    '$scope',
    'ObibaSearchConfig',
    function ($scope,
              ObibaSearchConfig) {

      $scope.settingsDisplay = ObibaSearchConfig.getOptions();

      $scope.selectDisplay = function (display) {
        $scope.display = display;
        $scope.$parent.onDisplayChanged(display);
      };
      $scope.selectTarget = function (type) {
        $scope.type = type;
        $scope.$parent.onTypeChanged(type);
      };
      $scope.QUERY_TYPES = QUERY_TYPES;
      $scope.DISPLAY_TYPES = DISPLAY_TYPES;

      $scope.$watch('type', function () {
        $scope.activeTarget = {
          networks: ($scope.type === QUERY_TYPES.NETWORKS && $scope.settingsDisplay.networks.showSearchTab) || false,
          studies: ($scope.type === QUERY_TYPES.STUDIES && $scope.settingsDisplay.studies.showSearchTab) || false,
          datasets: ($scope.type === QUERY_TYPES.DATASETS && $scope.settingsDisplay.datasets.showSearchTab) || false,
          variables: ($scope.type === QUERY_TYPES.VARIABLES && $scope.settingsDisplay.variables.showSearchTab) || false
        };
      });

      $scope.$watch('display', function () {
        $scope.activeDisplay = {
          list: $scope.display === DISPLAY_TYPES.LIST || false,
          coverage: $scope.display === DISPLAY_TYPES.COVERAGE || false,
          graphics: $scope.display === DISPLAY_TYPES.GRAPHICS || false
        };
      });

    }])

  .controller('CriterionLogicalController', [
    '$scope',
    function ($scope) {
      $scope.updateLogical = function (operator) {
        $scope.item.rqlQuery.name = operator;
        $scope.$emit(CRITERIA_ITEM_EVENT.refresh);
      };
    }])

  .controller('CriterionDropdownController', ['$scope', 'StringUtils', 'RqlQueryUtils',
    function ($scope, StringUtils, RqlQueryUtils) {
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

      $scope.state = new CriterionState();
      $scope.localize = function (values) {
        return StringUtils.localize(values, $scope.criterion.lang);
      };
      $scope.localizeCriterion = function () {
        var rqlQuery = $scope.criterion.rqlQuery;
        if (rqlQuery.name === RQL_NODE.IN && $scope.criterion.selectedTerms && $scope.criterion.selectedTerms.length > 0) {
          return $scope.criterion.selectedTerms.map(function (t) {
            if(!$scope.criterion.vocabulary.terms) {
              return t;
            }
            var found = $scope.criterion.vocabulary.terms.filter(function (arg) {
              return arg.name === t;
            }).pop();
            return found ? StringUtils.localize(found.title, $scope.criterion.lang) : t;
          }).join(' | ');
        }
        var operation = rqlQuery.name;
        switch (rqlQuery.name) {
          case RQL_NODE.EXISTS:
            operation = ':any'; //TODO translate
            break;
          case RQL_NODE.MISSING:
            operation = ':none'; //TODO translate
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
            operation = ':[' + rqlQuery.args[1] + '[';
            break;
          case RQL_NODE.IN:
            operation = '';
            break;
        }
        return StringUtils.localize($scope.criterion.vocabulary.title, $scope.criterion.lang) + operation;
      };
      $scope.vocabularyType = function (vocabulary) {
        return RqlQueryUtils.vocabularyType(vocabulary);
      };
      $scope.truncate = StringUtils.truncate;
      $scope.remove = remove;
      $scope.openDropdown = openDropdown;
      $scope.closeDropdown = closeDropdown;
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
          var stats = RqlQueryService.getTargetAggregations(joinQueryResponse, $scope.criterion);

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
    'StringUtils',
    'JoinQuerySearchResource',
    'RqlQueryUtils',
    'SearchContext',
    function ($scope, RqlQueryService, StringUtils, JoinQuerySearchResource, RqlQueryUtils, SearchContext) {
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
          $scope.terms = RqlQueryService.getTargetAggregations(joinQueryResponse, $scope.criterion);
          if ($scope.terms) {
            $scope.terms.forEach(function (term) {
              $scope.checkboxTerms[term.key] =
                $scope.criterion.selectedTerms && $scope.criterion.selectedTerms.indexOf(term.key) !== -1;
            });
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
        return StringUtils.localize(values, $scope.criterion.lang);
      };
      $scope.truncate = StringUtils.truncate;
      $scope.isInFilter = isInFilter;
      $scope.updateSelection = updateSelection;
    }])

  .controller('CoverageResultTableController', [
    '$scope',
    function ($scope) {
      $scope.showMissing = true;
      $scope.toggleMissing = function (value) {
        $scope.showMissing = value;
      };
    }])

  .controller('GraphicsResultController', [
    'GraphicChartsConfig',
    'GraphicChartsUtils',
    '$filter',
    '$scope',
    function (GraphicChartsConfig,
              GraphicChartsUtils,
              $filter,
              $scope) {

      var setChartObject = function (tem, dtoObject, header, title, options) {
        var ChartObject = GraphicChartsUtils.getArrayByAggregation(tem, dtoObject);
        if (ChartObject.length > 0) {
          ChartObject.unshift(header);
          angular.extend(options, {title: title});
          return {
            data: ChartObject,
            options: options
          };
        }
        return false;
      };
      var charOptions = GraphicChartsConfig.getOptions().ChartsOptions;
      $scope.$watch('result', function (result) {
        $scope.chartObjects = {};
        if (result) {
          var geoStudies = setChartObject('populations-selectionCriteria-countriesIso',
            result.studyResultDto,
            [$filter('translate')(charOptions.geoChartOptions.header[0]), $filter('translate')(charOptions.geoChartOptions.header[1])],
            $filter('translate')(charOptions.geoChartOptions.title) + ' (N = ' + result.studyResultDto.totalHits + ')',
            charOptions.geoChartOptions.options);

          var methodDesignStudies = setChartObject('methods-designs',
            result.studyResultDto,
            [$filter('translate')(charOptions.studiesDesigns.header[0]), $filter('translate')(charOptions.studiesDesigns.header[1])],
            $filter('translate')(charOptions.studiesDesigns.title) + ' (N = ' + result.studyResultDto.totalHits + ')',
            charOptions.studiesDesigns.options);

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
                    data: geoStudies.data
                  }
                }
              });
          }
          if (methodDesignStudies) {
            angular.extend($scope.chartObjects, {
              studiesDesigns: {
                chartObject: {
                  options: methodDesignStudies.options,
                  type: 'BarChart',
                  data: methodDesignStudies.data
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
                  data: bioSamplesStudies.data
                }
              }
            });
          }

        }
      });

    }]);
