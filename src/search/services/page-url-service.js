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
  function PageUrlService(ngObibaMicaUrl, StringUtils, urlEncode) {

    this.studyPage = function (id, type) {
      var sType = (type.toLowerCase().indexOf('individual') > -1 ? 'individual' : 'harmonization') + '-study';
      return id ? StringUtils.replaceAll(ngObibaMicaUrl.getUrl('StudyPage'), { ':type': urlEncode(sType), ':study': urlEncode(id) }) : '';
    };

    this.studyPopulationPage = function (id, type, populationId) {
      var sType = (type.toLowerCase() === 'individual' ? 'individual' : 'harmonization') + '-study';
      return id ? StringUtils.replaceAll(ngObibaMicaUrl.getUrl('StudyPopulationsPage'), { ':type': urlEncode(sType), ':study': urlEncode(id), ':population': urlEncode(populationId) }) : '';
    };

    this.networkPage = function (id) {
      return id ? StringUtils.replaceAll(ngObibaMicaUrl.getUrl('NetworkPage'), { ':network': urlEncode(id) }) : '';
    };

    this.datasetPage = function (id, type) {
      var dsType = (type.toLowerCase() === 'collected' ? 'collected' : 'harmonized') + '-dataset';
      return id ? StringUtils.replaceAll(ngObibaMicaUrl.getUrl('DatasetPage'), { ':type': urlEncode(dsType), ':dataset': urlEncode(id) }) : '';
    };

    this.variablePage = function (id) {
      return id ? StringUtils.replaceAll(ngObibaMicaUrl.getUrl('VariablePage'), { ':variable': urlEncode(id) }) : '';
    };

    this.downloadCoverage = function (query) {
      return StringUtils.replaceAll(ngObibaMicaUrl.getUrl('JoinQueryCoverageDownloadResource'), { ':query': query });
    };

    this.entitiesCountPage = function (query) {
      return StringUtils.replaceAll(ngObibaMicaUrl.getUrl('EntitiesCountPage'), { ':query': urlEncode(query) });
    };

    this.searchPage = function (query) {
      return StringUtils.replaceAll(ngObibaMicaUrl.getUrl('SearchPage'), { ':query': urlEncode(query) });
    };

    return this;
  }

  ngObibaMica.search.service('PageUrlService', ['ngObibaMicaUrl', 'StringUtils', 'urlEncode', PageUrlService]);
})();