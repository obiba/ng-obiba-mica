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
  ngObibaMica.search.VocabularyFilterDetailController = function (RqlQueryUtils) {
    var ctrl = this;

    function checkAndSetCriterionType(vocabulary) {
      if (RqlQueryUtils.isTermsVocabulary(vocabulary) || RqlQueryUtils.isRangeVocabulary(vocabulary)) {
        ctrl.criterionType = 'string-terms';
      } else if (RqlQueryUtils.isNumericVocabulary(vocabulary)) {
        ctrl.criterionType = 'numeric';
      } else if (RqlQueryUtils.isMatchVocabulary(vocabulary)) {
        ctrl.criterionType = 'match';
      }
    }

    function selectVocabularyArgs(args) {
      ctrl.onSelectVocabularyArgs({vocabulary: ctrl.vocabulary, args: args});
    }

    function removeCriterion() {
      ctrl.onRemoveCriterion({item: ctrl.vocabulary.existingItem});
    }

    function toggleVocabularySelection(checkboxClickEvent, modelValue) {
      if (modelValue) {
        selectVocabularyArgs(null);
      } else {
        removeCriterion();
      }
    }

    function selectAllFilteredVocabularyTerms(terms) {
      var processedTerms = terms.map(function (term) {
        term.selected = true;
        return term;
      });

      selectVocabularyArgs({term: processedTerms});
    }

    function canStillSelectMore(terms) {
      var selected = terms.filter(function (term) { return term.selected; });
      return selected.length < terms.length;
    }

    function onChanges(changesObj) {
      if (changesObj.vocabulary) {
        checkAndSetCriterionType(ctrl.vocabulary);
      }
    }

    ctrl.$onChanges = onChanges;
    ctrl.canStillSelectMore = canStillSelectMore;
    ctrl.toggleVocabularySelection = toggleVocabularySelection;
    ctrl.selectAllFilteredVocabularyTerms = selectAllFilteredVocabularyTerms;
    ctrl.selectVocabularyArgs = selectVocabularyArgs;
    ctrl.removeCriterion = removeCriterion;
  };

  ngObibaMica.search
    .component('vocabularyFilterDetail', {
      transclude: true,
      bindings: {
        vocabulary: '<',
        onSelectVocabularyArgs: '&',
        onRemoveCriterion: '&'
      },
      templateUrl: 'search/components/vocabulary/vocabulary-filter-detail/component.html',
      controller: ['RqlQueryUtils', ngObibaMica.search.VocabularyFilterDetailController]
    });
})();
