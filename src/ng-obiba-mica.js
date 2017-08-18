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

function NgObibaMicaUrlProvider() {
  var registry = {
    'DataAccessClientDetailPath': '',
    'DataAccessClientListPath': '',
    'DataAccessFormConfigResource': 'ws/config/data-access-form',
    'DataAccessRequestsResource': 'ws/data-access-requests',
    'DataAccessRequestsExportCsvResource': 'ws/data-access-requests/csv?lang=:lang',
    'DataAccessRequestResource': 'ws/data-access-request/:id',
    'DataAccessRequestAttachmentsUpdateResource': '/ws/data-access-request/:id/_attachments',
    'DataAccessRequestAttachmentDownloadResource': '/ws/data-access-request/:id/attachments/:attachmentId/_download',
    'SchemaFormAttachmentDownloadResource': '/ws/:path/form/attachments/:attachmentName/:attachmentId/_download',
    'DataAccessRequestDownloadPdfResource': '/ws/data-access-request/:id/_pdf',
    'DataAccessRequestCommentsResource': 'ws/data-access-request/:id/comments',
    'DataAccessRequestCommentResource': 'ws/data-access-request/:id/comment/:commentId',
    'DataAccessRequestStatusResource': 'ws/data-access-request/:id/_status?to=:status',
    'TempFileUploadResource': 'ws/files/temp',
    'TempFileResource': 'ws/files/temp/:id',
    'TaxonomiesSearchResource': 'ws/taxonomies/_search',
    'TaxonomiesResource': 'ws/taxonomies/_filter',
    'TaxonomyResource': 'ws/taxonomy/:taxonomy/_filter',
    'VocabularyResource': 'ws/taxonomy/:taxonomy/vocabulary/:vocabulary/_filter',
    'JoinQuerySearchResource': 'ws/:type/_rql?query=:query',
    'JoinQuerySearchCsvResource': 'ws/:type/_rql_csv?query=:query',
    'JoinQuerySearchCsvReportResource': 'ws/:type/_report?query=:query',
    'JoinQuerySearchCsvReportByNetworkResource': 'ws/:type/_report_by_network?networkId=:networkId&locale=:locale',
    'JoinQueryCoverageResource': 'ws/variables/_coverage?query=:query',
    'JoinQueryCoverageDownloadResource': 'ws/variables/_coverage_download?query=:query',
    'VariablePage': '',
    'NetworkPage': '#/network/:network',
    'StudyPage': '#/:type/:study',
    'StudyPopulationsPage': '#/:type/:study',
    'DatasetPage': '#/:type/:dataset',
    'BaseUrl': '/',
    'FileBrowserFileResource': 'ws/file/:path/',
    'FileBrowserSearchResource': 'ws/files-search/:path',
    'FileBrowserDownloadUrl': 'ws/draft/file-dl/:path?inline=:inline',
    'GraphicsSearchRootUrl': '#/search'
  };

  function UrlProvider(registry) {
    var urlRegistry = registry;

    this.getUrl = function (resource) {
      if (resource in urlRegistry) {
        return urlRegistry[resource];
      }

      return null;
    };
  }

  this.setUrl = function (key, url) {
    if (key in registry) {
      registry[key] = url;
    }
  };

  this.$get = function () {
    return new UrlProvider(registry);
  };
}

/* exported NgObibaMicaTemplateUrlFactory */
function NgObibaMicaTemplateUrlFactory() {
  var templates = {
    'searchStudiesResultTable' :'search/views/list/studies-search-result-table-template.html',
    'searchNetworksResultTable' :'search/views/list/networks-search-result-table-template.html',
    'searchResultList' :'search/views/search-result-list-template.html',
    'searchResultCoverage' :'search/views/search-result-coverage-template.html',
    'searchResultGraphics' :'search/views/search-result-graphics-template.html'
  };
  var factory = {registry: null};

  function TemplateUrlProvider(registry) {
    var urlRegistry = registry;

    this.getHeaderUrl = function (key) {
      if (key in urlRegistry) {
        return urlRegistry[key].header;
      }

      return null;
    };

    this.getFooterUrl = function (key) {
      if (key in urlRegistry) {
        return urlRegistry[key].footer;
      }

      return null;
    };

    this.getTemplateUrl = function (key) {
      if (key in urlRegistry) {
        return urlRegistry[key].template?urlRegistry[key].template:templates[key];
      }

      return null;
    };
  }


  factory.setTemplateUrl = function (key, url) {
    if (key in this.registry) {
      this.registry[key].template = url;
    }
  };

  factory.setHeaderUrl = function (key, url) {
    if (key in this.registry) {
      this.registry[key].header = url;
    }
  };

  factory.setFooterUrl = function (key, url) {
    if (key in this.registry) {
      this.registry[key].footer = url;
    }
  };

  factory.$get = function () {
    return new TemplateUrlProvider(this.registry);
  };

  this.create = function (inputRegistry) {
    factory.registry = inputRegistry;
    return factory;
  };
}

angular.module('ngObibaMica', [
    'schemaForm',
    'ngCookies',
    'obiba.mica.utils',
    'obiba.mica.file',
    'obiba.mica.attachment',
    'obiba.mica.access',
    'obiba.mica.search',
    'obiba.mica.graphics',
    'obiba.mica.localized',
    'obiba.mica.fileBrowser',
    'angularUtils.directives.dirPagination',
  ])
  .constant('USER_ROLES', {
    all: '*',
    admin: 'mica-administrator',
    reviewer: 'mica-reviewer',
    editor: 'mica-editor',
    user: 'mica-user',
    dao: 'mica-data-access-officer'
  })
  .config(['$provide', 'paginationTemplateProvider', function ($provide, paginationTemplateProvider) {
    $provide.provider('ngObibaMicaUrl', NgObibaMicaUrlProvider);
    paginationTemplateProvider.setPath('views/pagination-template.html');
  }]);

