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


  /**
   * Parses each metaTaxonomies taxonomy and returns a list of :
   * [
   *  {
   *    info: {
   *      name: name,
   *      title: title
   *     },
   *    taxonomies: [taxos]
   *   }
   * ]
   * @constructor
   */
  ngObibaMica.search.MetaTaxonomyParser = function(config, LocalizedValues, locale) {

    function translateTitle(title) {
      return LocalizedValues.forLocale(title, locale);
    }

    function parseTerms(targetConfig, terms) {
      return terms.map(function(taxonomy, index) {
        var title = targetConfig.taxonomies[taxonomy.name].trKey || translateTitle(taxonomy.title);
        return {
          state: new ngObibaMica.search.PanelTaxonomyState(index+''),
          info: {name: taxonomy.name, title: title},
          taxonomies: [taxonomy]
        };
      }); 
    }

    function createResultObject(metaVocabulary, taxonomies) {
      return {
        name: metaVocabulary.name,
        title: metaVocabulary.title,
        taxonomies: taxonomies
      };
    }

    function sortTaxonomies(target, taxonomies) {
      var configTaxonomies = config[target].taxonomies;
      taxonomies.sort(function(a, b) {
        return configTaxonomies[a.info.name].weight - configTaxonomies[b.info.name].weight;
      });
    }

    this.config = config;
    this.translateTitle = translateTitle;
    this.parseTerms = parseTerms;
    this.createResultObject = createResultObject;
    this.sortTaxonomies = sortTaxonomies;
  };

  ngObibaMica.search.MetaTaxonomyParser.prototype.parseEntityTaxonomies = function(metaVocabulary) {
    return this.createResultObject(metaVocabulary,
      this.parseTerms(this.config[metaVocabulary.name], metaVocabulary.terms || []));
  };

  /**
   * Variable meta taxonomies need to be massaged a little more:
   * - extract Variable characteristics
   * - extract Scales as onetaxonomy (there are four related taxonomies) into one
   * - sort them and return the list to the client code
   * @param metaVocabulary
   * @returns {{name, title, taxonomies}|*}
   */
  ngObibaMica.search.MetaTaxonomyParser.prototype.parseVariableTaxonomies = function(metaVocabulary) {

    var metaTaxonomies = metaVocabulary.terms.filter(function (term) {
      return ['Variable_chars', 'Scales'].indexOf(term.name) > -1;
    }).reduce(function(acc, term) {
      var key = new obiba.utils.NgObibaStringUtils().camelize(term.name);
      acc[key] = term;
      return acc;
    }, {});

    var taxonomies = this.parseTerms(this.config[QUERY_TARGETS.VARIABLE], metaTaxonomies.variableChars.terms);

    var scales = metaTaxonomies.scales;
    if (scales && scales.terms) {
      taxonomies.push({
        state: new ngObibaMica.search.PanelTaxonomyState(),
        info: {
          name: scales.name,
          names: scales.terms.map(function(t){return t.name;}),
          title: this.translateTitle(scales.title),
          description: this.translateTitle(scales.description)
        },
        taxonomies: scales.terms
      });
    }

    this.sortTaxonomies(QUERY_TARGETS.VARIABLE, taxonomies);
    return this.createResultObject(metaVocabulary, taxonomies);
  };

})();