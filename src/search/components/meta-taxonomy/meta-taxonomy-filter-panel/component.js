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

  ngObibaMica.search.Controller = function ($scope, MetaTaxonomyService, TaxonomyService) {

    function onSelectTaxonomy(target, selectedTaxonomy) {
      if (ctrl.selectedTaxonomy !== selectedTaxonomy) {
        if (ctrl.selectedTaxonomy) {
          ctrl.selectedTaxonomy.state.inactive();
        }

        ctrl.selectedTaxonomy = selectedTaxonomy;
        ctrl.selectedTaxonomy.state.active();
        ctrl.selectedTaxonomy.state.loading();

        // enough delay for UI rendering
        setTimeout(function() {
          TaxonomyService.getTaxonomies(target, selectedTaxonomy.info.name)
            .then(function (taxonomy) {
              ctrl.selectedTaxonomy.state.loaded();
              ctrl.onToggle(taxonomy);
            });
        });

      } else {
        ctrl.selectedTaxonomy.state.none();
        ctrl.selectedTaxonomy = null;
        ctrl.onToggle(ctrl.selectedTaxonomy);
      }
    }

    /**
     * Retrieves all meta taxonomies
     */
    function init() {
      MetaTaxonomyService.getMetaTaxonomyForTargets(ctrl.tabs).then(function (metaTaxonomies) {
        ctrl.metaTaxonomies = metaTaxonomies;
      });
    }

    var ctrl = this;
    ctrl.selectedTaxonomy = null;
    ctrl.onSelectTaxonomy = onSelectTaxonomy;

    init();
  };

  ngObibaMica.search
    .component('metaTaxonomyFilterPanel', {
      bindings: {
        tabs: '<',
        onToggle: '<'
      },
      templateUrl: 'search/components/meta-taxonomy/meta-taxonomy-filter-panel/component.html',
      controller: ['$scope', 'MetaTaxonomyService', 'TaxonomyService', ngObibaMica.search.Controller]
    });
})();
