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
  ngObibaMica.search.EntitySuggestionService = function($rootScope,
                                                        $location,
                                                        $translate,
                                                        DocumentSuggestionResource,
                                                        RqlQueryService) {

    function suggest(entityType, query) {
      var obibaUtils = new obiba.utils.NgObibaStringUtils();
      var cleanQuery = obibaUtils.cleanDoubleQuotesLeftUnclosed(query);

      if (entityType && query && cleanQuery.length > 1) {
        return DocumentSuggestionResource.query({locale: $translate.use(), documentType: entityType, query: cleanQuery})
          .$promise
          .then(function (response) {
            var parsedResponse = Array.isArray(response) ? response : [];

            for (var i = 0; i < parsedResponse.length; i++) {
              parsedResponse[i] = obibaUtils.quoteQuery(parsedResponse[i].replace(/\/.*/, ''));
            }

            return parsedResponse;
          });
      } else {
        return [];
      }
    }

    function suggestForTargetQuery(entityType, query) {
      var rql = RqlQueryService.parseQuery($location.search().query);
      var targetQuery = RqlQueryService.findTargetQuery(typeToTarget(entityType), rql);
      var classNameQuery = RqlQueryService.findQueryInTargetByVocabulary(targetQuery, 'className');
      if (classNameQuery) {
        query = 'className:' + classNameQuery.args[1] + ' AND (' + query.replace(/\/.*/, '') + ')';
      }

      return suggest(entityType, query);
    }

    function getCurrentSuggestion(target, query) {

      if (query) {
        var targetQuery = RqlQueryService.findTargetQuery(target, query);
        if (targetQuery) {
          var matchQuery = targetQuery.args.filter(function (arg) {
            return arg.name === RQL_NODE.DOC_MATCH;
          }).pop();

          return matchQuery && matchQuery.args ? matchQuery.args[0][0] : '';
        }
      }

      return '';
    }

    function selectSuggestion(target, suggestion, withSpecificFields) {
      $rootScope.$new().$emit('ngObibaMicaSearch.searchSuggestion',
        new obiba.utils.NgObibaStringUtils().cleanDoubleQuotesLeftUnclosed(suggestion), target, withSpecificFields);
    }

    this.getCurrentSuggestion = getCurrentSuggestion;
    this.suggest = suggest;
    this.selectSuggestion = selectSuggestion;
    this.suggestForTargetQuery = suggestForTargetQuery;
  };

  ngObibaMica.search
    .service('EntitySuggestionService', [
      '$rootScope',
      '$location',
      '$translate',
      'DocumentSuggestionResource',
      'RqlQueryService',
      ngObibaMica.search.EntitySuggestionService
    ]);

})();