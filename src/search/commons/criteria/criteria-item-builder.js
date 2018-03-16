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


/**
 * Criteria Item builder
 */

/* global CriteriaIdGenerator */
/* global CriteriaItem */
/* exported CriteriaItemBuilder */
function CriteriaItemBuilder(LocalizedValues, useLang, SetService) {
  var criteria = {
    type: null,
    rqlQuery: null,
    lang: useLang || 'en',
    parent: null,
    children: []
  };

  var builder = this;

  this.type = function (value) {
    if (!RQL_NODE[value.toUpperCase()]) {
      throw new Error('Invalid node type:', value);
    }
    criteria.type = value;
    return this;
  };

  this.target = function (value) {
    criteria.target = value;
    return this;
  };

  this.parent = function (value) {
    criteria.parent = value;
    return this;
  };

  this.taxonomy = function (value) {
    criteria.taxonomy = value;
    return this;
  };

  this.vocabulary = function (value) {
    criteria.vocabulary = value;

    // decorate 'sets' vocabulary with local sets info
    if (criteria.vocabulary.name === 'sets') {
      switch (criteria.taxonomy.name) {
        case 'Mica_variable':
         appendSetTerms(criteria, 'variables');
         break;
        case 'Mica_dataset':
         appendSetTerms(criteria, 'datasets');
          break;
        case 'Mica_study':
          appendSetTerms(criteria, 'studies');
          break;
        case 'Mica_network':
          appendSetTerms(criteria, 'networks');
          break;
      }
    }
  
    return this;
  };

  this.term = function (value) {
    if (Array.isArray(value)) {
      return builder.selectedTerms(value);
    } else {
      criteria.term = value;
      return this;
    }
  };

  this.rqlQuery = function (value) {
    criteria.rqlQuery = value;
    return this;
  };

  this.selectedTerm = function (term) {
    if (!criteria.selectedTerms) {
      criteria.selectedTerms = [];
    }

    criteria.selectedTerms.push(typeof term === 'string' || typeof term === 'number' ? term : term.name);
    return this;
  };

  this.selectedTerms = function (terms) {
    criteria.selectedTerms = terms.filter(function (term) {
      return term;
    }).map(function (term) {
      if (typeof term === 'string' || typeof term === 'number') {
        return term;
      } else {
        return term.name;
      }
    });
    return this;
  };

  /**
   * This is
   */
  function prepareForLeaf() {
    if (criteria.term) {
      criteria.itemTitle = LocalizedValues.forLocale(criteria.term.title, criteria.lang);
      criteria.itemDescription = LocalizedValues.forLocale(criteria.term.description, criteria.lang);
      criteria.itemParentTitle = LocalizedValues.forLocale(criteria.vocabulary.title, criteria.lang);
      criteria.itemParentDescription = LocalizedValues.forLocale(criteria.vocabulary.description, criteria.lang);
      if (!criteria.itemTitle) {
        criteria.itemTitle = criteria.term.name;
      }
      if (!criteria.itemParentTitle) {
        criteria.itemParentTitle = criteria.vocabulary.name;
      }
    } else {
      criteria.itemTitle = LocalizedValues.forLocale(criteria.vocabulary.title, criteria.lang);
      criteria.itemDescription = LocalizedValues.forLocale(criteria.vocabulary.description, criteria.lang);
      criteria.itemParentTitle = LocalizedValues.forLocale(criteria.taxonomy.title, criteria.lang);
      criteria.itemParentDescription = LocalizedValues.forLocale(criteria.taxonomy.description, criteria.lang);
      if (!criteria.itemTitle) {
        criteria.itemTitle = criteria.vocabulary.name;
      }
      if (!criteria.itemParentTitle) {
        criteria.itemParentTitle = criteria.taxonomy.name;
      }
    }

    criteria.id = CriteriaIdGenerator.generate(criteria.taxonomy, criteria.vocabulary, criteria.term);
  }

  /**
   * Decorate the 'sets' vocabulary with the sets that are living in the browser local storage.
   * @param criteria the criteria that holds the 'sets' vocabulary
   * @param documentType the document type
   */
  function appendSetTerms(criteria, documentType) {
    // note: for now there is only a cart set
    var cartSet = SetService.getCartSet(documentType);
    if (cartSet) {
      var cartTerm;
      if (criteria.vocabulary.terms) {
        // look for a placeholder to get alternate translations
        var cTerm = criteria.vocabulary.terms.filter(function(term) {
          return term.name === 'cart';
        });
        if (cTerm.length>0) {
          cartTerm = cTerm[0];
        }
      }
      if (!cartTerm) {
        // create default title, if not found reference term was not found
        cartTerm = {
          title: [
            {locale: 'en', text: 'Cart'},
            {locale: 'fr', text: 'Panier'}
          ]
        };
      }
      cartTerm.name = cartSet.id;
      criteria.vocabulary.terms = [cartTerm];
    } else {
      criteria.vocabulary.terms = [];
    }
  }

  this.build = function () {
    if (criteria.taxonomy && criteria.vocabulary) {
      prepareForLeaf();
    }
    return new CriteriaItem(criteria);
  };

}

