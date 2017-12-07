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

/* exported FIELDS_TO_FILTER */
var FIELDS_TO_FILTER = ['title', 'description', 'keywords'];

/*global NgObibaMicaTemplateUrlFactory */
ngObibaMica.search = angular.module('obiba.mica.search', [
    'obiba.alert',
    'ui.bootstrap',
    'pascalprecht.translate',
    'templates-ngObibaMica'
  ]);

ngObibaMica.search
  .config(['$provide', function ($provide) {
    $provide.provider('ngObibaMicaSearchTemplateUrl', new NgObibaMicaTemplateUrlFactory().create(
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
  .config(['$provide', '$injector', function ($provide) {
    $provide.provider('ngObibaMicaSearch', function () {
      var parentThis = this;
      var localeResolver = ['LocalizedValues', function (LocalizedValues) {
        return LocalizedValues.getLocal();
      }];
      var optionsResolver;
      var options = {
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
          fieldsToFilter : FIELDS_TO_FILTER
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

      this.setLocaleResolver = function(resolver) {
        localeResolver = resolver;
      };

      this.setOptionsResolver = function(resolver) {
        optionsResolver = resolver;
      };

      function sanitizeFieldsToFilter(valueFieldsToFilter){
        if (valueFieldsToFilter.length > 0) {
          return valueFieldsToFilter.filter(function(valueField){
            return FIELDS_TO_FILTER.filter(function(defaultFiled){
              return valueField === defaultFiled;
            });
          });
        }
      return null;
      }

      this.setOptions = function (value) {
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
        options.taxonomyPanelOptions.fieldsToFilter = sanitizeFieldsToFilter(value.taxonomyPanelOptions.fieldsToFilter) || options.taxonomyPanelOptions.fieldsToFilter;
        if(value.studies && value.studies.obibaListOptions){
          options.obibaListOptions.countCaption = value.studies.obibaListOptions.studiesCountCaption === 0  ? value.studies.obibaListOptions.studiesCountCaption : true;
          options.obibaListOptions.searchForm = value.studies.obibaListOptions.studiesSearchForm === 0 ? value.studies.obibaListOptions.studiesSearchForm : true;
          options.obibaListOptions.supplInfoDetails = value.studies.obibaListOptions.studiesSupplInfoDetails === 0 ? value.studies.obibaListOptions.studiesSupplInfoDetails : true;
          options.obibaListOptions.trimmedDescription = value.studies.obibaListOptions.studiesTrimmedDescription === 0 ? value.studies.obibaListOptions.studiesTrimmedDescription : true;
        }
      };

      this.$get = ['$q', '$injector', function ngObibaMicaSearchFactory($q, $injector) {

        function removeItemByValue(array, value) {
          var index = array.indexOf(value);
          if (index > -1) {
            array.splice(index, 1);
          }
          return array;
        }

        function normalizeOptions() {
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

        function resolveOptions() {
          $q.when($injector.invoke(optionsResolver), function (opts) {
            parentThis.setOptions(opts);
            normalizeOptions();
          });
        }

        if (optionsResolver) {
          resolveOptions();
        } else {
          normalizeOptions();
        }

        return {
          getLocale: function(success, error) {
            return $q.when($injector.invoke(localeResolver), success, error);
          },
          getOptions: function() {
            return options;
          },
          getDefaultListPageSize: function(target) {
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
          },
          toggleHideSearchNavigate: function (vocabulary) {
            var index = options.hideNavigate.indexOf(vocabulary.name);
            if (index > -1) {
              options.hideNavigate.splice(index, 1);
            } else {
              options.hideNavigate.push(vocabulary.name);
            }
          }
        };
      }];
    });
  }])
  .run(['GraphicChartsConfigurations',
  function (GraphicChartsConfigurations) {
    GraphicChartsConfigurations.setClientConfig();
  }]);
