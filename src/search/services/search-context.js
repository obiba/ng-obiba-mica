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
  ngObibaMica.search.SearchContext = function () {
    var selectedLocale = null;

    this.setLocale = function (locale) {
      selectedLocale = locale;
    };

    this.currentLocale = function () {
      return selectedLocale;
    };

  };

  ngObibaMica.search.service('SearchContext', ngObibaMica.search.SearchContext);
})();