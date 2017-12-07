/*
 * Copyright (c) 2017 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */


(function() {
  'use strict';

  ngObibaMica.search.FilterVocabulariesByQueryString = function($translate, LocalizedValues, MetaTaxonomyService) {
    function translateField(title) {
      return LocalizedValues.forLocale(title, $translate.use());
    }

    var taxonomyPanelOptions = MetaTaxonomyService.getTaxonomyPanelOptions();
    function filter(vocabularies, queryString) {
      if(queryString){
        var vocabulariesToFilter;
        if(angular.isArray(vocabularies)){
          vocabulariesToFilter = vocabularies;
        }
        else{
          vocabulariesToFilter = vocabularies.vocabularies;
        }
        return (vocabulariesToFilter || []).filter(function(vocabulary){
          vocabulary.filteredTerms =  (vocabulary.terms || []).filter(function(term){
            var termName = null;
            (taxonomyPanelOptions.fieldsToFilter || []).forEach(function (field) {
              if (translateField(term[field]).toLowerCase().normalize('NFD').replace(/[^\w]/g, '').indexOf(queryString.toLowerCase().normalize('NFD').replace(/[^\w]/g, '')) >= 0) {
                termName = term.name;
              }
            });
            return termName;
          });
          if(vocabulary.terms){
          return vocabulary.filteredTerms.length > 0;
          }
          else{
            return vocabulary;
          }
        });

      }
    }

    this.filter = filter;
  };

  ngObibaMica.search.TaxonomyService = function(TaxonomiesResource, TaxonomyResource) {

    /**
     * @returns Returns a taxonomy
     */
    function getTaxonomy(target, taxonomyName) {
      return TaxonomyResource.get({
        target: target,
        taxonomy: taxonomyName
      }).$promise;
    }

    function getTaxonomiesInternal(target, taxonomyNames) {
      return TaxonomiesResource.get({
        target: target,
        query: 'taxonomyName:' + taxonomyNames.join(' OR taxonomyName:')
      }).$promise;
    }

    /**
     * @returns Returns a taxonomy for several names
     */
    function getTaxonomies(target, taxonomyNames) {
      var func = Array.isArray(taxonomyNames) ? getTaxonomiesInternal : getTaxonomy;
      return func(target, taxonomyNames);
    }

    // exported functions

    this.getTaxonomy = getTaxonomy;
    this.getTaxonomies = getTaxonomies;
  };

  ngObibaMica.search
    .service('TaxonomyService', ['TaxonomiesResource', 'TaxonomyResource', ngObibaMica.search.TaxonomyService])
    .service('FilterVocabulariesByQueryString', ['$translate','LocalizedValues', 'MetaTaxonomyService', ngObibaMica.search.FilterVocabulariesByQueryString]);

})();