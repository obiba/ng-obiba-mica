/*
 * Copyright (c) 2017 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/* global QUERY_TARGETS */

'use strict';

/* exported DISPLAY_TYPES */
var DISPLAY_TYPES = {
  LIST: 'list',
  COVERAGE: 'coverage',
  GRAPHICS: 'graphics'
};

ngObibaMica.search = angular.module('obiba.mica.search', [
    'obiba.alert',
    'ui.bootstrap',
    'pascalprecht.translate',
    'templates-ngObibaMica'
  ]);

ngObibaMica.search.FIELDS_TO_FILTER = ['title', 'description', 'keywords'];

/**
 * Defines the default search options, clients such as Drupal override these options.
 * @constructor
 */
ngObibaMica.search.NgObibaMicaSearchOptionsWrapper = function() {
  var options = {
    searchLayout: 'layout2',
    taxonomyPanelOptions: {
      network: {
        taxonomies: {'Mica_network': {trKey: 'properties'}}
      },
      study: {
        taxonomies: {'Mica_study': {trKey: 'properties'}}
      },
      dataset: {
        taxonomies: {'Mica_dataset': {trKey: 'properties'}}
      },
      variable : {
        taxonomies: {
          'Mlstr_area': {weight: 0},
          'Scales': {weight: 1},
          'Mlstr_additional': {weight: 2},
          'Mica_variable': {trKey: 'properties', weight: 3}
        }
      },
      fieldsToFilter : ngObibaMica.search.FIELDS_TO_FILTER
    },
    obibaListOptions: {
      countCaption: true,
      searchForm: true,
      supplInfoDetails: true,
      trimmedDescription: true
    },
    targetTabsOrder: [QUERY_TARGETS.VARIABLE, QUERY_TARGETS.DATASET, QUERY_TARGETS.STUDY, QUERY_TARGETS.NETWORK],
    searchTabsOrder: [DISPLAY_TYPES.LIST, DISPLAY_TYPES.COVERAGE, DISPLAY_TYPES.GRAPHICS],
    resultTabsOrder: [QUERY_TARGETS.VARIABLE, QUERY_TARGETS.DATASET, QUERY_TARGETS.STUDY, QUERY_TARGETS.NETWORK],
    showAllFacetedTaxonomies: true,
    showFacetTermsWithZeroCount: false,
    showSearchBox: true,
    showSearchBrowser: true,
    showSearchRefreshButton: false,
    variableTaxonomiesOrder: [],
    studyTaxonomiesOrder: [],
    datasetTaxonomiesOrder: [],
    networkTaxonomiesOrder: [],
    hideNavigate: [],
    hideSearch: ['studyId', 'dceId', 'datasetId', 'networkId'],
    variables: {
      showSearchTab: true,
      listPageSize: 20,
      variablesColumn: {
        showVariablesTypeColumn: true,
        showVariablesStudiesColumn: true,
        showVariablesDatasetsColumn: true,
        showDatasetsStudiesColumn: true,
        showDatasetsVariablesColumn: true
      }
    },
    datasets: {
      showSearchTab: true,
      listPageSize: 20,
      showDatasetsSearchFilter: true,
      datasetsColumn: {
        showDatasetsAcronymColumn: true,
        showDatasetsTypeColumn: true,
        showDatasetsNetworkColumn: true,
        showDatasetsStudiesColumn: true,
        showDatasetsVariablesColumn: true
      },
      fields: [
        'acronym.*',
        'name.*',
        'variableType',
        'studyTable.studyId',
        'studyTable.project',
        'studyTable.table',
        'studyTable.populationId',
        'studyTable.dataCollectionEventId',
        'harmonizationTable.studyId',
        'harmonizationTable.project',
        'harmonizationTable.table',
        'harmonizationTable.populationId'
      ]
    },
    studies: {
      showSearchTab: true,
      listPageSize: 20,
      showStudiesSearchFilter: true,
      studiesColumn: {
        showStudiesDesignColumn: true,
        showStudiesQuestionnaireColumn: true,
        showStudiesPmColumn: true,
        showStudiesBioColumn: true,
        showStudiesOtherColumn: true,
        showStudiesParticipantsColumn: true,
        showStudiesNetworksColumn: true,
        showStudiesStudyDatasetsColumn: true,
        showStudiesHarmonizationDatasetsColumn: true,
        showStudiesVariablesColumn: false,
        showStudiesStudyVariablesColumn: true,
        showStudiesDataschemaVariablesColumn: true
      },
      fields: [
        'acronym.*',
        'name.*',
        'model.methods.design',
        'populations.dataCollectionEvents.model.dataSources',
        'model.numberOfParticipants.participant'
      ]
    },
    networks: {
      showSearchTab: true,
      listPageSize: 20,
      networksColumn: {
        showNetworksStudiesColumn: true,
        showNetworksStudyDatasetColumn: true,
        showNetworksHarmonizationDatasetColumn: true,
        showNetworksVariablesColumn: false,
        showNetworksStudyVariablesColumn: true,
        showNetworksDataschemaVariablesColumn: true
      },
      fields: [
        'acronym.*',
        'name.*',
        'studyIds'
      ]
    },
    coverage: {
      groupBy: {
        study: true,
        dce: true,
        dataset: true
      }
    }
  };

  function sanitizeFieldsToFilter(valueFieldsToFilter){
    if (valueFieldsToFilter) {
      return valueFieldsToFilter.filter(function(valueField) {
        return ngObibaMica.search.FIELDS_TO_FILTER.indexOf(valueField) > -1;
      });
    }
    return null;
  }

  function setOptions(value) {
    options = angular.merge(options, value);
    //NOTICE: angular.merge merges arrays by position. Overriding manually.
    options.targetTabsOrder = value.targetTabsOrder || options.targetTabsOrder;
    options.searchTabsOrder = value.searchTabsOrder || options.searchTabsOrder;
    options.resultTabsOrder = value.resultTabsOrder || options.resultTabsOrder;
    options.variableTaxonomiesOrder = value.variableTaxonomiesOrder || options.variableTaxonomiesOrder;
    options.studyTaxonomiesOrder = value.studyTaxonomiesOrder || options.studyTaxonomiesOrder;
    options.datasetTaxonomiesOrder = value.datasetTaxonomiesOrder || options.datasetTaxonomiesOrder;
    options.networkTaxonomiesOrder = value.networkTaxonomiesOrder || options.networkTaxonomiesOrder;
    options.hideNavigate = value.hideNavigate || options.hideNavigate;
    options.hideSearch = value.hideSearch || options.hideSearch;
    //TODO: Needs a better mechanism for setting options
    options.studies.fields = value.studies && value.studies.fields || options.studies.fields;
    options.networks.fields = value.networks && value.networks.fields || options.networks.fields;
    options.datasets.fields = value.datasets && value.datasets.fields || options.datasets.fields;
    if(value.taxonomyPanelOptions){
      options.taxonomyPanelOptions.fieldsToFilter = sanitizeFieldsToFilter(value.taxonomyPanelOptions.fieldsToFilter) || options.taxonomyPanelOptions.fieldsToFilter;
    }
    if(value.studies && value.studies.obibaListOptions){
      options.obibaListOptions.countCaption = value.studies.obibaListOptions.studiesCountCaption === 0  ? value.studies.obibaListOptions.studiesCountCaption : true;
      options.obibaListOptions.searchForm = value.studies.obibaListOptions.studiesSearchForm === 0 ? value.studies.obibaListOptions.studiesSearchForm : true;
      options.obibaListOptions.supplInfoDetails = value.studies.obibaListOptions.studiesSupplInfoDetails === 0 ? value.studies.obibaListOptions.studiesSupplInfoDetails : true;
      options.obibaListOptions.trimmedDescription = value.studies.obibaListOptions.studiesTrimmedDescription === 0 ? value.studies.obibaListOptions.studiesTrimmedDescription : true;
      options.searchLayout = value.searchLayout ? value.searchLayout : options.searchLayout;
    }
  }

  function getOptions() {
    return angular.copy(options);
  }

  this.setOptions = setOptions;
  this.getOptions = getOptions;
};

/**
 * The Options service class.
 *
 * @param $q
 * @param $translate
 * @param optionsWrapper
 * @param ObibaServerConfigResource
 * @returns {{getLocale: getLocale, getOptionsAsyn: getOptionsAsyn, getOptions: getOptions, getDefaultListPageSize: getDefaultListPageSize}}
 * @constructor
 */
ngObibaMica.search.ObibaMicaSearchOptionsService = function($q, $translate, optionsWrapper, ObibaServerConfigResource) {

  var deferred = $q.defer();
  var resolved = false;

  function removeItemByValue(array, value) {
    var index = array.indexOf(value);
    if (index > -1) {
      array.splice(index, 1);
    }
    return array;
  }

  function normalizeOptions() {
    var options = optionsWrapper.getOptions();
    options.coverage.groupBy.study = options.coverage.groupBy.study && options.studies.showSearchTab;
    options.coverage.groupBy.dce = options.coverage.groupBy.study && options.coverage.groupBy.dce;
    var canShowCoverage = Object.keys(options.coverage.groupBy).filter(function(canShow) {
      return options.coverage.groupBy[canShow];
    }).length > 0;

    if (!canShowCoverage) {
      removeItemByValue(options.searchTabsOrder, DISPLAY_TYPES.COVERAGE);
    }

    if (!options.networks.showSearchTab) {
      removeItemByValue(options.targetTabsOrder, QUERY_TARGETS.NETWORK);
      removeItemByValue(options.resultTabsOrder, QUERY_TARGETS.NETWORK);
    }

    if (!options.studies.showSearchTab) {
      removeItemByValue(options.searchTabsOrder, DISPLAY_TYPES.GRAPHICS);
      removeItemByValue(options.targetTabsOrder, QUERY_TARGETS.STUDY);
      removeItemByValue(options.resultTabsOrder, QUERY_TARGETS.STUDY);
    }
  }

  /**
   * Resolves the option by retrieving the server config and overriding the corresponding options.
   * @returns {*}
   */
  function resolveOptions() {

    if (resolved) {
      // in case the getOptionsAsyn() is already called.
      return $q.when(optionsWrapper.getOptions());
    } else {
      ObibaServerConfigResource.get(function (micaConfig) {
        var hasMultipleNetworks = micaConfig.isNetworkEnabled && !micaConfig.isSingleNetworkEnabled;
        var hasMultipleStudies =  !micaConfig.isSingleStudyEnabled || micaConfig.isHarmonizedDatasetEnabled;
        var hasMultipleDatasets = micaConfig.isCollectedDatasetEnabled || micaConfig.isHarmonizedDatasetEnabled;
        var updatedOptions = {
          searchLayout: micaConfig.searchLayout,
          locale: micaConfig.languages || $translate.use(),
          showSearchRefreshButton: true,
          networks: {
            showSearchTab: hasMultipleNetworks
          },
          studies: {
            showSearchTab: hasMultipleStudies,
            studiesColumn: {
              showStudiesNetworksColumn: hasMultipleNetworks,
              showStudiesVariablesColumn: hasMultipleDatasets,
              showStudiesStudyDatasetsColumn: hasMultipleDatasets && micaConfig.isCollectedDatasetEnabled,
              showStudiesStudyVariablesColumn: hasMultipleDatasets && micaConfig.isCollectedDatasetEnabled,
              showStudiesHarmonizationDatasetsColumn: hasMultipleDatasets && micaConfig.isHarmonizedDatasetEnabled,
              showStudiesDataschemaVariablesColumn: hasMultipleDatasets && micaConfig.isHarmonizedDatasetEnabled
            }
          },
          datasets: {
            showSearchTab: hasMultipleDatasets,
            datasetsColumn: {
              showDatasetsTypeColumn: micaConfig.isCollectedDatasetEnabled && micaConfig.isHarmonizedDatasetEnabled,
              showDatasetsNetworkColumn: hasMultipleNetworks,
              showDatasetsStudiesColumn: hasMultipleStudies
            }
          },
          variables: {
            showSearchTab: hasMultipleDatasets,
            variablesColumn: {
              showVariablesTypeColumn: micaConfig.isCollectedDatasetEnabled && micaConfig.isHarmonizedDatasetEnabled,
              showVariablesStudiesColumn: hasMultipleStudies
            }
          }
        };
        optionsWrapper.setOptions(updatedOptions);
        normalizeOptions();

        deferred.resolve(optionsWrapper.getOptions());
        resolved = true;
      });

      return deferred.promise;
    }
  }

  return {

    /**
     * This is the actual method to be called as it will override the defaults by server settings such as single Study
     * or Network configs.
     * @returns A promise that the client can use to retrieve the resolved options.
     */
    getOptionsAsyn: function() {
      return resolveOptions();
    },

    /**
     * Returns the options and if getOptionsAsyn() has never been called, the default options will be returned.
     * @returns {*}
     */
    getOptions: function() {
      return optionsWrapper.getOptions();
    },

    getDefaultListPageSize: function(target) {
      var options = optionsWrapper.getOptions();
      switch (target) {
        case QUERY_TARGETS.VARIABLE:
          return options.variables.listPageSize;
        case QUERY_TARGETS.DATASET:
          return options.datasets.listPageSize;
        case QUERY_TARGETS.STUDY:
          return options.studies.listPageSize;
        case QUERY_TARGETS.NETWORK:
          return options.networks.listPageSize;
      }
      return 20;
    }

  };
};

ngObibaMica.search
  .config(['$provide', function ($provide) {
    $provide.provider('ngObibaMicaSearchTemplateUrl', new ngObibaMica.NgObibaMicaTemplateUrlFactory().create(
      {
        search: {header: null, footer: null},
        searchStudiesResultTable: {template: null},
        searchNetworksResultTable: {template: null},
        searchDatasetsResultTable: {template: null},
        searchCriteriaRegionTemplate: {template: null},
        CriterionDropdownTemplate: {template: null},
        searchResultList: {template: null},
        searchInputList: {template: null},
        searchResultCoverage: {template: null},
        searchResultGraphics: {template: null},
        classifications: {header: null, footer: null}
      }
    ));
  }])
  .config(['$provide', function ($provide) {
    $provide.provider('ngObibaMicaSearch', function () {
      var optionsWrapper = new ngObibaMica.search.NgObibaMicaSearchOptionsWrapper();

      function initialize(options) {
        optionsWrapper.setOptions(options);
      }

      this.initialize = initialize;
      this.$get = ['$q', '$translate', 'ObibaServerConfigResource',
        function($q, $translate, ObibaServerConfigResource) {
        return new ngObibaMica.search.ObibaMicaSearchOptionsService($q, $translate, optionsWrapper, ObibaServerConfigResource);
      }];
    });
  }])
  .run(['GraphicChartsConfigurations',
  function (GraphicChartsConfigurations) {
    GraphicChartsConfigurations.setClientConfig();
  }]);
