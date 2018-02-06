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

(function () {
  function TermsVocabularyFilterDetailController() {
    var ctrl = this;

    function clickCheckbox(input) {
      var args = { term: input };
      ctrl.onSelectArgs({ vocabulary: ctrl.vocabulary, args: args });
    }

    ctrl.constantLimitNumber = 12;
    ctrl.limitNumber = ctrl.constantLimitNumber;
    ctrl.clickCheckbox = clickCheckbox;
  }

  ngObibaMica.search
    .component('termsVocabularyFilterDetail', {
      transclude: true,
      bindings: {
        vocabulary: '<',
        onSelectArgs: '&'
      },
      templateUrl: 'search/components/criteria/terms-vocabulary-filter-detail/component.html',
      controller: [TermsVocabularyFilterDetailController]
    });
})();
