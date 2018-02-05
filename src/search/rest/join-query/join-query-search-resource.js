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

  ngObibaMica.search.factory('JoinQuerySearchResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
      var resourceUrl = ngObibaMicaUrl.getUrl('JoinQuerySearchResource');
      var actionFactory = function (type) {
        var method = resourceUrl.indexOf(':query') === -1 ? 'POST' : 'GET';
        var contentType = method === 'POST' ? 'application/x-www-form-urlencoded' : 'application/json';
        var requestTransformer = function (obj) {
          var str = [];
          for (var p in obj) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
          }
          return str.join('&');
        };
        return {
          method: method,
          headers: {
            'Content-Type': contentType
          },
          errorHandler: true,
          params: { type: type },
          transformRequest: requestTransformer
        };
      };
      return $resource(resourceUrl, {}, {
        'variables': actionFactory('variables'),
        'studies': actionFactory('studies'),
        'networks': actionFactory('networks'),
        'datasets': actionFactory('datasets')
      });
    }]);
})();
