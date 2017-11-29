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

(function () {
  ngObibaMica.search.TaxonomyFilterPanelController = function(FilterVocabulariesByQueryString) {
    var ctrl = this;

    function selectTaxonomyVocabularyArgs(vocabulary, args) {
      console.log('TaxonomyFilterPanelController');
      ctrl.onSelectTerm({target: ctrl.target, taxonomy: ctrl.taxonomy, vocabulary: vocabulary, args: args});
    }

    function onFilterChange(queryString) {
      if (queryString) {
        ctrl.filteredVocabularies = FilterVocabulariesByQueryString.filter(ctrl.taxonomy.vocabularies, queryString);
      } else {
        ctrl.filteredVocabularies = initFilteredVocabularies();
      }
    }
    function togglePannel(){
      ctrl.onToggle(ctrl.target, null);
    }

    function initFilteredVocabularies() {
      return ctrl.taxonomy.vocabularies.map(function (vocabulary) {
        vocabulary.filteredTerms = vocabulary.terms;
        return vocabulary;
      });
    }

    ctrl.filteredVocabularies = initFilteredVocabularies();
    ctrl.selectTaxonomyVocabularyArgs = selectTaxonomyVocabularyArgs;
    ctrl.onFilterChange = onFilterChange;
    ctrl.togglePannel = togglePannel;
  };

  ngObibaMica.search
    .component('taxonomyFilterPanel', {
      transclude: true,
      bindings: {
        target: '<',
        taxonomy: '<',
        onSelectTerm: '&',
        onToggle: '<'
      },
      templateUrl: 'search/components/taxonomy/taxonomy-filter-panel/component.html',
      controller: ['FilterVocabulariesByQueryString', ngObibaMica.search.TaxonomyFilterPanelController]
    });
})();
