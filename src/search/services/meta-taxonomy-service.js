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

ngObibaMica.search.MetaTaxonomyService = function($q, TaxonomyResource) {

  var parser = new ngObibaMica.search.MetaTaxonomyParser();

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
                return parser.parseVariableTaxonomies(vocabulary).pop();
              case QUERY_TARGETS.NETWORK:
              case QUERY_TARGETS.STUDY:
              case QUERY_TARGETS.DATASET:
                return parser.parseEntityTaxonomies(vocabulary).pop();
            }
          }
        );

        deferred.resolve(taxonomies || []);
      }
    );

    return deferred.promise;
  }

  // exported functions

  this.getMetaTaxonomyForTargets = getMetaTaxonomyForTargets;
};

ngObibaMica.search
  .service('MetaTaxonomyService', [
    '$q',
    'TaxonomyResource',
    ngObibaMica.search.MetaTaxonomyService
  ]);