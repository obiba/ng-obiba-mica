/*
 * Copyright (c) 2014 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

angular.module('obiba.mica.access', [
  'pascalprecht.translate',
  'obiba.alert',
  'obiba.comments',
  'obiba.mica.attachment',
  'obiba.utils',
  'angularMoment',
  'templates-ngObibaMica'
]);
  //.config(['$provide', function($provide) {
  //  $provide.provider('ngObibaMicaUrl', function() {
  //    var templates = {
  //      'header': '',
  //      'footer': ''
  //    };
  //
  //    function UrlProvider(registry) {
  //      var urlRegistry = registry;
  //
  //      this.getUrl =function(resource) {
  //        if (resource in urlRegistry) {
  //          return urlRegistry[resource];
  //        }
  //
  //        return null;
  //      };
  //    }
  //
  //    this.setHeader = function(key, url) {
  //      if (key in registry) {
  //        registry[key] = url;
  //      }
  //    };
  //
  //    this.$get = function() {
  //      return new UrlProvider(registry);
  //    };
  //
  //  });
  //
  //}]);


