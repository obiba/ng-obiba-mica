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

ngObibaMica.localized

  .filter('localizedNumber', ['LocalizedValues', function(LocalizedValues) {
    return function(value){
      return value === 0 ? 0 : value ? LocalizedValues.formatNumber(value) : '';
    };
  }])
  .filter('localizedString', ['$translate', 'LocalizedValues', function ($translate, LocalizedValues) {
    return function (input) {
      return LocalizedValues.forLocale(input, $translate.use());
    };
  }]);
