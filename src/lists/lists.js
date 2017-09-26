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

function NgObibaMicaListsOptionsFactory() {
  var defaultOptions = {
    networks: {
      networksListSearchOptions: {
        fields: ['studyIds', 'acronym.*', 'name.*', 'description.*', 'logo']
      },
      networksListOptions: {
        sortField: {
          options: [
            {
              value: 'name',
              label: 'name'
            },
            {
              value: 'acronym',
              label: 'acronym'
            },
            {
              value: 'numberOfStudies',
              label: 'studies'
            }
          ],
          default: 'name'
        },
        orderField: {
          options: [
            {
              value: '',
              label: 'asc'
            },
            {
              value: '-',
              label: 'desc'
            }
          ],
          default: ''
        }
      }
    },
    studies: {
      studiesListSearchOptions: {
        fields: ['logo', 'objectives.*', 'acronym.*', 'name.*', 'model.methods.design', 'model.numberOfParticipants.participant']
      },
      studiesListOptions: {
        studiesCountCaption: true,
        studiesSearchForm: true,
        studiesSupplInfoDetails: true,
        studiesTrimedDescrition: true,
        sortField: {
          options: [
            {
              value: 'name',
              label: 'name'
            },
            {
              value: 'acronym',
              label: 'acronym'
            },
            {
              value: 'numberOfParticipants-participant-number',
              label: 'study_taxonomy.vocabulary.numberOfParticipants-participant-number.title'
            }
          ],
          default: 'name'
        },
        orderField: {
          options: [
            {
              value: '',
              label: 'asc'
            },
            {
              value: '-',
              label: 'desc'
            }
          ],
          default: ''
        }
      }
    },
    datasets: {
      datasetsListSearchOptions: {
        fields: ['acronym.*', 'name.*', 'description.*', 'variableType',
          'studyTable.studyId',
          'studyTable.project',
          'studyTable.table',
          'studyTable.populationId',
          'studyTable.dataCollectionEventId',
          'harmonizationTable.studyId',
          'harmonizationTable.project',
          'harmonizationTable.table',
          'harmonizationTable.populationId'
        ],
        datasetsListOptions: {
          sortField: {
            options: [
              {
                value: 'name',
                label: 'name'
              },
              {
                value: 'acronym',
                label: 'acronym'
              },
              {
                value: 'studyTable.studyId,studyTable.populationWeight,studyTable.dataCollectionEventWeight,acronym',
                label: 'global.chronological'
              }
            ],
            default: 'name'
          },
          orderField: {
            options: [
              {
                value: '',
                label: 'asc'
              },
              {
                value: '-',
                label: 'desc'
              }
            ],
            default: 'asc'
          }
        }
      }
    }
  };

  function NgObibaMicaListsOptions() {
    this.getOptions = function () {
      return defaultOptions;
    };
  }

  this.$get = function () {
    return new NgObibaMicaListsOptions();
  };

  this.setOptions = function (value) {
    Object.keys(value).forEach(function (option) {
      if(option in defaultOptions){
        defaultOptions[option] = value[option];
      }
    });
  };

}

angular.module('obiba.mica.lists', [
  'obiba.mica.lists.search.widget',
  'obiba.mica.lists.sort.widget',
  'obiba.mica.search'
])
   .run()
  .config(['$provide', function($provide){
    $provide.provider('ngObibaMicaLists', NgObibaMicaListsOptionsFactory);
  }])
  // .config(['ngObibaMicaSearchProvider', 'markedProvider', 'sortWidgetOptionsProvider', 'ngObibaMicaListsProvider',
  //   function (ngObibaMicaSearchProvider, markedProvider, sortWidgetOptionsProvider, ngObibaMicaListsProvider) {
  //     console.log(sortWidgetOptionsProvider);
      // sortWidgetOptionsProvider.setOptions(clientOptions.studies ? clientOptions.studies : null);
      // sortWidgetOptionsProvider.setOptions(clientOptions.networks ? clientOptions.networks : null);
      // sortWidgetOptionsProvider.setOptions(clientOptions.datasets ? clientOptions.datasets : null);

  //   markedProvider.setOptions({
  //     gfm: true,
  //     tables: true,
  //     sanitize: false
  //   });
  //  var searchOption = ngObibaMicaSearchProvider.getOptions();
  //  var listsOption = ngObibaMicaListsProvider.getOptions();
  //   var mergedOptions = angular.extend({},
  //     searchOption,
  //     listsOption);
  //   ngObibaMicaSearchProvider.setOptions(mergedOptions);
  // }])
  .config(['ngObibaMicaSearchTemplateUrlProvider',
    function (ngObibaMicaSearchTemplateUrlProvider) {
      ngObibaMicaSearchTemplateUrlProvider.setTemplateUrl('searchStudiesResultTable', 'lists/views/list/studies-search-result-table-template.html');
      ngObibaMicaSearchTemplateUrlProvider.setTemplateUrl('searchNetworksResultTable', 'lists/views/list/networks-search-result-table-template.html');
      ngObibaMicaSearchTemplateUrlProvider.setTemplateUrl('searchDatasetsResultTable', 'lists/views/list/datasets-search-result-table-template.html');
      ngObibaMicaSearchTemplateUrlProvider.setTemplateUrl('searchResultList', 'lists/views/search-result-list-template.html');
    }])
  .filter('getBaseUrl', function () {
    return function (param) {
      return '/mica/' + param;
    };
  }).filter('doSearchQuery', function () {
    return function (type, query) {
      return '/mica/repository#/search?type=' + type + '&query=' + query + '&display=list';
    };
  })
  .filter('getLabel', function () {
    return function (SelectSort, valueSort) {
      var result = null;
      angular.forEach(SelectSort.options, function (value) {
        if (value.value.indexOf(valueSort) !== -1) {
          result = value.label;
        }
      });
      return result;
    };
  })
  //.provide('ngObibaMicaLists', NgObibaMicaListsOptionsFactory)
 ;
