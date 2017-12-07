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

(function() {
ngObibaMica.search.MetaTaxonomyService = function($q, $translate, TaxonomyResource, ngObibaMicaSearch, LocalizedValues) {
  var taxonomyPanelOptions = ngObibaMicaSearch.getOptions().taxonomyPanelOptions;
  var parser =
    new ngObibaMica.search.MetaTaxonomyParser(
      taxonomyPanelOptions,
      LocalizedValues,
      $translate.use());


  /**
   * Returns the taxonomy of taxonomy
   * @returns {*}
   */
  function getMetaTaxonomies() {
    return TaxonomyResource.get({
      target: QUERY_TARGETS.TAXONOMY,
      taxonomy: 'Mica_taxonomy'
    }).$promise;
  }

  /**
   * @param targets [variable, study, ...]
   * @returns parsed list of taxonomies each item having an info object and a list of taxonomies
   */
  function getMetaTaxonomyForTargets(targets) {
    var deferred = $q.defer();

    getMetaTaxonomies().then(
      function(metaTaxonomy) {
        var metaVocabularies = (metaTaxonomy.vocabularies || []).filter(function(vocabulary) {
          return targets.indexOf(vocabulary.name) > -1;
        });

        var taxonomies = metaVocabularies.map(
          function(vocabulary) {
            switch (vocabulary.name) {
              case QUERY_TARGETS.VARIABLE:
                return parser.parseVariableTaxonomies(vocabulary);
              case QUERY_TARGETS.NETWORK:
              case QUERY_TARGETS.STUDY:
              case QUERY_TARGETS.DATASET:
                return parser.parseEntityTaxonomies(vocabulary);
            }
          }
        );

        deferred.resolve(taxonomies || []);
      }
    );

    return deferred.promise;
  }

  /**
   * Return taxonomy panel options
   * @returns {taxonomyPanelOptions|{network, study, dataset, variable}}
   */
  function getTaxonomyPanelOptions(){
    return taxonomyPanelOptions;
  }
  // exported functions
  this.getTaxonomyPanelOptions = getTaxonomyPanelOptions;
  this.getMetaTaxonomyForTargets = getMetaTaxonomyForTargets;
};

ngObibaMica.search
  .service('MetaTaxonomyService', [
    '$q',
    '$translate',
    'TaxonomyResource',
    'ngObibaMicaSearch',
    'LocalizedValues',
    ngObibaMica.search.MetaTaxonomyService
  ]);

})();