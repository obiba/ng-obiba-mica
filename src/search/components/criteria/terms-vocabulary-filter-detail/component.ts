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

class TermsVocabularyFilterDetailController implements ng.IComponentController {

  private ctrl: ng.IComponentController;
  readonly constantLimitNumber : number;
  public limitNumber : number;

  constructor() {
    this.ctrl = this;
    this.constantLimitNumber = 12;
    this.limitNumber = this.constantLimitNumber;
  }

  public clickCheckbox(input: string) {
    var args = { term: input };
    this.ctrl.onSelectArgs({ vocabulary: this.ctrl.vocabulary, args: args });
  }
}

class TermsVocabularyFilterDetailComponent implements ng.IComponentOptions {

  public controller: ng.Injectable<ng.IControllerConstructor>;
  public controllerAs: string;
  public templateUrl: string;
  public transclude: boolean;
  public bindings;

  constructor() {
    this.transclude = true;
    this.bindings = {
      vocabulary: '<',
      onSelectArgs: '&'
    };
    this.controller = TermsVocabularyFilterDetailController;
    this.controllerAs = '$ctrl';
    this.templateUrl = 'search/components/criteria/terms-vocabulary-filter-detail/component.html';
  }
}

ngObibaMica.search
  .component('termsVocabularyFilterDetail', new TermsVocabularyFilterDetailComponent());