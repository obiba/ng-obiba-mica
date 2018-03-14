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
  ngObibaMica.sets
    .factory('SetResource', ['$resource', 'ngObibaMicaUrl',
      function ($resource, ngObibaMicaUrl) {
        const url = ngObibaMicaUrl.getUrl('SetResource');
        return $resource(url, {}, {
          'get': {
            method: 'GET',
            params: {type: '@type', id: '@id'},
            errorHandler: true
          }
        });
      }])

    .factory('SetDocumentsResource', ['$resource', 'ngObibaMicaUrl',
      function ($resource, ngObibaMicaUrl) {
        const url = ngObibaMicaUrl.getUrl('SetDocumentsResource');
        return $resource(url, {}, {
          'get': {
            method: 'GET',
            params: {type: '@type', id: '@id', from: '@from', limit: '@limit'},
            errorHandler: true
          }
        });
      }])

    .factory('SetClearResource', ['$resource', 'ngObibaMicaUrl',
      function ($resource, ngObibaMicaUrl) {
        const url = ngObibaMicaUrl.getUrl('SetClearResource');
        return $resource(url, {}, {
          'clear': {
            method: 'DELETE',
            params: {type: '@type', id: '@id'},
            errorHandler: true
          }
        });
      }])
    
    .factory('SetImportResource', ['$resource', 'ngObibaMicaUrl',
      function ($resource, ngObibaMicaUrl) {
        const url = ngObibaMicaUrl.getUrl('SetImportResource');
        return $resource(url, {}, {
          'save': {
            method: 'POST',
            params: {type: '@type', id: '@id'},
            headers: {'Content-Type': 'text/plain'},
            errorHandler: true
          }
        });
      }]);
})();
