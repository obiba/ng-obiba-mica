/*!
 * ng-obiba-mica - v3.2.2
 * https://github.com/obiba/ng-obiba-mica

 * License: GNU Public License version 3
 * Date: 2018-02-08
 */
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

var ngObibaMica;

(function () {

  ngObibaMica = angular.module('ngObibaMica', [
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
    'angularUtils.directives.dirPagination'
  ]);

  ngObibaMica.NgObibaMicaUrlProvider = function() {
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
      'JoinQuerySearchResource': 'ws/:type/_rql',
      'JoinQuerySearchCsvResource': 'ws/:type/_rql_csv?query=:query',
      'JoinQuerySearchCsvReportResource': 'ws/:type/_report?query=:query',
      'JoinQuerySearchCsvReportByNetworkResource': 'ws/:type/_report_by_network?networkId=:networkId&locale=:locale',
      'JoinQueryCoverageResource': 'ws/variables/_coverage',
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
      'SearchBaseUrl': '#/search',
      'DocumentSuggestion': 'ws/:documentType/_suggest'
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
  };

  ngObibaMica.NgObibaMicaTemplateUrlFactory = function(){
    var templates = {
      'searchStudiesResultTable': 'search/views/list/studies-search-result-table-template.html',
      'searchNetworksResultTable': 'search/views/list/networks-search-result-table-template.html',
      'searchDatasetsResultTable': 'search/views/list/datasets-search-result-table-template.html',
      'searchCriteriaRegionTemplate': 'search/views/criteria/search-criteria-region-template.html',
      'vocabularyFilterDetailHeading': 'search/components/vocabulary-filter-detail-heading/component.html',
      'CriterionDropdownTemplate': 'search/views/criteria/criterion-dropdown-template.html',
      'searchResultList': 'search/views/search-result-list-template.html',
      'searchInputList': 'lists/views/input-search-widget/input-search-widget-template.html',
      'searchResultCoverage': 'search/views/search-result-coverage-template.html',
      'searchResultGraphics': 'search/views/search-result-graphics-template.html'
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
          return urlRegistry[key].template ? urlRegistry[key].template : templates[key];
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
  };

  ngObibaMica.ServerConfigResourceProvider = function() {
    var provider  = this;

    function setFactory(value) {
      provider.$get = value;
    }

    /**
     * Default
     */
    provider.$get = function() {
      throw new Error('The provider factory method $get() must be overridden by client code.');
    };

    /**
     * Clients can override the $get() method to provide their MicaConfigResource object.
     * @type {setFactory}
     */
    provider.setFactory = setFactory;
  };

  ngObibaMica
    .constant('USER_ROLES', {
      all: '*',
      admin: 'mica-administrator',
      reviewer: 'mica-reviewer',
      editor: 'mica-editor',
      user: 'mica-user',
      dao: 'mica-data-access-officer'
    })
    .config(['$provide', 'paginationTemplateProvider', function ($provide, paginationTemplateProvider) {
      $provide.provider('ngObibaMicaUrl', ngObibaMica.NgObibaMicaUrlProvider);
      $provide.provider('ObibaServerConfigResource', ngObibaMica.ServerConfigResourceProvider);
      paginationTemplateProvider.setPath('views/pagination-template.html');
    }]);

})();;/*
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

ngObibaMica.utils = angular.module('obiba.mica.utils', ['schemaForm']);

ngObibaMica.utils
  .factory('urlEncode', function() {
    return function(input) {
      return window.encodeURIComponent(input);
    };
  })
  .factory('UserProfileService',
    function () {

      var getAttributeValue = function(attributes, key) {
        var result = attributes.filter(function (attribute) {
          return attribute.key === key;
        });

        return result && result.length > 0 ? result[0].value : null;
      };

      return {

        'getAttribute': function (attributes, key) {
          return getAttributeValue(attributes, key);
        },

        'getFullName': function (profile) {
          if (profile) {
            if (profile.attributes) {
              return getAttributeValue(profile.attributes, 'firstName') + ' ' + getAttributeValue(profile.attributes, 'lastName');
            }
            return profile.username;
          }
          return null;
        }
      };
    })

  .service('GraphicChartsConfigurations', function(){

    this.getClientConfig = function(){
      return true;
    };

    this.setClientConfig = function(){
      return true;
    };
  })

  .directive('fixedHeader', ['$timeout','$window', function ($timeout, $window) {
    return {
      restrict: 'A',
      scope: {
        tableMaxHeight: '@',
        trigger: '=fixedHeader'
      },
      link: function ($scope, $elem) {
        var elem = $elem[0];

        function isVisible(el) {
          var style = $window.getComputedStyle(el);
          return (style.display !== 'none' && el.offsetWidth !==0 );
        }

        function isTableReady() {
          return isVisible(elem.querySelector('tbody')) && elem.querySelector('tbody tr:first-child') !== null;
        }

        $scope.redraw = false;

        // wait for content to load into table and to have at least one row, tdElems could be empty at the time of execution if td are created asynchronously (eg ng-repeat with promise)
        function redrawTable() {
          if ($scope.redraw) {
            return;
          }
          // reset display styles so column widths are correct when measured below
          angular.element(elem.querySelectorAll('thead, tbody, tfoot')).css('display', '');

          // wrap in $timeout to give table a chance to finish rendering
          $timeout(function () {
            $scope.redraw = true;
            // set widths of columns
            var totalColumnWidth = 0;
            angular.forEach(elem.querySelectorAll('tr:first-child th'), function (thElem, i) {

              var tdElems = elem.querySelector('tbody tr:first-child td:nth-child(' + (i + 1) + ')');
              var tfElems = elem.querySelector('tfoot tr:first-child td:nth-child(' + (i + 1) + ')');
              var columnWidth = tdElems ? tdElems.offsetWidth : thElem.offsetWidth;

              if(tdElems) {
                tdElems.style.width = columnWidth + 'px';
              }
              if(thElem) {
                thElem.style.width = columnWidth + 'px';
              }
              if (tfElems) {
                tfElems.style.width = columnWidth + 'px';
              }
              totalColumnWidth = totalColumnWidth + columnWidth;
            });

            // set css styles on thead and tbody
            angular.element(elem.querySelectorAll('thead, tfoot')).css('display', 'block');

            angular.element(elem.querySelectorAll('tbody')).css({
              'display': 'block',
              'max-height': $scope.tableMaxHeight || 'inherit',
              'overflow': 'auto'
            });

            // add missing width to fill the table
            if (totalColumnWidth < elem.offsetWidth) {
              var last = elem.querySelector('tbody tr:first-child td:last-child');
              if (last) {
                last.style.width = (last.offsetWidth + elem.offsetWidth - totalColumnWidth) + 'px';
                last = elem.querySelector('thead tr:first-child th:last-child');
                last.style.width = (last.offsetWidth + elem.offsetWidth - totalColumnWidth) + 'px';
              }
            }

            // reduce width of last column by width of scrollbar
            var tbody = elem.querySelector('tbody');
            var scrollBarWidth = tbody.offsetWidth - tbody.clientWidth;
            if (scrollBarWidth > 0) {
              var lastColumn = elem.querySelector('tbody tr:first-child td:last-child');
              lastColumn.style.width = (parseInt(lastColumn.style.width.replace('px','')) - scrollBarWidth) + 'px';
            }
            $scope.redraw = false;
          });
        }

        // watch table content change
        $scope.$watchGroup(['trigger', isTableReady],
          function (newValue) {
            if (newValue[1] === true) {
               redrawTable();
            }
          }
        );

        // watch table resize
        $scope.$watch(function() {
          return elem.offsetWidth;
        }, function() {
          redrawTable();
        });
      }
    };
  }])

  .directive('routeChecker', ['$route', function ($route) {
    return {
      restrict: 'A',
      scope: {
        routeCheckerHidesParent: '='
      },
      link: function (scope, elem, attrs) {
        // remove the '#' character
        var routeToCheck = attrs.ngHref.substr(1, attrs.ngHref.length - 1);
        var found = Object.keys($route.routes).filter(function (route) {
          var regexp = $route.routes[route].regexp;
          return regexp ? regexp.test(routeToCheck) : false;
        }).pop();

        if (!found) {
          if (scope.routeCheckerHidesParent) {
            elem.parent().hide();
          } else {
            elem.hide();
          }
        }
      }
    };
  }])

  .factory('FormDirtyStateObserver', ['$uibModal', '$location',
    function ($uibModal, $location) {
      var onLocationChangeOff;

      return {
        observe: function(scope) {

          if (onLocationChangeOff) {
            onLocationChangeOff();
          }

          onLocationChangeOff = scope.$on('$locationChangeStart', function (event, newUrl) {
            if (scope.form.$dirty) {
              $uibModal.open({
                backdrop: 'static',
                controller: ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
                  $scope.ok = function () {
                    $uibModalInstance.close(true);
                  };
                  $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                  };
                }],
                templateUrl: 'utils/views/unsaved-modal.html'
              }).result.then(function (answer) {
                if (answer === true) {
                  onLocationChangeOff();
                  $location.path(angular.copy($location).url(newUrl).hash());
                }
              });

              event.preventDefault();
              return;
            }

            onLocationChangeOff();
          });
        },
        unobserve: function() {
          if(onLocationChangeOff) {
            onLocationChangeOff();
          }
        }
      };
  }])

  .service('SfOptionsService', ['$translate', '$q',
    function ($translate, $q) {
      var validationMessages = [
        'required',
        'errors.does-not-validate',
        'errors.localized.completed'
      ];

      this.transform = function () {
        var deferred = $q.defer();
        $translate(validationMessages).then(function(result){
          deferred.resolve(
            {
              validationMessage: {
                302: result.required,
                'default': result['errors.does-not-validate'],
                'completed': result['errors.localized.completed']
              }
            }
          );
        });

        return deferred.promise;
      };
    }])

  .config(['schemaFormProvider',
    function (schemaFormProvider) {
      schemaFormProvider.postProcess(function (form) {
        form.filter(function (e) {
          return e.hasOwnProperty('wordLimit');
        }).forEach(function (e) {
          e.$validators = {
            wordLimitError: function (value) {
              if (angular.isDefined(value) && value !== null) {
                var wordCount = (value.match(/\S+/g) || []).length;
                if (wordCount > parseInt(e.wordLimit)) {
                  return false;
                }
              }
              return true;
            }
          };
        });
        return form;
      });
    }]);
})();;/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>. 
 */

'use strict';

ngObibaMica.file = angular.module('obiba.mica.file', ['ngResource']);
;/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>. 
 */

'use strict';

ngObibaMica.file
  .filter('bytes', function () {
    return function (bytes) {
      return bytes === null || typeof bytes === 'undefined' ? '' : filesize(bytes);
    };
  });

;/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

ngObibaMica.file
  .factory('TempFileResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
      return $resource(ngObibaMicaUrl.getUrl('TempFileResource'), {}, {
        'get': {method: 'GET'},
        'delete': {method: 'DELETE'}
      });
    }])
;
;/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>. 
 */

'use strict';

ngObibaMica.attachment = angular.module('obiba.mica.attachment', [
  'obiba.mica.file',
  'ui',
  'ui.bootstrap',
  'ngFileUpload',
  'templates-ngObibaMica'
]);
;/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

ngObibaMica.attachment
  .directive('attachmentList', [function() {
    return {
      restrict: 'E',
      scope: {
        hrefBuilder: '=',
        files: '=',
        emptyMessage: '='
      },
      templateUrl: 'attachment/attachment-list-template.html',
      link: function(scope) {
        scope.attachments = [];
        scope.hrefBuilder = scope.hrefBuilder || function(a) { return a.id; };
        scope.hasAttachments = false;

        scope.$watch('files', function(val) {
          if (val) {
            scope.hasAttachments = val.length > 0;
            scope.attachments = val.map(function (a) {
              var temp = angular.copy(a);
              temp.href = scope.hrefBuilder(a);
              return temp;
            });
          }
        }, true);
      }
    };
  }])
  .directive('attachmentInput', [function () {
    return {
      restrict: 'E',
      require: '^form',
      scope: {
        multiple: '=',
        accept: '@',
        files: '=',
        disabled: '=',
        onError:'='
      },
      templateUrl: 'attachment/attachment-input-template.html',
      controller: 'AttachmentCtrl'
    };
  }])
  .controller('AttachmentCtrl', ['$scope', '$timeout', '$log', 'Upload', 'TempFileResource', 'ngObibaMicaUrl',
    function ($scope, $timeout, $log, Upload, TempFileResource, ngObibaMicaUrl) {
      var uploadFile = function (file) {
        $scope.files = $scope.files || [];

        var attachment = {
          showProgressBar: true,
          lang: 'en',
          progress: 0,
          fileName: file.name,
          size: file.size
        };

        if ($scope.multiple) {
          $scope.files.push(attachment);
        } else {
          $scope.files.splice(0, $scope.files.length);
          $scope.files.push(attachment);
        }

        $scope.upload = Upload
          .upload({
            url: ngObibaMicaUrl.getUrl('TempFileUploadResource'),
            method: 'POST',
            file: file
          })
          .progress(function (evt) {
            attachment.progress = parseInt(100.0 * evt.loaded / evt.total);
          })
          .success(function (data, status, getResponseHeaders) {
            var parts = getResponseHeaders().location.split('/');
            var fileId = parts[parts.length - 1];
            TempFileResource.get(
              {id: fileId},
              function (tempFile) {
                $log.debug('tempFile', tempFile);
                attachment.id = tempFile.id;
                attachment.md5 = tempFile.md5;
                attachment.justUploaded = true;
                attachment.timestamps = {created: new Date()};
                // wait for 1 second before hiding progress bar
                $timeout(function () { attachment.showProgressBar = false; }, 1000);
              }
            );
          })
          .error(function(response){
            $log.error('File upload failed: ', JSON.stringify(response, null, 2));
            var index = $scope.files.indexOf(attachment);
            if (index !== -1) {
              $scope.files.splice(index, 1);
            }

            if ($scope.onError){
              $scope.onError(attachment);
            }
        });
      };

      $scope.onFileSelect = function (file) {
        $scope.uploadedFiles = file;
        $scope.uploadedFiles.forEach(function (f) {
          uploadFile(f);
        });
      };

      $scope.deleteTempFile = function (tempFileId) {
        TempFileResource.delete(
          {id: tempFileId},
          function () {
            for (var i = $scope.files.length; i--;) {
              var attachment = $scope.files[i];
              if (attachment.justUploaded && attachment.id === tempFileId) {
                $scope.files.splice(i, 1);
              }
            }
          }
        );
      };

      $scope.deleteFile = function (fileId) {
        for (var i = $scope.files.length; i--;) {
          if ($scope.files[i].id === fileId) {
            $scope.files.splice(i, 1);
          }
        }
      };
    }
  ]);
;/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

ngObibaMica.access = angular.module('obiba.mica.access', [
    'pascalprecht.translate',
    'obiba.alert',
    'obiba.comments',
    'obiba.mica.attachment',
    'obiba.utils',
    'angularMoment',
    'templates-ngObibaMica'
  ]);

ngObibaMica.access
  .config(['$provide', function ($provide) {
    $provide.provider('ngObibaMicaAccessTemplateUrl', new ngObibaMica.NgObibaMicaTemplateUrlFactory().create(
      {
        list: {header: null, footer: null},
        view: {header: null, footer: null},
        form: {header: null, footer: null}
      }
    ));
  }]);
;/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

ngObibaMica.access
  .controller('DataAccessRequestListController', ['$rootScope',
    '$scope',
    '$uibModal',
    'DataAccessRequestsResource',
    'DataAccessRequestResource',
    'DataAccessRequestService',
    'NOTIFICATION_EVENTS',
    'SessionProxy',
    'USER_ROLES',
    'ngObibaMicaAccessTemplateUrl',
    'DataAccessRequestConfig',
    'ngObibaMicaUrl',
    '$translate',

    function ($rootScope,
              $scope,
              $uibModal,
              DataAccessRequestsResource,
              DataAccessRequestResource,
              DataAccessRequestService,
              NOTIFICATION_EVENTS,
              SessionProxy,
              USER_ROLES,
              ngObibaMicaAccessTemplateUrl,
              DataAccessRequestConfig,
              ngObibaMicaUrl,
              $translate) {

      var onSuccess = function(reqs) {
        for (var i = 0; i < reqs.length; i++) {
          var req = reqs[i];
          if (req.status !== 'OPENED') {
            for (var j = 0; j < req.statusChangeHistory.length; j++) {
              var change = req.statusChangeHistory[j];
              if (change.from === 'OPENED' && change.to === 'SUBMITTED') {
                req.submissionDate = change.changedOn;
              }
            }
          }
        }
        $scope.requests = reqs;
        $scope.loading = false;
      };

      var onError = function() {
        $scope.loading = false;
      };

      DataAccessRequestService.getStatusFilterData(function(translated) {
        $scope.REQUEST_STATUS  = translated;
      });

      $scope.headerTemplateUrl = ngObibaMicaAccessTemplateUrl.getHeaderUrl('list');
      $scope.footerTemplateUrl = ngObibaMicaAccessTemplateUrl.getFooterUrl('list');
      $scope.config = DataAccessRequestConfig.getOptions();
      $scope.searchStatus = {};
      $scope.loading = true;
      DataAccessRequestsResource.query({}, onSuccess, onError);
      $scope.actions = DataAccessRequestService.actions;
      $scope.showApplicant = SessionProxy.roles().filter(function(role) {
        return [USER_ROLES.dao, USER_ROLES.admin].indexOf(role) > -1;
      }).length > 0;

      $scope.deleteRequest = function (request) {
        $scope.requestToDelete = request.id;
        $rootScope.$broadcast(NOTIFICATION_EVENTS.showConfirmDialog,
          {
            titleKey: 'data-access-request.delete-dialog.title',
            messageKey:'data-access-request.delete-dialog.message',
            messageArgs: [request.title, request.applicant]
          }, request.id
        );
      };

      $scope.userProfile = function (profile) {
        $scope.applicant = profile;
        $uibModal.open({
          scope: $scope,
          templateUrl: 'access/views/data-access-request-profile-user-modal.html'
        });
      };

      var getAttributeValue = function(attributes, key) {
        var result = attributes.filter(function (attribute) {
          return attribute.key === key;
        });

        return result && result.length > 0 ? result[0].value : null;
      };

      $scope.getFullName = function (profile) {
        if (profile) {
          if (profile.attributes) {
            return getAttributeValue(profile.attributes, 'firstName') + ' ' + getAttributeValue(profile.attributes, 'lastName');
          }
          return profile.username;
        }
        return null;
      };

      $scope.getProfileEmail = function (profile) {
        if (profile) {
          if (profile.attributes) {
            return getAttributeValue(profile.attributes, 'email');
          }
        }
        return null;
      };

      $scope.getCsvExportHref = function () {
        return ngObibaMicaUrl.getUrl('DataAccessRequestsExportCsvResource').replace(':lang', $translate.use());
      };

      $scope.getDataAccessRequestPageUrl = function () {
        var DataAccessClientDetailPath = ngObibaMicaUrl.getUrl('DataAccessClientDetailPath');
        if(DataAccessClientDetailPath){
          return ngObibaMicaUrl.getUrl('BaseUrl') + ngObibaMicaUrl.getUrl('DataAccessClientDetailPath');
        }
        else{
          return null;
        }
      };

      $scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, function (event, id) {
        if ($scope.requestToDelete === id) {
          DataAccessRequestResource.delete({id: $scope.requestToDelete},
            function () {
              $scope.loading = true;
              DataAccessRequestsResource.query({}, onSuccess, onError);
            });

          delete $scope.requestToDelete;
        }
      });
    }])

  .controller('DataAccessRequestViewController',
    ['$rootScope',
      '$scope',
      '$location',
      '$uibModal',
      '$routeParams',
      '$filter',
      '$translate',
      'DataAccessRequestResource',
      'DataAccessRequestService',
      'DataAccessRequestStatusResource',
      'DataAccessFormConfigResource',
      'JsonUtils',
      'DataAccessRequestAttachmentsUpdateResource',
      'DataAccessRequestCommentsResource',
      'DataAccessRequestCommentResource',
      'ngObibaMicaUrl',
      'ngObibaMicaAccessTemplateUrl',
      'AlertService',
      'ServerErrorUtils',
      'NOTIFICATION_EVENTS',
      'DataAccessRequestConfig',
      'LocalizedSchemaFormService',
      'SfOptionsService',
      'moment',
      '$timeout',

    function ($rootScope,
              $scope,
              $location,
              $uibModal,
              $routeParams,
              $filter,
              $translate,
              DataAccessRequestResource,
              DataAccessRequestService,
              DataAccessRequestStatusResource,
              DataAccessFormConfigResource,
              JsonUtils,
              DataAccessRequestAttachmentsUpdateResource,
              DataAccessRequestCommentsResource,
              DataAccessRequestCommentResource,
              ngObibaMicaUrl,
              ngObibaMicaAccessTemplateUrl,
              AlertService,
              ServerErrorUtils,
              NOTIFICATION_EVENTS,
              DataAccessRequestConfig,
              LocalizedSchemaFormService,
              SfOptionsService,
              moment,
              $timeout) {

      var onError = function (response) {
        AlertService.alert({
          id: 'DataAccessRequestViewController',
          type: 'danger',
          msg: ServerErrorUtils.buildMessage(response)
        });
      };

      function onAttachmentError(attachment) {
        AlertService.alert({
          id: 'DataAccessRequestViewController',
          type: 'danger',
          msgKey: 'server.error.file.upload',
          msgArgs: [attachment.fileName]
        });
      }

      var retrieveComments = function() {
        $scope.form.comments = DataAccessRequestCommentsResource.query({id: $routeParams.id});
      };

      var selectTab = function(id) {
        $scope.selectedTab = id;
        switch (id) {
          case 'form':
            break;
          case 'comments':
            retrieveComments();
            break;
        }
      };

      var submitComment = function(comment) {
        DataAccessRequestCommentsResource.save({id: $routeParams.id}, comment.message, retrieveComments, onError);
      };

      var updateComment = function(comment) {
        DataAccessRequestCommentResource.update({id: $routeParams.id, commentId: comment.id}, comment.message, retrieveComments, onError);
      };

      var deleteComment = function(comment) {
        $scope.commentToDelete = comment.id;

        $rootScope.$broadcast(NOTIFICATION_EVENTS.showConfirmDialog,
          {
            titleKey: 'comment.delete-dialog.title',
            messageKey:'comment.delete-dialog.message',
            messageArgs: [comment.createdBy]
          }, comment.id
        );
      };

      var toggleAttachmentsForm = function(show) {
        if (show) {
          $scope.attachments = angular.copy($scope.dataAccessRequest.attachments) || [];
        }
        $scope.showAttachmentsForm = show;
      };

      var updateAttachments = function() {
        var request = angular.copy($scope.dataAccessRequest);
        request.attachments = $scope.attachments;
        DataAccessRequestAttachmentsUpdateResource.save(request, function() {
          toggleAttachmentsForm(false);
          $scope.dataAccessRequest = getRequest();
        });
      };

      function initializeForm() {
        SfOptionsService.transform().then(function(options) {
          $scope.sfOptions = options;
          $scope.sfOptions.pristine = {errors: true, success: false};
        });

        // Retrieve form data
        DataAccessFormConfigResource.get(
          function onSuccess(dataAccessForm) {
            $scope.form.definition = LocalizedSchemaFormService.translate(JsonUtils.parseJsonSafely(dataAccessForm.definition, []));
            $scope.form.schema = LocalizedSchemaFormService.translate(JsonUtils.parseJsonSafely(dataAccessForm.schema, {}));
            $scope.form.downloadTemplate = dataAccessForm.pdfDownloadType === 'Template';

            if ($scope.form.definition.length === 0) {
              $scope.validForm = false;
              $scope.form.definition = [];
              AlertService.alert({
                id: 'DataAccessRequestViewController',
                type: 'danger',
                msgKey: 'data-access-config.parse-error.definition'
              });
            }
            if (Object.getOwnPropertyNames($scope.form.schema).length === 0) {
              $scope.validForm = false;
              $scope.form.schema = {readonly: true};
              AlertService.alert({
                id: 'DataAccessRequestViewController',
                type: 'danger',
                msgKey: 'data-access-config.parse-error.schema'
              });
            }
            $scope.form.schema.readonly = true;

            $timeout(function () {
              $scope.form = angular.copy($scope.form);
              $scope.$broadcast('schemaFormRedraw');
            }, 250);
          },
          onError
        );
      }

      function findLastSubmittedDate() {
        var history = $scope.dataAccessRequest.statusChangeHistory || [];
        return history.filter(function(item) {
          return item.to === DataAccessRequestService.status.SUBMITTED;
        }).sort(function (a, b) {
          if (moment(a).isBefore(b)) {
            return -1;
          }

          if (moment(a).isSame(b)) {
            return 0;
          }

          if (moment(a).isAfter(b)) {
            return 1;
          }
        }).pop();
      }

      $scope.form = {
        schema: null,
        definition: null,
        model: {},
        comments: null
      };

      $scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, function (event, id) {
        if ($scope.commentToDelete === id) {
           DataAccessRequestCommentResource.delete({id: $routeParams.id, commentId: id}, {}, retrieveComments, onError);
        }
      });

      $scope.getDownloadHref = function(attachment) {
        return ngObibaMicaUrl.getUrl('DataAccessRequestAttachmentDownloadResource')
          .replace(':id', $scope.dataAccessRequest.id).replace(':attachmentId', attachment.id);
      };
      
      $scope.config = DataAccessRequestConfig.getOptions();
      $scope.actions = DataAccessRequestService.actions;
      $scope.nextStatus = DataAccessRequestService.nextStatus;
      $scope.selectTab = selectTab;
      $scope.submitComment = submitComment;
      $scope.updateComment = updateComment;
      $scope.deleteComment = deleteComment;
      $scope.showAttachmentsForm = false;
      $scope.updateAttachments = updateAttachments;
      $scope.cancelAttachments = function() {
        toggleAttachmentsForm(false);
      };
      $scope.editAttachments = function() {
        toggleAttachmentsForm(true);
      };
      $scope.onAttachmentError = onAttachmentError;
      $scope.headerTemplateUrl = ngObibaMicaAccessTemplateUrl.getHeaderUrl('view');
      $scope.footerTemplateUrl = ngObibaMicaAccessTemplateUrl.getFooterUrl('view');
      $scope.getStatusHistoryInfoId = DataAccessRequestService.getStatusHistoryInfoId;
      DataAccessRequestService.getStatusHistoryInfo(function(statusHistoryInfo) {
        $scope.getStatusHistoryInfo = statusHistoryInfo;
      });

      $scope.validForm = true;

      var getRequest = function () {
        return DataAccessRequestResource.get({id: $routeParams.id}, function onSuccess(request) {
          try {
            $scope.form.model = request.content ? JSON.parse(request.content) : {};
            var requestDownloadUrlPdf =  ngObibaMicaUrl.getUrl('DataAccessRequestDownloadPdfResource').replace(':id', $scope.dataAccessRequest.id);
            $scope.requestDownloadUrl = requestDownloadUrlPdf + ((requestDownloadUrlPdf.indexOf('?q=')!==-1)?'&':'?') +'lang=' + $translate.use();


            $scope.attachments = angular.copy(request.attachments) || [];
          } catch (e) {
            $scope.validForm = false;
            $scope.form.model = {};
            AlertService.alert({
              id: 'DataAccessRequestViewController',
              type: 'danger',
              msgKey: 'data-access-request.parse-error'
            });
          }

          initializeForm();

          request.attachments = request.attachments || [];

          $scope.lastSubmittedDate = findLastSubmittedDate();

          return request;
        });
      };

      $scope.dataAccessRequest = $routeParams.id ? getRequest() : {};

      $scope.delete = function () {
        $scope.requestToDelete = $scope.dataAccessRequest.id;
        $rootScope.$broadcast(NOTIFICATION_EVENTS.showConfirmDialog,
          {
            titleKey: 'data-access-request.delete-dialog.title',
            messageKey:'data-access-request.delete-dialog.message',
            messageArgs: [$scope.dataAccessRequest.title, $scope.dataAccessRequest.applicant]
          }, $scope.requestToDelete
        );
      };

      $scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, function (event, id) {
        if ($scope.requestToDelete === id) {
          DataAccessRequestResource.delete({id: $scope.requestToDelete},
            function () {
              $location.path('/data-access-requests').replace();
            });

          delete $scope.requestToDelete;
        }
      });

      var onUpdatStatusSuccess = function () {
        $scope.dataAccessRequest = getRequest();
      };

      var confirmStatusChange = function(status, messageKey, statusName) {
        $rootScope.$broadcast(
          NOTIFICATION_EVENTS.showConfirmDialog,
          {
            titleKey: 'data-access-request.status-change-confirmation.title',
            messageKey: messageKey !== null ? messageKey : 'data-access-request.status-change-confirmation.message',
            messageArgs: statusName !== null ? [$filter('translate')(statusName).toLowerCase()] : []
          }, status);
      };

      var statusChangedConfirmed = function(status, expectedStatus) {
        if (status === expectedStatus) {
          DataAccessRequestStatusResource.update({
            id: $scope.dataAccessRequest.id,
            status: status
          }, onUpdatStatusSuccess, onError);
        }
      };

      var printForm = function() {
        // let angular digest!
        setTimeout(function(){ window.print(); }, 250);
      };

      $scope.submit = function () {
        $scope.$broadcast('schemaFormValidate');
        if ($scope.forms.requestForm.$valid) {
          DataAccessRequestStatusResource.update({
            id: $scope.dataAccessRequest.id,
            status: DataAccessRequestService.status.SUBMITTED
          }, function onSubmitted() {
            onUpdatStatusSuccess();
            $uibModal.open({
              scope: $scope,
              templateUrl:'access/views/data-access-request-submitted-modal.html'
            });
          }, onError);
        } else {
          AlertService.alert({
            id: 'DataAccessRequestViewController',
            type: 'danger',
            msgKey: 'data-access-request.submit.invalid'
          });
        }
      };

      $scope.reopen = function () {
        confirmStatusChange(DataAccessRequestService.status.OPENED, null, 'reopen');
      };
      $scope.review = function () {
        confirmStatusChange(DataAccessRequestService.status.REVIEWED, 'data-access-request.status-change-confirmation.message-review', null);
      };
      $scope.approve = function () {
        confirmStatusChange(DataAccessRequestService.status.APPROVED, null, 'approve');
      };
      $scope.reject = function () {
        confirmStatusChange(DataAccessRequestService.status.REJECTED, null, 'reject');
      };
      $scope.conditionallyApprove = function () {
        confirmStatusChange(DataAccessRequestService.status.CONDITIONALLY_APPROVED, null, 'conditionallyApprove');
      };

      $scope.userProfile = function (profile) {
        $scope.applicant = profile;
        $uibModal.open({
          scope: $scope,
          templateUrl: 'access/views/data-access-request-profile-user-modal.html'
        });
      };

      $scope.getDataAccessListPageUrl = DataAccessRequestService.getListDataAccessRequestPageUrl();

      var getAttributeValue = function(attributes, key) {
        var result = attributes.filter(function (attribute) {
          return attribute.key === key;
        });

        return result && result.length > 0 ? result[0].value : null;
      };

      $scope.printForm = printForm;

      $scope.getFullName = function (profile) {
        if (profile) {
          if (profile.attributes) {
            return getAttributeValue(profile.attributes, 'firstName') + ' ' + getAttributeValue(profile.attributes, 'lastName');
          }
          return profile.username;
        }
        return null;
      };

      $scope.getProfileEmail = function (profile) {
        if (profile) {
          if (profile.attributes) {
            return getAttributeValue(profile.attributes, 'email');
          }
        }
        return null;
      };

      $scope.$on(
        NOTIFICATION_EVENTS.confirmDialogAccepted,
        function(event, status) {
          statusChangedConfirmed(DataAccessRequestService.status.OPENED, status);
        }
      );
      $scope.$on(
        NOTIFICATION_EVENTS.confirmDialogAccepted,
        function(event, status) {
          statusChangedConfirmed(DataAccessRequestService.status.REVIEWED, status);
        }
      );
      $scope.$on(
        NOTIFICATION_EVENTS.confirmDialogAccepted,
        function(event, status) {
          statusChangedConfirmed(DataAccessRequestService.status.CONDITIONALLY_APPROVED, status);
        }
      );
      $scope.$on(
        NOTIFICATION_EVENTS.confirmDialogAccepted,
        function(event, status) {
          statusChangedConfirmed(DataAccessRequestService.status.APPROVED, status);
        }
      );
      $scope.$on(
        NOTIFICATION_EVENTS.confirmDialogAccepted,
        function(event, status) {
          statusChangedConfirmed(DataAccessRequestService.status.REJECTED, status);
        }
      );

      $rootScope.$on('$translateChangeSuccess', function () {
        initializeForm();
      });

      $scope.forms = {};
    }])

  .controller('DataAccessRequestEditController', ['$rootScope',
    '$log',
    '$scope',
    '$routeParams',
    '$location',
    '$uibModal', 'LocalizedSchemaFormService',
    'DataAccessRequestsResource',
    'DataAccessRequestResource',
    'DataAccessFormConfigResource',
    'JsonUtils',
    'AlertService',
    'ServerErrorUtils',
    'SessionProxy',
    'DataAccessRequestService',
    'ngObibaMicaAccessTemplateUrl',
    'DataAccessRequestConfig',
    'SfOptionsService',
    'FormDirtyStateObserver',
    'DataAccessRequestDirtyStateService',
    '$timeout',

    function ($rootScope,
              $log,
              $scope,
              $routeParams,
              $location,
              $uibModal,
              LocalizedSchemaFormService,
              DataAccessRequestsResource,
              DataAccessRequestResource,
              DataAccessFormConfigResource,
              JsonUtils,
              AlertService,
              ServerErrorUtils,
              SessionProxy,
              DataAccessRequestService,
              ngObibaMicaAccessTemplateUrl,
              DataAccessRequestConfig,
              SfOptionsService,
              FormDirtyStateObserver,
              DataAccessRequestDirtyStateService,
              $timeout) {

      var onSuccess = function(response, getResponseHeaders) {
        FormDirtyStateObserver.unobserve();
        var parts = getResponseHeaders().location.split('/');
        $location.path('/data-access-request/' + parts[parts.length - 1]).replace();
      };

      var onError = function(response) {
        AlertService.alert({
          id: 'DataAccessRequestEditController',
          type: 'danger',
          msg: ServerErrorUtils.buildMessage(response)
        });
      };

      function onAttachmentError(attachment) {
        AlertService.alert({
          id: 'DataAccessRequestEditController',
          type: 'danger',
          msgKey: 'server.error.file.upload',
          msgArgs: [attachment.fileName]
        });
      }

      $scope.getDataAccessListPageUrl = DataAccessRequestService.getListDataAccessRequestPageUrl();

      var validate = function(form) {
        $scope.$broadcast('schemaFormValidate');
        $uibModal.open({
          resolve: {
            isValid: form.$valid
          },
          templateUrl: 'access/views/data-access-request-validation-modal.html',
          controller: ['$scope', 'isValid', function ($scope, isValid) {
            $scope.isValid = isValid;
          }]
        });
      };

      var cancel = function() {
        $location.path('/data-access-request' + ($routeParams.id ? '/' + $routeParams.id : 's')).replace();
      };

      var save = function() {
        $scope.dataAccessRequest.content = angular.toJson($scope.sfForm.model);

        if ($scope.newRequest) {
          DataAccessRequestsResource.save($scope.dataAccessRequest, onSuccess, onError);
        } else {
          DataAccessRequestResource.save($scope.dataAccessRequest, function() {
            FormDirtyStateObserver.unobserve();
            $location.path('/data-access-request' + ($scope.dataAccessRequest.id ? '/' + $scope.dataAccessRequest.id : 's')).replace();
          }, onError);
        }
      };

      function initializeForm() {
        // Retrieve form data

        SfOptionsService.transform().then(function(options) {
          $scope.sfOptions = options;
          $scope.sfOptions.onError = onAttachmentError;
        });

        DataAccessFormConfigResource.get(
          function onSuccess(dataAccessForm) {
            $scope.sfForm.definition = LocalizedSchemaFormService.translate(JsonUtils.parseJsonSafely(dataAccessForm.definition, []));
            $scope.sfForm.schema = LocalizedSchemaFormService.translate(JsonUtils.parseJsonSafely(dataAccessForm.schema, {}));
            if ($scope.sfForm.definition.length === 0) {
              $scope.sfForm.definition = [];
              $scope.validForm = false;
              AlertService.alert({
                id: 'DataAccessRequestEditController',
                type: 'danger',
                msgKey: 'data-access-config.parse-error.definition'
              });
            }
            if (Object.getOwnPropertyNames($scope.sfForm.schema).length === 0) {
              $scope.sfForm.schema = {};
              $scope.validForm = false;
              AlertService.alert({
                id: 'DataAccessRequestEditController',
                type: 'danger',
                msgKey: 'data-access-config.parse-error.schema'
              });
            }

            if ($scope.validForm) {
              $scope.dataAccessRequest = $routeParams.id ?
                DataAccessRequestResource.get({id: $routeParams.id}, function onSuccess(request) {
                  try {
                    $scope.sfForm.model = request.content ? JSON.parse(request.content) : {};
                  } catch (e) {
                    $scope.sfForm.model = {};
                    AlertService.alert({
                      id: 'DataAccessRequestEditController',
                      type: 'danger',
                      msgKey: 'data-access-request.parse-error'
                    });
                  }

                  $scope.canEdit = DataAccessRequestService.actions.canEdit(request);
                  $scope.sfForm.schema.readonly = !$scope.canEdit;
                  $scope.$broadcast('schemaFormRedraw');

                  request.attachments = request.attachments || [];
                  return request;
                }) : {
                  applicant: SessionProxy.login(),
                  status: DataAccessRequestService.status.OPENED,
                  attachments: []
                };
            }

            $timeout(function () {
              $scope.sfForm = angular.copy($scope.sfForm);
              $scope.loaded = true;
            }, 250);
          },
          onError
        );
      }

      $rootScope.$on('$translateChangeSuccess', function () {
        initializeForm();
      });

      initializeForm();

      $scope.loaded = false;
      $scope.config = DataAccessRequestConfig.getOptions();
      $scope.validForm = true;
      $scope.requestId = $routeParams.id;
      $scope.newRequest = $routeParams.id ? false : true;
      $scope.cancel = cancel;
      $scope.save = save;
      $scope.editable = true;
      $scope.validate = validate;
      $scope.headerTemplateUrl = ngObibaMicaAccessTemplateUrl.getHeaderUrl('form');
      $scope.footerTemplateUrl = ngObibaMicaAccessTemplateUrl.getFooterUrl('form');
      $scope.sfForm = {
        schema: null,
        definition: null,
        model: {}
      };

      FormDirtyStateObserver.observe($scope);

      DataAccessRequestDirtyStateService.setForm($scope.form);
      $scope.$on('$destroy', function () {
        DataAccessRequestDirtyStateService.setForm(null);
      });

    }]);
;/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>. 
 */

'use strict';

ngObibaMica.access
  .config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider
        .when('/data-access-requests', {
          templateUrl: 'access/views/data-access-request-list.html',
          controller: 'DataAccessRequestListController'
        })
        .when('/data-access-request/new', {
          templateUrl: 'access/views/data-access-request-form.html',
          controller: 'DataAccessRequestEditController'
        })
        .when('/data-access-request/:id/edit', {
          templateUrl: 'access/views/data-access-request-form.html',
          controller: 'DataAccessRequestEditController'
        })
        .when('/data-access-request/:id', {
          templateUrl: 'access/views/data-access-request-view.html',
          controller: 'DataAccessRequestViewController'
        });
    }]);
;/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

ngObibaMica.access
  .factory('DataAccessFormConfigResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
      return $resource(ngObibaMicaUrl.getUrl('DataAccessFormConfigResource'), {}, {
        'get': {method: 'GET', errorHandler: true}
      });
    }])

  .factory('DataAccessRequestsResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
      return $resource(ngObibaMicaUrl.getUrl('DataAccessRequestsResource'), {}, {
        'save': {method: 'POST', errorHandler: true},
        'get': {method: 'GET'}
      });
    }])

  .factory('DataAccessRequestsExportCsvResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
      return $resource(ngObibaMicaUrl.getUrl('DataAccessRequestsExportCsvResource'), {}, {
        'get': {method: 'GET'}
      });
    }])

  .factory('DataAccessRequestResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
      return $resource(ngObibaMicaUrl.getUrl('DataAccessRequestResource'), {}, {
        'save': {method: 'PUT', params: {id: '@id'}, errorHandler: true},
        'get': {method: 'GET'},
        'delete': {method: 'DELETE'}
      });
    }])

  .factory('DataAccessRequestAttachmentsUpdateResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
      return $resource(ngObibaMicaUrl.getUrl('DataAccessRequestAttachmentsUpdateResource'), {}, {
        'save': {method: 'PUT', params: {id: '@id'}, errorHandler: true}
      });
    }])

    .factory('DataAccessRequestCommentsResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
      return $resource(ngObibaMicaUrl.getUrl('DataAccessRequestCommentsResource'), {}, {
        'save': {
          method: 'POST',
          params: {id: '@id'},
          headers: {'Content-Type': 'text/plain'},
          errorHandler: true
        },
        'get': {method: 'GET', params: {id: '@id'}, errorHandler: true}
      });
    }])

  .factory('DataAccessRequestCommentResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
      return $resource(ngObibaMicaUrl.getUrl('DataAccessRequestCommentResource'), {}, {
        'delete': {
          method: 'DELETE',
          params: {id: '@id', commentId: '@commentId'},
          errorHandler: true
        },
        'update': {
          method: 'PUT',
          params: {id: '@id', commentId: '@commentId'},
          headers: {'Content-Type': 'text/plain'},
          errorHandler: true
        }
      });
    }])

  .factory('DataAccessRequestStatusResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
      return $resource(ngObibaMicaUrl.getUrl('DataAccessRequestStatusResource'), {}, {
        'update': {
          method: 'PUT',
          params: {id: '@id', status: '@status'},
          errorHandler: true
        }
      });
    }])

  .service('DataAccessRequestConfig', function () {
    var options = {
      newRequestButtonCaption: null,
      documentsSectionTitle: null,
      documentsSectionHelpText: null,
      downloadButtonCaption: null,
      commentsEnabled: true,
      userListPageTitle: null,
      newRequestButtonHelpText: null
    };

    this.setOptions = function (newOptions) {
      if (typeof(newOptions) === 'object') {
        Object.keys(newOptions).forEach(function (option) {
          if (option in options) {
            options[option] = newOptions[option];
          }
        });
      }
    };

    this.getOptions = function () {
      return angular.copy(options);
    };

  })

  .service('DataAccessRequestDirtyStateService', [
    function() {
      var form = null;

      this.setForm = function (f) {
        form = f;
      };

      this.isDirty = function () {
        return form && form.$dirty;
      };
    }])

  .service('DataAccessRequestService', ['$translate', 'SessionProxy', 'USER_ROLES', 'ngObibaMicaUrl',
    function ($translate, SessionProxy, USER_ROLES, ngObibaMicaUrl) {
      var statusList = {
        OPENED: 'OPENED',
        SUBMITTED: 'SUBMITTED',
        REVIEWED: 'REVIEWED',
        CONDITIONALLY_APPROVED: 'CONDITIONALLY_APPROVED',
        APPROVED: 'APPROVED',
        REJECTED: 'REJECTED'
      };

      this.status = statusList;

      this.getStatusFilterData = function (userCallback) {
        if (userCallback) {
          $translate(Object.keys(statusList)).then(function (translation) {
            userCallback(Object.keys(translation).map(function (key) {
              return {key: key, translation: translation[key]};
            }));
          });
        }
      };

      var canDoAction = function (request, action) {
        return request.actions ? request.actions.indexOf(action) !== - 1 : null;
      };

      this.actions = {
        canViewProfile: function (role) {
          var found = false;
          var currentUserRoles = SessionProxy.roles();
          angular.forEach(currentUserRoles, function (value) {
            if (value === role || value === USER_ROLES.admin) {
              found = true;
            }
          });
          return found;
        },
        canView: function (request) {
          return canDoAction(request, 'VIEW');
        },

        canEdit: function (request) {
          return canDoAction(request, 'EDIT');
        },

        canEditStatus: function (request) {
          return canDoAction(request, 'EDIT_STATUS');
        },

        canDelete: function (request) {
          return canDoAction(request, 'DELETE');
        },

        canEditAttachments: function (request) {
          return canDoAction(request, 'EDIT_ATTACHMENTS');
        }
      };

      var canChangeStatus = function (request, to) {
        return request.nextStatus ? request.nextStatus.indexOf(to) !== - 1 : null;
      };

      this.nextStatus = {
        canSubmit: function (request) {
          return canChangeStatus(request, 'SUBMITTED');
        },

        canReopen: function (request) {
          return canChangeStatus(request, 'OPENED');
        },

        canReview: function (request) {
          return canChangeStatus(request, 'REVIEWED');
        },

        canConditionallyApprove: function (request) {
          return canChangeStatus(request, 'CONDITIONALLY_APPROVED');
        },

        canApprove: function (request) {
          return canChangeStatus(request, 'APPROVED');
        },

        canReject: function (request) {
          return canChangeStatus(request, 'REJECTED');
        }

      };

      this.getStatusHistoryInfo = function (userCallback) {
        if (! userCallback) {
          return;
        }

        var keyIdMap = {
          'data-access-request.histories.opened': 'opened',
          'data-access-request.histories.reopened': 'reopened',
          'data-access-request.histories.submitted': 'submitted',
          'data-access-request.histories.reviewed': 'reviewed',
          'data-access-request.histories.conditionallyApproved': 'conditionallyApproved',
          'data-access-request.histories.approved': 'approved',
          'data-access-request.histories.rejected': 'rejected'
        };

        var statusHistoryInfo = {
          opened: {
            id: 'opened',
            icon: 'glyphicon glyphicon-saved',
          },
          reopened: {
            id: 'reopened',
            icon: 'glyphicon glyphicon-repeat',
          },
          submitted: {
            id: 'submitted',
            icon: 'glyphicon glyphicon-export',
          },
          reviewed: {
            id: 'reviewed',
            icon: 'glyphicon glyphicon-check',
          },
          conditionallyApproved: {
            id: 'conditionallyApproved',
            icon: 'glyphicon glyphicon-unchecked',
          },
          approved: {
            id: 'approved',
            icon: 'glyphicon glyphicon-ok',
          },
          rejected: {
            id: 'rejected',
            icon: 'glyphicon glyphicon-remove',
          }
        };

        $translate(Object.keys(keyIdMap))
          .then(
            function (translation) {
              Object.keys(translation).forEach(
                function (key) {
                  statusHistoryInfo[keyIdMap[key]].msg = translation[key];
                });

              userCallback(statusHistoryInfo);
            });
      };

      this.getStatusHistoryInfoId = function (status) {
        var id = 'opened';

        if (status.from !== 'OPENED' || status.from !== status.to) {
          switch (status.to) {
            case 'OPENED':
              id = 'reopened';
              break;
            case 'SUBMITTED':
              id = 'submitted';
              break;
            case 'REVIEWED':
              id = 'reviewed';
              break;
            case 'CONDITIONALLY_APPROVED':
              id = 'conditionallyApproved';
              break;
            case 'APPROVED':
              id = 'approved';
              break;
            case 'REJECTED':
              id = 'rejected';
              break;
          }
        }

        return id;
      };

      this.getListDataAccessRequestPageUrl = function () {
        var DataAccessClientListPath = ngObibaMicaUrl.getUrl('DataAccessClientListPath');
        if(DataAccessClientListPath){
          return ngObibaMicaUrl.getUrl('BaseUrl') + ngObibaMicaUrl.getUrl('DataAccessClientListPath');
        }
        else{
          return null;
        }
      };

      return this;
    }])

  .filter('filterProfileAttributes', function () {
    return function (attributes) {
      var exclude = ['email', 'firstName', 'lastName', 'createdDate', 'lastLogin', 'username'];
      return attributes.filter(function (attribute) {
        return exclude.indexOf(attribute.key) === - 1;
      });
    };
  })

  .filter('capitalizeFirstLetter', ['StringUtils', function(StringUtils){
    return function(text) {
      return StringUtils.capitaliseFirstLetter(text);
    };
  }]);
;/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>. 
 */

'use strict';

ngObibaMica.access
  .directive('printFriendlyView', [function(){
    return {
      restrict: 'EA',
      replace: true,
      scope: false,
      templateUrl: 'access/views/data-access-request-print-preview.html'
    };
  }]);;/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/* global QUERY_TARGETS */

'use strict';

/* exported DISPLAY_TYPES */
var DISPLAY_TYPES = {
  LIST: 'list',
  COVERAGE: 'coverage',
  GRAPHICS: 'graphics'
};

ngObibaMica.search = angular.module('obiba.mica.search', [
    'obiba.alert',
    'ui.bootstrap',
    'pascalprecht.translate',
    'templates-ngObibaMica'
  ]);

ngObibaMica.search.FIELDS_TO_FILTER = ['name', 'title', 'description', 'keywords'];

/**
 * Defines the default search options, clients such as Drupal override these options.
 * @constructor
 */
ngObibaMica.search.NgObibaMicaSearchOptionsWrapper = function() {
  var options = {
    searchLayout: 'layout2',
    taxonomyPanelOptions: {
      network: {
        taxonomies: {'Mica_network': {trKey: 'properties'}}
      },
      study: {
        taxonomies: {'Mica_study': {trKey: 'properties'}}
      },
      dataset: {
        taxonomies: {'Mica_dataset': {trKey: 'properties'}}
      },
      variable : {
        taxonomies: {
          'Mlstr_area': {weight: 0},
          'Scales': {weight: 1},
          'Mlstr_additional': {weight: 2},
          'Mica_variable': {trKey: 'properties', weight: 3}
        }
      },
      fieldsToFilter : ngObibaMica.search.FIELDS_TO_FILTER
    },
    obibaListOptions: {
      countCaption: true,
      searchForm: true,
      supplInfoDetails: true,
      trimmedDescription: true
    },
    targetTabsOrder: [QUERY_TARGETS.VARIABLE, QUERY_TARGETS.DATASET, QUERY_TARGETS.STUDY, QUERY_TARGETS.NETWORK],
    searchTabsOrder: [DISPLAY_TYPES.LIST, DISPLAY_TYPES.COVERAGE, DISPLAY_TYPES.GRAPHICS],
    resultTabsOrder: [QUERY_TARGETS.VARIABLE, QUERY_TARGETS.DATASET, QUERY_TARGETS.STUDY, QUERY_TARGETS.NETWORK],
    showAllFacetedTaxonomies: true,
    showFacetTermsWithZeroCount: false,
    showSearchBox: true,
    showSearchBrowser: true,
    showSearchRefreshButton: false,
    variableTaxonomiesOrder: [],
    studyTaxonomiesOrder: [],
    datasetTaxonomiesOrder: [],
    networkTaxonomiesOrder: [],
    hideNavigate: [],
    hideSearch: ['studyId', 'dceId', 'datasetId', 'networkId'],
    variables: {
      showSearchTab: true,
      listPageSize: 20,
      variablesColumn: {
        showVariablesTypeColumn: true,
        showVariablesStudiesColumn: true,
        showVariablesDatasetsColumn: true,
        showDatasetsStudiesColumn: true,
        showDatasetsVariablesColumn: true
      }
    },
    datasets: {
      showSearchTab: true,
      listPageSize: 20,
      showDatasetsSearchFilter: true,
      datasetsColumn: {
        showDatasetsAcronymColumn: true,
        showDatasetsTypeColumn: true,
        showDatasetsNetworkColumn: true,
        showDatasetsStudiesColumn: true,
        showDatasetsVariablesColumn: true
      },
      fields: [
        'acronym.*',
        'name.*',
        'variableType',
        'studyTable.studyId',
        'studyTable.project',
        'studyTable.table',
        'studyTable.populationId',
        'studyTable.dataCollectionEventId',
        'harmonizationTable.studyId',
        'harmonizationTable.project',
        'harmonizationTable.table',
        'harmonizationTable.populationId'
      ]
    },
    studies: {
      showSearchTab: true,
      listPageSize: 20,
      showStudiesSearchFilter: true,
      studiesColumn: {
        showStudiesTypeColumn: true,
        showStudiesDesignColumn: true,
        showStudiesQuestionnaireColumn: true,
        showStudiesPmColumn: true,
        showStudiesBioColumn: true,
        showStudiesOtherColumn: true,
        showStudiesParticipantsColumn: true,
        showStudiesNetworksColumn: true,
        showStudiesStudyDatasetsColumn: true,
        showStudiesHarmonizationDatasetsColumn: true,
        showStudiesVariablesColumn: false,
        showStudiesStudyVariablesColumn: true,
        showStudiesDataschemaVariablesColumn: true
      },
      fields: [
        'acronym.*',
        'name.*',
        'model.methods.design',
        'populations.dataCollectionEvents.model.dataSources',
        'model.numberOfParticipants.participant'
      ]
    },
    networks: {
      showSearchTab: true,
      listPageSize: 20,
      networksColumn: {
        showNetworksStudiesColumn: true,
        showNetworksStudyDatasetColumn: true,
        showNetworksHarmonizationDatasetColumn: true,
        showNetworksVariablesColumn: false,
        showNetworksStudyVariablesColumn: true,
        showNetworksDataschemaVariablesColumn: true
      },
      fields: [
        'acronym.*',
        'name.*',
        'studyIds'
      ]
    },
    coverage: {
      groupBy: {
        study: true,
        dce: true,
        dataset: true
      }
    }
  };

  function sanitizeFieldsToFilter(valueFieldsToFilter){
    if (valueFieldsToFilter) {
      return valueFieldsToFilter.filter(function(valueField) {
        return ngObibaMica.search.FIELDS_TO_FILTER.indexOf(valueField) > -1;
      });
    }
    return null;
  }

  function normalizeOptions() {

    function removeItemByValue(array, value) {
      var index = array.indexOf(value);
      if (index > -1) {
        array.splice(index, 1);
      }
      return array;
    }

    options.coverage.groupBy.dce = options.coverage.groupBy.study && options.coverage.groupBy.dce;
    var canShowCoverage = Object.keys(options.coverage.groupBy).filter(function(canShow) {
      return options.coverage.groupBy[canShow];
    }).length > 0;

    if (!canShowCoverage) {
      removeItemByValue(options.searchTabsOrder, DISPLAY_TYPES.COVERAGE);
    }

    if (!options.networks.showSearchTab) {
      removeItemByValue(options.targetTabsOrder, QUERY_TARGETS.NETWORK);
      removeItemByValue(options.resultTabsOrder, QUERY_TARGETS.NETWORK);
    }

    if (!options.studies.showSearchTab) {
      removeItemByValue(options.searchTabsOrder, DISPLAY_TYPES.GRAPHICS);
      removeItemByValue(options.targetTabsOrder, QUERY_TARGETS.STUDY);
      removeItemByValue(options.resultTabsOrder, QUERY_TARGETS.STUDY);
    }
  }

  function setOptions(value) {
    options = angular.merge(options, value);
    //NOTICE: angular.merge merges arrays by position. Overriding manually.
    options.targetTabsOrder = value.targetTabsOrder || options.targetTabsOrder;
    options.searchTabsOrder = value.searchTabsOrder || options.searchTabsOrder;
    options.resultTabsOrder = value.resultTabsOrder || options.resultTabsOrder;
    options.variableTaxonomiesOrder = value.variableTaxonomiesOrder || options.variableTaxonomiesOrder;
    options.studyTaxonomiesOrder = value.studyTaxonomiesOrder || options.studyTaxonomiesOrder;
    options.datasetTaxonomiesOrder = value.datasetTaxonomiesOrder || options.datasetTaxonomiesOrder;
    options.networkTaxonomiesOrder = value.networkTaxonomiesOrder || options.networkTaxonomiesOrder;
    options.hideNavigate = value.hideNavigate || options.hideNavigate;
    options.hideSearch = value.hideSearch || options.hideSearch;
    //TODO: Needs a better mechanism for setting options
    options.studies.fields = value.studies && value.studies.fields || options.studies.fields;
    options.networks.fields = value.networks && value.networks.fields || options.networks.fields;
    options.datasets.fields = value.datasets && value.datasets.fields || options.datasets.fields;
    if(value.taxonomyPanelOptions){
      options.taxonomyPanelOptions.fieldsToFilter = sanitizeFieldsToFilter(value.taxonomyPanelOptions.fieldsToFilter) || options.taxonomyPanelOptions.fieldsToFilter;
    }
    if(value.studies && value.studies.obibaListOptions){
      options.obibaListOptions.countCaption = value.studies.obibaListOptions.studiesCountCaption === 0  ? value.studies.obibaListOptions.studiesCountCaption : true;
      options.obibaListOptions.searchForm = value.studies.obibaListOptions.studiesSearchForm === 0 ? value.studies.obibaListOptions.studiesSearchForm : true;
      options.obibaListOptions.supplInfoDetails = value.studies.obibaListOptions.studiesSupplInfoDetails === 0 ? value.studies.obibaListOptions.studiesSupplInfoDetails : true;
      options.obibaListOptions.trimmedDescription = value.studies.obibaListOptions.studiesTrimmedDescription === 0 ? value.studies.obibaListOptions.studiesTrimmedDescription : true;
      options.searchLayout = value.searchLayout ? value.searchLayout : options.searchLayout;
    }
    normalizeOptions();
  }

  function getOptions() {
    return angular.copy(options);
  }

  this.setOptions = setOptions;
  this.getOptions = getOptions;
};

/**
 * The Options service class.
 *
 * @param $q
 * @param $translate
 * @param optionsWrapper
 * @param ObibaServerConfigResource
 * @returns {{getLocale: getLocale, getOptionsAsyn: getOptionsAsyn, getOptions: getOptions, getDefaultListPageSize: getDefaultListPageSize}}
 * @constructor
 */
ngObibaMica.search.ObibaMicaSearchOptionsService = function($q, $translate, optionsWrapper, ObibaServerConfigResource) {

  var deferred = $q.defer();
  var resolved = false;
  
  /**
   * Resolves the option by retrieving the server config and overriding the corresponding options.
   * @returns {*}
   */
  function resolveOptions() {

    if (resolved) {
      // in case the getOptionsAsyn() is already called.
      return $q.when(optionsWrapper.getOptions());
    } else {
      ObibaServerConfigResource.get(function (micaConfig) {
        var hasMultipleNetworks = micaConfig.isNetworkEnabled && !micaConfig.isSingleNetworkEnabled;
        var hasMultipleStudies =  !micaConfig.isSingleStudyEnabled || micaConfig.isHarmonizedDatasetEnabled;
        var hasMultipleDatasets = micaConfig.isCollectedDatasetEnabled || micaConfig.isHarmonizedDatasetEnabled;
        var updatedOptions = {
          searchLayout: micaConfig.searchLayout,
          locale: micaConfig.languages || $translate.use(),
          showSearchRefreshButton: true,
          networks: {
            showSearchTab: hasMultipleNetworks
          },
          studies: {
            showSearchTab: hasMultipleStudies,
            studiesColumn: {
              showStudiesTypeColumn: micaConfig.isCollectedDatasetEnabled && micaConfig.isHarmonizedDatasetEnabled,
              showStudiesNetworksColumn: hasMultipleNetworks,
              showStudiesVariablesColumn: hasMultipleDatasets,
              showStudiesStudyDatasetsColumn: hasMultipleDatasets && micaConfig.isCollectedDatasetEnabled,
              showStudiesStudyVariablesColumn: hasMultipleDatasets && micaConfig.isCollectedDatasetEnabled,
              showStudiesHarmonizationDatasetsColumn: hasMultipleDatasets && micaConfig.isHarmonizedDatasetEnabled,
              showStudiesDataschemaVariablesColumn: hasMultipleDatasets && micaConfig.isHarmonizedDatasetEnabled
            }
          },
          datasets: {
            showSearchTab: hasMultipleDatasets,
            datasetsColumn: {
              showDatasetsTypeColumn: micaConfig.isCollectedDatasetEnabled && micaConfig.isHarmonizedDatasetEnabled,
              showDatasetsNetworkColumn: hasMultipleNetworks,
              showDatasetsStudiesColumn: hasMultipleStudies
            }
          },
          variables: {
            showSearchTab: hasMultipleDatasets,
            variablesColumn: {
              showVariablesTypeColumn: micaConfig.isCollectedDatasetEnabled && micaConfig.isHarmonizedDatasetEnabled,
              showVariablesStudiesColumn: hasMultipleStudies
            }
          }
        };
        optionsWrapper.setOptions(updatedOptions);
        deferred.resolve(optionsWrapper.getOptions());
        resolved = true;
      });

      return deferred.promise;
    }
  }

  return {

    /**
     * This is the actual method to be called as it will override the defaults by server settings such as single Study
     * or Network configs.
     * @returns A promise that the client can use to retrieve the resolved options.
     */
    getOptionsAsyn: function() {
      return resolveOptions();
    },

    /**
     * Returns the options and if getOptionsAsyn() has never been called, the default options will be returned.
     * @returns {*}
     */
    getOptions: function() {
      return optionsWrapper.getOptions();
    },

    getDefaultListPageSize: function(target) {
      var options = optionsWrapper.getOptions();
      switch (target) {
        case QUERY_TARGETS.VARIABLE:
          return options.variables.listPageSize;
        case QUERY_TARGETS.DATASET:
          return options.datasets.listPageSize;
        case QUERY_TARGETS.STUDY:
          return options.studies.listPageSize;
        case QUERY_TARGETS.NETWORK:
          return options.networks.listPageSize;
      }
      return 20;
    }

  };
};

ngObibaMica.search
  .config(['$provide', function ($provide) {
    $provide.provider('ngObibaMicaSearchTemplateUrl', new ngObibaMica.NgObibaMicaTemplateUrlFactory().create(
      {
        search: {header: null, footer: null},
        searchStudiesResultTable: {template: null},
        searchNetworksResultTable: {template: null},
        searchDatasetsResultTable: {template: null},
        searchCriteriaRegionTemplate: {template: null},
        vocabularyFilterDetailHeading: {template: null},
        CriterionDropdownTemplate: {template: null},
        searchResultList: {template: null},
        searchInputList: {template: null},
        searchResultCoverage: {template: null},
        searchResultGraphics: {template: null},
        classifications: {header: null, footer: null}
      }
    ));
  }])
  .config(['$provide', function ($provide) {
    $provide.provider('ngObibaMicaSearch', function () {
      var optionsWrapper = new ngObibaMica.search.NgObibaMicaSearchOptionsWrapper();

      function initialize(options) {
        optionsWrapper.setOptions(options);
      }

      this.initialize = initialize;
      this.$get = ['$q', '$translate', 'ObibaServerConfigResource',
        function($q, $translate, ObibaServerConfigResource) {
        return new ngObibaMica.search.ObibaMicaSearchOptionsService($q, $translate, optionsWrapper, ObibaServerConfigResource);
      }];
    });
  }])
  .run(['GraphicChartsConfigurations',
  function (GraphicChartsConfigurations) {
    GraphicChartsConfigurations.setClientConfig();
  }]);
;/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

ngObibaMica.search

  .filter('regex', function() {
    return function(elements, regex, fields, lang) {
      var out = [];

      try {
        var pattern = new RegExp(regex, 'i');
        out = elements.filter(function(element) {
          return fields.some(function(field) {
            var value = element[field];
            
            if(angular.isArray(value) && lang) {
              return value.filter(function(item) {
                return item.locale === lang;
              }).some(function(item) {
                return pattern.test(item.text);
              });
            }

            return pattern.test(value);
          });
        });
      } catch(e) {
      }

      return out;
    };
  })

  .filter('orderBySelection', function() {
    return function (elements, selections) {
      if (!elements){
        return [];
      }

      var selected = [];
      var unselected = [];

      elements.forEach(function(element) {
        if (selections[element.key]) {
          selected.push(element);
        } else {
          unselected.push(element);
        }
      });

      return selected.concat(unselected);
    };
  })

  .filter('visibleVocabularies', ['VocabularyService', function(VocabularyService) {
    return function(vocabularies) {
      return VocabularyService.visibleVocabularies(vocabularies);
    };
  }])

  .filter('dceDescription', function() {
    return function(input) {
      return input.split(':<p>').map(function(d){
        return '<p>' + d;
      })[2];
    };
  })

  .filter('renderableTargets', ['RqlQueryService', function(RqlQueryService) {
    return function(targets) {
      return RqlQueryService.getRenderableTargetCriteria(targets);
    };
  }]);;/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

/* global DISPLAY_TYPES */

/* exported QUERY_TYPES */
var QUERY_TYPES = {
  NETWORKS: 'networks',
  STUDIES: 'studies',
  DATASETS: 'datasets',
  VARIABLES: 'variables'
};

/* exported QUERY_TARGETS */
var QUERY_TARGETS = {
  NETWORK: 'network',
  STUDY: 'study',
  DATASET: 'dataset',
  VARIABLE: 'variable',
  TAXONOMY: 'taxonomy'
};

/* exported BUCKET_TYPES */
var BUCKET_TYPES = {
  NETWORK: 'network',
  STUDY: 'study',
  STUDY_INDIVIDUAL: 'study-individual',
  STUDY_HARMONIZATION: 'study-harmonization',
  DCE: 'dce',
  DCE_INDIVIDUAL: 'dce-individual',
  DCE_HARMONIZATION: 'dce-harmonization',
  DATASET: 'dataset',
  DATASET_COLLECTED: 'dataset-collected',
  DATASET_HARMONIZED: 'dataset-harmonized',
  DATASCHEMA: 'dataschema'
};

/* exported RQL_NODE */
var RQL_NODE = {
  // target nodes
  VARIABLE: 'variable',
  DATASET: 'dataset',
  STUDY: 'study',
  NETWORK: 'network',

  /* target children */
  LIMIT: 'limit',
  SORT: 'sort',
  AND: 'and',
  NAND: 'nand',
  OR: 'or',
  NOR: 'nor',
  NOT: 'not',
  FACET: 'facet',
  LOCALE: 'locale',
  AGGREGATE: 'aggregate',
  BUCKET: 'bucket',
  FIELDS: 'fields',
  FILTER: 'filter',

  /* leaf criteria nodes */
  CONTAINS: 'contains',
  IN: 'in',
  OUT: 'out',
  EQ: 'eq',
  GT: 'gt',
  GE: 'ge',
  LT: 'lt',
  LE: 'le',
  BETWEEN: 'between',
  MATCH: 'match',
  EXISTS: 'exists',
  MISSING: 'missing'
};

/* exported SORT_FIELDS */
var SORT_FIELDS = {
  ACRONYM: 'acronym',
  NAME: 'name',
  CONTAINER_ID: 'containerId',
  POPULATION_WEIGHT: 'populationWeight',
  DATA_COLLECTION_EVENT_WEIGHT: 'dataCollectionEventWeight',
  POPULATION_ID: 'populationId',
  DATASET_ID: 'datasetId',
  VARIABLE_TYPE: 'variableType',
  INDEX: 'index',
  STUDY_TABLE: {
    POPULATION_WEIGHT: 'studyTable.populationWeight',
    DATA_COLLECTION_EVENT_WEIGHT: 'studyTable.dataCollectionEventWeight',
    STUDY_ID: 'studyTable.studyId',
    POPULATION_ID: 'studyTable.populationId'
  }
};

/* exported targetToType */
function targetToType(target) {
  switch (target.toLocaleString()) {
    case QUERY_TARGETS.NETWORK:
      return QUERY_TYPES.NETWORKS;
    case QUERY_TARGETS.STUDY:
      return QUERY_TYPES.STUDIES;
    case QUERY_TARGETS.DATASET:
      return QUERY_TYPES.DATASETS;
    case QUERY_TARGETS.VARIABLE:
      return QUERY_TYPES.VARIABLES;
  }

  throw new Error('Invalid target: ' + target);
}

/* exported targetToType */
function typeToTarget(type) {
  switch (type.toLocaleString()) {
    case QUERY_TYPES.NETWORKS:
      return QUERY_TARGETS.NETWORK;
    case QUERY_TYPES.STUDIES:
      return QUERY_TARGETS.STUDY;
    case QUERY_TYPES.DATASETS:
      return QUERY_TARGETS.DATASET;
    case QUERY_TYPES.VARIABLES:
      return QUERY_TARGETS.VARIABLE;
  }

  throw new Error('Invalid type: ' + type);
}

/* exported CriteriaIdGenerator */
var CriteriaIdGenerator = {
  generate: function (taxonomy, vocabulary, term) {
    return taxonomy && vocabulary ?
    taxonomy.name + '.' + vocabulary.name + (term ? '.' + term.name : '') :
      undefined;
  }
};

/* exported CriteriaItem */
function CriteriaItem(model) {
  var self = this;
  Object.keys(model).forEach(function(k) {
    self[k] = model[k];
  });
}

CriteriaItem.prototype.isRepeatable = function() {
  return false;
};

CriteriaItem.prototype.getTarget = function() {
  return this.target || null;
};

CriteriaItem.prototype.getRangeTerms = function () {
  var range = {from: null, to: null};

  if (this.type === RQL_NODE.BETWEEN) {
    range.from = this.selectedTerms[0];
    range.to = this.selectedTerms[1];
  } else if (this.type === RQL_NODE.GE) {
    range.from = this.selectedTerms[0];
    range.to = null;
  } else if (this.type === RQL_NODE.LE) {
    range.from = null;
    range.to = this.selectedTerms[0];
  }

  return range;
};

/* exported RepeatableCriteriaItem */
function RepeatableCriteriaItem() {
  CriteriaItem.call(this, {});
  this.list = [];
}

RepeatableCriteriaItem.prototype = Object.create(CriteriaItem.prototype);

RepeatableCriteriaItem.prototype.isRepeatable = function() {
  return true;
};

RepeatableCriteriaItem.prototype.addItem = function(item) {
  this.list.push(item);
  return this;
};

RepeatableCriteriaItem.prototype.items = function() {
  return this.list;
};

RepeatableCriteriaItem.prototype.first = function() {
  return this.list[0];
};

RepeatableCriteriaItem.prototype.getTarget = function() {
  return this.list.length > 0 ? this.list[0].getTarget() : null;
};

/**
 * Criteria Item builder
 */
function CriteriaItemBuilder(LocalizedValues, useLang) {
  var criteria = {
    type: null,
    rqlQuery: null,
    lang: useLang || 'en',
    parent: null,
    children: []
  };

  var builder = this;

  this.type = function (value) {
    if (!RQL_NODE[value.toUpperCase()]) {
      throw new Error('Invalid node type:', value);
    }
    criteria.type = value;
    return this;
  };

  this.target = function (value) {
    criteria.target = value;
    return this;
  };

  this.parent = function (value) {
    criteria.parent = value;
    return this;
  };

  this.taxonomy = function (value) {
    criteria.taxonomy = value;
    return this;
  };

  this.vocabulary = function (value) {
    criteria.vocabulary = value;
    return this;
  };

  this.term = function (value) {
    if (Array.isArray(value)) {
      return builder.selectedTerms(value);
    } else {
      criteria.term = value;
      return this;
    }
  };

  this.rqlQuery = function (value) {
    criteria.rqlQuery = value;
    return this;
  };

  this.selectedTerm = function (term) {
    if (!criteria.selectedTerms) {
      criteria.selectedTerms = [];
    }

    criteria.selectedTerms.push(typeof term === 'string' || typeof term === 'number' ? term : term.name);
    return this;
  };

  this.selectedTerms = function (terms) {
    criteria.selectedTerms = terms.filter(function (term) {
      return term;
    }).map(function (term) {
      if (typeof term === 'string' || typeof term === 'number') {
        return term;
      } else {
        return term.name;
      }
    });
    return this;
  };

  /**
   * This is
   */
  function prepareForLeaf() {
    if (criteria.term) {
      criteria.itemTitle = LocalizedValues.forLocale(criteria.term.title, criteria.lang);
      criteria.itemDescription = LocalizedValues.forLocale(criteria.term.description, criteria.lang);
      criteria.itemParentTitle = LocalizedValues.forLocale(criteria.vocabulary.title, criteria.lang);
      criteria.itemParentDescription = LocalizedValues.forLocale(criteria.vocabulary.description, criteria.lang);
      if (!criteria.itemTitle) {
        criteria.itemTitle = criteria.term.name;
      }
      if (!criteria.itemParentTitle) {
        criteria.itemParentTitle = criteria.vocabulary.name;
      }
    } else {
      criteria.itemTitle = LocalizedValues.forLocale(criteria.vocabulary.title, criteria.lang);
      criteria.itemDescription = LocalizedValues.forLocale(criteria.vocabulary.description, criteria.lang);
      criteria.itemParentTitle = LocalizedValues.forLocale(criteria.taxonomy.title, criteria.lang);
      criteria.itemParentDescription = LocalizedValues.forLocale(criteria.taxonomy.description, criteria.lang);
      if (!criteria.itemTitle) {
        criteria.itemTitle = criteria.vocabulary.name;
      }
      if (!criteria.itemParentTitle) {
        criteria.itemParentTitle = criteria.taxonomy.name;
      }
    }

    criteria.id = CriteriaIdGenerator.generate(criteria.taxonomy, criteria.vocabulary, criteria.term);
  }

  this.build = function () {
    if (criteria.taxonomy && criteria.vocabulary) {
      prepareForLeaf();
    }
    return new CriteriaItem(criteria);
  };

}

/**
 * Class for all criteria builders
 * @param rootRql
 * @param rootItem
 * @param taxonomies
 * @param LocalizedValues
 * @param lang
 * @constructor
 */
function CriteriaBuilder(rootRql, rootItem, taxonomies, LocalizedValues, lang) {

  /**
   * Helper to get a builder
   * @returns {CriteriaItemBuilder}
   */
  this.newCriteriaItemBuilder = function () {
    return new CriteriaItemBuilder(LocalizedValues, lang);
  };

  this.initialize = function (target) {
    this.leafItemMap = {};
    this.target = target;
    this.rootRql = rootRql;
    this.taxonomies = taxonomies;
    this.LocalizedValues = LocalizedValues;
    this.lang = lang;
    this.rootItem = this.newCriteriaItemBuilder()
      .parent(rootItem)
      .type(this.target)
      .rqlQuery(this.rootRql)
      .target(this.target)
      .build();
  };

  /**
   * Called by the leaf visitor to create a criteria
   * @param targetTaxonomy
   * @param targetVocabulary
   * @param targetTerms
   * @param node
   */
  this.buildLeafItem = function (targetTaxonomy, targetVocabulary, targetTerms, node, parentItem) {
    var self = this;

    var builder = new CriteriaItemBuilder(self.LocalizedValues, self.lang)
      .type(node.name)
      .target(self.target)
      .taxonomy(targetTaxonomy)
      .vocabulary(targetVocabulary)
      .rqlQuery(node)
      .parent(parentItem);

    builder.selectedTerms(targetTerms).build();

    return builder.build();
  };

}

/**
 * Search for the taxonomy vocabulary corresponding to the provided field name. Can be defined either in the
 * vocabulary field attribute or be the vocabulary name.
 * @param field
 * @returns {{taxonomy: null, vocabulary: null}}
 */
CriteriaBuilder.prototype.fieldToVocabulary = function (field) {
  var found = {
    taxonomy: null,
    vocabulary: null
  };

  var normalizedField = field;
  if (field.indexOf('.') < 0) {
    normalizedField = 'Mica_' + this.target + '.' + field;
  }
  var parts = normalizedField.split('.', 2);
  var targetTaxonomy = parts[0];
  var targetVocabulary = parts[1];

  var foundTaxonomy = this.taxonomies.filter(function (taxonomy) {
    return targetTaxonomy === taxonomy.name;
  });

  if (foundTaxonomy.length === 0) {
    throw new Error('Could not find taxonomy:', targetTaxonomy);
  }

  found.taxonomy = foundTaxonomy[0];

  var foundVocabulary = found.taxonomy.vocabularies.filter(function (vocabulary) {
    return targetVocabulary === vocabulary.name;
  });

  if (foundVocabulary.length === 0) {
    throw new Error('Could not find vocabulary:', targetVocabulary);
  }

  found.vocabulary = foundVocabulary[0];

  return found;
};

/**
 * This method is where a criteria gets created
 */
CriteriaBuilder.prototype.visitLeaf = function (node, parentItem) {
  var match = RQL_NODE.MATCH === node.name;

  var field = node.args[match ? 1 : 0];
  var values = node.args[match ? 0 : 1];

  var searchInfo = this.fieldToVocabulary(field);
  var item =
      this.buildLeafItem(searchInfo.taxonomy,
          searchInfo.vocabulary,
          values instanceof Array ? values : [values],
          node,
          parentItem);

  var current = this.leafItemMap[item.id];

  if (current) {
    if (current.isRepeatable()) {
      current.addItem(item);
    } else {
      console.error('Non-repeatable criteria items must be unique,', current.id, 'will be overwritten.');
      current = item;
    }
  } else {
    current = item.vocabulary.repeatable ? new RepeatableCriteriaItem().addItem(item) : item;
  }

  this.leafItemMap[item.id] = current;
  parentItem.children.push(item);
};

/**
 * Returns all the criterias found
 * @returns {Array}
 */
CriteriaBuilder.prototype.getRootItem = function () {
  return this.rootItem;
};

/**
 * Returns the leaf criteria item map needed for finding duplicates
 * @returns {Array}
 */
CriteriaBuilder.prototype.getLeafItemMap = function () {
  return this.leafItemMap;
};

/**
 * Node condition visitor
 * @param node
 * @param parentItem
 */
CriteriaBuilder.prototype.visitCondition = function (node, parentItem) {
  var item = this.newCriteriaItemBuilder().parent(parentItem).rqlQuery(node).type(node.name).build();
  parentItem.children.push(item);

  this.visit(node.args[0], item);
  this.visit(node.args[1], item);
};

/**
 * Node not visitor
 * @param node
 * @param parentItem
 */
CriteriaBuilder.prototype.visitNot = function (node, parentItem) {
  var item = this.newCriteriaItemBuilder().parent(parentItem).rqlQuery(node).type(node.name).build();
  parentItem.children.push(item);

  this.visit(node.args[0], item);
};

/**
 * General purpose node visitor
 * @param node
 * @param parentItem
 */
CriteriaBuilder.prototype.visit = function (node, parentItem) {

  // TODO needs to add more types
  switch (node.name) {
    case RQL_NODE.NOT:
      this.visitNot(node, parentItem);
      break;
    case RQL_NODE.AND:
    case RQL_NODE.NAND:
    case RQL_NODE.OR:
    case RQL_NODE.NOR:
      this.visitCondition(node, parentItem);
      break;

    case RQL_NODE.CONTAINS:
    case RQL_NODE.IN:
    case RQL_NODE.OUT:
    case RQL_NODE.EQ:
    case RQL_NODE.LE:
    case RQL_NODE.LT:
    case RQL_NODE.GE:
    case RQL_NODE.GT:
    case RQL_NODE.BETWEEN:
    case RQL_NODE.EXISTS:
    case RQL_NODE.MISSING:
    case RQL_NODE.MATCH:
      this.visitLeaf(node, parentItem);
      break;
    case RQL_NODE.FILTER:
      break;
    default:
  }
};

/**
 * Builds a criteria list for this target
 */
CriteriaBuilder.prototype.build = function () {
  var self = this;
  this.rootRql.args.forEach(function (node) {
    self.visit(node, self.rootItem);
  });
};

ngObibaMica.search

  .service('RqlQueryUtils', ['VocabularyService', function (VocabularyService) {
    var self = this;

    /**
     * Finds the parent node to which new queries can be added
     *
     * @param targetNode
     * @returns {*}
     */
    function findValidParentNode(targetNode) {
      var target = targetNode.args.filter(function (query) {
        switch (query.name) {
          case RQL_NODE.AND:
          case RQL_NODE.NAND:
          case RQL_NODE.OR:
          case RQL_NODE.NOR:
          case RQL_NODE.NOT:
          case RQL_NODE.CONTAINS:
          case RQL_NODE.IN:
          case RQL_NODE.OUT:
          case RQL_NODE.EQ:
          case RQL_NODE.GT:
          case RQL_NODE.GE:
          case RQL_NODE.LT:
          case RQL_NODE.LE:
          case RQL_NODE.BETWEEN:
          case RQL_NODE.EXISTS:
          case RQL_NODE.MISSING:
            return true;
          case RQL_NODE.MATCH:
            return query.args.length > 1;
        }

        return false;
      }).pop();

      if (target) {
        return targetNode.args.findIndex(function (arg) {
          return arg.name === target.name;
        });
      }

      return -1;
    }

    this.vocabularyTermNames = function (vocabulary) {
      return vocabulary && vocabulary.terms ? vocabulary.terms.map(function (term) {
        return term.name;
      }) : [];
    };

    this.hasTargetQuery = function (rootRql, target) {
      return rootRql.args.filter(function (query) {
          switch (query.name) {
            case RQL_NODE.VARIABLE:
            case RQL_NODE.DATASET:
            case RQL_NODE.STUDY:
            case RQL_NODE.NETWORK:
              return target ? target === query.name : true;
            default:
              return false;
          }
        }).length > 0;
    };

    this.variableQuery = function () {
      return new RqlQuery(QUERY_TARGETS.VARIABLE);
    };

    this.eqQuery = function (field, term) {
      var query = new RqlQuery(RQL_NODE.EQ);
      query.args.push(term);
      return query;
    };

    this.orQuery = function (left, right) {
      var query = new RqlQuery(RQL_NODE.OR);
      query.args = [left, right];
      return query;
    };

    this.aggregate = function (fields) {
      var query = new RqlQuery(RQL_NODE.AGGREGATE);
      fields.forEach(function (field) {
        query.args.push(field);
      });
      return query;
    };

    this.fields = function (fields) {
      var query = new RqlQuery(RQL_NODE.FIELDS);
      query.args.push(fields  );
      return query;
    };

    this.limit = function (from, size) {
      var query = new RqlQuery(RQL_NODE.LIMIT);
      query.args.push(from);
      query.args.push(size);
      return query;
    };

    this.fieldQuery = function (name, field, terms) {
      var query = new RqlQuery(name);
      query.args.push(field);

      if (terms && terms.length > 0) {
        query.args.push(terms);
      }

      return query;
    };

    this.inQuery = function (field, terms) {
      var hasValues = terms && terms.length > 0;
      var name = hasValues ? RQL_NODE.IN : RQL_NODE.EXISTS;
      return this.fieldQuery(name, field, terms);
    };

    this.matchQuery = function (field, queryString) {
      var query = new RqlQuery(RQL_NODE.MATCH);
      query.args.push(queryString || '*');
      query.args.push(field);
      return query;
    };


    this.isFreeTextMatch = function(query) {
      return query.name === RQL_NODE.MATCH && query.args.length === 1;
    };

    this.updateMatchQuery = function (query, queryString) {
      query.args[0] = queryString || '*';
      return query;
    };

    this.rangeQuery = function (field, from, to) {
      var query = new RqlQuery(RQL_NODE.BETWEEN);
      query.args.push(field);
      self.updateRangeQuery(query, from, to);
      return query;
    };

    this.updateQueryInternal = function (query, terms) {
      var hasValues = terms && terms.length > 0;

      if (hasValues) {
        query.args[1] = terms;
      } else {
        query.args.splice(1, 1);
      }

      return query;
    };

    this.mergeInQueryArgValues = function (query, terms, replace) {
      var hasValues = terms && terms.length > 0;

      if (hasValues) {
        var current = query.args[1];

        if (!current || replace) {
          query.args[1] = terms;
        } else {
          if (!(current instanceof Array)) {
            current = [current];
          }

          var unique = terms.filter(function (term) {
            return current.indexOf(term) === -1;
          });

          query.args[1] = current.concat(unique);
        }
      } else {
        query.args.splice(1, 1);
      }

      return query;
    };

    this.updateRangeQuery = function (query, from, to, missing) {
      if (missing) {
        query.name = RQL_NODE.MISSING;
        query.args.splice(1, 1);
      } else if (angular.isDefined(from) && from !== null && angular.isDefined(to) && to !== null) {
        query.name = RQL_NODE.BETWEEN;
        query.args[1] = [from, to];
      } else if (angular.isDefined(from) && from !== null) {
        query.name = RQL_NODE.GE;
        query.args[1] = from;
      } else if (angular.isDefined(to) && to !== null) {
        query.name = RQL_NODE.LE;
        query.args[1] = to;
      } else {
        query.name = RQL_NODE.EXISTS;
        query.args.splice(1, 1);
      }
    };

    /**
     * Creates a RqlQuery from an item
     *
     * @param item
     * @returns {RqlQuery}
     */
    this.buildRqlQuery = function (item) {
      if (VocabularyService.isNumericVocabulary(item.vocabulary)) {
        return this.rangeQuery(this.criteriaId(item.taxonomy, item.vocabulary), null, null);
      } else if (VocabularyService.isMatchVocabulary(item.vocabulary)) {
        return this.matchQuery(this.criteriaId(item.taxonomy, item.vocabulary), null);
      } else {
        var args;
        if (Array.isArray(item.selectedTerms) && item.selectedTerms.length > 0) {
          args = item.selectedTerms;
        } else if (item.term) {
          args = item.term.name;
        }

        return this.inQuery(
          this.criteriaId(item.taxonomy, item.vocabulary),
            args
        );
      }
    };

    /**
     * Adds a new query to the parent query node
     *
     * @param parentQuery
     * @param query
     * @returns {*}
     */
    this.addQuery = function (parentQuery, query, logicalOp) {
      if (parentQuery.args.length === 0) {
        parentQuery.args.push(query);
      } else {
        var parentIndex = findValidParentNode(parentQuery);

        if (parentIndex === -1) {
          parentQuery.args.push(query);
        } else {
          var oldArg = parentQuery.args.splice(parentIndex, 1).pop();
          // check if the field is from the target's taxonomy, in which case the criteria is
          // added with a AND operator otherwise it is a OR
          if (!logicalOp && query.args && query.args.length > 0) {
            var targetTaxo = 'Mica_' + parentQuery.name;

            if (!self.isFreeTextMatch(query)) {
              var criteriaVocabulary = query.name === 'match' ? query.args[1] : query.args[0];
              logicalOp = criteriaVocabulary.startsWith(targetTaxo + '.') ? RQL_NODE.AND : RQL_NODE.OR;
            }
          }
          var orQuery = new RqlQuery(logicalOp || RQL_NODE.AND);
          orQuery.args.push(oldArg, query);
          parentQuery.args.push(orQuery);
        }
      }

      return parentQuery;
    };

    /**
     * Update repeatable vocabularies as follows:
     *
     * IN(q, [a,b]) OR [c] => CONTAINS(q, [a,c]) OR CONTAINS(q, [b,c])
     * CONTAINS(q, [a,b]) OR [c] => CONTAINS(q, [a,b,c])
     * EXISTS(q) OR [c] => CONTAINS(q, [c])
     *
     * @param existingItemWrapper
     * @param terms
     */
    this.updateRepeatableQueryArgValues = function (existingItem, terms) {
      var self = this;
      existingItem.items().forEach(function(item) {
        var query = item.rqlQuery;
        switch (query.name) {
          case RQL_NODE.EXISTS:
            query.name = RQL_NODE.CONTAINS;
            self.mergeInQueryArgValues(query, terms, false);
            break;

          case RQL_NODE.CONTAINS:
            self.mergeInQueryArgValues(query, terms, false);
            break;

          case RQL_NODE.IN:
            var values = query.args[1] ?  [].concat(query.args[1]) : [];
            if (values.length === 1) {
              query.name = RQL_NODE.CONTAINS;
              self.mergeInQueryArgValues(query, terms, false);
              break;
            }

            var field = query.args[0];
            var contains = values.filter(function(value){
              // remove duplicates (e.g. CONTAINS(q, [a,a])
              return terms.indexOf(value) < 0;
            }).map(function(value){
              return self.fieldQuery(RQL_NODE.CONTAINS, field, [].concat(value, terms));
            });

            var orRql;
            if (contains.length > 1) {
              var firstTwo = contains.splice(0, 2);
              orRql = self.orQuery(firstTwo[0], firstTwo[1]);

              contains.forEach(function(value){
                orRql = self.orQuery(value, orRql);
              });
              
              query.name = orRql.name;
              query.args = orRql.args;
            } else {
              query.name = RQL_NODE.CONTAINS;
              query.args = contains[0].args;
            }
        }
      });

    };

    this.updateQueryArgValues = function (query, terms, replace) {
      switch (query.name) {
        case RQL_NODE.EXISTS:
        case RQL_NODE.MISSING:
          query.name = RQL_NODE.IN;
          this.mergeInQueryArgValues(query, terms, replace);
          break;
        case RQL_NODE.CONTAINS:
        case RQL_NODE.IN:
          this.mergeInQueryArgValues(query, terms, replace);
          break;
        case RQL_NODE.BETWEEN:
        case RQL_NODE.GE:
        case RQL_NODE.LE:
          query.args[1] = terms;
          break;
        case RQL_NODE.MATCH:
          query.args[0] = terms;
          break;
      }
    };

    this.updateQuery = function (query, values) {
      switch (query.name) {
        case RQL_NODE.CONTAINS:
        case RQL_NODE.IN:
        case RQL_NODE.OUT:
        case RQL_NODE.EXISTS:
        case RQL_NODE.MISSING:
          this.updateQueryInternal(query, values);
          break;
      }
    };

    this.addLocaleQuery = function (rqlQuery, locale) {
      var found = rqlQuery.args.filter(function (arg) {
        return arg.name === RQL_NODE.LOCALE;
      }).pop();

      if (!found) {
        var localeQuery = new RqlQuery('locale');
        localeQuery.args.push(locale);
        rqlQuery.args.push(localeQuery);
      }
    };

    this.addFields = function (targetQuery, fieldsQuery) {
      if (targetQuery && targetQuery.args) {
        var found = targetQuery.args.filter(function (arg) {
          return arg.name === RQL_NODE.FIELDS;
        }).pop();

        if (found) {
          found.args = fieldsQuery.args;
        } else {
          targetQuery.args.push(fieldsQuery);
        }
      }
    };

    this.addLimit = function (targetQuery, limitQuery) {
      if (targetQuery && targetQuery.args) {
        var found = targetQuery.args.filter(function (arg) {
          return arg.name === RQL_NODE.LIMIT;
        }).pop();

        if (found) {
          found.args = limitQuery.args;
        } else {
          targetQuery.args.push(limitQuery);
        }
      }
    };

    /**
     * Adds a sort criteria on given fields
     *
     * @param targetQuery
     * @param sort field name or an array of field names
     */
    this.addSort = function (targetQuery, sort) {
      var sortQuery = targetQuery.args.filter(function (arg) {
        return arg.name === RQL_NODE.SORT;
      }).pop();

      if (!sortQuery) {
        sortQuery = new RqlQuery('sort');
        targetQuery.args.push(sortQuery);
      }

      sortQuery.args = Array.isArray(sort) ? sort : [sort];
    };

    /**
     * Helper finding the vocabulary field, return name if none was found
     *
     * @param taxonomy
     * @param vocabulary
     * @returns {*}
     */
    this.criteriaId = function (taxonomy, vocabulary) {
      return taxonomy.name + '.' + vocabulary.name;
    };
  }])

  .service('RqlQueryService', [
    '$q',
    '$log',
    'TaxonomiesResource',
    'TaxonomyResource',
    'LocalizedValues',
    'RqlQueryUtils',
    'VocabularyService',
    'ngObibaMicaSearch',
    function ($q,
              $log,
              TaxonomiesResource,
              TaxonomyResource,
              LocalizedValues,
              RqlQueryUtils,
              VocabularyService,
              ngObibaMicaSearch) {
      var taxonomiesCache = {
        variable: null,
        dataset: null,
        study: null,
        network: null
      };

      var self = this;
      var searchOptions = ngObibaMicaSearch.getOptions();
      this.findItemNodeById = function(root, targetId, result, strict) {
        if (root && root.children && result) {
          return root.children.some(function(child) {
            if (strict ? targetId === child.id : targetId.indexOf(child.id) > -1) {
              result.item = child;
              return true;
            }

            return self.findItemNodeById(child, targetId, result, strict);
          });
        }

        return false;
      };

      this.findItemNode = function(root, item, result) {
        return self.findItemNodeById(root, item.id, result);
      };

      function findTargetCriteria(target, rootCriteria) {
        return rootCriteria.children.filter(function (child) {
          return child.target === target;
        }).pop();
      }

      function findCriteriaItemFromTreeById(target, targetId, rootCriteria, strict) {
        var targetItem = findTargetCriteria(target, rootCriteria);
        var result = {};
        if (self.findItemNodeById(targetItem, targetId, result, strict)) {
          return result.item;
        }

        return null;
      }

      function findCriteriaItemFromTree(item, rootCriteria) {
        var targetItem = findTargetCriteria(item.target, rootCriteria);
        var result = {};
        if (self.findItemNode(targetItem, item, result)) {
          return result.item;
        }

        return null;
      }

      function findTargetQuery(target, query) {
        return query.args.filter(function (arg) {
          return arg.name === target;
        }).pop();
      }

      function findQueryInTargetByTaxonomyVocabulary(target, taxonomy, vocabulary) {
        if (!target) {
          return null;
        }

        function search(parent, rx, result) {
          return parent.args.some(function(arg) {
            if (null !== rx.exec(arg)) {
              result.parent = parent;
              return true;
            }

            if (arg instanceof RqlQuery) {
              return search(arg, rx, result);
            }

            return false;

          });
        }

        var result = {};
        search(target, new RegExp((taxonomy ? taxonomy : '') + '\\.' + vocabulary+'$'), result);
        return result.parent;
      }

      function findQueryInTargetByVocabulary(target, vocabulary) {
        return findQueryInTargetByTaxonomyVocabulary(target, null, vocabulary);
      }

      function getSourceFields(context, target) {
        switch (context) {
          case DISPLAY_TYPES.LIST:
            switch (target) {
              case QUERY_TARGETS.STUDY:
                return RqlQueryUtils.fields(searchOptions.studies.fields);

              case QUERY_TARGETS.VARIABLE:
                return RqlQueryUtils.fields(
                  [
                    'attributes.label.*',
                    'variableType',
                    'datasetId',
                    'datasetAcronym'
                  ]);

              case QUERY_TARGETS.DATASET:
                return RqlQueryUtils.fields(searchOptions.datasets.fields);

              case QUERY_TARGETS.NETWORK:
                return RqlQueryUtils.fields(searchOptions.networks.fields);
            }
            break;
        }

        return null;
      }

      this.findCriteriaItemFromTreeById = findCriteriaItemFromTreeById;
      this.findCriteriaItemFromTree = findCriteriaItemFromTree;
      this.findTargetCriteria = findTargetCriteria;
      this.findTargetQuery = findTargetQuery;
      this.findQueryInTargetByVocabulary = findQueryInTargetByVocabulary;
      this.findQueryInTargetByTaxonomyVocabulary = findQueryInTargetByTaxonomyVocabulary;

      function isOperator(name) {
        switch (name) {
          case RQL_NODE.AND:
          case RQL_NODE.NAND:
          case RQL_NODE.OR:
          case RQL_NODE.NOR:
            return true;
        }

        return false;
      }

      function isLeaf(name) {
        switch (name) {
          case RQL_NODE.CONTAINS:
          case RQL_NODE.IN:
          case RQL_NODE.OUT:
          case RQL_NODE.EQ:
          case RQL_NODE.GT:
          case RQL_NODE.GE:
          case RQL_NODE.LT:
          case RQL_NODE.LE:
          case RQL_NODE.BETWEEN:
          case RQL_NODE.MATCH:
          case RQL_NODE.EXISTS:
          case RQL_NODE.MISSING:
            return true;
        }

        return false;
      }

      function isLeafCriteria(item) {
        return isLeaf(item.type);
      }

      function deleteNode(item) {
        var parent = item.parent;
        var query = item.rqlQuery;
        var queryArgs = query.args;
        var parentQuery = item.parent.rqlQuery;
        var index = parentQuery.args.indexOf(query);
        var indexChild = parent.children.indexOf(item);

        if (index === -1 || indexChild === -1) {
          throw new Error('Criteria node not found: ' + item);
        }

        parent.children.splice(indexChild, 1);
        item.children.forEach(function (c) {
          c.parent = parent;
        });
        parent.children.splice.apply(parent.children, [indexChild, 0].concat(item.children));

        parentQuery.args.splice(index, 1);

        if (queryArgs) {
          if (queryArgs instanceof Array) {
            parentQuery.args.splice.apply(parentQuery.args, [index, 0].concat(queryArgs));
          } else {
            parentQuery.args.splice(index, 0, queryArgs);
          }
        }

        if (parent.parent !== null && parentQuery.args.length === 0) {
          deleteNode(parent);
        }
      }

      function deleteNodeCriteriaWithOrphans(item) {
        var parent = item.parent;
        var query = item.rqlQuery;
        var queryArgs = query.args;
        var parentQuery = item.parent.rqlQuery;
        var index = parentQuery.args.indexOf(query);
        var indexChild = parent.children.indexOf(item);

        if (index === -1 || indexChild === -1) {
          throw new Error('Criteria node not found: ' + item);
        }

        parent.children.splice(indexChild, 1);
        item.children.forEach(function (c) {
          c.parent = parent;
        });
        parent.children.splice.apply(parent.children, [indexChild, 0].concat(item.children));

        parentQuery.args.splice(index, 1);

        if (queryArgs) {
          if (queryArgs instanceof Array) {
            parentQuery.args.splice.apply(parentQuery.args, [index, 0].concat(queryArgs));
          } else {
            parentQuery.args.splice(index, 0, queryArgs);
          }
        }

        if (parentQuery.args.length === 0) {
          deleteNode(parent);
        }
      }

      function deleteLeafCriteria(item) {
        var parent = item.parent;
        if (!parent) {
          throw new Error('Cannot remove criteria when parent is NULL');
        }

        var query = item.rqlQuery;
        var parentQuery = item.parent.rqlQuery;
        var index = parentQuery.args.indexOf(query);

        if (index === -1) {
          throw new Error('Criteria node not found: ' + item);
        }

        parentQuery.args.splice(index, 1);

        if ([RQL_NODE.OR, RQL_NODE.AND, RQL_NODE.NAND, RQL_NODE.NOR].indexOf(parent.type) !== -1) {
          deleteNodeCriteriaWithOrphans(parent);
        } else if (parentQuery.args.length === 0) {
          deleteNode(parent);
        }

      }

      /**
       * NOTE: once the FreeTextMatch has a UI this is no longer needed.
       *
       * @param query
       * @returns boolean if target has more than a FreeTextMatch
       */
      function queryHasCriteria(query) {
        if (query && query.args) {
          var leafQueries = query.args.filter(function(arg) {
            return isLeaf(arg.name) || isOperator(arg.name);
          });

          if (leafQueries.length === 1 && RqlQueryUtils.isFreeTextMatch(leafQueries[0])) {
            return false;
          }

          return leafQueries.length > 0;
        }

        return false;
      }

      function getRenderableTargetCriteria(targets) {
        return (targets || []).filter(function(target){
          return queryHasCriteria(target.rqlQuery);
        });
      }

      function getRenderableTargetCriteriaFromRoot(rootCriteria) {
        return rootCriteria ?
          getRenderableTargetCriteria(rootCriteria.children) :
          [];
      }

      this.getRenderableTargetCriteria = getRenderableTargetCriteria;
      this.getRenderableTargetCriteriaFromRoot = getRenderableTargetCriteriaFromRoot;

      this.parseQuery = function(query) {
        try {
          return new RqlParser().parse(query);
        } catch (e) {
          $log.error(e.message);
        }

        return new RqlQuery();
      };

      /**
       * Removes the item from criteria item tree. This should be from a leaf.
       * @param item
       */
      this.removeCriteriaItem = function (item) {
        if (isLeafCriteria(item)) {
          deleteLeafCriteria(item);
        } else {
          deleteNode(item);
        }
      };

      /**
       * Creates a criteria item
       * @param target
       * @param taxonomy
       * @param vocabulary
       * @param term
       * @param lang
       * @returns A criteria item
       */
      this.createCriteriaItem = function (target, taxonomy, vocabulary, term, lang) {
        function createBuilder(taxonomy, vocabulary, term) {
          return new CriteriaItemBuilder(LocalizedValues, lang)
            .target(target)
            .taxonomy(taxonomy)
            .vocabulary(vocabulary)
            .term(term);
        }

        if (angular.isString(taxonomy)) {
          return TaxonomyResource.get({
            target: target,
            taxonomy: taxonomy
          }).$promise.then(function (taxonomy) {
            vocabulary = taxonomy.vocabularies.filter(function (v) {
              return v.name === vocabulary || VocabularyService.vocabularyAlias(v) === vocabulary;
            })[0];
            term = vocabulary && vocabulary.terms ?
              vocabulary.terms.filter(function (t) {return t.name === term; })[0] :
              null;

            return createBuilder(taxonomy, vocabulary, term).build();
          });
        }

        return createBuilder(taxonomy, vocabulary, term).build();
      };

      /**
       * Adds new item to the item tree
       *
       * @param rootItem
       * @param item
       */
      this.addCriteriaItem = function (rootRql, newItem, logicalOp) {
        var target = rootRql.args.filter(function (query) {
          return newItem.target === query.name;
        }).pop();

        if (!target) {
          target = new RqlQuery(RQL_NODE[newItem.target.toUpperCase()]);
          rootRql.args.push(target);
        }

        var rqlQuery = newItem.rqlQuery ? newItem.rqlQuery : RqlQueryUtils.buildRqlQuery(newItem);
        return RqlQueryUtils.addQuery(target, rqlQuery, logicalOp);
      };

      /**
       * Update an existing item to the item tree
       *
       * @param rootItem
       * @param item
       */
      this.updateCriteriaItem = function (existingItem, newItem, replace) {
        var newTerms;
        var isRepeatable = existingItem.isRepeatable();
        var isMatchNode = !isRepeatable && existingItem.rqlQuery.name === RQL_NODE.MATCH;

        if(replace && newItem.rqlQuery) {
          existingItem.rqlQuery.name = newItem.rqlQuery.name;
        }
        
        if (newItem.rqlQuery) {
          newTerms = newItem.rqlQuery.args[isMatchNode ? 0 : 1];
        } else if (newItem.term) {
          newTerms = [newItem.term.name];
        } else {
          existingItem = isRepeatable ? existingItem.first() : existingItem;
          existingItem.rqlQuery.name = RQL_NODE.EXISTS;
          existingItem.rqlQuery.args.splice(1, 1);
        }

        if (newTerms) {
          if (isRepeatable) {
            RqlQueryUtils.updateRepeatableQueryArgValues(existingItem, newTerms);
          } else {
            RqlQueryUtils.updateQueryArgValues(existingItem.rqlQuery, newTerms, replace);
          }
        }
      };

      this.getTaxonomyByTarget = function(target) {
        var deferred = $q.defer();
        var taxonomy = taxonomiesCache[target];
        if (taxonomy) {
          deferred.resolve(taxonomy);
        } else {
          TaxonomiesResource.get({
            target: target
          }).$promise.then(function (response) {
            taxonomiesCache[target] = response;
            deferred.resolve(response);
          });
        }

        return deferred.promise;
      };

      /**
       * Builders registry
       *
       * @type {{variable: builders.variable, study: builders.study}}
       */
      this.builders = function (target, rootRql, rootItem, lang) {
        var deferred = $q.defer();

        function build(rootRql, rootItem) {
          var builder = new CriteriaBuilder(rootRql, rootItem, taxonomiesCache[target], LocalizedValues, lang);
          builder.initialize(target);
          builder.build();
          deferred.resolve({root: builder.getRootItem(), map: builder.getLeafItemMap()});
        }

        self.getTaxonomyByTarget(target).then(function(){
          build(rootRql, rootItem);
        });

        return deferred.promise;
      };

      /**
       * Builds the criteria tree
       *
       * @param rootRql
       * @param lang
       * @returns {*}
       */
      this.createCriteria = function (rootRql, lang) {
        var deferred = $q.defer();
        var rootItem = new CriteriaItemBuilder().type(RQL_NODE.AND).rqlQuery(rootRql).build();
        var leafItemMap = {};

        if (!RqlQueryUtils.hasTargetQuery(rootRql)) {
          deferred.resolve({root: rootItem, map: leafItemMap});
          return deferred.promise;
        }

        var queries = [];
        var self = this;
        var resolvedCount = 0;

        rootRql.args.forEach(function (node) {
          if (QUERY_TARGETS[node.name.toUpperCase()]) {
            queries.push(node);
          }
        });

        queries.forEach(function (node) {
          self.builders(node.name, node, rootItem, lang).then(function (result) {
            rootItem.children.push(result.root);
            leafItemMap = angular.extend(leafItemMap, result.map);
            resolvedCount++;
            if (resolvedCount === queries.length) {
              deferred.resolve({root: rootItem, map: leafItemMap});
            }
          });
        });

        return deferred.promise;
      };

      /**
       * Append the aggregate and facet for criteria term listing.
       *
       * @param query
       * @para
       * @returns the new query
       */
      this.prepareCriteriaTermsQuery = function (query, item, lang) {
        function iterReplaceQuery(query, criteriaId, newQuery) {
          if (!query || !query.args) {
            return null;
          }

          if ((query.name === RQL_NODE.IN || query.name === RQL_NODE.MISSING || query.name === RQL_NODE.CONTAINS) && query.args[0] === criteriaId) {
            return query;
          }

          for (var i = query.args.length; i--;) {
            var res = iterReplaceQuery(query.args[i], criteriaId, newQuery);

            if (res) {
              query.args[i] = newQuery;
            }
          }
        }

        var parsedQuery = this.parseQuery(query);
        var targetQuery = parsedQuery.args.filter(function (node) {
          return node.name === item.target;
        }).pop();

        if (targetQuery) {
          var anyQuery = new RqlQuery(RQL_NODE.EXISTS),
            criteriaId = RqlQueryUtils.criteriaId(item.taxonomy, item.vocabulary);

          anyQuery.args.push(criteriaId);
          iterReplaceQuery(targetQuery, criteriaId, anyQuery);
          targetQuery.args.push(RqlQueryUtils.aggregate([criteriaId]));
          targetQuery.args.push(RqlQueryUtils.limit(0, 0));
        }

        parsedQuery.args.push(new RqlQuery(RQL_NODE.FACET));

        if (lang) {
          RqlQueryUtils.addLocaleQuery(parsedQuery, lang);
        }

        return parsedQuery.serializeArgs(parsedQuery.args);
      };

      this.getTargetQuerySort = function (type, query) {
        var target = typeToTarget(type);
        var targetQuery = findTargetQuery(target, query);
        var sort = null;
        if (targetQuery) {
          sort = targetQuery.args.filter(function (arg) {
            return arg.name === RQL_NODE.SORT;
          }).pop();
        }

        return sort;
      };

      function prepareSearchQueryInternal(context, type, query, pagination, lang, sort, addFieldsQuery) {
        var rqlQuery = angular.copy(query);
        var target = typeToTarget(type);
        RqlQueryUtils.addLocaleQuery(rqlQuery, lang);
        var targetQuery = findTargetQuery(target, rqlQuery);

        if (!targetQuery) {
          targetQuery = new RqlQuery(target);
          rqlQuery.args.push(targetQuery);
        }

        var limit = pagination[target] || {from: 0, size: ngObibaMicaSearch.getDefaultListPageSize(target)};
        RqlQueryUtils.addLimit(targetQuery, RqlQueryUtils.limit(limit.from, limit.size));

        if(addFieldsQuery){
          var fieldsQuery = getSourceFields(context, target);
          if (fieldsQuery) {
            RqlQueryUtils.addFields(targetQuery, fieldsQuery);
          }
        }

        if (sort) {
          RqlQueryUtils.addSort(targetQuery, sort);
        }

        return rqlQuery;
      }

      this.prepareSearchQuery = function (context, type, query, pagination, lang, sort) {
        return prepareSearchQueryInternal(context, type, query, pagination, lang, sort, true);
      };

      this.prepareSearchQueryNoFields = function (context, type, query, pagination, lang, sort) {
        return prepareSearchQueryInternal(context, type, query, pagination, lang, sort, false);
      };

      this.prepareSearchQueryAndSerialize = function (context, type, query, pagination, lang, sort) {
        return new RqlQuery().serializeArgs(self.prepareSearchQuery(context, type, query, pagination, lang, sort).args);
      };

      /**
       * Append the aggregate and bucket operations to the variable.
       *
       * @param query
       * @param bucketArg
       * @returns the new query
       */
      this.prepareCoverageQuery = function (query, bucketArg) {
        var parsedQuery = this.parseQuery(query);
        var aggregate = new RqlQuery('aggregate');
        var bucketField;

        var parts = bucketArg.split('-');
        var groupBy = parts[0];
        var filterBy = parts.length > 1 ? parts[1] : undefined;

        switch (groupBy) {
          case BUCKET_TYPES.NETWORK:
            bucketField = 'networkId';
            break;
          case BUCKET_TYPES.STUDY:
          case BUCKET_TYPES.STUDY_INDIVIDUAL:
          case BUCKET_TYPES.STUDY_HARMONIZATION:
            bucketField = 'studyId';
            break;
          case BUCKET_TYPES.DCE:
          case BUCKET_TYPES.DCE_INDIVIDUAL:
            bucketField = 'dceId';
            break;
          case BUCKET_TYPES.DATASCHEMA:
          case BUCKET_TYPES.DATASET:
          case BUCKET_TYPES.DATASET_COLLECTED:
          case BUCKET_TYPES.DATASET_HARMONIZED:
            bucketField = 'datasetId';
            break;
        }

        var bucket = new RqlQuery('bucket');
        bucket.args.push(bucketField);
        aggregate.args.push(bucket);

        // variable RQL
        var variable;
        parsedQuery.args.forEach(function (arg) {
          if (!variable && arg.name === 'variable') {
            variable = arg;
          }
        });
        if (!variable) {
          variable = new RqlQuery('variable');
          parsedQuery.args.push(variable);
        }

        if (variable.args.length > 0 && variable.args[0].name !== 'limit') {
          var variableType = new RqlQuery('in');
          variableType.args.push('Mica_variable.variableType');
          if (filterBy === undefined) {
            if (bucketArg === BUCKET_TYPES.DATASET_HARMONIZED || bucketArg === BUCKET_TYPES.DATASCHEMA) {
              variableType.args.push('Dataschema');
            } else {
              variableType.args.push(['Collected','Dataschema']);
            }
          } else if (['individual', 'collected'].indexOf(filterBy) > -1) {
            variableType.args.push('Collected');
          } else if (['harmonization', 'harmonized'].indexOf(filterBy) > -1) {
            variableType.args.push('Dataschema');
          }
          var andVariableType = new RqlQuery('and');
          andVariableType.args.push(variableType);
          andVariableType.args.push(variable.args[0]);
          variable.args[0] = andVariableType;
        }

        variable.args.push(aggregate);

        return parsedQuery.serializeArgs(parsedQuery.args);
      };

      this.prepareGraphicsQuery = function (query, aggregateArgs, bucketArgs) {
        var parsedQuery = this.parseQuery(query);
        // aggregate
        var aggregate = new RqlQuery(RQL_NODE.AGGREGATE);
        aggregateArgs.forEach(function (a) {
          aggregate.args.push(a);
        });
        //bucket
        if (bucketArgs && bucketArgs.length > 0) {
          var bucket = new RqlQuery(RQL_NODE.BUCKET);
          bucketArgs.forEach(function (b) {
            bucket.args.push(b);
          });
          aggregate.args.push(bucket);
        }

        // study
        var study;
        var hasQuery = false;
        var hasStudyTarget = false;
        parsedQuery.args.forEach(function (arg) {
          if (arg.name === 'study') {
            hasStudyTarget = true;
            var limitIndex = null;
            hasQuery = arg.args.filter(function (requestArg, index) {
              if (requestArg.name === 'limit') {
                limitIndex = index;
              }
              return ['limit', 'sort', 'aggregate'].indexOf(requestArg.name) < 0;
            }).length;
            if (limitIndex !== null) {
              arg.args.splice(limitIndex, 1);
            }
            study = arg;
          }
        });
        // Study match all if no study query.
        if (!hasStudyTarget) {
          study = new RqlQuery('study');
          parsedQuery.args.push(study);
        }
        if (!hasQuery) {
          study.args.push(new RqlQuery(RQL_NODE.MATCH));
        }
        study.args.push(aggregate);
        // facet
        parsedQuery.args.push(new RqlQuery('facet'));
        return parsedQuery.serializeArgs(parsedQuery.args);
      };

      this.getTargetAggregations = function (joinQueryResponse, criterion, lang) {

        /**
         * Helper to merge the terms that are not in the aggregation list
         *
         * @param aggs
         * @param vocabulary
         * @returns Array of aggs
         */
        function addMissingTerms(aggs, vocabulary) {
          var terms = vocabulary.terms;
          if (terms && terms.length > 0) {
            var keys = aggs && aggs.map(function (agg) {
                return agg.key;
              }) || [];

            if (aggs) {
              // Add the missing terms not present in the aggs list
              var missingTerms = [];

              terms.forEach(function (term) {
                if (keys.length === 0 || keys.indexOf(term.name) === -1) {
                  missingTerms.push({
                    count: 0,
                    default: 0,
                    description: LocalizedValues.forLocale(term.description, lang),
                    key: term.name,
                    title: LocalizedValues.forLocale(term.title, lang)
                  });
                }
              });

              return aggs.concat(missingTerms);
            }

            // The query didn't have any match, return default empty aggs based on the vocabulary terms
            return terms.map(function (term) {
              return {
                count: 0,
                default: 0,
                description: LocalizedValues.forLocale(term.description, lang),
                key: term.name,
                title: LocalizedValues.forLocale(term.title, lang)
              };
            });

          }

          return aggs;
        }

        function getChildAggragations(parentAgg, aggKey) {
          if (parentAgg.children) {
            var child = parentAgg.children.filter(function (child) {
              return child.hasOwnProperty(aggKey);
            }).pop();

            if (child) {
              return child[aggKey];
            }
          }

          return null;
        }

        var alias = VocabularyService.vocabularyAlias(criterion.vocabulary);
        var targetResponse = joinQueryResponse[criterion.target + 'ResultDto'];

        if (targetResponse && targetResponse.aggs) {
          var isProperty = criterion.taxonomy.name.startsWith('Mica_');
          var filter = isProperty ? alias : criterion.taxonomy.name;
          var filteredAgg = targetResponse.aggs.filter(function (agg) {
            return agg.aggregation === filter;
          }).pop();

          if (filteredAgg) {
            if (isProperty) {
              if (VocabularyService.isNumericVocabulary(criterion.vocabulary)) {
                return filteredAgg['obiba.mica.StatsAggregationResultDto.stats'];
              } else {
                return VocabularyService.isRangeVocabulary(criterion.vocabulary) ?
                  addMissingTerms(filteredAgg['obiba.mica.RangeAggregationResultDto.ranges'], criterion.vocabulary) :
                  addMissingTerms(filteredAgg['obiba.mica.TermsAggregationResultDto.terms'], criterion.vocabulary);
              }
            } else {
              var vocabularyAgg = filteredAgg.children.filter(function (agg) {
                return agg.aggregation === alias;
              }).pop();

              if (vocabularyAgg) {
                return VocabularyService.isRangeVocabulary(criterion.vocabulary) ?
                  addMissingTerms(getChildAggragations(filteredAgg, 'obiba.mica.RangeAggregationResultDto.ranges'), criterion.vocabulary) :
                  addMissingTerms(getChildAggragations(filteredAgg, 'obiba.mica.TermsAggregationResultDto.terms'), criterion.vocabulary);
              }
            }
          }
        }

        return addMissingTerms([], criterion.vocabulary);
      };

      this.findCriterion = function(criteria, id) {
        function inner(criteria, id) {
          var result;
          if(criteria.id === id) { return criteria; }
          var children = criteria.children.filter(function (childCriterion) { return childCriterion instanceof CriteriaItem; });

          for(var i = children.length; i--;){
            result = inner(children[i], id);

            if (result) {return result;}
          }
        }
        
        return inner(criteria, id);
      };
    }]);
;/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

/* global BUCKET_TYPES */
/* global RQL_NODE */
/* global QUERY_TARGETS */

/* exported STUDY_FILTER_CHOICES */
var STUDY_FILTER_CHOICES = {
  ALL_STUDIES: 'all',
  INDIVIDUAL_STUDIES: 'individual',
  HARMONIZATION_STUDIES: 'harmonization'
};

/**
 * Module services and factories
 */
ngObibaMica.search
  .factory('TaxonomiesSearchResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
      return $resource(ngObibaMicaUrl.getUrl('TaxonomiesSearchResource'), {}, {
        'get': {
          method: 'GET',
          isArray: true,
          errorHandler: true
        }
      });
    }])

  .factory('TaxonomiesResource', ['$resource', 'ngObibaMicaUrl', '$cacheFactory',
    function ($resource, ngObibaMicaUrl, $cacheFactory) {
      return $resource(ngObibaMicaUrl.getUrl('TaxonomiesResource'), {}, {
        'get': {
          method: 'GET',
          isArray: true,
          errorHandler: true,
          cache: $cacheFactory('taxonomiesResource')
        }
      });
    }])

  .factory('TaxonomyResource', ['$resource', 'ngObibaMicaUrl', '$cacheFactory',
    function ($resource, ngObibaMicaUrl, $cacheFactory) {
      return $resource(ngObibaMicaUrl.getUrl('TaxonomyResource'), {}, {
        'get': {
          method: 'GET',
          errorHandler: true,
          cache: $cacheFactory('taxonomyResource')
        }
      });
    }])

  .factory('JoinQuerySearchResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
      var resourceUrl = ngObibaMicaUrl.getUrl('JoinQuerySearchResource');
      var actionFactory = function(type) {
        var method = resourceUrl.indexOf(':query') === -1 ? 'POST' : 'GET';
        var contentType = method === 'POST' ? 'application/x-www-form-urlencoded' : 'application/json';
        var requestTransformer = function(obj) {
          var str = [];
          for(var p in obj) {
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
          params: {type: type},
          transformRequest : requestTransformer
        };
      };
      return $resource(resourceUrl, {}, {
        'variables': actionFactory('variables'),
        'studies': actionFactory('studies'),
        'networks': actionFactory('networks'),
        'datasets': actionFactory('datasets')
      });
    }])

  .factory('JoinQueryCoverageResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
      var resourceUrl = ngObibaMicaUrl.getUrl('JoinQueryCoverageResource');
      var method = resourceUrl.indexOf(':query') === -1 ? 'POST' : 'GET';
      var contentType = method === 'POST' ? 'application/x-www-form-urlencoded' : 'application/json';
      var requestTransformer = function(obj) {
        var str = [];
        for(var p in obj) {
          str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        }
        return str.join('&');
      };
      return $resource(resourceUrl, {}, {
        'get': {
          method: method,
          headers: {
            'Content-Type': contentType
          },
          transformRequest : requestTransformer,
          errorHandler: true
        }
      });
    }])

  .factory('VocabularyResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
      return $resource(ngObibaMicaUrl.getUrl('VocabularyResource'), {}, {
        'get': {
          method: 'GET',
          errorHandler: true
        }
      });
    }])

  .factory('DocumentSuggestionResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
      return $resource(ngObibaMicaUrl.getUrl('DocumentSuggestion'), {}, {
        'query': {
          method: 'GET',
          errorHandler: true,
          isArray: true
        }
      });
    }])

  .service('StudyFilterShortcutService', ['$location', 'RqlQueryService',
    function ($location, RqlQueryService) {
      function getCurrentClassName(rqlQuery) {
        rqlQuery = rqlQuery || RqlQueryService.parseQuery($location.search().query);
        var targetQuery = RqlQueryService.findTargetQuery(QUERY_TARGETS.STUDY, rqlQuery);
        var className;

        if (targetQuery) {
          className = RqlQueryService.findQueryInTargetByVocabulary(targetQuery, 'className');
        }

        return className;
      }

      function classNameQueryHasArgValue(className, argValue) {
        return !className ||
            (Array.isArray(className.args[1]) ? className.args[1].indexOf(argValue) > -1 : className.args[1] === argValue);
      }

      function classNameQueryHasStudyArg(className) {
        return classNameQueryHasArgValue(className, 'Study');
      }

      function classNameQueryHasHarmonizationStudyArg(className) {
        return classNameQueryHasArgValue(className, 'HarmonizationStudy');
      }

      function classNameQueryIsExists(className) {
        return !className ||
            className.name === RQL_NODE.EXISTS ||
            (classNameQueryHasStudyArg(className) && classNameQueryHasHarmonizationStudyArg(className));
      }

      this.filter = function (choice) {
        var parsedQuery = RqlQueryService.parseQuery($location.search().query);
        var foundStudyClassNameQuery = getCurrentClassName(parsedQuery);
        var studyClassNameQuery;

        if (foundStudyClassNameQuery) {
          studyClassNameQuery = foundStudyClassNameQuery;
          if (studyClassNameQuery.name === RQL_NODE.EXISTS) {
            studyClassNameQuery.name = RQL_NODE.IN;
          }
        } else {
          studyClassNameQuery = new RqlQuery(RQL_NODE.IN);
        }

        studyClassNameQuery.args = ['Mica_study.className'];

        switch (choice) {
          case STUDY_FILTER_CHOICES.INDIVIDUAL_STUDIES:
            studyClassNameQuery.args.push('Study');
            break;
          case STUDY_FILTER_CHOICES.HARMONIZATION_STUDIES:
            studyClassNameQuery.args.push('HarmonizationStudy');
            break;
          case STUDY_FILTER_CHOICES.ALL_STUDIES:
            studyClassNameQuery.args.push(['Study', 'HarmonizationStudy']);
            break;
        }

        if (!foundStudyClassNameQuery) {
          var study = RqlQueryService.findTargetQuery(QUERY_TARGETS.STUDY, parsedQuery);
          if (!study) {
            study = new RqlQuery(QUERY_TARGETS.STUDY);
            parsedQuery.args.push(study);
          }

          if (study.args.length > 0) {
            var andStudyClassName = new RqlQuery(RQL_NODE.AND);
            study.args.forEach(function (arg) { andStudyClassName.args.push(arg); });
            andStudyClassName.args.push(studyClassNameQuery);
            study.args = [andStudyClassName];
          } else {
            study.args = [studyClassNameQuery];
          }
        }

        $location.search('query', new RqlQuery().serializeArgs(parsedQuery.args));
      };

      this.getStudyClassNameChoices = function () {
        return {
          choseAll:classNameQueryIsExists(getCurrentClassName()),
          choseIndividual: classNameQueryHasStudyArg(getCurrentClassName()),
          choseHarmonization: classNameQueryHasHarmonizationStudyArg(getCurrentClassName())
        };
      };
    }
  ])

  .service('SearchContext', function() {
    var selectedLocale = null;

    this.setLocale = function(locale) {
      selectedLocale = locale;
    };

    this.currentLocale = function() {
      return selectedLocale;
    };
  })

  .service('PageUrlService', ['ngObibaMicaUrl', 'StringUtils', 'urlEncode', function(ngObibaMicaUrl, StringUtils, urlEncode) {

    this.studyPage = function(id, type) {
      var sType = (type.toLowerCase().indexOf('individual') > -1 ? 'individual' : 'harmonization') + '-study';
      return id ? StringUtils.replaceAll(ngObibaMicaUrl.getUrl('StudyPage'), {':type': urlEncode(sType), ':study': urlEncode(id)}) : '';
    };

    this.studyPopulationPage = function(id, type, populationId) {
      var sType = (type.toLowerCase() === 'individual' ? 'individual' : 'harmonization') + '-study';
      return id ? StringUtils.replaceAll(ngObibaMicaUrl.getUrl('StudyPopulationsPage'), {':type': urlEncode(sType), ':study': urlEncode(id), ':population': urlEncode(populationId)}) : '';
    };

    this.networkPage = function(id) {
      return  id ? StringUtils.replaceAll(ngObibaMicaUrl.getUrl('NetworkPage'), {':network': urlEncode(id)}) : '';
    };

    this.datasetPage = function(id, type) {
      var dsType = (type.toLowerCase() === 'collected' ? 'collected' : 'harmonized') + '-dataset';
      return id ? StringUtils.replaceAll(ngObibaMicaUrl.getUrl('DatasetPage'), {':type': urlEncode(dsType), ':dataset': urlEncode(id)}) : '';
    };

    this.variablePage = function(id) {
      return id ? StringUtils.replaceAll(ngObibaMicaUrl.getUrl('VariablePage'), {':variable': urlEncode(id)}) : '';
    };

    this.downloadCoverage = function(query) {
      return StringUtils.replaceAll(ngObibaMicaUrl.getUrl('JoinQueryCoverageDownloadResource'), {':query': query});
    };

    return this;
  }])

  .service('ObibaSearchConfig', function () {
    var options = {
      networks: {
        showSearchTab:1
      },
      studies: {
        showSearchTab:1
      },
      datasets: {
        showSearchTab:1
      },
      variables: {
        showSearchTab:1
      }
    };

    this.setOptions = function (newOptions) {
      if (typeof(newOptions) === 'object') {
        Object.keys(newOptions).forEach(function (option) {
          if (option in options) {
            options[option] = newOptions[option];
          }
        });
      }
    };

    this.getOptions = function () {
      return angular.copy(options);
    };
  })

  .service('CoverageGroupByService', ['ngObibaMicaSearch', function(ngObibaMicaSearch) {
    var self = this;

    var options = ngObibaMicaSearch.getOptions();
    var groupByOptions = options.coverage.groupBy;

    this.isSingleStudy = function() {
      // coverage => there are datasets and at least one study
      // not showing study means that there is only one
      return !options.studies.showSearchTab;// || 
    };

    this.canShowStudyType = function() {
      // showing study type column means that there are several
      return options.studies.studiesColumn.showStudiesTypeColumn;
    };

    this.canShowStudy = function() {
      return groupByOptions.study || groupByOptions.dce;
    };

    this.canShowDce = function(bucket) {
      return (bucket.indexOf('study') > -1 || bucket.indexOf('dce') > -1) && groupByOptions.study && groupByOptions.dce;
    };

    this.canShowDataset = function() {
      return groupByOptions.dataset;
    };

    this.canShowVariableTypeFilter = function(bucket) {
      var forStudy = (bucket.indexOf('study') > -1 || bucket.indexOf('dce') > -1) && (groupByOptions.study);
      var forDataset = bucket.indexOf('dataset') > -1 && groupByOptions.dataset;

      return forStudy || forDataset;
    };

    this.studyTitle = function() {
      return 'search.coverage-buckets.study';
    };

    this.studyBucket = function() {
      return BUCKET_TYPES.STUDY;
    };

    this.dceBucket = function () {
      if (groupByOptions.study && groupByOptions.dce) {
        return BUCKET_TYPES.DCE;
      } else {
        return this.studyBucket();
      }
    };

    this.datasetTitle = function() {
      return 'search.coverage-buckets.dataset';
    };

    this.datasetBucket = function() {
      return BUCKET_TYPES.DATASET;
    };

    this.canGroupBy = function(bucket) {
      var isAllowed = false;

      switch (bucket) {
        case BUCKET_TYPES.STUDY:
        case BUCKET_TYPES.STUDY_INDIVIDUAL:
        case BUCKET_TYPES.STUDY_HARMONIZATION:
          isAllowed = groupByOptions.study;
          break;
        case BUCKET_TYPES.DCE:
        case BUCKET_TYPES.DCE_INDIVIDUAL:
        case BUCKET_TYPES.DCE_HARMONIZATION:
          isAllowed = groupByOptions.dce;
          break;
        case BUCKET_TYPES.DATASET:
        case BUCKET_TYPES.DATASET_COLLECTED:
        case BUCKET_TYPES.DATASCHEMA:
        case BUCKET_TYPES.DATASET_HARMONIZED:
          isAllowed = groupByOptions.dataset;
      }
      return isAllowed;
    };

    this.defaultBucket = function() {
      if (groupByOptions.study) {
        if (options.studies.showSearchTab) {
          return self.studyBucket();
        } else {
          return self.dceBucket();
        }
      } else if (groupByOptions.dataset) {
        return self.datasetBucket();
      }

      return '';
    };

  }])

  .factory('CriteriaNodeCompileService', ['$templateCache', '$compile', function($templateCache, $compile){

    return {
      compile: function(scope, element) {
        var template = '';
        if (scope.item.type === RQL_NODE.OR || scope.item.type === RQL_NODE.AND || scope.item.type === RQL_NODE.NAND || scope.item.type === RQL_NODE.NOR) {
          template = angular.element($templateCache.get('search/views/criteria/criteria-node-template.html'));
        } else {
          template = angular.element('<criterion-dropdown criterion="item" query="query"></criterion-dropdown>');
        }

        if (scope.item.rqlQuery.args) {
          $compile(template)(scope, function(cloned){
            element.replaceWith(cloned);
          });
        }
      }
    };

  }]);
;/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

/* global CRITERIA_ITEM_EVENT */
/* global QUERY_TARGETS */
/* global QUERY_TYPES */
/* global BUCKET_TYPES */
/* global RQL_NODE */
/* global DISPLAY_TYPES */
/* global CriteriaIdGenerator */
/* global targetToType */
/* global typeToTarget */
/* global SORT_FIELDS */
/* global STUDY_FILTER_CHOICES */

/**
 * State shared between Criterion DropDown and its content directives
 *
 * @constructor
 */
function CriterionState() {
  var onOpenCallbacks = [];
  var onCloseCallbacks = [];

  this.dirty = false;
  this.open = false;
  this.loading = true;

  this.addOnOpen = function (callback) {
    onOpenCallbacks.push(callback);
  };

  this.addOnClose = function (callback) {
    onCloseCallbacks.push(callback);
  };

  this.onOpen = function () {
    onOpenCallbacks.forEach(function (callback) {
      callback();
    });
  };

  this.onClose = function () {
    onCloseCallbacks.forEach(function (callback) {
      callback();
    });
  };
}

/**
 * Base controller for taxonomies and classification panels.
 *
 * @param $scope
 * @param $location
 * @param TaxonomyResource
 * @param TaxonomiesResource
 * @param ngObibaMicaSearch
 * @constructor
 */
function BaseTaxonomiesController($rootScope,
                                  $scope,
                                  $translate,
                                  $location,
                                  TaxonomyResource,
                                  TaxonomiesResource,
                                  ngObibaMicaSearch,
                                  RqlQueryUtils,
                                  $cacheFactory,
                                  VocabularyService) {

  $scope.options = ngObibaMicaSearch.getOptions();
  $scope.RqlQueryUtils = RqlQueryUtils;
  $scope.metaTaxonomy = TaxonomyResource.get({
    target: 'taxonomy',
    taxonomy: 'Mica_taxonomy'
  });

  $scope.taxonomies = {
    all: [],
    search: {
      text: null,
      active: false
    },
    target: $scope.target || 'variable',
    taxonomy: null,
    vocabulary: null
  };

  $rootScope.$on('$translateChangeSuccess', function () {
    if ($scope.taxonomies && $scope.taxonomies.vocabulary) {
      VocabularyService.sortVocabularyTerms($scope.taxonomies.vocabulary, $translate.use());
    }
  });

  // vocabulary (or term) will appear in navigation iff it doesn't have the 'showNavigate' attribute
  $scope.canNavigate = function(vocabulary) {
    if ($scope.options.hideNavigate.indexOf(vocabulary.name) > -1) {
      return false;
    }

    return (vocabulary.attributes || []).filter(function (attr) { return attr.key === 'showNavigate'; }).length === 0;
  };

  this.navigateTaxonomy = function (taxonomy, vocabulary, term) {
    $scope.taxonomies.term = term;

    if ($scope.isHistoryEnabled) {
      var search = $location.search();
      search.taxonomy = taxonomy ? taxonomy.name : null;

      if (vocabulary && search.vocabulary !== vocabulary.name) {
        VocabularyService.sortVocabularyTerms(vocabulary, $scope.lang);
        search.vocabulary = vocabulary.name;
      } else {
        search.vocabulary = null;
      }

      $location.search(search);
    } else {
      $scope.taxonomies.taxonomy = taxonomy;

      if (!$scope.taxonomies.vocabulary || $scope.taxonomies.vocabulary.name !== vocabulary.name) {
        VocabularyService.sortVocabularyTerms(vocabulary, $scope.lang);
      }

      $scope.taxonomies.vocabulary = vocabulary;
    }
  };

  this.updateStateFromLocation = function () {
    var search = $location.search();
    var taxonomyName = search.taxonomy,
      vocabularyName = search.vocabulary, taxonomy = null, vocabulary = null;

    if (!$scope.taxonomies.all) { //page loading
      return;
    }

    $scope.taxonomies.all.forEach(function (t) {
      if (t.name === taxonomyName) {
        taxonomy = t;
        t.vocabularies.forEach(function (v) {
          if (v.name === vocabularyName) {
            vocabulary = v;
          }
        });
      }
    });

    if (!angular.equals($scope.taxonomies.taxonomy, taxonomy) || !angular.equals($scope.taxonomies.vocabulary, vocabulary)) {
      $scope.taxonomies.taxonomy = taxonomy;

      if(vocabulary) {
        VocabularyService.sortVocabularyTerms(vocabulary, $scope.lang);
      }

      $scope.taxonomies.vocabulary = vocabulary;
    }
  };

  this.selectTerm = function (target, taxonomy, vocabulary, args) {
    $scope.onSelectTerm(target, taxonomy, vocabulary, args);
  };

  this.clearCache = function () {
    var taxonomyResourceCache = $cacheFactory.get('taxonomyResource');
    if (taxonomyResourceCache) {
      taxonomyResourceCache.removeAll();
    }
  };

  var self = this;

  $scope.$on('$locationChangeSuccess', function () {
    if ($scope.isHistoryEnabled) {
      self.updateStateFromLocation();
    }
  });
  $scope.$watch('taxonomies.vocabulary', function(value) {
    if(RqlQueryUtils && value) {
      $scope.taxonomies.isNumericVocabulary = VocabularyService.isNumericVocabulary($scope.taxonomies.vocabulary);
      $scope.taxonomies.isMatchVocabulary = VocabularyService.isMatchVocabulary($scope.taxonomies.vocabulary);
    } else {
      $scope.taxonomies.isNumericVocabulary = null;
      $scope.taxonomies.isMatchVocabulary = null;
    }
  });

  $scope.navigateTaxonomy = this.navigateTaxonomy;
  $scope.selectTerm = this.selectTerm;
  $scope.clearCache = this.clearCache;
}
/**
 * TaxonomiesPanelController
 *
 * @param $rootScope
 * @param $scope
 * @param $translate
 * @param $location
 * @param TaxonomyResource
 * @param TaxonomiesResource
 * @param ngObibaMicaSearch
 * @param RqlQueryUtils
 * @param $cacheFactory
 * @param AlertService
 * @param ServerErrorUtils
 * @constructor
 */
function TaxonomiesPanelController($rootScope,
                                   $scope,
                                   $translate,
                                   $location,
                                   TaxonomyResource,
                                   TaxonomiesResource,
                                   ngObibaMicaSearch,
                                   RqlQueryUtils,
                                   $cacheFactory,
                                   AlertService,
                                   ServerErrorUtils,
                                   VocabularyService) {
  BaseTaxonomiesController.call(this,
    $rootScope,
    $scope,
    $translate,
    $location,
    TaxonomyResource,
    TaxonomiesResource,
    ngObibaMicaSearch,
    RqlQueryUtils,
    $cacheFactory,
    VocabularyService);

  function getPanelTaxonomies(target, taxonomyName) {
    TaxonomyResource.get({
      target: target,
      taxonomy: taxonomyName
    }, function onSuccess(response) {
      $scope.taxonomies.taxonomy = response;
      $scope.taxonomies.vocabulary = null;
      $scope.taxonomies.term = null;
      $scope.taxonomies.search.active = false;
    }, function onError(response) {
      $scope.taxonomies.search.active = false;

      AlertService.alert({
        id: 'SearchController',
        type: 'danger',
        msg: ServerErrorUtils.buildMessage(response),
        delay: 5000
      });
    });
  }

  $scope.$watchGroup(['taxonomyName', 'target'], function (newVal) {
    if (newVal[0] && newVal[1]) {
      if ($scope.showTaxonomies) {
        $scope.showTaxonomies();
      }
      $scope.taxonomies.target = newVal[1];
      $scope.taxonomies.search.active = true;
      $scope.taxonomies.all = null;
      $scope.taxonomies.taxonomy = null;
      $scope.taxonomies.vocabulary = null;
      $scope.taxonomies.term = null;

      getPanelTaxonomies(newVal[1], newVal[0]);
    }
  });

  this.refreshTaxonomyCache = function (target, taxonomyName) {
    $scope.clearCache();
    getPanelTaxonomies(target, taxonomyName);
  };

  $scope.refreshTaxonomyCache = this.refreshTaxonomyCache;
}
/**
 * ClassificationPanelController
 *
 * @param $rootScope
 * @param $scope
 * @param $translate
 * @param $location
 * @param TaxonomyResource
 * @param TaxonomiesResource
 * @param ngObibaMicaSearch
 * @param RqlQueryUtils
 * @param $cacheFactory
 * @param VocabularyService
 * @constructor
 */
function ClassificationPanelController($rootScope,
                                       $scope,
                                       $translate,
                                       $location,
                                       TaxonomyResource,
                                       TaxonomiesResource,
                                       ngObibaMicaSearch,
                                       RqlQueryUtils,
                                       $cacheFactory,
                                       VocabularyService) {
  BaseTaxonomiesController.call(this,
    $rootScope,
    $scope,
    $translate,
    $location,
    TaxonomyResource,
    TaxonomiesResource,
    ngObibaMicaSearch,
    RqlQueryUtils,
    $cacheFactory,
    VocabularyService);

  var groupTaxonomies = function (taxonomies, target) {
    var res = taxonomies.reduce(function (res, t) {
      if(target){
        t.vocabularies = VocabularyService.visibleVocabularies(t.vocabularies);
        res[t.name] = t;
        return res;
      }
    }, {});

    return $scope.metaTaxonomy.$promise.then(function (metaTaxonomy) {
      var targetVocabulary = metaTaxonomy.vocabularies.filter(function (v) {
        return v.name === target;
      })[0];

      $scope.taxonomyGroups = targetVocabulary.terms.map(function (v) {
        if (!v.terms) {
          var taxonomy = res[v.name];

          if (!taxonomy) {
            return null;
          }

          taxonomy.title = v.title;
          taxonomy.description = v.description;
          return {title: null, taxonomies: [taxonomy]};
        }

        var taxonomies = v.terms.map(function (t) {
          var taxonomy = res[t.name];

          if (!taxonomy) {
            return null;
          }

          taxonomy.title = t.title;
          taxonomy.description = t.description;
          return taxonomy;
        }).filter(function (t) {
          return t;
        });
        var title = v.title.filter(function (t) {
          return t.locale === $scope.lang;
        })[0];
        var description = v.description ? v.description.filter(function (t) {
          return t.locale === $scope.lang;
        })[0] : undefined;

        return {
          title: title ? title.text : null,
          description: description ? description.text : null,
          taxonomies: taxonomies
        };
      }).filter(function (t) {
        return t;
      });
    });
  };

  var self = this;

  function getClassificationTaxonomies() {
    TaxonomiesResource.get({
      target: $scope.taxonomies.target
    }, function onSuccess(taxonomies) {
      $scope.taxonomies.all = taxonomies;
      groupTaxonomies(taxonomies, $scope.taxonomies.target);
      $scope.taxonomies.search.active = false;
      self.updateStateFromLocation();
    });
  }

  $scope.$watch('target', function (newVal) {
    if (newVal) {
      $scope.taxonomies.target = newVal;
      $scope.taxonomies.search.active = true;
      $scope.taxonomies.all = null;
      $scope.taxonomies.taxonomy = null;
      $scope.taxonomies.vocabulary = null;
      $scope.taxonomies.term = null;

      getClassificationTaxonomies();
    }
  });

  this.refreshTaxonomyCache = function () {
    $scope.clearCache();
    getClassificationTaxonomies();
  };

  $scope.refreshTaxonomyCache = this.refreshTaxonomyCache;
}

ngObibaMica.search

  .controller('SearchController', [
    '$scope',
    '$rootScope',
    '$timeout',
    '$routeParams',
    '$location',
    '$translate',
    '$filter',
    '$cookies',
    'TaxonomiesSearchResource',
    'TaxonomiesResource',
    'TaxonomyResource',
    'VocabularyResource',
    'ngObibaMicaSearchTemplateUrl',
    'ObibaServerConfigResource',
    'JoinQuerySearchResource',
    'JoinQueryCoverageResource',
    'AlertService',
    'ServerErrorUtils',
    'LocalizedValues',
    'RqlQueryService',
    'RqlQueryUtils',
    'SearchContext',
    'CoverageGroupByService',
    'VocabularyService',
    'LocaleStringUtils',
    'StringUtils',
    'EntitySuggestionRqlUtilityService',
    'options',
    function ($scope,
              $rootScope,
              $timeout,
              $routeParams,
              $location,
              $translate,
              $filter,
              $cookies,
              TaxonomiesSearchResource,
              TaxonomiesResource,
              TaxonomyResource,
              VocabularyResource,
              ngObibaMicaSearchTemplateUrl,
              ObibaServerConfigResource,
              JoinQuerySearchResource,
              JoinQueryCoverageResource,
              AlertService,
              ServerErrorUtils,
              LocalizedValues,
              RqlQueryService,
              RqlQueryUtils,
              SearchContext,
              CoverageGroupByService,
              VocabularyService,
              LocaleStringUtils,
              StringUtils,
              EntitySuggestionRqlUtilityService,
              options) {

      $scope.options = options;
      var cookiesSearchHelp = 'micaHideSearchHelpText';
      var cookiesClassificationHelp = 'micaHideClassificationHelpBox';

      $translate(['search.help', 'search.coverage-help'])
        .then(function (translation) {
          if(!$scope.options.SearchHelpText && !$cookies.get(cookiesSearchHelp)){
            $scope.options.SearchHelpText = translation['search.help'];
          }
          if(!$scope.options.ClassificationHelpText && !$cookies.get(cookiesClassificationHelp)){
            $scope.options.ClassificationHelpText = translation['classifications.help'];
          }
        });
      // Close the Help search box and set the local cookies
      $scope.closeHelpBox = function () {
        $cookies.put(cookiesSearchHelp, true);
        $scope.options.SearchHelpText = null;
      };

      // Close the Help classification box and set the local cookies
      $scope.closeClassificationHelpBox = function () {
        $cookies.put(cookiesClassificationHelp, true);
        $scope.options.ClassificationHelpText = null;
      };

      // Retrieve from local cookies if user has disabled the Help Search Box and hide the box if true
      if ($cookies.get(cookiesSearchHelp)) {
        $scope.options.SearchHelpText = null;
      }
      // Retrieve from local cookies if user has disabled the Help Classification Box and hide the box if true
      if ($cookies.get(cookiesClassificationHelp)) {
        $scope.options.ClassificationHelpText = null;
      }

      $scope.taxonomyTypeMap = { //backwards compatibility for pluralized naming in configs.
        variable: 'variables',
        study: 'studies',
        network: 'networks',
        dataset: 'datasets'
      };

      $translate(['search.classifications-title', 'search.classifications-link', 'search.faceted-navigation-help'])
        .then(function (translation) {
          $scope.hasClassificationsTitle = translation['search.classifications-title'];
          $scope.hasClassificationsLinkLabel = translation['search.classifications-link'];
          $scope.hasFacetedNavigationHelp = translation['search.faceted-navigation-help'];
        });

      var searchTaxonomyDisplay = {
        variable: $scope.options.variables.showSearchTab,
        dataset: $scope.options.datasets.showSearchTab,
        study: $scope.options.studies.showSearchTab,
        network: $scope.options.networks.showSearchTab
      };
      var taxonomyTypeInverseMap = Object.keys($scope.taxonomyTypeMap).reduce(function (prev, k) {
        prev[$scope.taxonomyTypeMap[k]] = k;
        return prev;
      }, {});
      $scope.targets = [];
      $scope.lang = $translate.use();
      $scope.metaTaxonomy = TaxonomyResource.get({
        target: 'taxonomy',
        taxonomy: 'Mica_taxonomy'
      }, function (t) {
        var stuff = t.vocabularies.map(function (v) {
          return v.name;
        });

        $scope.targets = stuff.filter(function (target) {
          return searchTaxonomyDisplay[target];
        });

        function flattenTaxonomies(terms){
          function inner(acc, terms) {
            angular.forEach(terms, function(t) {
              if(!t.terms) {
                acc.push(t);
                return;
              }

              inner(acc, t.terms);
            });

            return acc;
          }

          return inner([], terms);
        }

        $scope.hasFacetedTaxonomies = false;

        $scope.facetedTaxonomies = t.vocabularies.reduce(function(res, target) {
          var taxonomies = flattenTaxonomies(target.terms);

          function getTaxonomy(taxonomyName) {
            return taxonomies.filter(function(t) {
              return t.name === taxonomyName;
            })[0];
          }

          function notNull(t) {
            return t !== null && t !== undefined;
          }

          if($scope.options.showAllFacetedTaxonomies) {
            res[target.name] = taxonomies.filter(function(t) {
              return t.attributes && t.attributes.some(function(att) {
                  return att.key === 'showFacetedNavigation' &&  att.value.toString() === 'true';
                });
            });
          } else {
            res[target.name] = ($scope.options[target.name + 'TaxonomiesOrder'] || []).map(getTaxonomy).filter(notNull);
          }

          $scope.hasFacetedTaxonomies = $scope.hasFacetedTaxonomies || res[target.name].length;

          return res;
        }, {});
      });

      function initSearchTabs() {
        $scope.taxonomyNav = [];

        function getTabsOrderParam(arg) {
          var value = $location.search()[arg];

          return value && value.split(',')
              .filter(function (t) {
                return t;
              })
              .map(function (t) {
                return t.trim();
              });
        }

        var targetTabsOrderParam = getTabsOrderParam('targetTabsOrder');
        $scope.targetTabsOrder = (targetTabsOrderParam || $scope.options.targetTabsOrder).filter(function (t) {
          return searchTaxonomyDisplay[t];
        });

        var searchTabsOrderParam = getTabsOrderParam('searchTabsOrder');
        $scope.searchTabsOrder = searchTabsOrderParam || $scope.options.searchTabsOrder;

        var resultTabsOrderParam = getTabsOrderParam('resultTabsOrder');
        $scope.resultTabsOrder = (resultTabsOrderParam || $scope.options.resultTabsOrder).filter(function (t) {
          return searchTaxonomyDisplay[t];
        });

        if($location.search().target) {
          $scope.target = $location.search().target;
        } else if (!$scope.target) {
          $scope.target = $scope.targetTabsOrder[0];
        }

        $scope.metaTaxonomy.$promise.then(function (metaTaxonomy) {
          var tabOrderTodisplay = [];
          $scope.targetTabsOrder.forEach(function (target) {
            var targetVocabulary = metaTaxonomy.vocabularies.filter(function (vocabulary) {
              if(vocabulary.name === target){
                tabOrderTodisplay.push(target);
                return true;
              }
            }).pop();
            if (targetVocabulary && targetVocabulary.terms) {
              targetVocabulary.terms.forEach(function (term) {
                term.target = target;
                var title = term.title.filter(function (t) {
                  return t.locale === $scope.lang;
                })[0];
                var description = term.description ? term.description.filter(function (t) {
                  return t.locale === $scope.lang;
                })[0] : undefined;
                term.locale = {
                  title: title,
                  description: description
                };
                if (term.terms) {
                  term.terms.forEach(function (trm) {
                    var title = trm.title.filter(function (t) {
                      return t.locale === $scope.lang;
                    })[0];
                    var description = trm.description ? trm.description.filter(function (t) {
                      return t.locale === $scope.lang;
                    })[0] : undefined;
                    trm.locale = {
                      title: title,
                      description: description
                    };
                  });
                }
                $scope.taxonomyNav.push(term);
              });
            }
          });
          $scope.targetTabsOrder = tabOrderTodisplay;
        });
      }

      function onError(response) {
        $scope.search.result = {};
        $scope.search.loading = false;
        AlertService.alert({
          id: 'SearchController',
          type: 'danger',
          msg: ServerErrorUtils.buildMessage(response),
          delay: 5000
        });
      }

      function canExecuteWithEmptyQuery() {
        return $scope.search.layout === 'layout2' || $scope.search.query;
      }

      function validateType(type) {
        if (!type || !QUERY_TYPES[type.toUpperCase()]) {
          throw new Error('Invalid type: ' + type);
        }
      }

      function validateBucket(bucket) {
        if (bucket &&
            (!BUCKET_TYPES[bucket.replace('-', '_').toUpperCase()] || !CoverageGroupByService.canGroupBy(bucket))) {
          throw new Error('Invalid bucket ' + bucket);
        }
      }

      function validateDisplay(display) {
        if (!display || !DISPLAY_TYPES[display.toUpperCase()]) {
          throw new Error('Invalid display: ' + display);
        }
      }

      function getDefaultQueryType() {
        return $scope.taxonomyTypeMap[$scope.resultTabsOrder[0]];
      }

      function getDefaultDisplayType() {
        return $scope.searchTabsOrder[0] || DISPLAY_TYPES.LIST;
      }

      function resolveLayout(resolvedOptions) {
        return resolvedOptions.listLayout ? resolvedOptions.listLayout :
            resolvedOptions.searchLayout ? resolvedOptions.searchLayout : 'layout2';
      }

      function validateQueryData() {
        try {
          var search = $location.search();
          var type = $scope.resultTabsOrder.indexOf(taxonomyTypeInverseMap[search.type]) > -1 ? search.type : getDefaultQueryType();
          var bucket = search.bucket && CoverageGroupByService.canGroupBy(search.bucket) ? search.bucket : CoverageGroupByService.defaultBucket();
          var display = $scope.searchTabsOrder.indexOf(search.display) > -1 ? search.display : getDefaultDisplayType();
          var query = search.query || '';
          validateType(type);
          validateBucket(bucket);
          validateDisplay(display);
          $scope.search.type = type;
          $scope.search.bucket = bucket;
          $scope.search.display = display;
          $scope.search.query = query;
          $scope.search.rqlQuery = RqlQueryService.parseQuery(query);
          $scope.search.layout = setLayout(search.layout ? search.layout : resolveLayout($scope.options));

          return true;
        } catch (e) {
          AlertService.alert({
            id: 'SearchController',
            type: 'danger',
            msg: e.message,
            delay: 5000
          });
        }

        return false;
      }

      function setLayout(layout) {
        return layout ? (['layout1', 'layout2'].indexOf(layout) > -1 ? layout : 'layout2') : 'layout2';
      }

      var clearSearchQuery = function () {
        var search = $location.search();
        delete search.query;
        $location.search(search);
      };

      var toggleSearchQuery = function () {
        $scope.search.advanced = !$scope.search.advanced;
      };

      var showAdvanced = function() {
        var children = $scope.search.criteria.children || [];
        for(var i = children.length; i--;) {
          var vocabularyChildren = children[i].children || [];
          for (var j = vocabularyChildren.length; j--;) {
            if (vocabularyChildren[j].type === RQL_NODE.OR || vocabularyChildren[j].type === RQL_NODE.AND) {
              return true;
            }
          }
        }
      };

      function sortCriteriaItems(items) {
        items.sort(function (a, b) {
          if (a.target === 'network' || b.target === 'variable') {
            return -1;
          }
          if (a.target === 'variable' || b.target === 'network') {
            return 1;
          }
          if (a.target < b.target) {
            return 1;
          }
          if (a.target > b.target) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      }

      function loadResults() {
        // execute search only when results are to be shown
        if ($location.path() !== '/search') {
          return;
        }

        function updateSortByType() {
          var rqlSort = RqlQueryService.getTargetQuerySort($scope.search.type, $scope.search.rqlQuery);
          var sort = rqlSort && rqlSort.args ? rqlSort.args : null;

          if (!sort) {
            sort = $scope.search.type === QUERY_TYPES.VARIABLES ? SORT_FIELDS.NAME : SORT_FIELDS.ACRONYM;

            if ($scope.search.type === QUERY_TYPES.VARIABLES) {
              sort = [SORT_FIELDS.VARIABLE_TYPE, SORT_FIELDS.CONTAINER_ID, SORT_FIELDS.POPULATION_WEIGHT, SORT_FIELDS.DATA_COLLECTION_EVENT_WEIGHT, SORT_FIELDS.DATASET_ID, SORT_FIELDS.INDEX, SORT_FIELDS.NAME];
            } else if ($scope.search.type === QUERY_TYPES.DATASETS) {
              sort = [SORT_FIELDS.STUDY_TABLE.STUDY_ID, SORT_FIELDS.STUDY_TABLE.POPULATION_WEIGHT, SORT_FIELDS.STUDY_TABLE.DATA_COLLECTION_EVENT_WEIGHT, SORT_FIELDS.ACRONYM];
            }
          }

          return sort;
        }

        var localizedQuery =
          RqlQueryService.prepareSearchQueryAndSerialize(
            $scope.search.display,
            $scope.search.type,
            $scope.search.rqlQuery,
            $scope.search.pagination,
            $scope.lang,
            updateSortByType()
          );

        function getCountResultFromJoinQuerySearchResponse(response) {
          return {
            studyTotalCount: {
              total: response.studyResultDto.totalCount,
              hits: response.studyResultDto.totalHits
            },
            datasetTotalCount: {
              total: response.datasetResultDto.totalCount,
              hits: response.datasetResultDto.totalHits
            },
            variableTotalCount: {
              total: response.variableResultDto.totalCount,
              hits: response.variableResultDto.totalHits
            },
            networkTotalCount: {
              total: response.networkResultDto.totalCount,
              hits: response.networkResultDto.totalHits
            }
          };
        }

        switch ($scope.search.display) {
          case DISPLAY_TYPES.LIST:
            $scope.search.loading = true;
            $scope.search.executedQuery = localizedQuery;
            JoinQuerySearchResource[$scope.search.type]({query: localizedQuery},
              function onSuccess(response) {
                $scope.search.result.list = response;
                $scope.search.loading = false;
                $scope.search.countResult = getCountResultFromJoinQuerySearchResponse(response);
              },
              onError);
            break;
          case DISPLAY_TYPES.COVERAGE:
            var hasVariableCriteria = Object.keys($scope.search.criteriaItemMap).map(function (k) {
                return $scope.search.criteriaItemMap[k];
              }).filter(function (item) {
                return QUERY_TARGETS.VARIABLE  === item.getTarget() && item.taxonomy.name !== 'Mica_variable';
              }).length > 0;

            if (hasVariableCriteria) {
              $scope.search.loading = true;
              $scope.search.executedQuery = RqlQueryService.prepareCoverageQuery(localizedQuery, $scope.search.bucket);
              JoinQueryCoverageResource.get({query: $scope.search.executedQuery},
                function onSuccess(response) {
                  $scope.search.result.coverage = response;
                  $scope.search.loading = false;
                  $scope.search.countResult = response.totalCounts;
                },
                onError);
            } else {
              $scope.search.result = {};
            }

            break;
          case DISPLAY_TYPES.GRAPHICS:
            $scope.search.loading = true;
            $scope.search.executedQuery = RqlQueryService.prepareGraphicsQuery(localizedQuery,
              ['Mica_study.populations-selectionCriteria-countriesIso', 'Mica_study.populations-dataCollectionEvents-bioSamples', 'Mica_study.numberOfParticipants-participant-number'],
              ['Mica_study.methods-design']);
            JoinQuerySearchResource.studies({query: $scope.search.executedQuery},
              function onSuccess(response) {
                $scope.search.result.graphics = response;
                $scope.search.loading = false;
                $scope.search.countResult = getCountResultFromJoinQuerySearchResponse(response);
              },
              onError);
            break;
        }

      }

      function findAndSetCriteriaItemForTaxonomyVocabularies(target, taxonomy) {
        if (Array.isArray(taxonomy)) {
          taxonomy.forEach(function (subTaxonomy) {
            subTaxonomy.vocabularies.forEach(function (taxonomyVocabulary) {
              taxonomyVocabulary.existingItem =
                  RqlQueryService.findCriteriaItemFromTreeById(target,
                      CriteriaIdGenerator.generate(subTaxonomy, taxonomyVocabulary), $scope.search.criteria, true);
            });
          });
        } else {
          taxonomy.vocabularies.forEach(function (taxonomyVocabulary) {
            taxonomyVocabulary.existingItem =
                RqlQueryService.findCriteriaItemFromTreeById(target,
                    CriteriaIdGenerator.generate(taxonomy, taxonomyVocabulary), $scope.search.criteria, true);
          });
        }
      }

      function executeSearchQuery() {
        if (validateQueryData()) {
          // build the criteria UI
          RqlQueryService.createCriteria($scope.search.rqlQuery, $scope.lang).then(function (result) {
            // criteria UI is updated here
            $scope.search.criteria = result.root;

            if ($scope.search.criteria && $scope.search.criteria.children) {
              sortCriteriaItems($scope.search.criteria.children);
            }

            $scope.search.criteriaItemMap = result.map;

             if (canExecuteWithEmptyQuery()) {
              loadResults();
             }

            if ($scope.search.selectedTarget && $scope.search.selectedTaxonomy) {
              findAndSetCriteriaItemForTaxonomyVocabularies($scope.search.selectedTarget, $scope.search.selectedTaxonomy);
            }

            $scope.$broadcast('ngObibaMicaQueryUpdated', $scope.search.criteria);
          });
        }
      }

      function processTaxonomyVocabulary(target, taxonomy, taxonomyVocabulary) {
        function processExistingItem(existingItem) {
          if (existingItem) {
            if (VocabularyService.isNumericVocabulary(taxonomyVocabulary)) {
              taxonomyVocabulary.rangeTerms = existingItem.getRangeTerms();
            }

            if (VocabularyService.isMatchVocabulary(taxonomyVocabulary)) {
              taxonomyVocabulary.matchString = existingItem.selectedTerms.join('');
            }

            // when vocabulary has terms
            taxonomyVocabulary.wholeVocabularyIsSelected = ['exists','match'].indexOf(existingItem.type) > -1;
            (taxonomyVocabulary.terms || []).forEach(function (term) {
              term.selected = existingItem.type === 'exists' || existingItem.selectedTerms.indexOf(term.name) > -1;
            });
          } else {
            taxonomyVocabulary.rangeTerms = {};
            taxonomyVocabulary.matchString = null;

            // when vocabulary has terms
            taxonomyVocabulary.wholeVocabularyIsSelected = false;
            (taxonomyVocabulary.terms || []).forEach(function (term) {
              term.selected = false;
            });
          }

          taxonomyVocabulary._existingItem = existingItem;
        }

        taxonomyVocabulary.__defineSetter__('existingItem', processExistingItem);
        taxonomyVocabulary.__defineGetter__('existingItem', function () {  return taxonomyVocabulary._existingItem; });

        taxonomyVocabulary.existingItem =
            RqlQueryService.findCriteriaItemFromTreeById(target,
                CriteriaIdGenerator.generate(taxonomy, taxonomyVocabulary), $scope.search.criteria, true);
      }

      function onTaxonomyFilterPanelToggleVisibility(target, taxonomy) {
        if (target && taxonomy) {
          if (Array.isArray(taxonomy)) {
            taxonomy.forEach(function (subTaxonomy) {
              subTaxonomy.vocabularies.forEach(function (taxonomyVocabulary) {
                processTaxonomyVocabulary(target, subTaxonomy, taxonomyVocabulary);
              });
            });
          } else {
            taxonomy.vocabularies.forEach(function (taxonomyVocabulary) {
              processTaxonomyVocabulary(target, taxonomy, taxonomyVocabulary);
            });
          }
        }

        $scope.search.selectedTarget = target;
        $scope.search.selectedTaxonomy = taxonomy;
        $scope.search.showTaxonomyPanel = taxonomy !== null;

        // QUICKFIX for MK-1772 - there is a digest desync and UI misses info, resend the request upon closing
        // A good solution may be a RequestQueue.
        if (!$scope.search.showTaxonomyPanel) {
          loadResults();
        }
      }

      $scope.translateTaxonomyNav = function(t, key) {
        var value = t[key] && t[key].filter(function(item) {
          return item.locale === $translate.use();
        }).pop();

        return value ? value.text : key;
      };

      $rootScope.$on('$translateChangeSuccess', function (event, value) {
        if (value.language !== SearchContext.currentLocale()) {
          $scope.lang = $translate.use();
          SearchContext.setLocale($scope.lang);
          executeSearchQuery();
        }
      });

      var showTaxonomy = function (target, name) {
        if ($scope.target === target && $scope.taxonomyName === name && $scope.taxonomiesShown) {
          $scope.taxonomiesShown = false;
          return;
        }

        $scope.taxonomiesShown = true;
        $scope.target = target;
        $scope.taxonomyName = name;
      };

      var clearTaxonomy = function () {
        $scope.target = null;
        $scope.taxonomyName = null;
      };

      /**
       * Updates the URL location triggering a query execution
       */
      var refreshQuery = function () {
        var query = new RqlQuery().serializeArgs($scope.search.rqlQuery.args);
        var search = $location.search();
        if ('' === query) {
          delete search.query;
        } else {
          search.query = query;
        }
        $location.search(search);
      };

      var clearSearch = function () {
        $scope.documents.search.text = null;
        $scope.documents.search.active = false;
      };

      /**
       * Searches the criteria matching the input query
       *
       * @param query
       * @returns {*}
       */
      var searchCriteria = function (query) {
        // search for taxonomy terms
        // search for matching variables/studies/... count

        function score(item) {
          var result = 0;
          var regExp = new RegExp(query, 'ig');

          if (item.itemTitle.match(regExp)) {
            result = 10;
          } else if (item.itemDescription && item.itemDescription.match(regExp)) {
            result = 8;
          } else if (item.itemParentTitle.match(regExp)) {
            result = 6;
          } else if (item.itemParentDescription && item.itemParentDescription.match(regExp)) {
            result = 4;
          }

          return result;
        }

        // vocabulary (or term) can be used in search if it doesn't have the 'showSearch' attribute
        function canSearch(taxonomyEntity, hideSearchList) {
          if ((hideSearchList || []).indexOf(taxonomyEntity.name) > -1) {
            return false;
          }

          return (taxonomyEntity.attributes || []).filter(function (attr) { return attr.key === 'showSearch'; }).length === 0;
        }

        function processBundle(bundle) {
          var results = [];
          var total = 0;
          var target = bundle.target;
          var taxonomy = bundle.taxonomy;
          if (taxonomy.vocabularies) {
            taxonomy.vocabularies.filter(function (vocabulary) {
              return VocabularyService.isVisibleVocabulary(vocabulary) && canSearch(vocabulary, $scope.options.hideSearch);
            }).forEach(function (vocabulary) {
              if (vocabulary.terms) {
                vocabulary.terms.filter(function (term) {
                  return canSearch(term, $scope.options.hideSearch);
                }).forEach(function (term) {
                  var item = RqlQueryService.createCriteriaItem(target, taxonomy, vocabulary, term, $scope.lang);
                  results.push({
                    score: score(item),
                    item: item
                  });
                  total++;
                });
              } else {
                var item = RqlQueryService.createCriteriaItem(target, taxonomy, vocabulary, null, $scope.lang);
                results.push({
                  score: score(item),
                  item: item
                });
                total++;
              }
            });
          }
          return {results: results, total: total};
        }

        var criteria = TaxonomiesSearchResource.get({
          query: StringUtils.quoteQuery(query.replace(/\/.*/g, '')), locale: $scope.lang, target: $scope.documents.search.target
        }).$promise.then(function (response) {
          if (response) {
            var results = [];
            var total = 0;
            var size = 10;

            response.forEach(function (bundle) {
              var rval = processBundle(bundle);
              results.push.apply(results, rval.results);
              total = total + rval.total;
            });

            results.sort(function (a, b) {
              return b.score - a.score;
            });

            results = results.splice(0, size);

            if (total > results.length) {
              var note = {
                query: query,
                total: total,
                size: size,
                message: LocaleStringUtils.translate('search.showing', [size, total]),
                status: 'has-warning'
              };
              results.push({score: -1, item: note});
            }

            return results.map(function (result) {
              return result.item;
            });
          } else {
            return [];
          }
        }, function (response) {
          AlertService.alert({
            id: 'SearchController',
            type: 'danger',
            msg: ServerErrorUtils.buildMessage(response),
            delay: 5000
          });
        });

        return criteria;
      };

      /**
       * Removes the item from the criteria tree
       * @param item
       */
      var removeCriteriaItem = function (item) {
        RqlQueryService.removeCriteriaItem(item);
        refreshQuery();
      };

      /**
       * Propagates a Scope change that results in criteria panel update
       * @param item
       */
      var selectCriteria = function (item, logicalOp, replace, showNotification, fullCoverage) {
        if (angular.isUndefined(showNotification)) {
          showNotification = true;
        }

        if (item.id) {
          var id = CriteriaIdGenerator.generate(item.taxonomy, item.vocabulary);
          var existingItem = RqlQueryService.findCriteriaItemFromTree(item, $scope.search.criteria);
          var growlMsgKey;

          if (existingItem && id.indexOf('dceId') !== -1 && fullCoverage) {
            removeCriteriaItem(existingItem);
            growlMsgKey = 'search.criterion.updated';
            RqlQueryService.addCriteriaItem($scope.search.rqlQuery, item, logicalOp);
          } else if (existingItem) {
            growlMsgKey = 'search.criterion.updated';
            RqlQueryService.updateCriteriaItem(existingItem, item, replace);
          } else {
            growlMsgKey = 'search.criterion.created';
            RqlQueryService.addCriteriaItem($scope.search.rqlQuery, item, logicalOp);
          }

          if (showNotification) {
            AlertService.growl({
              id: 'SearchControllerGrowl',
              type: 'info',
              msgKey: growlMsgKey,
              msgArgs: [LocalizedValues.forLocale(item.vocabulary.title, $scope.lang), $filter('translate')('taxonomy.target.' + item.target)],
              delay: 3000
            });
          }

          refreshQuery();
          $scope.search.selectedCriteria = null;
        } else {
          $scope.search.selectedCriteria = item.query;
        }
      };

      var searchKeyUp = function (event) {
        switch (event.keyCode) {
          case 27: // ESC
            if ($scope.documents.search.active) {
              clearSearch();
            }
            break;

          default:
            if ($scope.documents.search.text) {
              searchCriteria($scope.documents.search.text);
            }
            break;
        }
      };

      var onTypeChanged = function (type) {
        if (type) {
          validateType(type);
          var search = $location.search();
          search.type = type;
          search.display = DISPLAY_TYPES.LIST;
          $location.search(search);
        }
      };

      var onBucketChanged = function (bucket) {
        if (bucket) {
          validateBucket(bucket);
          var search = $location.search();
          search.bucket = bucket;
          $location.search(search);
        }
      };

      var onPaginate = function (target, from, size) {
        $scope.search.pagination[target] = {from: from, size: size};
        executeSearchQuery();
      };

      var onDisplayChanged = function (display) {
        if (display) {
          validateDisplay(display);

          var search = $location.search();
          search.display = display;
          $location.search(search);
        }
      };

      /**
       * Reduce the current query such that all irrelevant criteria is removed but the criterion. The exceptions are
       * when the criterion is inside an AND, in this case this latter is reduced.
       *
       * @param parentItem
       * @param criteriaItem
       */
      function reduce(parentItem, criteriaItem) {
        if (parentItem.type === RQL_NODE.OR) {
          var grandParentItem = parentItem.parent;
          var parentItemIndex = grandParentItem.children.indexOf(parentItem);
          grandParentItem.children[parentItemIndex] = criteriaItem;

          var parentRql = parentItem.rqlQuery;
          var grandParentRql = grandParentItem.rqlQuery;
          var parentRqlIndex = grandParentRql.args.indexOf(parentRql);
          grandParentRql.args[parentRqlIndex] = criteriaItem.rqlQuery;

          if (grandParentItem.type !== QUERY_TARGETS.VARIABLE) {
            reduce(grandParentItem, criteriaItem);
          }
        } else if (criteriaItem.type !== RQL_NODE.VARIABLE && parentItem.type === RQL_NODE.AND) {
          // Reduce until parent is Variable node or another AND node
          reduce(parentItem.parent, parentItem);
        }
      }

      var onUpdateCriteria = function (item, type, useCurrentDisplay, replaceTarget, showNotification, fullCoverage) {
        if (type) {
          onTypeChanged(type);
        }

        if (replaceTarget) {
          var criteriaItem = RqlQueryService.findCriteriaItemFromTree(item, $scope.search.criteria);
          if (criteriaItem) {
            reduce(criteriaItem.parent, criteriaItem);
          }
        }

        onDisplayChanged(useCurrentDisplay && $scope.search.display ? $scope.search.display : DISPLAY_TYPES.LIST);
        selectCriteria(item, RQL_NODE.AND, true, showNotification, fullCoverage);
      };

      var onRemoveCriteria = function(item) {
        var found = RqlQueryService.findCriterion($scope.search.criteria, item.id);
        removeCriteriaItem(found);
      };

      var onSelectTerm = function (target, taxonomy, vocabulary, args) {
        args = args || {};

        if (args.text) {
          args.text = args.text.replace(/[^a-zA-Z0-9" _-]/g, '');
        }

        if(angular.isString(args)) {
          args = {term: args};
        }

        if (vocabulary) {
          var item;
          if (VocabularyService.isNumericVocabulary(vocabulary)) {
            item = RqlQueryService.createCriteriaItem(target, taxonomy, vocabulary, null, $scope.lang);
            item.rqlQuery = RqlQueryUtils.buildRqlQuery(item);
            RqlQueryUtils.updateRangeQuery(item.rqlQuery, args.from, args.to);
            selectCriteria(item, null, true);

            return;
          } else if(VocabularyService.isMatchVocabulary(vocabulary)) {
            item = RqlQueryService.createCriteriaItem(target, taxonomy, vocabulary, null, $scope.lang);
            item.rqlQuery = RqlQueryUtils.buildRqlQuery(item);
            RqlQueryUtils.updateMatchQuery(item.rqlQuery, args.text);
            selectCriteria(item, null, true);

            return;
          }
        }

        if (options.searchLayout === 'layout1') {
          selectCriteria(RqlQueryService.createCriteriaItem(target, taxonomy, vocabulary, args && args.term, $scope.lang));
        } else {
          // TODO externalize TermsVocabularyFacetController.selectTerm and use it for terms case
          var selected = vocabulary.terms.filter(function(t) {return t.selected;}).map(function(t) { return t.name; }),
              criterion = RqlQueryService.findCriterion($scope.search.criteria, CriteriaIdGenerator.generate(taxonomy, vocabulary));

          if(criterion) {
            if (selected.length === 0) {
              RqlQueryService.removeCriteriaItem(criterion);
            } else if (Object.keys(args).length === 0) {
              RqlQueryService.updateCriteriaItem(criterion, RqlQueryService.createCriteriaItem(target, taxonomy, vocabulary, args && args.term, $scope.lang), true);
            } else {
              criterion.rqlQuery.name = RQL_NODE.IN;
              RqlQueryUtils.updateQuery(criterion.rqlQuery, selected);

              if (vocabulary.terms.length > 1 && selected.length === vocabulary.terms.length) {
                criterion.rqlQuery.name = RQL_NODE.EXISTS;
                criterion.rqlQuery.args.pop();
              }
            }

            $scope.refreshQuery();
          } else {
            var setExists = vocabulary.terms.length > 1 && selected.length === vocabulary.terms.length;
            selectCriteria(RqlQueryService.createCriteriaItem(target, taxonomy, vocabulary, !setExists && (args && args.term), $scope.lang));
          }
        }
      };

      var selectSearchTarget = function (target) {
        $scope.documents.search.target = target;
      };

      var VIEW_MODES = {
        SEARCH: 'search',
        CLASSIFICATION: 'classification'
      };

      const SUGGESTION_FIELDS_MAP = new Map([
        [QUERY_TARGETS.NETWORK, ['acronym', 'name']],
        [QUERY_TARGETS.STUDY, ['acronym', 'name']],
        [QUERY_TARGETS.DATASET, ['acronym', 'name']],
        [QUERY_TARGETS.VARIABLE, ['name', 'label']]
      ]);

      function searchSuggestion(target, suggestion, withSpecificFields) {
        var rqlQuery = $scope.search.rqlQuery;
        var targetQuery = RqlQueryService.findTargetQuery(target, rqlQuery);

        if (!targetQuery) {
          targetQuery = new RqlQuery(target);
          rqlQuery.push(targetQuery);
        }

        // get filter fields
        var filterFields;
        if (withSpecificFields) {
          filterFields = SUGGESTION_FIELDS_MAP.get(target);
        }

        var matchQuery = EntitySuggestionRqlUtilityService.createMatchQuery(suggestion, filterFields);
        if (!matchQuery) {
          EntitySuggestionRqlUtilityService.removeFilteredMatchQueryFromTargetQuery(targetQuery);
        } else {
          var filterQuery = EntitySuggestionRqlUtilityService.givenTargetQueryGetFilterQuery(targetQuery);
          if (!filterQuery) {
            targetQuery.push(new RqlQuery(RQL_NODE.FILTER).push(matchQuery));
          } else {
            var currentMatchQuery = EntitySuggestionRqlUtilityService.givenFilterQueryGetMatchQuery(filterQuery);
            if (currentMatchQuery) {
              currentMatchQuery.args = matchQuery.args;
            } else {
              filterQuery.push(matchQuery);
            }
          }
        }

        $scope.search.rqlQuery = rqlQuery;
        refreshQuery();
      }

      $scope.searchSuggestion = searchSuggestion;
      $scope.goToSearch = function () {
        $scope.viewMode = VIEW_MODES.SEARCH;
        $location.search('taxonomy', null);
        $location.search('vocabulary', null);
        $location.search('target', null);
        $location.path('/search');
      };

      $scope.goToClassifications = function () {
        $scope.viewMode = VIEW_MODES.CLASSIFICATION;
        $location.path('/classifications');
        $location.search('target', $scope.targetTabsOrder[0]);
      };

      $scope.navigateToTarget = function(target) {
        $location.search('target', target);
        $location.search('taxonomy', null);
        $location.search('vocabulary', null);
        $scope.target = target;
      };

      $scope.QUERY_TYPES = QUERY_TYPES;
      $scope.BUCKET_TYPES = BUCKET_TYPES;

      $scope.search = {
        selectedCriteria: null,
        layout: 'layout2',
        pagination: {},
        query: null,
        advanced: false,
        rqlQuery: new RqlQuery(),
        executedQuery: null,
        type: null,
        bucket: null,
        result: {
          list: null,
          coverage: null,
          graphics: null
        },
        criteria: [],
        criteriaItemMap: {},
        loading: false
      };

      $scope.viewMode = VIEW_MODES.SEARCH;
      $scope.documents = {
        search: {
          text: null,
          active: false,
          target: null
        }
      };

      $scope.searchHeaderTemplateUrl = ngObibaMicaSearchTemplateUrl.getHeaderUrl('search');
      $scope.classificationsHeaderTemplateUrl = ngObibaMicaSearchTemplateUrl.getHeaderUrl('classifications');
      $scope.onTaxonomyFilterPanelToggleVisibility = onTaxonomyFilterPanelToggleVisibility;
      $scope.selectSearchTarget = selectSearchTarget;
      $scope.selectDisplay = onDisplayChanged;
      $scope.searchCriteria = searchCriteria;
      $scope.selectCriteria = selectCriteria;
      $scope.searchKeyUp = searchKeyUp;

      $scope.showTaxonomy = showTaxonomy;
      $scope.clearTaxonomy = clearTaxonomy;

      $scope.removeCriteriaItem = removeCriteriaItem;
      $scope.refreshQuery = refreshQuery;
      $scope.clearSearchQuery = clearSearchQuery;
      $scope.toggleSearchQuery = toggleSearchQuery;
      $scope.showAdvanced = showAdvanced;

      $scope.onTypeChanged = onTypeChanged;
      $scope.onBucketChanged = onBucketChanged;
      $scope.onDisplayChanged = onDisplayChanged;
      $scope.onUpdateCriteria = onUpdateCriteria;
      $scope.onRemoveCriteria = onRemoveCriteria;
      $scope.onSelectTerm = onSelectTerm;
      $scope.QUERY_TARGETS = QUERY_TARGETS;
      $scope.onPaginate = onPaginate;
      $scope.canExecuteWithEmptyQuery = canExecuteWithEmptyQuery;
      $scope.inSearchMode = function() {
        return $scope.viewMode === VIEW_MODES.SEARCH;
      };
      $scope.toggleFullscreen = function() {
        $scope.isFullscreen = !$scope.isFullscreen;
      };
      $scope.isSearchAvailable = true;
      ObibaServerConfigResource.get(function(micaConfig){
        $scope.isSearchAvailable = !micaConfig.isSingleStudyEnabled ||
          (micaConfig.isNetworkEnabled && !micaConfig.isSingleNetworkEnabled) ||
          micaConfig.isCollectedDatasetEnabled || micaConfig.isHarmonizedDatasetEnabled;
      });

      $scope.$on('$locationChangeSuccess', function (event, newLocation, oldLocation) {
        initSearchTabs();

        if (newLocation !== oldLocation) {
          try {
            validateBucket($location.search().bucket);
            executeSearchQuery();
          } catch (error) {
            var defaultBucket = CoverageGroupByService.defaultBucket();
            $location.search('bucket', defaultBucket).replace();
          }
        }
      });

      $rootScope.$on('ngObibaMicaSearch.fullscreenChange', function(obj, isEnabled) {
        $scope.isFullscreen = isEnabled;
      });

      $rootScope.$on('ngObibaMicaSearch.sortChange', function(obj, sort) {
        $scope.search.rqlQuery = RqlQueryService.prepareSearchQueryNoFields(
          $scope.search.display,
          $scope.search.type,
          $scope.search.rqlQuery,
          {},
          $scope.lang,
          sort
        );
        refreshQuery();
      });

      $rootScope.$on('ngObibaMicaSearch.searchSuggestion', function (event, suggestion, target, withSpecificFields) {
        searchSuggestion(target, suggestion, withSpecificFields);
      });

      function init() {
        $scope.lang = $translate.use();
        SearchContext.setLocale($scope.lang);
        initSearchTabs();
        executeSearchQuery();
      }

      init();
    }])

  .controller('NumericVocabularyPanelController', ['$scope', function($scope) {
    $scope.$watch('taxonomies', function() {
      $scope.from = null;
      $scope.to = null;
    }, true);
  }])

  .controller('MatchVocabularyPanelController', ['$scope', function($scope) {
    $scope.$watch('taxonomies', function() {
      $scope.text = null;
    }, true);
  }])

  .controller('NumericVocabularyFacetController', ['$scope','JoinQuerySearchResource', 'RqlQueryService',
    'RqlQueryUtils', function($scope, JoinQuerySearchResource, RqlQueryService, RqlQueryUtils) {
    function updateLimits (criteria, vocabulary) {
      function createExistsQuery(criteria, criterion) {
        var rootQuery = angular.copy(criteria.rqlQuery);
        criterion.rqlQuery = RqlQueryUtils.buildRqlQuery(criterion);
        RqlQueryService.addCriteriaItem(rootQuery, criterion);
        return rootQuery;
      }

      var criterion = RqlQueryService.findCriterion(criteria, CriteriaIdGenerator.generate($scope.$parent.taxonomy, vocabulary));

      if(!criterion) {
        criterion = RqlQueryService.createCriteriaItem($scope.target, $scope.$parent.taxonomy, $scope.vocabulary);
      }

      if(criterion.rqlQuery && criterion.rqlQuery.args[1]) {
        if(angular.isArray(criterion.rqlQuery.args[1])) {
          $scope.from = criterion.rqlQuery.args[1][0];
          $scope.to = criterion.rqlQuery.args[1][1];
        } else {
          if(criterion.rqlQuery.name === RQL_NODE.GE) {
            $scope.from = criterion.rqlQuery.args[1];
          } else {
            $scope.to = criterion.rqlQuery.args[1];
          }
        }
      } else {
        $scope.from = null;
        $scope.to = null;
        $scope.min = null;
        $scope.max = null;
      }

      var query = RqlQueryUtils.hasTargetQuery(criteria.rqlQuery, criterion.target) ? angular.copy(criteria.rqlQuery) : createExistsQuery(criteria, criterion);
      var joinQuery = RqlQueryService.prepareCriteriaTermsQuery(query, criterion);
      JoinQuerySearchResource[targetToType($scope.target)]({query: joinQuery}).$promise.then(function (joinQueryResponse) {
        var stats = RqlQueryService.getTargetAggregations(joinQueryResponse, criterion, $scope.lang);

        if (stats && stats.default) {
          $scope.min = stats.default.min;
          $scope.max = stats.default.max;
        }
      });
    }

    function updateCriteria() {
      $scope.$parent.selectTerm($scope.$parent.target, $scope.$parent.taxonomy, $scope.vocabulary, {from: $scope.from, to: $scope.to});
    }

    $scope.onKeypress = function(ev) {
      if(ev.keyCode === 13 || ev.type==='click') { updateCriteria(); }
    };

    $scope.$on('ngObibaMicaQueryUpdated', function(ev, criteria) {
      if ($scope.vocabulary.isNumeric && $scope.vocabulary.isOpen) {
        updateLimits(criteria, $scope.vocabulary);
      }
    });

    $scope.$on('ngObibaMicaLoadVocabulary', function(ev, taxonomy, vocabulary) {
      if ($scope.vocabulary.isNumeric &&
        vocabulary.name === $scope.vocabulary.name && !vocabulary.isOpen) {
        updateLimits($scope.criteria, vocabulary);
      }
    });
  }])

  .controller('MatchVocabularyFacetController', ['$scope', 'RqlQueryService', function($scope, RqlQueryService) {
    function updateMatch (criteria, vocabulary) {
      var criterion = RqlQueryService.findCriterion(criteria, CriteriaIdGenerator.generate($scope.$parent.taxonomy, vocabulary));
      if(criterion && criterion.rqlQuery && criterion.rqlQuery.args[1]) {
        $scope.text = criterion.rqlQuery.args[0];
      } else {
        $scope.text = null;
      }
    }

    function updateCriteria() {
      $scope.$parent.selectTerm($scope.$parent.target, $scope.$parent.taxonomy, $scope.vocabulary, {text: $scope.text || '*'});
    }

    $scope.onKeypress = function(ev) {
      if(ev.keyCode === 13 || ev.type==='click') {
        updateCriteria();
      }
    };

    $scope.$on('ngObibaMicaQueryUpdated', function(ev, criteria) {
      if ($scope.vocabulary.isMatch && $scope.vocabulary.isOpen) {
        updateMatch(criteria, $scope.vocabulary);
      }
    });

    $scope.$on('ngObibaMicaLoadVocabulary', function(ev, taxonomy, vocabulary) {
      if (vocabulary.name === $scope.vocabulary.name && !vocabulary.isOpen) {
        updateMatch($scope.criteria, vocabulary);
      }
    });
  }])

  .controller('TermsVocabularyFacetController', ['$scope', '$filter', 'JoinQuerySearchResource', 'RqlQueryService',
    'RqlQueryUtils',
    function($scope, $filter, JoinQuerySearchResource, RqlQueryService, RqlQueryUtils) {
      function isSelectedTerm (criterion, term) {
        return criterion.selectedTerms && (criterion.rqlQuery.name === RQL_NODE.EXISTS || criterion.selectedTerms.indexOf(term.key) !== -1);
      }

      $scope.loading = false;
      $scope.selectTerm = function (target, taxonomy, vocabulary, args) {
        var selected = vocabulary.terms.filter(function(t) {return t.selected;}).map(function(t) { return t.name; }),
          criterion = RqlQueryService.findCriterion($scope.criteria, CriteriaIdGenerator.generate(taxonomy, vocabulary));

        if(criterion) {
          if (selected.length === 0) {
            RqlQueryService.removeCriteriaItem(criterion);
          } else {
            criterion.rqlQuery.name = RQL_NODE.IN;
            RqlQueryUtils.updateQuery(criterion.rqlQuery, selected);
          }

          $scope.onRefresh();
        } else {
          $scope.onSelectTerm(target, taxonomy, vocabulary, args);
        }
      };

      function updateCounts(criteria, vocabulary) {
        var query = null, isCriterionPresent = false;
        $scope.loading = true;

        function createExistsQuery(criteria, criterion) {
          var rootQuery = angular.copy(criteria.rqlQuery);
          criterion.rqlQuery = RqlQueryUtils.buildRqlQuery(criterion);
          RqlQueryService.addCriteriaItem(rootQuery, criterion);
          return rootQuery;
        }

        var criterion = RqlQueryService.findCriterion(criteria,
          CriteriaIdGenerator.generate($scope.$parent.taxonomy, vocabulary));

        if(criterion) {
          isCriterionPresent = true;
        } else {
          criterion = RqlQueryService.createCriteriaItem($scope.target, $scope.$parent.taxonomy, $scope.vocabulary);
        }

        if(RqlQueryUtils.hasTargetQuery(criteria.rqlQuery, criterion.target)) {
          query = angular.copy(criteria.rqlQuery);

          if(!isCriterionPresent) {
            var operator = criterion.target === QUERY_TARGETS.VARIABLE && criterion.taxonomy.name !== 'Mica_variable' ?
              RQL_NODE.OR :
              RQL_NODE.AND;

            RqlQueryService.addCriteriaItem(query, criterion, operator);
          }
        } else {
          query = createExistsQuery(criteria, criterion);
        }

        var joinQuery = RqlQueryService.prepareCriteriaTermsQuery(query, criterion, criterion.lang);
        JoinQuerySearchResource[targetToType($scope.target)]({query: joinQuery}).$promise.then(function (joinQueryResponse) {
          $scope.vocabulary.visibleTerms = 0;
          RqlQueryService.getTargetAggregations(joinQueryResponse, criterion, criterion.lang).forEach(function (term) {
            $scope.vocabulary.terms.some(function(t) {
              if (t.name === term.key) {
                t.selected = isSelectedTerm(criterion, term);
                t.count = term.count;
                t.isVisible = $scope.options.showFacetTermsWithZeroCount || term.count > 0;
                $scope.vocabulary.visibleTerms += t.isVisible;
                return true;
              }
            });
          });
          $scope.loading = false;
        });
      }

      $scope.$on('ngObibaMicaQueryUpdated', function(ev, criteria) {
        if(!$scope.vocabulary.isNumeric && !$scope.vocabulary.isMatch && $scope.vocabulary.isOpen) {
          updateCounts(criteria, $scope.vocabulary);
        }
      });

      $scope.$on('ngObibaMicaLoadVocabulary', function(ev, taxonomy, vocabulary) {
        if(vocabulary.name === $scope.vocabulary.name && !$scope.vocabulary.isNumeric && !$scope.vocabulary.isMatch &&
          !vocabulary.isOpen) {
          updateCounts($scope.criteria, vocabulary);
        }
      });
  }])

  .controller('TaxonomiesPanelController', ['$rootScope',
    '$scope',
    '$translate',
    '$location',
    'TaxonomyResource',
    'TaxonomiesResource',
    'ngObibaMicaSearch',
    'RqlQueryUtils',
    '$cacheFactory',
    'AlertService',
    'ServerErrorUtils',
    'VocabularyService',
    TaxonomiesPanelController])

  .controller('ClassificationPanelController', ['$rootScope',
    '$scope',
    '$translate',
    '$location',
    'TaxonomyResource',
    'TaxonomiesResource',
    'ngObibaMicaSearch',
    'RqlQueryUtils',
    '$cacheFactory',
    'VocabularyService',
    ClassificationPanelController])

  .controller('TaxonomiesFacetsController', ['$scope',
    '$timeout',
    'TaxonomyResource',
    'TaxonomiesResource',
    'LocalizedValues',
    'ngObibaMicaSearch',
    'RqlQueryUtils',
    'VocabularyService',
    function ($scope,
      $timeout,
      TaxonomyResource,
      TaxonomiesResource,
      LocalizedValues,
      ngObibaMicaSearch,
      RqlQueryUtils,
      VocabularyService) {

      $scope.options = ngObibaMicaSearch.getOptions();
      $scope.taxonomies = {};
      $scope.targets = [];
      $scope.RqlQueryUtils = RqlQueryUtils;

      $scope.$watch('facetedTaxonomies', function(facetedTaxonomies) {
        if(facetedTaxonomies) {
          $scope.targets = $scope.options.targetTabsOrder.filter(function (t) {
            if(facetedTaxonomies[t]){
              return facetedTaxonomies[t].length;
            }
          });

          $scope.target = $scope.targets[0];
          init($scope.target);
        }
      });

      $scope.selectTerm = function(target, taxonomy, vocabulary, args) {
        $scope.onSelectTerm(target, taxonomy, vocabulary, args);
      };

      $scope.setTarget = function(target) {
        $scope.target=target;
        init(target);
      };

      $scope.loadVocabulary = function(taxonomy, vocabulary) {
        $scope.$broadcast('ngObibaMicaLoadVocabulary', taxonomy, vocabulary);
      };

      $scope.localize = function (values) {
        return LocalizedValues.forLocale(values, $scope.lang);
      };

      function init(target) {
        if($scope.taxonomies[target]) { return; }

        TaxonomiesResource.get({
          target: target
        }, function onSuccess(taxonomies) {
          $scope.taxonomies[target] = $scope.facetedTaxonomies[target].map(function(f) {
            return taxonomies.filter(function(t) {
              return f.name === t.name;
            })[0];
          }).filter(function(t) { return t; }).map(function(t) {
            t.isOpen = false;
            t.vocabularies = 'Maelstrom Research' === t.author ?
              t.vocabularies :
              VocabularyService.visibleFacetVocabularies(t.vocabularies);

            t.vocabularies.map(function (v) {
              var facetAttributes = VocabularyService.findVocabularyAttributes(v, /^facet/i);
              v.isOpen = 'true' === facetAttributes.facetExpanded;
              v.position = parseInt(facetAttributes.facetPosition);
              v.limit = 10;
              v.isMatch = VocabularyService.isMatchVocabulary(v);
              v.isNumeric = VocabularyService.isNumericVocabulary(v);

              t.isOpen = t.isOpen || v.isOpen;
            });

            return t;
          });

          if($scope.taxonomies[target].length === 1) {
            $scope.taxonomies[target][0].isOpen = 1;
          }

          if ($scope.criteria) {
            $timeout(function(){
              $scope.$broadcast('ngObibaMicaQueryUpdated', $scope.criteria);
            });
          }
        });
      }

      $scope.$on('ngObibaMicaQueryUpdated', function(ev, criteria) {
        $scope.criteria = criteria;
      });
    }
  ])

  .controller('SearchResultController', [
    '$scope',
    'ngObibaMicaSearch',
    'ngObibaMicaUrl',
    'RqlQueryService',
    'RqlQueryUtils',
    'ngObibaMicaSearchTemplateUrl',
    function ($scope,
              ngObibaMicaSearch,
              ngObibaMicaUrl,
              RqlQueryService,
              RqlQueryUtils,
              ngObibaMicaSearchTemplateUrl) {

      function updateType(type) {
        Object.keys($scope.activeTarget).forEach(function (key) {
          $scope.activeTarget[key].active = type === key;
        });
      }

      $scope.targetTypeMap = $scope.$parent.taxonomyTypeMap;
      $scope.QUERY_TARGETS = QUERY_TARGETS;
      $scope.QUERY_TYPES = QUERY_TYPES;
      $scope.options = ngObibaMicaSearch.getOptions();
      $scope.activeTarget = {};
      $scope.activeTarget[QUERY_TYPES.VARIABLES] = {active: false, name: QUERY_TARGETS.VARIABLE, totalHits: 0};
      $scope.activeTarget[QUERY_TYPES.DATASETS] = {active: false, name: QUERY_TARGETS.DATASET, totalHits: 0};
      $scope.activeTarget[QUERY_TYPES.STUDIES] = {active: false, name: QUERY_TARGETS.STUDY, totalHits: 0};
      $scope.activeTarget[QUERY_TYPES.NETWORKS] = {active: false, name: QUERY_TARGETS.NETWORK, totalHits: 0};

      $scope.getUrlTemplate = function (tab) {
        switch (tab){
          case 'list' :
            return ngObibaMicaSearchTemplateUrl.getTemplateUrl('searchResultList');
          case 'coverage' :
            return ngObibaMicaSearchTemplateUrl.getTemplateUrl('searchResultCoverage');
          case 'graphics' :
            return ngObibaMicaSearchTemplateUrl.getTemplateUrl('searchResultGraphics');
        }
      };

      $scope.selectType = function (type) {
        updateType(type);
        $scope.type = type;
        $scope.$parent.onTypeChanged(type);
      };

      $scope.getTotalHits = function(type) {
        if (!$scope.result.list || !$scope.result.list[type + 'ResultDto']) {
          return '...';
        }
        return $scope.result.list[type + 'ResultDto'].totalHits;
      };

      $scope.getReportUrl = function () {

        if ($scope.query === null) {
          return $scope.query;
        }

        var parsedQuery = RqlQueryService.parseQuery($scope.query);
        var target = typeToTarget($scope.type);
        var targetQuery = parsedQuery.args.filter(function (query) {
          return query.name === target;
        }).pop();
        RqlQueryUtils.addLimit(targetQuery, RqlQueryUtils.limit(0, 100000));
        var queryWithoutLimit = new RqlQuery().serializeArgs(parsedQuery.args);

        return ngObibaMicaUrl.getUrl('JoinQuerySearchCsvResource').replace(':type', $scope.type).replace(':query', encodeURI(queryWithoutLimit));
      };

      $scope.getStudySpecificReportUrl = function () {

          if ($scope.query === null) {
              return $scope.query;
          }

          var parsedQuery = RqlQueryService.parseQuery($scope.query);
          var target = typeToTarget($scope.type);
          var targetQuery = parsedQuery.args.filter(function (query) {
              return query.name === target;
          }).pop();
          RqlQueryUtils.addLimit(targetQuery, RqlQueryUtils.limit(0, 100000));
          var queryWithoutLimit = new RqlQuery().serializeArgs(parsedQuery.args);

          return ngObibaMicaUrl.getUrl('JoinQuerySearchCsvReportResource').replace(':type', $scope.type).replace(':query', encodeURI(queryWithoutLimit));
      };

      $scope.$watchCollection('result', function () {
        if ($scope.result.list) {
          $scope.activeTarget[QUERY_TYPES.VARIABLES].totalHits = $scope.result.list.variableResultDto.totalHits;
          $scope.activeTarget[QUERY_TYPES.DATASETS].totalHits = $scope.result.list.datasetResultDto.totalHits;
          $scope.activeTarget[QUERY_TYPES.STUDIES].totalHits = $scope.result.list.studyResultDto.totalHits;
          $scope.activeTarget[QUERY_TYPES.NETWORKS].totalHits = $scope.result.list.networkResultDto.totalHits;
        }
      });


      $scope.$watch('type', function (type) {
        updateType(type);
      });

      $scope.DISPLAY_TYPES = DISPLAY_TYPES;
    }])

  .controller('CriterionLogicalController', [
    '$scope',
    function ($scope) {
      $scope.updateLogical = function (operator) {
        $scope.item.rqlQuery.name = operator;
        $scope.$emit(CRITERIA_ITEM_EVENT.refresh);
      };
    }])

  .controller('CriterionDropdownController', [
    '$scope',
    '$filter',
    'LocalizedValues',
    'VocabularyService',
    'StringUtils',
    function ($scope, $filter, LocalizedValues, VocabularyService, StringUtils) {
      var closeDropdown = function () {
        if (!$scope.state.open) {
          return;
        }

        $scope.state.onClose();

        var wasDirty = $scope.state.dirty;
        $scope.state.open = false;
        $scope.state.dirty = false;
        if (wasDirty) {
          // trigger a query update
          $scope.$emit(CRITERIA_ITEM_EVENT.refresh);
        }
      };

      var openDropdown = function () {
        if ($scope.state.open) {
          closeDropdown();
          return;
        }

        $scope.state.open = true;
        $scope.state.onOpen();
      };

      var remove = function () {
        $scope.$emit(CRITERIA_ITEM_EVENT.deleted, $scope.criterion);
      };

      var onKeyup = function (event) {
        if (event.keyCode === 13) {
          closeDropdown();
        }
      };

      $scope.state = new CriterionState();
      $scope.timestamp = new Date().getTime();
      $scope.localize = function (values) {
        return LocalizedValues.forLocale(values, $scope.criterion.lang);
      };
      $scope.localizeCriterion = function () {
        var rqlQuery = $scope.criterion.rqlQuery;
        if ((rqlQuery.name === RQL_NODE.IN || rqlQuery.name === RQL_NODE.OUT || rqlQuery.name === RQL_NODE.CONTAINS) && $scope.criterion.selectedTerms && $scope.criterion.selectedTerms.length > 0) {
          var sep = rqlQuery.name === RQL_NODE.IN ? ' | ' : ' ';
          var prefix = rqlQuery.name === RQL_NODE.OUT ? '-' : '';
          return $scope.criterion.selectedTerms.map(function (t) {
            if (!$scope.criterion.vocabulary.terms) {
              return t;
            }
            var found = $scope.criterion.vocabulary.terms.filter(function (arg) {
              return arg.name === t;
            }).pop();
            return prefix + (found ? LocalizedValues.forLocale(found.title, $scope.criterion.lang) : t);
          }).join(sep);
        }
        var operation = rqlQuery.name;
        switch (rqlQuery.name) {
          case RQL_NODE.EXISTS:
            operation = ':' + $filter('translate')('any');
            break;
          case RQL_NODE.MISSING:
            operation = ':' + $filter('translate')('none');
            break;
          case RQL_NODE.EQ:
            operation = '=' + rqlQuery.args[1];
            break;
          case RQL_NODE.GE:
            operation = '>' + rqlQuery.args[1];
            break;
          case RQL_NODE.LE:
            operation = '<' + rqlQuery.args[1];
            break;
          case RQL_NODE.BETWEEN:
            operation = ':[' + rqlQuery.args[1] + ')';
            break;
          case RQL_NODE.IN:
          case RQL_NODE.CONTAINS:
            operation = '';
            break;
          case RQL_NODE.MATCH:
            operation = ':match(' + rqlQuery.args[0] + ')';
            break;
        }
        return LocalizedValues.forLocale($scope.criterion.vocabulary.title, $scope.criterion.lang) + operation;
      };
      $scope.vocabularyType = VocabularyService.vocabularyType;
      $scope.onKeyup = onKeyup;
      $scope.truncate = StringUtils.truncate;
      $scope.remove = remove;
      $scope.openDropdown = openDropdown;
      $scope.closeDropdown = closeDropdown;
      $scope.VocabularyService = VocabularyService;
    }])
  .controller('searchCriteriaRegionController', ['$scope', 'RqlQueryService', function ($scope,RqlQueryService) {
    var canShow = false;

    $scope.$watchCollection('search.criteria', function () {
        $scope.renderableTargets = RqlQueryService.getRenderableTargetCriteriaFromRoot($scope.search.criteria);
    });

    $scope.$watchCollection('search.criteriaItemMap', function () {
      if ($scope.search.criteriaItemMap) {
        canShow = Object.keys($scope.search.criteriaItemMap).length > 1;
      }
    });
    var canShowCriteriaRegion = function () {
      return ($scope.options.studyTaxonomiesOrder.length || $scope.options.datasetTaxonomiesOrder.length || $scope.options.networkTaxonomiesOrder.length) && canShow;
    };
    $scope.canShowCriteriaRegion = canShowCriteriaRegion;
  }])
  .controller('MatchCriterionTermsController', [
    '$scope',
    'RqlQueryService',
    'LocalizedValues',
    'JoinQuerySearchResource',
    'RqlQueryUtils',
    'SearchContext',
    function ($scope, RqlQueryService, LocalizedValues, JoinQuerySearchResource, RqlQueryUtils, SearchContext) {
      $scope.lang = SearchContext.currentLocale();

      var update = function () {
        $scope.state.dirty = true;
        RqlQueryUtils.updateMatchQuery($scope.criterion.rqlQuery, $scope.match);
      };

      var queryString = $scope.criterion.rqlQuery.args[0];
      $scope.match = queryString === '*' ? '' : queryString;
      $scope.update = update;
      $scope.localize = function (values) {
        return LocalizedValues.forLocale(values, $scope.criterion.lang);
      };

    }])

  .controller('NumericCriterionController', [
    '$scope',
    'RqlQueryService',
    'LocalizedValues',
    'JoinQuerySearchResource',
    'RqlQueryUtils',
    'SearchContext',
    function ($scope, RqlQueryService, LocalizedValues, JoinQuerySearchResource, RqlQueryUtils, SearchContext) {
      $scope.lang = SearchContext.currentLocale();
      var range = $scope.criterion.rqlQuery.args[1];

      if (angular.isArray(range)) {
        $scope.from = $scope.criterion.rqlQuery.args[1][0];
        $scope.to = $scope.criterion.rqlQuery.args[1][1];
      } else {
        $scope.from = $scope.criterion.rqlQuery.name === RQL_NODE.GE ? range : null;
        $scope.to = $scope.criterion.rqlQuery.name === RQL_NODE.LE ? range : null;
      }

      var updateLimits = function () {
        var target = $scope.criterion.target,
          joinQuery = RqlQueryService.prepareCriteriaTermsQuery($scope.query, $scope.criterion);
        JoinQuerySearchResource[targetToType(target)]({query: joinQuery}).$promise.then(function (joinQueryResponse) {
          var stats = RqlQueryService.getTargetAggregations(joinQueryResponse, $scope.criterion, $scope.lang);

          if (stats && stats.default) {
            $scope.min = stats.default.min;
            $scope.max = stats.default.max;
          }
        });
      };

      var onOpen = function () {
        updateLimits();
      };

      var onClose = function () {
        $scope.updateSelection();
      };

      $scope.updateSelection = function () {
        RqlQueryUtils.updateRangeQuery($scope.criterion.rqlQuery, $scope.from, $scope.to, $scope.selectMissing);
        $scope.state.dirty = true;
      };

      $scope.selectMissing = $scope.criterion.rqlQuery.name === RQL_NODE.MISSING;
      $scope.state.addOnClose(onClose);
      $scope.state.addOnOpen(onOpen);
      $scope.localize = function (values) {
        return LocalizedValues.forLocale(values, $scope.criterion.lang);
      };
    }])

  .controller('StringCriterionTermsController', [
    '$scope',
    'RqlQueryService',
    'LocalizedValues',
    'StringUtils',
    'JoinQuerySearchResource',
    'RqlQueryUtils',
    'SearchContext',
    '$filter',
    function ($scope,
              RqlQueryService,
              LocalizedValues,
              StringUtils,
              JoinQuerySearchResource,
              RqlQueryUtils,
              SearchContext,
              $filter) {
      $scope.lang = SearchContext.currentLocale();

      var isSelected = function (name) {
        return $scope.checkboxTerms.indexOf(name) !== -1;
      };

      var updateSelection = function () {
        $scope.state.dirty = true;
        $scope.criterion.rqlQuery.name = $scope.selectedFilter;
        var selected = [];
        if($scope.selectedFilter !== RQL_NODE.MISSING && $scope.selectedFilter !== RQL_NODE.EXISTS) {
          Object.keys($scope.checkboxTerms).forEach(function (key) {
            if ($scope.checkboxTerms[key]) {
              selected.push(key);
            }
          });
        }
        if (selected.length === 0 && $scope.selectedFilter !== RQL_NODE.MISSING) {
          $scope.criterion.rqlQuery.name = RQL_NODE.EXISTS;
        }
        RqlQueryUtils.updateQuery($scope.criterion.rqlQuery, selected);
      };

      var updateFilter = function () {
        updateSelection();
      };

      var isInOutFilter = function () {
        return $scope.selectedFilter === RQL_NODE.IN || $scope.selectedFilter === RQL_NODE.OUT;
      };

      var isContainsFilter = function () {
        return $scope.selectedFilter === RQL_NODE.CONTAINS;
      };

      var onOpen = function () {
        $scope.state.loading = true;
        var target = $scope.criterion.target;
        var joinQuery = RqlQueryService.prepareCriteriaTermsQuery($scope.query, $scope.criterion, $scope.lang);

        JoinQuerySearchResource[targetToType(target)]({query: joinQuery}).$promise.then(function (joinQueryResponse) {
          $scope.state.loading = false;
          $scope.terms = RqlQueryService.getTargetAggregations(joinQueryResponse, $scope.criterion, $scope.lang);
          if ($scope.terms) {
            $scope.terms.forEach(function (term) {
              $scope.checkboxTerms[term.key] = $scope.isSelectedTerm(term);
            });

            $scope.terms = $filter('orderBySelection')($scope.terms, $scope.checkboxTerms);
          }
        });
      };

      $scope.isSelectedTerm = function (term) {
        return $scope.criterion.selectedTerms && $scope.criterion.selectedTerms.indexOf(term.key) !== -1;
      };

      $scope.state.addOnOpen(onOpen);
      $scope.checkboxTerms = {};
      $scope.RQL_NODE = RQL_NODE;
      $scope.selectedFilter = $scope.criterion.type;
      $scope.isSelected = isSelected;
      $scope.updateFilter = updateFilter;
      $scope.localize = function (values) {
        return LocalizedValues.forLocale(values, $scope.criterion.lang);
      };
      $scope.truncate = StringUtils.truncate;
      $scope.isInOutFilter = isInOutFilter;
      $scope.isContainsFilter = isContainsFilter;
      $scope.updateSelection = updateSelection;
    }])

  .controller('CoverageResultTableController', [
    '$scope',
    '$location',
    '$q',
    '$translate',
    '$filter',
    'LocalizedValues',
    'PageUrlService',
    'RqlQueryUtils',
    'RqlQueryService',
    'CoverageGroupByService',
    'StudyFilterShortcutService',
    'TaxonomyService',
    'AlertService',
    function ($scope,
              $location,
              $q,
              $translate,
              $filter,
              LocalizedValues,
              PageUrlService,
              RqlQueryUtils,
              RqlQueryService,
              CoverageGroupByService,
              StudyFilterShortcutService,
              TaxonomyService,
              AlertService) {
      var targetMap = {}, vocabulariesTermsMap = {};

      targetMap[BUCKET_TYPES.NETWORK] = QUERY_TARGETS.NETWORK;
      targetMap[BUCKET_TYPES.STUDY] = QUERY_TARGETS.STUDY;
      targetMap[BUCKET_TYPES.STUDY_INDIVIDUAL] = QUERY_TARGETS.STUDY;
      targetMap[BUCKET_TYPES.STUDY_HARMONIZATION] = QUERY_TARGETS.STUDY;
      targetMap[BUCKET_TYPES.DCE] = QUERY_TARGETS.VARIABLE;
      targetMap[BUCKET_TYPES.DCE_INDIVIDUAL] = QUERY_TARGETS.VARIABLE;
      targetMap[BUCKET_TYPES.DCE_HARMONIZATION] = QUERY_TARGETS.VARIABLE;
      targetMap[BUCKET_TYPES.DATASCHEMA] = QUERY_TARGETS.DATASET;
      targetMap[BUCKET_TYPES.DATASET] = QUERY_TARGETS.DATASET;
      targetMap[BUCKET_TYPES.DATASET_COLLECTED] = QUERY_TARGETS.DATASET;
      targetMap[BUCKET_TYPES.DATASET_HARMONIZED] = QUERY_TARGETS.DATASET;

      function decorateVocabularyHeaders(headers, vocabularyHeaders) {
        var count = 0, i = 0;
        for (var j=0 ; j < vocabularyHeaders.length; j ++) {
          if (count >= headers[i].termsCount) {
            i++;
            count = 0;
          }

          count += vocabularyHeaders[j].termsCount;
          vocabularyHeaders[j].taxonomyName = headers[i].entity.name;
        }
      }

      function decorateTermHeaders(headers, termHeaders, attr) {
        var idx = 0;
        return headers.reduce(function(result, h) {
          result[h.entity.name] = termHeaders.slice(idx, idx + h.termsCount).map(function(t) {
            if(h.termsCount > 1 && attr === 'vocabularyName') {
              t.canRemove = true;
            }

            t[attr] = h.entity.name;

            return t;
          });

          idx += h.termsCount;
          return result;
        }, {});
      }

      function dceUpdateBucket(val) {
        if (val) {
          $scope.selectBucket(BUCKET_TYPES.DCE);
        } else if ($scope.bucket.startsWith('dce')) {
          $scope.selectBucket(BUCKET_TYPES.STUDY);
        }
      }

      function onDceUpdateBucket(val, old) {
        if (val === old) {
          return;
        }

        dceUpdateBucket(val);
      }

      function setInitialFilter() {
        var result = StudyFilterShortcutService.getStudyClassNameChoices();

        if (result.choseAll) {
          $scope.bucketSelection._studySelection = STUDY_FILTER_CHOICES.ALL_STUDIES;
        } else if (result.choseIndividual) {
          $scope.bucketSelection._studySelection = STUDY_FILTER_CHOICES.INDIVIDUAL_STUDIES;
        } else if (result.choseHarmonization) {
          $scope.bucketSelection._studySelection = STUDY_FILTER_CHOICES.HARMONIZATION_STUDIES;
        }

        angular.extend($scope, result);

        var bucket = $location.search().bucket;
        if (bucket === BUCKET_TYPES.STUDY || bucket === BUCKET_TYPES.DCE) {
          $scope.bucketSelection._dceBucketSelected = bucket === BUCKET_TYPES.DCE; // don't trigger the watch callback
        }
      }

      function onLocationChange() {
        var search = $location.search();
        if (search.display && search.display === DISPLAY_TYPES.COVERAGE) {
          $scope.bucket = search.bucket ? search.bucket : CoverageGroupByService.defaultBucket();
          $scope.bucketStartsWithDce = $scope.bucket.startsWith('dce');
          $scope.singleStudy = CoverageGroupByService.isSingleStudy();
          setInitialFilter();
        }
      }

      function updateBucket (groupBy) {
        if ($scope.groupByOptions.canShowVariableTypeFilter(groupBy)) {
          $scope.selectBucket(groupBy);
        } else if (BUCKET_TYPES.STUDY !== groupBy) {
          $scope.selectBucket(BUCKET_TYPES.DCE);
        }
      }

      function dsUpdateBucket (groupBy) {
        $scope.selectBucket(groupBy);
      }

      function isStudyBucket() {
        return $scope.bucket.indexOf('study') > -1 || $scope.bucket.indexOf('dce') > -1;
      }

      function isDatasetBucket() {
        return $scope.bucket.indexOf('dataset') > -1;
      }

      function selectTab(tab) {
        if (tab === BUCKET_TYPES.STUDY) {
          updateBucket(($scope.bucketSelection.dceBucketSelected || $scope.groupByOptions.isSingleStudy()) ? BUCKET_TYPES.DCE : BUCKET_TYPES.STUDY);
        } else if (tab === BUCKET_TYPES.DATASET) {
          dsUpdateBucket(BUCKET_TYPES.DATASET);
        }
      }

      function getBucketUrl(bucket, id) {
        switch (bucket) {
          case BUCKET_TYPES.STUDY:
          case BUCKET_TYPES.STUDY_INDIVIDUAL:
          case BUCKET_TYPES.DCE:
          case BUCKET_TYPES.DCE_INDIVIDUAL:
            return PageUrlService.studyPage(id, 'individual');
          case BUCKET_TYPES.STUDY_HARMONIZATION:
          case BUCKET_TYPES.DCE_HARMONIZATION:
            return PageUrlService.studyPage(id, 'harmonization');
          case BUCKET_TYPES.NETWORK:
            return PageUrlService.networkPage(id);
          case BUCKET_TYPES.DATASCHEMA:
          case BUCKET_TYPES.DATASET_HARMONIZED:
            return PageUrlService.datasetPage(id, 'harmonized');
          case BUCKET_TYPES.DATASET:
          case BUCKET_TYPES.DATASET_COLLECTED:
            return PageUrlService.datasetPage(id, 'collected');
        }

        return '';
      }

      function updateFilterCriteriaInternal(selected) {
        var vocabulary = $scope.bucket.startsWith('dce') ? 'dceId' : 'id';
        var growlMsgKey = 'search.criterion.created';

        var rqlQuery = RqlQueryService.parseQuery($location.search().query);
        var targetQuery = RqlQueryService.findTargetQuery(targetMap[$scope.bucket], rqlQuery);
        if (!targetQuery) {
          targetQuery = new RqlQuery(targetMap[$scope.bucket]);
          rqlQuery.args.push(targetQuery);
        }

        var foundVocabularyQuery = RqlQueryService.findQueryInTargetByVocabulary(targetQuery, vocabulary);
        var vocabularyQuery;

        if (foundVocabularyQuery) {
          growlMsgKey = 'search.criterion.updated';
          vocabularyQuery = foundVocabularyQuery;
          if (vocabularyQuery.name === RQL_NODE.EXISTS) {
            vocabularyQuery.name = RQL_NODE.IN;
          }
        } else {
          vocabularyQuery = new RqlQuery(RQL_NODE.IN);
        }

        vocabularyQuery.args = ['Mica_' + targetMap[$scope.bucket] + '.' + vocabulary];
        vocabularyQuery.args.push(selected.map(function (selection) { return selection.value; }));

        if (!foundVocabularyQuery) {
          if (targetQuery.args.length > 0) {
            var andQuery = new RqlQuery(RQL_NODE.AND);
            targetQuery.args.forEach(function (arg) { andQuery.args.push(arg); });
            andQuery.args.push(vocabularyQuery);
            targetQuery.args = [andQuery];
          } else {
            targetQuery.args = [vocabularyQuery];
          }
        }

        $location.search('query', new RqlQuery().serializeArgs(rqlQuery.args));

        TaxonomyService.findVocabularyInTaxonomy(targetMap[$scope.bucket], 'Mica_' + targetMap[$scope.bucket], vocabulary)
            .then(function (foundVocabulary) {
              AlertService.growl({
                id: 'SearchControllerGrowl',
                type: 'info',
                msgKey: growlMsgKey,
                msgArgs: [foundVocabulary ?
                    LocalizedValues.forLocale(foundVocabulary.title, $translate.use()) :
                    vocabulary, $filter('translate')('taxonomy.target.' + targetMap[$scope.bucket])],
                delay: 3000
              });
            });

      }

      function splitIds() {
        var cols = {
          colSpan: $scope.bucket.startsWith('dce') ? (CoverageGroupByService.isSingleStudy() ? 2 : 3) : 1,
          ids: {}
        };

        var rowSpans = {};

        function appendRowSpan(id) {
          var rowSpan;
          if (!rowSpans[id]) {
            rowSpan = 1;
            rowSpans[id] = 1;
          } else {
            rowSpan = 0;
            rowSpans[id] = rowSpans[id] + 1;
          }
          return rowSpan;
        }

        var minMax = {};

        function appendMinMax(id, start, end) {
          if (minMax[id]) {
            if (start < minMax[id][0]) {
              minMax[id][0] = start;
            }
            if (end > minMax[id][1]) {
              minMax[id][1] = end;
            }
          } else {
            minMax[id] = [start, end];
          }
        }

        function toTime(yearMonth, start) {
          var res;
          if (yearMonth) {
            if (yearMonth.indexOf('-')>0) {
              var ym = yearMonth.split('-');
              if (!start) {
                var m = parseInt(ym[1]);
                if(m<12) {
                  ym[1] = m + 1;
                } else {
                  ym[0] = parseInt(ym[0]) + 1;
                  ym[1] = 1;
                }
              }
              var ymStr = ym[0] + '/'  + ym[1] + '/01';
              res = Date.parse(ymStr);
            } else {
              res = start ? Date.parse(yearMonth + '/01/01') : Date.parse(yearMonth + '/12/31');
            }
          }
          return res;
        }

        var currentYear = new Date().getFullYear();
        var currentMonth = new Date().getMonth() + 1;
        var currentYearMonth = currentYear + '-' + currentMonth;
        var currentDate = toTime(currentYearMonth, true);

        function getProgress(startYearMonth, endYearMonth) {
          var start = toTime(startYearMonth, true);
          var end = endYearMonth ? toTime(endYearMonth, false) : currentDate;
          var current = end < currentDate ? end : currentDate;
          if(end === start) {
            return 100;
          } else {
            return Math.round(startYearMonth ? 100 * (current - start) / (end - start) : 0);
          }
        }

        var odd = true;
        var groupId;
        $scope.result.rows.forEach(function (row, i) {
          row.hitsTitles = row.hits.map(function(hit){
            return LocalizedValues.formatNumber(hit);
          });
          cols.ids[row.value] = [];
          if ($scope.bucket.startsWith('dce')) {
            var ids = row.value.split(':');
            var isHarmo = row.className.indexOf('Harmonization') > -1 || ids[2] === '.'; // would work for both HarmonizationDataset and HarmonizationStudy
            var titles = row.title.split(':');
            var descriptions = row.description.split(':');
            var rowSpan;
            var id;

            // study
            id = ids[0];
            if (!groupId) {
              groupId = id;
            } else if(id !== groupId) {
              odd = !odd;
              groupId = id;
            }
            rowSpan = appendRowSpan(id);
            appendMinMax(id,row.start || currentYearMonth, row.end || currentYearMonth);
            cols.ids[row.value].push({
              id: CoverageGroupByService.isSingleStudy() ? '-' : id,
              url: PageUrlService.studyPage(id, isHarmo ? 'harmonization' : 'individual'),
              title: titles[0],
              description: descriptions[0],
              rowSpan: rowSpan,
              index: i++
            });

            // population
            id = ids[0] + ':' + ids[1];
            rowSpan = appendRowSpan(id);
            cols.ids[row.value].push({
              id: id,
              url: PageUrlService.studyPopulationPage(ids[0], isHarmo ? 'harmonization' : 'individual', ids[1]),
              title: titles[1],
              description: descriptions[1],
              rowSpan: rowSpan,
              index: i++
            });

            // dce
            cols.ids[row.value].push({
              id: isHarmo ? '-' : row.value,
              title: titles[2],
              description: descriptions[2],
              start: row.start,
              current: currentYearMonth,
              end: row.end,
              progressClass: odd ? 'info' : 'warning',
              url: PageUrlService.studyPopulationPage(ids[0], isHarmo ? 'harmonization' : 'individual', ids[1]),
              rowSpan: 1,
              index: i++
            });
          } else {
            var parts = $scope.bucket.split('-');
            var itemBucket = parts[0];
            if (itemBucket === BUCKET_TYPES.DATASET) {
              itemBucket = itemBucket + (row.className.indexOf('Harmonization') > -1 ? '-harmonized' : '-collected');
            } else {
              itemBucket = itemBucket + (row.className.indexOf('Harmonization') > -1 ? '-harmonization' : '-individual');
            }

            cols.ids[row.value].push({
              id: row.value,
              url: getBucketUrl(itemBucket, row.value),
              title: row.title,
              description: row.description,
              min: row.start,
              start: row.start,
              current: currentYear,
              end: row.end,
              max: row.end,
              progressStart: 0,
              progress: getProgress(row.start ? row.start + '-01' : currentYearMonth, row.end ? row.end + '-12' : currentYearMonth),
              progressClass: odd ? 'info' : 'warning',
              rowSpan: 1,
              index: i++
            });
            odd = !odd;
          }
        });

        // adjust the rowspans and the progress
        if ($scope.bucket.startsWith('dce')) {
          $scope.result.rows.forEach(function (row, i) {
            row.hitsTitles = row.hits.map(function(hit){
              return LocalizedValues.formatNumber(hit);
            });
            if (cols.ids[row.value][0].rowSpan > 0) {
              cols.ids[row.value][0].rowSpan = rowSpans[cols.ids[row.value][0].id];
            }
            if (cols.ids[row.value][1].rowSpan > 0) {
              cols.ids[row.value][1].rowSpan = rowSpans[cols.ids[row.value][1].id];
            }
            var ids = row.value.split(':');
            if (minMax[ids[0]]) {
              var min = minMax[ids[0]][0];
              var max = minMax[ids[0]][1];
              var start = cols.ids[row.value][2].start || currentYearMonth;
              var end = cols.ids[row.value][2].end || currentYearMonth;
              var diff = toTime(max, false) - toTime(min, true);
              // set the DCE min and max dates of the study
              cols.ids[row.value][2].min = min;
              cols.ids[row.value][2].max = max;
              // compute the progress
              cols.ids[row.value][2].progressStart = 100 * (toTime(start, true) - toTime(min, true))/diff;
              cols.ids[row.value][2].progress = 100 * (toTime(end, false) - toTime(start, true))/diff;
              cols.ids[row.value].index = i;
            }
          });
        }

        return cols;
      }

      function mergeCriteriaItems(criteria) {
        return criteria.reduce(function(prev, item) {
          if (prev) {
            RqlQueryService.updateCriteriaItem(prev, item);
            return prev;
          }

          item.rqlQuery = RqlQueryUtils.buildRqlQuery(item);
          return item;
        }, null);
      }

      function updateStudyClassNameFilter(choice) {
        StudyFilterShortcutService.filter(choice, $scope.lang);
      }

      function init() {
        onLocationChange();
      }

      $scope.showMissing = true;
      $scope.toggleMissing = function (value) {
        $scope.showMissing = value;
      };

      $scope.groupByOptions = CoverageGroupByService;
      $scope.bucketSelection = {
        get studySelection() {
          return this._studySelection;
        },
        set studySelection(value) {
          this._studySelection = value;

          if (!$scope.bucket || ($scope.bucket && ($scope.bucket.indexOf(BUCKET_TYPES.STUDY) > -1 || $scope.bucket.indexOf(BUCKET_TYPES.DCE) > -1))) {
            updateBucket($scope.bucket.split('-')[0]);
          } else if ($scope.bucket && $scope.bucket.indexOf(BUCKET_TYPES.DATASET) > -1) {
            dsUpdateBucket($scope.bucket.split('-')[0]);
          }

          updateStudyClassNameFilter(value);
        },
        get dceBucketSelected() {
          return this._dceBucketSelected;
        },
        set dceBucketSelected(value) {
          var oldValue = this._dceBucketSelected;
          this._dceBucketSelected = value;

          onDceUpdateBucket(value, oldValue);
        }
      };

      $scope.isStudyBucket = isStudyBucket;
      $scope.isDatasetBucket = isDatasetBucket;
      $scope.selectTab = selectTab;

      $scope.selectBucket = function (bucket) {

        $scope.bucket = bucket;
        $scope.$parent.onBucketChanged(bucket);
      };

      $scope.$on('$locationChangeSuccess', onLocationChange);
      $scope.rowspans = {};

      $scope.getSpan = function (study, population) {
        var length = 0;
        if (population) {
          var prefix = study + ':' + population;
          length = $scope.result.rows.filter(function (row) {
            return row.title.startsWith(prefix + ':');
          }).length;
          $scope.rowspans[prefix] = length;
          return length;
        } else {
          length = $scope.result.rows.filter(function (row) {
            return row.title.startsWith(study + ':');
          }).length;
          $scope.rowspans[study] = length;
          return length;
        }
      };

      $scope.hasSpan = function (study, population) {
        if (population) {
          return $scope.rowspans[study + ':' + population] > 0;
        } else {
          return $scope.rowspans[study] > 0;
        }
      };

      $scope.hasVariableTarget = function () {
        var query = $location.search().query;
        return query && RqlQueryUtils.hasTargetQuery(RqlQueryService.parseQuery(query), RQL_NODE.VARIABLE);
      };

      $scope.hasSelected = function () {
        return $scope.table && $scope.table.rows && $scope.table.rows.filter(function (r) {
            return r.selected;
          }).length;
      };

      $scope.selectAll = function() {
        if ($scope.table && $scope.table.rows) {
          $scope.table.rows.forEach(function(r){
            r.selected = true;
          });
        }
      };

      $scope.selectNone = function() {
        if ($scope.table && $scope.table.rows) {
          $scope.table.rows.forEach(function(r){
            r.selected = false;
          });
        }
      };

      $scope.selectFull = function() {
        if ($scope.table && $scope.table.rows) {
          $scope.table.rows.forEach(function(r){
            if (r.hits) {
              r.selected = r.hits.filter(function(h){
                  return h === 0;
                }).length === 0;
            } else {
              r.selected = false;
            }
          });
        }
      };

      $scope.BUCKET_TYPES = BUCKET_TYPES;

      $scope.downloadUrl = function () {
        return PageUrlService.downloadCoverage($scope.query);
      };

      $scope.$watch('result', function () {
        $scope.table = {cols: []};
        vocabulariesTermsMap = {};

        if ($scope.result && $scope.result.rows) {
          var tableTmp = $scope.result;
          tableTmp.cols = splitIds();
          $scope.table = tableTmp;

          vocabulariesTermsMap = decorateTermHeaders($scope.table.vocabularyHeaders, $scope.table.termHeaders, 'vocabularyName');
          decorateTermHeaders($scope.table.taxonomyHeaders, $scope.table.termHeaders, 'taxonomyName');
          decorateVocabularyHeaders($scope.table.taxonomyHeaders, $scope.table.vocabularyHeaders);
        }
      });

      $scope.updateCriteria = function (id, term, idx, type) { //
        var vocabulary = $scope.bucket.startsWith('dce') ? 'dceId' : 'id';
        var criteria = {varItem: RqlQueryService.createCriteriaItem(QUERY_TARGETS.VARIABLE, term.taxonomyName, term.vocabularyName, term.entity.name)};

        // if id is null, it is a click on the total count for the term
        if (id) {
          var groupBy = $scope.bucket.split('-')[0];
          if (groupBy === 'dce' && id.endsWith(':.')) {
            groupBy = 'study';
            var studyId = id.split(':')[0];
            criteria.item = RqlQueryService.createCriteriaItem(targetMap[groupBy], 'Mica_' + targetMap[groupBy], 'id', studyId);
          } else {
            criteria.item = RqlQueryService.createCriteriaItem(targetMap[groupBy], 'Mica_' + targetMap[groupBy], vocabulary, id);
          }
        } else if ($scope.bucket.endsWith('individual')) {
          criteria.item = RqlQueryService.createCriteriaItem(QUERY_TARGETS.STUDY, 'Mica_' + QUERY_TARGETS.STUDY, 'className', 'Study');
        } else if ($scope.bucket.endsWith('harmonization')) {
          criteria.item = RqlQueryService.createCriteriaItem(QUERY_TARGETS.STUDY, 'Mica_' + QUERY_TARGETS.STUDY, 'className', 'HarmonizationStudy');
        } else if ($scope.bucket.endsWith('collected')) {
          criteria.item = RqlQueryService.createCriteriaItem(QUERY_TARGETS.DATASET, 'Mica_' + QUERY_TARGETS.DATASET, 'className', 'StudyDataset');
        } else if ($scope.bucket.endsWith('harmonized')) {
          criteria.item = RqlQueryService.createCriteriaItem(QUERY_TARGETS.DATASET, 'Mica_' + QUERY_TARGETS.DATASET, 'className', 'HarmonizationDataset');
        }

        $q.all(criteria).then(function (criteria) {
          $scope.onUpdateCriteria(criteria.varItem, type, false, true);
          if (criteria.item) {
            $scope.onUpdateCriteria(criteria.item, type);
          }
          if (criteria.bucketItem) {
            $scope.onUpdateCriteria(criteria.bucketItem, type);
          }
        });
      };

      $scope.isFullCoverageImpossibleOrCoverageAlreadyFull = function () {
        var rows = $scope.table ? ($scope.table.rows || []) : [];
        var rowsWithZeroHitColumn = 0;

        if (rows.length === 0) {
          return true;
        }

        rows.forEach(function (row) {
          if (row.hits) {
            if (row.hits.filter(function (hit) { return hit === 0; }).length > 0) {
              rowsWithZeroHitColumn++;
            }
          }
        });

        if (rowsWithZeroHitColumn === 0) {
          return true;
        }

        return rows.length === rowsWithZeroHitColumn;
      };

      $scope.selectFullAndFilter = function() {
        var selected = [];
        if ($scope.table && $scope.table.rows) {
          $scope.table.rows.forEach(function(r){
            if (r.hits) {
              if (r.hits.filter(function(h){
                  return h === 0;
                }).length === 0) {
                selected.push(r);
              }
            }
          });
          console.log('selected=' + Math.round(selected.length*100/$scope.table.rows.length) + '%');
        }
        updateFilterCriteriaInternal(selected, true);
      };

      $scope.updateFilterCriteria = function () {
        updateFilterCriteriaInternal($scope.table.rows.filter(function (r) {
          return r.selected;
        }));
      };

      $scope.removeTerm = function(term) {
        var remainingCriteriaItems = vocabulariesTermsMap[term.vocabularyName].filter(function(t) {
            return t.entity.name !== term.entity.name;
          }).map(function(t) {
            return RqlQueryService.createCriteriaItem(QUERY_TARGETS.VARIABLE, t.taxonomyName, t.vocabularyName, t.entity.name);
          });

        $q.all(remainingCriteriaItems).then(function(criteriaItems) {
          $scope.onUpdateCriteria(mergeCriteriaItems(criteriaItems), null, true, false, false);
        });
      };

      $scope.removeVocabulary = function(vocabulary) {
        RqlQueryService.createCriteriaItem(QUERY_TARGETS.VARIABLE, vocabulary.taxonomyName, vocabulary.entity.name).then(function(item){
          $scope.onRemoveCriteria(item);
        });
      };

      init();
    }])

  .controller('GraphicsResultController', [
    'GraphicChartsConfig',
    'GraphicChartsUtils',
    'RqlQueryService',
    '$filter',
    '$scope',
    'D3GeoConfig', 'D3ChartConfig',
    function (GraphicChartsConfig,
              GraphicChartsUtils,
              RqlQueryService,
              $filter,
              $scope, D3GeoConfig, D3ChartConfig) {

      $scope.hasChartObjects = function () {
        return $scope.chartObjects && Object.keys($scope.chartObjects).length > 0;
      };

      var setChartObject = function (vocabulary, dtoObject, header, title, options, isTable) {

        return GraphicChartsUtils.getArrayByAggregation(vocabulary, dtoObject)
          .then(function (entries){
            var data = entries.map(function (e) {
              if (e.participantsNbr && isTable) {
                return [e.title, e.value, e.participantsNbr];
              }
              else {
                return [e.title, e.value];
              }
            });

            if (data.length > 0) {
              data.unshift(header);
              angular.extend(options, {title: title});

              return {
                data: data,
                entries: entries,
                options: options,
                vocabulary: vocabulary
              };
            }
          });

      };

      var charOptions = GraphicChartsConfig.getOptions().ChartsOptions;

      $scope.updateCriteria = function (key, vocabulary) {
        RqlQueryService.createCriteriaItem('study', 'Mica_study', vocabulary, key).then(function (item) {
          $scope.onUpdateCriteria(item, 'studies');
        });
      };

      $scope.$watch('result', function (result) {
        $scope.chartObjects = {};
        $scope.noResults = true;

        if (result && result.studyResultDto.totalHits) {
          $scope.noResults = false;
          setChartObject('populations-model-selectionCriteria-countriesIso',
            result.studyResultDto,
            [$filter('translate')(charOptions.geoChartOptions.header[0]), $filter('translate')(charOptions.geoChartOptions.header[1])],
            $filter('translate')(charOptions.geoChartOptions.title) + ' (N=' + result.studyResultDto.totalHits + ')',
            charOptions.geoChartOptions.options).then(function(geoStudies) {
              if (geoStudies) {
                var d3Config = new D3GeoConfig()
                  .withData(geoStudies.entries)
                  .withTitle($filter('translate')(charOptions.geoChartOptions.title) + ' (N=' + result.studyResultDto.totalHits + ')');
                d3Config.withColor(charOptions.geoChartOptions.options.colors);
                var chartObject = {
                  geoChartOptions: {
                    directiveTitle: geoStudies.options.title,
                    headerTitle: $filter('translate')('graphics.geo-charts'),
                    chartObject: {
                      geoTitle: geoStudies.options.title,
                      options: geoStudies.options,
                      type: 'GeoChart',
                      vocabulary: geoStudies.vocabulary,
                      data: geoStudies.data,
                      entries: geoStudies.entries,
                      d3Config: d3Config
                    }
                  }
                };
                chartObject.geoChartOptions.getTable = function(){
                  return chartObject.geoChartOptions.chartObject;
                };
                angular.extend($scope.chartObjects, chartObject);
              }
            });
          // Study design chart.
          setChartObject('model-methods-design',
            result.studyResultDto,
            [$filter('translate')(charOptions.studiesDesigns.header[0]),
              $filter('translate')(charOptions.studiesDesigns.header[1])
              ],
            $filter('translate')(charOptions.studiesDesigns.title) + ' (N=' + result.studyResultDto.totalHits + ')',
            charOptions.studiesDesigns.options).then(function(methodDesignStudies) {
              if (methodDesignStudies) {
                var d3Config = new D3ChartConfig(methodDesignStudies.vocabulary)
                    .withType('multiBarHorizontalChart')
                    .withTitle($filter('translate')(charOptions.studiesDesigns.title) + ' (N=' + result.studyResultDto.totalHits + ')')
                    .withData(angular.copy(methodDesignStudies.entries), false, $filter('translate')('graphics.nbr-studies'));
                d3Config.options.chart.showLegend = false;
                d3Config.options.chart.color = charOptions.numberParticipants.options.colors;
                var chartObject= {
                  studiesDesigns: {
                    //directiveTitle: methodDesignStudies.options.title ,
                    headerTitle: $filter('translate')('graphics.study-design'),
                    chartObject: {
                      options: methodDesignStudies.options,
                      type: 'BarChart',
                      data: methodDesignStudies.data,
                      vocabulary: methodDesignStudies.vocabulary,
                      entries: methodDesignStudies.entries,
                      d3Config: d3Config
                    }
                  }
                };
                angular.extend($scope.chartObjects, chartObject);
              }
            });

          // Study design table.
          setChartObject('model-methods-design',
            result.studyResultDto,
            [$filter('translate')(charOptions.studiesDesigns.header[0]),
              $filter('translate')(charOptions.studiesDesigns.header[1]),
              $filter('translate')(charOptions.studiesDesigns.header[2])
            ],
            $filter('translate')(charOptions.studiesDesigns.title) + ' (N=' + result.studyResultDto.totalHits + ')',
            charOptions.studiesDesigns.options, true).then(function(methodDesignStudies) {
            if (methodDesignStudies) {
              var chartObject = {
                  chartObjectTable: {
                    options: methodDesignStudies.options,
                    type: 'BarChart',
                    data: methodDesignStudies.data,
                    vocabulary: methodDesignStudies.vocabulary,
                    entries: methodDesignStudies.entries
                  }

              };
              chartObject.getTable= function(){
                return chartObject.chartObjectTable;
              };
              angular.extend($scope.chartObjects.studiesDesigns, chartObject);
            }
          });
          setChartObject('model-numberOfParticipants-participant-number-range',
            result.studyResultDto,
            [$filter('translate')(charOptions.numberParticipants.header[0]), $filter('translate')(charOptions.numberParticipants.header[1])],
            $filter('translate')(charOptions.numberParticipants.title) + ' (N=' + result.studyResultDto.totalHits + ')',
            charOptions.numberParticipants.options).then(function(numberParticipant) {
              if (numberParticipant) {
                var chartConfig = new D3ChartConfig(numberParticipant.vocabulary)
                  .withType('pieChart')
                  .withTitle($filter('translate')(charOptions.numberParticipants.title) + ' (N=' + result.studyResultDto.totalHits + ')')
                  .withData(angular.copy(numberParticipant.entries), true);
                chartConfig.options.chart.legendPosition = 'right';
                chartConfig.options.chart.color = charOptions.numberParticipants.options.colors;
                var chartObject = {
                  numberParticipants: {
                    headerTitle: $filter('translate')('graphics.number-participants'),
                    chartObject: {
                      options: numberParticipant.options,
                      type: 'PieChart',
                      data: numberParticipant.data,
                      vocabulary: numberParticipant.vocabulary,
                      entries: numberParticipant.entries,
                      d3Config: chartConfig
                    }
                  }
                };
                chartObject.numberParticipants.getTable= function(){
                  return chartObject.numberParticipants.chartObject;
                };
                angular.extend($scope.chartObjects, chartObject);
              }
            });

          setChartObject('populations-dataCollectionEvents-model-bioSamples',
            result.studyResultDto,
            [$filter('translate')(charOptions.biologicalSamples.header[0]), $filter('translate')(charOptions.biologicalSamples.header[1])],
            $filter('translate')(charOptions.biologicalSamples.title) + ' (N=' + result.studyResultDto.totalHits + ')',
            charOptions.biologicalSamples.options).then(function(bioSamplesStudies) {
              if (bioSamplesStudies) {
                var d3Config = new D3ChartConfig(bioSamplesStudies.vocabulary)
                    .withType('multiBarHorizontalChart')
                    .withTitle($filter('translate')(charOptions.biologicalSamples.title) + ' (N=' + result.studyResultDto.totalHits + ')')
                    .withData(angular.copy(bioSamplesStudies.entries), false, $filter('translate')('graphics.nbr-studies'));
                d3Config.options.chart.showLegend = false;
                d3Config.options.chart.color = charOptions.numberParticipants.options.colors;
                var chartObject = {
                  biologicalSamples: {
                    headerTitle: $filter('translate')('graphics.bio-samples'),
                    chartObject: {
                      options: bioSamplesStudies.options,
                      type: 'BarChart',
                      data: bioSamplesStudies.data,
                      vocabulary: bioSamplesStudies.vocabulary,
                      entries: bioSamplesStudies.entries,
                      d3Config: d3Config
                    }
                  }
                };
                chartObject.biologicalSamples.getTable= function(){
                  return chartObject.biologicalSamples.chartObject;
                };
                angular.extend($scope.chartObjects, chartObject);
              }
            });
        }
      });
    }])

  .controller('SearchResultPaginationController', ['$scope', 'ngObibaMicaSearch', function ($scope, ngObibaMicaSearch) {

    function updateMaxSize() {
      $scope.maxSize = Math.min(3, Math.ceil($scope.totalHits / $scope.pagination.selected.value));
    }

    function calculateRange() {
      var pageSize = $scope.pagination.selected.value;
      var current = $scope.pagination.currentPage;
      $scope.pagination.from = pageSize * (current - 1) + 1;
      $scope.pagination.to = Math.min($scope.totalHits, pageSize * current);
    }

    function canShow() {
      return angular.isUndefined($scope.showTotal) ||  true === $scope.showTotal;
    }

    var pageChanged = function () {
      calculateRange();
      if ($scope.onChange) {
        $scope.onChange(
          $scope.target,
          ($scope.pagination.currentPage - 1) * $scope.pagination.selected.value,
          $scope.pagination.selected.value
        );
      }
    };

    var pageSizeChanged = function () {
      updateMaxSize();
      $scope.pagination.currentPage = 1;
      pageChanged();
    };

    $scope.canShow = canShow;
    $scope.pageChanged = pageChanged;
    $scope.pageSizeChanged = pageSizeChanged;
    $scope.pageSizes = [
      {label: '10', value: 10},
      {label: '20', value: 20},
      {label: '50', value: 50},
      {label: '100', value: 100}
    ];

    var listPageSize = ngObibaMicaSearch.getDefaultListPageSize($scope.target);
    var initialTargetPageSize = $scope.pageSizes.filter(function(p) {
      return p.value === listPageSize;
    });

    $scope.pagination = {
      selected: initialTargetPageSize.length>0 ? initialTargetPageSize[0] : $scope.pageSizes[0],
      currentPage: 1
    };

    $scope.$watch('totalHits', function () {
      updateMaxSize();
      calculateRange();
    });
  }])
  .controller('ResultTabsOrderCountController', [function(){
  }]);
;/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

/* global STUDY_FILTER_CHOICES */

/* exported CRITERIA_ITEM_EVENT */
var CRITERIA_ITEM_EVENT = {
  deleted: 'event:delete-criteria-item',
  refresh: 'event:refresh-criteria-item'
};

ngObibaMica.search

  .directive('taxonomyPanel', [function () {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        taxonomy: '=',
        lang: '=',
        onNavigate: '='
      },
      templateUrl: 'search/views/classifications/taxonomy-panel-template.html'
    };
  }])

  .directive('vocabularyPanel', [function () {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        target: '=',
        taxonomy: '=',
        vocabulary: '=',
        lang: '=',
        onNavigate: '=',
        onSelect: '=',
        onHideSearchNavigate: '=',
        isInHideNavigate: '='
      },
      templateUrl: 'search/views/classifications/vocabulary-panel-template.html'
    };
  }])

  .directive('termPanel', [function () {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        target: '=',
        taxonomy: '=',
        vocabulary: '=',
        term: '=',
        lang: '=',
        onSelect: '='
      },
      templateUrl: 'search/views/classifications/term-panel-template.html'
    };
  }])

  .directive('networksResultTable', ['PageUrlService', 'ngObibaMicaSearch', 'RqlQueryService', 'StudyFilterShortcutService', 'ngObibaMicaSearchTemplateUrl',
    function (PageUrlService, ngObibaMicaSearch, RqlQueryService, StudyFilterShortcutService, ngObibaMicaSearchTemplateUrl) {
      return {
        restrict: 'EA',
        replace: true,
        scope: {
          lang: '=',
          summaries: '=',
          loading: '=',
          onUpdateCriteria: '='
        },
        templateUrl: ngObibaMicaSearchTemplateUrl.getTemplateUrl('searchNetworksResultTable'),
        link: function(scope) {
          function setInitialStudyFilterSelection() {
            var result = StudyFilterShortcutService.getStudyClassNameChoices();

            angular.extend(scope, result); // adds choseAll, choseIndividual and choseHarmonization functions

            /* jshint bitwise: false */
            scope.colSpans = {
              datasets: (scope.optionsCols.showNetworksStudyDatasetColumn & result.choseIndividual) + (scope.optionsCols.showNetworksHarmonizationDatasetColumn & result.choseHarmonization),
              variables: (scope.optionsCols.showNetworksStudyVariablesColumn & result.choseIndividual) + (scope.optionsCols.showNetworksDataschemaVariablesColumn & result.choseHarmonization)
            };
          }

          scope.options = ngObibaMicaSearch.getOptions().networks;
          scope.optionsCols = scope.options.networksColumn;
          scope.PageUrlService = PageUrlService;

          scope.$on('$locationChangeSuccess', function () {
            setInitialStudyFilterSelection();
          });

          scope.updateCriteria = function (id, type, destinationType) {
            var datasetClassName;
            if (type === 'HarmonizationDataset' || type === 'StudyDataset') {
              datasetClassName = type;
              type = 'datasets';
            }

            var stuydClassName;
            if (type === 'HarmonizationStudy' || type === 'Study') {
              stuydClassName = type;
              type = 'studies';
            }

            var variableType;
            if (type === 'DataschemaVariable' || type === 'CollectedVariable') {
              variableType = type.replace('Variable', '');
              type = 'variables';
            }

            type = destinationType ? destinationType : type;

            RqlQueryService.createCriteriaItem('network', 'Mica_network', 'id', id).then(function (item) {
              if(datasetClassName) {
                RqlQueryService.createCriteriaItem('dataset', 'Mica_dataset', 'className', datasetClassName).then(function(datasetItem) {
                  scope.onUpdateCriteria(item, type);
                  scope.onUpdateCriteria(datasetItem, type);
                });
              } else if(stuydClassName) {
                RqlQueryService.createCriteriaItem('study', 'Mica_study', 'className', stuydClassName).then(function(studyItem) {
                  scope.onUpdateCriteria(item, type);
                  scope.onUpdateCriteria(studyItem, type);
                });
              } else if (variableType) {
                RqlQueryService.createCriteriaItem('variable', 'Mica_variable', 'variableType', variableType).then(function (variableItem) {
                  scope.onUpdateCriteria(item, type);
                  scope.onUpdateCriteria(variableItem, type);
                });
              } else {
                scope.onUpdateCriteria(item, type);
              }
            });
          };

          setInitialStudyFilterSelection();
        }
      };
  }])

  .directive('datasetsResultTable', ['$log',
    'PageUrlService',
    'ngObibaMicaSearch',
    'TaxonomyResource',
    'RqlQueryService',
    'ngObibaMicaSearchTemplateUrl',
    function ($log,
              PageUrlService,
              ngObibaMicaSearch,
              TaxonomyResource,
              RqlQueryService,
              ngObibaMicaSearchTemplateUrl) {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        lang: '=',
        summaries: '=',
        loading: '=',
        onUpdateCriteria: '='
      },
      templateUrl: ngObibaMicaSearchTemplateUrl.getTemplateUrl('searchDatasetsResultTable'),
      link: function(scope) {
        scope.classNames = {};
        TaxonomyResource.get({
          target: 'dataset',
          taxonomy: 'Mica_dataset'
        }).$promise.then(function (taxonomy) {

          if (taxonomy.vocabularies) {
            scope.classNames = taxonomy.vocabularies.filter(function (v) {
              return v.name === 'className';
            })[0].terms.reduce(function (prev, t) {
              prev[t.name] = t.title.map(function (t) {
                return {lang: t.locale, value: t.text};
              });
              return prev;
            }, {});
          } else {
            $log.warn('Taxonomy has no vocabularies');
          }
        });

        scope.updateCriteria = function (id, type) {
          RqlQueryService.createCriteriaItem('dataset', 'Mica_dataset', 'id', id).then(function(item) {
            scope.onUpdateCriteria(item, type);
          });
        };

        scope.options = ngObibaMicaSearch.getOptions().datasets;
        scope.optionsCols = scope.options.datasetsColumn;
        scope.PageUrlService = PageUrlService;
      }
    };
  }])

  .directive('studyFilterShortcut', ['$location', '$translate', 'RqlQueryService', 'StudyFilterShortcutService',
    function ($location, $translate, RqlQueryService, StudyFilterShortcutService) {
      return {
        restrict: 'EA',
        replace: true,
        templateUrl: 'search/views/search-study-filter-template.html',
        link: function (scope) {
          scope.studyFilterSelection = {
            get selection() {
              return this._selection;
            },
            set selection(value) {
              this._selection = value;
              updateStudyClassNameFilter(value);
            }
          };

          function updateStudyClassNameFilter(choice) {
            StudyFilterShortcutService.filter(choice, $translate.use());
          }

          function setChoice() {
            var result = StudyFilterShortcutService.getStudyClassNameChoices();
            if (result.choseAll) {
              scope.studyFilterSelection._selection = STUDY_FILTER_CHOICES.ALL_STUDIES;
            } else if (result.choseIndividual) {
              scope.studyFilterSelection._selection = STUDY_FILTER_CHOICES.INDIVIDUAL_STUDIES;
            } else if (result.choseHarmonization) {
              scope.studyFilterSelection._selection = STUDY_FILTER_CHOICES.HARMONIZATION_STUDIES;
            }
          }

          scope.$on('$locationChangeSuccess', function () {
            setChoice();
          });

          setChoice();
        }
      };
    }]
  )

  .directive('studiesResultTable', ['$log', '$q', '$location',
    'PageUrlService',
    'ngObibaMicaSearch',
    'TaxonomyResource',
    'RqlQueryService',
    'LocalizedValues',
    'ngObibaMicaSearchTemplateUrl',
    'StudyFilterShortcutService',
    function ($log, $q, $location,
              PageUrlService,
              ngObibaMicaSearch,
              TaxonomyResource,
              RqlQueryService,
              LocalizedValues,
              ngObibaMicaSearchTemplateUrl,
              StudyFilterShortcutService) {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        lang: '=',
        summaries: '=',
        loading: '=',
        onUpdateCriteria: '='
      },
      templateUrl: ngObibaMicaSearchTemplateUrl.getTemplateUrl('searchStudiesResultTable'),
      link: function(scope) {
        $q.all([
          TaxonomyResource.get({target: 'study', taxonomy: 'Mica_study'}).$promise
        ]).then(function (data) {
          var taxonomy = data[0];
          scope.taxonomy = taxonomy;
          getDatasourceTitles();
          if (taxonomy.vocabularies) {
            scope.designs = taxonomy.vocabularies.filter(function (v) {
              return v.name === 'methods-design';
            })[0].terms.reduce(function (prev, t) {
              prev[t.name] = t.title.map(function (t) {
                return {lang: t.locale, value: t.text};
              });
              return prev;
            }, {});
          } else {
            $log.warn('Taxonomy has no vocabularies');
          }

          setInitialStudyFilterSelection();
        });

        scope.taxonomy = {};
        scope.designs = {};
        scope.datasourceTitles = {};
        scope.studyFilterSelection = {
          get selection() {
            return this._selection;
          },
          set selection(value) {
            this._selection = value;
            updateStudyClassNameFilter(value);
          }
        };

        scope.$on('$locationChangeSuccess', function () {
          setInitialStudyFilterSelection();
        });

        function updateStudyClassNameFilter(choice) {
          StudyFilterShortcutService.filter(choice, scope.lang);
        }

        function setInitialStudyFilterSelection() {
          var result = StudyFilterShortcutService.getStudyClassNameChoices();
          angular.extend(scope, result); // adds choseAll, choseIndividual and choseHarmonization functions
        }

        function getDatasourceTitles() {
          if (Object.keys(scope.taxonomy).length < 1 ||
            !scope.taxonomy.vocabularies ||
            Object.keys(scope.datasourceTitles).length > 0) {
            return;
          }

          scope.taxonomy.vocabularies.some(function(vocabulary) {
            if (vocabulary.name === 'populations-dataCollectionEvents-dataSources') {
              vocabulary.terms.forEach(function(term) {
                scope.datasourceTitles[term.name] = {title: LocalizedValues.forLocale(term.title, scope.lang)};
              });
              return true;
            }
            return false;
          });
        }

        scope.$watch('lang', getDatasourceTitles);

        scope.hasDatasource = function (datasources, id) {
          return datasources && datasources.indexOf(id) > -1;
        };

        scope.options = ngObibaMicaSearch.getOptions().studies;
        scope.optionsCols = scope.options.studiesColumn;
        scope.PageUrlService = PageUrlService;

        scope.updateCriteria = function (id, type, destinationType) {
          var datasetClassName;
          if (type === 'HarmonizationDataset' || type === 'StudyDataset') {
            datasetClassName = type;
            type = 'datasets';
          }

          var stuydClassName;
          if (type === 'HarmonizationStudy' || type === 'Study') {
            stuydClassName = type;
            type = 'studies';
          }

          var variableType;
          if (type === 'DataschemaVariable' || type === 'CollectedVariable') {
            variableType = type.replace('Variable', '');
            type = 'variables';
          }

          type = destinationType ? destinationType : type;

          RqlQueryService.createCriteriaItem('study', 'Mica_study', 'id', id).then(function(item) {
            if(datasetClassName) {
              RqlQueryService.createCriteriaItem('dataset', 'Mica_dataset', 'className', datasetClassName).then(function (datasetItem) {
                scope.onUpdateCriteria(item, type);
                scope.onUpdateCriteria(datasetItem, type);
              });
            } else if(stuydClassName) {
              RqlQueryService.createCriteriaItem('study', 'Mica_study', 'className', stuydClassName).then(function(studyItem) {
                scope.onUpdateCriteria(item, type);
                scope.onUpdateCriteria(studyItem, type);
              });
            } else if (variableType) {
              RqlQueryService.createCriteriaItem('variable', 'Mica_variable', 'variableType', variableType).then(function (variableItem) {
                scope.onUpdateCriteria(item, type);
                scope.onUpdateCriteria(variableItem, type);
              });
            } else {
              scope.onUpdateCriteria(item, type);
            }
          });
        };
      }
    };
  }])

  .directive('variablesResultTable', ['PageUrlService', 'ngObibaMicaSearch', function (PageUrlService, ngObibaMicaSearch) {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        lang: '=',
        summaries: '=',
        loading: '='
      },
      templateUrl: 'search/views/list/variables-search-result-table-template.html',
      link: function(scope) {
        scope.options = ngObibaMicaSearch.getOptions().variables;
        scope.optionsCols = scope.options.variablesColumn;
        scope.PageUrlService = PageUrlService;
      }
    };
  }])

  .directive('coverageResultTable', [function () {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        result: '=',
        loading: '=',
        bucket: '=',
        query: '=',
        criteria: '=',
        onUpdateCriteria: '=',
        onRemoveCriteria: '='
      },
      controller: 'CoverageResultTableController',
      templateUrl: 'search/views/coverage/coverage-search-result-table-template.html'
    };
  }])

  .directive('graphicsResult', [function () {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        result: '=',
        loading: '=',
        onUpdateCriteria: '='
      },
      controller: 'GraphicsResultController',
      templateUrl: 'search/views/graphics/graphics-search-result-template.html'
    };
  }])

  .directive('includeReplace', function () {
    return {
      require: 'ngInclude',
      link: function (scope, el) {
        el.replaceWith(el.children());
      }
    };
  })

  .directive('scrollToTop', function(){
    return {
      restrict: 'A',
      scope: {
        trigger: '=scrollToTop'
      },
      link: function postLink(scope, elem) {
        scope.$watch('trigger', function() {
          elem[0].scrollTop = 0;
        });
      }
    };
  })

  .directive('resultPanel', [function () {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        type: '=',
        bucket: '=',
        query: '=',
        criteria: '=',
        display: '=',
        result: '=',
        lang: '=',
        loading: '=',
        searchTabsOrder: '=',
        resultTabsOrder: '=',
        onTypeChanged: '=',
        onBucketChanged: '=',
        onPaginate: '=',
        onUpdateCriteria: '=',
        onRemoveCriteria: '='
      },
      controller: 'SearchResultController',
      templateUrl: 'search/views/search-result-panel-template.html'
    };
  }])

  .directive('criteriaRoot', [function(){
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        item: '=',
        query: '=',
        advanced: '=',
        onRemove: '=',
        onRefresh: '=',
        isFacetted: '='
      },
      templateUrl: 'search/views/criteria/criteria-root-template.html',
      link: function($scope) {
        $scope.$on(CRITERIA_ITEM_EVENT.deleted, function(event, item){
          $scope.onRemove(item);
        });

        $scope.$on(CRITERIA_ITEM_EVENT.refresh, function(){
          $scope.onRefresh();
        });
      }
    };
  }])

  .directive('criteriaTarget', [function(){
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        item: '=',
        query: '=',
        advanced: '='
      },
      templateUrl: 'search/views/criteria/criteria-target-template.html'
    };
  }])

  .directive('criteriaNode', [function(){
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        item: '=',
        query: '=',
        advanced: '='
      },
      controller: 'CriterionLogicalController',
      templateUrl: 'search/views/criteria/criteria-node-template.html'
    };
  }])

  /**
   * This directive creates a hierarchical structure matching that of a RqlQuery tree.
   */
  .directive('criteriaLeaf', ['CriteriaNodeCompileService', function(CriteriaNodeCompileService){
      return {
        restrict: 'EA',
        replace: true,
        scope: {
          item: '=',
          query: '=',
          advanced: '='
        },
        controller: 'CriterionLogicalController',
        link: function(scope, element) {
          CriteriaNodeCompileService.compile(scope, element);
        }
      };
    }])

  .directive('numericCriterion', [function () {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        criterion: '=',
        query: '=',
        state: '='
      },
      controller: 'NumericCriterionController',
      templateUrl: 'search/views/criteria/criterion-numeric-template.html'
    };
  }])
  .directive('searchCriteriaRegion', ['ngObibaMicaSearchTemplateUrl', function(ngObibaMicaSearchTemplateUrl){
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        options: '=',
        search: '='
      },
      controller: 'searchCriteriaRegionController',
      templateUrl: ngObibaMicaSearchTemplateUrl.getTemplateUrl('searchCriteriaRegionTemplate')
    };
  }])
  /**
   * This directive serves as the container for each time of criterion based on a vocabulary type.
   * Specialize contents types as directives and share the state with this container.
   */
  .directive('criterionDropdown', ['$document', '$timeout', 'ngObibaMicaSearchTemplateUrl', function ($document, $timeout, ngObibaMicaSearchTemplateUrl) {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        criterion: '=',
        query: '='
      },
      controller: 'CriterionDropdownController',
      templateUrl: ngObibaMicaSearchTemplateUrl.getTemplateUrl('CriterionDropdownTemplate'),
      link: function( $scope, $element){
        var onDocumentClick = function (event) {
          var isChild = document.querySelector('#'+$scope.criterion.id.replace('.','-')+'-dropdown-'+$scope.timestamp)
            .contains(event.target);

          if (!isChild) {
            $timeout(function() {
              $scope.$apply('closeDropdown()');
            });
          }
        };

        $document.on('click', onDocumentClick);
        $element.on('$destroy', function () {
          $document.off('click', onDocumentClick);
        });
      }
    };
  }])

  /**
   * Directive specialized for vocabulary of type String
   */
  .directive('stringCriterionTerms', [function () {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        criterion: '=',
        query: '=',
        state: '='
      },
      controller: 'StringCriterionTermsController',
      templateUrl: 'search/views/criteria/criterion-string-terms-template.html'
    };
  }])

  /**
   * Directive specialized for vocabulary of type String
   */
  .directive('matchCriterion', [function () {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        criterion: '=',
        query: '=',
        state: '='
      },
      controller: 'MatchCriterionTermsController',
      templateUrl: 'search/views/criteria/criterion-match-template.html'
    };
  }])

  .directive('searchResultPagination', [function() {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        showTotal: '=',
        target: '=',
        totalHits: '=',
        onChange: '='
      },
      controller: 'SearchResultPaginationController',
      templateUrl: 'search/views/list/search-result-pagination-template.html'
    };
  }])

  .directive('taxonomiesFacetsPanel',[function() {
    return {
      restrict: 'EA',
      scope: {
        facetedTaxonomies: '=',
        onRefresh: '=',
        onSelectTerm: '=',
        lang: '=',
        criteria: '='
      },
      controller: 'TaxonomiesFacetsController',
      templateUrl: 'search/views/classifications/taxonomies-facets-view.html'
    };
  }])

  .directive('taxonomiesPanel',[function() {
    return {
    restrict: 'EA',
    replace: true,
    scope: {
      taxonomyName: '=',
      target: '=',
      onClose: '=',
      onSelectTerm: '=',
      taxonomiesShown: '=',
      lang: '='
    },
    controller: 'TaxonomiesPanelController',
    templateUrl: 'search/views/classifications/taxonomies-view.html',
    link: function(scope, element) {
      scope.closeTaxonomies = function () {
        element.collapse('hide');
        scope.onClose();
      };

      scope.showTaxonomies = function() {
        element.collapse('show');
      };

      element.on('show.bs.collapse', function () {
        scope.taxonomiesShown = true;
      });

      element.on('hide.bs.collapse', function () {
        scope.taxonomiesShown = false;
      });

      scope.$watch('taxonomiesShown', function(value) {
        if(value) {
          element.collapse('show');
        } else {
          element.collapse('hide');
        }
      });

      }
    };
  }])

  .directive('classificationsPanel',[function() {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        target: '=',
        onSelectTerm: '=',
        isHistoryEnabled: '=',
        lang: '='
      },
      controller: 'ClassificationPanelController',
      templateUrl: 'search/views/classifications/classifications-view.html'
    };
  }])

  .factory('Fullscreen', ['$document', '$window', '$rootScope', function ($document, $window, $rootScope) {
    // based on: https://github.com/fabiobiondi/angular-fullscreen
    var document = $document[0];
    var isKeyboardAvailbleOnFullScreen = (typeof $window.Element !== 'undefined' && 'ALLOW_KEYBOARD_INPUT' in $window.Element) && $window.Element.ALLOW_KEYBOARD_INPUT;
    var emitter = $rootScope.$new();


    var serviceInstance = {
      $on: angular.bind(emitter, emitter.$on),
      enable: function(element) {
        if(element.requestFullScreen) {
          element.requestFullScreen();
        } else if(element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if(element.webkitRequestFullscreen) {
          // Safari temporary fix
          if (/Version\/[\d]{1,2}(\.[\d]{1,2}){1}(\.(\d){1,2}){0,1} Safari/.test($window.navigator.userAgent)) {
            element.webkitRequestFullscreen();
          } else {
            element.webkitRequestFullscreen(isKeyboardAvailbleOnFullScreen);
          }
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen();
        }
      },
      cancel: function() {
        if(document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if(document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if(document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      },
      isEnabled: function(){
        var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
        return fullscreenElement ? true : false;
      }
    };

    $document.on('fullscreenchange webkitfullscreenchange mozfullscreenchange MSFullscreenChange', function(){
      emitter.$emit('ngObibaMicaSearch.fullscreenChange', serviceInstance.isEnabled());
    });

    return serviceInstance;
  }])

  .directive('fullscreen', ['Fullscreen', function(Fullscreen) {
    return {
      link : function ($scope, $element, $attrs) {
        if ($attrs.fullscreen) {
          $scope.$watch($attrs.fullscreen, function(value) {
            var isEnabled = Fullscreen.isEnabled();
            if (value && !isEnabled) {
              Fullscreen.enable($element[0]);
              $element.addClass('isInFullScreen');
            } else if (!value && isEnabled) {
              Fullscreen.cancel();
              $element.removeClass('isInFullScreen');
            }
          });
        }
      }
    };
  }])
  .directive('resultTabsOrderCount', [function(){
    return {
      restrict: 'EA',
      replace: true,
      controller: 'ResultTabsOrderCountController',
      templateUrl: 'search/views/result-tabs-order-template-view.html'
    };
  }]);
;/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

ngObibaMica.search
  .config(['$routeProvider',
    function ($routeProvider) {
      // This will be used to delay the loading of the search config until the options are all resolved; the result is
      // injected to the SearchController.
      var optionsResolve = ['ngObibaMicaSearch', function (ngObibaMicaSearch) {
        return ngObibaMicaSearch.getOptionsAsyn();
      }];

      $routeProvider
        .when('/search', {
          templateUrl: 'search/views/search-layout.html',
          controller: 'SearchController',
          reloadOnSearch: false,
          resolve: {
            options: optionsResolve
          }
        })
        .when('/classifications', {
          templateUrl: 'search/views/classifications.html',
          controller: 'SearchController',
          reloadOnSearch: false,
          resolve: {
            options: optionsResolve
          }
        });
    }]);
;/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

(function() {


  /**
   * Parses each metaTaxonomies taxonomy and returns a list of :
   * [
   *  {
   *    info: {
   *      name: name,
   *      title: title
   *     },
   *    taxonomies: [taxos]
   *   }
   * ]
   * @constructor
   */
  ngObibaMica.search.MetaTaxonomyParser = function(config) {

    function parseTerms(targetConfig, terms) {
      return terms.map(function(taxonomy, index) {
        var result = {
          state: new ngObibaMica.search.PanelTaxonomyState(index+''),
          info: {name: taxonomy.name || '', title: taxonomy.title || '', description: taxonomy.description || ''},
          taxonomies: [taxonomy]
        };

        var taxonomyConfig = targetConfig.taxonomies[taxonomy.name];

        if (taxonomyConfig.hasOwnProperty('trKey')) {
          result.info.trKey = taxonomyConfig.trKey;
        }

        return result;
      }); 
    }

    function createResultObject(metaVocabulary, taxonomies) {
      return {
        name: metaVocabulary.name,
        title: metaVocabulary.title,
        taxonomies: taxonomies
      };
    }

    function sortTaxonomies(target, taxonomies) {
      var configTaxonomies = config[target].taxonomies;
      taxonomies.sort(function(a, b) {
        return configTaxonomies[a.info.name].weight - configTaxonomies[b.info.name].weight;
      });
    }

    this.config = config;
    this.parseTerms = parseTerms;
    this.createResultObject = createResultObject;
    this.sortTaxonomies = sortTaxonomies;
  };

  ngObibaMica.search.MetaTaxonomyParser.prototype.parseEntityTaxonomies = function(metaVocabulary) {
    return this.createResultObject(metaVocabulary,
      this.parseTerms(this.config[metaVocabulary.name], metaVocabulary.terms || []));
  };

  /**
   * Variable meta taxonomies need to be massaged a little more:
   * - extract Variable characteristics
   * - extract Scales as one taxonomy (there are four related taxonomies) into one
   * - sort them and return the list to the client code
   * @param metaVocabulary
   * @returns {{name, title, taxonomies}|*}
   */
  ngObibaMica.search.MetaTaxonomyParser.prototype.parseVariableTaxonomies = function(metaVocabulary) {

    var metaTaxonomies = metaVocabulary.terms.filter(function (term) {
      return ['Variable_chars', 'Scales'].indexOf(term.name) > -1;
    }).reduce(function(acc, term) {
      var key = new obiba.utils.NgObibaStringUtils().camelize(term.name);
      acc[key] = term;
      return acc;
    }, {});

    var taxonomies = this.parseTerms(this.config[QUERY_TARGETS.VARIABLE], metaTaxonomies.variableChars.terms);

    var scales = metaTaxonomies.scales;
    if (scales && scales.terms) {
      taxonomies.push({
        state: new ngObibaMica.search.PanelTaxonomyState(),
        info: {
          name: scales.name,
          names: scales.terms.map(function(t){return t.name;}),
          title: scales.title,
          description: scales.description || ''
        },
        taxonomies: scales.terms
      });
    }

    this.sortTaxonomies(QUERY_TARGETS.VARIABLE, taxonomies);
    return this.createResultObject(metaVocabulary, taxonomies);
  };

})();;/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

(function() {

  'use strict';

  ngObibaMica.search.PanelTaxonomyState = function(id) {
    var STATES = {
      NONE: 0,
      ACTIVE: 1,
      LOADING: 2
    };

    this.id = id;
    this.STATES = STATES;
    this.state = STATES.NONE;
  };

  ngObibaMica.search.PanelTaxonomyState.prototype.isLoading = function() {
    return this.STATES.LOADING === (this.state & this.STATES.LOADING);
  };

  ngObibaMica.search.PanelTaxonomyState.prototype.isActive = function() {
    return this.STATES.ACTIVE === (this.state & this.STATES.ACTIVE);
  };

  ngObibaMica.search.PanelTaxonomyState.prototype.active = function() {
    this.state = this.state | this.STATES.ACTIVE;
  };

  ngObibaMica.search.PanelTaxonomyState.prototype.inactive = function() {
    this.state = this.state & ~this.STATES.ACTIVE;
  };

  ngObibaMica.search.PanelTaxonomyState.prototype.loading = function() {
    this.state = this.state | this.STATES.LOADING;
  };

  ngObibaMica.search.PanelTaxonomyState.prototype.loaded = function() {
    this.state = this.state & ~this.STATES.LOADING;
  };

  ngObibaMica.search.PanelTaxonomyState.prototype.none = function() {
    this.state = this.STATES.NONE;
  };

})();
;/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
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
                                                        RqlQueryService,
                                                        EntitySuggestionRqlUtilityService,
                                                        AlertService,
                                                        ServerErrorUtils) {

    function suggest(entityType, query) {
      var obibaUtils = new obiba.utils.NgObibaStringUtils();
      var cleanQuery = obibaUtils.cleanDoubleQuotesLeftUnclosed(query);
      cleanQuery = obibaUtils.cleanOrEscapeSpecialLuceneBrackets(cleanQuery);
      cleanQuery = obibaUtils.cleanSpecialLuceneCharacters(cleanQuery);

      if (entityType && query && cleanQuery.length > 1) {
        return DocumentSuggestionResource.query({locale: $translate.use(), documentType: entityType, query: cleanQuery})
          .$promise
          .then(function (response) {
            var parsedResponse = Array.isArray(response) ? response : [];

            for (var i = 0; i < parsedResponse.length; i++) {
              parsedResponse[i] = obibaUtils.quoteQuery(parsedResponse[i].replace(/\/.*/, ''));
            }

            return parsedResponse;
          }, function(response) {
            AlertService.alert({
              id: 'SearchController',
              type: 'danger',
              msg: ServerErrorUtils.buildMessage(response),
              delay: 5000
            });

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
          var matchQuery =
              EntitySuggestionRqlUtilityService
                  .givenFilterQueryGetMatchQuery(EntitySuggestionRqlUtilityService.givenTargetQueryGetFilterQuery(targetQuery));

          return matchQuery && matchQuery.args ? matchQuery.args[0][0] : '';
        }
      }

      return '';
    }

    function selectSuggestion(target, suggestion, withSpecificFields) {
      var obibaUtils = new obiba.utils.NgObibaStringUtils();
      var cleanSuggestion = obibaUtils.cleanDoubleQuotesLeftUnclosed(suggestion);
      cleanSuggestion = obibaUtils.cleanOrEscapeSpecialLuceneBrackets(cleanSuggestion);
      cleanSuggestion = obibaUtils.cleanSpecialLuceneCharacters(cleanSuggestion);

      $rootScope.$new().$emit('ngObibaMicaSearch.searchSuggestion',
          cleanSuggestion, target, withSpecificFields);
    }

    this.getCurrentSuggestion = getCurrentSuggestion;
    this.suggest = suggest;
    this.selectSuggestion = selectSuggestion;
    this.suggestForTargetQuery = suggestForTargetQuery;
  };

  ngObibaMica.search.EntitySuggestionRqlUtilityService = function () {
    function createMatchQueryArgs(suggestion, filterFields) {
      var args = [];
      args.push([suggestion]);

      // add filterFields
      if (Array.isArray(filterFields)) {
        args.push(filterFields);
      } else if (filterFields) {
        args.push([filterFields]);
      }

      return args;
    }

    function createMatchQuery(suggestion, filterFields) {
      var matchQuery = null;
      var trimmedSuggestion = suggestion.trim();
      if (trimmedSuggestion.length) {
        // add filter as match criteria
        matchQuery = new RqlQuery(RQL_NODE.MATCH);
        matchQuery.args = createMatchQueryArgs(trimmedSuggestion, filterFields);
      }

      return matchQuery;
    }

    function givenTargetQueryGetFilterQuery(targetQuery) {
      if (!targetQuery) {
        return null;
      }
      return targetQuery.args.filter(function (arg) { return arg.name === RQL_NODE.FILTER; }).pop();
    }

    function givenFilterQueryGetMatchQuery(filterQuery) {
      if (!filterQuery) {
        return null;
      }
      return filterQuery.args.filter(function (arg) { return arg.name ===  RQL_NODE.MATCH; }).pop();
    }

    // use when suggestion is empty or null
    function removeFilteredMatchQueryFromTargetQuery(targetQuery) {
      var filterQuery = givenTargetQueryGetFilterQuery(targetQuery);
      if (!filterQuery) {
        return;
      }

      if (filterQuery.args.length === 1 && filterQuery.args[0].name === RQL_NODE.MATCH) {
        targetQuery.args = targetQuery.args.filter(function (arg) {
          return arg.name !== RQL_NODE.FILTER;
        });
      } else {
        filterQuery.args = filterQuery.args.filter(function (arg) {
          return arg.name !== RQL_NODE.MATCH;
        });
      }
    }

    this.createMatchQuery = createMatchQuery;
    this.givenTargetQueryGetFilterQuery = givenTargetQueryGetFilterQuery;
    this.givenFilterQueryGetMatchQuery = givenFilterQueryGetMatchQuery;
    this.removeFilteredMatchQueryFromTargetQuery = removeFilteredMatchQueryFromTargetQuery;
  };

  ngObibaMica.search.service('EntitySuggestionRqlUtilityService', ngObibaMica.search.EntitySuggestionRqlUtilityService);

  ngObibaMica.search
    .service('EntitySuggestionService', [
      '$rootScope',
      '$location',
      '$translate',
      'DocumentSuggestionResource',
      'RqlQueryService', 'EntitySuggestionRqlUtilityService',
      'AlertService',
      'ServerErrorUtils',
      ngObibaMica.search.EntitySuggestionService
    ]);

})();;/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

(function() {
ngObibaMica.search.MetaTaxonomyService = function($q, $translate, TaxonomyResource, ngObibaMicaSearch) {
  var taxonomyPanelOptions = ngObibaMicaSearch.getOptions().taxonomyPanelOptions;
  var parser = new ngObibaMica.search.MetaTaxonomyParser(taxonomyPanelOptions);


  /**
   * Returns the taxonomy of taxonomy
   * @returns {*}
   */
  function getMetaTaxonomies() {
    return TaxonomyResource.get({
      target: QUERY_TARGETS.TAXONOMY,
      taxonomy: 'Mica_taxonomy'
    }).$promise;
  }

  /**
   * @param targets [variable, study, ...]
   * @returns parsed list of taxonomies each item having an info object and a list of taxonomies
   */
  function getMetaTaxonomyForTargets(targets) {
    var deferred = $q.defer();

    getMetaTaxonomies().then(
      function(metaTaxonomy) {
        var metaVocabularies = (metaTaxonomy.vocabularies || []).filter(function(vocabulary) {
          return targets.indexOf(vocabulary.name) > -1;
        });

        var taxonomies = metaVocabularies.map(
          function(vocabulary) {
            switch (vocabulary.name) {
              case QUERY_TARGETS.VARIABLE:
                return parser.parseVariableTaxonomies(vocabulary);
              case QUERY_TARGETS.NETWORK:
              case QUERY_TARGETS.STUDY:
              case QUERY_TARGETS.DATASET:
                return parser.parseEntityTaxonomies(vocabulary);
            }
          }
        );

        deferred.resolve(taxonomies || []);
      }
    );

    return deferred.promise;
  }

  /**
   * Return taxonomy panel options
   * @returns {taxonomyPanelOptions|{network, study, dataset, variable}}
   */
  function getTaxonomyPanelOptions(){
    return taxonomyPanelOptions;
  }
  // exported functions
  this.getTaxonomyPanelOptions = getTaxonomyPanelOptions;
  this.getMetaTaxonomyForTargets = getMetaTaxonomyForTargets;
};

ngObibaMica.search
  .service('MetaTaxonomyService', [
    '$q',
    '$translate',
    'TaxonomyResource',
    'ngObibaMicaSearch',
    ngObibaMica.search.MetaTaxonomyService
  ]);

})();;/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

(function() {

  ngObibaMica.search.TaxonomyService = function($q, TaxonomiesResource, TaxonomyResource, VocabularyService) {

    /**
     * @returns Returns a taxonomy
     */
    function getTaxonomy(target, taxonomyName) {
      return TaxonomyResource.get({
        target: target,
        taxonomy: taxonomyName
      }).$promise;
    }

    function getTaxonomiesInternal(target, taxonomyNames) {
      return TaxonomiesResource.get({
        target: target,
        query: 'taxonomyName:' + taxonomyNames.join(' OR taxonomyName:')
      }).$promise;
    }

    function sortTaxonomies(order, taxonomies) {
      taxonomies.sort(function(a, b) {
        return order.indexOf(a.name) - order.indexOf(b.name);
      });
    }

    function findVocabularyInTaxonomy(target, taxonomyName, vocabularyName) {
      var deferred = $q.defer();
      var foundVocabulary = null;
      TaxonomyResource.get({
        target: target,
        taxonomy: taxonomyName
      }).$promise.then(function (taxonomy) {
        taxonomy.vocabularies.some(function (v) {
          if (v.name === vocabularyName || VocabularyService.vocabularyAlias(v) === vocabularyName) {
            foundVocabulary = v;
            return true;
          }
        });

        deferred.resolve(foundVocabulary);
      });

      return deferred.promise;
    }

    /**
     * @returns Returns a taxonomy for several names
     */
    function getTaxonomies(target, taxonomyNames) {
      var deferred = $q.defer();
      if (Array.isArray(taxonomyNames)) {
        getTaxonomiesInternal(target, taxonomyNames).then(function(taxonomies) {
          taxonomies.forEach(function(taxonomy) {
            taxonomy.vocabularies = VocabularyService.visibleVocabularies(taxonomy.vocabularies);
          });
          sortTaxonomies(taxonomyNames, taxonomies);
          deferred.resolve(taxonomies);
        });
      } else {
        getTaxonomy(target, taxonomyNames).then(function(taxonomy) {
          taxonomy.vocabularies = VocabularyService.visibleVocabularies(taxonomy.vocabularies);
          deferred.resolve(taxonomy);
        });
      }

      return deferred.promise;
    }

    this.findVocabularyInTaxonomy = findVocabularyInTaxonomy;
    this.getTaxonomy = getTaxonomy;
    this.getTaxonomies = getTaxonomies;
  };

  ngObibaMica.search
    .service('TaxonomyService',
      ['$q', 'TaxonomiesResource', 'TaxonomyResource', 'VocabularyService', ngObibaMica.search.TaxonomyService]);

})();;/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

(function() {

  ngObibaMica.search.VocabularyService = function($translate, LocalizedValues, MetaTaxonomyService) {

    const TOKEN_LENGTH = 1;

    var VOCABULARY_TYPES = {
      STRING: 'string',
      INTEGER: 'integer',
      DECIMAL: 'decimal'
    };

    function translateField(title) {
      return LocalizedValues.forLocale(title, $translate.use());
    }

    function asciiFold(text) {
      return text.normalize('NFD').replace(/\//g, ' ').replace(/[^\w|^\s|^-]/g, '');
    }

    /**
     * Filters the list of vocabularies based on a query string. A leading '-' will negate the filter result.
     *
     * @param vocabularies
     * @param queryString
     * @returns filtered vocabularies
     */
    function filter(vocabularies, queryString) {
      if (queryString) {
        var tokens = asciiFold(queryString).toLowerCase().split(' ').filter(function (token) {
          return token.length > TOKEN_LENGTH;
        });

        var vocabulariesToFilter = Array.isArray(vocabularies) ? vocabularies : vocabularies.vocabularies;
        var fieldsToFilter = MetaTaxonomyService.getTaxonomyPanelOptions().fieldsToFilter;

        return (vocabulariesToFilter || []).filter(function (vocabulary) {
          vocabulary.filteredTerms = (vocabulary.terms || []).filter(function (term) {
            // Filter on configurable field
            var toMatchField = fieldsToFilter.reduce(function(toMatchField, field){
              return toMatchField + ' ' + translateField(term[field]);
            },fieldsToFilter[0] );
            // term is selected when each of the token is included
            var toMatch = asciiFold(toMatchField).trim().toLowerCase();
            return tokens.map(function (token) {
              if (token.startsWith('-')) {
                var ntoken = token.substr(1);
                if (ntoken.length <= TOKEN_LENGTH) {
                  return true;
                }
                return toMatch.indexOf(ntoken) === -1;
              }
              return toMatch.indexOf(token) >= 0;
            }).reduce(function(acc, val) {
              return acc && val;
            }, true);

          });

          return vocabulary.terms ? vocabulary.filteredTerms.length > 0 : true;
        });
      }
    }

    function isVocabularyVisible(vocabulary) {
      if (!vocabulary) {
        return false;
      }

      var hidden = vocabulary.attributes ? vocabulary.attributes.filter(function(a) {
        return a.key === 'hidden';
      }).pop() : null;

      return !hidden || hidden.value === 'false';
    }

    function isFacetVocabularyVisible(vocabulary) {
      if (!vocabulary || !vocabulary.attributes) {
        return false;
      }

      var result = vocabulary.attributes.filter(function(attribute) {
        return ['hidden' ,'facet'].indexOf(attribute.key) > -1;
      }).reduce(function(a, i) {
        a[i.key] = i.value;
        return a;
      }, {});

      return 'true' === result.facet && (!result.hidden || 'false' === result.hidden);
    }

    function findVocabularyAttributes(vocabulary, pattern) {
      return (vocabulary.attributes || []).filter(function(attribute){
        return attribute.key.search(pattern) > -1;
      }).reduce(function(a, i) {
        a[i.key] = i.value;
        return a;
      }, {});
    }

    function vocabularyAttributeValue(vocabulary, key, defaultValue) {
      var value = defaultValue;
      if (vocabulary.attributes) {
        vocabulary.attributes.some(function (attribute) {
          if (attribute.key === key) {
            value = attribute.value;
            return true;
          }

          return false;
        });
      }

      return value;
    }

    function visibleVocabularies(vocabularies) {
      return (vocabularies || []).filter(isVocabularyVisible);
    }

    function visibleFacetVocabularies(vocabularies) {
      return (vocabularies || []).filter(isFacetVocabularyVisible);
    }

    function vocabularyType(vocabulary) {
      return vocabularyAttributeValue(vocabulary, 'type', VOCABULARY_TYPES.STRING);
    }

    function vocabularyField(vocabulary) {
      return vocabularyAttributeValue(vocabulary, 'field', vocabulary.name);
    }

    function vocabularyAlias(vocabulary) {
      return vocabularyAttributeValue(vocabulary, 'alias', vocabulary.name);
    }

    function vocabularyTermsSortKey(vocabulary) {
      return vocabularyAttributeValue(vocabulary, 'termsSortKey', null);
    }

    function isTermsVocabulary(vocabulary) {
      return vocabularyType(vocabulary) === VOCABULARY_TYPES.STRING && vocabulary.terms;
    }

    function isMatchVocabulary(vocabulary) {
      return vocabularyType(vocabulary) === VOCABULARY_TYPES.STRING && !vocabulary.terms;
    }

    function isNumericVocabulary(vocabulary) {
      return !vocabulary.terms && (vocabularyType(vocabulary) === VOCABULARY_TYPES.INTEGER || vocabularyType(vocabulary) === VOCABULARY_TYPES.DECIMAL);
    }

    function isRangeVocabulary(vocabulary) {
      return vocabulary.terms && (vocabularyType(vocabulary) === VOCABULARY_TYPES.INTEGER || vocabularyType(vocabulary) === VOCABULARY_TYPES.DECIMAL);
    }

    function isFacettedVocabulary(vocabulary) {
      return 'true' === vocabularyAttributeValue(vocabulary, 'facet', 'false');
    }

    function sortFilteredVocabularyTerms(vocabulary, terms, locale) {
      var termsSortKey = vocabularyTermsSortKey(vocabulary);
      if (termsSortKey && terms && terms.length > 0) {
        switch (termsSortKey) {
          case 'name':
            terms.sort(function (a, b) {
              return a[termsSortKey].localeCompare(b[termsSortKey]);
            });
            break;
          case 'title':
            terms.sort(function (a, b) {
              var titleA = LocalizedValues.forLocale(a[termsSortKey], locale);
              var titleB = LocalizedValues.forLocale(b[termsSortKey], locale);
              return titleA.localeCompare(titleB);
            });
            break;
        }
      }
    }

    function sortVocabularyTerms(vocabulary, locale) {
      sortFilteredVocabularyTerms(vocabulary, vocabulary.terms, locale ? locale : $translate.$use());
    }

    this.filter = filter;
    this.isVisibleVocabulary = isVocabularyVisible;
    this.findVocabularyAttributes = findVocabularyAttributes;
    this.visibleVocabularies = visibleVocabularies;
    this.visibleFacetVocabularies = visibleFacetVocabularies;
    this.isRangeVocabulary = isRangeVocabulary;
    this.isTermsVocabulary = isTermsVocabulary;
    this.isMatchVocabulary = isMatchVocabulary;
    this.isNumericVocabulary = isNumericVocabulary;
    this.isFacettedVocabulary = isFacettedVocabulary;
    this.sortVocabularyTerms = sortVocabularyTerms;
    this.sortFilteredVocabularyTerms = sortFilteredVocabularyTerms;
    this.vocabularyAlias = vocabularyAlias;
    this.vocabularyField= vocabularyField;

    return this;
  };

  ngObibaMica.search.service('VocabularyService',
    ['$translate','LocalizedValues', 'MetaTaxonomyService', ngObibaMica.search.VocabularyService]);

})();;/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

(function() {

  ngObibaMica.search.SortVocabularyTerms = function(VocabularyService) {
    return function (terms, vocabulary) {
      VocabularyService.sortFilteredVocabularyTerms(vocabulary, terms);
      return terms;
    };
  };

  ngObibaMica.search.filter('sortTerms', ['VocabularyService', ngObibaMica.search.SortVocabularyTerms]);

})();

;/*
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
  ngObibaMica.search.MatchVocabularyFilterDetailController = function() {
    var ctrl = this;

    function enterText(keyUpEvent) {
      var input = new obiba.utils.NgObibaStringUtils().cleanDoubleQuotesLeftUnclosed(keyUpEvent.target.value);
      var args = {text: input || '*'};
      if (keyUpEvent.keyCode === 13) {
        ctrl.onSelectArgs({vocabulary: ctrl.vocabulary, args: args});
      }
    }

    ctrl.enterText = enterText;
  };

  ngObibaMica.search
    .component('matchVocabularyFilterDetail', {
      transclude: true,
      bindings: {
        vocabulary: '<',
        onSelectArgs: '&'
      },
      templateUrl: 'search/components/criteria/match-vocabulary-filter-detail/component.html',
      controller: [ngObibaMica.search.MatchVocabularyFilterDetailController]
    });
})();
;/*
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
  ngObibaMica.search.NumericVocabularyFilterDetailController = function() {
    var ctrl = this;

    function setRangeValue(submitEvent) {
      var from = submitEvent.target[0].value;
      var to = submitEvent.target[1].value;
      var args = {};

      if (from) {
        args.from = parseInt(from, 10);
      }

      if (to) {
        args.to = parseInt(to, 10);
      }

      ctrl.onSelectArgs({vocabulary: ctrl.vocabulary, args: args});
    }

    ctrl.setRangeValue = setRangeValue;
  };

  ngObibaMica.search
    .component('numericVocabularyFilterDetail', {
      transclude: true,
      bindings: {
        vocabulary: '<',
        onSelectArgs: '&'
      },
      templateUrl: 'search/components/criteria/numeric-vocabulary-filter-detail/component.html',
      controller: [ngObibaMica.search.NumericVocabularyFilterDetailController]
    });
})();
;/*
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
  ngObibaMica.search.TermsVocabularyFilterDetailController = function() {
    var ctrl = this;

    function clickCheckbox(input) {
      var args = {term: input};
      ctrl.onSelectArgs({vocabulary: ctrl.vocabulary, args: args});
    }

    ctrl.constantLimitNumber = 12;
    ctrl.limitNumber = ctrl.constantLimitNumber;
    ctrl.clickCheckbox = clickCheckbox;
  };

  ngObibaMica.search
    .component('termsVocabularyFilterDetail', {
      transclude: true,
      bindings: {
        vocabulary: '<',
        onSelectArgs: '&'
      },
      templateUrl: 'search/components/criteria/terms-vocabulary-filter-detail/component.html',
      controller: [ngObibaMica.search.TermsVocabularyFilterDetailController]
    });
})();
;/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

ngObibaMica.search.EntityCountsController = function() {
  var ctrl = this;
  function getTotalHits(entity){
    if (!ctrl.result || !ctrl.result[entity + 'TotalCount']) {
      return '';
    }

    return ctrl.result[entity + 'TotalCount'].hits;
  }

  function selectType(entity) {
    ctrl.onSelectType({type: targetToType(entity)});
  }

  ctrl.getTotalHits = getTotalHits;
  ctrl.selectType = selectType;
};

ngObibaMica.search
  .component('entityCounts', {
    transclude: true,
    bindings: {
      result: '<',
      target: '<',
      onSelectType: '&',
      resultTabsOrder: '<',
      taxonomyTypeMap: '<'
    },
    templateUrl: 'search/components/entity-counts/component.html',
    controller: [ngObibaMica.search.EntityCountsController]
  });
;/*
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

  ngObibaMica.search.Controller = function (EntitySuggestionService) {

    function init() {
      ctrl.model = EntitySuggestionService.getCurrentSuggestion(ctrl.target, ctrl.rqlQuery) || '';
    }

    function suggest(query) {
      return EntitySuggestionService.suggest(ctrl.entityType, query);
    }

    function select(suggestion) {
      EntitySuggestionService.selectSuggestion(ctrl.target, suggestion, ctrl.withSpecificFields === 'true');
    }

    function onKeyUp(event) {
      if (event.keyCode === 13) {
        select(ctrl.model);
      }
    }

    function clear() {
      ctrl.model = '';
      select('');
    }

    function onChanges(changedObjects) {
      if (changedObjects.rqlQuery.currentValue) {
        init();
      }
    }

    var ctrl = this;
    ctrl.model = '';
    ctrl.suggest = suggest;
    ctrl.select = select;
    ctrl.clear = clear;
    ctrl.onKeyUp = onKeyUp;
    ctrl.$onChanges = onChanges;
  };

  ngObibaMica.search
    .component('entitySearchTypeahead', {
      bindings: {
        target: '<',
        entityType: '<',
        rqlQuery: '<',
        withSpecificFields: '@',
        placeholderText: '@',
        showButton: '@'
      },
      templateUrl: 'search/components/entity-search-typeahead/component.html',
      controller: ['EntitySuggestionService', ngObibaMica.search.Controller]
    });

})();
;/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

ngObibaMica.search.InputSearchFilterController = function() {
  var ctrl = this;

  function change(){
    ctrl.onFilterChange({queryString:ctrl.queryString});
  }
  function clear(){
    ctrl.queryString = '';
    change();
  }

  function onChanges(changesObj) {
    if(changesObj.taxonomyName){
      var updateQueryString = false;
      ctrl.taxonomiesQuery.forEach(function (taxonomy) {
        if(taxonomy.name === ctrl.taxonomyName && taxonomy.queryString){
          ctrl.queryString = taxonomy.queryString;
          updateQueryString = true;
        }
      });
      if(!updateQueryString){
        ctrl.queryString = '';
      }
    }
  }

  ctrl.$onChanges = onChanges;
  ctrl.change = change;
  ctrl.clear = clear;
};


ngObibaMica.search

  .component('inputSearchFilter', {
    transclude: true,
    bindings: {
      taxonomiesQuery: '<',
      taxonomyName: '<',
      queryString: '<',
      onFilterChange: '&'
    },
    templateUrl: 'search/components/input-search-filter/component.html',
    controller: [ngObibaMica.search.InputSearchFilterController]
  });
;/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

(function() {

  ngObibaMica.search.Controller = function() {
    var ctrl = this;

    function selectTaxonomy(taxonomy) {
      ctrl.onSelectTaxonomy({target: ctrl.metaTaxonomy.name, taxonomy: taxonomy});
    }

    function getEntityType() {
      return targetToType(ctrl.metaTaxonomy.name);
    }

    ctrl.status = {isFirstOpen: true};
    ctrl.selectTaxonomy = selectTaxonomy;
    ctrl.entityType = getEntityType();
  };

  ngObibaMica.search

    .component('metaTaxonomyFilterList', {
      transclude: true,
      bindings: {
        metaTaxonomy: '<',
        showTaxonomyPanel: '<',
        rqlQuery: '<',
        onSelectTaxonomy: '&'
      },
      templateUrl: 'search/components/meta-taxonomy/meta-taxonomy-filter-list/component.html',
      controller: ngObibaMica.search.Controller
    });
})();
;/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

(function() {

  ngObibaMica.search.Controller = function (MetaTaxonomyService, TaxonomyService) {

    /**
     * Retrieves all meta taxonomies
     */
    function init() {
      MetaTaxonomyService.getMetaTaxonomyForTargets(ctrl.tabs).then(function (metaTaxonomies) {
        ctrl.metaTaxonomies = metaTaxonomies;
      });
    }

    function onSelectTaxonomy(target, selectedTaxonomy) {
      if (ctrl.selectedTaxonomy !== selectedTaxonomy) {
        if (ctrl.selectedTaxonomy) {
          ctrl.selectedTaxonomy.state.inactive();
        }

        ctrl.selectedTaxonomy = selectedTaxonomy;
        ctrl.selectedTaxonomy.state.active();
        ctrl.selectedTaxonomy.state.loading();

        // enough delay for UI rendering
        setTimeout(function() {
          TaxonomyService.getTaxonomies(target, selectedTaxonomy.info.names || selectedTaxonomy.info.name)
            .then(function (taxonomy) {
              ctrl.selectedTaxonomy.state.loaded();
              ctrl.onToggle({target: target, taxonomy: taxonomy});
            });
        });

      } else {
        ctrl.selectedTaxonomy.state.none();
        ctrl.selectedTaxonomy = null;
        ctrl.onToggle({target: target, taxonomy: ctrl.selectedTaxonomy});
      }
    }

    function onChanges(changed) {
      if (ctrl.selectedTaxonomy && changed.showTaxonomyPanel && changed.showTaxonomyPanel.currentValue !== true) {
        ctrl.selectedTaxonomy.state.none();
        ctrl.selectedTaxonomy = null;
      }
    }

    var ctrl = this;
    ctrl.selectedTaxonomy = null;
    ctrl.onSelectTaxonomy = onSelectTaxonomy;
    ctrl.$onChanges = onChanges;

    init();
  };

  ngObibaMica.search
    .component('metaTaxonomyFilterPanel', {
      bindings: {
        tabs: '<',
        showTaxonomyPanel: '<',
        onToggle: '&',
        rqlQuery: '<'
      },
      templateUrl: 'search/components/meta-taxonomy/meta-taxonomy-filter-panel/component.html',
      controller: ['MetaTaxonomyService', 'TaxonomyService', ngObibaMica.search.Controller]
    });
})();

;/*
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
  ngObibaMica.search.TaxonomyFilterDetailController = function() {
    var ctrl = this;

    function selectVocabularyArgs(vocabulary, args) {
      ctrl.onSelectTaxonomyTerm({taxonomy: ctrl.taxonomy, vocabulary: vocabulary, args: args});
    }

    function removeCriterion(item) {
      ctrl.onRemoveCriterion({item: item});
    }

    ctrl.selectVocabularyArgs = selectVocabularyArgs;
    ctrl.removeCriterion = removeCriterion;
  };

  ngObibaMica.search
    .component('taxonomyFilterDetail', {
      bindings: {
        taxonomy: '<',
        vocabularies: '<',
        onSelectTaxonomyTerm: '&',
        onRemoveCriterion: '&'
      },
      templateUrl: 'search/components/taxonomy/taxonomy-filter-detail/component.html',
      controller: [ngObibaMica.search.TaxonomyFilterDetailController]
    });
})();
;/*
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
  ngObibaMica.search.TaxonomyFilterPanelController = function(VocabularyService, $timeout) {
    var ctrl = this;
    ctrl.taxonomiesQuery = [];
    ctrl.classClose = false;
    function taxonomyArrayName(taxonomy){
      return taxonomy.reduce(function (name, taxonomyItem) {
        return (name || '').concat(taxonomyItem.name);
      }, '');
    }

    function getStringQueryByTaxonomy(taxonomyName) {
      var taxonomies = ctrl.taxonomiesQuery.filter(function(taxonomy){
        return taxonomy.name === taxonomyName;
      });
      return taxonomies.length === 1 ? taxonomies[0].queryString : null;
    }

    function updateQueryString(taxonomy, queryString) {
      var updated = false;
      if (taxonomy !== undefined && queryString !== undefined) {
        ctrl.taxonomiesQuery.forEach(function (taxonomyQuery) {
          if (taxonomyQuery.name === taxonomy && taxonomyQuery.queryString !== undefined) {
            taxonomyQuery.queryString = queryString;
            updated = true;
          }
        });
        if (!updated) {
          ctrl.taxonomiesQuery.push({name: taxonomy, queryString: queryString});
        }
      }
      ctrl.taxonomiesQuery.filter(function (taxonomyQuery) {
        return taxonomyQuery.queryString;
      });
    }

    function selectTaxonomyVocabularyArgs(taxonomy, vocabulary, args) {
      ctrl.onSelectTerm({target: ctrl.target, taxonomy: taxonomy, vocabulary: vocabulary, args: args});
    }

    function onFilterChange(queryString) {
      var taxoName;
      if (!ctrl.taxonomyIsArray) {
        taxoName = ctrl.taxonomy.name;
        filterChangedForSingleTaxonomy(queryString);
      } else {
        taxoName = taxonomyArrayName(ctrl.taxonomy);
        filterChangedForMultipleTaxonomies(queryString);
      }
      updateQueryString(taxoName, queryString);
    }

    function filterChangedForSingleTaxonomy(queryString) {
      if (queryString) {
        ctrl.filteredVocabularies = VocabularyService.filter(ctrl.taxonomy.vocabularies, queryString);
      } else {
        ctrl.filteredVocabularies = initFilteredVocabularies(ctrl.taxonomy);
      }
    }

    function filterChangedForMultipleTaxonomies(queryString) {
      ctrl.filteredVocabularies = {};
      if (queryString) {
        ctrl.taxonomy.forEach(function (subTaxonomy) {
          var filtredSubVocabularies = VocabularyService.filter(subTaxonomy, queryString);
          if(filtredSubVocabularies.length > 0){
            ctrl.filteredVocabularies[subTaxonomy.name] = filtredSubVocabularies;
          }
        });
      } else {
        ctrl.taxonomy.forEach(function (subTaxonomy) {
          ctrl.filteredVocabularies[subTaxonomy.name] = initFilteredVocabularies(subTaxonomy);
        });
      }
    }

    function togglePannel(){
      ctrl.classClose = true;
      $timeout(function () {
       ctrl.onToggle(ctrl.target, null);
      }, 200);
    }

    function initFilteredVocabularies(taxonomy) {
      return taxonomy.vocabularies.map(function (vocabulary) {
        vocabulary.filteredTerms = vocabulary.terms;
        return vocabulary;
      });
    }

    function onChanges(changesObj) {
      ctrl.taxonomyIsArray = Array.isArray(ctrl.taxonomy);
      ctrl.taxonomyName = !ctrl.taxonomyIsArray ? ctrl.taxonomy.name : taxonomyArrayName(ctrl.taxonomy);
      if (changesObj.taxonomy) {
        var queryString = getStringQueryByTaxonomy(ctrl.taxonomyName);
        if (queryString) {
          onFilterChange(queryString);
        }
        else {
          onFilterChange();
        }
      }
    }

    function removeCriterion(item) {
      ctrl.onRemoveCriterion({item: item});
    }

    function selectType(type) {
      togglePannel();
      ctrl.onSelectType({type: type});
    }

    ctrl.$onChanges = onChanges;
    ctrl.selectTaxonomyVocabularyArgs = selectTaxonomyVocabularyArgs;
    ctrl.selectType = selectType;
    ctrl.onFilterChange = onFilterChange;
    ctrl.togglePannel = togglePannel;
    ctrl.removeCriterion = removeCriterion;
  };

  ngObibaMica.search
    .component('taxonomyFilterPanel', {
      transclude: true,
      bindings: {
        showTaxonomyPanel: '<',
        result: '<',
        resultTabsOrder: '<',
        taxonomyTypeMap: '<',
        target: '<',
        taxonomy: '<',
        onSelectType: '&',
        onSelectTerm: '&',
        onRemoveCriterion: '&',
        onToggle: '<'
      },
      templateUrl: 'search/components/taxonomy/taxonomy-filter-panel/component.html',
      controller: ['VocabularyService', '$timeout', ngObibaMica.search.TaxonomyFilterPanelController]
    });
})();
;/*
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

  ngObibaMica.search.VocabularyFilterDetailHeading = function () {
    var ctrl = this;
    var bodyElement = document.querySelectorAll('body')[0];

    function selectType(type) {
      return ctrl.onSelectType({ type: type });
    }

    function closePanelWhenClickingOutside(event, callbackOnClose) {
      var keepOpen = event.target.closest('#back-to-top') !== null;
      var nodes = bodyElement.querySelectorAll('.overlay-front-on-box-shodow');

      function isInside(rect) {
        return event.clientX > rect.x && event.clientX < rect.x + rect.width &&
          event.clientY > rect.y && event.clientY < rect.y + rect.height;
      }

      nodes.forEach(function (node) {
        keepOpen = keepOpen || isInside(node.getBoundingClientRect());
      });

      if (nodes && !keepOpen) {
        event.preventDefault();
        if (callbackOnClose) {
          callbackOnClose();
        }
      }
    }

    function removeWindowEventHandlers() {
      bodyElement.onkeyup = null;
      bodyElement.onmouseup = null;
    }

    function addWindowEventHandlers() {
      bodyElement.onmouseup = function (event) {
        closePanelWhenClickingOutside(event, ctrl.togglePannel);
      };

      bodyElement.onkeyup = function (event) {
        if (event.keyCode === 27) {
          removeWindowEventHandlers();
          ctrl.togglePannel();
        }
      };
    }

    function onFilterChange(queryString) {
      return ctrl.onFilterChange({ queryString: queryString });
    }

    function onDestroy() {
      removeWindowEventHandlers();
    }

    ctrl.selectType = selectType;
    ctrl.filterChange = onFilterChange;
    ctrl.$onDestroy = onDestroy;

    addWindowEventHandlers();
  };

  ngObibaMica.search
    .component('vocabularyFilterDetailHeading', {
      transclude: true,
      bindings: {
        showTaxonomyPanel: '<',
        taxonomyName: '<',
        taxonomiesQuery: '<',
        clearQuery: '<',
        onFilterChange: '&',
        taxonomyTypeMap: '<',
        resultTabsOrder: '<',
        target: '<',
        onSelectType: '&',
        result: '<',
        togglePannel: '&'
      },
      templateUrl: ['ngObibaMicaSearchTemplateUrl', function (ngObibaMicaSearchTemplateUrl) {
        return ngObibaMicaSearchTemplateUrl.getTemplateUrl('vocabularyFilterDetailHeading');
      }],
      controller: [ngObibaMica.search.VocabularyFilterDetailHeading]
    });
})();
;/*
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
  ngObibaMica.search.VocabularyFilterDetailController = function (VocabularyService) {
    var ctrl = this;

    function checkAndSetCriterionType(vocabulary) {
      if (VocabularyService.isTermsVocabulary(vocabulary) || VocabularyService.isRangeVocabulary(vocabulary)) {
        ctrl.criterionType = 'string-terms';
      } else if (VocabularyService.isNumericVocabulary(vocabulary)) {
        ctrl.criterionType = 'numeric';
      } else if (VocabularyService.isMatchVocabulary(vocabulary)) {
        ctrl.criterionType = 'match';
      }
    }

    function selectVocabularyArgs(args) {
      ctrl.onSelectVocabularyArgs({vocabulary: ctrl.vocabulary, args: args});
    }

    function removeCriterion() {
      ctrl.onRemoveCriterion({item: ctrl.vocabulary.existingItem});
    }

    function selectAllFilteredVocabularyTerms(terms) {
      var processedTerms = terms.map(function (term) {
        term.selected = true;
        return term;
      });

      selectVocabularyArgs({term: processedTerms});
    }

    function canStillSelectMore(terms) {
      if (!Array.isArray(terms)) {
        return false;
      }
      var selected = terms.filter(function (term) { return term.selected; });
      return selected.length < terms.length;
    }

    function onChanges(changesObj) {
      if (changesObj.vocabulary) {
        checkAndSetCriterionType(ctrl.vocabulary);
      }
    }

    ctrl.$onChanges = onChanges;
    ctrl.canStillSelectMore = canStillSelectMore;
    ctrl.selectAllFilteredVocabularyTerms = selectAllFilteredVocabularyTerms;
    ctrl.selectVocabularyArgs = selectVocabularyArgs;
    ctrl.removeCriterion = removeCriterion;
  };

  ngObibaMica.search
    .component('vocabularyFilterDetail', {
      transclude: true,
      bindings: {
        vocabulary: '<',
        onSelectVocabularyArgs: '&',
        onRemoveCriterion: '&'
      },
      templateUrl: 'search/components/vocabulary/vocabulary-filter-detail/component.html',
      controller: ['VocabularyService', ngObibaMica.search.VocabularyFilterDetailController]
    });
})();
;/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

function NgObibaMicaListsOptionsFactory() {
  var defaultOptions = {
    listSearchOptions:{
      network: {
        fields: ['studyIds', 'acronym.*', 'name.*', 'description.*', 'logo']
      },
      study: {
        fields: ['logo', 'objectives.*', 'acronym.*', 'name.*', 'model.methods.design', 'model.numberOfParticipants.participant']
      },
      dataset: {
        fields: ['acronym.*', 'name.*', 'description.*', 'variableType',
          'studyTable.studyId',
          'studyTable.project',
          'studyTable.table',
          'studyTable.populationId',
          'studyTable.dataCollectionEventId',
          'harmonizationTable.studyId',
          'harmonizationTable.project',
          'harmonizationTable.table',
          'harmonizationTable.populationId'
        ]
      }
    },
    listOptions: {
      networkOptions: {
        showStudyBadge: true,
        showDatasetBadge:true,
        showVariableBadge: true
      },
      studyOptions: {
              studiesCountCaption: true,
              studiesSearchForm: true,
              studiesSupplInfoDetails: true,
              studiesTrimmedDescription: true,
              showNetworkBadge: true,
              showDatasetBadge:true,
              showVariableBadge: true
      },
      datasetOptions: {
              showNetworkBadge: true,
              showStudyBadge:true,
              showVariableBadge: true
      }
    }
  };

  function NgObibaMicaListsOptions() {
    this.getOptions = function () {
      return defaultOptions;
    };
  }

  this.$get = function () {
    return new NgObibaMicaListsOptions();
  };

  this.setOptions = function (value) {
    Object.keys(value).forEach(function (option) {
      if(option in defaultOptions){
        defaultOptions[option] = value[option];
      }
    });
  };

}

function SortWidgetOptionsProvider() {
  var defaultOptions = {
    sortOrderField: {
      options: [
        {
          value: '-_score',
          label: 'relevance'
        },
        {
          value: 'name',
          label: 'name'
        },
        {
          value: '-name',
          label: 'name'
        },
        {
          value: 'acronym',
          label: 'acronym'
        },
        {
          value: '-acronym',
          label: 'acronym'
        }
      ],
      defaultValue: '-_score'
    }
  };

  var self = this;

  function SortWidgetOptions(defaultOptions){
    var options = defaultOptions;
    this.getOptions = function() {
      return options;
    };
  }

  this.getDefaultOptions = function(){
    return self.defaultOptions;
  };

  this.$get = function () {
    return new SortWidgetOptions(defaultOptions);
  };

  this.setOptions = function (value) {
    Object.keys(value).forEach(function (optionKey) {
      if(optionKey in defaultOptions){
        if(value[optionKey].options){
          defaultOptions[optionKey].options = defaultOptions[optionKey].options.concat(value[optionKey].options);
          defaultOptions[optionKey].default = value[optionKey].default;
        }
      }
    });
  };
}

ngObibaMica.lists = angular.module('obiba.mica.lists', ['obiba.mica.search']);

ngObibaMica.lists
  .run()
  .config(['$provide', function($provide){
    $provide.provider('ngObibaMicaLists', NgObibaMicaListsOptionsFactory);
  }])
  .config(['ngObibaMicaSearchTemplateUrlProvider',
    function (ngObibaMicaSearchTemplateUrlProvider) {
      ngObibaMicaSearchTemplateUrlProvider.setTemplateUrl('searchStudiesResultTable', 'lists/views/list/studies-search-result-table-template.html');
      ngObibaMicaSearchTemplateUrlProvider.setTemplateUrl('searchNetworksResultTable', 'lists/views/list/networks-search-result-table-template.html');
      ngObibaMicaSearchTemplateUrlProvider.setTemplateUrl('searchDatasetsResultTable', 'lists/views/list/datasets-search-result-table-template.html');
      ngObibaMicaSearchTemplateUrlProvider.setTemplateUrl('searchResultList', 'lists/views/search-result-list-template.html');
      ngObibaMicaSearchTemplateUrlProvider.setTemplateUrl('searchInputList', 'lists/views/input-search-widget/input-search-widget-template.html');
      ngObibaMicaSearchTemplateUrlProvider.setTemplateUrl('searchCriteriaRegionTemplate', 'lists/views/region-criteria/search-criteria-region-template.html');
      ngObibaMicaSearchTemplateUrlProvider.setTemplateUrl('CriterionDropdownTemplate', 'lists/views/region-criteria/criterion-dropdown-template.html');
    }])
  .config(['$provide', function($provide){
      $provide.provider('sortWidgetOptions', SortWidgetOptionsProvider);
    }])
  .filter('getBaseUrl', function () {
    return function (param) {
      return '/mica/' + param;
    };
  })
  .filter('doSearchQuery', function () {
    return function (type, query) {
      return '/mica/repository#/search?type=' + type + '&query=' + query + '&display=list';
    };
  });
;/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

/* global targetToType */

ngObibaMica.lists
    .service('sortWidgetService', ['$filter', '$location', 'RqlQueryService', 'sortWidgetOptions', function ($filter, $location, RqlQueryService, sortWidgetOptions) {
        var newOptions = sortWidgetOptions.getOptions();
        var self = this;
        this.getSortOrderOptions = function () {
            newOptions.sortOrderField.options.map(function (option) {
                return $filter('translate')(option.label);
            });
            return {
                options: newOptions.sortOrderField.options
            };
        };
        this.getSortOrderOption = function (value) {
            var selectedOption = null;
            if (!value) {
                value = newOptions.sortOrderField.defaultValue;
            }
            angular.forEach(self.getSortOrderOptions().options, function (option) {
                if (option.value === value) {
                    selectedOption = option;
                }
            });
            return selectedOption ? selectedOption : self.getSortOrderOption(newOptions.sortOrderField.defaultValue);
        };

        this.getSortArg = function () {
            var search = $location.search();
            var rqlQuery = RqlQueryService.parseQuery(search.query);
            if (rqlQuery) {
                var rqlSort = RqlQueryService.getTargetQuerySort(targetToType(rqlQuery.args[0].name), rqlQuery);
                if (rqlSort) {
                    return rqlSort.args[0];
                }
            }
            return newOptions.sortOrderField.defaultValue;
        };

        this.getLabel = function (selectSort, valueSort) {
            var result = null;
            angular.forEach(selectSort.options, function (value) {
                if (value.value === valueSort) {
                    result = value.label;
                }
            });
            return result;
        };

    }]);;/*
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

ngObibaMica.lists

  .controller('listSearchWidgetController', ['$scope', '$rootScope', '$location', 'RqlQueryService', 'ngObibaMicaUrl',
    function ($scope, $rootScope, $location, RqlQueryService, ngObibaMicaUrl) {
      function initMatchInput() {
        $scope.query = $location.search().query;
        $scope.target = typeToTarget($scope.type);
        $scope.rqlQuery = RqlQueryService.parseQuery($scope.query);
      }

      /**
       * Removes all other query parts except the ID or className criterion
       *
       * @returns query urk
       */
      $scope.navigateToSearchPage = function() {
        var targetQuery =
          RqlQueryService.findTargetQuery(typeToTarget($scope.type), RqlQueryService.parseQuery($scope.query));

        if (targetQuery) {
          var query = RqlQueryService.findQueryInTargetByVocabulary(targetQuery, 'className') ||
            RqlQueryService.findQueryInTargetByVocabulary(targetQuery, 'id');
          if (query) {
            targetQuery.args = [query];
            var containerQuery = new RqlQuery(RQL_NODE.AND);
            containerQuery.args.push(targetQuery);
            return ngObibaMicaUrl.getUrl('BaseUrl') + ngObibaMicaUrl.getUrl('SearchBaseUrl') + '?type=' +
              $scope.type +
              '&query=' +
              (new RqlQuery().serializeArgs(containerQuery.args)) +
              '&display=list';
          }
        }

        return '';
      };

      $scope.$on('$locationChangeSuccess', function () {
        initMatchInput();
      });

      var emitter = $rootScope.$new();

      $scope.selectSuggestion = function (suggestion) {
        emitter.$emit('ngObibaMicaSearch.searchSuggestion', suggestion);
      };

      $scope.search = function() {
        emitter.$emit('ngObibaMicaSearch.searchSuggestion', $scope.searchFilter.replace(/\/.*/g, ''));
      };

      initMatchInput();
    }])
  .controller('listSortWidgetController', ['$scope', '$rootScope', 'sortWidgetService',
    function ($scope, $rootScope, sortWidgetService) {

      var emitter = $rootScope.$new();
      $scope.selectSortOrder = sortWidgetService.getSortOrderOptions();
      $scope.getLabel = sortWidgetService.getLabel;
      $scope.selected = $scope.selectSortOrder.options.defaultValue;
      initSelectedOptions();

      $scope.$on('$locationChangeSuccess', function () {
        initSelectedOptions();
      });

      $scope.selectSortOrderOption = function (option) {
        $scope.selected = option;
        emitter.$emit('ngObibaMicaSearch.sortChange', option.value);
      };

      function initSelectedOptions() {
        $scope.selected = sortWidgetService.getSortOrderOption(sortWidgetService.getSortArg());
      }
    }]);

})();
;/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

ngObibaMica.lists
  .directive('listSortWidget', [function () {
    return {
      restrict: 'EA',
      controller: 'listSortWidgetController',
      templateUrl: 'lists/views/sort-widget/sort-widget-template.html'
    };
  }])
  .directive('listSearchWidget', ['ngObibaMicaSearchTemplateUrl', function (ngObibaMicaSearchTemplateUrl) {
    return {
      restrict: 'EA',
      require: '^^suggestionField',
      transclude: true,
      replace: true,
      scope: {
        type: '='
      },
      controller: 'listSearchWidgetController',
      templateUrl: ngObibaMicaSearchTemplateUrl.getTemplateUrl('searchInputList')
    };
  }])

  .directive('suggestionField', ['$location', 'DocumentSuggestionResource', '$translate', 'RqlQueryService', 'EntitySuggestionService',
    function ($location, DocumentSuggestionResource, $translate, RqlQueryService, EntitySuggestionService) {
      return {
        restrict: 'EA',
        replace: true,
        scope: {
          documentType: '=',
          model: '=',
          placeholderText: '=',
          select: '='
        },
        templateUrl: 'lists/views/input-search-widget/suggestion-field.html',
        link: function (scope) {
          scope.suggest = function (query) {
            return EntitySuggestionService.suggestForTargetQuery(scope.documentType, query);
          };
        }
      };
    }]
  );;/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

function GraphicChartsDataProvider() {

  function DataProvider(dataResponse) {
    var data = dataResponse;
    this.getData = function (callback) {
      if (callback) {
        data.$promise.then(callback);
      }
    };
  }

  this.$get = ['$log', 'JoinQuerySearchResource', 'ServerErrorUtils', 'AlertService', 'GraphicChartsConfig', 'GraphicChartsQuery',
    function ($log, JoinQuerySearchResource, ServerErrorUtils, AlertService, GraphicChartsConfig, GraphicChartsQuery) {
    var queryDto = GraphicChartsQuery.queryDtoBuilder(GraphicChartsConfig.getOptions().entityIds, GraphicChartsConfig.getOptions().entityType);

    return new DataProvider(JoinQuerySearchResource.studies({
        query: queryDto
      },
      function onSuccess (response) {
          return response;
      },
      function (response) {
        $log.error('Server error', response);
      }));
  }];
}

ngObibaMica.graphics = angular.module('obiba.mica.graphics', [
    'obiba.graphics',
    'obiba.utils',
    'templates-ngObibaMica'
  ]);

ngObibaMica.graphics
  .config(['$provide', function ($provide) {
    $provide.provider('GraphicChartsData', GraphicChartsDataProvider);
  }])
  .run(['GraphicChartsConfigurations',
  function (GraphicChartsConfigurations) {
    GraphicChartsConfigurations.setClientConfig();
  }]);
;/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

ngObibaMica.graphics

  .directive('obibaChart', [function () {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        fieldTransformer: '=',
        chartType: '=',
        chartAggregationName: '=',
        chartEntityDto: '=',
        chartOptionsName: '=',
        chartOptions: '=',
        chartHeader: '=',
        chartTitle: '=',
        chartTitleGraph: '=',
        chartSelectGraphic: '='
      },
      templateUrl: 'graphics/views/charts-directive.html',
      controller: 'GraphicChartsController'
    };
  }])
  .directive('obibaTable', [function () {
  return {
    restrict: 'EA',
    replace: true,
    scope: {
      fieldTransformer: '=',
      chartType: '@',
      chartAggregationName: '=',
      chartEntityDto: '=',
      chartOptionsName: '=',
      chartOptions: '=',
      chartHeader: '=',
      chartTitle: '=',
      chartTitleGraph: '=',
      chartSelectGraphic: '=',
      chartOrdered: '=',
      chartNotOrdered: '='
    },
    templateUrl: 'graphics/views/tables-directive.html',
    controller: 'GraphicChartsController'
  };
}]);;/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

ngObibaMica.graphics

  .controller('GraphicChartsController', [
    '$rootScope',
    '$scope',
    '$filter',
    '$window',
    'GraphicChartsConfig',
    'GraphicChartsUtils',
    'GraphicChartsData',
    'RqlQueryService',
    'ngObibaMicaUrl',
    'D3GeoConfig', 'D3ChartConfig',  
    function ($rootScope,
              $scope,
              $filter,
              $window,
              GraphicChartsConfig,
              GraphicChartsUtils,
              GraphicChartsData,
              RqlQueryService,
              ngObibaMicaUrl,
              D3GeoConfig, D3ChartConfig) {

      function initializeChartData() {
        $scope.chartObject = {};
        GraphicChartsData.getData(function (StudiesData) {
          if (StudiesData) {
            GraphicChartsUtils.getArrayByAggregation($scope.chartAggregationName, StudiesData[$scope.chartEntityDto])
              .then(function(entries){

                var data = entries.map(function(e) {
                  if(e.participantsNbr) {
                    return [e.title, e.value, e.participantsNbr];
                  }
                  else{
                    return [e.title, e.value];
                  }
                });


                $scope.updateCriteria = function(key, vocabulary) {
                  RqlQueryService.createCriteriaItem('study', 'Mica_study', vocabulary, key).then(function (item) {
                    var entity = GraphicChartsConfig.getOptions().entityType;
                    var id = GraphicChartsConfig.getOptions().entityIds;
                    var parts = item.id.split('.');

                    var urlRedirect = ngObibaMicaUrl.getUrl('SearchBaseUrl') + '?type=studies&query=' +
                      entity + '(in(Mica_' + entity + '.id,' + id + ')),study(in(' + parts[0] + '.' + parts[1] + ',' +
                      parts[2].replace(':', '%253A') + '))';

                    $window.location.href = ngObibaMicaUrl.getUrl('BaseUrl') + urlRedirect;
                  });
                };

                if (data) {
                  if (/^Table-/.exec($scope.chartType) !== null) {
                    $scope.chartObject.ordered = $scope.chartOrdered;
                    $scope.chartObject.notOrdered = $scope.chartNotOrdered;
                    if($scope.chartHeader.length<3){
                      $scope.chartObject.header = [
                        $filter('translate')($scope.chartHeader[0]),
                        $filter('translate')($scope.chartHeader[1])
                      ];
                    }
                    else{
                      $scope.chartObject.header = [
                        $filter('translate')($scope.chartHeader[0]),
                        $filter('translate')($scope.chartHeader[1]),
                        $filter('translate')($scope.chartHeader[2])
                      ];
                    }
                    $scope.chartObject.type = $scope.chartType;
                    $scope.chartObject.data = data;
                    $scope.chartObject.vocabulary = $scope.chartAggregationName;
                    $scope.chartObject.entries = entries;
                    $scope.chartObject.getTable= function(){
                      return $scope.chartObject;
                    };
                  }
                  else {
                    if($scope.chartHeader.length<3){
                      data.unshift([$filter('translate')($scope.chartHeader[0]), $filter('translate')($scope.chartHeader[1])]);
                    }
                    else{
                      data.map(function(item){
                        item.pop();
                        return item;
                      });
                      data.unshift([
                        $filter('translate')($scope.chartHeader[0]),
                        $filter('translate')($scope.chartHeader[1])
                      ]);
                    }
                    $scope.chartObject.term = true;
                    $scope.chartObject.type = $scope.chartType;
                    $scope.chartObject.data = data;
                    $scope.chartObject.options = {backgroundColor: {fill: 'transparent'}};
                    angular.extend($scope.chartObject.options, $scope.chartOptions);
                    $scope.chartObject.options.title = $filter('translate')($scope.chartTitleGraph) + ' (N=' + StudiesData.studyResultDto.totalHits + ')';
                    $scope.$parent.directive = {title: $scope.chartObject.options.title};
                  }
                }
                
                if ($scope.chartType === 'GeoChart') {
                  $scope.chartObject.d3Config = new D3GeoConfig().withData(entries).withTitle($scope.chartObject.options.title);
                  if ($scope.chartObject.options ) {
                    $scope.chartObject.d3Config.withColor($scope.chartOptions.colors);
                  }
                } else {

                  $scope.chartObject.d3Config = new D3ChartConfig($scope.chartAggregationName).withType($scope.chartType === 'PieChart' ? 'pieChart' : 'multiBarHorizontalChart')
                      .withData(entries, $scope.chartType === 'PieChart', $filter('translate')('graphics.nbr-studies'))
                      .withTitle($filter('translate')($scope.chartTitleGraph) + ' (N=' + StudiesData.studyResultDto.totalHits + ')');

                  if ($scope.chartType !== 'PieChart') {
                    $scope.chartObject.d3Config.options.chart.showLegend = false;
                  }

                  if ($scope.chartObject.options && $scope.chartObject.options.colors) {
                    $scope.chartObject.d3Config.options.chart.color = $scope.chartOptions.colors;
                  }
                  $scope.chartObject.d3Config.options.chart.legendPosition = 'right';
                  $scope.chartObject.d3Config.options.chart.legend = {margin : {
                    top: 0,
                    right:10,
                    bottom: 0,
                    left: 0
                  }};
                }
              });
          }
        });

      }

      $scope.ready = true;

      $scope.$watch('chartAggregationName', function() {
        if ($scope.chartAggregationName) {
          initializeChartData();
        }
      });

    }]);
;/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

ngObibaMica.graphics
  .factory('GraphicChartsDataResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
      var resourceUrl = ngObibaMicaUrl.getUrl('JoinQuerySearchResource');
      var method = resourceUrl.indexOf(':query') === -1 ? 'POST' : 'GET';
      var contentType = method === 'POST' ? 'application/x-www-form-urlencoded' : 'application/json';
      var requestTransformer = function(obj) {
        var str = [];
        for(var p in obj) {
          str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        }
        return str.join('&');
      };
      return $resource(resourceUrl, {}, {
        'studies': {
          method: method,
          headers: {
            'Content-Type': contentType
          },
          errorHandler: true,
          params: {type: 'studies'},
          transformRequest : requestTransformer
        }
      });
    }])
  .service('GraphicChartsConfig', function () {
    var factory = {
      options: {
        entityIds: 'NaN',
        entityType: null,
        ChartsOptions: {
          geoChartOptions: {
            header : ['graphics.country', 'graphics.nbr-studies'],
            title : 'graphics.geo-chart-title',
            options: {
              backgroundColor: {fill: 'transparent'},
              colors: [
                '#e5edfb',
                '#cfddf5',
                '#b8cbed',
                '#a0b8e2',
                '#88a4d4'
              ]
            }
          },
          studiesDesigns: {
            header: ['graphics.study-design', 'graphics.nbr-studies', 'graphics.number-participants'],
            title : 'graphics.study-design-chart-title',
            options: {
              bars: 'horizontal',
              series: {
                0: { axis: 'nbrStudies' }, // Bind series 1 to an axis
                1: { axis: 'nbrParticipants' } // Bind series 0 to an axis
              },
              axes: {
                x: {
                  nbrStudies: {side: 'top', label: 'Number of Studies'}, // Top x-axis.
                  nbrParticipants: {label: 'Number of Participants'} // Bottom x-axis.
                }
              },
              backgroundColor: {fill: 'transparent'},
              colors: ['#b8cbed',
                '#e5edfb',
                '#cfddf5',
                '#a0b8e2',
                '#88a4d4']
            }
          },
          numberParticipants: {
            header: ['graphics.number-participants', 'graphics.nbr-studies'],
            title: 'graphics.number-participants-chart-title',
            options: {
              backgroundColor: {fill: 'transparent'},
              colors: ['#b8cbed',
                '#e5edfb',
                '#cfddf5',
                '#a0b8e2',
                '#88a4d4'],
              pieSliceTextStyle: {color: '#000000'}
            }
          },
          biologicalSamples: {
            header : ['graphics.bio-samples', 'graphics.nbr-studies'],
            title : 'graphics.bio-samples-chart-title',
            options: {
              bars: 'horizontal',
              series: {
                0: { axis: 'nbrStudies' } // Bind series 1 to an axis
              },
              axes: {
                x: {
                  nbrStudies: {side: 'top', label: 'Number of Studies'} // Top x-axis.
                }
              },
              backgroundColor: {fill: 'transparent'},
              colors: ['#b8cbed',
                '#e5edfb',
                '#cfddf5',
                '#a0b8e2',
                '#88a4d4']
            }
          }

        }

      }
    };
    factory.setOptions = function (newOptions) {
      if (typeof(newOptions) === 'object') {
        Object.keys(newOptions).forEach(function (option) {
          if (option in factory.options) {
            factory.options[option] = newOptions[option];
          }
        });
      }
    };

    factory.getOptions = function () {
      return angular.copy(factory.options);
    };
    return factory;

  })
  .service('GraphicChartsUtils', ['LocalizedValues', 'TaxonomyResource', 'VocabularyService', '$q', '$translate',
    function (LocalizedValues, TaxonomyResource, VocabularyService, $q, $translate) {
      var studyTaxonomy = {};

      studyTaxonomy.getTerms = function (aggregationName) {
        var deferred = $q.defer();

        function getTerms() {
          var terms = null;
          if (studyTaxonomy.vocabularies){
            angular.forEach(studyTaxonomy.vocabularies, function (vocabulary) {
              if (VocabularyService.vocabularyAlias(vocabulary) === aggregationName) {
                terms = vocabulary.terms;
              }
            });
          }

          deferred.resolve(terms);
        }

        if (!studyTaxonomy.vocabularies) {
          TaxonomyResource.get({
            target: 'study',
            taxonomy: 'Mica_study'
          }).$promise.then(function(taxonomy){
            studyTaxonomy.vocabularies = angular.copy(taxonomy.vocabularies);
            getTerms();
          });

        } else {
          getTerms();
        }

        return deferred.promise;
      };

      this.getArrayByAggregation = function (aggregationName, entityDto) {
        var deferred = $q.defer();

        if (!aggregationName || !entityDto) {
          deferred.resolve([]);
        }

        var arrayData = [];
        studyTaxonomy.getTerms(aggregationName).then(function(terms) {
          var sortedTerms = terms;
          var i = 0;
          angular.forEach(entityDto.aggs, function (aggregation) {
            if (aggregation.aggregation === aggregationName) {
              if (aggregation['obiba.mica.RangeAggregationResultDto.ranges']) {
                i = 0;
                angular.forEach(sortedTerms, function (sortTerm) {
                  angular.forEach(aggregation['obiba.mica.RangeAggregationResultDto.ranges'], function (term) {
                    if (sortTerm.name === term.key) {
                      if (term.count) {
                        arrayData[i] = {title: LocalizedValues.forLocale(sortTerm.title, $translate.use()), value: term.count, key: term.key};
                        i++;
                      }
                    }
                  });
                });
              }
              else {
                // MK-924 sort countries by title in the display language
                if (aggregation.aggregation === 'populations-model-selectionCriteria-countriesIso') {
                  var locale = $translate.use();
                  sortedTerms.sort(function(a, b) {
                    var textA = LocalizedValues.forLocale(a.title, locale);
                    var textB = LocalizedValues.forLocale(b.title, locale);
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                  });
                }
                var numberOfParticipant = 0;
                i = 0;
                angular.forEach(sortedTerms, function (sortTerm) {
                  angular.forEach(aggregation['obiba.mica.TermsAggregationResultDto.terms'], function (term) {
                    if (sortTerm.name === term.key) {
                      if (term.count) {
                        if (aggregation.aggregation === 'model-methods-design') {

                          angular.forEach(term.aggs, function (aggBucket) {
                            if (aggBucket.aggregation === 'model-numberOfParticipants-participant-number') {
                              var aggregateBucket = aggBucket['obiba.mica.StatsAggregationResultDto.stats'];
                              numberOfParticipant = LocalizedValues.formatNumber(aggregateBucket ? aggregateBucket.data.sum : 0);
                            }
                          });
                          arrayData[i] = {
                            title: LocalizedValues.forLocale(sortTerm.title, $translate.use()),
                            value: term.count,
                            participantsNbr: numberOfParticipant,
                            key: term.key
                          };
                        } else {
                          arrayData[i] = {title: LocalizedValues.forLocale(sortTerm.title, $translate.use()), value: term.count, key: term.key};
                        }
                        i++;
                      }
                    }
                  });
                });
              }
            }
          });
          
          deferred.resolve(arrayData);
        });
        return deferred.promise;
      };
    }])

  .service('GraphicChartsQuery', ['RqlQueryService', 'RqlQueryUtils','$translate', function (RqlQueryService, RqlQueryUtils, $translate) {
    this.queryDtoBuilder = function (entityIds, entityType) {
      var query;
      if (!(entityIds) || entityIds === 'NaN') {
        query =  'study(exists(Mica_study.id))';
      }
      if(entityType && entityIds !== 'NaN') {
        query =  entityType + '(in(Mica_'+ entityType +'.id,(' + entityIds + ')))';
      }
      var localizedRqlQuery = angular.copy(RqlQueryService.parseQuery(query));
      RqlQueryUtils.addLocaleQuery(localizedRqlQuery, $translate.use());
      var localizedQuery = new RqlQuery().serializeArgs(localizedRqlQuery.args);
      return RqlQueryService.prepareGraphicsQuery(localizedQuery,
        ['Mica_study.populations-selectionCriteria-countriesIso', 'Mica_study.populations-dataCollectionEvents-bioSamples', 'Mica_study.numberOfParticipants-participant-number'],
        ['Mica_study.methods-design']
      );
    };
  }]);
;/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>. 
 */

'use strict';

ngObibaMica.localized = angular.module('obiba.mica.localized', [
  'obiba.notification',
  'pascalprecht.translate',
  'templates-ngObibaMica'
]);
;/*
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

  .directive('localized', ['LocalizedValues', function (LocalizedValues) {
    return {
      restrict: 'AE',
      scope: {
        value: '=',
        lang: '=',
        ellipsisSize: '=',
        markdownIt: '=',
        keyLang: '@',
        keyValue: '@'
      },
      templateUrl: 'localized/localized-template.html',
      link: function(scope) {
        scope.keyLang = scope.keyLang || 'lang';
        scope.keyValue = scope.keyValue || 'value';
        scope.LocalizedValues = LocalizedValues;
      }
    };
  }])

  .directive('localizedNumber', ['LocalizedValues', function (LocalizedValues) {
    return {
      restrict: 'E',
      scope: {number: '=value'},
      template: '{{::localizedNumber}}',
      controller: ['$scope', function ($scope) {
        $scope.localizedNumber = LocalizedValues.formatNumber($scope.number);
      }]
    };
  }])

  .directive('localizedInput', [function () {
    return {
      restrict: 'AE',
      require: '^form',
      scope: {
        name: '@',
        model: '=',
        label: '@',
        required: '@',
        disabled: '=',
        lang: '=',
        help: '@',
        customValidator: '='
      },
      templateUrl: 'localized/localized-input-template.html',
      link: function ($scope, elem, attr, ctrl) {
        if (angular.isUndefined($scope.model) || $scope.model === null) {
          $scope.model = [
            {lang: $scope.lang, value: ''}
          ];
        }

        $scope.$watch('model', function(newModel) {
          if (angular.isUndefined(newModel) || newModel === null) {
            $scope.model = [{lang: $scope.lang, value: ''}];
          }

          var currentLang = $scope.model.filter(function(e) {
            if (e.lang === $scope.lang) {
              return e;
            }
          });

          if (currentLang.length === 0) {
            $scope.model.push({lang:$scope.lang, value: ''});
          }
        }, true);

        $scope.fieldName = $scope.name + '-' + $scope.lang;
        $scope.form = ctrl;
      }
    };
  }])

  .directive('localizedInputGroup', [function () {
    return {
      restrict: 'AE',
      require: '^form',
      scope: {
        name: '@',
        model: '=',
        label: '@',
        required: '@',
        disabled: '=',
        lang: '=',
        help: '@',
        remove: '=',
        customValidator: '='
      },
      templateUrl: 'localized/localized-input-group-template.html',
      link: function ($scope, elem, attr, ctrl) {
        if (angular.isUndefined($scope.model) || $scope.model === null) {
          $scope.model = [
            {lang: $scope.lang, value: ''}
          ];
        }

        $scope.$watch('model', function(newModel) {
          if (angular.isUndefined(newModel) || newModel === null) {
            $scope.model = [{lang: $scope.lang, value: ''}];
          }

          var currentLang = $scope.model.filter(function(e) {
            if (e.lang === $scope.lang) {
              return e;
            }
          });

          if (currentLang.length === 0) {
            $scope.model.push({lang:$scope.lang, value: ''});
          }
        }, true);

        $scope.fieldName = $scope.name + '-' + $scope.lang;
        $scope.form = ctrl;
      }
    };
  }])

  .directive('localizedTextarea', [function () {
    return {
      restrict: 'AE',
      require: '^form',
      scope: {
        name: '@',
        model: '=',
        label: '@',
        required: '@',
        disabled: '=',
        lang: '=',
        help: '@',
        rows: '@',
        customValidator: '='
      },
      templateUrl: 'localized/localized-textarea-template.html',
      link: function ($scope, elem, attr, ctrl) {
        if (angular.isUndefined($scope.model) || $scope.model === null) {
          $scope.model = [
            {lang: $scope.lang, value: ''}
          ];
        }

        $scope.$watch('model', function(newModel) {
          if (angular.isUndefined(newModel) || newModel === null) {
            $scope.model = [{lang: $scope.lang, value: ''}];
          }

          var currentLang = $scope.model.filter(function(e) {
            if (e.lang === $scope.lang) {
              return e;
            }
          });

          if (currentLang.length === 0) {
            $scope.model.push({lang:$scope.lang, value: ''});
          }
        }, true);

        $scope.fieldName = $scope.name + '-' + $scope.lang;
        $scope.form = ctrl;
      }
    };
  }]);
;/*
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

  .service('LocalizedValues',['$translate' ,function ($translate) {
      var self = this;
      this.for = function (values, lang, keyLang, keyValue) {
        if (angular.isArray(values)) {
          var result = values.filter(function (item) {
            return item[keyLang] === lang;
          });

          if (result && result.length > 0) {
            return result[0][keyValue];
          } else {

            var langs = values.map(function(value) {
              return value[keyLang];
            });

            if (langs.length > 0) {
              return self.for(values, langs.length === 1 ? langs[0] : 'en', keyLang, keyValue);
            }
          }

        } else if (angular.isObject(values)) {
          return self.for(Object.keys(values).map(function(k) {
            return {lang: k, value: values[k]};
          }), lang, keyLang, keyValue);
        }

        return values || '';
      };

      this.forLocale = function (values, lang) {
        var rval = this.for(values, lang, 'locale', 'text');
        if (rval === '') {
          rval = this.for(values, 'und', 'locale', 'text');
        }
        return rval;
      };

      this.forLang = function (values, lang) {
        var rval = this.for(values, lang, 'lang', 'value');
        if (rval === '') {
          rval = this.for(values, 'und', 'lang', 'value');
        }
        return rval;
      };

      this.formatNumber = function (val) {
        return (typeof val === 'undefined' || val === null || typeof val !== 'number') ? val : val.toLocaleString($translate.use());
      };

      this.arrayToObject = function (values) {
        var rval = {};
        if (values) {
          values.forEach(function(entry) {
            rval[entry.lang] = entry.value;
          });
        }
        return rval;
      };

      this.objectToArray = function (values, languages) {
        var rval = [];
        if (values) {
          var locales = languages ? languages : Object.keys(values);
          if (locales) {
            locales.forEach(function (lang) {
              rval.push({
                lang: lang,
                value: values[lang]
              });
            });
          }
        }
        return rval.length === 0 ? undefined : rval;
      };
    }]
    )

  .service('LocalizedSchemaFormService', ['$filter', function ($filter) {

    this.translate = function(value) {
      if (!value) {
        return value;
      }
      if (typeof value === 'string') {
        return this.translateString(value);
      } else if (typeof value === 'object') {
        if (Array.isArray(value)) {
          return this.translateArray(value);
        } else {
          return this.translateObject(value);
        }
      }
      return value;
    };

    this.translateObject = function(object) {
      if (!object) {
        return object;
      }
      for (var prop in object) {
        if (object.hasOwnProperty(prop)) {
          if (typeof object[prop] === 'string') {
            object[prop] = this.translateString(object[prop]);
          } else if (typeof object[prop] === 'object') {
            if (Array.isArray(object[prop])) {
              object[prop] = this.translateArray(object[prop]);
            } else {
              object[prop] = this.translateObject(object[prop]);
            }
          } // else ignore
        }
      }
      return object;
    };

    this.translateArray = function(array) {
      if (!array) {
        return array;
      }
      var that = this;
      array.map(function (item) {
         return that.translate(item);
      });
      return array;
    };

    this.translateString = function(string) {
      if (!string) {
        return string;
      }
      return string.replace(/t\(([^\)]+)\)/g, function (match, p1) {
        return $filter('translate')(p1);
      });
    };

  }]);
;/*
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
;/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

function NgObibaMicaFileBrowserOptionsProvider() {
  var options = {
    locale: 'en',
    downloadInline: true,
    downloadKey: false,
    folders: {
      excludes: ['population']
    }
  };

  this.addExcludeFolder = function (folder) {
    if (folder) {
      options.folders.excludes.push(folder);
    }
  };

  this.$get = function () {
    return options;
  };
}

ngObibaMica.fileBrowser = angular.module('obiba.mica.fileBrowser', [
  'pascalprecht.translate',
  'ui.bootstrap',
  'templates-ngObibaMica'
]).config(['$provide', function ($provide) {
  $provide.provider('ngObibaMicaFileBrowserOptions', new NgObibaMicaFileBrowserOptionsProvider());
}]);
;/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

ngObibaMica.fileBrowser
  
  .directive('fileBrowser', [function () {
    return {
      restrict: 'EA',
      replace: true,
      controller: 'FileBrowserController',
      scope: {
        docPath: '@',
        docId: '@',
        tokenKey: '@',
        subject: '='
      },
      templateUrl: 'file-browser/views/file-browser-template.html'
    };
  }]);
;/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

ngObibaMica.fileBrowser
  .controller('FileBrowserController', [
    '$rootScope',
    '$scope',
    '$log',
    '$filter',
    'StringUtils',
    'FileBrowserService',
    'BrowserBreadcrumbHelper',
    'AlertService',
    'ServerErrorUtils',
    'FileBrowserFileResource',
    'FileBrowserSearchResource',
    'ngObibaMicaFileBrowserOptions',
    'FileBrowserDownloadService',

    function ($rootScope,
              $scope,
              $log,
              $filter,
              StringUtils,
              FileBrowserService,
              BrowserBreadcrumbHelper,
              AlertService,
              ServerErrorUtils,
              FileBrowserFileResource,
              FileBrowserSearchResource,
              ngObibaMicaFileBrowserOptions,
              FileBrowserDownloadService) {

      var navigateToPath = function (path, keyToken) {
        clearSearchInternal();
        getDocument(path, keyToken);
      };

      var navigateTo = function (event, document, keyToken) {
        event.stopPropagation();
        if (document) {
          navigateToPath(document.path, keyToken);
        }
      };

      var onError = function (response) {
        AlertService.alert({
          id: 'FileSystemController',
          type: 'danger',
          msg: ServerErrorUtils.buildMessage(response)
        });

        if (response.status !== 403 && $scope.data.document) {
          navigateTo($scope.data.document);
        }
      };

      function clearSearchInternal() {
        $scope.data.search.text = null;
        $scope.data.search.active = false;
      }

      function getDocument(path, keyToken) {
        var fileParam;
        $scope.data.search.active = false;
        if(keyToken){
          fileParam = {path: path, keyToken: keyToken};
        }
        else{
          fileParam = {path: path};
        }
        FileBrowserFileResource.get(fileParam,
          function onSuccess(response) {
            $log.info(response);
            $scope.pagination.selected = -1;
            $scope.data.document = $scope.data.details.document = response;

            if (!$scope.data.document.children) {
              $scope.data.document.children = [];
            }
            if(keyToken){
              $scope.data.document.keyToken = keyToken;
            }
            if ($scope.data.document.path === $scope.data.rootPath) {
              $scope.data.document.children = $scope.data.document.children.filter(function(child){
                return ngObibaMicaFileBrowserOptions.folders.excludes.indexOf(child.name) < 0;
              });
              $scope.data.document.size = $scope.data.document.children.length;
            }

            $scope.data.breadcrumbs = BrowserBreadcrumbHelper.toArray(path, $scope.data.rootPath);
            $scope.data.isFile = FileBrowserService.isFile(response);
            $scope.data.isRoot = FileBrowserService.isRoot(response);
          },
          onError
        );
      }

      function navigateToParent(event, document, keyToken) {
        event.stopPropagation();
        var path = document.path;

        if (path.lastIndexOf('/') === 0) {
          path = '/';
        } else {
          path = path.substring(0, path.lastIndexOf('/'));
        }

        navigateToPath(path, keyToken);
      }

      function navigateBack() {
        if (!$scope.data.isRoot && $scope.data.document) {
          var parentPath = $scope.data.document.path.replace(/\\/g, '/').replace(/\/[^\/]*$/, '');
          getDocument(parentPath ? parentPath : '/');
        }
      }

      function hideDetails() {
        $scope.pagination.selected = -1;
        $scope.data.details.show = false;
      }

      function searchDocumentsInternal(path, searchParams) {
        function excludeFolders(query) {
          var excludeQuery = '';
          try {
            var excludes = [];
            ngObibaMicaFileBrowserOptions.folders.excludes.forEach(function (exclude) {
              var q = path.replace(/\//g, '\\/') + '\\/' + exclude.replace(/\s/, '\\ ');
              excludes.push(q);
              excludes.push(q + '\\/*');
            });

            excludeQuery = excludes.length > 0 ? 'NOT path:(' + excludes.join(' OR ') + ')' : '';
          } catch (error) {
            // just return the input query
          }

          return query ? query + ' AND ' + excludeQuery : excludeQuery;
        }

        searchParams.query = excludeFolders(searchParams.query);

        var urlParams = angular.extend({}, {path: path}, searchParams);

        FileBrowserSearchResource.search(urlParams,
            function onSuccess(response) {
              $log.info('Search result', response);
              var clone = $scope.data.document ? angular.copy($scope.data.document) : {};
              clone.children = response;
              $scope.data.document = clone;
            },
            function onError(response) {
              $log.debug('ERROR:',response);
            }
        );
      }

      var searchDocuments = function (query) {
        $scope.data.search.active = true;
        hideDetails();
        var recursively = $scope.data.search.recursively;
        var orderBy = null;
        var sortBy = null;
        var limit = 999;
        $scope.data.search.query = query;

        switch (query) {
          case 'RECENT':
            query = '';
            orderBy = 'desc';
            sortBy = 'lastModifiedDate';
            limit = 10;
            break;
        }

        var searchParams = {query: query, recursively: recursively, sort: sortBy, order: orderBy, limit: limit};
        searchDocumentsInternal($scope.data.document.path, searchParams);
      };

      var toggleRecursively = function () {
        $scope.data.search.recursively = !$scope.data.search.recursively;
        if ($scope.data.search.text) {
          searchDocuments($scope.data.search.text);
        } else if ($scope.data.search.query) {
          searchDocuments($scope.data.search.query);
        }
      };

      var clearSearch = function () {
        clearSearchInternal();
        getDocument($scope.data.document.path);
      };

      var searchKeyUp = function (event) {
        switch (event.keyCode) {
          case 13: // ENTER
            if ($scope.data.search.text) {
              searchDocuments($scope.data.search.text);
            } else {
              clearSearch();
            }
            break;

          case 27: // ESC
            if ($scope.data.search.active) {
              clearSearch();
            }
            break;
        }
      };

      var showDetails = function(document, index) {
        $scope.pagination.selected = index;
        $scope.data.details.document = document;
        $scope.data.details.show = true;
      };

      var getTypeParts = function(document) {
        return FileBrowserService.isFile(document) && document.attachment.type ?
          document.attachment.type.split(/,|\s+/) :
          [];
      };

      var getLocalizedValue = function(values) {
        return FileBrowserService.getLocalizedValue(values, ngObibaMicaFileBrowserOptions.locale);
      };

      var hasLocalizedValue = function(values) {
        return FileBrowserService.hasLocalizedValue(values, ngObibaMicaFileBrowserOptions.locale);
      };

      $scope.downloadTarget = ngObibaMicaFileBrowserOptions.downloadInline ? '_blank' : '_self';
      $scope.getDownloadUrl = FileBrowserDownloadService.getUrl;
      $scope.screen = $rootScope.screen;
      $scope.truncate = StringUtils.truncate;
      $scope.getDocumentIcon = FileBrowserService.getDocumentIcon;
      $scope.navigateToPath = navigateToPath;
      $scope.navigateTo = navigateTo;
      $scope.navigateBack = navigateBack;
      $scope.navigateToParent = navigateToParent;
      $scope.clearSearch = clearSearch;
      $scope.searchDocuments = searchDocuments;
      $scope.toggleRecursively = toggleRecursively;
      $scope.searchKeyUp = searchKeyUp;
      $scope.isFile = FileBrowserService.isFile;
      $scope.isRoot = FileBrowserService.isRoot;
      $scope.getLocalizedValue = getLocalizedValue;
      $scope.hasLocalizedValue = hasLocalizedValue;
      $scope.hideDetails = hideDetails;
      $scope.showDetails = showDetails;
      $scope.getTypeParts = getTypeParts;

      $scope.pagination = {
        selected: -1,
        currentPage: 1,
        itemsPerPage: 20
      };

      $scope.data = {
        keyToken: null,
        details: {
          document: null,
          show: false
        },
        docRootIcon: null,
        rootPath: null,
        document: null,
        accesses: [],
        search: {
          text: null,
          active: false,
          recursively: true
        },
        breadcrumbs: null,
        isFile: false,
        isRoot: false,
        editDescField: false
      };

      $scope.$watchGroup(['docPath', 'docId'], function () {
        if ($scope.docPath && $scope.docId) {
          $scope.data.docRootIcon = BrowserBreadcrumbHelper.rootIcon($scope.docPath);
            $scope.data.rootPath = $scope.docPath + ($scope.docId !== 'null' ? '/' + $scope.docId : '');
          if($scope.tokenKey){
            getDocument($scope.data.rootPath, $scope.tokenKey, null);
          }
          else {
            getDocument($scope.data.rootPath, null);
          }
        }
      });

    }]);

;/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

ngObibaMica.fileBrowser
  .factory('FileBrowserFileResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
      var url = ngObibaMicaUrl.getUrl('FileBrowserFileResource');
      console.log('PATH>', url);
      return $resource(url, {path: '@path', keyToken: '@keyToken'}, {
        'get': {method: 'GET', errorHandler: true}
      });
    }])

  .factory('FileBrowserSearchResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
      return $resource(ngObibaMicaUrl.getUrl('FileBrowserSearchResource'), {path: '@path'}, {
        'search': { method: 'GET', isArray: true, errorHandler: true}
      });
    }])

  .service('FileBrowserDownloadService', ['ngObibaMicaUrl', 'ngObibaMicaFileBrowserOptions',
    function (ngObibaMicaUrl, ngObibaMicaFileBrowserOptions) {
      this.getUrl = function(path, keyToken) {
        var url = ngObibaMicaUrl.getUrl('FileBrowserDownloadUrl')
          .replace(/:path/, path)
          .replace(/:inline/, ngObibaMicaFileBrowserOptions.downloadInline);
        if(keyToken){
          url = url.replace(/:key/, keyToken);
        }
        else{
          url = url.replace(/:key/, '');
        }
          return url;
      };

      return this;
    }])


  .service('FileBrowserService', [function () {

      this.isFile = function (document) {
        return document && document.type === 'FILE';
      };

      this.isRoot = function (document) {
        return document && document.path === '/';
      };

      this.getLocalizedValue = function (values, lang) {
        if (!values) {
          return null;
        }

        var result = values.filter(function (value) {
          return value.lang === lang;
        });

        return result && result.length > 0 ? result[0].value : null;
      };

      this.hasLocalizedValue = function (values, lang) {
        var value = this.getLocalizedValue(values, lang);
        return value !== null && value.trim().length > 0;
      };

      this.getDocumentIcon = function (document) {
        if (!document) {
          return '';
        }

        if (document.type === 'FOLDER') {
          return 'fa-folder';
        }

        var ext = document.path.match(/\.(\w+)$/);
        if (ext && ext.length > 1) {
          switch (ext[1].toLowerCase()) {
            case 'doc':
            case 'docx':
            case 'odm':
            case 'gdoc':
              return 'fa-file-word-o';

            case 'xls':
            case 'xlsx':
              return 'fa-file-excel-o';

            case 'pdf':
              return 'fa-file-pdf-o';

            case 'ppt':
            case 'odt':
              return 'fa-file-powerpoint-o';

            case 'xt':
              return 'fa-file-text-o';
          }
        }

        return 'fa-file';
      };

    }])

  .service('BrowserBreadcrumbHelper', [function () {
    this.toArray = function (path, exclude) {
      if (path) {
        path = path.replace(exclude, '');
        var a = path.replace(/\/$/, '').split('/').slice(1);
        var parts = [];
        var prev = null;
        a.forEach(function (part) {
          prev = (prev === null ? exclude : prev) + '/' + part;
          parts.push({name: part, path: prev});
        });

        return parts;
      }

      // Should never happen
      return [{name: '', path: ''}];
    };

    this.rootIcon = function(docPath) {
      var matched = /^\/([^\/]*)/.exec(docPath);
      switch (matched ? matched[1] : '') {
        case 'study':
          return 'i-obiba-study';
        case 'network':
          return 'i-obiba-network';
        case 'study-dataset':
          return 'i-obiba-study-dataset';
        case 'harmonization-dataset':
          return 'i-obiba-harmo-dataset';
        default:
          return 'fa fa-hdd-o';
      }
    };
  }]);
;angular.module('templates-ngObibaMica', ['access/views/data-access-request-documents-view.html', 'access/views/data-access-request-form.html', 'access/views/data-access-request-history-view.html', 'access/views/data-access-request-list.html', 'access/views/data-access-request-print-preview.html', 'access/views/data-access-request-profile-user-modal.html', 'access/views/data-access-request-submitted-modal.html', 'access/views/data-access-request-validation-modal.html', 'access/views/data-access-request-view.html', 'attachment/attachment-input-template.html', 'attachment/attachment-list-template.html', 'file-browser/views/document-detail-template.html', 'file-browser/views/documents-table-template.html', 'file-browser/views/file-browser-template.html', 'file-browser/views/toolbar-template.html', 'graphics/views/charts-directive.html', 'graphics/views/tables-directive.html', 'lists/views/input-search-widget/input-search-widget-template.html', 'lists/views/list/datasets-search-result-table-template.html', 'lists/views/list/networks-search-result-table-template.html', 'lists/views/list/studies-search-result-table-template.html', 'lists/views/region-criteria/criterion-dropdown-template.html', 'lists/views/region-criteria/search-criteria-region-template.html', 'lists/views/search-result-list-template.html', 'lists/views/sort-widget/sort-widget-template.html', 'localized/localized-input-group-template.html', 'localized/localized-input-template.html', 'localized/localized-template.html', 'localized/localized-textarea-template.html', 'search/components/criteria/match-vocabulary-filter-detail/component.html', 'search/components/criteria/numeric-vocabulary-filter-detail/component.html', 'search/components/criteria/terms-vocabulary-filter-detail/component.html', 'search/components/entity-counts/component.html', 'search/components/entity-search-typeahead/component.html', 'search/components/input-search-filter/component.html', 'search/components/meta-taxonomy/meta-taxonomy-filter-list/component.html', 'search/components/meta-taxonomy/meta-taxonomy-filter-panel/component.html', 'search/components/taxonomy/taxonomy-filter-detail/component.html', 'search/components/taxonomy/taxonomy-filter-panel/component.html', 'search/components/vocabulary-filter-detail-heading/component.html', 'search/components/vocabulary/vocabulary-filter-detail/component.html', 'search/views/classifications.html', 'search/views/classifications/classifications-view.html', 'search/views/classifications/taxonomies-facets-view.html', 'search/views/classifications/taxonomies-view.html', 'search/views/classifications/taxonomy-accordion-group.html', 'search/views/classifications/taxonomy-panel-template.html', 'search/views/classifications/taxonomy-template.html', 'search/views/classifications/term-panel-template.html', 'search/views/classifications/vocabulary-accordion-group.html', 'search/views/classifications/vocabulary-panel-template.html', 'search/views/coverage/coverage-search-result-table-template.html', 'search/views/criteria/criteria-node-template.html', 'search/views/criteria/criteria-root-template.html', 'search/views/criteria/criteria-target-template.html', 'search/views/criteria/criterion-dropdown-template.html', 'search/views/criteria/criterion-header-template.html', 'search/views/criteria/criterion-match-template.html', 'search/views/criteria/criterion-numeric-template.html', 'search/views/criteria/criterion-string-terms-template.html', 'search/views/criteria/search-criteria-region-template.html', 'search/views/criteria/target-template.html', 'search/views/graphics/graphics-search-result-template.html', 'search/views/list/datasets-search-result-table-template.html', 'search/views/list/networks-search-result-table-template.html', 'search/views/list/pagination-template.html', 'search/views/list/search-result-pagination-template.html', 'search/views/list/studies-search-result-table-template.html', 'search/views/list/variables-search-result-table-template.html', 'search/views/result-tabs-order-template-view.html', 'search/views/search-layout.html', 'search/views/search-result-coverage-template.html', 'search/views/search-result-graphics-template.html', 'search/views/search-result-list-dataset-template.html', 'search/views/search-result-list-network-template.html', 'search/views/search-result-list-study-template.html', 'search/views/search-result-list-template.html', 'search/views/search-result-list-variable-template.html', 'search/views/search-result-panel-template.html', 'search/views/search-study-filter-template.html', 'search/views/search.html', 'search/views/search2.html', 'utils/views/unsaved-modal.html', 'views/pagination-template.html']);

angular.module("access/views/data-access-request-documents-view.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("access/views/data-access-request-documents-view.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div>\n" +
    "  <div class=\"help-block\" ng-bind-html=\"config.documentsSectionHelpText || 'data-access-request.documents-help' | translate\"></div>\n" +
    "\n" +
    "  <div class=\"form-group\">\n" +
    "\n" +
    "    <div class=\"panel panel-default\" ng-show=\"showAttachmentsForm\">\n" +
    "      <div class=\"panel-body\">\n" +
    "        <attachment-input files=\"attachments\" multiple=\"true\" on-error=\"onAttachmentError\"></attachment-input>\n" +
    "\n" +
    "        <div class=\"voffset2\">\n" +
    "          <a ng-click=\"cancelAttachments()\" type=\"button\" class=\"btn btn-default\">\n" +
    "            <span translate>cancel</span>\n" +
    "          </a>\n" +
    "\n" +
    "          <a ng-click=\"updateAttachments()\" type=\"button\" class=\"btn btn-primary\">\n" +
    "            <span translate>save</span>\n" +
    "          </a>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-hide=\"showAttachmentsForm\">\n" +
    "      <p ng-if=\"dataAccessRequest.attachments.length == 0\" class=\"voffset2\" translate>\n" +
    "        data-access-request.no-documents\n" +
    "      </p>\n" +
    "      <attachment-list files=\"dataAccessRequest.attachments\"\n" +
    "                       href-builder=\"getDownloadHref\"></attachment-list>\n" +
    "      <a ng-if=\"actions.canEditAttachments(dataAccessRequest)\" ng-click=\"editAttachments()\" type=\"button\" class=\"btn btn-info\">\n" +
    "        <span translate>data-access-request.edit-documents</span>\n" +
    "      </a>\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("access/views/data-access-request-form.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("access/views/data-access-request-form.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div>\n" +
    "\n" +
    "  <div ng-if=\"headerTemplateUrl\" ng-include=\"headerTemplateUrl\"></div>\n" +
    "\n" +
    "  <obiba-alert id=\"DataAccessRequestEditController\"></obiba-alert>\n" +
    "\n" +
    "  <!-- 'ng-if' does not bind the form to controller scope -->\n" +
    "  <div ng-show=\"validForm\">\n" +
    "\n" +
    "    <form name=\"form\" role=\"form\" novalidate class=\"ng-scope ng-invalid ng-invalid-required ng-dirty\">\n" +
    "      <div class=\"pull-right\" ng-if=\"loaded\">\n" +
    "        <a ng-click=\"cancel()\" type=\"button\" class=\"btn btn-default\">\n" +
    "          <span translate>cancel</span>\n" +
    "        </a>\n" +
    "\n" +
    "        <a ng-click=\"save()\" type=\"button\" class=\"btn btn-primary\">\n" +
    "          <span translate>save</span>\n" +
    "        </a>\n" +
    "\n" +
    "        <a ng-click=\"validate(form)\" type=\"button\" class=\"btn btn-info\">\n" +
    "          <span translate>validate</span>\n" +
    "        </a>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"clearfix\"></div>\n" +
    "\n" +
    "      <div sf-model=\"sfForm.model\" sf-form=\"sfForm.definition\" sf-schema=\"sfForm.schema\" required=\"true\" sf-options=\"sfOptions\"></div>\n" +
    "\n" +
    "      <div class=\"pull-right\" ng-if=\"loaded\">\n" +
    "        <a ng-click=\"cancel()\" type=\"button\" class=\"btn btn-default\">\n" +
    "          <span translate>cancel</span>\n" +
    "        </a>\n" +
    "\n" +
    "      <a ng-click=\"save()\" type=\"button\" class=\"btn btn-primary\">\n" +
    "        <span translate>save</span>\n" +
    "      </a>\n" +
    "\n" +
    "        <a ng-click=\"validate(form)\" type=\"button\" class=\"btn btn-info\">\n" +
    "          <span translate>validate</span>\n" +
    "        </a>\n" +
    "      </div>\n" +
    "    </form>\n" +
    "\n" +
    "    <div class=\"clearfix voffet2\"></div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("access/views/data-access-request-history-view.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("access/views/data-access-request-history-view.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<table id=\"data-access-request-history\" class=\"table table-striped\">\n" +
    "  <thead>\n" +
    "  <tr>\n" +
    "    <th class=\"status-icon\"></th>\n" +
    "    <th translate>status</th>\n" +
    "    <th translate>changed-by</th>\n" +
    "    <th translate>changed-on</th>\n" +
    "  </tr>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "  <tr ng-repeat=\"status in dataAccessRequest.statusChangeHistory\"\n" +
    "    ng-init=\"info = getStatusHistoryInfo[getStatusHistoryInfoId(status)]\">\n" +
    "    <td><span><i class=\"{{info.icon}} hoffset\"></i></span></td>\n" +
    "    <td>{{info.msg}}</span></span></td>\n" +
    "    <td>{{userProfileService.getFullName(status.profile) || status.author}}</td>\n" +
    "    <td>\n" +
    "      <span title=\"{{status.changedOn | amDateFormat: 'lll'}}\">\n" +
    "        {{status.changedOn | amCalendar}}\n" +
    "      </span>\n" +
    "    </td>\n" +
    "  </tr>\n" +
    "  </tbody>\n" +
    "</table>\n" +
    "");
}]);

angular.module("access/views/data-access-request-list.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("access/views/data-access-request-list.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div id=\"data-access-request-list\">\n" +
    "  <div ng-if=\"headerTemplateUrl\" ng-include=\"headerTemplateUrl\"></div>\n" +
    "\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-xs-12\">\n" +
    "      <a ng-href=\"#/data-access-request/new\" class=\"btn btn-info\">\n" +
    "        <i class=\"fa fa-plus\"></i>\n" +
    "        <span>{{config.newRequestButtonCaption || 'data-access-request.add' | translate}}</span>\n" +
    "      </a>\n" +
    "\n" +
    "      <span ng-bind-html=\"config.newRequestButtonHelpText\"></span>\n" +
    "\n" +
    "      <a ng-if=\"requests.length > 0\" target=\"_self\" download class=\"btn btn-info pull-right\" ng-href=\"{{getCsvExportHref()}}\">\n" +
    "        <i class=\"fa fa-download\"></i> {{'report' | translate}}\n" +
    "      </a>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <p class=\"help-block\" ng-if=\"requests.length == 0 && !loading\">\n" +
    "    <span translate>data-access-request.none</span>\n" +
    "  </p>\n" +
    "\n" +
    "  <p ng-if=\"loading\" class=\"voffset2 loading\">\n" +
    "  </p>\n" +
    "\n" +
    "  <div ng-if=\"requests.length > 0\">\n" +
    "    <div class=\"row voffset2\">\n" +
    "      <div class=\"col-xs-4\">\n" +
    "        <span class=\"input-group input-group-sm no-padding-top\">\n" +
    "          <span class=\"input-group-addon\" id=\"data-access-requests-search\"><i\n" +
    "              class=\"glyphicon glyphicon-search\"></i></span>\n" +
    "          <input ng-model=\"searchText\" type=\"text\" class=\"form-control\"\n" +
    "              aria-describedby=\"data-access-requests-search\">\n" +
    "        </span>\n" +
    "      </div>\n" +
    "      <div class=\"col-xs-2\">\n" +
    "        <div class=\"input-group\">\n" +
    "          <ui-select id=\"status-select\" theme=\"bootstrap\"\n" +
    "              ng-model=\"searchStatus.filter\" reset-search-input=\"true\">\n" +
    "            <ui-select-match allow-clear=\"true\"\n" +
    "                placeholder=\"{{'data-access-request.status-placeholder' | translate}}\">\n" +
    "              <span ng-bind-html=\"$select.selected.translation\"></span>\n" +
    "            </ui-select-match>\n" +
    "            <ui-select-choices repeat=\"data in REQUEST_STATUS\">\n" +
    "              {{data.translation}}\n" +
    "            </ui-select-choices>\n" +
    "          </ui-select>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"col-xs-6\">\n" +
    "        <dir-pagination-controls class=\"pull-right\"></dir-pagination-controls>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"table-responsive\">\n" +
    "      <table class=\"table table-bordered table-striped\">\n" +
    "        <thead>\n" +
    "        <tr>\n" +
    "          <th>ID</th>\n" +
    "          <th translate ng-if=\"showApplicant\">data-access-request.applicant</th>\n" +
    "          <th translate>data-access-request.title</th>\n" +
    "          <th translate>data-access-request.lastUpdate</th>\n" +
    "          <th translate>data-access-request.submissionDate</th>\n" +
    "          <th translate>data-access-request.status</th>\n" +
    "          <th translate>actions</th>\n" +
    "        </tr>\n" +
    "        </thead>\n" +
    "        <tbody>\n" +
    "        <tr\n" +
    "            dir-paginate=\"request in requests | filter:{status: searchStatus.filter.key} : true | filter:searchText | itemsPerPage: 20\">\n" +
    "          <td>\n" +
    "            <a ng-href=\"{{getDataAccessRequestPageUrl()}}#/data-access-request/{{request.id}}\"\n" +
    "                ng-if=\"actions.canView(request)\" translate>{{request.id}}</a>\n" +
    "            <span ng-if=\"!actions.canView(request)\">{{request.id}}</span>\n" +
    "          </td>\n" +
    "          <td ng-if=\"showApplicant\">\n" +
    "            <span ng-if=\"!request.profile.attributes\">\n" +
    "              {{request.applicant}}\n" +
    "            </span>\n" +
    "            <span ng-if=\"request.profile.attributes && actions.canViewProfile('mica-user') && !actions.canViewProfile('mica-data-access-officer')\">\n" +
    "              {{getFullName(request.profile) || request.applicant}}\n" +
    "            </span>\n" +
    "            <a href ng-click=\"userProfile(request.profile)\" ng-if=\"request.profile.attributes && actions.canViewProfile('mica-data-access-officer')\">\n" +
    "              {{getFullName(request.profile) || request.applicant}}\n" +
    "            </a>\n" +
    "          </td>\n" +
    "          <td>\n" +
    "            {{request.title}}\n" +
    "          </td>\n" +
    "          <td>\n" +
    "            <span title=\"{{(request.timestamps.lastUpdate || request.timestamps.created) | amDateFormat: 'lll'}}\">\n" +
    "              {{(request.timestamps.lastUpdate || request.timestamps.created) | amCalendar}}\n" +
    "            </span>\n" +
    "\n" +
    "          </td>\n" +
    "          <td>\n" +
    "            <span ng-if=\"request.submissionDate\" title=\"{{ request.submissionDate | amDateFormat: 'lll' }}\">\n" +
    "              {{request.submissionDate | amCalendar}}\n" +
    "            </span>\n" +
    "          </td>\n" +
    "          <td>\n" +
    "            {{request.status | translate}}\n" +
    "          </td>\n" +
    "          <td>\n" +
    "            <ul class=\"list-inline\">\n" +
    "              <li ng-if=\"actions.canEdit(request)\">\n" +
    "                <a ng-href=\"#/data-access-request/{{request.id}}/edit\"\n" +
    "                    title=\"{{'edit' | translate}}\"><i class=\"fa fa-pencil\"></i></a>\n" +
    "              </li>\n" +
    "              <li>\n" +
    "                <a ng-if=\"actions.canDelete(request)\"\n" +
    "                    ng-click=\"deleteRequest(request)\"\n" +
    "                    title=\"{{'delete' | translate}}\"><i\n" +
    "                    class=\"fa fa-trash-o\"></i></a>\n" +
    "              </li>\n" +
    "            </ul>\n" +
    "          </td>\n" +
    "        </tr>\n" +
    "        </tbody>\n" +
    "      </table>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("access/views/data-access-request-print-preview.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("access/views/data-access-request-print-preview.html",
    "<div ng-if=\"validForm\">\n" +
    "  <div class=\"clearfix\"></div>\n" +
    "\n" +
    "  <div class=\"voffset2\" ng-if=\"dataAccessRequest.project.permissions && dataAccessRequest.project.permissions.view\">\n" +
    "    <div ng-if=\"dataAccessRequest.project\" class=\"pull-right\">\n" +
    "      <small class=\"help-block inline\"> {{'research-project.label' | translate}} :\n" +
    "        <a route-checker route-checker-hides-parent=\"true\" href ng-href=\"#/project/{{dataAccessRequest.project.id}}\">{{dataAccessRequest.project.id}}</a>\n" +
    "      </small>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div>\n" +
    "    <form id=\"request-form\" name=\"forms.requestForm\">\n" +
    "      <div sf-model=\"form.model\" sf-form=\"form.definition\" sf-schema=\"form.schema\"></div>\n" +
    "    </form>\n" +
    "  </div>\n" +
    "\n" +
    "  <div ng-if=\"lastSubmittedDate\">\n" +
    "    <h3 translate>data-access-request.submissionDate</h3>\n" +
    "    <p>{{lastSubmittedDate.changedOn | amDateFormat:'dddd, MMMM Do YYYY' | capitalizeFirstLetter}}</p>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("access/views/data-access-request-profile-user-modal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("access/views/data-access-request-profile-user-modal.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div class=\"modal-content\">\n" +
    "  <div class=\"modal-header\">\n" +
    "    <button type=\"button\" class=\"close\" aria-hidden=\"true\"\n" +
    "      ng-click=\"$dismiss()\">&times;</button>\n" +
    "    <h4 class=\"modal-title\">\n" +
    "      {{'data-access-request.profile.title' | translate}}\n" +
    "    </h4>\n" +
    "  </div>\n" +
    "  <div class=\"modal-body\">\n" +
    "\n" +
    "    <table class=\"table table-bordered table-striped\">\n" +
    "      <tbody>\n" +
    "      <tr>\n" +
    "        <th>{{'data-access-request.profile.name' | translate}}</th>\n" +
    "        <td>{{getFullName(applicant)}}</td>\n" +
    "      </tr>\n" +
    "      <tr>\n" +
    "        <th>{{'data-access-request.profile.email' | translate}}</th>\n" +
    "        <td>{{getProfileEmail(applicant)}}</td>\n" +
    "      </tr>\n" +
    "      <tr ng-repeat=\"attribute in applicant.attributes | filterProfileAttributes\">\n" +
    "          <th>{{\n" +
    "              ('userProfile.' + attribute.key | translate) !== ('userProfile.' + attribute.key) ?\n" +
    "              ('userProfile.' + attribute.key | translate) :\n" +
    "              (attribute.key)\n" +
    "              }}\n" +
    "          </th>\n" +
    "          <td>{{attribute.value}}</td>\n" +
    "      </tr>\n" +
    "      </tbody>\n" +
    "    </table>\n" +
    "\n" +
    "    <a class=\"btn btn-default\" ng-if=\"getProfileEmail(applicant)\" href=\"mailto:{{getProfileEmail(applicant)}}\" target=\"_blank\">\n" +
    "      {{'data-access-request.profile.send-email' | translate}}</a>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <button type=\"button\" class=\"btn btn-primary voffest4\"\n" +
    "      ng-click=\"$dismiss()\">\n" +
    "      <span ng-hide=\"confirm.close\" translate>close</span>\n" +
    "      {{confirm.close}}\n" +
    "    </button>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("access/views/data-access-request-submitted-modal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("access/views/data-access-request-submitted-modal.html",
    "<?php\n" +
    "/**\n" +
    " * @file\n" +
    " * Code for the obiba_mica_data_access_request modules.\n" +
    " */\n" +
    "\n" +
    "?>\n" +
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div class=\"modal-content\">\n" +
    "  <div class=\"modal-header\">\n" +
    "    <button type=\"button\" class=\"close\" aria-hidden=\"true\" ng-click=\"$dismiss()\">&times;</button>\n" +
    "    <h4 class=\"modal-title\">\n" +
    "      <i class=\"fa fa-check fa-lg\"></i>\n" +
    "      {{'data-access-request.submit-confirmation.title' | translate}}\n" +
    "    </h4>\n" +
    "  </div>\n" +
    "  <div class=\"modal-body\">\n" +
    "    <p>{{'data-access-request.submit-confirmation.message' | translate}}</p>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <button type=\"button\" class=\"btn btn-primary voffest4\" ng-click=\"$dismiss()\">\n" +
    "      <span ng-hide=\"confirm.ok\" translate>ok</span>\n" +
    "      {{confirm.ok}}\n" +
    "    </button>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("access/views/data-access-request-validation-modal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("access/views/data-access-request-validation-modal.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div class=\"modal-content\">\n" +
    "  <div class=\"modal-header\">\n" +
    "    <button type=\"button\" class=\"close\" aria-hidden=\"true\" ng-click=\"$dismiss()\">&times;</button>\n" +
    "    <h4 ng-if=\"isValid\" class=\"modal-title\">\n" +
    "      <i class=\"fa fa-check fa-lg\"></i>\n" +
    "      {{'data-access-request.validation.title-success' | translate}}\n" +
    "    </h4>\n" +
    "    <h4 ng-if=\"!isValid\" class=\"modal-title\">\n" +
    "      <i class=\"fa fa-times fa-lg\"></i>\n" +
    "      {{'data-access-request.validation.title-error' | translate}}\n" +
    "    </h4>\n" +
    "  </div>\n" +
    "  <div class=\"modal-body\">\n" +
    "    <p ng-if=\"isValid\">{{'data-access-request.validation.success' | translate}}</p>\n" +
    "    <p ng-if=\"!isValid\" translate>{{'data-access-request.validation.error' | translate}}</p>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <button type=\"button\" class=\"btn btn-primary voffest4\" ng-click=\"$dismiss()\">\n" +
    "      <span ng-hide=\"confirm.ok\" translate>ok</span>\n" +
    "      {{confirm.ok}}\n" +
    "    </button>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("access/views/data-access-request-view.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("access/views/data-access-request-view.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div>\n" +
    "  <div class=\"visible-print\" print-friendly-view></div>\n" +
    "  <div class=\"hidden-print\">\n" +
    "    <div ng-if=\"headerTemplateUrl\" ng-include=\"headerTemplateUrl\"></div>\n" +
    "\n" +
    "    <obiba-alert id=\"DataAccessRequestViewController\"></obiba-alert>\n" +
    "\n" +
    "    <div ng-if=\"validForm\">\n" +
    "\n" +
    "      <p class=\"help-block pull-left\"><span translate>created-by</span>\n" +
    "        <span ng-if=\"!actions.canViewProfile('mica-data-access-officer')\">\n" +
    "           {{getFullName(dataAccessRequest.profile) || dataAccessRequest.applicant}}\n" +
    "        </span>\n" +
    "        <a href ng-click=\"userProfile(dataAccessRequest.profile)\"\n" +
    "            ng-if=\"actions.canViewProfile('mica-data-access-officer')\">\n" +
    "          {{getFullName(dataAccessRequest.profile) || dataAccessRequest.applicant}}</a>,\n" +
    "        <span title=\"{{dataAccessRequest.timestamps.created | amDateFormat: 'lll'}}\">{{dataAccessRequest.timestamps.created | amCalendar}}</span>\n" +
    "        <span class=\"label label-success\">{{dataAccessRequest.status | translate}}</span></p>\n" +
    "\n" +
    "      <div class=\"pull-right\">\n" +
    "        <a ng-click=\"submit()\"\n" +
    "          ng-if=\"actions.canEditStatus(dataAccessRequest) && nextStatus.canSubmit(dataAccessRequest)\"\n" +
    "          class=\"btn btn-info\" translate>submit\n" +
    "        </a>\n" +
    "        <a ng-click=\"reopen()\"\n" +
    "          ng-if=\"actions.canEditStatus(dataAccessRequest) && nextStatus.canReopen(dataAccessRequest)\"\n" +
    "          class=\"btn btn-info\" translate>reopen\n" +
    "        </a>\n" +
    "        <a ng-click=\"review()\"\n" +
    "          ng-if=\"actions.canEditStatus(dataAccessRequest) && nextStatus.canReview(dataAccessRequest)\"\n" +
    "          class=\"btn btn-info\" translate>review\n" +
    "        </a>\n" +
    "        <a ng-click=\"conditionallyApprove()\"\n" +
    "           ng-if=\"actions.canEditStatus(dataAccessRequest) && nextStatus.canConditionallyApprove(dataAccessRequest)\"\n" +
    "           class=\"btn btn-info\" translate>conditionallyApprove\n" +
    "        </a>\n" +
    "        <a ng-click=\"approve()\"\n" +
    "          ng-if=\"actions.canEditStatus(dataAccessRequest) && nextStatus.canApprove(dataAccessRequest)\"\n" +
    "          class=\"btn btn-info\" translate>approve\n" +
    "        </a>\n" +
    "        <a ng-click=\"reject()\"\n" +
    "          ng-if=\"actions.canEditStatus(dataAccessRequest) && nextStatus.canReject(dataAccessRequest)\"\n" +
    "          class=\"btn btn-info\" translate>reject\n" +
    "        </a>\n" +
    "        <a ng-href=\"#/data-access-request/{{dataAccessRequest.id}}/edit\"\n" +
    "          ng-if=\"actions.canEdit(dataAccessRequest)\"\n" +
    "          class=\"btn btn-primary\" title=\"{{'edit' | translate}}\">\n" +
    "          <i class=\"fa fa-pencil-square-o\"></i>\n" +
    "        </a>\n" +
    "        <a ng-if=\"form.downloadTemplate === false\" ng-click=\"printForm()\"\n" +
    "           class=\"btn btn-default\" title=\"{{'global.print' | translate}}\">\n" +
    "          <i class=\"fa fa-print\"></i> <span translate>global.print</span>\n" +
    "        </a>\n" +
    "        <a ng-if=\"form.downloadTemplate === true\" target=\"_self\" href=\"{{requestDownloadUrl}}\" class=\"btn btn-default\">\n" +
    "          <i class=\"fa fa-download\"></i> <span>{{config.downloadButtonCaption || 'download' | translate}}</span>\n" +
    "        </a>\n" +
    "        <a ng-click=\"delete()\"\n" +
    "          ng-if=\"actions.canDelete(dataAccessRequest)\"\n" +
    "          class=\"btn btn-danger\" title=\"{{'delete' | translate}}\">\n" +
    "          <i class=\"fa fa-trash-o\"></i>\n" +
    "        </a>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"clearfix\"></div>\n" +
    "\n" +
    "      <div class=\"voffset2\" ng-if=\"dataAccessRequest.project.permissions && dataAccessRequest.project.permissions.view\">\n" +
    "        <div ng-if=\"dataAccessRequest.project\" class=\"pull-right\">\n" +
    "          <small class=\"help-block inline\"> {{'research-project.label' | translate}} :\n" +
    "            <a route-checker route-checker-hides-parent=\"true\" href ng-href=\"#/project/{{dataAccessRequest.project.id}}\">{{dataAccessRequest.project.id}}</a>\n" +
    "          </small>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <uib-tabset class=\"voffset5\">\n" +
    "        <uib-tab ng-click=\"selectTab('form')\" heading=\"{{'data-access-request.form' | translate}}\">\n" +
    "          <form id=\"request-form\" name=\"forms.requestForm\">\n" +
    "            <div sf-model=\"form.model\" sf-form=\"form.definition\" sf-schema=\"form.schema\" sf-options=\"sfOptions\"></div>\n" +
    "          </form>\n" +
    "        </uib-tab>\n" +
    "        <uib-tab ng-click=\"selectTab('documents')\">\n" +
    "          <uib-tab-heading>\n" +
    "            {{config.documentsSectionTitle || 'data-access-request.documents' | translate}}\n" +
    "            <span class=\"badge hoffset1\" ng-show=\"dataAccessRequest.attachments\"><small>{{dataAccessRequest.attachments.length}}</small></span>\n" +
    "          </uib-tab-heading>\n" +
    "          <div ng-include=\"'access/views/data-access-request-documents-view.html'\"></div>\n" +
    "        </uib-tab>\n" +
    "        <uib-tab ng-if=\"config.commentsEnabled\" ng-click=\"selectTab('comments')\" heading=\"{{'data-access-request.comments' | translate}}\">\n" +
    "          <obiba-comments class=\"voffset2\" comments=\"form.comments\"\n" +
    "                          on-update=\"updateComment\" on-delete=\"deleteComment\"\n" +
    "                          name-resolver=\"userProfileService.getFullName\"\n" +
    "                          edit-action=\"EDIT\" delete-action=\"DELETE\"></obiba-comments>\n" +
    "          <obiba-comment-editor on-submit=\"submitComment\"></obiba-comment-editor>\n" +
    "        </uib-tab>\n" +
    "        <uib-tab ng-click=\"selectTab('history')\" heading=\"{{'data-access-request.history' | translate}}\">\n" +
    "          <div ng-include=\"'access/views/data-access-request-history-view.html'\"></div>\n" +
    "        </uib-tab>\n" +
    "      </uib-tabset>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("attachment/attachment-input-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("attachment/attachment-input-template.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<button ng-hide=\"{{disabled}}\" type=\"button\" class=\"btn btn-primary btn-xs\" aria-hidden=\"true\" ngf-multiple=\"{{multiple}}\" ngf-select\n" +
    "        ngf-change=\"onFileSelect($files)\" translate>file.upload.button\n" +
    "</button>\n" +
    "\n" +
    "<table ng-show=\"files.length\" class=\"table table-bordered table-striped\">\n" +
    "  <thead>\n" +
    "  <tr>\n" +
    "    <th translate>data-access-request.default.documents.title</th>\n" +
    "    <th class=\"col-xs-2\"><span class=\"pull-right\" translate>file.upload.date</span></th>\n" +
    "    <th translate>size</th>\n" +
    "    <th translate>actions</th>\n" +
    "  </tr>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "  <tr ng-repeat=\"file in files\">\n" +
    "    <td>\n" +
    "      {{file.fileName}}\n" +
    "      <uib-progressbar ng-show=\"file.showProgressBar\" class=\"progress-striped\" value=\"file.progress\">\n" +
    "        {{file.progress}}%\n" +
    "      </uib-progressbar>\n" +
    "    </td>\n" +
    "    <td>\n" +
    "      <span class=\"pull-right\" ng-if=\"file.timestamps\" title=\"{{ file.timestamps.created | amDateFormat: 'lll' }}\">{{file.timestamps.created | amCalendar }}</span>\n" +
    "    </td>\n" +
    "    <td style=\"width:1%;\">\n" +
    "        <span class=\"pull-right\" style=\"white-space: nowrap;\">\n" +
    "          {{file.size | bytes}}\n" +
    "        </span>\n" +
    "    </td>\n" +
    "    <td style=\"width:20px;\">\n" +
    "      <a ng-show=\"file.id\" ng-click=\"deleteFile(file.id)\" class=\"action\">\n" +
    "        <i class=\"fa fa-trash-o\"></i>\n" +
    "      </a>\n" +
    "      <a ng-show=\"file.tempId\" ng-click=\"deleteTempFile(file.tempId)\" class=\"action\">\n" +
    "        <i class=\"fa fa-trash-o\"></i>\n" +
    "      </a>\n" +
    "    </td>\n" +
    "  </tr>\n" +
    "  </tbody>\n" +
    "</table>\n" +
    "");
}]);

angular.module("attachment/attachment-list-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("attachment/attachment-list-template.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div>\n" +
    "  <span ng-if=\"!hasAttachments && emptyMessage\"><em>{{emptyMessage}}</em></span>\n" +
    "  <table ng-if=\"hasAttachments\" class=\"table table-bordered table-striped\" >\n" +
    "    <thead>\n" +
    "    <tr>\n" +
    "      <th translate>data-access-request.default.documents.title</th>\n" +
    "      <th class=\"col-xs-2\"><span class=\"pull-right\" translate>file.upload.date</span></th>\n" +
    "      <th translate>size</th>\n" +
    "    </tr>\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "    <tr ng-repeat=\"attachment in attachments\">\n" +
    "      <th>\n" +
    "        <a target=\"_self\" ng-href=\"{{attachment.href}}\"\n" +
    "           download=\"{{attachment.fileName}}\">{{attachment.fileName}}\n" +
    "        </a>\n" +
    "      </th>\n" +
    "      <td><span class=\"pull-right\" ng-if=\"attachment.timestamps\" title=\"{{ attachment.timestamps.created | amDateFormat: 'lll' }}\">{{attachment.timestamps.created | amCalendar }}</span></td>\n" +
    "      <td style=\"width:1%;\">\n" +
    "        <span class=\"pull-right\" style=\"white-space: nowrap;\">\n" +
    "          {{attachment.size | bytes}}\n" +
    "        </span>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "    </tbody>\n" +
    "  </table>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("file-browser/views/document-detail-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("file-browser/views/document-detail-template.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div class=\"panel panel-default\">\n" +
    "  <div class=\"panel-heading\">\n" +
    "    <span>\n" +
    "      <span title=\"{{data.details.document.name}}\">\n" +
    "        <i class=\"fa {{getDocumentIcon(data.details.document)}}\"></i> {{truncate(data.details.document.name, 30)}}\n" +
    "      </span>\n" +
    "      <a href class=\"pull-right\" ng-click=\"hideDetails()\"><i class=\"fa fa-times\"></i></a>\n" +
    "    </span>\n" +
    "  </div>\n" +
    "  <div class=\"panel-body\">\n" +
    "    <div>\n" +
    "      <label class=\"text-muted no-margin\">\n" +
    "        <small>{{'size' | translate}}</small>\n" +
    "      </label>\n" +
    "      <div>\n" +
    "        <span ng-if=\"!isFile(data.details.document)\">{{data.details.document.size}} {{data.details.document.size === 1 ? 'item' : 'items' | translate}}</span>\n" +
    "        <span ng-if=\"isFile(data.details.document)\">{{data.details.document.size | bytes}}</span>\n" +
    "        <a target=\"{{downloadTarget}}\" ng-href=\"{{getDownloadUrl(data.details.document.path, data.document.keyToken)}}\" class=\"hoffset2\" title=\"{{'download' | translate}}\" download>\n" +
    "          <span><i class=\"fa fa-download\"></i><span class=\"hoffset2\"></span></span>\n" +
    "        </a>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"voffset2\">\n" +
    "      <label class=\"text-muted no-margin\">\n" +
    "        <small>{{'created-on' | translate}}</small>\n" +
    "      </label>\n" +
    "      <div>\n" +
    "        <span>{{data.details.document.timestamps.created | amDateFormat : 'lll'}}</span>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"voffset2\">\n" +
    "      <label class=\"text-muted no-margin\">\n" +
    "        <small>{{'last-modified' | translate}}</small>\n" +
    "      </label>\n" +
    "      <div>\n" +
    "        <span>{{data.details.document.timestamps.lastUpdate | amDateFormat : 'lll'}}</span>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"isFile(data.details.document)\" class=\"voffset2\">\n" +
    "      <div ng-if=\"data.details.document.attachment.type\">\n" +
    "        <label class=\"text-muted no-margin\">\n" +
    "          <small>{{'type' | translate}}</small>\n" +
    "        </label>\n" +
    "        <div>\n" +
    "          <span>{{data.details.document.attachment.type}}</span>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div ng-show=\"hasLocalizedValue(data.details.document.attachment.description)\"\n" +
    "           class=\"voffset2\">\n" +
    "        <label class=\"text-muted no-margin\">\n" +
    "          <small>{{'description' | translate}}</small>\n" +
    "        </label>\n" +
    "        <div>\n" +
    "          <span>{{getLocalizedValue(data.details.document.attachment.description)}}</span>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("file-browser/views/documents-table-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("file-browser/views/documents-table-template.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div class=\"panel panel-default table-responsive table-responsive-dropdown\">\n" +
    "  <div class=\"panel-heading\" ng-if=\"data.search.active\">\n" +
    "      <a class=\"no-text-decoration\" ng-click=\"clearSearch()\">\n" +
    "        <i class=\"fa fa-chevron-left\"> </i>\n" +
    "      </a>\n" +
    "      <span ng-if=\"data.search.recursively\">{{'file.search-results.current-sub' | translate}}</span>\n" +
    "      <span ng-if=\"!data.search.recursively\">{{'file.search-results.current' | translate}}</span>\n" +
    "      ({{data.document.children.length}})\n" +
    "  </div>\n" +
    "  <div ng-if=\"data.document.children.length > 0\" test-ref=\"file-search-result-list\">\n" +
    "    <table class=\"table table-bordered table-striped no-padding no-margin\">\n" +
    "      <thead>\n" +
    "      <tr>\n" +
    "        <th colspan=\"2\" translate>name</th>\n" +
    "        <th style=\"width: 100px\" translate>type</th>\n" +
    "        <th style=\"width: 100px\" translate>size</th>\n" +
    "        <th style=\"width: 150px\" translate>global.modified</th>\n" +
    "        <th ng-if=\"data.search.active\" translate>folder</th>\n" +
    "      </tr>\n" +
    "      </thead>\n" +
    "      <tbody>\n" +
    "      <tr ng-show=\"!data.isRoot && data.document.path !== data.rootPath && !data.search.active\">\n" +
    "        <td colspan=\"5\">\n" +
    "          <i class=\"fa fa-folder\"></i>\n" +
    "          <span><a href style=\"text-decoration: none\" class=\"no-text-decoration\" ng-click=\"navigateBack()\"> ..</a></span>\n" +
    "        </td>\n" +
    "      </tr>\n" +
    "      <tr ng-class=\"{'selected-row': $index === pagination.selected}\"\n" +
    "          dir-paginate=\"document in data.document.children | itemsPerPage: pagination.itemsPerPage\"\n" +
    "          ng-init=\"fileDocument = isFile(document)\"\n" +
    "          current-page=\"pagination.currentPage\">\n" +
    "\n" +
    "        <td ng-click=\"showDetails(document, $index);\">\n" +
    "          <span>\n" +
    "            <span ng-if=\"fileDocument\">\n" +
    "              <i class=\"fa {{getDocumentIcon(document)}}\"></i>\n" +
    "              <a ng-if=\"fileDocument\" target=\"{{downloadTarget}}\" test-ref=\"file-name\"\n" +
    "                 style=\"text-decoration: none\" ng-click=\"$event.stopPropagation();\" ng-href=\"{{getDownloadUrl(document.path, data.document.keyToken)}}\"\n" +
    "                  title=\"{{document.name}}\">\n" +
    "                {{document.name}}\n" +
    "              </a>\n" +
    "            </span>\n" +
    "            <span ng-if=\"!fileDocument\">\n" +
    "              <i class=\"fa {{getDocumentIcon(document)}}\"></i>\n" +
    "              <a href style=\"text-decoration: none\" ng-click=\"navigateTo($event, document, data.document.keyToken)\">\n" +
    "                {{document.name}}\n" +
    "              </a>\n" +
    "            </span>\n" +
    "          </span>\n" +
    "        </td>\n" +
    "\n" +
    "        <td class=\"fit-content\">\n" +
    "          <span class=\"btn-group pull-right\" uib-dropdown is-open=\"status.isopen\">\n" +
    "            <a title=\"{{'file.show-details' | translate}}\" id=\"single-button\" class=\"dropdown-anchor\" uib-dropdown-toggle\n" +
    "               ng-disabled=\"disabled\">\n" +
    "              <i class=\"glyphicon glyphicon-option-horizontal btn-large\"></i>\n" +
    "            </a>\n" +
    "            <ul class=\"dropdown-menu\" uib-dropdown-menu role=\"menu\" aria-labelledby=\"single-button\">\n" +
    "              <li role=\"menuitem\">\n" +
    "                <a href ng-click=\"showDetails(document, $index)\">\n" +
    "                  <span><i class=\"fa fa-info\"></i><span class=\"hoffset2\">{{'details' | translate}}</span></span>\n" +
    "                </a>\n" +
    "              </li>\n" +
    "              <li role=\"menuitem\">\n" +
    "                <a target=\"{{downloadTarget}}\" ng-href=\"{{getDownloadUrl(document.path, data.document.keyToken)}}\" download>\n" +
    "                  <span><i class=\"fa fa-download\"></i><span class=\"hoffset2\">{{'download' | translate}}</span></span>\n" +
    "                </a>\n" +
    "              </li>\n" +
    "            </ul>\n" +
    "          </span>\n" +
    "        </td>\n" +
    "\n" +
    "        <td>\n" +
    "          <span ng-repeat=\"t in getTypeParts(document) track by $index\"\n" +
    "            class=\"label label-info\" test-ref=\"file-type\"\n" +
    "            ng-class=\"{'hoffset1' : !$first}\">{{t}}</span>\n" +
    "        </td>\n" +
    "        <td class=\"no-wrap\" ng-if=\"fileDocument\" test-ref=\"file-size\">\n" +
    "          {{document.size | bytes}}\n" +
    "        </td>\n" +
    "        <td class=\"no-wrap\" ng-if=\"!fileDocument\">\n" +
    "          {{document.size}} {{document.size === 1 ? 'item' : 'items' | translate}}\n" +
    "        </td>\n" +
    "        <td>\n" +
    "          <span title=\"{{document.timestamps.lastUpdate | amDateFormat: 'lll'}}\" test-ref=\"file-lastModification\">\n" +
    "            {{document.timestamps.lastUpdate | amTimeAgo}}\n" +
    "          </span>\n" +
    "        </td>\n" +
    "        <td ng-if=\"data.search.active\">\n" +
    "          <a href class=\"no-text-decoration\" ng-click=\"navigateToParent($event, document, data.document.keyToken)\" test-ref=\"file-parent\">\n" +
    "            {{document.attachment.path === data.rootPath ? '/' : document.attachment.path.replace(data.rootPath, '')}}\n" +
    "          </a>\n" +
    "        </td>\n" +
    "      </tr>\n" +
    "      </tbody>\n" +
    "    </table>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("file-browser/views/file-browser-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("file-browser/views/file-browser-template.html",
    "<div ng-cloak>\n" +
    "  <div ng-if=\"!data.document\" class=\"loading\"></div>\n" +
    "\n" +
    "  <div ng-if=\"data.document\">\n" +
    "    <obiba-alert id=\"FileSystemController\"></obiba-alert>\n" +
    "\n" +
    "    <div>\n" +
    "      <!-- Document details -->\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-md-12\">\n" +
    "          <div ng-include=\"'file-browser/views/toolbar-template.html'\"></div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"row voffset2\">\n" +
    "        <div ng-class=\"{'col-md-8': data.details.show, 'col-md-12': !data.details.show}\">\n" +
    "          <div ng-include=\"'file-browser/views/documents-table-template.html'\"></div>\n" +
    "          <div ng-if=\"!data.isFile && data.document.children.length < 1 && !data.search.active\" class=\"text-muted\">\n" +
    "            <em>{{'empty-folder' | translate}}</em>\n" +
    "          </div>\n" +
    "          <div class=\"pull-right no-margin\">\n" +
    "            <dir-pagination-controls></dir-pagination-controls>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div ng-if=\"data.details.show\" class=\"col-md-4\">\n" +
    "          <div ng-include=\"'file-browser/views/document-detail-template.html'\"></div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("file-browser/views/toolbar-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("file-browser/views/toolbar-template.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "<div>\n" +
    "    <div class=\"pull-left voffset3\">\n" +
    "        <ol ng-show=\"data.document.path !== data.rootPath\" class=\"breadcrumb mica-breadcrumb no-margin no-padding\">\n" +
    "            <li>\n" +
    "                <a href ng-click=\"navigateToPath(data.rootPath, data.document.keyToken)\">\n" +
    "                    <span><i class=\"fa {{getDocumentIcon(data.document)}}\"></i></span>\n" +
    "                </a>\n" +
    "            </li>\n" +
    "\n" +
    "            <li ng-repeat=\"part in data.breadcrumbs\" ng-class=\"{'active': $first === $last && $last}\">\n" +
    "                <a ng-show=\"!$last && part.name !== '/'\" href ng-click=\"navigateToPath(part.path, data.document.keyToken)\">\n" +
    "                    <span ng-show=\"part.name !== '/'\">{{part.name}}</span>\n" +
    "                </a>\n" +
    "                <span class=\"no-padding\" ng-if=\"part.name !== '/' && $last\">{{data.document.name || 'empty'}}</span>\n" +
    "            </li>\n" +
    "        </ol>\n" +
    "    </div>\n" +
    "    <div ng-if=\"!data.document.keyToken\" class=\"pull-right\">\n" +
    "\n" +
    "      <table style=\"border:none\">\n" +
    "        <tbody>\n" +
    "        <tr>\n" +
    "          <td>\n" +
    "            <a href>\n" +
    "              <span class=\"input-group input-group-sm no-padding-top no-padding-right\">\n" +
    "               <span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-search\"></i></span>\n" +
    "               <input ng-keyup=\"searchKeyUp($event)\"\n" +
    "                      ng-model=\"data.search.text\"\n" +
    "                      type=\"text\"\n" +
    "                      class=\"form-control ng-pristine ng-untouched ng-valid\"\n" +
    "                      aria-describedby=\"study-search\"\n" +
    "                      style=\"max-width: 200px;\"\n" +
    "                      test-ref=\"file-search-input\">\n" +
    "               <span ng-show=\"data.search.text\" title=\"{{'search-tooltip.clear' | translate}}\" ng-click=\"clearSearch()\"\n" +
    "                  class=\"input-group-addon\">\n" +
    "                <i class=\"fa fa-times\"></i>\n" +
    "               </span>\n" +
    "              </span>\n" +
    "            </a>\n" +
    "          </td>\n" +
    "          <td>\n" +
    "            <a href ng-model=\"data.search.recursively\"\n" +
    "              class=\"btn btn-sm hoffset1\"\n" +
    "              ng-class=\"{'btn-info': data.search.recursively, 'btn-default': !data.search.recursively}\"\n" +
    "              data-toggle=\"button\" ng-click=\"toggleRecursively()\"\n" +
    "              title=\"{{'search-tooltip.recursively' | translate}}\">\n" +
    "              <i class=\"fa i-obiba-hierarchy\"></i>\n" +
    "            </a>\n" +
    "            <a href ng-click=\"searchDocuments('RECENT')\"\n" +
    "              class=\"btn btn-info btn-sm\"\n" +
    "              title=\"{{'search-tooltip.most-recent' | translate}}\">\n" +
    "              <span><i class=\"fa fa-clock-o fa-lg\"></i></span>\n" +
    "            </a>\n" +
    "          </td>\n" +
    "        </tr>\n" +
    "        </tbody>\n" +
    "      </table>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("graphics/views/charts-directive.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("graphics/views/charts-directive.html",
    "<div>\n" +
    "  <div ng-if=\"chartObject.type === 'GeoChart'\">\n" +
    "    <obiba-geo config=\"chartObject.d3Config\"></obiba-geo>\n" +
    "  </div>\n" +
    "  <div ng-if=\"chartObject.type !== 'GeoChart'\">\n" +
    "    <obiba-nv-chart chart-config=\"chartObject.d3Config\"></obiba-nv-chart>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("graphics/views/tables-directive.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("graphics/views/tables-directive.html",
    "<div>\n" +
    "    <table ng-if=\"chartObject.entries && chartObject.entries.length\" style=\"max-height: 400px;\" class=\"table table-bordered table-striped\" fixed-header=\"chartObject.getTable().data\">\n" +
    "        <thead>\n" +
    "        <tr>\n" +
    "        <th ng-repeat=\"header in chartObject.header track by $index\">{{header}}</th>\n" +
    "        </tr>\n" +
    "        </thead>\n" +
    "        <tbody>\n" +
    "        <tr ng-repeat=\"row in chartObject.entries track by $index\">\n" +
    "            <td>{{row.title}}</td>\n" +
    "            <td><a href ng-click=\"updateCriteria(row.key, chartObject.vocabulary)\">{{row.value}}</a></td>\n" +
    "            <td ng-if=\"row.participantsNbr\">{{row.participantsNbr}}</td>\n" +
    "        </tr>\n" +
    "        </tbody>\n" +
    "    </table>\n" +
    "</div>\n" +
    "");
}]);

angular.module("lists/views/input-search-widget/input-search-widget-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("lists/views/input-search-widget/input-search-widget-template.html",
    "<form class=\"list-search-widget\">\n" +
    "    <div class=\"form-group pull-left\">\n" +
    "        <entity-search-typeahead\n" +
    "                placeholder-text=\"global.list-search-placeholder\"\n" +
    "                target=\"target\"\n" +
    "                rql-query=\"rqlQuery\"\n" +
    "                entity-type=\"type\">\n" +
    "        </entity-search-typeahead>\n" +
    "    </div>\n" +
    "    <div class=\"pull-left voffset2 hoffset2\">\n" +
    "        <small><a href ng-href=\"{{navigateToSearchPage()}}\">\n" +
    "            {{'search.advanced-button' | translate}}\n" +
    "        </a></small>\n" +
    "    </div>\n" +
    "</form>\n" +
    "");
}]);

angular.module("lists/views/list/datasets-search-result-table-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("lists/views/list/datasets-search-result-table-template.html",
    "<div>\n" +
    "    <div class=\"col-md-12\"><div ng-if=\"loading\" class=\"loading \"></div></div>\n" +
    "    <div ng-show=\"!loading\" class=\"col-md-12\">\n" +
    "        <p class=\"help-block\" ng-if=\"!summaries || !summaries.length\" translate>search.dataset.noResults</p>\n" +
    "        <div ng-repeat=\"summary in summaries\" class=\"row sm-bottom-margin document-item-list flex-row\" test-ref=\"dataset\">\n" +
    "            <div class=\"col-md-12  col-sm-12 col-xs-12\">\n" +
    "                <h4>\n" +
    "                    <a ng-href=\"{{PageUrlService.datasetPage(summary.id, summary.variableType)}}\">\n" +
    "                        <localized value=\"summary.name\" lang=\"lang\"></localized>\n" +
    "                    </a>\n" +
    "                </h4>\n" +
    "                <p>\n" +
    "                    <localized value=\"summary.description\"\n" +
    "                               ellipsis-size=\"250\"\n" +
    "                               markdown-it=\"true\"\n" +
    "                               lang=\"lang\"></localized>\n" +
    "                </p>\n" +
    "                <a ng-if=\"summary.description\" href=\"{{PageUrlService.datasetPage(summary.id, summary.variableType)}}\" >{{\"global.read-more\" | translate}}</a>\n" +
    "                <div class=\"clear-fix\"></div>\n" +
    "                <div class=\"sm-top-margin countDetail voffset3\">\n" +
    "                    {{counts=summary['obiba.mica.CountStatsDto.datasetCountStats'];\"\"}}\n" +
    "                    <a ng-if=\"counts.networks && options.obibaListOptions.showNetworkBadge!==false\"\n" +
    "                       href=\"{{'networks' | doSearchQuery : 'dataset(in(Mica_dataset.id,' + summary.id +  '))' }}\"\n" +
    "                       class=\"btn btn-default btn-xxs\"\n" +
    "                       test-ref=\"studyCount\">\n" +
    "                        <localized-number\n" +
    "                                value=\"counts.networks\"></localized-number>\n" +
    "                        {{counts.networks > 1 ? \"networks\" : \"network.label\"\n" +
    "                        | translate}}\n" +
    "                    </a>\n" +
    "                    <a ng-if=\"counts.studies && options.obibaListOptions.showStudyBadge!==false\"\n" +
    "                       href=\"{{'studies' | doSearchQuery : 'dataset(in(Mica_dataset.id,' + summary.id +  '))' }}\"\n" +
    "                       class=\"btn btn-default btn-xxs\"\n" +
    "                       test-ref=\"studyCount\">\n" +
    "                        <localized-number\n" +
    "                                value=\"counts.studies\"></localized-number>\n" +
    "                        {{counts.studies > 1 ? \"studies\" : \"study.label\"\n" +
    "                        | translate}}\n" +
    "                    </a>\n" +
    "\n" +
    "                    <a ng-if=\"counts.variables && options.obibaListOptions.showVariableBadge!==false\"\n" +
    "                       href=\"{{'variables' | doSearchQuery : 'dataset(in(Mica_dataset.id,' + summary.id +  '))' }}\"\n" +
    "                       class=\"btn btn-default btn-xxs\"\n" +
    "                       test-ref=\"variableCount\">\n" +
    "                        <localized-number\n" +
    "                                value=\"counts.variables\"></localized-number>\n" +
    "                        {{counts.variables > 1 ? \"variables\" : \"search.variable.facet-label\"\n" +
    "                        | translate}}\n" +
    "                    </a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("lists/views/list/networks-search-result-table-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("lists/views/list/networks-search-result-table-template.html",
    "<div>\n" +
    "    <div class=\"col-md-12\"><div ng-if=\"loading\" class=\"loading \"></div></div>\n" +
    "    <div ng-show=\"!loading\" class=\"col-md-12\">\n" +
    "        <p class=\"help-block\" ng-if=\"!summaries || !summaries.length\" translate>search.network.noResults</p>\n" +
    "        <div ng-if=\"summaries && summaries.length\" ng-init=\"lang = $parent.$parent.lang\">\n" +
    "            <div ng-repeat=\"summary in summaries\"\n" +
    "                 ng-init=\"lang = $parent.$parent.lang;\"\n" +
    "                 class=\"row lg-bottom-margin document-item-list flex-row\"\n" +
    "                 test-ref=\"network\">\n" +
    "                <div class=\"col-md-2 hidden-xs hidden-sm text-center\">\n" +
    "                    <img ng-if=\"summary.logo\" ng-src=\"{{summary.logoUrl}}\"\n" +
    "                         class=\"img-responsive\"/>\n" +
    "\n" +
    "                    <h1 ng-if=\"!summary.logo\" src=\"\" alt=\"\"\n" +
    "                        class=\"big-character\">\n" +
    "                        <span class=\"t_badge color_light i-obiba-N\"></span>\n" +
    "                    </h1>\n" +
    "                </div>\n" +
    "                <div class=\"col-md-10  col-sm-12 col-xs-12\">\n" +
    "                    <h4>\n" +
    "                        <a href=\"{{PageUrlService.networkPage(summary.id)}}\">\n" +
    "                            <localized value=\"summary.name\"\n" +
    "                                       lang=\"lang\"></localized>\n" +
    "                        </a>\n" +
    "                    </h4>\n" +
    "                    <p>\n" +
    "                        <localized value=\"summary.description\" lang=\"lang\"\n" +
    "                                   ellipsis-size=\"250\"\n" +
    "                                   markdown-it=\"true\"></localized>\n" +
    "                    </p>\n" +
    "                    <a ng-if=\"summary.description\" href=\"{{PageUrlService.networkPage(summary.id)}}\" >{{\"global.read-more\" | translate}}</a>\n" +
    "                    <div class=\"clear-fix\"></div>\n" +
    "                    <div class=\"sm-top-margin countDetail voffset3\">\n" +
    "                        {{counts=summary['obiba.mica.CountStatsDto.networkCountStats'];\"\"}}\n" +
    "                        <a ng-if=\"counts.individualStudies && options.obibaListOptions.showStudyBadge!==false\"\n" +
    "                           href=\"{{'studies' | doSearchQuery:'network(in(Mica_network.id,' + summary.id +  ')),study(in(Mica_study.className,Study))' }}\"\n" +
    "                           class=\"btn btn-default btn-xxs\"\n" +
    "                           test-ref=\"individualStudyCount\">\n" +
    "                            <localized-number\n" +
    "                                    value=\"counts.individualStudies\"></localized-number>\n" +
    "                            {{counts.individualStudies > 1 ?\n" +
    "                            \"global.individual-studies\":\"global.individual-study\"\n" +
    "                            | translate}}\n" +
    "                        </a>\n" +
    "\n" +
    "                        <a ng-if=\"counts.studiesWithVariables && options.obibaListOptions.showStudyBadge!==false\"\n" +
    "                           href=\"{{'studies' | doSearchQuery : 'network(in(Mica_network.id,' + summary.id +  ')),variable(in(Mica_variable.variableType,Collected))' }}\"\n" +
    "                           class=\"btn btn-default btn-xxs\"\n" +
    "                           test-ref=\"studyWithVariablesCount\">\n" +
    "                            <localized-number\n" +
    "                                    value=\"counts.studiesWithVariables\"></localized-number>\n" +
    "                            {{counts.studiesWithVariables > 1 ?\n" +
    "                            \"metrics.mica.studies-with-variables\" :\n" +
    "                            \"metrics.mica.study-with-variables\"\n" +
    "                            | translate}}\n" +
    "                        </a>\n" +
    "\n" +
    "                        <a ng-if=\"counts.studyVariables && options.obibaListOptions.showVariableBadge!==false\"\n" +
    "                           href=\"{{'variables' | doSearchQuery : 'network(in(Mica_network.id,' + summary.id +  ')),variable(in(Mica_variable.variableType,Collected))' }}\"\n" +
    "                           class=\"btn btn-default btn-xxs\"\n" +
    "                           test-ref=\"studyVariableCount\">\n" +
    "                            <localized-number\n" +
    "                                    value=\"counts.studyVariables\"></localized-number>\n" +
    "                            {{counts.studyVariables > 1 ?\n" +
    "                            \"metrics.mica.study-variables\" :\n" +
    "                            \"metrics.mica.study-variable\"\n" +
    "                            | translate}}\n" +
    "                        </a>\n" +
    "\n" +
    "                        <a ng-if=\"counts.harmonizationStudies && options.obibaListOptions.showStudyBadge!==false\"\n" +
    "                           href=\"{{'studies' | doSearchQuery : 'network(in(Mica_network.id,' + summary.id +  ')),study(in(Mica_study.className,HarmonizationStudy))' }}\"\n" +
    "                           class=\"btn btn-default btn-xxs\"\n" +
    "                           test-ref=\"harmonizationStudyCount\">\n" +
    "                            <localized-number\n" +
    "                                    value=\"counts.harmonizationStudies\"></localized-number>\n" +
    "                            {{counts.harmonizationStudies > 1 ?\n" +
    "                            \"global.harmonization-studies\" :\n" +
    "                            \"global.harmonization-study\"\n" +
    "                            | translate}}\n" +
    "                        </a>\n" +
    "\n" +
    "                        <a ng-if=\"counts.dataschemaVariables && options.obibaListOptions.showVariableBadge!==false\"\n" +
    "                           href=\"{{'variables' | doSearchQuery : 'network(in(Mica_network.id,' + summary.id +  ')),variable(in(Mica_variable.variableType,Dataschema))' }}\"\n" +
    "                           class=\"btn btn-default btn-xxs\"\n" +
    "                           test-ref=\"harmonizationStudyWithVariablesCount\">\n" +
    "                            <localized-number\n" +
    "                                    value=\"counts.dataschemaVariables\"></localized-number>\n" +
    "                            {{counts.dataschemaVariables > 1 ?\n" +
    "                            \"metrics.mica.harmonization-study-variables\" :\n" +
    "                            \"metrics.mica.harmonization-study-variable\"\n" +
    "                            | translate}}\n" +
    "                        </a>\n" +
    "                        {{datasetsCount = counts.studyDatasets +\n" +
    "                        counts.harmonizationDatasets; \"\"}}\n" +
    "                        <a ng-if=\"datasetsCount && options.obibaListOptions.showDatasetBadge!==false\"\n" +
    "                           href=\"{{'datasets' | doSearchQuery : 'network(in(Mica_network.id,' + summary.id +  '))' }}\"\n" +
    "                           class=\"btn btn-default btn-xxs\"\n" +
    "                           test-ref=\"datasetCount\">\n" +
    "                            <localized-number\n" +
    "                                    value=\"datasetsCount\"></localized-number>\n" +
    "                            {{datasetsCount > 1 ? \"datasets\" :\n" +
    "                            \"dataset.details\"\n" +
    "                            | translate}}\n" +
    "                        </a>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("lists/views/list/studies-search-result-table-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("lists/views/list/studies-search-result-table-template.html",
    "<div>\n" +
    "    <div class=\"col-md-12\"><div ng-if=\"loading\" class=\"loading \"></div></div>\n" +
    "    <div ng-show=\"!loading\" class=\"col-md-12\">\n" +
    "        <p class=\"help-block\" ng-if=\"!summaries || !summaries.length\" translate>search.study.noResults</p>\n" +
    "        <div ng-if=\"summaries && summaries.length\" ng-init=\"lang = $parent.$parent.lang\">\n" +
    "            <div ng-repeat=\"summary in summaries\"\n" +
    "                 ng-init=\"lang = $parent.$parent.lang; studyPath= summary.studyResourcePath=='individual-study'?'individual-study':'harmonization-study'\"\n" +
    "                 class=\"row lg-bottom-margin document-item-list flex-row\"\n" +
    "                 test-ref=\"study\">\n" +
    "\n" +
    "                <div class=\"col-md-2 hidden-xs hidden-sm text-center\">\n" +
    "\n" +
    "                    <img ng-if=\"summary.logo\" ng-src=\"{{summary.logoUrl}}\"\n" +
    "                         class=\"img-responsive\"/>\n" +
    "\n" +
    "                    <h1 ng-if=\"!summary.logo\" src=\"\" alt=\"\"\n" +
    "                        class=\"big-character\">\n" +
    "                        <span class=\"t_badge color_light i-obiba-S\"></span>\n" +
    "                    </h1>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"col-md-10  col-sm-12 col-xs-12\">\n" +
    "                    <h4>\n" +
    "                        <a href=\"{{PageUrlService.studyPage( summary.id, studyPath)}}\">\n" +
    "                            <localized value=\"summary.name\"\n" +
    "                                       lang=\"lang\"></localized>\n" +
    "                        </a>\n" +
    "                    </h4>\n" +
    "                    <p ng-if=\"options.obibaListOptions.studiesTrimmedDescription\">\n" +
    "                        <localized value=\"summary.objectives\" lang=\"lang\"\n" +
    "                                   ellipsis-size=\"250\"\n" +
    "                                   markdown-it=\"true\"></localized>\n" +
    "                    </p>\n" +
    "                    <p ng-if=\"!options.obibaListOptions.studiesTrimmedDescription\">\n" +
    "                        <localized value=\"summary.objectives\" lang=\"lang\"\n" +
    "                                   markdown-it=\"true\"></localized>\n" +
    "                    </p>\n" +
    "                    <a ng-if=\"summary.objectives\" href=\"{{PageUrlService.studyPage( summary.id, studyPath)}}\" >{{\"global.read-more\" | translate}}</a>\n" +
    "                    <div class=\"clear-fix\"></div>\n" +
    "                    <div ng-if=\"options.obibaListOptions.studiesSupplInfoDetails\" class=\"voffset3\">\n" +
    "                        <blockquote-small\n" +
    "                                ng-if=\"summary.design || summary.targetNumber.noLimit\"\n" +
    "                                class=\"help-block\">\n" +
    "                                <span ng-if=\"summary.design\">\n" +
    "                                {{\"search.study.design\" | translate}} : {{ summary.design === undefined ? '-' : 'study_taxonomy.vocabulary.methods-design.term.' + summary.design + '.title' | translate}}\n" +
    "                                </span> -\n" +
    "                            <span ng-if=\"summary.targetNumber.number\">\n" +
    "                                 {{\"numberOfParticipants.participants\" | translate}} : <localized-number\n" +
    "                                    value=\"summary.targetNumber.number\"></localized-number>\n" +
    "                                </span>\n" +
    "                            <span ng-if=\"summary.targetNumber.noLimit\">\n" +
    "                                    <span ng-if=\"summary.design\">; </span>\n" +
    "                                    {{\"numberOfParticipants.no-limit\" | translate}}\n" +
    "                                </span>\n" +
    "                        </blockquote-small>\n" +
    "                        <div class=\"sm-top-margin\">\n" +
    "                            {{counts=summary['obiba.mica.CountStatsDto.studyCountStats'];\"\"}}\n" +
    "                            <a ng-if=\"counts.networks && options.obibaListOptions.showNetworkBadge!==false\"\n" +
    "                               href=\"{{'networks' | doSearchQuery:'network(in(Mica_network.studyIds,' + summary.id +  '))' }}\"\n" +
    "                               class=\"btn btn-default btn-xxs\"\n" +
    "                               test-ref=\"networkCount\">\n" +
    "                                <localized-number\n" +
    "                                        value=\"counts.networks\"></localized-number>\n" +
    "                                {{counts.networks>1?\"networks\":\"network.label\"\n" +
    "                                | translate}}\n" +
    "                            </a>\n" +
    "                            {{datasetsCount=counts.studyDatasets +\n" +
    "                            counts.harmonizationDatasets;\"\"}}\n" +
    "                            <a ng-if=\"datasetsCount && options.obibaListOptions.showDatasetBadge!==false\"\n" +
    "                               href=\"{{'datasets' | doSearchQuery:'study(in(Mica_study.id,' + summary.id + '))'}}\"\n" +
    "                               class=\"btn btn-default btn-xxs\"\n" +
    "                               test-ref=\"datasetCount\">\n" +
    "                                <localized-number\n" +
    "                                        value=\"datasetsCount\"></localized-number>\n" +
    "                                {{datasetsCount>1?\"datasets\":\"dataset.details\"\n" +
    "                                | translate}}\n" +
    "                            </a>\n" +
    "                            <a ng-if=\"counts.studyVariables && options.obibaListOptions.showVariableBadge!==false\"\n" +
    "                               href=\"{{'variables' | doSearchQuery:'study(in(Mica_study.id,' + summary.id + ')),variable(in(Mica_variable.variableType,Collected))'}}\"\n" +
    "                               class=\"btn btn-default btn-xxs\"\n" +
    "                               test-ref=\"studyVariableCount\">\n" +
    "                                <localized-number\n" +
    "                                        value=\"counts.studyVariables\"></localized-number>\n" +
    "                                {{counts.studyVariables>1?\"client.label.study-variables\":\"client.label.study-variable\"\n" +
    "                                | translate}}\n" +
    "                            </a>\n" +
    "                            <a ng-if=\"counts.dataschemaVariables && options.obibaListOptions.showVariableBadge!==false\"\n" +
    "                               href=\"{{'variables' | doSearchQuery:'study(in(Mica_study.id,' + summary.id + ')),variable(in(Mica_variable.variableType,Dataschema))'}}\"\n" +
    "                               class=\"btn btn-default btn-xxs\"\n" +
    "                               test-ref=\"dataSchemaVariableCount\">\n" +
    "                                <localized-number\n" +
    "                                        value=\"counts.dataschemaVariables\"></localized-number>\n" +
    "                                {{counts.dataschemaVariables>1?\"client.label.dataschema-variables\":\"client.label.dataschema-variable\"\n" +
    "                                | translate}}\n" +
    "                            </a>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("lists/views/region-criteria/criterion-dropdown-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("lists/views/region-criteria/criterion-dropdown-template.html",
    "<div id=\"{{criterion.id.replace('.','-')}}-dropdown-{{timestamp}}\" class=\"{{'btn-group voffset1 btn-' + criterion.target}}\" ng-class='{open: state.open}'\n" +
    "     ng-keyup=\"onKeyup($event)\">\n" +
    "\n" +
    "  <span ng-if=\"VocabularyService.isFacettedVocabulary(criterion.vocabulary)\" ng-class='{open: state.open}'>\n" +
    "  <button class=\"{{'btn btn-xs dropdown btn-' + criterion.target}}\"\n" +
    "          ng-click=\"openDropdown()\">\n" +
    "    <span uib-popover=\"{{localize(criterion.vocabulary.description ? criterion.vocabulary.description : criterion.vocabulary.title)}}\"\n" +
    "          popover-title=\"{{criterion.vocabulary.description ? localize(criterion.vocabulary.title) : null}}\"\n" +
    "          popover-placement=\"bottom\"\n" +
    "          popover-trigger=\"'mouseenter'\">\n" +
    "    <i class=\"fa fa-info-circle\"> </i>\n" +
    "  </span>\n" +
    "    <span title=\"{{localizeCriterion()}}\" test-ref=\"search-criterion\">\n" +
    "    {{truncate(localizeCriterion())}}\n" +
    "    </span>\n" +
    "    <span class='fa fa-caret-down'></span>\n" +
    "  </button>\n" +
    "  <button class='btn btn-xs btn-default' ng-click='remove(criterion.id)'>\n" +
    "    <span class='fa fa-times'></span>\n" +
    "  </button>\n" +
    "\n" +
    "  <match-criterion ng-if=\"VocabularyService.isMatchVocabulary(criterion.vocabulary)\" criterion=\"criterion\" query=\"query\"\n" +
    "                   state=\"state\"></match-criterion>\n" +
    "\n" +
    "  <string-criterion-terms\n" +
    "          ng-if=\"VocabularyService.isTermsVocabulary(criterion.vocabulary) || VocabularyService.isRangeVocabulary(criterion.vocabulary)\"\n" +
    "          criterion=\"criterion\" query=\"query\" state=\"state\"></string-criterion-terms>\n" +
    "\n" +
    "  <numeric-criterion ng-if=\"VocabularyService.isNumericVocabulary(criterion.vocabulary)\" criterion=\"criterion\" query=\"query\"\n" +
    "                     state=\"state\"></numeric-criterion>\n" +
    "</span>\n" +
    "</div>");
}]);

angular.module("lists/views/region-criteria/search-criteria-region-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("lists/views/region-criteria/search-criteria-region-template.html",
    "<div id=\"search-criteria-region\" ng-class=\"options.showSearchBox || options.showSearchBrowser ? 'voffset2' : ''\" class=\"panel panel-default\" ng-if=\"search.criteria.children && search.criteria.children.length>0 && canShowCriteriaRegion()\">\n" +
    "    <div class=\"panel-body\">\n" +
    "        <table style=\"border:none\">\n" +
    "            <tbody>\n" +
    "            <tr >\n" +
    "                <td style=\"padding-left: 10px\">\n" +
    "                    <div criteria-root item=\"search.criteria\"  on-remove=\"removeCriteriaItem\"\n" +
    "                         on-refresh=\"refreshQuery\" query=\"search.query\" class=\"inline\"></div>\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("lists/views/search-result-list-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("lists/views/search-result-list-template.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "\n" +
    "<div ng-show=\"display === 'list'\">\n" +
    "    <!--ToDo using the entity-counts component to diusplay some counts int lists page-->\n" +
    "    <!--<entity-counts taxonomy-type-map=\"targetTypeMap\" result-tabs-order=\"['study', 'variable', 'network']\" target=\"target\" result=\"result\"></entity-counts>-->\n" +
    "    <div class=\"row voffset3\">\n" +
    "        <div class=\"col-md-2\">\n" +
    "            <span ng-show=\"options.obibaListOptions.countCaption\" role=\"presentation\" ng-repeat=\"res in resultTabsOrder\"\n" +
    "                  ng-class=\"{active: activeTarget[targetTypeMap[res]].active && resultTabsOrder.length > 1, disabled: resultTabsOrder.length === 1}\"\n" +
    "                  ng-if=\"options[targetTypeMap[res]].showSearchTab\">\n" +
    "                <h4 ng-if=\"resultTabsOrder.length === 1\" class=\"pull-left\">\n" +
    "                    {{totalHits = getTotalHits(res);\"\"}}\n" +
    "                    {{singleLabel = \"search.\" + res + \".label\";\"\"}}\n" +
    "                    {{totalHits | localizedNumber }}  {{totalHits>1?targetTypeMap[res]:singleLabel | translate}}\n" +
    "                </h4>\n" +
    "            </span>\n" +
    "            </div>\n" +
    "        <div class=\"col-md-10\">\n" +
    "            <div ng-show=\"options.obibaListOptions.searchForm\">\n" +
    "                <list-search-widget type=\"type\"></list-search-widget>\n" +
    "            </div>\n" +
    "            <div class=\"pull-right hoffset1\">\n" +
    "                <div ng-repeat=\"res in resultTabsOrder\"\n" +
    "                     ng-show=\"activeTarget[targetTypeMap[res]].active\"\n" +
    "                     class=\"inline\" test-ref=\"pager\">\n" +
    "                  <span search-result-pagination\n" +
    "                        show-total=\"false\"\n" +
    "                        target=\"activeTarget[targetTypeMap[res]].name\"\n" +
    "                        total-hits=\"activeTarget[targetTypeMap[res]].totalHits\"\n" +
    "                        on-change=\"onPaginate\">\n" +
    "                  </span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <span ng-repeat=\"res in resultTabsOrder\"\n" +
    "                  ng-show=\"activeTarget[targetTypeMap[res]].active && activeTarget[targetTypeMap[res]].totalHits > 0 && options.obibaListOptions.searchForm\">\n" +
    "                                <list-sort-widget target=\"type\" class=\"pull-right\"></list-sort-widget>\n" +
    "            </span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "        <ng-include include-replace ng-repeat=\"res in resultTabsOrder\"\n" +
    "                    src=\"'search/views/search-result-list-' + res + '-template.html'\"></ng-include>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("lists/views/sort-widget/sort-widget-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("lists/views/sort-widget/sort-widget-template.html",
    "<div class=\"btn-group dropdown\">\n" +
    "    <button id=\"SortOrder\" type=\"button\" class=\"btn-sm btn btn-primary dropdown-toggle\"\n" +
    "            data-toggle=\"dropdown\">\n" +
    "           {{selected.label | translate}}\n" +
    "        <i ng-if=\"selected.value.startsWith('-') && selected.label !== 'relevance'\"\n" +
    "           class=\"fa fa-long-arrow-down\"></i>\n" +
    "        <i ng-if=\"!selected.value.startsWith('-') && selected.label !== 'relevance'\"\n" +
    "           class=\"fa fa-long-arrow-up\"></i>\n" +
    "    </button>\n" +
    "    <ul class=\"dropdown-menu\" role=\"menu\" uib-dropdown-menu aria-labelledby=\"SortOrder\">\n" +
    "        <li ng-repeat=\"option in selectSortOrder.options\" role=\"menuitem\">\n" +
    "            <a ng-click=\"selectSortOrderOption(option)\" href><span translate>{{option.label}}</span>\n" +
    "               <i ng-if=\"option.value.startsWith('-') && option.label !== 'relevance'\"\n" +
    "                  class=\"fa fa-long-arrow-down\"></i>\n" +
    "               <i ng-if=\"!option.value.startsWith('-') && option.label !== 'relevance'\"\n" +
    "                  class=\"fa fa-long-arrow-up\"></i>\n" +
    "            </a>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "</div>\n" +
    "");
}]);

angular.module("localized/localized-input-group-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("localized/localized-input-group-template.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div class=\"form-group\" ng-class=\"{'has-error': (form[fieldName].$dirty || form.saveAttempted) && form[fieldName].$invalid}\">\n" +
    "  <label for=\"{{fieldName}}\" class=\"control-label\">\n" +
    "    {{label | translate}}\n" +
    "    <span ng-show=\"required\">*</span>\n" +
    "  </label>\n" +
    "  <div class=\"input-group\">\n" +
    "    <input ng-repeat=\"localized in model | filter:{lang:lang}\" ng-model=\"localized.value\" ng-change=\"customValidator(form[fieldName])\" type=\"text\" class=\"form-control\" id=\"{{fieldName}}\" name=\"{{fieldName}}\" ng-disabled=\"disabled\" form-server-error ng-required=\"required\">\n" +
    "  <span class=\"input-group-btn\" ng-show=\"remove\">\n" +
    "    <button class=\"btn btn-default\" type=\"button\" ng-click=\"remove(model)\"><span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span></button>\n" +
    "  </span>\n" +
    "  </div>\n" +
    "  <ul class=\"input-error list-unstyled\" ng-show=\"form[fieldName].$dirty && form[fieldName].$invalid\">\n" +
    "    <li ng-show=\"form[fieldName].$error.required\" translate>required</li>\n" +
    "    <li ng-repeat=\"(error, errorValue) in form[fieldName].$error\" translate>{{error}}</li>\n" +
    "  </ul>\n" +
    "  <p ng-show=\"help\" class=\"help-block\">{{help | translate}}</p>\n" +
    "</div>");
}]);

angular.module("localized/localized-input-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("localized/localized-input-template.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div class=\"form-group\" ng-class=\"{'has-error': (form[fieldName].$dirty || form.saveAttempted) && form[fieldName].$invalid}\">\n" +
    "  <label for=\"{{fieldName}}\" class=\"control-label\">\n" +
    "    {{label | translate}}\n" +
    "    <span ng-show=\"required\">*</span>\n" +
    "  </label>\n" +
    "  <input ng-repeat=\"localized in model | filter:{lang:lang}\" ng-model=\"localized.value\" ng-change=\"customValidator(form[fieldName])\" type=\"text\" class=\"form-control\" id=\"{{fieldName}}\" name=\"{{fieldName}}\" ng-disabled=\"disabled\" form-server-error ng-required=\"required\">\n" +
    "  <ul class=\"input-error list-unstyled\" ng-show=\"form[fieldName].$dirty && form[fieldName].$invalid\">\n" +
    "    <li ng-show=\"form[fieldName].$error.required\" translate>required</li>\n" +
    "    <li ng-repeat=\"(error, errorValue) in form[fieldName].$error\" translate>{{error}}</li>\n" +
    "  </ul>\n" +
    "  <p ng-show=\"help\" class=\"help-block\">{{help | translate}}</p>\n" +
    "</div>");
}]);

angular.module("localized/localized-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("localized/localized-template.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "<span ng-bind-html=\"LocalizedValues.for(value,lang,keyLang,keyValue)  | markdown:markdownIt | ellipsis:ellipsisSize\"></span>");
}]);

angular.module("localized/localized-textarea-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("localized/localized-textarea-template.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div class=\"form-group\" ng-class=\"{'has-error': (form[fieldName].$dirty || form.saveAttempted) && form[fieldName].$invalid}\">\n" +
    "\n" +
    "  <label for=\"{{fieldName}}\" class=\"control-label\">\n" +
    "    {{label | translate}}\n" +
    "    <span ng-show=\"required\">*</span>\n" +
    "  </label>\n" +
    "\n" +
    "  <textarea ng-repeat=\"localized in model | filter:{lang:lang}\" ng-model=\"localized.value\" ng-change=\"customValidator(form[fieldName])\" rows=\"{{rows ? rows : 5}}\" class=\"form-control\" id=\"{{fieldName}}\" name=\"{{fieldName}}\" form-server-error ng-disabled=\"disabled\" ng-required=\"required\"></textarea>\n" +
    "\n" +
    "  <ul class=\"input-error list-unstyled\" ng-show=\"form[fieldName].$dirty && form[fieldName].$invalid\">\n" +
    "    <li ng-show=\"form[fieldName].$error.required\" translate>required</li>\n" +
    "    <li ng-repeat=\"(error, errorValue) in form[fieldName].$error\" translate>{{error}}</li>\n" +
    "  </ul>\n" +
    "\n" +
    "  <p ng-show=\"help\" class=\"help-block\">{{help | translate}}</p>\n" +
    "\n" +
    "</div>");
}]);

angular.module("search/components/criteria/match-vocabulary-filter-detail/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/criteria/match-vocabulary-filter-detail/component.html",
    "<input type=\"text\" class=\"form-control\"\n" +
    "       placeholder=\"{{'search.match.placeholder' | translate}}\"\n" +
    "       ng-model=\"$ctrl.vocabulary.matchString\"\n" +
    "       ng-keyup=\"$ctrl.enterText($event)\">");
}]);

angular.module("search/components/criteria/numeric-vocabulary-filter-detail/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/criteria/numeric-vocabulary-filter-detail/component.html",
    "<form ng-submit=\"$ctrl.setRangeValue($event)\">\n" +
    "  <label>{{'global.from' | translate}}\n" +
    "    <input type=\"number\"\n" +
    "           ng-model=\"$ctrl.vocabulary.rangeTerms.from\">\n" +
    "  </label>\n" +
    "\n" +
    "  <label> {{'global.to' | translate}}\n" +
    "    <input type=\"number\"\n" +
    "           ng-model=\"$ctrl.vocabulary.rangeTerms.to\">\n" +
    "  </label>\n" +
    "  <button type=\"submit\" class=\"btn btn-default btn-xs\"><i class=\"fa fa-chevron-right\"></i></button>\n" +
    "</form>\n" +
    "\n" +
    "");
}]);

angular.module("search/components/criteria/terms-vocabulary-filter-detail/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/criteria/terms-vocabulary-filter-detail/component.html",
    "<div ng-class=\"{'row': ($index + 1) % 4 === 0}\"\n" +
    "     ng-repeat=\"term in $ctrl.vocabulary.filteredTerms | sortTerms:$ctrl.vocabulary | limitTo:$ctrl.limitNumber\">\n" +
    "  <div class=\"col-xs-3 col-md-3\">\n" +
    "    <div class=\"checkbox\">\n" +
    "      <label uib-popover=\"{{term.description ? term.description : term.title | localizedString}}\"\n" +
    "             popover-title=\"{{term.description ? term.title : null | localizedString}}\"\n" +
    "             popover-placement=\"bottom\"\n" +
    "             popover-trigger=\"'mouseenter'\"\n" +
    "             popover-popup-delay=\"250\"\n" +
    "             popover-class=\"right-panel-popover\"\n" +
    "             for=\"term-{{$ctrl.vocabulary.name + '-' + $index}}\"\n" +
    "             class=\"word-break\">\n" +
    "        <input id=\"term-{{$ctrl.vocabulary.name + '-' + $index}}\"\n" +
    "               type=\"checkbox\"\n" +
    "               ng-model=\"term.selected\"\n" +
    "               ng-click=\"$ctrl.clickCheckbox(term)\"> {{term.title | localizedString}}\n" +
    "      </label>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<span class=\"clearfix\"></span>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-md-12\">\n" +
    "    <div class=\"btn-group pull-right\">\n" +
    "      <button type=\"button\" ng-if=\"$ctrl.limitNumber > $ctrl.constantLimitNumber\"\n" +
    "              class=\"btn btn-xs btn-primary\"\n" +
    "              ng-click=\"$ctrl.limitNumber = $ctrl.constantLimitNumber\">\n" +
    "        Less\n" +
    "      </button>\n" +
    "      <button type=\"button\" ng-if=\"$ctrl.vocabulary.filteredTerms.length > $ctrl.limitNumber\"\n" +
    "              class=\"btn btn-xs btn-primary\"\n" +
    "              ng-click=\"$ctrl.limitNumber = $ctrl.vocabulary.filteredTerms.length\">\n" +
    "        More\n" +
    "      </button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("search/components/entity-counts/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/entity-counts/component.html",
    "<ul class=\"list-no-style list-inline\">\n" +
    "  <li ng-repeat=\"entity in $ctrl.resultTabsOrder\">\n" +
    "    <a href ng-click=\"$ctrl.selectType(entity)\"\n" +
    "        class=\"btn btn-xs\"\n" +
    "        ng-class=\"{'btn-default': (entity !== $ctrl.target), 'btn-primary': (entity === $ctrl.target)}\">\n" +
    "        {{$ctrl.taxonomyTypeMap[entity] | translate}} <span>{{$ctrl.getTotalHits(entity) | localizedNumber}}</span>\n" +
    "    </a>\n" +
    "  </li>\n" +
    "</ul>");
}]);

angular.module("search/components/entity-search-typeahead/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/entity-search-typeahead/component.html",
    "<div class=\"input-group\">\n" +
    "  <div class=\"form-group has-feedback \">\n" +
    "    <input type=\"search\"\n" +
    "           ng-model=\"$ctrl.model\"\n" +
    "           ng-attr-placeholder=\"{{$ctrl.placeholderText | translate}}\"\n" +
    "           uib-typeahead=\"suggestion for suggestion in $ctrl.suggest($viewValue)\"\n" +
    "           typeahead-focus-first=\"false\"\n" +
    "           typeahead-on-select=\"$ctrl.select($item)\"\n" +
    "           ng-keyup=\"$ctrl.onKeyUp($event)\"\n" +
    "           class=\"form-control\">\n" +
    "    <span ng-if=\"$ctrl.model\"\n" +
    "          ng-click=\"$ctrl.clear()\"\n" +
    "          class=\"form-control-feedback form-control-clear width-initial height-initial padding-right-10\">\n" +
    "        <i class=\"fa fa-times\"></i>\n" +
    "    </span>\n" +
    "  </div>\n" +
    "  <span ng-show=\"$ctrl.showButton\" class=\"input-group-btn\">\n" +
    "    <button type=\"submit\" class=\"btn btn-default\" ng-click=\"$ctrl.select($ctrl.model)\">\n" +
    "      <i class=\"fa fa-search\"></i>\n" +
    "    </button>\n" +
    "  </span>\n" +
    "</div>");
}]);

angular.module("search/components/input-search-filter/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/input-search-filter/component.html",
    "<div class=\" pull-right\">\n" +
    "    <div class=\"input-group has-feedback\">\n" +
    "       <span class=\"input-group-addon\">\n" +
    "           <i class=\"fa fa-filter\"></i>\n" +
    "       </span>\n" +
    "        <input type=\"text\" ng-model=\"$ctrl.queryString\"  ng-attr-placeholder=\"{{'search.placeholder.vocabulary-filter'  | translate}}\"\n" +
    "               class=\"input-search-filter form-control\" ng-change=\"$ctrl.change()\">\n" +
    "        <span ng-if=\"$ctrl.queryString\"\n" +
    "              ng-click=\"$ctrl.clear()\"\n" +
    "              class=\"form-control-feedback form-control-clear width-initial height-initial padding-right-5 \">\n" +
    "          <i class=\"fa fa-times\"></i>\n" +
    "        </span>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("search/components/meta-taxonomy/meta-taxonomy-filter-list/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/meta-taxonomy/meta-taxonomy-filter-list/component.html",
    "<div uib-accordion-group class=\"panel-default\" is-open=\"$ctrl.status.isFirstOpen\">\n" +
    "  <div uib-accordion-heading >\n" +
    "    <span>\n" +
    "      <i class=\"fa\" ng-class=\"{'fa-caret-down': $ctrl.status.isFirstOpen, 'fa-caret-right':!$ctrl.status.isFirstOpen}\"></i>\n" +
    "    </span>\n" +
    "    {{$ctrl.metaTaxonomy.title | localizedString}}\n" +
    "  </div>\n" +
    "\n" +
    "  <ul class=\"nav nav-pills nav-stacked\">\n" +
    "    <li role=\"presentation\" ng-repeat=\"taxonomy in $ctrl.metaTaxonomy.taxonomies\" ng-class=\"{'active': taxonomy.state.isActive() && $ctrl.showTaxonomyPanel}\">\n" +
    "      <a href ng-click=\"$ctrl.selectTaxonomy(taxonomy)\">\n" +
    "        <span\n" +
    "          uib-popover=\"{{taxonomy.info.description | localizedString}}\"\n" +
    "          popover-title=\"{{taxonomy.info.trKey ? (taxonomy.info.trKey | translate) : (taxonomy.info.title | localizedString)}}\"\n" +
    "          popover-placement=\"bottom\"\n" +
    "          popover-trigger=\"'mouseenter'\"\n" +
    "          popover-popup-delay=\"250\">\n" +
    "          {{taxonomy.info.trKey ? (taxonomy.info.trKey | translate) : (taxonomy.info.title | localizedString)}}\n" +
    "        </span>\n" +
    "        <span ng-if=\"taxonomy.state.isLoading()\" class=\"loading\"></span>\n" +
    "        <span class=\"pull-right\"><i class=\"fa fa-chevron-right\"></i></span>\n" +
    "      </a>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("search/components/meta-taxonomy/meta-taxonomy-filter-panel/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/meta-taxonomy/meta-taxonomy-filter-panel/component.html",
    "<div ng-class=\"{'overlay-front-on-box-shodow' : $ctrl.showTaxonomyPanel}\">\n" +
    "  <uib-accordion close-others=\"false\" is-disabled=\"false\">\n" +
    "    <meta-taxonomy-filter-list ng-repeat=\"metaTaxonomy in $ctrl.metaTaxonomies\"\n" +
    "                               meta-taxonomy=\"metaTaxonomy\"\n" +
    "                               show-taxonomy-panel=\"$ctrl.showTaxonomyPanel\"\n" +
    "                               rql-query=\"$ctrl.rqlQuery\"\n" +
    "                               on-select-taxonomy=\"$ctrl.onSelectTaxonomy(target, taxonomy)\">\n" +
    "    </meta-taxonomy-filter-list>\n" +
    "  </uib-accordion>\n" +
    "</div>\n" +
    "");
}]);

angular.module("search/components/taxonomy/taxonomy-filter-detail/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/taxonomy/taxonomy-filter-detail/component.html",
    "<div class=\"panel-primary\">\n" +
    "  <div class=\"panel-heading\">\n" +
    "    <div><strong>{{$ctrl.taxonomy.title | localizedString}}</strong></div>\n" +
    "  </div>\n" +
    "\n" +
    "  <vocabulary-filter-detail\n" +
    "      ng-repeat=\"vocabulary in $ctrl.vocabularies\"\n" +
    "      vocabulary=\"vocabulary\"\n" +
    "      on-select-vocabulary-args=\"$ctrl.selectVocabularyArgs(vocabulary, args)\"\n" +
    "      on-remove-criterion=\"$ctrl.removeCriterion(item)\">\n" +
    "  </vocabulary-filter-detail>\n" +
    "</div>");
}]);

angular.module("search/components/taxonomy/taxonomy-filter-panel/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/taxonomy/taxonomy-filter-panel/component.html",
    "<div class=\"vocabulary-filter-detail\" ng-class=\"{'close_right':$ctrl.classClose, 'overlay-front-on-box-shodow' : $ctrl.showTaxonomyPanel}\">\n" +
    "\n" +
    "\n" +
    "  <div class=\"ng-clearfix\"></div>\n" +
    "\n" +
    "  <vocabulary-filter-detail-heading\n" +
    "          show-taxonomy-panel=\"$ctrl.showTaxonomyPanel\"\n" +
    "          taxonomy-name=\"$ctrl.taxonomyName\"\n" +
    "          taxonomies-query=\"$ctrl.taxonomiesQuery\"\n" +
    "          clear-query=\"$ctrl.clearQuery\"\n" +
    "          on-filter-change=\"$ctrl.onFilterChange(queryString)\"\n" +
    "          taxonomy-type-map=\"$ctrl.taxonomyTypeMap\"\n" +
    "          result-tabs-order=\"$ctrl.resultTabsOrder\"\n" +
    "          target=\"$ctrl.target\"\n" +
    "          on-select-type=\"$ctrl.selectType(type)\"\n" +
    "          result=\"$ctrl.result\"\n" +
    "          toggle-pannel=\"$ctrl.togglePannel()\">\n" +
    "  </vocabulary-filter-detail-heading>\n" +
    "\n" +
    "  <div class=\"vocabulary-filter-detail-container\">\n" +
    "    <vocabulary-filter-detail\n" +
    "            ng-if=\"!$ctrl.taxonomyIsArray\"\n" +
    "            on-select-vocabulary-args=\"$ctrl.selectTaxonomyVocabularyArgs($ctrl.taxonomy, vocabulary, args)\"\n" +
    "            ng-repeat=\"vocabulary in $ctrl.filteredVocabularies track by $index\"\n" +
    "            on-remove-criterion=\"$ctrl.removeCriterion(item)\"\n" +
    "            vocabulary=\"vocabulary\">\n" +
    "    </vocabulary-filter-detail>\n" +
    "\n" +
    "    <div ng-if=\"$ctrl.taxonomyIsArray\" ng-repeat=\"subTaxonomy in $ctrl.taxonomy\">\n" +
    "      <taxonomy-filter-detail taxonomy=\"subTaxonomy\"\n" +
    "                              ng-if=\"$ctrl.filteredVocabularies[subTaxonomy.name]\"\n" +
    "                              vocabularies=\"$ctrl.filteredVocabularies[subTaxonomy.name]\"\n" +
    "                              on-select-taxonomy-term=\"$ctrl.selectTaxonomyVocabularyArgs(taxonomy, vocabulary, args)\"\n" +
    "                              on-remove-criterion=\"$ctrl.removeCriterion(item)\">\n" +
    "      </taxonomy-filter-detail>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("search/components/vocabulary-filter-detail-heading/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/vocabulary-filter-detail-heading/component.html",
    "<div class=\"panel-body vocabulary-filter-detail-heading\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-xs-12 col-sm-12 col-lg-4\">\n" +
    "            <input-search-filter\n" +
    "                    taxonomy-name=\"$ctrl.taxonomyName\"\n" +
    "                    taxonomies-query=\"$ctrl.taxonomiesQuery\"\n" +
    "                    class=\"input-search-filter\"\n" +
    "                    clear-query=\"$ctrl.clearQuery\"\n" +
    "                    on-filter-change=\"$ctrl.filterChange(queryString)\">\n" +
    "            </input-search-filter>\n" +
    "        </div>\n" +
    "        <div class=\"col-xs-12 col-sm-11 col-lg-7 voffset1\">\n" +
    "            <entity-counts\n" +
    "                    taxonomy-type-map=\"$ctrl.taxonomyTypeMap\"\n" +
    "                    result-tabs-order=\"$ctrl.resultTabsOrder\"\n" +
    "                    target=\"$ctrl.target\"\n" +
    "                    on-select-type=\"$ctrl.selectType(type)\"\n" +
    "                    result=\"$ctrl.result\">\n" +
    "            </entity-counts>\n" +
    "        </div>\n" +
    "        <div class=\"col-xs-12 col-sm-1 col-lg-1\">\n" +
    "            <button type=\"button\"\n" +
    "                    class=\"voffset1 pull-right close\"\n" +
    "                    data-dismiss=\"alert\"\n" +
    "                    aria-label=\"Close\"\n" +
    "                    ng-click=\"$ctrl.togglePannel()\"\n" +
    "                    title=\"{{'global.close-panel'|translate}}\"><span aria-hidden=\"true\">×</span>\n" +
    "            </button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("search/components/vocabulary/vocabulary-filter-detail/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/vocabulary/vocabulary-filter-detail/component.html",
    "<div class=\"panel-heading\">\n" +
    "  <label\n" +
    "      uib-popover=\"{{$ctrl.vocabulary.description ? $ctrl.vocabulary.description : $ctrl.vocabulary.title | localizedString}}\"\n" +
    "      popover-title=\"{{$ctrl.vocabulary.description ? $ctrl.vocabulary.title : null | localizedString}}\"\n" +
    "      popover-placement=\"bottom\"\n" +
    "      popover-trigger=\"'mouseenter'\"\n" +
    "      popover-popup-delay=\"250\"\n" +
    "      popover-class=\"right-panel-popover\">\n" +
    "    {{$ctrl.vocabulary.title | localizedString}}\n" +
    "  </label>\n" +
    "\n" +
    "  <div class=\"pull-right\">\n" +
    "    <a href=\"\" ng-click=\"$ctrl.removeCriterion()\" ng-if=\"$ctrl.vocabulary.existingItem\">{{'clear' | translate}}</a>\n" +
    "    <a href=\"\"\n" +
    "       class=\"hoffset2\"\n" +
    "       ng-click=\"$ctrl.selectAllFilteredVocabularyTerms($ctrl.vocabulary.filteredTerms)\"\n" +
    "       ng-if=\"$ctrl.criterionType === 'string-terms' && $ctrl.canStillSelectMore($ctrl.vocabulary.filteredTerms)\">\n" +
    "      {{'select-items' | translate}}\n" +
    "    </a>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "<div class=\"panel-body\">\n" +
    "  <div ng-switch on=\"$ctrl.criterionType\">\n" +
    "    <div ng-switch-when=\"string-terms\">\n" +
    "      <terms-vocabulary-filter-detail vocabulary=\"$ctrl.vocabulary\"\n" +
    "                                      on-select-args=\"$ctrl.selectVocabularyArgs(args)\"></terms-vocabulary-filter-detail>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-switch-when=\"numeric\">\n" +
    "      <numeric-vocabulary-filter-detail vocabulary=\"$ctrl.vocabulary\"\n" +
    "                                        on-select-args=\"$ctrl.selectVocabularyArgs(args)\"></numeric-vocabulary-filter-detail>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-switch-default>\n" +
    "      <match-vocabulary-filter-detail vocabulary=\"$ctrl.vocabulary\"\n" +
    "                                      on-select-args=\"$ctrl.selectVocabularyArgs(args)\"></match-vocabulary-filter-detail>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("search/views/classifications.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/classifications.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div id=\"classification-browser-region\">\n" +
    "  <div ng-if=\"classificationsHeaderTemplateUrl\" ng-include=\"classificationsHeaderTemplateUrl\"></div>\n" +
    "\n" +
    "  <div class=\"container alert-fixed-position\">\n" +
    "    <obiba-alert id=\"SearchController\"></obiba-alert>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"alert-growl-container\">\n" +
    "    <obiba-alert id=\"SearchControllerGrowl\"></obiba-alert>\n" +
    "  </div>\n" +
    "\n" +
    "  <a href class=\"btn btn-sm btn-success\" ng-click=\"goToSearch()\">\n" +
    "    <i class=\"fa fa-chevron-left\"></i>\n" +
    "    <span translate>search.back</span>\n" +
    "  </a>\n" +
    "\n" +
    "  <!-- Lang tabs -->\n" +
    "  <ul class=\"nav nav-tabs voffset2\" role=\"tablist\" ng-if=\"tabs && tabs.length>1\">\n" +
    "    <li ng-repeat=\"tab in tabs\" role=\"presentation\" ng-class=\"{ active: tab === lang }\"><a href role=\"tab\"\n" +
    "      ng-click=\"setLocale(tab)\">{{'language.' + tab | translate}}</a></li>\n" +
    "  </ul>\n" +
    "\n" +
    "  <!-- Search criteria region -->\n" +
    "  <search-criteria-region class=\"voffset2\" options=\"options\" search=\"search\"> </search-criteria-region>\n" +
    "\n" +
    "  <!-- Classifications region -->\n" +
    "  <div class=\"{{tabs && tabs.length>1 ? 'tab-content voffset4' : ''}}\">\n" +
    "    <ul class=\"nav nav-pills voffset2\" role=\"tablist\" ng-if=\"targetTabsOrder.length > 1\">\n" +
    "      <li ng-repeat=\"target in targetTabsOrder\" role=\"presentation\" ng-class=\"{ active: target === $parent.target }\" class=\"{{target}}\"><a href role=\"tab\"\n" +
    "          ng-click=\"navigateToTarget(target)\">{{'taxonomy.target.' + target | translate}}</a></li>\n" +
    "    </ul>\n" +
    "\n" +
    "    <classifications-panel target=\"target\" is-history-enabled=\"true\" on-select-term=\"onSelectTerm\" lang=\"lang\"></classifications-panel>\n" +
    "  </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("search/views/classifications/classifications-view.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/classifications/classifications-view.html",
    "<div ng-show=\"!inSearchMode()\" class=\"voffset2\">\n" +
    "  <div>\n" +
    "    <ol class=\"breadcrumb\">\n" +
    "      <li ng-if=\"!taxonomies.taxonomy\">\n" +
    "        {{'all-' + taxonomies.target + '-classifications' | translate}}\n" +
    "      </li>\n" +
    "      <li ng-if=\"taxonomies.taxonomy\">\n" +
    "        <a href ng-click=\"navigateTaxonomy()\">{{'all-' + taxonomies.target + '-classifications' |\n" +
    "          translate}}</a>\n" +
    "      </li>\n" +
    "      <li ng-if=\"taxonomies.taxonomy\">\n" +
    "        <span ng-repeat=\"label in taxonomies.taxonomy.title\" ng-if=\"!taxonomies.vocabulary && label.locale === lang\">\n" +
    "          {{label.text}}\n" +
    "        </span>\n" +
    "        <a href ng-click=\"navigateTaxonomy(taxonomies.taxonomy)\" ng-if=\"taxonomies.vocabulary\">\n" +
    "          <span ng-repeat=\"label in taxonomies.taxonomy.title\" ng-if=\"label.locale === lang\">\n" +
    "            {{label.text}}\n" +
    "          </span>\n" +
    "        </a>\n" +
    "      </li>\n" +
    "      <li ng-if=\"taxonomies.vocabulary\">\n" +
    "        <span ng-repeat=\"label in taxonomies.vocabulary.title\" ng-if=\"label.locale === lang\">\n" +
    "          {{label.text}}\n" +
    "        </span>\n" +
    "      </li>\n" +
    "      <a ng-if=\"options.showSearchRefreshButton\" title=\"{{'search.refresh-taxonomies' | translate}}\"\n" +
    "         href class=\"hoffset1\" ng-click=\"refreshTaxonomyCache()\">\n" +
    "        <span class=\"fa fa-refresh\"></span>\n" +
    "      </a>\n" +
    "    </ol>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "  <div ng-if=\"taxonomies.search.active\" class=\"loading\"></div>\n" +
    "\n" +
    "  <div ng-if=\"!taxonomies.search.active\">\n" +
    "    <div ng-if=\"!taxonomies.taxonomy\">\n" +
    "      <div ng-repeat=\"group in taxonomyGroups\">\n" +
    "        <h3 ng-if=\"group.title\">{{group.title}}</h3>\n" +
    "        <p class=\"help-block\" ng-if=\"group.description\">{{group.description}}</p>\n" +
    "        <div ng-if=\"!taxonomies.taxonomy\">\n" +
    "          <div ng-repeat=\"taxonomy in group.taxonomies\" ng-if=\"$index % 3 == 0\" class=\"row\">\n" +
    "            <div class=\"col-md-4\">\n" +
    "              <div taxonomy-panel taxonomy=\"group.taxonomies[$index]\" lang=\"lang\"\n" +
    "                   on-navigate=\"navigateTaxonomy\"></div>\n" +
    "            </div>\n" +
    "            <div class=\"col-md-4\">\n" +
    "              <div taxonomy-panel taxonomy=\"group.taxonomies[$index + 1]\" lang=\"lang\"\n" +
    "                   on-navigate=\"navigateTaxonomy\"></div>\n" +
    "            </div>\n" +
    "            <div class=\"col-md-4\">\n" +
    "              <div taxonomy-panel taxonomy=\"group.taxonomies[$index + 2]\" lang=\"lang\"\n" +
    "                   on-navigate=\"navigateTaxonomy\"></div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"taxonomies.taxonomy && !taxonomies.vocabulary\">\n" +
    "      <h3 ng-repeat=\"label in taxonomies.taxonomy.title\"\n" +
    "          ng-if=\"label.locale === lang\">\n" +
    "        {{label.text}}\n" +
    "      </h3>\n" +
    "\n" +
    "      <p class=\"help-block\" ng-repeat=\"label in taxonomies.taxonomy.description\" ng-if=\"label.locale === lang\">\n" +
    "        {{label.text}}\n" +
    "      </p>\n" +
    "\n" +
    "      <div ng-repeat=\"vocabulary in taxonomies.taxonomy.vocabularies\" ng-if=\"$index % 3 == 0\" class=\"row\">\n" +
    "        <div class=\"col-md-4\">\n" +
    "          <div vocabulary-panel target=\"taxonomies.target\" taxonomy=\"taxonomies.taxonomy\" vocabulary=\"taxonomies.taxonomy.vocabularies[$index]\"\n" +
    "               lang=\"lang\" on-navigate=\"navigateTaxonomy\" on-select=\"selectTerm\"></div>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-4\">\n" +
    "          <div vocabulary-panel target=\"taxonomies.target\" taxonomy=\"taxonomies.taxonomy\" vocabulary=\"taxonomies.taxonomy.vocabularies[$index + 1]\"\n" +
    "               lang=\"lang\" on-navigate=\"navigateTaxonomy\" on-select=\"selectTerm\"></div>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-4\">\n" +
    "          <div vocabulary-panel target=\"taxonomies.target\" taxonomy=\"taxonomies.taxonomy\" vocabulary=\"taxonomies.taxonomy.vocabularies[$index + 2]\"\n" +
    "               lang=\"lang\" on-navigate=\"navigateTaxonomy\" on-select=\"selectTerm\"></div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"taxonomies.taxonomy && taxonomies.vocabulary && !taxonomies.term\">\n" +
    "      <h3 ng-repeat=\"label in taxonomies.vocabulary.title\"\n" +
    "          ng-if=\"label.locale === lang\">\n" +
    "        {{label.text}}\n" +
    "      </h3>\n" +
    "\n" +
    "      <p class=\"help-block\" ng-repeat=\"label in taxonomies.vocabulary.description\"\n" +
    "         ng-if=\"label.locale === lang\">\n" +
    "        {{label.text}}\n" +
    "      </p>\n" +
    "\n" +
    "      <div ng-repeat=\"term in taxonomies.vocabulary.terms\" ng-if=\"$index % 3 == 0\" class=\"row\">\n" +
    "        <div class=\"col-md-4\">\n" +
    "          <div term-panel target=\"taxonomies.target\" taxonomy=\"taxonomies.taxonomy\" vocabulary=\"taxonomies.vocabulary\" term=\"taxonomies.vocabulary.terms[$index]\"\n" +
    "               lang=\"lang\" on-navigate=\"navigateTaxonomy\" on-select=\"selectTerm\"></div>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-4\">\n" +
    "          <div term-panel target=\"taxonomies.target\" taxonomy=\"taxonomies.taxonomy\" vocabulary=\"taxonomies.vocabulary\" term=\"taxonomies.vocabulary.terms[$index + 1]\"\n" +
    "               lang=\"lang\" on-navigate=\"navigateTaxonomy\" on-select=\"selectTerm\"></div>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-4\">\n" +
    "          <div term-panel target=\"taxonomies.target\" taxonomy=\"taxonomies.taxonomy\" vocabulary=\"taxonomies.vocabulary\" term=\"taxonomies.vocabulary.terms[$index + 2]\"\n" +
    "               lang=\"lang\" on-navigate=\"navigateTaxonomy\" on-select=\"selectTerm\"></div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"taxonomies.taxonomy && taxonomies.vocabulary && taxonomies.term\">\n" +
    "      <h5 ng-repeat=\"label in taxonomies.term.title\" ng-if=\"label.locale === lang\">\n" +
    "        {{label.text}}\n" +
    "      </h5>\n" +
    "      <p ng-repeat=\"label in taxonomies.term.description\" ng-if=\"label.locale === lang\">\n" +
    "        <span class=\"help-block\" ng-bind-html=\"label.text | dceDescription\" ng-if=\"taxonomies.vocabulary.name === 'dceId'\"></span>\n" +
    "        <span class=\"help-block\" ng-bind-html=\"label.text\" ng-if=\"taxonomies.vocabulary.name !== 'dceId'\"></span>\n" +
    "      </p>\n" +
    "      <div>\n" +
    "        <a href class=\"btn btn-default btn-xs\"\n" +
    "           ng-click=\"selectTerm(taxonomies.target, taxonomies.taxonomy, taxonomies.vocabulary, {term: taxonomies.term})\">\n" +
    "          <i class=\"fa fa-plus-circle\"></i>\n" +
    "          <span translate>add-query</span>\n" +
    "        </a>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("search/views/classifications/taxonomies-facets-view.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/classifications/taxonomies-facets-view.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<ul class=\"nav nav-tabs\" role=\"tablist\" ng-if=\"targets.length > 1\">\n" +
    "  <li ng-repeat=\"tab in targets\" role=\"presentation\" ng-class=\"{ active: tab === target }\">\n" +
    "    <a href role=\"tab\" ng-click=\"setTarget(tab)\">{{'search.' + tab + '.facet-label' | translate}}</a></li>\n" +
    "</ul>\n" +
    "\n" +
    "<uib-accordion close-others=\"false\">\n" +
    "    <div uib-accordion-group ng-repeat=\"taxonomy in taxonomies[target]\" is-open=\"taxonomy.isOpen\" is-disabled=\"false\" template-url=\"search/views/classifications/taxonomy-accordion-group.html\">\n" +
    "      <uib-accordion-heading>\n" +
    "          <i class=\"fa\" ng-class=\"{'fa-chevron-down': taxonomy.isOpen, 'fa-chevron-right': !taxonomy.isOpen}\"></i>\n" +
    "          <span uib-popover=\"{{localize(taxonomy.description ? taxonomy.description : taxonomy.title)}}\"\n" +
    "                popover-title=\"{{taxonomy.description ? localize(taxonomy.title) : null}}\"\n" +
    "                popover-placement=\"bottom\"\n" +
    "                popover-trigger=\"'mouseenter'\"\n" +
    "                popover-popup-delay=\"1000\">\n" +
    "            {{localize(taxonomy.title)}}\n" +
    "          </span>\n" +
    "      </uib-accordion-heading>\n" +
    "      <uib-accordion close-others=\"false\">\n" +
    "        <div uib-accordion-group ng-repeat=\"vocabulary in taxonomy.vocabularies\" is-open=\"vocabulary.isOpen\" is-disabled=\"false\" template-url=\"search/views/classifications/vocabulary-accordion-group.html\">\n" +
    "          <uib-accordion-heading>\n" +
    "            <span uib-popover=\"{{localize(vocabulary.description ? vocabulary.description : vocabulary.title)}}\"\n" +
    "                  popover-title=\"{{vocabulary.description ? localize(vocabulary.title) : null}}\"\n" +
    "                  popover-placement=\"bottom\"\n" +
    "                  popover-trigger=\"'mouseenter'\"\n" +
    "                  popover-popup-delay=\"1000\"\n" +
    "                  ng-click=\"loadVocabulary(taxonomy, vocabulary)\">\n" +
    "              <i class=\"fa\" ng-class=\"{'fa-caret-down': vocabulary.isOpen, 'fa-caret-right': !vocabulary.isOpen}\"></i>\n" +
    "              <span>\n" +
    "                {{localize(vocabulary.title)}}\n" +
    "              </span>\n" +
    "              <span ng-if=\"!vocabulary.title\">\n" +
    "                {{vocabulary.name}}\n" +
    "              </span>\n" +
    "            </span>\n" +
    "          </uib-accordion-heading>\n" +
    "          <div>\n" +
    "            <div ng-if=\"vocabulary.isMatch\" ng-controller=\"MatchVocabularyFacetController\" class=\"form-group\">\n" +
    "              <form novalidate class=\"form-inline\" ng-keypress=\"onKeypress($event)\">\n" +
    "                <div class=\"form-group form-group-sm\">\n" +
    "                  <input type=\"text\" class=\"form-control\" ng-model=\"text\" placeholder=\"{{'search.match.placeholder' | translate}}\">\n" +
    "                  <button class=\"btn btn-sm btn-default\" ng-click=\"onKeypress($event)\" ><i class=\"fa fa-chevron-right\"></i></button>\n" +
    "                </div>\n" +
    "              </form>\n" +
    "            </div>\n" +
    "            <div ng-if=\"vocabulary.isNumeric\" ng-controller=\"NumericVocabularyFacetController\" class=\"form-group\">\n" +
    "              <form novalidate class=\"form-inline\"  ng-keypress=\"onKeypress($event)\">\n" +
    "                <div class=\"form-group form-group-sm\">\n" +
    "                  <label for=\"nav-{{vocabulary.name}}-from\" translate>global.from</label>\n" +
    "                  <input type=\"number\" class=\"form-control\" id=\"nav-{{vocabulary.name}}-from\" ng-model=\"from\" placeholder=\"{{min}}\" style=\"width:75px;\">\n" +
    "                  <label for=\"nav-{{vocabulary.name}}-to\" translate>global.to</label>\n" +
    "                  <input type=\"number\" class=\"form-control\" id=\"nav-{{vocabulary.name}}-to\" ng-model=\"to\" placeholder=\"{{max}}\" style=\"width:75px;\">\n" +
    "                  <button class=\"btn btn-sm btn-default\" ng-click=\"onKeypress($event)\" ><i class=\"fa fa-chevron-right\"></i></button>\n" +
    "                </div>\n" +
    "              </form>\n" +
    "            </div>\n" +
    "            <div ng-if=\"!vocabulary.isNumeric && !vocabulary.isMatch\" ng-controller=\"TermsVocabularyFacetController\">\n" +
    "              <div ng-if=\"loading\" class=\"loading\"></div>\n" +
    "              <ul class=\"nav nav-pills nav-stacked\" ng-if=\"vocabulary.visibleTerms > 0\">\n" +
    "                <li ng-repeat=\"term in vocabulary.terms | orderBy:['-selected', '-count', '+name']  | limitTo:vocabulary.limit:begin\"\n" +
    "                    class=\"checkbox\" ng-class=\"{active: term.name === term.name}\" ng-if=\"term.isVisible\">\n" +
    "                  <label style=\"max-width: 80%;\">\n" +
    "                    <input type=\"checkbox\" ng-model=\"term.selected\" ng-change=\"selectTerm(target, taxonomy, vocabulary, {term: term})\">\n" +
    "                    <span uib-popover=\"{{localize(term.description ? term.description : term.title)}}\"\n" +
    "                          popover-title=\"{{term.description ? localize(term.title) : null}}\"\n" +
    "                          popover-placement=\"bottom\"\n" +
    "                          popover-trigger=\"'mouseenter'\"\n" +
    "                          popover-popup-delay=\"1000\">\n" +
    "                      <span>\n" +
    "                        {{localize(term.title)}}\n" +
    "                      </span>\n" +
    "                      <span ng-if=\"!term.title\">\n" +
    "                        {{term.name}}\n" +
    "                      </span>\n" +
    "                    </span>\n" +
    "                  </label>\n" +
    "                    <span class=\"pull-right\" ng-class=\"{'text-muted': !term.selected}\">\n" +
    "                      {{term.count}}\n" +
    "                    </span>\n" +
    "                </li>\n" +
    "              </ul>\n" +
    "              <span ng-if=\"vocabulary.visibleTerms === 0\">\n" +
    "                <em translate>search.facet.no-data</em>\n" +
    "              </span>\n" +
    "              <div ng-if=\"!vocabulary.isNumeric && !vocabulary.isMatch && vocabulary.visibleTerms > 10\" class=\"voffset1 pull-right form-group\">\n" +
    "                <button class=\"btn btn-xs btn-primary\" ng-if=\"vocabulary.limit\" ng-click=\"vocabulary.limit = undefined\" translate>search.facet.more</button>\n" +
    "                <button class=\"btn btn-xs btn-default\" ng-if=\"!vocabulary.limit\" ng-click=\"vocabulary.limit = 10\" translate>search.facet.less</button>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div >\n" +
    "      </uib-accordion>\n" +
    "    </div>\n" +
    "</uib-accordion>\n" +
    "");
}]);

angular.module("search/views/classifications/taxonomies-view.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/classifications/taxonomies-view.html",
    "<div class=\"collapse\">\n" +
    "  <div class=\"voffset2\">\n" +
    "    <div class=\"search-browser panel panel-default\">\n" +
    "      <div class=\"panel-heading no-padding-top no-padding-bottom\">\n" +
    "        <div class=\"row no-padding\">\n" +
    "          <div class=\"col-md-8\">\n" +
    "            <ol class=\"breadcrumb no-margin no-padding pull-left\">\n" +
    "              <li ng-if=\"taxonomies.taxonomy\">\n" +
    "                <h4 ng-repeat=\"label in taxonomies.taxonomy.title\" ng-if=\"label.locale === lang\" class=\"pull-left\">\n" +
    "                  <strong>{{label.text}}</strong>\n" +
    "                </h4>\n" +
    "                <a ng-if=\"options.showSearchRefreshButton\" title=\"{{'search.refresh-taxonomies' | translate}}\"\n" +
    "                   href class=\"hoffset1 voffset2 pull-right\" ng-click=\"refreshTaxonomyCache(target, taxonomies.taxonomy.name)\">\n" +
    "                  <span class=\"fa fa-refresh\"></span>\n" +
    "                </a>\n" +
    "              </li>\n" +
    "            </ol>\n" +
    "          </div>\n" +
    "          <div class=\"col-md-4\">\n" +
    "            <h4 ng-click=\"closeTaxonomies()\" title=\"{{'close' | translate}}\" class=\"pull-right\" style=\"cursor: pointer\">\n" +
    "              <i class=\"fa fa-close\"></i>\n" +
    "            </h4>\n" +
    "        </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"panel-body\">\n" +
    "        <div ng-if=\"taxonomies.search.active\" class=\"loading\"></div>\n" +
    "\n" +
    "        <div ng-if=\"!taxonomies.search.active\">\n" +
    "          <div ng-if=\"!taxonomies.taxonomy\">\n" +
    "            <div ng-repeat=\"group in taxonomyGroups\">\n" +
    "              <h4 ng-if=\"group.title\">{{group.title}}</h4>\n" +
    "              <p class=\"help-block\" ng-if=\"group.description\">{{group.description}}</p>\n" +
    "              <div ng-if=\"!taxonomies.taxonomy\">\n" +
    "                <div ng-repeat=\"taxonomy in group.taxonomies\" ng-if=\"$index % 3 == 0\" class=\"row\">\n" +
    "                  <div class=\"col-md-4\">\n" +
    "                    <div taxonomy-panel taxonomy=\"group.taxonomies[$index]\" lang=\"lang\"\n" +
    "                         on-navigate=\"navigateTaxonomy\"></div>\n" +
    "                  </div>\n" +
    "                  <div class=\"col-md-4\">\n" +
    "                    <div taxonomy-panel taxonomy=\"group.taxonomies[$index + 1]\" lang=\"lang\"\n" +
    "                         on-navigate=\"navigateTaxonomy\"></div>\n" +
    "                  </div>\n" +
    "                  <div class=\"col-md-4\">\n" +
    "                    <div taxonomy-panel taxonomy=\"group.taxonomies[$index + 2]\" lang=\"lang\"\n" +
    "                         on-navigate=\"navigateTaxonomy\"></div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "\n" +
    "          <div ng-if=\"taxonomies.taxonomy\">\n" +
    "            <div class=\"row\">\n" +
    "              <div class=\"col-md-4 height3\" scroll-to-top=\"taxonomies.taxonomy\">\n" +
    "                <p class=\"help-block\" ng-repeat=\"label in taxonomies.taxonomy.description\"\n" +
    "                   ng-if=\"label.locale === lang\">\n" +
    "                  {{label.text}}\n" +
    "                </p>\n" +
    "                <ul class=\"nav nav-pills nav-stacked\" ng-if=\"taxonomies.taxonomy.vocabularies\">\n" +
    "                  <li ng-repeat=\"vocabulary in taxonomies.taxonomy.vocabularies | visibleVocabularies | filter:canNavigate \"\n" +
    "                      class=\"{{taxonomies.vocabulary.name === vocabulary.name ? 'active' : ''}}\">\n" +
    "                    <a class=\"clearfix\" id=\"search-navigate-taxonomy\" href\n" +
    "                       ng-click=\"navigateTaxonomy(taxonomies.taxonomy, vocabulary)\">\n" +
    "                      <i class=\"pull-right {{taxonomies.vocabulary.name !== vocabulary.name ? 'hidden' : ''}} hidden-sm hidden-xs fa fa-chevron-circle-right\"></i>\n" +
    "                      <span ng-repeat=\"label in vocabulary.title\" ng-if=\"label.locale === lang\">\n" +
    "                        {{label.text}}\n" +
    "                      </span>\n" +
    "                      <span ng-if=\"!vocabulary.title\">\n" +
    "                        {{vocabulary.name}}\n" +
    "                      </span>\n" +
    "\n" +
    "\n" +
    "                    </a>\n" +
    "                  </li>\n" +
    "                </ul>\n" +
    "              </div>\n" +
    "              <div class=\"col-md-4 height3\" scroll-to-top=\"taxonomies.vocabulary\">\n" +
    "                <div ng-if=\"taxonomies.vocabulary\">\n" +
    "                  <h5 ng-repeat=\"label in taxonomies.vocabulary.title\" ng-if=\"label.locale === lang\">\n" +
    "                    {{label.text}}\n" +
    "                  </h5>\n" +
    "                  <div class=\"form-group\" ng-if=\"!taxonomies.isNumericVocabulary && !taxonomies.isMatchVocabulary\">\n" +
    "                    <a href class=\"btn btn-default btn-xs\"\n" +
    "                       ng-click=\"selectTerm(taxonomies.target, taxonomies.taxonomy, taxonomies.vocabulary)\">\n" +
    "                      <i class=\"fa fa-plus-circle\"></i>\n" +
    "                      <span translate>add-query</span>\n" +
    "                    </a>\n" +
    "                  </div>\n" +
    "                  <p class=\"help-block\" ng-repeat=\"label in taxonomies.vocabulary.description\"\n" +
    "                     ng-if=\"label.locale === lang\">\n" +
    "                    {{label.text}}\n" +
    "                  </p>\n" +
    "                  <div ng-if=\"taxonomies.isMatchVocabulary\" ng-controller=\"MatchVocabularyPanelController\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <a href class=\"btn btn-default btn-xs\"\n" +
    "                         ng-click=\"selectTerm(taxonomies.target, taxonomies.taxonomy, taxonomies.vocabulary, {text: text})\">\n" +
    "                        <i class=\"fa fa-plus-circle\"></i>\n" +
    "                        <span translate>add-query</span>\n" +
    "                      </a>\n" +
    "                    </div>\n" +
    "                    <form novalidate class=\"form-inline\"\n" +
    "                          ui-keypress=\"{13: 'selectTerm(taxonomies.target, taxonomies.taxonomy, taxonomies.vocabulary, {text: text})'}\">\n" +
    "                      <div class=\"form-group\">\n" +
    "                        <input type=\"text\" class=\"form-control\" ng-model=\"text\"\n" +
    "                               placeholder=\"{{'search.match.placeholder' | translate}}\">\n" +
    "                      </div>\n" +
    "                    </form>\n" +
    "                  </div>\n" +
    "                  <div ng-if=\"taxonomies.isNumericVocabulary\" ng-controller=\"NumericVocabularyPanelController\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                      <a href class=\"btn btn-default btn-xs\"\n" +
    "                         ng-click=\"selectTerm(taxonomies.target, taxonomies.taxonomy, taxonomies.vocabulary, {from: from, to: to})\">\n" +
    "                        <i class=\"fa fa-plus-circle\"></i>\n" +
    "                        <span translate>add-query</span>\n" +
    "                      </a>\n" +
    "                    </div>\n" +
    "                    <form novalidate class=\"form-inline\"\n" +
    "                          ui-keypress=\"{13:'selectTerm(taxonomies.target, taxonomies.taxonomy, taxonomies.vocabulary, {from: from, to: to})'}\">\n" +
    "                      <div class=\"form-group\">\n" +
    "                        <label for=\"nav-{{taxonomies.vocabulary.name}}-from\" translate>from</label>\n" +
    "                        <input type=\"number\" class=\"form-control\" id=\"nav-{{taxonomies.vocabulary.name}}-from\"\n" +
    "                               ng-model=\"from\" style=\"width:150px\">\n" +
    "                      </div>\n" +
    "                      <div class=\"form-group\">\n" +
    "                        <label for=\"nav-{{taxonomies.vocabulary.name}}-to\" translate>to</label>\n" +
    "                        <input type=\"number\" class=\"form-control\" id=\"nav-{{taxonomies.vocabulary.name}}-to\"\n" +
    "                               ng-model=\"to\" style=\"width:150px\">\n" +
    "                      </div>\n" +
    "                    </form>\n" +
    "                  </div>\n" +
    "                  <ul class=\"nav nav-pills nav-stacked\" ng-if=\"taxonomies.vocabulary.terms\">\n" +
    "                    <li ng-repeat=\"term in taxonomies.vocabulary.terms\"\n" +
    "                        class=\"{{taxonomies.term.name === term.name ? 'active' : ''}}\">\n" +
    "                      <a class=\"clearfix\" id=\"search-navigate-vocabulary\" href\n" +
    "                         ng-click=\"navigateTaxonomy(taxonomies.taxonomy, taxonomies.vocabulary, term)\">\n" +
    "                        <i class=\"pull-right {{taxonomies.term.name !== term.name ? 'hidden' : ''}} hidden-sm hidden-xs fa fa-chevron-circle-right\"></i>\n" +
    "                        <span ng-repeat=\"label in term.title\" ng-if=\"label.locale === lang\">\n" +
    "                          {{label.text}}\n" +
    "                        </span>\n" +
    "                        <span ng-if=\"!term.title\">\n" +
    "                          {{term.name}}\n" +
    "                        </span>\n" +
    "                      </a>\n" +
    "                    </li>\n" +
    "                  </ul>\n" +
    "                </div>\n" +
    "                <div ng-if=\"!taxonomies.vocabulary\" translate>search.taxonomy-nav-help</div>\n" +
    "              </div>\n" +
    "              <div class=\"col-md-4 height3\" scroll-to-top=\"taxonomies.term\">\n" +
    "                <div ng-if=\"taxonomies.term\">\n" +
    "                  <h5 ng-repeat=\"label in taxonomies.term.title\" ng-if=\"label.locale === lang\">\n" +
    "                    {{label.text}}\n" +
    "                  </h5>\n" +
    "                  <div>\n" +
    "                    <a href class=\"btn btn-default btn-xs\"\n" +
    "                       ng-click=\"selectTerm(taxonomies.target, taxonomies.taxonomy, taxonomies.vocabulary, {term: taxonomies.term})\">\n" +
    "                      <i class=\"fa fa-plus-circle\"></i>\n" +
    "                      <span translate>add-query</span>\n" +
    "                    </a>\n" +
    "                  </div>\n" +
    "                  <p ng-repeat=\"label in taxonomies.term.description\" ng-if=\"label.locale === lang\">\n" +
    "                    <span class=\"help-block\" ng-bind-html=\"label.text | dceDescription\"\n" +
    "                          ng-if=\"taxonomies.vocabulary.name === 'dceId'\"></span>\n" +
    "                    <span class=\"help-block\" ng-bind-html=\"label.text\"\n" +
    "                          ng-if=\"taxonomies.vocabulary.name !== 'dceId'\"></span>\n" +
    "                  </p>\n" +
    "                </div>\n" +
    "                <div ng-if=\"!taxonomies.term && taxonomies.vocabulary\" translate>search.vocabulary-nav-help</div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("search/views/classifications/taxonomy-accordion-group.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/classifications/taxonomy-accordion-group.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div class=\"panel panel-taxonomy\" ng-class=\"panelClass || 'panel-default'\">\n" +
    "  <div role=\"tab\" id=\"{{::headingId}}\" aria-selected=\"{{isOpen}}\" class=\"panel-heading\" ng-keypress=\"toggleOpen($event)\">\n" +
    "    <h4 class=\"panel-title\">\n" +
    "      <a role=\"button\" data-toggle=\"collapse\" href aria-expanded=\"{{isOpen}}\" aria-controls=\"{{::panelId}}\" tabindex=\"0\" class=\"accordion-toggle\" ng-click=\"toggleOpen()\" uib-accordion-transclude=\"heading\"><small><span uib-accordion-header ng-class=\"{'text-muted': isDisabled}\">{{heading}}</span></small></a>\n" +
    "    </h4>\n" +
    "  </div>\n" +
    "  <div id=\"{{::panelId}}\" aria-labelledby=\"{{::headingId}}\" aria-hidden=\"{{!isOpen}}\" role=\"tabpanel\" class=\"panel-collapse collapse\" uib-collapse=\"!isOpen\">\n" +
    "    <div class=\"panel-body no-padding small\" ng-transclude></div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("search/views/classifications/taxonomy-panel-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/classifications/taxonomy-panel-template.html",
    "<div>\n" +
    "  <div class=\"panel panel-default\" ng-if=\"taxonomy\">\n" +
    "    <div class=\"panel-heading\">\n" +
    "      <div ng-repeat=\"label in taxonomy.title\" ng-if=\"label.locale === lang\">\n" +
    "        <a href ng-click=\"onNavigate(taxonomy)\">{{label.text}}</a>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"panel-body\">\n" +
    "      <div ng-repeat=\"label in taxonomy.description\" ng-if=\"label.locale === lang\">\n" +
    "        {{label.text}}\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("search/views/classifications/taxonomy-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/classifications/taxonomy-template.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div ng-repeat=\"vocabulary in taxonomies.taxonomy.vocabularies\" ng-if=\"$index % 3 == 0\" class=\"row\">\n" +
    "  <div class=\"col-md-4\">\n" +
    "    <div vocabulary-panel taxonomy=\"taxonomies.taxonomy.vocabularies[$index]\"></div>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-4\">\n" +
    "    <div taxonomy-panel taxonomy=\"taxonomies.taxonomy.vocabularies[$index + 1]\"></div>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-4\">\n" +
    "    <div taxonomy-panel taxonomy=\"taxonomies.taxonomy.vocabularies[$index + 2]\"></div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("search/views/classifications/term-panel-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/classifications/term-panel-template.html",
    "<div>\n" +
    "  <div class=\"panel panel-default\" ng-if=\"term\">\n" +
    "    <div class=\"panel-heading\">\n" +
    "      <div>\n" +
    "        <localized value=\"term.title\" lang=\"lang\" key-lang=\"locale\" key-value=\"text\"></localized>\n" +
    "        {{label.text}}\n" +
    "        <small>\n" +
    "          <a href ng-click=\"onSelect(target, taxonomy, vocabulary, {term: term})\">\n" +
    "            <i class=\"fa fa-plus-circle\" title=\"{{'add-query' | translate}}\"></i>\n" +
    "          </a>\n" +
    "        </small>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"panel-body\">\n" +
    "      <div>\n" +
    "        <localized value=\"term.description\" lang=\"lang\" key-lang=\"locale\" key-value=\"text\"></localized>\n" +
    "      </div>\n" +
    "      <div ng-if=\"!term.description\" class=\"help-block\" translate>search.no-description</div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("search/views/classifications/vocabulary-accordion-group.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/classifications/vocabulary-accordion-group.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div class=\"panel panel-vocabulary\" ng-class=\"panelClass || 'panel-default'\">\n" +
    "  <div role=\"tab\" id=\"{{::headingId}}\" aria-selected=\"{{isOpen}}\" class=\"panel-heading\" ng-keypress=\"toggleOpen($event)\">\n" +
    "    <h4 class=\"panel-title\">\n" +
    "      <a role=\"button\" data-toggle=\"collapse\" href aria-expanded=\"{{isOpen}}\" aria-controls=\"{{::panelId}}\" tabindex=\"0\" class=\"accordion-toggle\" ng-click=\"toggleOpen()\" uib-accordion-transclude=\"heading\"><small><span uib-accordion-header ng-class=\"{'text-muted': isDisabled}\">{{heading}}</span></small></a>\n" +
    "    </h4>\n" +
    "  </div>\n" +
    "  <div id=\"{{::panelId}}\" aria-labelledby=\"{{::headingId}}\" aria-hidden=\"{{!isOpen}}\" role=\"tabpanel\" class=\"panel-collapse collapse\" uib-collapse=\"!isOpen\">\n" +
    "    <div class=\"panel-body\" ng-transclude></div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("search/views/classifications/vocabulary-panel-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/classifications/vocabulary-panel-template.html",
    "<div>\n" +
    "  <div class=\"panel panel-default\" ng-if=\"vocabulary\">\n" +
    "    <div class=\"panel-heading\">\n" +
    "      <div ng-repeat=\"label in vocabulary.title\" ng-if=\"label.locale === lang\" class=\"clearfix\">\n" +
    "        <a href ng-click=\"onNavigate(taxonomy, vocabulary)\" ng-if=\"vocabulary.terms\">{{label.text}}</a>\n" +
    "        <span ng-if=\"!vocabulary.terms\">{{label.text}}</span>\n" +
    "        <a href ng-click=\"onSelect(target, taxonomy, vocabulary)\">\n" +
    "          <small ng-if=\"vocabulary.terms\"><i class=\"fa fa-plus-circle\" title=\"{{'add-query' | translate}}\"></i></small>\n" +
    "          <small ng-if=\"!vocabulary.terms\"><i class=\"fa fa-plus-circle\" title=\"{{'add-query' | translate}}\"></i></small>\n" +
    "        </a>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"panel-body\">\n" +
    "      <div>\n" +
    "        <localized value=\"vocabulary.description\" lang=\"lang\" key-lang=\"locale\" key-value=\"text\"></localized>\n" +
    "      </div>\n" +
    "      <div ng-if=\"!vocabulary.description\" class=\"help-block\" translate>search.no-description</div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("search/views/coverage/coverage-search-result-table-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/coverage/coverage-search-result-table-template.html",
    "<div class=\"coverage\">\n" +
    "\n" +
    "  <div ng-if=\"hasVariableTarget()\">\n" +
    "    <ul class=\"nav nav-pills pull-left\">\n" +
    "      <li ng-if=\"groupByOptions.canShowStudy() && groupByOptions.canShowDataset()\"\n" +
    "        ng-class=\"{'active': bucket.startsWith('study') || bucketStartsWithDce}\" class=\"studies\">\n" +
    "        <a href ng-click=\"selectTab('study')\" translate>{{groupByOptions.studyTitle()}}</a>\n" +
    "      </li>\n" +
    "      <li ng-if=\"groupByOptions.canShowStudy() && groupByOptions.canShowDataset()\"\n" +
    "        ng-class=\"{'active': bucket.startsWith('dataset')}\" class=\"datasets\">\n" +
    "        <a href ng-click=\"selectTab('dataset')\" translate>{{groupByOptions.datasetTitle()}}</a>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "\n" +
    "    <div ng-class=\"{'pull-right': groupByOptions.canShowStudy() && groupByOptions.canShowDataset()}\">\n" +
    "      <a ng-if=\"hasSelected()\" href class=\"btn btn-default\" ng-click=\"updateFilterCriteria()\">\n" +
    "        <i class=\"fa fa-filter\"></i> {{'search.filter' | translate}}\n" +
    "      </a>\n" +
    "\n" +
    "      <span ng-if=\"table.taxonomyHeaders.length > 0\" >\n" +
    "        <a href class=\"btn btn-info btn-responsive\" ng-click=\"selectFullAndFilter()\" ng-hide=\"isFullCoverageImpossibleOrCoverageAlreadyFull()\">\n" +
    "          {{'search.coverage-select.full' | translate}}\n" +
    "        </a>\n" +
    "        <a obiba-file-download url=\"downloadUrl()\" target=\"_self\" download class=\"btn btn-info btn-responsive\" href>\n" +
    "          <i class=\"fa fa-download\"></i> {{'download' | translate}}\n" +
    "        </a>\n" +
    "      </span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"clearfix\"></div>\n" +
    "\n" +
    "    <div class=\"voffset2\" ng-class=\"{'pull-right': groupByOptions.canShowVariableTypeFilter(bucket) && groupByOptions.canShowStudyType()}\" ng-if=\"!singleStudy && groupByOptions.canShowDce(bucket)\">\n" +
    "      <label class=\"checkbox-inline\">\n" +
    "        <input type=\"checkbox\" ng-model=\"bucketSelection.dceBucketSelected\">\n" +
    "        <span translate>search.coverage-buckets.dce</span>\n" +
    "      </label>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"voffset2\" ng-if=\"!singleStudy && groupByOptions.canShowStudyType()\">\n" +
    "      <div class=\"btn btn-group\" style=\"padding: 0\">\n" +
    "        <label class=\"btn btn-sm btn-study\" ng-model=\"bucketSelection.studySelection\" uib-btn-radio=\"'all'\" translate>all</label>\n" +
    "        <label class=\"btn btn-sm btn-study\" ng-model=\"bucketSelection.studySelection\" uib-btn-radio=\"'individual'\" translate>search.coverage-buckets.individual</label>\n" +
    "        <label class=\"btn btn-sm btn-study\" ng-model=\"bucketSelection.studySelection\" uib-btn-radio=\"'harmonization'\" translate>search.coverage-buckets.harmonization</label>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <p class=\"help-block\" ng-if=\"!loading && !table.taxonomyHeaders\">\n" +
    "    <span ng-if=\"!hasVariableTarget()\" translate>search.no-coverage</span>\n" +
    "    <span ng-if=\"hasVariableTarget()\" translate>search.no-results</span>\n" +
    "  </p>\n" +
    "\n" +
    "  <div ng-if=\"loading\" class=\"loading\"></div>\n" +
    "\n" +
    "  <div class=\"table-responsive\" ng-if=\"!loading && table.taxonomyHeaders.length > 0\">\n" +
    "    <table class=\"table table-bordered table-striped\">\n" +
    "      <thead>\n" +
    "      <tr>\n" +
    "        <th rowspan=\"2\" width=\"50\" style=\"text-align: center\">\n" +
    "          <div class=\"btn-group voffset1\" uib-dropdown>\n" +
    "            <div uib-dropdown-toggle>\n" +
    "              <span class=\"fa fa-square-o\"></span>\n" +
    "              <span class=\"fa fa-caret-down\"></span>\n" +
    "            </div>\n" +
    "            <ul uib-dropdown-menu role=\"menu\">\n" +
    "              <li role=\"menuitem\"><a href ng-click=\"selectAll()\" translate>search.coverage-select.all</a></li>\n" +
    "              <li role=\"menuitem\"><a href ng-click=\"selectNone()\" translate>search.coverage-select.none</a></li>\n" +
    "              <li role=\"menuitem\"><a href ng-click=\"selectFull()\" translate>search.coverage-select.full</a></li>\n" +
    "            </ul>\n" +
    "          </div>\n" +
    "        </th>\n" +
    "        <th rowspan=\"{{bucketStartsWithDce ? 1 : 2}}\" colspan=\"{{table.cols.colSpan}}\" translate>\n" +
    "          {{'search.coverage-buckets.' + bucket}}\n" +
    "        </th>\n" +
    "        <th ng-repeat=\"header in ::table.vocabularyHeaders\" colspan=\"{{::header.termsCount}}\">\n" +
    "          <span\n" +
    "            uib-popover=\"{{header.entity.descriptions[0].value}}\"\n" +
    "            popover-title=\"{{header.entity.titles[0].value}}\"\n" +
    "            popover-placement=\"bottom\"\n" +
    "            popover-trigger=\"'mouseenter'\">\n" +
    "          {{header.entity.titles[0].value}}\n" +
    "          </span>\n" +
    "          <small>\n" +
    "            <a href ng-click=\"removeVocabulary(header)\"><i class=\"fa fa-times\"></i></a>\n" +
    "          </small>\n" +
    "        </th>\n" +
    "      </tr>\n" +
    "      <tr>\n" +
    "        <th ng-if=\"bucketStartsWithDce && !singleStudy\" translate>search.coverage-dce-cols.study</th>\n" +
    "        <th ng-if=\"bucketStartsWithDce\" colspan=\"{{choseHarmonization && !choseAll ? 2 : 1}}\" translate>search.coverage-dce-cols.population</th>\n" +
    "        <th ng-if=\"bucketStartsWithDce\" ng-hide=\"choseHarmonization && !choseAll\" translate>search.coverage-dce-cols.dce</th>\n" +
    "        <th ng-repeat=\"header in ::table.termHeaders\">\n" +
    "          <span\n" +
    "            uib-popover=\"{{header.entity.descriptions[0].value}}\"\n" +
    "            popover-title=\"{{header.entity.titles[0].value}}\"\n" +
    "            popover-placement=\"bottom\"\n" +
    "            popover-trigger=\"'mouseenter'\">\n" +
    "          {{header.entity.titles[0].value}}\n" +
    "          </span>\n" +
    "          <small>\n" +
    "            <a ng-if=\"header.canRemove\" href ng-click=\"removeTerm(header)\"><i class=\"fa fa-times\"></i></a>\n" +
    "          </small>\n" +
    "        </th>\n" +
    "      </tr>\n" +
    "      </thead>\n" +
    "      <tbody>\n" +
    "      <tr ng-repeat=\"row in ::table.rows track by row.value\" ng-show=\"showMissing || table.termHeaders.length == row.hits.length\">\n" +
    "        <td style=\"text-align: center\">\n" +
    "          <input type=\"checkbox\" ng-model=\"row.selected\">\n" +
    "        </td>\n" +
    "        <td ng-repeat=\"col in ::table.cols.ids[row.value] track by col.index\" colspan=\"{{$middle && (choseHarmonization && !choseAll) ? 2 : 1}}\" ng-hide=\"col.id === '-' && (singleStudy || choseHarmonization && !choseAll)\">\n" +
    "          <span ng-if=\"col.id === '-'\">-</span>\n" +
    "          <a ng-hide=\"col.rowSpan === 0  || col.id === '-'\" href=\"{{col.url}}\"\n" +
    "            uib-popover-html=\"col.description === col.title ? null : col.description\"\n" +
    "            popover-title=\"{{col.title}}\"\n" +
    "            popover-placement=\"bottom\"\n" +
    "            popover-trigger=\"'mouseenter'\">{{col.title}}</a>\n" +
    "          <div style=\"text-align: center\" ng-if=\"col.start && bucketStartsWithDce\">\n" +
    "            <div>\n" +
    "              <small class=\"help-block no-margin\" ng-if=\"::col.end\">\n" +
    "                {{::col.start}} {{'to' | translate}} {{::col.end}}\n" +
    "              </small>\n" +
    "              <small class=\"help-block no-margin\" ng-if=\"!col.end\">\n" +
    "                {{::col.start}}, {{'search.coverage-end-date-ongoing' | translate | lowercase}}\n" +
    "              </small>\n" +
    "            </div>\n" +
    "            <div class=\"progress no-margin\">\n" +
    "              <div class=\"progress-bar progress-bar-transparent\" role=\"progressbar\"\n" +
    "                aria-valuenow=\"{{::col.start}}\" aria-valuemin=\"{{::col.min}}\"\n" +
    "                aria-valuemax=\"{{::col.start}}\" style=\"{{'width: ' + col.progressStart + '%'}}\">\n" +
    "              </div>\n" +
    "              <div class=\"{{'progress-bar progress-bar-' + col.progressClass}}\" role=\"progressbar\"\n" +
    "                aria-valuenow=\"{{col.current}}\" aria-valuemin=\"{{::col.start}}\"\n" +
    "                aria-valuemax=\"{{::col.end ? col.end : col.current}}\" style=\"{{'width: ' + col.progress + '%'}}\">\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </td>\n" +
    "          <td ng-repeat=\"h in ::table.termHeaders\" title=\"{{h.entity.titles[0].value}}\">\n" +
    "            <a href ng-click=\"updateCriteria(row.value, h, $index, 'variables')\"><span class=\"label label-info\"\n" +
    "              ng-show=\"row.hitsTitles[$index]\">{{row.hitsTitles[$index]}}</span></a>\n" +
    "            <span ng-show=\"!row.hitsTitles[$index]\">0</span>\n" +
    "          </td>\n" +
    "      </tr>\n" +
    "      </tbody>\n" +
    "      <tfoot>\n" +
    "      <tr>\n" +
    "        <th></th>\n" +
    "        <th colspan=\"{{table.cols.colSpan}}\" translate>all</th>\n" +
    "        <th ng-repeat=\"header in ::table.termHeaders\" title=\"{{header.entity.descriptions[0].value}}\">\n" +
    "          <a href ng-click=\"updateCriteria(null, header, $index, 'variables')\"><localized-number value=\"header.hits\"></localized-number></a>\n" +
    "        </th>\n" +
    "      </tr>\n" +
    "      </tfoot>\n" +
    "    </table>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("search/views/criteria/criteria-node-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/criteria/criteria-node-template.html",
    "<span>\n" +
    "  <span ng-if=\"item.children.length > 0\">\n" +
    "    <criteria-leaf item=\"item.children[0]\" parent-type=\"$parent.item.type\" query=\"query\" advanced=\"advanced\"></criteria-leaf>\n" +
    "\n" +
    "    <div class=\"btn-group voffset1\" ng-show=\"$parent.advanced\" uib-dropdown>\n" +
    "      <button type=\"button\" class=\"btn btn-default btn-xs\" uib-dropdown-toggle>\n" +
    "        {{item.type | translate}} <span class=\"caret\"></span>\n" +
    "      </button>\n" +
    "      <ul uib-dropdown-menu role=\"menu\">\n" +
    "        <li role=\"menuitem\"><a href ng-click=\"updateLogical('or')\" translate>or</a></li>\n" +
    "        <li role=\"menuitem\"><a href ng-click=\"updateLogical('and')\" translate>and</a></li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "    <criteria-leaf item=\"item.children[1]\" parent-type=\"$parent.item.type\" query=\"query\" advanced=\"advanced\"></criteria-leaf>\n" +
    "\n" +
    "  </span>\n" +
    "  <span ng-if=\"item.children.length === 0\">\n" +
    "    <criteria-leaf item=\"item\" parent-type=\"item.parent.type\" query=\"query\" advanced=\"advanced\"></criteria-leaf>\n" +
    "  </span>\n" +
    "</span>");
}]);

angular.module("search/views/criteria/criteria-root-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/criteria/criteria-root-template.html",
    "<div class=\"form-inline\">\n" +
    "  <div ng-repeat=\"child in item.children | renderableTargets\" class=\"inline\">\n" +
    "    <div class=\"inline hoffset2\" ng-if=\"$index>0\">+</div>\n" +
    "    <criteria-target item=\"child\" query=\"$parent.query\" advanced=\"$parent.advanced\" class=\"inline\"></criteria-target>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("search/views/criteria/criteria-target-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/criteria/criteria-target-template.html",
    "<div>\n" +
    "  <div class=\"hidden-xs form-group\" title=\"{{'search.' + item.target + '-where' | translate}}\">\n" +
    "    <i class=\"{{'i-obiba-x-large i-obiba-' + item.target + ' color-' + item.target}}\">&nbsp;</i>\n" +
    "  </div>\n" +
    "  <criteria-node ng-repeat=\"child in item.children\" item=\"child\" query=\"$parent.query\" advanced=\"$parent.advanced\"></criteria-node>\n" +
    "</div>");
}]);

angular.module("search/views/criteria/criterion-dropdown-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/criteria/criterion-dropdown-template.html",
    "<div id=\"{{criterion.id.replace('.','-')}}-dropdown-{{timestamp}}\" class=\"{{'btn-group voffset1 btn-' + criterion.target}}\" ng-class='{open: state.open}'\n" +
    "     ng-keyup=\"onKeyup($event)\">\n" +
    "\n" +
    "  <button class=\"{{'btn btn-xs dropdown btn-' + criterion.target}}\"\n" +
    "    ng-click=\"openDropdown()\">\n" +
    "    <span uib-popover=\"{{localize(criterion.vocabulary.description ? criterion.vocabulary.description : criterion.vocabulary.title)}}\"\n" +
    "          popover-title=\"{{criterion.vocabulary.description ? localize(criterion.vocabulary.title) : null}}\"\n" +
    "          popover-placement=\"bottom\"\n" +
    "          popover-trigger=\"'mouseenter'\">\n" +
    "    <i class=\"fa fa-info-circle\"> </i>\n" +
    "  </span>\n" +
    "    <span title=\"{{localizeCriterion()}}\" test-ref=\"search-criterion\">\n" +
    "    {{truncate(localizeCriterion())}}\n" +
    "    </span>\n" +
    "    <span class='fa fa-caret-down'></span>\n" +
    "  </button>\n" +
    "  <button class='btn btn-xs btn-default' ng-click='remove(criterion.id)'>\n" +
    "    <span class='fa fa-times'></span>\n" +
    "  </button>\n" +
    "\n" +
    "  <match-criterion ng-if=\"VocabularyService.isMatchVocabulary(criterion.vocabulary)\" criterion=\"criterion\" query=\"query\"\n" +
    "                  state=\"state\"></match-criterion>\n" +
    "\n" +
    "  <string-criterion-terms\n" +
    "    ng-if=\"VocabularyService.isTermsVocabulary(criterion.vocabulary) || VocabularyService.isRangeVocabulary(criterion.vocabulary)\"\n" +
    "    criterion=\"criterion\" query=\"query\" state=\"state\"></string-criterion-terms>\n" +
    "\n" +
    "  <numeric-criterion ng-if=\"VocabularyService.isNumericVocabulary(criterion.vocabulary)\" criterion=\"criterion\" query=\"query\"\n" +
    "    state=\"state\"></numeric-criterion>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("search/views/criteria/criterion-header-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/criteria/criterion-header-template.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<li class=\"criteria-list-item\">\n" +
    "  <label uib-popover=\"{{localize(criterion.vocabulary.description)}}\"\n" +
    "         popover-title=\"{{localize(criterion.vocabulary.title)}}\"\n" +
    "         popover-placement=\"bottom\"\n" +
    "         popover-trigger=\"'mouseenter'\">\n" +
    "    {{localize(criterion.vocabulary.title)}}\n" +
    "  </label>\n" +
    "  <span class=\"pull-right\" title=\"{{'search.close-and-search' | translate}}\" ng-click=\"$parent.$parent.closeDropdown()\"><i class=\"fa fa-check\"></i></span>\n" +
    "</li>\n" +
    "<li class='divider'></li>\n" +
    "");
}]);

angular.module("search/views/criteria/criterion-match-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/criteria/criterion-match-template.html",
    "<ul class=\"dropdown-menu query-dropdown-menu\" aria-labelledby=\"{{criterion.vocabulary.name}}-button\">\n" +
    "  <ng-include src=\"'search/views/criteria/criterion-header-template.html'\"></ng-include>\n" +
    "  <li class=\"criteria-list-item\">\n" +
    "    <form novalidate>\n" +
    "      <div>\n" +
    "        <input class=\"form-control\" id=\"{{criterion.vocabulary.name}}-match\"\n" +
    "               ng-model=\"match\"\n" +
    "               ng-change=\"update()\"\n" +
    "               placeholder=\"{{'search.match.placeholder' | translate}}\">\n" +
    "      </div>\n" +
    "    </form>\n" +
    "  </li>\n" +
    "</ul>");
}]);

angular.module("search/views/criteria/criterion-numeric-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/criteria/criterion-numeric-template.html",
    "<ul class=\"dropdown-menu query-dropdown-menu\" aria-labelledby=\"{{criterion.vocabulary.name}}-button\">\n" +
    "  <ng-include src=\"'search/views/criteria/criterion-header-template.html'\"></ng-include>\n" +
    "  <li class=\"btn-group\">\n" +
    "    <ul class=\"criteria-list-item\">\n" +
    "      <li>\n" +
    "        <label title=\"{{'search.any-help' | translate}}\">\n" +
    "          <input ng-click=\"updateSelection()\" type=\"radio\" ng-model=\"selectMissing\" ng-value=\"false\">\n" +
    "          {{'search.any' | translate}}\n" +
    "        </label>\n" +
    "      </li>\n" +
    "      <li>\n" +
    "        <label title=\"{{'search.none-help' | translate}}\">\n" +
    "          <input ng-click=\"updateSelection()\" type=\"radio\" ng-model=\"selectMissing\" ng-value=\"true\">\n" +
    "          {{'search.none' | translate}}\n" +
    "        </label>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </li>\n" +
    "  <li ng-show=\"!selectMissing\" class='divider'></li>\n" +
    "  <li ng-show=\"!selectMissing\" class=\"btn-group criteria-list-item\">\n" +
    "    <form novalidate>\n" +
    "      <div class=\"form-group\">\n" +
    "        <label for=\"{{criterion.vocabulary.name}}-from\" translate>from</label>\n" +
    "        <input type=\"number\" class=\"form-control\" id=\"{{criterion.vocabulary.name}}-from\" placeholder=\"{{min}}\" ng-model=\"from\" style=\"width:150px\">\n" +
    "      </div>\n" +
    "      <div class=\"form-group\">\n" +
    "        <label for=\"{{criterion.vocabulary.name}}-to\" translate>to</label>\n" +
    "        <input type=\"number\" class=\"form-control\" id=\"{{criterion.vocabulary.name}}-to\" placeholder=\"{{max}}\" ng-model=\"to\" style=\"width:150px\">\n" +
    "      </div>\n" +
    "    </form>\n" +
    "  </li>\n" +
    "</ul>");
}]);

angular.module("search/views/criteria/criterion-string-terms-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/criteria/criterion-string-terms-template.html",
    "<ul class=\"dropdown-menu query-dropdown-menu\" aria-labelledby=\"{{criterion.vocabulary.name}}-button\">\n" +
    "  <ng-include src=\"'search/views/criteria/criterion-header-template.html'\"></ng-include>\n" +
    "  <li class=\"btn-group\">\n" +
    "    <ul class=\"criteria-list-item\">\n" +
    "      <li>\n" +
    "        <label title=\"{{'search.any-help' | translate}}\">\n" +
    "          <input ng-click=\"updateFilter()\" type=\"radio\" ng-model=\"selectedFilter\" value=\"{{RQL_NODE.EXISTS}}\">\n" +
    "          {{'search.any' | translate}}\n" +
    "        </label>\n" +
    "      </li>\n" +
    "      <li>\n" +
    "        <label title=\"{{'search.none-help' | translate}}\">\n" +
    "          <input ng-click=\"updateFilter()\" type=\"radio\" ng-model=\"selectedFilter\" value=\"{{RQL_NODE.MISSING}}\">\n" +
    "          {{'search.none' | translate}}\n" +
    "        </label>\n" +
    "      </li>\n" +
    "      <li>\n" +
    "        <label title=\"{{'search.in-help' | translate}}\">\n" +
    "          <input ng-click=\"updateFilter()\" type=\"radio\" ng-model=\"selectedFilter\" value=\"{{RQL_NODE.IN}}\">\n" +
    "          {{'search.in' | translate}}\n" +
    "        </label>\n" +
    "      </li>\n" +
    "      <li>\n" +
    "        <label title=\"{{'search.out-help' | translate}}\">\n" +
    "          <input ng-click=\"updateFilter()\" type=\"radio\" ng-model=\"selectedFilter\" value=\"{{RQL_NODE.OUT}}\">\n" +
    "          {{'search.out' | translate}}\n" +
    "        </label>\n" +
    "      </li>\n" +
    "      <li ng-show=\"criterion.vocabulary.repeatable\">\n" +
    "        <label title=\"{{'search.contains-help' | translate}}\">\n" +
    "          <input ng-click=\"updateFilter()\" type=\"radio\" ng-model=\"selectedFilter\" value=\"{{RQL_NODE.CONTAINS}}\">\n" +
    "          {{'search.contains' | translate}}\n" +
    "        </label>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </li>\n" +
    "  <li ng-show=\"isInOutFilter() || isContainsFilter()\" class='divider'></li>\n" +
    "  <li class=\"criteria-list-item\" ng-show=\"state.loading\">\n" +
    "    <p class=\"voffset2 loading\">\n" +
    "    </p>\n" +
    "  </li>\n" +
    "  <li ng-show=\"isInOutFilter() || isContainsFilter()\">\n" +
    "    <ul ng-show=\"!state.loading\" class=\"no-padding criteria-list-terms\">\n" +
    "      <li class=\"criteria-list-item\" ng-show=\"terms && terms.length>10\">\n" +
    "        <span class=\"input-group input-group-sm no-padding-top\">\n" +
    "          <input ng-model=\"searchText\" type=\"text\" class=\"form-control\" aria-describedby=\"term-search\">\n" +
    "          <span class=\"input-group-addon\" id=\"term-search\"><i class=\"fa fa-search\"></i></span>\n" +
    "        </span>\n" +
    "      </li>\n" +
    "      <li ng-show=\"terms && terms.length>10\"></li>\n" +
    "      <li class=\"criteria-list-item\"\n" +
    "        ng-show=\"isInOutFilter() || isContainsFilter()\"\n" +
    "        ng-repeat=\"term in terms | regex:searchText:['key','title','description']\"\n" +
    "        uib-popover=\"{{term.description ? term.description : (truncate(term.title) === term.title ? null : term.title)}}\"\n" +
    "        popover-title=\"{{term.description ? term.title : null}}\"\n" +
    "        popover-placement=\"bottom\"\n" +
    "        popover-trigger=\"'mouseenter'\">\n" +
    "          <span>\n" +
    "            <label class=\"control-label\">\n" +
    "              <input ng-model=\"checkboxTerms[term.key]\"\n" +
    "                type=\"checkbox\"\n" +
    "                ng-click=\"updateSelection()\">\n" +
    "              <span>{{truncate(term.title ? term.title : term.key)}}</span>\n" +
    "            </label>\n" +
    "          </span>\n" +
    "          <span class=\"pull-right\">\n" +
    "            <span class=\"agg-term-count\" ng-show=\"isSelectedTerm(term)\">{{term.count}}</span>\n" +
    "            <span class=\"agg-term-count-default\" ng-show=\"!isSelectedTerm(term)\">{{term.count}}</span>\n" +
    "          </span>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </li>\n" +
    "</ul>");
}]);

angular.module("search/views/criteria/search-criteria-region-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/criteria/search-criteria-region-template.html",
    "<div id=\"search-criteria-region\" ng-class=\"options.showSearchBox || options.showSearchBrowser ? 'voffset2' : ''\" class=\"panel panel-default\" ng-if=\"renderableTargets && renderableTargets.length > 0\">\n" +
    "    <div class=\"panel-body\">\n" +
    "        <table style=\"border:none\">\n" +
    "            <tbody>\n" +
    "            <tr>\n" +
    "                <td>\n" +
    "                    <a href class=\"btn btn-sm btn-default\" ng-click=\"clearSearchQuery()\" translate>clear</a>\n" +
    "                </td>\n" +
    "                <td style=\"padding-left: 10px\">\n" +
    "                    <div criteria-root item=\"search.criteria\" query=\"search.query\" advanced=\"search.advanced\" on-remove=\"removeCriteriaItem\"\n" +
    "                         on-refresh=\"refreshQuery\" class=\"inline\"></div>\n" +
    "\n" +
    "                    <small class=\"hoffset2\" ng-if=\"showAdvanced()\">\n" +
    "                        <a href ng-click=\"toggleSearchQuery()\"\n" +
    "                           title=\"{{search.advanced ? 'search.basic-help' : 'search.advanced-help' | translate}}\" translate>\n" +
    "                            {{search.advanced ? 'search.basic' : 'search.advanced' | translate}}\n" +
    "                        </a>\n" +
    "                    </small>\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("search/views/criteria/target-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/criteria/target-template.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<span></span>");
}]);

angular.module("search/views/graphics/graphics-search-result-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/graphics/graphics-search-result-template.html",
    "<div>\n" +
    "  <div ng-if=\"loading\" class=\"loading\"></div>\n" +
    "\n" +
    "  <p class=\"help-block\" ng-if=\"!loading && !noResults && !hasChartObjects()\" translate>search.no-graphic-result</p>\n" +
    "  <p class=\"help-block\" ng-if=\"!loading && noResults\" translate>search.no-results</p>\n" +
    "\n" +
    "  <div ng-repeat=\"chart in chartObjects\" class=\"panel panel-default\">\n" +
    "    <div class=\"panel-heading\">\n" +
    "      {{chart.headerTitle}}\n" +
    "    </div>\n" +
    "    <div class=\"panel-body\">\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-xs-12 col-lg-6\">\n" +
    "          <div ng-if=\"chart.chartObject.type === 'GeoChart'\">\n" +
    "            <obiba-geo config=\"chart.chartObject.d3Config\"></obiba-geo>\n" +
    "          </div>\n" +
    "          <div ng-if=\"chart.chartObject.type !== 'GeoChart'\">\n" +
    "            <obiba-nv-chart chart-config=\"chart.chartObject.d3Config\"></obiba-nv-chart>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-xs-12 col-lg-6\">\n" +
    "          <div class=\"table-responsive\" ng-if=\"chart.getTable().data  &&  chart.getTable().data.length>1\">\n" +
    "            <table style=\"max-height: 400px;\" class=\"table table-bordered table-striped\" fixed-header=\"chart.getTable().data\">\n" +
    "              <thead>\n" +
    "              <tr>\n" +
    "                <th>{{chart.getTable().data[0][0]}}</th>\n" +
    "                <th>{{chart.getTable().data[0][1]}}</th>\n" +
    "                <th ng-if=\"chart.getTable().data[0][2]\">{{chart.getTable().data[0][2]}}</th>\n" +
    "              </tr>\n" +
    "              </thead>\n" +
    "              <tbody>\n" +
    "              <tr ng-repeat=\"row in chart.getTable().entries\">\n" +
    "                <td>{{row.title}}</td>\n" +
    "                <td><a href ng-click=\"updateCriteria(row.key, chart.getTable().vocabulary)\"><localized-number value=\"row.value\"></localized-number></a></td>\n" +
    "                <td ng-if=\"row.participantsNbr\">{{row.participantsNbr}}</td>\n" +
    "              </tr>\n" +
    "              </tbody>\n" +
    "            </table>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("search/views/list/datasets-search-result-table-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/list/datasets-search-result-table-template.html",
    "<div>\n" +
    "  <div ng-if=\"loading\" class=\"loading\"></div>\n" +
    "  <div ng-show=\"!loading\">\n" +
    "\n" +
    "    <p class=\"help-block\" ng-if=\"!summaries || !summaries.length\" translate>search.dataset.noResults</p>\n" +
    "    <div class=\"table-responsive\" ng-if=\"summaries && summaries.length\">\n" +
    "      <table class=\"table table-bordered table-striped\" ng-init=\"lang = $parent.$parent.lang\">\n" +
    "        <thead>\n" +
    "        <tr>\n" +
    "          <th translate ng-if=\"optionsCols.showDatasetsAcronymColumn\">acronym</th>\n" +
    "          <th translate>name</th>\n" +
    "          <th translate ng-if=\"optionsCols.showDatasetsTypeColumn\">type</th>\n" +
    "          <th translate ng-if=\"optionsCols.showDatasetsNetworkColumn\">networks</th>\n" +
    "          <th translate ng-if=\"optionsCols.showDatasetsStudiesColumn\">studies</th>\n" +
    "          <th translate ng-if=\"optionsCols.showDatasetsVariablesColumn\">variables</th>\n" +
    "        </tr>\n" +
    "        </thead>\n" +
    "        <tbody test-ref=\"search-results\">\n" +
    "        <tr ng-if=\"!summaries || !summaries.length\">\n" +
    "          <td colspan=\"6\" translate>search.dataset.noResults</td>\n" +
    "        </tr>\n" +
    "        <tr ng-repeat=\"summary in summaries\">\n" +
    "          <td ng-if=\"optionsCols.showDatasetsAcronymColumn\">\n" +
    "            <a ng-href=\"{{PageUrlService.datasetPage(summary.id, summary.variableType)}}\">\n" +
    "              <localized value=\"summary.acronym\" lang=\"lang\" test-ref=\"acronym\"></localized>\n" +
    "            </a>\n" +
    "          </td>\n" +
    "          <td>\n" +
    "            <a ng-if=\"!optionsCols.showDatasetsAcronymColumn\" ng-href=\"{{PageUrlService.datasetPage(summary.id, summary.variableType)}}\">\n" +
    "              <localized value=\"summary.name\" lang=\"lang\"></localized>\n" +
    "            </a>\n" +
    "            <localized ng-if=\"optionsCols.showDatasetsAcronymColumn\" value=\"summary.name\" lang=\"lang\"></localized>\n" +
    "          </td>\n" +
    "          <td ng-if=\"optionsCols.showDatasetsTypeColumn\">\n" +
    "            <localized value=\"classNames[(summary.variableType === 'Collected' ? 'Study' : 'Harmonization') + 'Dataset']\" lang=\"lang\"></localized>\n" +
    "          </td>\n" +
    "          <td ng-if=\"optionsCols.showDatasetsNetworkColumn\">\n" +
    "            <a href ng-click=\"updateCriteria(summary.id, 'networks')\" ng-if=\"summary['obiba.mica.CountStatsDto.datasetCountStats'].networks\"><localized-number value=\"summary['obiba.mica.CountStatsDto.datasetCountStats'].networks\"></localized-number></a>\n" +
    "            <span ng-if=\"!summary['obiba.mica.CountStatsDto.datasetCountStats'].networks\">-</span>\n" +
    "          </td>\n" +
    "          <td ng-if=\"optionsCols.showDatasetsStudiesColumn\">\n" +
    "            <a href ng-click=\"updateCriteria(summary.id, 'studies')\" ng-if=\"summary['obiba.mica.CountStatsDto.datasetCountStats'].studies\"><localized-number value=\"summary['obiba.mica.CountStatsDto.datasetCountStats'].studies\"></localized-number></a>\n" +
    "            <span ng-if=\"!summary['obiba.mica.CountStatsDto.datasetCountStats'].studies\">-</span>\n" +
    "          </td>\n" +
    "          <td ng-if=\"optionsCols.showDatasetsVariablesColumn\">\n" +
    "            <a href ng-click=\"updateCriteria(summary.id, 'variables')\"><localized-number value=\"summary['obiba.mica.CountStatsDto.datasetCountStats'].variables\"></localized-number></a>\n" +
    "          </td>\n" +
    "        </tr>\n" +
    "        </tbody>\n" +
    "      </table>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("search/views/list/networks-search-result-table-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/list/networks-search-result-table-template.html",
    "<div>\n" +
    "  <div ng-if=\"loading\" class=\"loading\"></div>\n" +
    "  <div ng-show=\"!loading\">\n" +
    "\n" +
    "    <p class=\"help-block\" ng-if=\"!summaries || !summaries.length\" translate>search.network.noResults</p>\n" +
    "    <div class=\"table-responsive\" ng-if=\"summaries && summaries.length\">\n" +
    "      <table class=\"table table-bordered table-striped\" ng-init=\"lang = $parent.$parent.lang\">\n" +
    "        <thead>\n" +
    "        <tr>\n" +
    "          <th rowspan=\"2\" translate>acronym</th>\n" +
    "          <th rowspan=\"2\" translate>name</th>\n" +
    "          <th rowspan=\"2\" translate ng-if=\"optionsCols.showNetworksStudiesColumn\">studies</th>\n" +
    "          <th translate\n" +
    "              ng-attr-colspan=\"{{colSpans.datasets}}\"\n" +
    "              ng-if=\"(optionsCols.showNetworksStudyDatasetColumn && choseIndividual) || (optionsCols.showNetworksHarmonizationDatasetColumn && choseHarmonization)\">\n" +
    "            datasets\n" +
    "          </th>\n" +
    "          <th rowspan=\"2\" translate ng-if=\"optionsCols.showNetworksVariablesColumn\">variables</th>\n" +
    "          <th translate\n" +
    "              ng-attr-colspan=\"{{colSpans.variables}}\"\n" +
    "              ng-if=\"(optionsCols.showNetworksStudyVariablesColumn && choseIndividual) || (optionsCols.showNetworksDataschemaVariablesColumn && choseHarmonization)\">variables</th>\n" +
    "        </tr>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "          <th translate ng-if=\"optionsCols.showNetworksStudyDatasetColumn && choseIndividual\">search.dataset.collected</th>\n" +
    "          <th translate ng-if=\"optionsCols.showNetworksHarmonizationDatasetColumn && choseHarmonization\">search.dataset.harmonized</th>\n" +
    "          <th translate ng-if=\"optionsCols.showNetworksStudyVariablesColumn && choseIndividual\">search.variable.collected</th>\n" +
    "          <th translate ng-if=\"optionsCols.showNetworksDataschemaVariablesColumn && choseHarmonization\">search.variable.dataschema</th>\n" +
    "        </tr>\n" +
    "        </thead>\n" +
    "        <tbody test-ref=\"search-results\">\n" +
    "        <tr ng-if=\"!summaries || !summaries.length\">\n" +
    "          <td colspan=\"6\" translate>search.network.noResults</td>\n" +
    "        </tr>\n" +
    "        <tr ng-repeat=\"summary in summaries\">\n" +
    "          <td>\n" +
    "            <a ng-href=\"{{PageUrlService.networkPage(summary.id)}}\">\n" +
    "              <localized value=\"summary.acronym\" lang=\"lang\" test-ref=\"acronym\"></localized>\n" +
    "            </a>\n" +
    "          </td>\n" +
    "          <td>\n" +
    "            <localized value=\"summary.name\" lang=\"lang\"></localized>\n" +
    "          </td>\n" +
    "          <td ng-if=\"optionsCols.showNetworksStudiesColumn\">\n" +
    "            <a href ng-click=\"updateCriteria(summary.id, 'studies')\" ng-if=\"summary['obiba.mica.CountStatsDto.networkCountStats'].studies\"><localized-number value=\"summary['obiba.mica.CountStatsDto.networkCountStats'].studies\"></localized-number></a>\n" +
    "            <span ng-if=\"!summary['obiba.mica.CountStatsDto.networkCountStats'].studies\">-</span>\n" +
    "          </td>\n" +
    "          <td ng-if=\"optionsCols.showNetworksStudyDatasetColumn && choseIndividual\">\n" +
    "            <a href ng-click=\"updateCriteria(summary.id, 'Study', 'datasets')\" ng-if=\"summary['obiba.mica.CountStatsDto.networkCountStats'].studyDatasets\"><localized-number value=\"summary['obiba.mica.CountStatsDto.networkCountStats'].studyDatasets\"></localized-number></a>\n" +
    "            <span ng-if=\"!summary['obiba.mica.CountStatsDto.networkCountStats'].studyDatasets\">-</span>\n" +
    "          </td>\n" +
    "          <td ng-if=\"optionsCols.showNetworksHarmonizationDatasetColumn && choseHarmonization\">\n" +
    "            <a href ng-click=\"updateCriteria(summary.id, 'HarmonizationStudy', 'datasets')\" ng-if=\"summary['obiba.mica.CountStatsDto.networkCountStats'].harmonizationDatasets\"><localized-number value=\"summary['obiba.mica.CountStatsDto.networkCountStats'].harmonizationDatasets\"></localized-number></a>\n" +
    "            <span ng-if=\"!summary['obiba.mica.CountStatsDto.networkCountStats'].harmonizationDatasets\">-</span>\n" +
    "          </td>\n" +
    "          <td ng-if=\"optionsCols.showNetworksVariablesColumn\">\n" +
    "            <a href ng-click=\"updateCriteria(summary.id, 'variables')\"><localized-number value=\"summary['obiba.mica.CountStatsDto.networkCountStats'].variables\"></localized-number></a>\n" +
    "          </td>\n" +
    "          <td ng-if=\"optionsCols.showNetworksStudyVariablesColumn && choseIndividual\">\n" +
    "            <a href ng-click=\"updateCriteria(summary.id, 'Study', 'variables')\" ng-if=\"summary['obiba.mica.CountStatsDto.networkCountStats'].studyDatasets\"><localized-number value=\"summary['obiba.mica.CountStatsDto.networkCountStats'].studyVariables\"></localized-number></a>\n" +
    "            <span ng-if=\"!summary['obiba.mica.CountStatsDto.networkCountStats'].studyDatasets\">-</span>\n" +
    "          </td>\n" +
    "          <td ng-if=\"optionsCols.showNetworksDataschemaVariablesColumn && choseHarmonization\">\n" +
    "            <a href ng-click=\"updateCriteria(summary.id, 'HarmonizationStudy', 'variables')\" ng-if=\"summary['obiba.mica.CountStatsDto.networkCountStats'].harmonizationDatasets\"><localized-number value=\"summary['obiba.mica.CountStatsDto.networkCountStats'].dataschemaVariables\"></localized-number></a>\n" +
    "            <span ng-if=\"!summary['obiba.mica.CountStatsDto.networkCountStats'].harmonizationDatasets\">-</span>\n" +
    "          </td>\n" +
    "        </tr>\n" +
    "        </tbody>\n" +
    "      </table>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("search/views/list/pagination-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/list/pagination-template.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<span>\n" +
    "  <ul class=\"pagination pagination-sm\">\n" +
    "    <li ng-if=\"::boundaryLinks\" ng-class=\"{disabled: noPrevious()||ngDisabled}\" class=\"pagination-first\">\n" +
    "      <a href ng-click=\"selectPage(1, $event)\">{{::getText('first')}}</a>\n" +
    "    </li>\n" +
    "    <li ng-if=\"::directionLinks\" ng-class=\"{disabled: noPrevious()||ngDisabled}\" class=\"pagination-prev\">\n" +
    "      <a href ng-click=\"selectPage(page - 1, $event)\">{{::getText('previous')}}</a>\n" +
    "    </li>\n" +
    "    <li ng-repeat=\"page in pages track by $index\" ng-class=\"{active: page.active,disabled: ngDisabled&&!page.active}\"\n" +
    "        class=\"pagination-page\">\n" +
    "      <a href ng-click=\"selectPage(page.number, $event)\">{{page.text}}</a>\n" +
    "    </li>\n" +
    "    <li ng-if=\"::directionLinks\" ng-class=\"{disabled: noNext()||ngDisabled}\" class=\"pagination-next\">\n" +
    "      <a href ng-click=\"selectPage(page + 1, $event)\">{{::getText('next')}}</a>\n" +
    "    </li>\n" +
    "    <li ng-if=\"::boundaryLinks\" ng-class=\"{disabled: noNext()||ngDisabled}\" class=\"pagination-last\">\n" +
    "      <a href ng-click=\"selectPage(totalPages, $event)\">{{::getText('last')}}</a>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "  <ul class=\"pagination pagination-sm\" ng-show=\"1 < totalPages\">\n" +
    "    <li>\n" +
    "      <a href ng-show=\"$parent.canShow() && 1 < totalPages\" class=\"pagination-total\">{{$parent.pagination.from}} - {{$parent.pagination.to}} {{'of' | translate}} {{totalItems}}</a>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "</span>");
}]);

angular.module("search/views/list/search-result-pagination-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/list/search-result-pagination-template.html",
    "<div ng-show=\"totalHits > 10\">\n" +
    "  <div class=\"pull-left\">\n" +
    "    <select class=\"form-control input-sm form-select\"\n" +
    "            ng-model=\"pagination.selected\"\n" +
    "            ng-options=\"size.label for size in pageSizes\"\n" +
    "            ng-change=\"pageSizeChanged()\"></select>\n" +
    "  </div>\n" +
    "  <div class=\"pull-right\" style=\"margin-left: 5px\">\n" +
    "\n" +
    "  <span ng-show=\"maxSize > 1\"\n" +
    "        uib-pagination\n" +
    "        total-items=\"totalHits\"\n" +
    "        max-size=\"maxSize\"\n" +
    "        ng-model=\"pagination.currentPage\"\n" +
    "        boundary-links=\"true\"\n" +
    "        force-ellipses=\"true\"\n" +
    "        items-per-page=\"pagination.selected.value\"\n" +
    "        previous-text=\"&lsaquo;\"\n" +
    "        next-text=\"&rsaquo;\"\n" +
    "        first-text=\"&laquo;\"\n" +
    "        last-text=\"&raquo;\"\n" +
    "        template-url=\"search/views/list/pagination-template.html\"\n" +
    "        ng-change=\"pageChanged()\">\n" +
    "  </span>\n" +
    " </div>\n" +
    "</div>");
}]);

angular.module("search/views/list/studies-search-result-table-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/list/studies-search-result-table-template.html",
    "<div>\n" +
    "  <div ng-if=\"loading\" class=\"loading\"></div>\n" +
    "  <div ng-show=\"!loading\">\n" +
    "\n" +
    "\n" +
    "    <p class=\"help-block\" ng-if=\"!summaries || !summaries.length\" translate>search.study.noResults</p>\n" +
    "    <div class=\"table-responsive\" ng-if=\"summaries && summaries.length\">\n" +
    "      <table class=\"table table-bordered table-striped\">\n" +
    "        <thead>\n" +
    "        <tr>\n" +
    "          <th rowspan=\"2\" translate>acronym</th>\n" +
    "          <th rowspan=\"2\" translate>name</th>\n" +
    "          <th rowspan=\"2\" translate ng-if=\"choseAll && optionsCols.showStudiesTypeColumn\">type</th>\n" +
    "          <th rowspan=\"2\" translate ng-if=\"optionsCols.showStudiesDesignColumn && choseIndividual\">search.study.design</th>\n" +
    "          <th translate\n" +
    "              ng-attr-colspan=\"{{optionsCols.showStudiesQuestionnaireColumn + optionsCols.showStudiesPmColumn + optionsCols.showStudiesBioColumn + optionsCols.showStudiesOtherColumn}}\"\n" +
    "              ng-if=\"(optionsCols.showStudiesQuestionnaireColumn || optionsCols.showStudiesPmColumn || optionsCols.showStudiesBioColumn || optionsCols.showStudiesOtherColumn) && choseIndividual\">\n" +
    "            search.study.dataSources\n" +
    "          </th>\n" +
    "          <th rowspan=\"2\" translate ng-if=\"optionsCols.showStudiesParticipantsColumn && choseIndividual\">search.study.participants</th>\n" +
    "          <th rowspan=\"2\" translate ng-if=\"optionsCols.showStudiesNetworksColumn\">networks</th>\n" +
    "          <th rowspan=\"2\" translate ng-if=\"optionsCols.showStudiesVariablesColumn\">variables</th>\n" +
    "          <th translate\n" +
    "              ng-attr-colspan=\"{{optionsCols.showStudiesStudyDatasetsColumn + optionsCols.showStudiesStudyVariablesColumn}}\"\n" +
    "              ng-if=\"choseIndividual && (optionsCols.showStudiesStudyDatasetsColumn || optionsCols.showStudiesStudyVariablesColumn)\">search.coverage-buckets.collection\n" +
    "          </th>\n" +
    "          <th translate\n" +
    "              ng-attr-colspan=\"{{optionsCols.showStudiesHarmonizationDatasetsColumn + optionsCols.showStudiesDataschemaVariablesColumn}}\"\n" +
    "              ng-if=\"choseHarmonization && (optionsCols.showStudiesHarmonizationDatasetsColumn || optionsCols.showStudiesDataschemaVariablesColumn)\">search.coverage-buckets.harmonization</th>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "          <th class=\"text-nowrap\" title=\"{{datasourceTitles.questionnaires.title}}\" ng-if=\"optionsCols.showStudiesQuestionnaireColumn && choseIndividual\">\n" +
    "            <i class=\"fa fa-file-text-o\"></i>\n" +
    "          </th>\n" +
    "          <th class=\"text-nowrap\" title=\"{{datasourceTitles.physical_measures.title}}\" ng-if=\"optionsCols.showStudiesPmColumn && choseIndividual\">\n" +
    "            <i class=\"fa fa-stethoscope\"></i>\n" +
    "          </th>\n" +
    "          <th class=\"text-nowrap\"  title=\"{{datasourceTitles.biological_samples.title}}\" ng-if=\"optionsCols.showStudiesBioColumn && choseIndividual\">\n" +
    "            <i class=\"fa fa-flask\"></i>\n" +
    "          </th>\n" +
    "          <th class=\"text-nowrap\"  title=\"{{datasourceTitles.others.title}}\" ng-if=\"optionsCols.showStudiesOtherColumn && choseIndividual\">\n" +
    "            <i class=\"fa fa-plus-square-o\"></i>\n" +
    "          </th>\n" +
    "          <th translate ng-if=\"optionsCols.showStudiesStudyDatasetsColumn && choseIndividual\">datasets</th>\n" +
    "          <th translate ng-if=\"optionsCols.showStudiesStudyVariablesColumn && choseIndividual\">variables</th>\n" +
    "          <th translate ng-if=\"optionsCols.showStudiesHarmonizationDatasetsColumn && choseHarmonization\">datasets</th>\n" +
    "          <th translate ng-if=\"optionsCols.showStudiesDataschemaVariablesColumn && choseHarmonization\">variables</th>\n" +
    "        </tr>\n" +
    "        </thead>\n" +
    "        <tbody test-ref=\"search-results\">\n" +
    "        <tr ng-repeat=\"summary in summaries\" ng-init=\"lang = $parent.$parent.lang\">\n" +
    "          <td>\n" +
    "            <a ng-href=\"{{PageUrlService.studyPage(summary.id, summary.studyResourcePath === 'harmonization-study' ? 'harmonization' : 'individual')}}\">\n" +
    "              <localized value=\"summary.acronym\" lang=\"lang\" test-ref=\"acronym\"></localized>\n" +
    "            </a>\n" +
    "          </td>\n" +
    "          <td>\n" +
    "            <localized value=\"summary.name\" lang=\"lang\"></localized>\n" +
    "          </td>\n" +
    "          <td ng-if=\"choseAll && optionsCols.showStudiesTypeColumn\">{{(summary.studyResourcePath === 'individual-study' ? 'search.study.individual' : 'search.study.harmonization') | translate}}</td>\n" +
    "          <td ng-if=\"optionsCols.showStudiesDesignColumn && choseIndividual\">\n" +
    "            {{ summary.design === undefined ? '-' : 'study_taxonomy.vocabulary.methods-design.term.' + summary.design + '.title' | translate}}\n" +
    "          </td>\n" +
    "          <td ng-if=\"optionsCols.showStudiesQuestionnaireColumn && choseIndividual\">\n" +
    "            <i class=\"fa fa-check\" ng-if=\"hasDatasource(summary.dataSources, 'questionnaires')\"></i><span\n" +
    "              ng-if=\"!hasDatasource(summary.dataSources, 'questionnaires')\">-</span>\n" +
    "          </td>\n" +
    "          <td ng-if=\"optionsCols.showStudiesPmColumn && choseIndividual\">\n" +
    "            <i class=\"fa fa-check\" ng-if=\"hasDatasource(summary.dataSources, 'physical_measures')\"></i><span\n" +
    "              ng-if=\"!hasDatasource(summary.dataSources, 'physical_measures')\">-</span>\n" +
    "          </td>\n" +
    "          <td ng-if=\"optionsCols.showStudiesBioColumn && choseIndividual\">\n" +
    "            <i class=\"fa fa-check\" ng-if=\"hasDatasource(summary.dataSources, 'biological_samples')\"></i><span\n" +
    "              ng-if=\"!hasDatasource(summary.dataSources, 'biological_samples')\">-</span>\n" +
    "          </td>\n" +
    "          <td ng-if=\"optionsCols.showStudiesOtherColumn && choseIndividual\">\n" +
    "            <i class=\"fa fa-check\" ng-if=\"hasDatasource(summary.dataSources, 'others')\"></i><span\n" +
    "              ng-if=\"!hasDatasource(summary.dataSources, 'others')\">-</span>\n" +
    "          </td>\n" +
    "          <td ng-if=\"optionsCols.showStudiesParticipantsColumn && choseIndividual\">\n" +
    "            <span ng-if=\"summary.targetNumber.number\">\n" +
    "              <localized-number value=\"summary.targetNumber.number\"></localized-number>\n" +
    "            </span>\n" +
    "            <span translate ng-if=\"summary.targetNumber.noLimit\">\n" +
    "              numberOfParticipants.no-limit\n" +
    "            </span>\n" +
    "            <span ng-if=\"!summary.targetNumber.number && !summary.targetNumber.noLimit\">-</span>\n" +
    "          </td>\n" +
    "          <td ng-if=\"optionsCols.showStudiesNetworksColumn\">\n" +
    "            <a href ng-click=\"updateCriteria(summary.id, 'networks')\"\n" +
    "                ng-if=\"summary['obiba.mica.CountStatsDto.studyCountStats'].networks\"><localized-number value=\"summary['obiba.mica.CountStatsDto.studyCountStats'].networks\"></localized-number></a>\n" +
    "            <span ng-if=\"!summary['obiba.mica.CountStatsDto.studyCountStats'].networks\">-</span>\n" +
    "          </td>\n" +
    "          <td ng-if=\"optionsCols.showStudiesVariablesColumn\">\n" +
    "            <a href ng-click=\"updateCriteria(summary.id, 'variables')\"><localized-number value=\"summary['obiba.mica.CountStatsDto.studyCountStats'].variables\"></localized-number></a>\n" +
    "          </td>\n" +
    "          <td ng-if=\"optionsCols.showStudiesStudyDatasetsColumn && choseIndividual\">\n" +
    "            <a href ng-click=\"updateCriteria(summary.id, 'Study', 'datasets')\"\n" +
    "                ng-if=\"summary['obiba.mica.CountStatsDto.studyCountStats'].studyDatasets\"><localized-number value=\"summary['obiba.mica.CountStatsDto.studyCountStats'].studyDatasets\"></localized-number></a>\n" +
    "            <span ng-if=\"!summary['obiba.mica.CountStatsDto.studyCountStats'].studyDatasets\">-</span>\n" +
    "          </td>\n" +
    "          <td ng-if=\"optionsCols.showStudiesStudyVariablesColumn && choseIndividual\">\n" +
    "            <a href ng-click=\"updateCriteria(summary.id, 'Study', 'variables')\" ng-if=\"summary['obiba.mica.CountStatsDto.studyCountStats'].studyDatasets\"><localized-number value=\"summary['obiba.mica.CountStatsDto.studyCountStats'].studyVariables\"></localized-number></a>\n" +
    "            <span ng-if=\"!summary['obiba.mica.CountStatsDto.studyCountStats'].studyDatasets\">-</span>\n" +
    "          </td>\n" +
    "          <td ng-if=\"optionsCols.showStudiesHarmonizationDatasetsColumn && choseHarmonization\">\n" +
    "            <a href ng-click=\"updateCriteria(summary.id, 'HarmonizationStudy', 'datasets')\"\n" +
    "               ng-if=\"summary['obiba.mica.CountStatsDto.studyCountStats'].harmonizationDatasets\"><localized-number value=\"summary['obiba.mica.CountStatsDto.studyCountStats'].harmonizationDatasets\"></localized-number></a>\n" +
    "            <span ng-if=\"!summary['obiba.mica.CountStatsDto.studyCountStats'].harmonizationDatasets\">-</span>\n" +
    "          </td>\n" +
    "          <td ng-if=\"optionsCols.showStudiesDataschemaVariablesColumn && choseHarmonization\">\n" +
    "            <a href ng-click=\"updateCriteria(summary.id, 'HarmonizationStudy', 'variables')\" ng-if=\"summary['obiba.mica.CountStatsDto.studyCountStats'].harmonizationDatasets\"><localized-number value=\"summary['obiba.mica.CountStatsDto.studyCountStats'].dataschemaVariables\"></localized-number></a>\n" +
    "            <span ng-if=\"!summary['obiba.mica.CountStatsDto.studyCountStats'].harmonizationDatasets\">-</span>\n" +
    "          </td>\n" +
    "        </tr>\n" +
    "        </tbody>\n" +
    "      </table>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("search/views/list/variables-search-result-table-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/list/variables-search-result-table-template.html",
    "<div>\n" +
    "  <div ng-if=\"loading\" class=\"loading\"></div>\n" +
    "  <div ng-show=\"!loading\">\n" +
    "\n" +
    "    <p class=\"help-block\" ng-if=\"!summaries || !summaries.length\" translate>search.variable.noResults</p>\n" +
    "    <div class=\"table-responsive\" ng-if=\"summaries && summaries.length\">\n" +
    "      <table class=\"table table-bordered table-striped\" ng-init=\"lang = $parent.$parent.lang\">\n" +
    "        <thead>\n" +
    "        <tr>\n" +
    "          <th translate>name</th>\n" +
    "          <th translate>search.variable.label</th>\n" +
    "          <th translate ng-if=\"optionsCols.showVariablesTypeColumn\">type</th>\n" +
    "          <th translate ng-if=\"optionsCols.showVariablesStudiesColumn\">search.study.label</th>\n" +
    "          <th translate ng-if=\"optionsCols.showVariablesDatasetsColumn\">search.dataset.label</th>\n" +
    "        </tr>\n" +
    "        </thead>\n" +
    "        <tbody test-ref=\"search-results\">\n" +
    "        <tr ng-repeat=\"summary in summaries\">\n" +
    "          <td>\n" +
    "            <a test-ref=\"name\"\n" +
    "              href=\"{{PageUrlService.variablePage(summary.id) ? PageUrlService.variablePage(summary.id) : PageUrlService.datasetPage(summary.datasetId, summary.variableType)}}\">\n" +
    "              {{summary.name}}\n" +
    "            </a>\n" +
    "          </td>\n" +
    "          <td>\n" +
    "            <localized value=\"summary.variableLabel\" lang=\"lang\"></localized>\n" +
    "          </td>\n" +
    "          <td ng-if=\"optionsCols.showVariablesTypeColumn\">\n" +
    "            {{'search.variable.' + summary.variableType.toLowerCase() | translate}}\n" +
    "          </td>\n" +
    "          <td ng-if=\"optionsCols.showVariablesStudiesColumn\">\n" +
    "            <a ng-if=\"summary.studyId\" ng-href=\"{{PageUrlService.studyPage(summary.studyId, summary.variableType == 'Dataschema' ? 'harmonization' : 'individual')}}\">\n" +
    "              <localized value=\"summary.studyAcronym\" lang=\"lang\"></localized>\n" +
    "            </a>\n" +
    "            <a ng-if=\"summary.networkId\" ng-href=\"{{PageUrlService.networkPage(summary.networkId)}}\">\n" +
    "              <localized value=\"summary.networkAcronym\" lang=\"lang\"></localized>\n" +
    "            </a>\n" +
    "          </td>\n" +
    "          <td ng-if=\"optionsCols.showVariablesDatasetsColumn\">\n" +
    "            <a ng-href=\"{{PageUrlService.datasetPage(summary.datasetId, summary.variableType)}}\">\n" +
    "              <localized value=\"summary.datasetAcronym\" lang=\"lang\"></localized>\n" +
    "            </a>\n" +
    "          </td>\n" +
    "        </tr>\n" +
    "        </tbody>\n" +
    "      </table>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("search/views/result-tabs-order-template-view.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/result-tabs-order-template-view.html",
    "<div>\n" +
    "    <ul class=\"nav nav-pills pull-left voffset2\" test-ref=\"search-counts\">\n" +
    "        <li role=\"presentation\" ng-repeat=\"res in resultTabsOrder\"\n" +
    "            ng-class=\"{active: activeTarget[targetTypeMap[res]].active && resultTabsOrder.length >= 1}\"\n" +
    "            ng-if=\"options[targetTypeMap[res]].showSearchTab\" class=\"{{targetTypeMap[res]}}\">\n" +
    "            <a href\n" +
    "               ng-click=\"selectType(targetTypeMap[res])\" ng-if=\"resultTabsOrder.length > 1\">\n" +
    "                {{targetTypeMap[res] | translate}}\n" +
    "                <span class=\"badge hoffset1\" test-ref=\"{{targetTypeMap[res]}}\"><small>{{getTotalHits(res) | localizedNumber}}</small></span>\n" +
    "            </a>\n" +
    "            <a href style=\"cursor: default;\" ng-if=\"resultTabsOrder.length === 1\">\n" +
    "                {{targetTypeMap[res] | translate}}\n" +
    "                <span class=\"badge hoffset1\" test-ref=\"{{targetTypeMap[res]}}\"><small>{{getTotalHits(res) | localizedNumber}}</small></span>\n" +
    "            </a>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "</div>");
}]);

angular.module("search/views/search-layout.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/search-layout.html",
    "<div>\n" +
    "  <div class=\"alert alert-warning\" ng-if=\"!isSearchAvailable\">\n" +
    "    <span translate>search.search-not-available</span>\n" +
    "  </div>\n" +
    "  <div ng-if=\"isSearchAvailable\">\n" +
    "    <div class=\"container alert-fixed-position\">\n" +
    "      <obiba-alert id=\"SearchController\"></obiba-alert>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"alert-growl-container\">\n" +
    "      <obiba-alert id=\"SearchControllerGrowl\"></obiba-alert>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"searchHeaderTemplateUrl\" ng-include=\"searchHeaderTemplateUrl\"></div>\n" +
    "\n" +
    "    <div ng-switch on=\"search.layout\">\n" +
    "      <div ng-switch-when=\"layout1\">\n" +
    "        <ng-include  src=\"'search/views/search.html'\"></ng-include>\n" +
    "      </div>\n" +
    "      <div ng-switch-default>\n" +
    "        <ng-include src=\"'search/views/search2.html'\"></ng-include>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("search/views/search-result-coverage-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/search-result-coverage-template.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div ng-show=\"display === 'coverage'\">\n" +
    "  <coverage-result-table\n" +
    "    result=\"result.coverage\"\n" +
    "    loading=\"loading\"\n" +
    "    bucket=\"bucket\"\n" +
    "    query=\"query\"\n" +
    "    criteria=\"criteria\"\n" +
    "    class=\"voffset2\"\n" +
    "    on-update-criteria=\"onUpdateCriteria\"\n" +
    "    on-remove-criteria=\"onRemoveCriteria\"></coverage-result-table>\n" +
    "</div>\n" +
    "");
}]);

angular.module("search/views/search-result-graphics-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/search-result-graphics-template.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div ng-show=\"display === 'graphics'\">\n" +
    "  <graphics-result on-update-criteria=\"onUpdateCriteria\" result=\"result.graphics\" loading=\"loading\" class=\"voffset2 graphics-tab\"></graphics-result>\n" +
    "</div>");
}]);

angular.module("search/views/search-result-list-dataset-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/search-result-list-dataset-template.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div class=\"tab-pane\" ng-show=\"options.datasets.showSearchTab\" ng-class=\"{'active': activeTarget.datasets.active}\">\n" +
    "  <datasets-result-table lang=\"lang\" loading=\"loading\" on-update-criteria=\"onUpdateCriteria\"\n" +
    "      summaries=\"result.list.datasetResultDto['obiba.mica.DatasetResultDto.result'].datasets\"></datasets-result-table>\n" +
    "</div>\n" +
    "");
}]);

angular.module("search/views/search-result-list-network-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/search-result-list-network-template.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div class=\"tab-pane\" ng-show=\"options.networks.showSearchTab\" ng-class=\"{'active': activeTarget.networks.active}\">\n" +
    "  <networks-result-table lang=\"lang\" loading=\"loading\" on-update-criteria=\"onUpdateCriteria\"\n" +
    "      summaries=\"result.list.networkResultDto['obiba.mica.NetworkResultDto.result'].networks\"></networks-result-table>\n" +
    "</div>\n" +
    "");
}]);

angular.module("search/views/search-result-list-study-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/search-result-list-study-template.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div class=\"tab-pane\" ng-show=\"options.studies.showSearchTab\" ng-class=\"{'active': activeTarget.studies.active}\">\n" +
    "  <studies-result-table lang=\"lang\" loading=\"loading\" on-update-criteria=\"onUpdateCriteria\"\n" +
    "      summaries=\"result.list.studyResultDto['obiba.mica.StudyResultDto.result'].summaries\"></studies-result-table>\n" +
    "</div>");
}]);

angular.module("search/views/search-result-list-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/search-result-list-template.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div ng-show=\"display === 'list'\" class=\"list-table\">\n" +
    "    <result-tabs-order-count\n" +
    "            options=\"options\"\n" +
    "            result-tabs-order=\"resultTabsOrder\"\n" +
    "            active-target=\"activeTarget\"\n" +
    "            target-type-map=\"targetTypeMap\">\n" +
    "    </result-tabs-order-count>\n" +
    "    <div class=\"voffset2\" ng-class=\"{'pull-right': options.studies.showSearchTab, 'pull-left': !options.studies.showSearchTab, 'hoffset2': !options.studies.showSearchTab}\">\n" +
    "        <a obiba-file-download url=\"getStudySpecificReportUrl()\" target=\"_self\" ng-if=\"type=='studies'\" download class=\"btn btn-info\" href>\n" +
    "            <i class=\"fa fa-download\"></i> {{'report-group.study.button-name' | translate}}\n" +
    "        </a>\n" +
    "        <a obiba-file-download url=\"getReportUrl()\" target=\"_self\" download class=\"btn btn-info\" href>\n" +
    "            <i class=\"fa fa-download\"></i> {{'download' | translate}}\n" +
    "        </a>\n" +
    "    </div>\n" +
    "    <div class=\"clearfix\" ng-if=\"options.studies.showSearchTab\"/>\n" +
    "    <div class=\"tab-content\">\n" +
    "        <div class=\"pull-left\" study-filter-shortcut ng-if=\"options.studies.showSearchTab && options.studies.studiesColumn.showStudiesTypeColumn\"></div>\n" +
    "        <div ng-repeat=\"res in resultTabsOrder\" ng-show=\"activeTarget[targetTypeMap[res]].active\" class=\"pull-right voffset2\" test-ref=\"pager\">\n" +
    "          <span search-result-pagination\n" +
    "                target=\"activeTarget[targetTypeMap[res]].name\"\n" +
    "                total-hits=\"activeTarget[targetTypeMap[res]].totalHits\"\n" +
    "                on-change=\"onPaginate\"></span>\n" +
    "        </div>\n" +
    "        <div class=\"clearfix\"/>\n" +
    "        <ng-include include-replace ng-repeat=\"res in resultTabsOrder\"\n" +
    "                    src=\"'search/views/search-result-list-' + res + '-template.html'\"></ng-include>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("search/views/search-result-list-variable-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/search-result-list-variable-template.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div class=\"tab-pane\" ng-show=\"options.variables.showSearchTab\" ng-class=\"{'active': activeTarget.variables.active}\">\n" +
    "  <variables-result-table lang=\"lang\" loading=\"loading\"\n" +
    "      summaries=\"result.list.variableResultDto['obiba.mica.DatasetVariableResultDto.result'].summaries\"></variables-result-table>\n" +
    "</div>\n" +
    "");
}]);

angular.module("search/views/search-result-panel-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/search-result-panel-template.html",
    "<div class=\"search-result-tabs\">\n" +
    "  <ng-include include-replace ng-repeat=\"tab in searchTabsOrder\"\n" +
    "              src=\"getUrlTemplate(tab)\"></ng-include>\n" +
    "</div>\n" +
    "");
}]);

angular.module("search/views/search-study-filter-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/search-study-filter-template.html",
    "<div class=\"voffset2\">\n" +
    "  <div class=\"btn btn-group\" style=\"padding: 0\">\n" +
    "    <label class=\"btn btn-sm btn-study\" ng-model=\"studyFilterSelection.selection\" uib-btn-radio=\"'all'\" translate>all</label>\n" +
    "    <label class=\"btn btn-sm btn-study\" ng-model=\"studyFilterSelection.selection\" uib-btn-radio=\"'individual'\" translate>search.coverage-buckets.individual</label>\n" +
    "    <label class=\"btn btn-sm btn-study\" ng-model=\"studyFilterSelection.selection\" uib-btn-radio=\"'harmonization'\" translate>search.coverage-buckets.harmonization</label>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("search/views/search.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/search.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div ng-show=\"inSearchMode()\">\n" +
    "  <div class=\"row voffset2\">\n" +
    "    <div class=\"col-md-3\" ng-if=\"hasFacetedTaxonomies\" >\n" +
    "      <!-- Search Facets region -->\n" +
    "      <taxonomies-facets-panel id=\"search-facets-region\" faceted-taxonomies=\"facetedTaxonomies\" criteria=\"search.criteria\" on-select-term=\"onSelectTerm\"\n" +
    "                    on-refresh=\"refreshQuery\" lang=\"lang\"></taxonomies-facets-panel>\n" +
    "    </div>\n" +
    "    <div class=\"{{hasFacetedTaxonomies ? 'col-md-9' : 'col-md-12'}}\">\n" +
    "\n" +
    "      <!-- Search box region -->\n" +
    "      <div id=\"search-region\" class=\"{{tabs && tabs.length>1 ? 'tab-content voffset4' : ''}}\">\n" +
    "        <div ng-if=\"options.showSearchBox\" id=\"search-box-region\" class=\"{{hasFacetedTaxonomies ? '' : 'row'}}\">\n" +
    "          <div class=\"{{hasFacetedTaxonomies ? '' : 'col-md-3'}}\"></div>\n" +
    "          <div class=\"{{hasFacetedTaxonomies ? '' : 'col-md-6'}}\">\n" +
    "            <script type=\"text/ng-template\" id=\"customTemplate.html\">\n" +
    "              <a ng-if=\"match.model.id\">\n" +
    "                <table style=\"border:none;\">\n" +
    "                  <tbody>\n" +
    "                  <tr>\n" +
    "                    <td style=\"min-width: 30px;\">\n" +
    "                  <span title=\"{{match.model.target + '-classifications' | translate}}\">\n" +
    "                    <i class=\"{{'i-obiba-large i-obiba-' + match.model.target}}\"></i>\n" +
    "                  </span>\n" +
    "                    </td>\n" +
    "                    <td>\n" +
    "                  <span\n" +
    "                          uib-popover-html=\"match.model.itemDescription | uibTypeaheadHighlight:query\"\n" +
    "                          popover-title=\"{{match.model.itemTitle}}\"\n" +
    "                          popover-placement=\"bottom\"\n" +
    "                          popover-trigger=\"'mouseenter'\"\n" +
    "                          ng-bind-html=\"match.model.itemTitle | uibTypeaheadHighlight:query\">\n" +
    "                  </span>\n" +
    "                      <small class=\"help-block no-margin\" title=\"{{match.model.itemParentDescription}}\">\n" +
    "                        {{match.model.itemParentTitle}}\n" +
    "                      </small>\n" +
    "                    </td>\n" +
    "                  </tr>\n" +
    "                  </tbody>\n" +
    "                </table>\n" +
    "              </a>\n" +
    "              <a ng-if=\"!match.model.id\" class=\"{{match.model.status}}\">\n" +
    "                <small class=\"help-block no-margin\">\n" +
    "                  {{match.model.message}}\n" +
    "                </small>\n" +
    "              </a>\n" +
    "            </script>\n" +
    "          <span class=\"input-group input-group-sm\">\n" +
    "            <span class=\"input-group-btn\" uib-dropdown>\n" +
    "              <button type=\"button\" class=\"btn btn-primary\" uib-dropdown-toggle>\n" +
    "                {{'taxonomy.target.' + (documents.search.target ? documents.search.target : 'all')| translate}} <span\n" +
    "                      class=\"caret\"></span>\n" +
    "              </button>\n" +
    "              <ul uib-dropdown-menu role=\"menu\">\n" +
    "                <li>\n" +
    "                  <a href ng-click=\"selectSearchTarget()\" translate>taxonomy.target.all</a>\n" +
    "                </li>\n" +
    "                <li ng-repeat=\"target in targets\" role=\"menuitem\"><a href ng-click=\"selectSearchTarget(target)\">{{'taxonomy.target.'\n" +
    "                  + target | translate}}</a></li>\n" +
    "              </ul>\n" +
    "            </span>\n" +
    "            <input type=\"text\" ng-model=\"search.selectedCriteria\"\n" +
    "                   placeholder=\"{{'search.placeholder.' + (documents.search.target ? documents.search.target : 'all') | translate}}\"\n" +
    "                   uib-typeahead=\"criteria for criteria in searchCriteria($viewValue)\"\n" +
    "                   typeahead-min-length=\"2\"\n" +
    "                   typeahead-loading=\"documents.search.active\"\n" +
    "                   typeahead-template-url=\"customTemplate.html\"\n" +
    "                   typeahead-on-select=\"selectCriteria($item)\"\n" +
    "                   class=\"form-control\">\n" +
    "            <span class=\"input-group-addon\"><i class=\"fa fa-search\"></i></span>\n" +
    "            <span ng-if=\"options.SearchHelpLinkUrl\" class=\"input-group-btn\">\n" +
    "              <a type=\"button\" target=\"_blank\" class=\"btn btn-default\" href=\"{{options.SearchHelpLinkUrl}}\">\n" +
    "                <span class=\"fa fa-question-circle\"></span> {{options.SearchHelpLinkLabel}}</a>\n" +
    "            </span>\n" +
    "          </span>\n" +
    "\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div ng-if=\"options.showSearchBrowser\" id=\"search-selector-region\" class=\"{{hasFacetedTaxonomies ? '' : 'row'}}\">\n" +
    "          <div class=\"{{hasFacetedTaxonomies ? '' : 'col-md-3'}}\"></div>\n" +
    "          <div class=\"{{hasFacetedTaxonomies ? '' : 'col-md-6'}}\">\n" +
    "            <small>\n" +
    "              <ul class=\"nav nav-pills taxo-element\">\n" +
    "                <li ng-if=\"hasClassificationsTitle\">\n" +
    "                  <label class=\"nav-label\" translate>search.classifications-title</label>\n" +
    "                </li>\n" +
    "                <li ng-repeat=\"t in taxonomyNav track by $index\" title=\"{{translateTaxonomyNav(t, 'description')}}\">\n" +
    "                  <a href ng-click=\"showTaxonomy(t.target, t.name)\" ng-if=\"!t.terms\">{{translateTaxonomyNav(t, 'title')}}</a>\n" +
    "            <span uib-dropdown ng-if=\"t.terms\">\n" +
    "              <ul class=\"nav nav-pills\">\n" +
    "                <li>\n" +
    "                  <a href uib-dropdown-toggle>{{translateTaxonomyNav(t, 'title')}} <span class=\"caret\"></span></a>\n" +
    "                </li>\n" +
    "              </ul>\n" +
    "              <ul uib-dropdown-menu class=\"innerul\">\n" +
    "                <li ng-repeat=\"st in t.terms\">\n" +
    "                  <a href ng-click=\"showTaxonomy(t.target, st.name)\" title=\"{{translateTaxonomyNav(st, 'description')}}\">{{translateTaxonomyNav(st, 'title')}}</a>\n" +
    "                </li>\n" +
    "              </ul>\n" +
    "            </span>\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                  <a href ng-click=\"goToClassifications()\" title=\"{{'search.classifications-show' | translate}}\">\n" +
    "                    <span ng-if=\"hasClassificationsLinkLabel\" translate>search.classifications-link</span>\n" +
    "                    <i class=\"fa fa-ellipsis-h\" ng-if=\"!hasClassificationsLinkLabel\"></i>\n" +
    "                  </a>\n" +
    "                </li>\n" +
    "              </ul>\n" +
    "            </small>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <taxonomies-panel ng-if=\"options.showSearchBrowser\" taxonomy-name=\"taxonomyName\" target=\"target\" on-select-term=\"onSelectTerm\"\n" +
    "                          on-close=\"clearTaxonomy\" lang=\"lang\" taxonomies-shown=\"taxonomiesShown\"></taxonomies-panel>\n" +
    "      </div>\n" +
    "\n" +
    "      <div ng-if=\"hasFacetedTaxonomies && hasFacetedNavigationHelp && !(search.criteria.children && search.criteria.children.length > 0)\">\n" +
    "        <p class=\"help-block\" translate>search.faceted-navigation-help</p>\n" +
    "      </div>\n" +
    "\n" +
    "      <!-- Search criteria region -->\n" +
    "      <search-criteria-region options=\"options\" search=\"search\"> </search-criteria-region>\n" +
    "\n" +
    "      <!-- Search Results region -->\n" +
    "      <div id=\"search-result-region\" class=\"voffset3 can-full-screen\" ng-if=\"canExecuteWithEmptyQuery()\" fullscreen=\"isFullscreen\">\n" +
    "        <div ng-if=\"searchTabsOrder.length > 1\">\n" +
    "          <a href class=\"btn btn-sm btn-default pull-right\" ng-click=\"toggleFullscreen()\">\n" +
    "            <i class=\"glyphicon\" ng-class=\"{'glyphicon-resize-full': !isFullscreen, 'glyphicon-resize-small': isFullscreen}\"></i>\n" +
    "          </a>\n" +
    "          <ul class=\"nav nav-tabs voffset2\">\n" +
    "            <li role=\"presentation\" ng-repeat=\"tab in searchTabsOrder\" ng-class=\"{active: search.display === tab}\">\n" +
    "              <a href ng-click=\"selectDisplay(tab)\">{{ 'search.' + tab | translate}}</a>\n" +
    "            </li>\n" +
    "          </ul>\n" +
    "        </div>\n" +
    "        <div translate>{{'search.' + search.display + '-help'}}</div>\n" +
    "        <result-panel display=\"search.display\"\n" +
    "                      type=\"search.type\"\n" +
    "                      bucket=\"search.bucket\"\n" +
    "                      criteria=\"search.criteria\"\n" +
    "                      query=\"search.executedQuery\"\n" +
    "                      result=\"search.result\"\n" +
    "                      loading=\"search.loading\"\n" +
    "                      on-update-criteria=\"onUpdateCriteria\"\n" +
    "                      on-remove-criteria=\"onRemoveCriteria\"\n" +
    "                      on-type-changed=\"onTypeChanged\"\n" +
    "                      on-bucket-changed=\"onBucketChanged\"\n" +
    "                      on-paginate=\"onPaginate\"\n" +
    "                      search-tabs-order=\"searchTabsOrder\"\n" +
    "                      result-tabs-order=\"resultTabsOrder\"\n" +
    "                      lang=\"lang\"></result-panel>\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("search/views/search2.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/views/search2.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div ng-show=\"inSearchMode()\">\n" +
    "\n" +
    "  <!-- Search criteria region -->\n" +
    "  <search-criteria-region options=\"options\" search=\"search\"></search-criteria-region>\n" +
    "  <div ng-class=\"{'overlay-back-on': search.showTaxonomyPanel}\">\n" +
    "  </div>\n" +
    "  <div ng-class=\"{'overlay-front-on': search.showTaxonomyPanel}\">\n" +
    "    <div class=\"row voffset2\">\n" +
    "      <div class=\"col-md-3\" ng-if=\"hasFacetedTaxonomies\">\n" +
    "        <!-- Search Facets region -->\n" +
    "        <taxonomies-facets-panel id=\"search-facets-region\" faceted-taxonomies=\"facetedTaxonomies\"\n" +
    "                                criteria=\"search.criteria\" on-select-term=\"onSelectTerm\"\n" +
    "                                on-refresh=\"refreshQuery\" lang=\"lang\"></taxonomies-facets-panel>\n" +
    "      </div>\n" +
    "      <div class=\"col-md-3\" ng-if=\"!hasFacetedTaxonomies\">\n" +
    "        <!-- Search Facets region -->\n" +
    "        <meta-taxonomy-filter-panel\n" +
    "            show-taxonomy-panel=\"search.showTaxonomyPanel\"\n" +
    "            tabs=\"targetTabsOrder\"\n" +
    "            rql-query=\"search.rqlQuery\"\n" +
    "            on-toggle=\"onTaxonomyFilterPanelToggleVisibility(target, taxonomy)\"></meta-taxonomy-filter-panel>\n" +
    "      </div>\n" +
    "      <div class=\"col-md-9\">\n" +
    "        <div\n" +
    "            ng-if=\"hasFacetedTaxonomies && hasFacetedNavigationHelp && !(search.criteria.children && search.criteria.children.length > 0)\">\n" +
    "          <p class=\"help-block\" translate>search.faceted-navigation-help</p>\n" +
    "        </div>\n" +
    "        <!-- Search Results region -->\n" +
    "        <div class=\"panel panel-default\" ng-if=\"search.showTaxonomyPanel\">\n" +
    "          <taxonomy-filter-panel\n" +
    "              show-taxonomy-panel=\"search.showTaxonomyPanel\"\n" +
    "              result-tabs-order=\"resultTabsOrder\"\n" +
    "              taxonomy-type-map=\"taxonomyTypeMap\"\n" +
    "              result=\"search.countResult\"\n" +
    "              target=\"search.selectedTarget\"\n" +
    "              taxonomy=\"search.selectedTaxonomy\"\n" +
    "              on-select-type=\"onTypeChanged(type)\"\n" +
    "              on-select-term=\"onSelectTerm(target, taxonomy, vocabulary, args)\"\n" +
    "              on-remove-criterion=\"removeCriteriaItem(item)\"\n" +
    "              on-toggle=\"onTaxonomyFilterPanelToggleVisibility\"></taxonomy-filter-panel>\n" +
    "        </div>\n" +
    "        <div class=\"clearfix\"></div>\n" +
    "        <div id=\"search-result-region\" class=\"can-full-screen\"\n" +
    "            ng-if=\"!search.showTaxonomyPanel && canExecuteWithEmptyQuery()\" fullscreen=\"isFullscreen\">\n" +
    "          <div ng-if=\"searchTabsOrder.length > 1\">\n" +
    "            <a href class=\"btn btn-sm btn-default pull-right\" ng-click=\"toggleFullscreen()\">\n" +
    "              <i class=\"glyphicon\"\n" +
    "                ng-class=\"{'glyphicon-resize-full': !isFullscreen, 'glyphicon-resize-small': isFullscreen}\"></i>\n" +
    "            </a>\n" +
    "            <ul class=\"nav nav-tabs\">\n" +
    "              <li role=\"presentation\" ng-repeat=\"tab in searchTabsOrder\"\n" +
    "                  ng-class=\"{active: search.display === tab}\">\n" +
    "                <a href ng-click=\"selectDisplay(tab)\">{{ 'search.' + tab | translate}}</a>\n" +
    "              </li>\n" +
    "            </ul>\n" +
    "          </div>\n" +
    "          <div translate>{{'search.' + search.display + '-help'}}</div>\n" +
    "          <result-panel display=\"search.display\"\n" +
    "                        type=\"search.type\"\n" +
    "                        bucket=\"search.bucket\"\n" +
    "                        criteria=\"search.criteria\"\n" +
    "                        query=\"search.executedQuery\"\n" +
    "                        result=\"search.result\"\n" +
    "                        loading=\"search.loading\"\n" +
    "                        on-update-criteria=\"onUpdateCriteria\"\n" +
    "                        on-remove-criteria=\"onRemoveCriteria\"\n" +
    "                        on-type-changed=\"onTypeChanged\"\n" +
    "                        on-bucket-changed=\"onBucketChanged\"\n" +
    "                        on-paginate=\"onPaginate\"\n" +
    "                        search-tabs-order=\"searchTabsOrder\"\n" +
    "                        result-tabs-order=\"resultTabsOrder\"\n" +
    "                        lang=\"lang\"></result-panel>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("utils/views/unsaved-modal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("utils/views/unsaved-modal.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div class=\"modal-content\">\n" +
    "    <div class=\"modal-header\">\n" +
    "        <h4 class=\"modal-title\" translate>unsaved-title</h4>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body\" translate>\n" +
    "        unsaved-prompt\n" +
    "    </div>\n" +
    "    <div class=\"modal-footer\">\n" +
    "        <button class=\"btn btn-default\" type=\"button\" ng-click=\"cancel()\" translate>cancel</button>\n" +
    "        <button class=\"btn btn-primary\" type=\"button\" ng-click=\"ok()\" translate>ok</button>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("views/pagination-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/pagination-template.html",
    "<!--\n" +
    "  ~ Copyright (c) 2018 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<ul class=\"pagination no-margin pagination-sm\" ng-if=\"1 < pages.length\">\n" +
    "  <li ng-if=\"boundaryLinks\" ng-class=\"{ disabled : pagination.current == 1 }\">\n" +
    "    <a href=\"\" ng-click=\"setCurrent(1)\">&laquo;</a>\n" +
    "  </li>\n" +
    "  <li ng-if=\"directionLinks\" ng-class=\"{ disabled : pagination.current == 1 }\">\n" +
    "    <a href=\"\" ng-click=\"setCurrent(pagination.current - 1)\">&lsaquo;</a>\n" +
    "  </li>\n" +
    "  <li ng-repeat=\"pageNumber in pages track by $index\" ng-class=\"{ active : pagination.current == pageNumber, disabled : pageNumber == '...' }\">\n" +
    "    <a href=\"\" ng-click=\"setCurrent(pageNumber)\">{{ pageNumber }}</a>\n" +
    "  </li>\n" +
    "  <li ng-if=\"directionLinks\" ng-class=\"{ disabled : pagination.current == pagination.last }\">\n" +
    "    <a href=\"\" ng-click=\"setCurrent(pagination.current + 1)\">&rsaquo;</a>\n" +
    "  </li>\n" +
    "  <li ng-if=\"boundaryLinks\" ng-class=\"{ disabled : pagination.current == pagination.last }\">\n" +
    "    <a ng-class=\"round-border\" href=\"\" ng-click=\"setCurrent(pagination.last)\">&raquo;</a>\n" +
    "  </li>\n" +
    "</ul>\n" +
    "\n" +
    "\n" +
    "<ul class=\"pagination no-margin pagination-sm\" ng-if=\"1 < pages.length\">\n" +
    "  <li>\n" +
    "    <a href=\"\" class=\"pagination-total\" ng-if=\"1 < pages.length\" class=\"pagination-total\"><span>{{ range.lower }} - {{ range.upper }} </span><span translate>pagination.of</span><span> {{ range.total }}</span></a>\n" +
    "  </li>\n" +
    "</ul>");
}]);
