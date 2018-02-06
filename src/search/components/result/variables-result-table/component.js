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

  function VariablesResultTable(PageUrlService, ngObibaMicaSearch) {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        lang: '=',
        summaries: '=',
        loading: '='
      },
      templateUrl: 'search/components/result/variables-result-table/component.html',
      link: function (scope) {
        scope.options = ngObibaMicaSearch.getOptions().variables;
        scope.optionsCols = scope.options.variablesColumn;
        scope.PageUrlService = PageUrlService;
      }
    };
  }

  ngObibaMica.search.directive('variablesResultTable', ['PageUrlService', 'ngObibaMicaSearch', VariablesResultTable]);
})();
