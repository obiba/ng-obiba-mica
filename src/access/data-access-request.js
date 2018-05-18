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

/* global NgObibaMicaTemplateUrlFactory */

ngObibaMica.access = angular.module('obiba.mica.access', [
  'pascalprecht.translate',
  'ui.bootstrap',
  'obiba.alert',
  'obiba.comments',
  'obiba.mica.attachment',
  'obiba.utils',
  'angularMoment',
  'templates-ngObibaMica'
]);

ngObibaMica.access
  .config(['$provide', function ($provide) {
    $provide.provider('ngObibaMicaAccessTemplateUrl', new NgObibaMicaTemplateUrlFactory().create(
      {
        list: { header: null, footer: null },
        view: { header: null, footer: null },
        form: { header: null, footer: null },
        amendmentView: { header: null, footer: null },
        amendmentForm: { header: null, footer: null }
      }
    ));
  }]);
