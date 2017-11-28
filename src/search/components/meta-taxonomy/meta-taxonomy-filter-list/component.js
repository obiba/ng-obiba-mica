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

  ngObibaMica.search.Controller = function() {
    var ctrl = this;

    function selectTaxonomy(taxonomy) {
      ctrl.onSelectTaxonomy({target: ctrl.metaTaxonomy.name, taxonomy: taxonomy});
    }

    ctrl.status = {isFirstOpen: true};
    ctrl.selectTaxonomy = selectTaxonomy;
  };

  ngObibaMica.search

    .component('metaTaxonomyFilterList', {
      transclude: true,
      bindings: {
        metaTaxonomy: '<',
        onSelectTaxonomy: '&'
      },
      templateUrl: 'search/components/meta-taxonomy/meta-taxonomy-filter-list/component.html',
      controller: ngObibaMica.search.Controller
    });
})();