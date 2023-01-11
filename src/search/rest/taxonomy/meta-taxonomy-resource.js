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

// SetService filter out other carts

(function () {
  ngObibaMica.search
    .factory('MetaTaxonomyResource', ['$resource', 'ngObibaMicaUrl',
      function ($resource, ngObibaMicaUrl) {
        return $resource(ngObibaMicaUrl.getUrl('MetaTaxonomyResource'), {}, {
          'put': {
            method: 'GET',
            errorHandler: true
          }
        });
      }])
      
    .factory('MetaTaxonomyMoveResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
      return $resource(ngObibaMicaUrl.getUrl('MetaTaxonomyMoveResource'), {}, {
        'put': {
          method: 'PUT',
          params: { target: '@target', taxonomy: '@taxonomy', dir: '@dir' },
          errorHandler: true
        }
      });
    }])

    .factory('MetaTaxonomyAttributeResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
      return $resource(ngObibaMicaUrl.getUrl('MetaTaxonomyAttributeResource'), {}, {
        'put': {
          method: 'PUT',
          params: { target: '@target', taxonomy: '@taxonomy', name: '@name', value: '@value' },
          errorHandler: true
        }
      });
    }]);
})();
