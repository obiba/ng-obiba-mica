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

/* global QUERY_TARGETS */

(function () {
  var FIELDS_TO_FILTER = ['name', 'title', 'description', 'keywords'];

  function NgObibaMicaSearchOptionsWrapper() {
    var options = {
      taxonomyPanelOptions: {
        network: {
          taxonomies: { 'Mica_network': { trKey: 'properties' } }
        },
        study: {
          taxonomies: { 'Mica_study': { trKey: 'properties' } }
        },
        dataset: {
          taxonomies: { 'Mica_dataset': { trKey: 'properties' } }
        },
        variable: {
          taxonomies: {
            'Mica_variable': { trKey: 'properties' }
          }
        },
        fieldsToFilter: FIELDS_TO_FILTER
      },
      targetTabsOrder: [QUERY_TARGETS.VARIABLE, QUERY_TARGETS.DATASET, QUERY_TARGETS.STUDY, QUERY_TARGETS.NETWORK]
    };

    function sanitizeFieldsToFilter(valueFieldsToFilter) {
      if (valueFieldsToFilter) {
        return valueFieldsToFilter.filter(function (valueField) {
          return FIELDS_TO_FILTER.indexOf(valueField) > -1;
        });
      }
      return null;
    }

    function setOptions(value) {
      options = angular.merge(options, value);
      //NOTICE: angular.merge merges arrays by position. Overriding manually.
      options.targetTabsOrder = value.targetTabsOrder || options.targetTabsOrder;
      //TODO: Needs a better mechanism for setting options
      options.studies.fields = value.studies && value.studies.fields || options.studies.fields;
      options.networks.fields = value.networks && value.networks.fields || options.networks.fields;
      options.datasets.fields = value.datasets && value.datasets.fields || options.datasets.fields;
      if (value.taxonomyPanelOptions) {
        options.taxonomyPanelOptions.fieldsToFilter = sanitizeFieldsToFilter(value.taxonomyPanelOptions.fieldsToFilter) || options.taxonomyPanelOptions.fieldsToFilter;
      }
    }

    function getOptions() {
      return angular.copy(options);
    }

    this.setOptions = setOptions;
    this.getOptions = getOptions;
  }

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
  function ObibaMicaSearchOptionsService($q, $translate, optionsWrapper, ObibaServerConfigResource) {

    var deferred = $q.defer();
    var resolved = false;

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
          var updatedOptions = {
            locale: micaConfig.languages || $translate.use()
          };

          optionsWrapper.setOptions(updatedOptions);
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
      getOptionsAsyn: function () {
        return resolveOptions();
      },

      /**
       * Returns the options and if getOptionsAsyn() has never been called, the default options will be returned.
       * @returns {*}
       */
      getOptions: function () {
        return optionsWrapper.getOptions();
      },

      getDefaultListPageSize: function (target) {
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
  }

  ngObibaMica.search
    .config(['$provide', function ($provide) {
      $provide.provider('ngObibaMicaSearch', function () {
        var optionsWrapper = new NgObibaMicaSearchOptionsWrapper();

        function initialize(options) {
          optionsWrapper.setOptions(options);
        }

        this.initialize = initialize;
        this.$get = ['$q', '$translate', 'ObibaServerConfigResource',
          function ($q, $translate, ObibaServerConfigResource) {
            return new ObibaMicaSearchOptionsService($q, $translate, optionsWrapper, ObibaServerConfigResource);
          }];
      });
    }]);
})();
