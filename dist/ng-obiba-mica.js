/*!
 * ng-obiba-mica - v4.5.0
 * https://github.com/obiba/ng-obiba-mica
 *
 * License: GNU Public License version 3
 * Date: 2023-03-02
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
/* exported NgObibaMicaTemplateUrlFactory */
function NgObibaMicaTemplateUrlFactory() {
    var templates = {
        'searchStudiesResultTable': 'search/components/result/studies-result-table/component.html',
        'searchNetworksResultTable': 'search/components/result/networks-result-table/component.html',
        'searchDatasetsResultTable': 'search/components/result/datasets-result-table/component.html',
        'searchCriteriaRegionTemplate': 'search/components/criteria/item-region/region/component.html',
        'vocabularyFilterDetailHeading': 'search/components/vocabulary-filter-detail-heading/component.html',
        'CriterionDropdownTemplate': 'search/components/criteria/item-region/dropdown/component.html',
        'searchResultList': 'search/components/result/search-result/list.html',
        'searchInputList': 'lists/views/input-search-widget/input-search-widget-template.html',
        'variableCrosstab': 'analysis/crosstab/views/crosstab-variable-crosstab.html',
        'variableFrequencies': 'analysis/crosstab/views/crosstab-variable-frequencies.html',
        'variableFrequenciesEmpty': 'analysis/crosstab/views/crosstab-variable-frequencies-empty.html',
        'variableStatistics': 'analysis/crosstab/views/crosstab-variable-statistics.html',
        'variableStatisticsEmpty': 'analysis/crosstab/views/crosstab-variable-statistics-empty.html',
        'searchCellStatValue': 'search/components/result/cell-stat-value/component.html',
        'graphicTableDirectiveTemplate': 'graphics/views/tables-directive.html'
    };
    var factory = { registry: null };
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
}
(function () {
    ngObibaMica = angular.module('ngObibaMica', [
        'schemaForm',
        'ngCookies',
        'obiba.mica.utils',
        'obiba.mica.file',
        'obiba.mica.attachment',
        'obiba.mica.access',
        'obiba.mica.search',
        'obiba.mica.analysis',
        'obiba.mica.sets',
        'obiba.mica.localized',
        'obiba.mica.fileBrowser',
        'angularUtils.directives.dirPagination'
    ]);
    function ServerConfigResourceProvider() {
        var provider = this;
        function setFactory(value) {
            provider.$get = value;
        }
        /**
         * Default
         */
        provider.$get = function () {
            throw new Error('The provider factory method $get() must be overridden by client code.');
        };
        /**
         * Clients can override the $get() method to provide their MicaConfigResource object.
         * @type {setFactory}
         */
        provider.setFactory = setFactory;
    }
    function NgObibaMicaUrlProvider() {
        var registry = {
            'DataAccessClientDetailPath': '',
            'DataAccessClientListPath': '',
            'DataAccessFormConfigResource': 'ws/config/data-access-form',
            'DataAccessAmendmentFormConfigResource': 'ws/config/data-access-amendment-form',
            'DataAccessRequestsResource': 'ws/data-access-requests',
            'DataAccessAmendmentsResource': 'ws/data-access-request/:parentId/amendments',
            'DataAccessAmendmentResource': 'ws/data-access-request/:parentId/amendment/:id',
            'DataAccessRequestsExportHistoryResource': 'ws/data-access-requests/_history?lang=:lang',
            'DataAccessRequestsExportCsvResource': 'ws/data-access-requests/csv?lang=:lang',
            'DataAccessRequestResource': 'ws/data-access-request/:id',
            'DataAccessRequestStartDateResource': 'ws/data-access-request/:id/_start-date?date=:date',
            'DataAccessRequestActionLogsResource': 'ws/data-access-request/:id/_log-actions',
            'DataAccessAmendmentsLogHistoryResource': 'ws/data-access-request/:id/amendments/_history',
            'DataAccessRequestAttachmentsUpdateResource': 'ws/data-access-request/:id/_attachments',
            'DataAccessRequestAttachmentDownloadResource': 'ws/data-access-request/:id/attachments/:attachmentId/_download',
            'SchemaFormAttachmentDownloadResource': '/ws/:path/form/attachments/:attachmentName/:attachmentId/_download',
            'DataAccessRequestDownloadPdfResource': '/ws/data-access-request/:id/_pdf',
            'DataAccessRequestCommentsResource': 'ws/data-access-request/:id/comments?admin=:admin',
            'DataAccessRequestCommentResource': 'ws/data-access-request/:id/comment/:commentId',
            'DataAccessRequestStatusResource': 'ws/data-access-request/:id/_status?to=:status',
            'DataAccessAmendmentStatusResource': 'ws/data-access-request/:parentId/amendment/:id/_status?to=:status',
            'TempFileUploadResource': 'ws/files/temp',
            'TempFileResource': 'ws/files/temp/:id',
            'MetaTaxonomyResource': 'ws/meta-taxonomy',
            'MetaTaxonomyMoveResource': 'ws/meta-taxonomy/:target/:taxonomy/_move?dir=:dir',
            'MetaTaxonomyAttributeResource': 'ws/meta-taxonomy/:target/:taxonomy/_attribute?name=:name&value=:value',
            'TaxonomiesSearchResource': 'ws/taxonomies/_search',
            'TaxonomiesResource': 'ws/taxonomies/_filter',
            'TaxonomyResource': 'ws/taxonomy/:taxonomy/_filter',
            'VocabularyResource': 'ws/taxonomy/:taxonomy/vocabulary/:vocabulary/_filter',
            'VariableResource': 'ws/variable/:id',
            'VariableSummaryResource': 'ws/variable/:id/summary',
            'CartPage': '#/cart',
            'SetsPage': '#/sets',
            'SetsResource': 'ws/:type/sets',
            'SetsImportResource': 'ws/:type/sets/_import',
            'SetResource': 'ws/:type/set/:id',
            'SetClearResource': 'ws/:type/set/:id/documents',
            'SetDocumentsResource': 'ws/:type/set/:id/documents?from=:from&limit=:limit',
            'SetExistsResource': 'ws/:type/set/:id/document/:did/_exists',
            'SetImportResource': 'ws/:type/set/:id/documents/_import',
            'SetImportQueryResource': 'ws/:type/set/:id/documents/_rql',
            'SetRemoveResource': 'ws/:type/set/:id/documents/_delete',
            'SetOpalExportResource': 'ws/:type/set/:id/documents/_opal',
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
            'StudyDcePage': '#/:type/:study/dce-id-:dce',
            'DatasetPage': '#/:type/:dataset',
            'BaseUrl': '',
            'FileBrowserFileResource': 'ws/file/:path/',
            'FileBrowserSearchResource': 'ws/files-search/:path',
            'FileBrowserDownloadUrl': 'ws/draft/file-dl/:path?inline=:inline',
            'SearchBaseUrl': '#/search',
            'DocumentSuggestion': 'ws/:documentType/_suggest',
            'EntitiesCountResource': 'ws/datasets/entities/_count?query=:query',
            'EntitiesCountBaseUrl': '#/entities-count',
            'DatasetCategoricalVariablesResource': 'ws/:dsType/:dsId/variables/:query/categorical',
            'DatasetVariablesResource': 'ws/:dsType/:dsId/variables/:query',
            'DatasetVariableResource': 'ws/variable/:varId',
            'DatasetVariablesCrosstabResource': 'ws/:dsType/:dsId/variables/cross/:v1/by/:v2',
            'DatasetResource': 'ws/dataset/:dsType/:dsId',
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
            $provide.provider('ngObibaMicaUrl', NgObibaMicaUrlProvider);
            $provide.provider('ObibaServerConfigResource', ServerConfigResourceProvider);
            paginationTemplateProvider.setPath('views/pagination-template.html');
        }]);
})();
//# sourceMappingURL=ng-obiba-mica.js.map
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
    ngObibaMica.utils = angular.module('obiba.mica.utils', ['schemaForm', 'LocalStorageModule']);
    ngObibaMica.utils
        .factory('urlEncode', function () {
        return function (input) {
            return window.encodeURIComponent(input);
        };
    })
        .factory('MathFunction', function () {
        return {
            round: function (value, decimal) {
                return +(Math.round(value + 'e+' + decimal) + 'e-' + decimal);
            }
        };
    })
        .service('GraphicChartsConfigurations', function () {
        this.getClientConfig = function () {
            return true;
        };
        this.setClientConfig = function () {
            return true;
        };
    })
        .directive('fixedHeader', ['$timeout', '$window', function ($timeout, $window) {
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
                        return (style.display !== 'none' && el.offsetWidth !== 0);
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
                                var columnWidth = Math.ceil(elem.querySelectorAll('thead')[0].offsetWidth / (elem.querySelectorAll('thead th').length || 1));
                                if (tdElems) {
                                    tdElems.style.width = columnWidth + 'px';
                                }
                                if (thElem) {
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
                                lastColumn.style.width = (parseInt(lastColumn.style.width.replace('px', '')) - scrollBarWidth) + 'px';
                            }
                            $scope.redraw = false;
                        });
                    }
                    // watch table content change
                    $scope.$watchGroup(['trigger', isTableReady], function (newValue) {
                        if (newValue[1] === true) {
                            redrawTable();
                        }
                    });
                    // Re-draw table on sorting table
                    $scope.$on('ngObibaTableSortUpdate', redrawTable);
                    // Re-draw table on left panel close/open
                    $scope.$on('ngObibaMicaLeftPaneToggle', redrawTable);
                    // Re-draw table on resize browser window
                    window.addEventListener('resize', redrawTable);
                    $scope.$on('$destroy', function () {
                        window.document.removeEventListener('resize', redrawTable);
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
                        }
                        else {
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
                observe: function (scope) {
                    if (onLocationChangeOff) {
                        onLocationChangeOff();
                    }
                    onLocationChangeOff = scope.$on('$locationChangeStart', function (event, newUrl) {
                        if (scope.form && scope.form.$dirty) {
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
                unobserve: function () {
                    if (onLocationChangeOff) {
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
                $translate(validationMessages).then(function (result) {
                    deferred.resolve({
                        validationMessage: {
                            302: result.required,
                            'default': result['errors.does-not-validate'],
                            'completed': result['errors.localized.completed']
                        }
                    });
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
                                var wordMax = e.wordLimit;
                                var wordMin = 0;
                                var range = e.wordLimit.split(':');
                                if (range.length > 1) {
                                    wordMin = range[0];
                                    wordMax = range[1];
                                }
                                var wordCount = (value.match(/\S+/g) || []).length;
                                if (wordCount < parseInt(wordMin)) {
                                    return false;
                                }
                                if (wordCount > parseInt(wordMax)) {
                                    return false;
                                }
                            }
                            return true;
                        }
                    };
                });
                form.filter(function (e) {
                    return e.hasOwnProperty('wordMax');
                }).forEach(function (e) {
                    e.$validators = {
                        wordMaxError: function (value) {
                            if (angular.isDefined(value) && value !== null) {
                                var wordCount = (value.match(/\S+/g) || []).length;
                                if (wordCount > parseInt(e.wordMax)) {
                                    return false;
                                }
                            }
                            return true;
                        }
                    };
                });
                form.filter(function (e) {
                    return e.hasOwnProperty('wordMin');
                }).forEach(function (e) {
                    e.$validators = {
                        wordMinError: function (value) {
                            if (angular.isDefined(value) && value !== null) {
                                var wordCount = (value.match(/\S+/g) || []).length;
                                if (wordCount < parseInt(e.wordMin)) {
                                    return false;
                                }
                            }
                            return true;
                        }
                    };
                });
                return form;
            });
        }])
        .config(['localStorageServiceProvider',
        function (localStorageServiceProvider) {
            localStorageServiceProvider
                .setPrefix('mica')
                .setStorageType('localStorage');
        }]);
})();
//# sourceMappingURL=utils.js.map
/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";
var ApplicationCacheService = /** @class */ (function () {
    function ApplicationCacheService($cacheFactory, $log) {
        this.$cacheFactory = $cacheFactory;
        this.$log = $log;
    }
    ApplicationCacheService.prototype.clearCache = function (key) {
        var cache = this.$cacheFactory.get(key);
        if (cache) {
            cache.removeAll();
        }
    };
    ApplicationCacheService.prototype.getCache = function (key) {
        return this.$cacheFactory.get(key);
    };
    ApplicationCacheService.$inject = ["$cacheFactory", "$log"];
    return ApplicationCacheService;
}());
ngObibaMica.utils.service("ApplicationCacheService", ApplicationCacheService);
//# sourceMappingURL=cache-service22.js.map
/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";
var UserProfileModalService = /** @class */ (function () {
    function UserProfileModalService($uibModal, UserProfileService) {
        this.$uibModal = $uibModal;
        this.UserProfileService = UserProfileService;
    }
    UserProfileModalService.prototype.show = function (profile) {
        var applicant = {
            email: this.UserProfileService.getEmail(profile),
            fullName: this.UserProfileService.getFullName(profile),
            profile: profile,
        };
        this.$uibModal.open({
            controller: ["$scope", function ($scope) { return $scope.applicant = applicant; }],
            templateUrl: "utils/services/user-profile-modal/service.html",
        });
    };
    UserProfileModalService.$inject = ["$uibModal", "UserProfileService"];
    return UserProfileModalService;
}());
ngObibaMica.utils.service("UserProfileModalService", UserProfileModalService);
//# sourceMappingURL=service.js.map
/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";
var UserProfileService = /** @class */ (function () {
    function UserProfileService() {
    }
    UserProfileService.prototype.getAttribute = function (attributes, key) {
        return this.getAttibuteValue(attributes, key);
    };
    UserProfileService.prototype.getFullName = function (profile) {
        var firstName = this.getProfileAttributeValue(profile, "firstName");
        var lastName = this.getProfileAttributeValue(profile, "lastName");
        return firstName && lastName ? firstName + " " + lastName : null;
    };
    UserProfileService.prototype.getEmail = function (profile) {
        return this.getProfileAttributeValue(profile, "email");
    };
    UserProfileService.prototype.getProfileAttributeValue = function (profile, key) {
        if (profile) {
            return this.getAttibuteValue(profile.attributes, key);
        }
        return null;
    };
    UserProfileService.prototype.getAttibuteValue = function (attributes, key) {
        if (attributes) {
            var result = attributes.filter(function (attribute) {
                return attribute.key === key;
            });
            return result && result.length > 0 ? result[0].value : null;
        }
        return null;
    };
    return UserProfileService;
}());
ngObibaMica.utils.service("UserProfileService", UserProfileService);
//# sourceMappingURL=user-profile-service.js.map
/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";
var CustomWatchDomElementService = /** @class */ (function () {
    function CustomWatchDomElementService() {
        this.attributes = [];
        var that = this;
    }
    CustomWatchDomElementService.prototype.configWatch = function (node, attributes) {
        this.node = node;
        this.attributes = attributes;
        this.config = { attributeFilter: this.attributes };
        return this;
    };
    CustomWatchDomElementService.prototype.customWatch = function (callback) {
        var observable = function (mutationsList) {
            for (var _i = 0, mutationsList_1 = mutationsList; _i < mutationsList_1.length; _i++) {
                var mutation = mutationsList_1[_i];
                if (mutation.type === "attributes") {
                    callback();
                }
            }
        };
        var observer = new MutationObserver(observable);
        observer.observe(this.node, this.config);
    };
    return CustomWatchDomElementService;
}());
ngObibaMica.utils.service("CustomWatchDomElementService", [CustomWatchDomElementService]);
//# sourceMappingURL=custom-watch-dom-element-service.js.map
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
    function Controller($rootScope, $timeout, LocalizedSchemaFormService, SfOptionsService, JsonUtils) {
        var ctrl = this, scope = $rootScope.$new();
        ctrl.form = {};
        ctrl.sfOptions = {};
        function broadcastSchemaFormRedraw() {
            $timeout(function () {
                ctrl.form = angular.copy(ctrl.form);
                scope.$broadcast('schemaFormRedraw');
                callOnRedraw(true);
            }, 250);
        }
        function validateSchemaParsing(schema, parseErrorCallback) {
            if (Object.getOwnPropertyNames(schema).length === 0) {
                schema = {};
                if (typeof parseErrorCallback === 'function') {
                    parseErrorCallback();
                }
            }
            return schema;
        }
        function validateDefinitionParsing(definition, parseErrorCallback) {
            if (definition.length === 0) {
                definition = [];
                if (typeof parseErrorCallback === 'function') {
                    parseErrorCallback();
                }
            }
            return definition;
        }
        function getParsingErrorCallback(type) {
            if (typeof ctrl.parsingErrorCallbacks !== 'object') {
                return function () { console.error('Error parsing ', type, ctrl.schemaForm); };
            }
            return ctrl.parsingErrorCallbacks[type];
        }
        function callOnRedraw(value) {
            if (typeof ctrl.onRedraw === 'function') {
                ctrl.onRedraw(value);
            }
        }
        function onChanges(changes) {
            if (changes && changes.schemaForm && changes.schemaForm.currentValue) {
                callOnRedraw(false);
                var form = changes.schemaForm.currentValue;
                ctrl.form.definition = validateDefinitionParsing(LocalizedSchemaFormService.translate(JsonUtils.parseJsonSafely(form.definition, [])), getParsingErrorCallback('definition'));
                ctrl.form.schema = validateSchemaParsing(LocalizedSchemaFormService.translate(JsonUtils.parseJsonSafely(form.schema, {})), getParsingErrorCallback('schema'));
                ctrl.form.schema.readonly = ctrl.readOnly;
                SfOptionsService.transform().then(function (options) {
                    ctrl.sfOptions = options;
                    ctrl.sfOptions.pristine = { errors: true, success: false };
                });
            }
            broadcastSchemaFormRedraw();
        }
        ctrl.$onChanges = onChanges;
    }
    angular.module('obiba.mica.utils').component('obibaSchemaFormRenderer', {
        bindings: {
            schemaForm: '<',
            model: '<',
            readOnly: '<',
            parsingErrorCallbacks: '<',
            onRedraw: '<'
        },
        templateUrl: 'utils/components/entity-schema-form/component.html',
        controller: ['$rootScope', '$timeout', 'LocalizedSchemaFormService', 'SfOptionsService', 'JsonUtils', Controller]
    });
})();
//# sourceMappingURL=component.js.map
/*
 * Copyright (c) 2019 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";
var TableAlarmHeaderController = /** @class */ (function () {
    function TableAlarmHeaderController($log) {
        this.$log = $log;
    }
    TableAlarmHeaderController.prototype.selectAll = function () {
        this.onSelectAll({});
    };
    TableAlarmHeaderController.$inject = ["$log"];
    return TableAlarmHeaderController;
}());
var TableAlarmHeaderComponent = /** @class */ (function () {
    function TableAlarmHeaderComponent() {
        this.templateUrl = "utils/components/table-alert-header/component.html";
        this.transclude = false;
        this.transclude = true;
        this.bindings = {
            allSelected: "<",
            onSelectAll: "&",
        };
        this.controller = TableAlarmHeaderController;
        this.controllerAs = "$ctrl";
    }
    return TableAlarmHeaderComponent;
}());
ngObibaMica.utils.component("tableAlertHeader", new TableAlarmHeaderComponent());
//# sourceMappingURL=component.js.map
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
ngObibaMica.file = angular.module('obiba.mica.file', ['ngResource']);
//# sourceMappingURL=file.js.map
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
ngObibaMica.file
    .filter('bytes', function () {
    return function (bytes) {
        return bytes === null || typeof bytes === 'undefined' ? '' : filesize(bytes);
    };
});
//# sourceMappingURL=file-filter.js.map
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
ngObibaMica.file
    .factory('TempFileResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
        return $resource(ngObibaMicaUrl.getUrl('TempFileResource'), {}, {
            'get': { method: 'GET' },
            'delete': { method: 'DELETE' }
        });
    }]);
//# sourceMappingURL=file-service.js.map
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
ngObibaMica.attachment = angular.module('obiba.mica.attachment', [
    'obiba.mica.file',
    'ui.bootstrap',
    'ngFileUpload',
    'templates-ngObibaMica'
]);
//# sourceMappingURL=attachment.js.map
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
ngObibaMica.attachment
    .directive('attachmentList', [function () {
        return {
            restrict: 'E',
            scope: {
                hrefBuilder: '=',
                files: '=',
                emptyMessage: '='
            },
            templateUrl: 'attachment/attachment-list-template.html',
            link: function (scope) {
                scope.attachments = [];
                scope.hrefBuilder = scope.hrefBuilder || function (a) { return a.id; };
                scope.hasAttachments = false;
                scope.$watch('files', function (val) {
                    scope.attachments = [];
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
                onError: '=',
                deleteAttachments: '<'
            },
            templateUrl: 'attachment/attachment-input-template.html',
            controller: 'AttachmentCtrl'
        };
    }])
    .controller('AttachmentCtrl', ['$scope', '$timeout', '$log', 'Upload', 'TempFileResource', 'ngObibaMicaUrl',
    function ($scope, $timeout, $log, Upload, TempFileResource, ngObibaMicaUrl) {
        if ($scope.deleteAttachments === undefined || $scope.deleteAttachments === null) {
            $scope.deleteAttachments = true;
        }
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
            }
            else {
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
                TempFileResource.get({ id: fileId }, function (tempFile) {
                    $log.debug('tempFile', tempFile);
                    attachment.id = tempFile.id;
                    attachment.md5 = tempFile.md5;
                    attachment.justUploaded = true;
                    attachment.timestamps = { created: new Date() };
                    // wait for 1 second before hiding progress bar
                    $timeout(function () { attachment.showProgressBar = false; }, 1000);
                });
            })
                .error(function (response) {
                $log.error('File upload failed: ', JSON.stringify(response, null, 2));
                var index = $scope.files.indexOf(attachment);
                if (index !== -1) {
                    $scope.files.splice(index, 1);
                }
                if ($scope.onError) {
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
            TempFileResource.delete({ id: tempFileId }, function () {
                for (var i = $scope.files.length; i--;) {
                    var attachment = $scope.files[i];
                    if (attachment.justUploaded && attachment.id === tempFileId) {
                        $scope.files.splice(i, 1);
                    }
                }
            });
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
//# sourceMappingURL=attachment-directives.js.map
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
        $provide.provider('ngObibaMicaAccessTemplateUrl', new NgObibaMicaTemplateUrlFactory().create({
            list: { header: null, footer: null },
            view: { header: null, footer: null },
            form: { header: null, footer: null },
            amendmentView: { header: null, footer: null },
            amendmentForm: { header: null, footer: null }
        }));
    }]);
//# sourceMappingURL=data-access-request.js.map
'use strict';
(function () {
    function ActionLogEditorController(SessionProxy, $filter) {
        var ctrl = this;
        ctrl.filterOutItemFromCollection = function (item, collection) {
            return (collection || []).filter(function (element) {
                return element.action !== item.action || element.author !== item.author || element.changedOn !== item.changedOn;
            });
        };
        ctrl.sourceCollectionWithout = function (item) {
            return ctrl.filterOutItemFromCollection(item, ctrl.sourceCollection);
        };
        ctrl.replaceActionNameByTranslationKey = function (item) {
            // replace action translation with key if applicable
            var index = (ctrl.predefinedActionNames || []).indexOf(item.action);
            if (index > -1) {
                item.action = ctrl.predefinedActions[index];
            }
        };
        ctrl.add = function (item) {
            ctrl.showError = false;
            if (item && item.action && item.changedOn) {
                ctrl.replaceActionNameByTranslationKey(item);
                item.changedOn = item.changedOn.toISOString();
                if (!item.author) {
                    item.author = SessionProxy.login();
                }
                var result = ctrl.sourceCollectionWithout(item);
                result.push(item);
                if (ctrl.update && typeof ctrl.update === 'function') {
                    ctrl.update({ logs: result });
                    ctrl.item = {};
                    ctrl.changedOn = null;
                }
                else {
                    console.error('Did not create', item);
                }
            }
            else {
                ctrl.showError = true;
            }
        };
        ctrl.predefinedActionsChanged = function (changes) {
            if (changes.predefinedActions && changes.predefinedActions.currentValue) {
                ctrl.predefinedActionNames = ctrl.predefinedActions.map(function (actionKey) {
                    return $filter('translate')(actionKey);
                });
            }
        };
        ctrl.$onChanges = function (changes) {
            ctrl.predefinedActionsChanged(changes);
        };
    }
    function ActionLogItemEditorController(SessionProxy, $uibModal, $filter) {
        var ctrl = this;
        ActionLogEditorController.call(ctrl, SessionProxy, $filter);
        function isAnActionLog(item) {
            return item && item.hasOwnProperty('action') && item.hasOwnProperty('author') && item.hasOwnProperty('changedOn');
        }
        ctrl.remove = function (item) {
            $uibModal.open({
                templateUrl: 'access/components/action-log/item/delete-modal.html',
                controller: ['$uibModalInstance', 'actionLogItem', function ($uibModalInstance, actionLogItem) { this.item = actionLogItem; }],
                controllerAs: '$modal',
                resolve: {
                    actionLogItem: function () {
                        return { action: $filter('translate')(item.action), author: item.author, changedOn: moment(item.changedOn).calendar() };
                    }
                }
            }).result.then(function () {
                var result = ctrl.sourceCollectionWithout(item);
                if (result.length < ctrl.sourceCollection.length && (ctrl.update && typeof ctrl.update === 'function')) {
                    ctrl.update({ logs: result });
                }
                else {
                    console.error('Did not remove', item);
                }
            });
        };
        ctrl.edit = function (item) {
            $uibModal.open({
                templateUrl: 'access/components/action-log/item/edit-modal.html',
                controller: ['$uibModalInstance', 'actionLogItem', 'predefinedActionNames',
                    function ($uibModalInstance, actionLogItem, predefinedActionNames) {
                        this.item = actionLogItem;
                        this.predefinedActionNames = predefinedActionNames;
                    }],
                controllerAs: '$modal',
                size: 'sm',
                resolve: {
                    actionLogItem: function () {
                        return { action: $filter('translate')(item.action), author: item.author, changedOn: new Date(item.changedOn) };
                    },
                    predefinedActionNames: function () {
                        return ctrl.predefinedActionNames;
                    }
                }
            }).result.then(function (editionResult) {
                ctrl.replaceActionNameByTranslationKey(editionResult);
                editionResult.changedOn = editionResult.changedOn.toISOString();
                if (ctrl.update && typeof ctrl.update === 'function') {
                    var result = ctrl.sourceCollectionWithout(item);
                    result = ctrl.filterOutItemFromCollection(editionResult, result);
                    result.push(editionResult);
                    ctrl.update({ logs: result });
                }
                else {
                    console.error('Did not update', item);
                }
            });
        };
        ctrl.$onChanges = function (changes) {
            ctrl.predefinedActionsChanged(changes);
            ctrl.showButtons = ctrl.item && isAnActionLog(ctrl.item);
        };
    }
    angular.module('obiba.mica.access').component('actionLogEditor', {
        bindings: {
            sourceCollection: '<',
            predefinedActions: '<',
            update: '&'
        },
        templateUrl: 'access/components/action-log/component.html',
        controller: ['SessionProxy', '$filter', ActionLogEditorController]
    });
    angular.module('obiba.mica.access').component('actionLogItemEditor', {
        bindings: {
            item: '<',
            sourceCollection: '<',
            predefinedActions: '<',
            update: '&'
        },
        templateUrl: 'access/components/action-log/item/component.html',
        controller: ['SessionProxy', '$uibModal', '$filter', ActionLogItemEditorController]
    });
})();
//# sourceMappingURL=component.js.map
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
    function Controller($rootScope, DataAccessEntityUrls, DataAccessEntityResource, DataAccessEntityService, NOTIFICATION_EVENTS, SessionProxy, USER_ROLES, ngObibaMicaAccessTemplateUrl, DataAccessRequestConfig, ngObibaMicaUrl, $translate, UserProfileService, UserProfileModalService) {
        var ctrl = this;
        function initializeAddButtonCaption() {
            return ctrl.parentId === null ?
                ctrl.config.newRequestButtonCaption || 'data-access-request.add' :
                'data-access-amendment.add';
        }
        function initializeNoneCaption() {
            return ctrl.parentId === null ? 'data-access-request.none' : 'data-access-amendment.none';
        }
        function onInit() {
            ctrl.headerTemplateUrl = ngObibaMicaAccessTemplateUrl.getHeaderUrl('list');
            ctrl.footerTemplateUrl = ngObibaMicaAccessTemplateUrl.getFooterUrl('list');
            ctrl.config = DataAccessRequestConfig.getOptions();
            ctrl.searchStatus = {};
            ctrl.loading = true;
            ctrl.addButtonCaption = initializeAddButtonCaption();
            ctrl.noneCaption = initializeNoneCaption();
            ctrl.actions = DataAccessEntityService.actions;
            ctrl.showApplicant = SessionProxy.roles().filter(function (role) {
                return [USER_ROLES.dao, USER_ROLES.admin].indexOf(role) > -1;
            }).length > 0;
            var emitter = $rootScope.$new();
            ctrl.$on = angular.bind(emitter, emitter.$on);
            ctrl.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, onConfirmDelete);
            DataAccessEntityService.getStatusFilterData(function (translated) {
                ctrl.REQUEST_STATUS = translated;
            });
        }
        function onSuccess(reqs) {
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
                req.lastUpdate = req.timestamps.lastUpdate;
                if (req.amendmentsSummary && req.amendmentsSummary.lastModifiedDate && new Date(req.amendmentsSummary.lastModifiedDate) > new Date(req.timestamps.lastUpdate)) {
                    req.lastUpdate = req.amendmentsSummary.lastModifiedDate;
                }
            }
            ctrl.requests = reqs;
            ctrl.loading = false;
        }
        function onError() {
            ctrl.loading = false;
        }
        function onChanges(changed) {
            if (changed.parentId && changed.parentId.currentValue !== undefined) {
                if (changed.parentId.currentValue === null) {
                    ctrl.listUrl = DataAccessEntityUrls.getDataAccessRequestsUrl();
                    ctrl.entityBaseUrl = DataAccessEntityUrls.getDataAccessRequestBaseUrl();
                }
                else {
                    ctrl.listUrl = DataAccessEntityUrls.getDataAccessAmendmentsUrl(ctrl.parentId);
                    ctrl.entityBaseUrl = DataAccessEntityUrls.getDataAccessAmendmentBaseUrl(ctrl.parentId);
                }
                DataAccessEntityResource.list(ctrl.listUrl).$promise.then(onSuccess, onError);
            }
        }
        function deleteRequest(request) {
            ctrl.requestToDelete = request.id;
            $rootScope.$broadcast(NOTIFICATION_EVENTS.showConfirmDialog, {
                titleKey: 'data-access-request.delete-dialog.title',
                messageKey: 'data-access-request.delete-dialog.message',
                messageArgs: [request.title, request.applicant]
            }, request.id);
        }
        function getCsvExportHref() {
            return ngObibaMicaUrl.getUrl('DataAccessRequestsExportCsvResource').replace(':lang', $translate.use());
        }
        function getHistoryExportHref() {
            return ngObibaMicaUrl.getUrl('DataAccessRequestsExportHistoryResource').replace(':lang', $translate.use());
        }
        function getDataAccessRequestPageUrl() {
            var DataAccessClientDetailPath = ngObibaMicaUrl.getUrl('DataAccessClientDetailPath');
            if (DataAccessClientDetailPath) {
                return ngObibaMicaUrl.getUrl('BaseUrl') + ngObibaMicaUrl.getUrl('DataAccessClientDetailPath');
            }
            else {
                return null;
            }
        }
        function onConfirmDelete(event, id) {
            if (ctrl.requestToDelete === id) {
                DataAccessEntityResource.delete(ctrl.entityBaseUrl, ctrl.requestToDelete).$promise.then(function () {
                    ctrl.loading = true;
                    DataAccessEntityResource.list(ctrl.listUrl).$promise.then(onSuccess, onError);
                }, onError);
                delete ctrl.requestToDelete;
            }
        }
        ctrl.getHistoryExportHref = getHistoryExportHref;
        ctrl.getCsvExportHref = getCsvExportHref;
        ctrl.getDataAccessRequestPageUrl = getDataAccessRequestPageUrl;
        ctrl.deleteRequest = deleteRequest;
        ctrl.$onInit = onInit;
        ctrl.$onChanges = onChanges;
        ctrl.UserProfileService = UserProfileService;
        ctrl.UserProfileModalService = UserProfileModalService;
    }
    ngObibaMica.access
        .component('entityList', {
        bindings: {
            parentId: '<',
            canAdd: '<'
        },
        templateUrl: 'access/components/entity-list/component.html',
        controller: ['$rootScope',
            'DataAccessEntityUrls',
            'DataAccessEntityResource',
            'DataAccessEntityService',
            'NOTIFICATION_EVENTS',
            'SessionProxy',
            'USER_ROLES',
            'ngObibaMicaAccessTemplateUrl',
            'DataAccessRequestConfig',
            'ngObibaMicaUrl',
            '$translate',
            'UserProfileService',
            'UserProfileModalService', Controller]
    });
})();
//# sourceMappingURL=component.js.map
/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";
var PrintFriendlyController = /** @class */ (function () {
    function PrintFriendlyController() {
    }
    return PrintFriendlyController;
}());
var PrintFriendlyComponent = /** @class */ (function () {
    function PrintFriendlyComponent() {
        this.transclude = true;
        this.bindings = {
            accessForm: "<",
            lastSubmittedDate: "<",
            model: "<",
            project: "<",
            validForm: "<",
        };
        this.controller = PrintFriendlyController;
        this.controllerAs = "$ctrl";
        this.templateUrl = "access/components/print-friendly-view/component.html";
    }
    return PrintFriendlyComponent;
}());
ngObibaMica.access.component("printFriendlyView", new PrintFriendlyComponent());
//# sourceMappingURL=component.js.map
/*
 * Copyright (c) 2019 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";
var ReportsProgressBarController = /** @class */ (function () {
    function ReportsProgressBarController() {
    }
    ReportsProgressBarController.prototype.$onChanges = function (changes) {
        if (this.timeline) {
            this.steps = [];
            this.steps.push({
                date: this.timeline.startDate,
                marker: "data-access-request.start-label",
                title: "data-access-request.start",
            });
            if (this.timeline.intermediateDates) {
                var i = void 0;
                for (i = 0; i < this.timeline.intermediateDates.length; i++) {
                    this.steps.push({
                        date: this.timeline.intermediateDates[i],
                        marker: i + 1,
                        title: "data-access-request.intermediate",
                    });
                }
            }
            this.steps.push({
                date: this.timeline.endDate,
                marker: "data-access-request.end-label",
                title: "data-access-request.end",
            });
        }
        else {
            this.steps = undefined;
        }
    };
    ReportsProgressBarController.prototype.isVisible = function () {
        return this.timeline;
    };
    ReportsProgressBarController.$inject = ["$log"];
    return ReportsProgressBarController;
}());
var ReportsProgressBarComponent = /** @class */ (function () {
    function ReportsProgressBarComponent() {
        this.templateUrl = "access/components/reports-progressbar/component.html";
        this.transclude = false;
        this.transclude = true;
        this.bindings = {
            timeline: "<",
        };
        this.controller = ReportsProgressBarController;
        this.controllerAs = "$ctrl";
    }
    return ReportsProgressBarComponent;
}());
ngObibaMica.access.component("reportsProgressbar", new ReportsProgressBarComponent());
//# sourceMappingURL=component.js.map
/*
 * Copyright (c) 2019 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";
var StatusProgressBarController = /** @class */ (function () {
    function StatusProgressBarController() {
    }
    StatusProgressBarController.prototype.$onChanges = function (changes) {
        if (this.status && this.config) {
            if (!this.states) {
                this.initializeStates();
            }
            this.updateStatusSteps();
        }
    };
    StatusProgressBarController.prototype.isVisible = function () {
        return this.status !== "APPROVED";
    };
    StatusProgressBarController.prototype.initializeStates = function () {
        var i = 1;
        this.states = {};
        this.states.OPENED = i++;
        if (true === this.config.withConditionalApproval) {
            this.states.CONDITIONALLY_APPROVED = this.states.OPENED;
        }
        this.states.SUBMITTED = i++;
        if (true === this.config.withReview) {
            this.states.REVIEWED = i++;
        }
        this.states.APPROVED = this.states.REJECTED = i;
    };
    StatusProgressBarController.prototype.updateStatusSteps = function () {
        this.steps = new Array();
        if (this.status === "CONDITIONALLY_APPROVED") {
            this.steps.push({
                date: this.findStatusChangeDate("CONDITIONALLY_APPROVED"),
                done: true,
                marker: this.states.CONDITIONALLY_APPROVED,
                title: "CONDITIONALLY_APPROVED",
            });
        }
        else {
            this.steps.push({
                date: this.findStatusChangeDate("OPENED"),
                done: true,
                marker: this.states.OPENED,
                title: "OPENED",
            });
        }
        var submittedDone = this.states[this.status] >= this.states.SUBMITTED;
        this.steps.push({
            date: submittedDone ? this.findStatusChangeDate("SUBMITTED") : undefined,
            done: submittedDone,
            marker: this.states.SUBMITTED,
            title: "SUBMITTED",
        });
        var reviewedDone = this.states[this.status] >= this.states.REVIEWED;
        if (true === this.config.withReview) {
            this.steps.push({
                date: reviewedDone ? this.findStatusChangeDate("REVIEWED") : undefined,
                done: reviewedDone,
                marker: this.states.REVIEWED,
                title: "REVIEWED",
            });
        }
        if (this.status === "REJECTED") {
            this.steps.push({
                date: this.findStatusChangeDate("REJECTED"),
                done: true,
                marker: this.states.REJECTED,
                title: "REJECTED",
            });
        }
        else if (this.status === "APPROVED") {
            this.steps.push({
                date: this.findStatusChangeDate("APPROVED"),
                done: true,
                marker: this.states.APPROVED,
                title: "APPROVED",
            });
        }
        else {
            this.steps.push({
                done: false,
                marker: this.states.APPROVED,
                title: "APPROVED-REJECTED",
            });
        }
    };
    StatusProgressBarController.prototype.findStatusChangeDate = function (status) {
        if (this.history) {
            if (status === "OPENED") {
                // creation
                return this.history[0].changedOn;
            }
            else {
                // reverse inspection
                var i = void 0;
                for (i = this.history.length; i > 0; i--) {
                    var change = this.history[i - 1];
                    if (change.to === status) {
                        return change.changedOn;
                    }
                }
            }
        }
    };
    StatusProgressBarController.$inject = ["$log"];
    return StatusProgressBarController;
}());
var StatusProgressBarComponent = /** @class */ (function () {
    function StatusProgressBarComponent() {
        this.templateUrl = "access/components/status-progressbar/component.html";
        this.transclude = false;
        this.transclude = true;
        this.bindings = {
            config: "<",
            history: "<",
            status: "<",
        };
        this.controller = StatusProgressBarController;
        this.controllerAs = "$ctrl";
    }
    return StatusProgressBarComponent;
}());
ngObibaMica.access.component("statusProgressbar", new StatusProgressBarComponent());
//# sourceMappingURL=component.js.map
/*
 * Copyright (c) 2019 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";
var TimelineController = /** @class */ (function () {
    function TimelineController() {
    }
    TimelineController.prototype.$onChanges = function (changes) {
        if (this.steps) {
            this.stepWidth = 100 / this.steps.length;
        }
    };
    TimelineController.prototype.getContent = function (step) {
        if (step.date) {
            return this.toLocaleDateString(step.date);
        }
        else {
            return step.content;
        }
    };
    TimelineController.prototype.isDone = function (step) {
        if (step.date) {
            return Date.parse(step.date) <= Date.now();
        }
        else {
            return step.done;
        }
    };
    TimelineController.prototype.toLocaleDateString = function (dateStr) {
        return new Date(dateStr).toLocaleDateString();
    };
    TimelineController.$inject = ["$log"];
    return TimelineController;
}());
var TimelineComponent = /** @class */ (function () {
    function TimelineComponent() {
        this.templateUrl = "access/components/timeline/component.html";
        this.transclude = false;
        this.transclude = true;
        this.bindings = {
            steps: "<",
        };
        this.controller = TimelineController;
        this.controllerAs = "$ctrl";
    }
    return TimelineComponent;
}());
ngObibaMica.access.component("timeline", new TimelineComponent());
//# sourceMappingURL=component.js.map
'use strict';
(function () {
    function Service($rootScope, $filter, $location, DataAccessEntityUrls, DataAccessEntityResource, DataAccessEntityService, NOTIFICATION_EVENTS) {
        this.for = function (scope, accessEntity, successCallback, errorCallback) {
            var self = {};
            var parentId = accessEntity['obiba.mica.DataAccessAmendmentDto.amendment'].parentId;
            var entityRootpath = parentId ? DataAccessEntityUrls.getDataAccessAmendmentUrl(parentId, accessEntity.id) :
                DataAccessEntityUrls.getDataAccessRequestUrl(accessEntity.id);
            var prefix = parentId ? 'data-access-amendment' : 'data-access-request';
            function confirmStatusChange(status, messageKey, statusName) {
                $rootScope.$broadcast(NOTIFICATION_EVENTS.showConfirmDialog, {
                    titleKey: prefix + '.status-change-confirmation.title',
                    messageKey: messageKey !== null ? messageKey : prefix + '.status-change-confirmation.message',
                    messageArgs: statusName !== null ? [$filter('translate')(statusName).toLowerCase()] : []
                }, status);
            }
            function statusChangedConfirmed(status, expectedStatus) {
                if (status === expectedStatus) {
                    DataAccessEntityResource.updateStatus(entityRootpath, accessEntity.id, status).$promise.then(successCallback, errorCallback);
                }
            }
            function onDeleteConfirmed(event, id) {
                if (accessEntity.id === id) {
                    DataAccessEntityResource.delete(entityRootpath, id).$promise.then(function () {
                        $location.path(parentId ? '/data-access-request/' + parentId : '/data-access-requests').replace();
                    });
                }
            }
            self.reopen = function () {
                confirmStatusChange(DataAccessEntityService.status.OPENED, null, 'reopen');
            };
            self.review = function () {
                confirmStatusChange(DataAccessEntityService.status.REVIEWED, prefix + '.status-change-confirmation.message-review', null);
            };
            self.approve = function () {
                confirmStatusChange(DataAccessEntityService.status.APPROVED, null, 'approve');
            };
            self.reject = function () {
                confirmStatusChange(DataAccessEntityService.status.REJECTED, null, 'reject');
            };
            self.conditionallyApprove = function () {
                confirmStatusChange(DataAccessEntityService.status.CONDITIONALLY_APPROVED, null, 'conditionallyApprove');
            };
            self.delete = function () {
                $rootScope.$broadcast(NOTIFICATION_EVENTS.showConfirmDialog, {
                    titleKey: prefix + '.delete-dialog.title',
                    messageKey: prefix + '.delete-dialog.message',
                    messageArgs: [accessEntity.title, accessEntity.applicant]
                }, accessEntity.id);
            };
            self.printForm = function () {
                setTimeout(function () { window.print(); }, 250);
            };
            scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, onDeleteConfirmed);
            scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, function (event, status) {
                statusChangedConfirmed(DataAccessEntityService.status.OPENED, status);
            });
            scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, function (event, status) {
                statusChangedConfirmed(DataAccessEntityService.status.REVIEWED, status);
            });
            scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, function (event, status) {
                statusChangedConfirmed(DataAccessEntityService.status.CONDITIONALLY_APPROVED, status);
            });
            scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, function (event, status) {
                statusChangedConfirmed(DataAccessEntityService.status.APPROVED, status);
            });
            scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, function (event, status) {
                statusChangedConfirmed(DataAccessEntityService.status.REJECTED, status);
            });
            return self;
        };
    }
    angular.module('obiba.mica.access').service('DataAccessEntityFormService', ['$rootScope', '$filter', '$location', 'DataAccessEntityUrls', 'DataAccessEntityResource', 'DataAccessEntityService', 'NOTIFICATION_EVENTS', Service]);
})();
//# sourceMappingURL=data-access-entity-form-service.js.map
/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";
var DataAccessEntityResource = /** @class */ (function () {
    function DataAccessEntityResource(DataAccessRequestsResource, DataAccessRequestResource, DataAccessAmendmentsResource, DataAccessAmendmentResource, DataAccessRequestStatusResource, DataAccessAmendmentStatusResource) {
        this.DataAccessRequestsResource = DataAccessRequestsResource;
        this.DataAccessRequestResource = DataAccessRequestResource;
        this.DataAccessAmendmentsResource = DataAccessAmendmentsResource;
        this.DataAccessAmendmentResource = DataAccessAmendmentResource;
        this.DataAccessRequestStatusResource = DataAccessRequestStatusResource;
        this.DataAccessAmendmentStatusResource = DataAccessAmendmentStatusResource;
    }
    DataAccessEntityResource.prototype.list = function (listUrl) {
        var parentId = this.getParentId(listUrl);
        return parentId ?
            this.DataAccessAmendmentsResource.query({ parentId: parentId }) :
            this.DataAccessRequestsResource.query();
    };
    DataAccessEntityResource.prototype.create = function (listUrl, data, successCallback, errorCallback) {
        var parentId = this.getParentId(listUrl);
        return parentId ?
            this.DataAccessAmendmentsResource.save(data, successCallback, errorCallback) :
            this.DataAccessRequestsResource.save(data, successCallback, errorCallback);
    };
    DataAccessEntityResource.prototype.update = function (entityRootPath, data) {
        var parentId = this.getParentId(entityRootPath);
        return parentId ?
            this.DataAccessAmendmentResource.save(data) :
            this.DataAccessRequestResource.save(data);
    };
    DataAccessEntityResource.prototype.get = function (entityRootPath, id) {
        var parentId = this.getParentId(entityRootPath);
        return parentId ?
            this.DataAccessAmendmentResource.get({ parentId: parentId, id: id }) :
            this.DataAccessRequestResource.get({ id: id });
    };
    DataAccessEntityResource.prototype.delete = function (entityRootPath, id) {
        var parentId = this.getParentId(entityRootPath);
        return parentId ?
            this.DataAccessAmendmentResource.delete({ parentId: parentId, id: id }) :
            this.DataAccessRequestResource.delete({ id: id });
    };
    DataAccessEntityResource.prototype.updateStatus = function (entityRootPath, id, status) {
        var parentId = this.getParentId(entityRootPath);
        return parentId ?
            this.DataAccessAmendmentStatusResource.update({ parentId: parentId, id: id, status: status }) :
            this.DataAccessRequestStatusResource.update({ id: id, status: status });
    };
    DataAccessEntityResource.prototype.getParentId = function (url) {
        var parentId = /data-access-request\/([a-zA-Z0-9_-]+)(?:\/amendment)?/.exec(url);
        return parentId && parentId.length === 2 ? parentId[parentId.index] : null;
    };
    DataAccessEntityResource.$inject = [
        "DataAccessRequestsResource",
        "DataAccessRequestResource",
        "DataAccessAmendmentsResource",
        "DataAccessAmendmentResource",
        "DataAccessRequestStatusResource",
        "DataAccessAmendmentStatusResource",
    ];
    return DataAccessEntityResource;
}());
ngObibaMica.access.service("DataAccessEntityResource", DataAccessEntityResource);
//# sourceMappingURL=data-access-entity-resource.js.map
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
    function DataAccessEntityService($translate, SessionProxy, USER_ROLES, ngObibaMicaUrl) {
        var statusList = {
            OPENED: 'OPENED',
            SUBMITTED: 'SUBMITTED',
            REVIEWED: 'REVIEWED',
            CONDITIONALLY_APPROVED: 'CONDITIONALLY_APPROVED',
            APPROVED: 'APPROVED',
            REJECTED: 'REJECTED'
        };
        var actions = {
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
            canEditStartDate: function (request) {
                return request.status === 'APPROVED' && canDoAction(request, 'EDIT_ACTION_LOGS');
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
            },
            canDeleteAttachments: function (request) {
                return canDoAction(request, 'DELETE_ATTACHMENTS');
            },
            canAddAmendments: function (request) {
                return request['obiba.mica.DataAccessAmendmentDto.amendment'] ? true : canDoAction(request, 'ADD_AMENDMENTS');
            },
            canEditActionLogs: function (request) {
                return canDoAction(request, 'EDIT_ACTION_LOGS');
            },
            canViewPrivateComments: function (request) {
                return canDoAction(request, 'VIEW_PRIVATE_COMMENTS');
            },
            canAddPrivateComments: function (request) {
                return canDoAction(request, 'ADD_PRIVATE_COMMENTS');
            }
        };
        var nextStatus = {
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
        function getStatusFilterData(userCallback) {
            if (userCallback) {
                $translate(Object.keys(statusList)).then(function (translation) {
                    userCallback(Object.keys(translation).map(function (key) {
                        return { key: key, translation: translation[key] };
                    }));
                });
            }
        }
        function canDoAction(request, action) {
            return request.actions ? request.actions.indexOf(action) !== -1 : false;
        }
        function canChangeStatus(request, to) {
            return request.nextStatus ? request.nextStatus.indexOf(to) !== -1 : null;
        }
        function getHistoryLogId(log) {
            var id = 'opened';
            if (log.action) {
                id = 'action';
            }
            else if (log.from !== 'OPENED' || log.from !== log.to) {
                switch (log.to) {
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
        }
        function processLogsHistory(logs) {
            return (logs || []).map(function (log) {
                switch (getHistoryLogId(log)) {
                    case 'opened':
                        log.msg = 'data-access-request.histories.opened';
                        log.icon = 'glyphicon glyphicon-saved';
                        break;
                    case 'reopened':
                        log.msg = 'data-access-request.histories.reopened';
                        log.icon = 'glyphicon glyphicon-saved';
                        break;
                    case 'submitted':
                        log.msg = 'data-access-request.histories.submitted';
                        log.icon = 'glyphicon glyphicon-export';
                        break;
                    case 'reviewed':
                        log.msg = 'data-access-request.histories.reviewed';
                        log.icon = 'glyphicon glyphicon-check';
                        break;
                    case 'conditionallyApproved':
                        log.msg = 'data-access-request.histories.conditionallyApproved';
                        log.icon = 'glyphicon glyphicon-unchecked';
                        break;
                    case 'approved':
                        log.msg = 'data-access-request.histories.approved';
                        log.icon = 'glyphicon glyphicon-ok';
                        break;
                    case 'rejected':
                        log.msg = 'data-access-request.histories.rejected';
                        log.icon = 'glyphicon glyphicon-remove';
                        break;
                    case 'action':
                        log.msg = log.action;
                        log.icon = 'glyphicon glyphicon-play-circle';
                        log.changedOn = new Date(log.changedOn).toISOString();
                        break;
                }
                return log;
            });
        }
        function getListDataAccessRequestPageUrl() {
            var DataAccessClientListPath = ngObibaMicaUrl.getUrl('DataAccessClientListPath');
            if (DataAccessClientListPath) {
                return ngObibaMicaUrl.getUrl('BaseUrl') + ngObibaMicaUrl.getUrl('DataAccessClientListPath');
            }
            else {
                return null;
            }
        }
        this.status = statusList;
        this.actions = actions;
        this.nextStatus = nextStatus;
        this.getStatusFilterData = getStatusFilterData;
        this.processLogsHistory = processLogsHistory;
        this.getListDataAccessRequestPageUrl = getListDataAccessRequestPageUrl;
        return this;
    }
    ngObibaMica.access.service('DataAccessEntityService', ['$translate', 'SessionProxy', 'USER_ROLES', 'ngObibaMicaUrl', DataAccessEntityService]);
})();
//# sourceMappingURL=data-access-entity-service.js.map
/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";
var DataAccessEntityUrls = /** @class */ (function () {
    function DataAccessEntityUrls() {
    }
    DataAccessEntityUrls.prototype.getDataAccessRequestsUrl = function () {
        return "/data-access-requests";
    };
    DataAccessEntityUrls.prototype.getDataAccessRequestBaseUrl = function () {
        return "/data-access-request";
    };
    DataAccessEntityUrls.prototype.getDataAccessRequestUrl = function (id) {
        return this.getDataAccessRequestBaseUrl() + "/" + id;
    };
    DataAccessEntityUrls.prototype.getDataAccessAmendmentsUrl = function (parentId) {
        return "/data-access-request/" + parentId + "/amendments";
    };
    DataAccessEntityUrls.prototype.getDataAccessAmendmentBaseUrl = function (parentId) {
        return "/data-access-request/" + parentId + "/amendment";
    };
    DataAccessEntityUrls.prototype.getDataAccessAmendmentUrl = function (parentId, id) {
        return this.getDataAccessAmendmentBaseUrl(parentId) + "/" + id;
    };
    return DataAccessEntityUrls;
}());
ngObibaMica.access.service("DataAccessEntityUrls", DataAccessEntityUrls);
//# sourceMappingURL=data-access-entity-urls.js.map
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
ngObibaMica.access
    .controller('DataAccessRequestListController', [
    '$scope',
    'ngObibaMicaAccessTemplateUrl',
    function ($scope, ngObibaMicaAccessTemplateUrl) {
        $scope.headerTemplateUrl = ngObibaMicaAccessTemplateUrl.getHeaderUrl('list');
        $scope.footerTemplateUrl = ngObibaMicaAccessTemplateUrl.getFooterUrl('list');
    }
])
    .controller('DataAccessRequestViewController', ['$rootScope',
    '$scope',
    '$q',
    '$location',
    '$uibModal',
    '$routeParams',
    '$filter',
    '$translate',
    'DataAccessRequestResource',
    'DataAccessAmendmentsResource',
    'DataAccessEntityService',
    'DataAccessRequestStatusResource',
    'DataAccessFormConfigResource',
    'DataAccessRequestAttachmentsUpdateResource',
    'DataAccessRequestCommentsResource',
    'DataAccessRequestCommentResource',
    'ngObibaMicaUrl',
    'ngObibaMicaAccessTemplateUrl',
    'AlertService',
    'ServerErrorUtils',
    'NOTIFICATION_EVENTS',
    'DataAccessRequestConfig',
    'SfOptionsService',
    'moment',
    'UserProfileService',
    function ($rootScope, $scope, $q, $location, $uibModal, $routeParams, $filter, $translate, DataAccessRequestResource, DataAccessAmendmentsResource, DataAccessEntityService, DataAccessRequestStatusResource, DataAccessFormConfigResource, DataAccessRequestAttachmentsUpdateResource, DataAccessRequestCommentsResource, DataAccessRequestCommentResource, ngObibaMicaUrl, ngObibaMicaAccessTemplateUrl, AlertService, ServerErrorUtils, NOTIFICATION_EVENTS, DataAccessRequestConfig, SfOptionsService, moment, UserProfileService) {
        var TAB_NAMES = Object.freeze({
            form: 0,
            amendments: 1,
            documents: 2,
            comments: 3,
            privateComments: 4,
            history: 5
        });
        function onError(response) {
            AlertService.alert({
                id: 'DataAccessRequestViewController',
                type: 'danger',
                msg: ServerErrorUtils.buildMessage(response)
            });
        }
        function onAttachmentError(attachment) {
            AlertService.alert({
                id: 'DataAccessRequestViewController',
                type: 'danger',
                msgKey: 'server.error.file.upload',
                msgArgs: [attachment.fileName]
            });
        }
        function retrieveComments() {
            DataAccessRequestCommentsResource.query({ id: $routeParams.id, admin: ($scope.privateComments === true) ? true : '' }, function (comments) {
                $scope.form.comments = comments || [];
            });
        }
        function selectTab(tab) {
            switch (tab) {
                case TAB_NAMES.form:
                case TAB_NAMES.history:
                case TAB_NAMES.documents:
                    break;
                case TAB_NAMES.comments:
                    $scope.privateComments = false;
                    if ($scope.parentId === undefined) {
                        retrieveComments();
                    }
                    break;
                case TAB_NAMES.privateComments:
                    if ($scope.parentId === undefined) {
                        $scope.privateComments = true;
                        retrieveComments();
                    }
                    break;
                case TAB_NAMES.amendments:
                    $scope.parentId = $routeParams.id;
                    break;
            }
        }
        function submitComment(comment) {
            DataAccessRequestCommentsResource.save({ id: $routeParams.id, admin: $scope.privateComments === true }, comment.message, retrieveComments, onError);
        }
        function updateComment(comment) {
            DataAccessRequestCommentResource.update({ id: $routeParams.id, commentId: comment.id }, comment.message, retrieveComments, onError);
        }
        function deleteComment(comment) {
            $scope.commentToDelete = comment.id;
            $rootScope.$broadcast(NOTIFICATION_EVENTS.showConfirmDialog, {
                titleKey: 'comment.delete-dialog.title',
                messageKey: 'comment.delete-dialog.message',
                messageArgs: [comment.createdBy]
            }, comment.id);
        }
        function toggleAttachmentsForm(show) {
            if (show) {
                $scope.attachments = angular.copy($scope.dataAccessRequest.attachments) || [];
            }
            $scope.showAttachmentsForm = show;
        }
        function getRequest() {
            var resources = [DataAccessRequestResource.get];
            if ($scope.dataAccessForm.amendmentsEnabled) {
                resources.push(DataAccessAmendmentsResource.getLogHistory);
            }
            $q.all(resources.map(function (resource) {
                return resource.apply(null, [{ id: $routeParams.id }]).$promise;
            })).then(function (values) {
                var dataAccessRequest = values[0], amendmentsLogHistory = values[1];
                try {
                    $scope.dataAccessRequest = dataAccessRequest;
                    $scope.form.model = dataAccessRequest.content ? JSON.parse(dataAccessRequest.content) : {};
                    var requestDownloadUrlPdf = ngObibaMicaUrl.getUrl('DataAccessRequestDownloadPdfResource').replace(':id', $scope.dataAccessRequest.id);
                    $scope.requestDownloadUrl = requestDownloadUrlPdf + ((requestDownloadUrlPdf.indexOf('?q=') !== -1) ? '&' : '?') + 'lang=' + $translate.use();
                    $scope.attachments = dataAccessRequest.attachments || [];
                    $scope.lastSubmittedDate = findLastSubmittedDate();
                    $scope.logsHistory =
                        DataAccessEntityService.processLogsHistory([].concat((dataAccessRequest.statusChangeHistory), (dataAccessRequest.actionLogHistory || []), (amendmentsLogHistory || []))
                            .sort(function (a, b) {
                            return a.changedOn.localeCompare(b.changedOn);
                        }));
                }
                catch (e) {
                    $scope.validForm = false;
                    $scope.form.model = {};
                    AlertService.alert({
                        id: 'DataAccessRequestViewController',
                        type: 'danger',
                        msgKey: 'data-access-request.parse-error'
                    });
                }
                $scope.loading = false;
            }, onError);
        }
        function updateAttachments() {
            var request = angular.copy($scope.dataAccessRequest);
            request.attachments = $scope.attachments;
            DataAccessRequestAttachmentsUpdateResource.save(request, function () {
                toggleAttachmentsForm(false);
                getRequest();
            });
        }
        function initializeForm() {
            var deferred = $q.defer();
            $q.all([SfOptionsService.transform(), DataAccessFormConfigResource.get().$promise]).then(function (values) {
                $scope.sfOptions = values[0];
                $scope.sfOptions.pristine = { errors: true, success: false };
                $scope.dataAccessForm = values[1];
                $scope.dataAccessForm.downloadTemplate = $scope.dataAccessForm.pdfDownloadType === 'Template';
                deferred.resolve();
            }, onError);
            return deferred.promise;
        }
        function findLastSubmittedDate() {
            var history = $scope.dataAccessRequest.logsHistory || [];
            return history.filter(function (item) {
                return item.to === DataAccessEntityService.status.SUBMITTED;
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
        function editStartDate() {
            function saveStartDate(startDate) {
                var yyyy = startDate.getFullYear();
                var mm = startDate.getMonth() + 1;
                var dd = startDate.getDate();
                var dateStr = yyyy + '-' + mm + '-' + dd;
                $scope.dataAccessRequest.startDate = dateStr;
                DataAccessRequestResource.editStartDate({ id: $scope.dataAccessRequest.id, date: dateStr }, function () {
                    getRequest();
                }, onError);
            }
            $uibModal.open({
                templateUrl: 'access/components/reports-progressbar/edit-start-date-modal.html',
                controller: ['$uibModalInstance', 'requestItem',
                    function ($uibModalInstance, requestItem) {
                        this.startDate = new Date(requestItem.reportsTimeline.startDate);
                        this.endDate = new Date(requestItem.reportsTimeline.endDate);
                        this.originalDate = this.startDate;
                        this.valideDate = function () {
                            return this.startDate && this.startDate.getTime() < this.endDate.getTime();
                        };
                        this.close = function () {
                            if (this.originalDate !== this.startDate) {
                                saveStartDate(this.startDate);
                            }
                            $uibModalInstance.dismiss('close');
                        };
                    }],
                controllerAs: '$modal',
                size: 'sm',
                resolve: {
                    requestItem: function () {
                        return $scope.dataAccessRequest;
                    }
                }
            });
        }
        function deleteEntity() {
            $scope.requestToDelete = $scope.dataAccessRequest.id;
            $rootScope.$broadcast(NOTIFICATION_EVENTS.showConfirmDialog, {
                titleKey: 'data-access-request.delete-dialog.title',
                messageKey: 'data-access-request.delete-dialog.message',
                messageArgs: [$scope.dataAccessRequest.title, $scope.dataAccessRequest.applicant]
            }, $scope.requestToDelete);
        }
        function getDownloadHref(attachment) {
            return ngObibaMicaUrl.getUrl('DataAccessRequestAttachmentDownloadResource')
                .replace(':id', $scope.dataAccessRequest.id).replace(':attachmentId', attachment.id);
        }
        function onDeleteConfirmed(event, id) {
            if ($scope.requestToDelete === id) {
                DataAccessRequestResource.delete({ id: $scope.requestToDelete }, function () {
                    $location.path('/data-access-requests').replace();
                });
                delete $scope.requestToDelete;
            }
        }
        function onUpdatStatusSuccess() {
            setTimeout(function () {
                getRequest();
            });
        }
        function confirmStatusChange(status, messageKey, statusName) {
            $rootScope.$broadcast(NOTIFICATION_EVENTS.showConfirmDialog, {
                titleKey: 'data-access-request.status-change-confirmation.title',
                messageKey: messageKey !== null ? messageKey : 'data-access-request.status-change-confirmation.message',
                messageArgs: statusName !== null ? [$filter('translate')(statusName).toLowerCase()] : []
            }, status);
        }
        function statusChangedConfirmed(status, expectedStatus) {
            if (status === expectedStatus) {
                DataAccessRequestStatusResource.update({
                    id: $scope.dataAccessRequest.id,
                    status: status
                }, onUpdatStatusSuccess, onError);
            }
        }
        function printForm() {
            // let angular digest!
            setTimeout(function () { window.print(); }, 250);
        }
        function submitForm() {
            $scope.$broadcast('schemaFormValidate');
            if ($scope.forms.requestForm.$valid) {
                DataAccessRequestStatusResource.update({
                    id: $scope.dataAccessRequest.id,
                    status: DataAccessEntityService.status.SUBMITTED
                }, function onSubmitted() {
                    $uibModal.open({
                        scope: $scope,
                        templateUrl: 'access/views/data-access-request-submitted-modal.html'
                    }).result.then(function () {
                        onUpdatStatusSuccess();
                    });
                }, onError);
            }
            else {
                AlertService.alert({
                    id: 'DataAccessRequestViewController',
                    type: 'danger',
                    msgKey: 'data-access-request.submit.invalid'
                });
            }
        }
        function onDeleteCommentConfirmed(event, id) {
            if ($scope.commentToDelete === id) {
                DataAccessRequestCommentResource.delete({ id: $routeParams.id, commentId: id }, {}, retrieveComments, onError);
            }
        }
        function updateActionLogs(actionLogs) {
            if (Array.isArray(actionLogs)) {
                $scope.loading = true;
                $scope.dataAccessRequest.actionLogHistory = actionLogs;
                DataAccessRequestResource.editActionLogs($scope.dataAccessRequest, function () {
                    onUpdatStatusSuccess();
                });
            }
        }
        function reOpen() {
            confirmStatusChange(DataAccessEntityService.status.OPENED, null, 'reopen');
        }
        function review() {
            confirmStatusChange(DataAccessEntityService.status.REVIEWED, 'data-access-request.status-change-confirmation.message-review', null);
        }
        function approve() {
            confirmStatusChange(DataAccessEntityService.status.APPROVED, null, 'approve');
        }
        function reject() {
            confirmStatusChange(DataAccessEntityService.status.REJECTED, null, 'reject');
        }
        function conditionallyApprove() {
            confirmStatusChange(DataAccessEntityService.status.CONDITIONALLY_APPROVED, null, 'conditionallyApprove');
        }
        function onStatusOpened(event, status) {
            statusChangedConfirmed(DataAccessEntityService.status.OPENED, status);
        }
        function onStatusReviewed(event, status) {
            statusChangedConfirmed(DataAccessEntityService.status.REVIEWED, status);
        }
        function onStatusConditionallyApproved(event, status) {
            statusChangedConfirmed(DataAccessEntityService.status.CONDITIONALLY_APPROVED, status);
        }
        function onStatusApproved(event, status) {
            statusChangedConfirmed(DataAccessEntityService.status.APPROVED, status);
        }
        function onStatusRejected(event, status) {
            statusChangedConfirmed(DataAccessEntityService.status.REJECTED, status);
        }
        function getFullName(profile) {
            return UserProfileService.getFullName(profile);
        }
        function getProfileEmail(profile) {
            return UserProfileService.getEmail(profile);
        }
        $scope.logsHistory = [];
        $scope.parentId = undefined;
        $scope.loading = false;
        $scope.validForm = true;
        $scope.config = DataAccessRequestConfig.getOptions();
        $scope.actions = DataAccessEntityService.actions;
        $scope.nextStatus = DataAccessEntityService.nextStatus;
        $scope.showAttachmentsForm = false;
        $scope.selectTab = selectTab;
        $scope.delete = deleteEntity;
        $scope.editStartDate = editStartDate;
        $scope.submitComment = submitComment;
        $scope.updateComment = updateComment;
        $scope.deleteComment = deleteComment;
        $scope.getDownloadHref = getDownloadHref;
        $scope.updateAttachments = updateAttachments;
        $scope.cancelAttachments = function () { toggleAttachmentsForm(false); };
        $scope.editAttachments = function () { toggleAttachmentsForm(true); };
        $scope.updateActionLogs = updateActionLogs;
        $scope.onAttachmentError = onAttachmentError;
        $scope.headerTemplateUrl = ngObibaMicaAccessTemplateUrl.getHeaderUrl('view');
        $scope.footerTemplateUrl = ngObibaMicaAccessTemplateUrl.getFooterUrl('view');
        $scope.submit = submitForm;
        $scope.reopen = reOpen;
        $scope.review = review;
        $scope.approve = approve;
        $scope.reject = reject;
        $scope.conditionallyApprove = conditionallyApprove;
        $scope.UserProfileService = UserProfileService;
        $scope.getProfileEmail = getProfileEmail;
        $scope.userProfile = function (profile) {
            $scope.applicant = profile;
            $uibModal.open({
                scope: $scope,
                templateUrl: 'access/views/data-access-request-profile-user-modal.html'
            });
        };
        $scope.dataAccessRequest = {};
        $scope.getDataAccessListPageUrl = DataAccessEntityService.getListDataAccessRequestPageUrl();
        $scope.printForm = printForm;
        $scope.getFullName = getFullName;
        $scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, onDeleteConfirmed);
        $scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, onDeleteCommentConfirmed);
        $scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, onStatusOpened);
        $scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, onStatusReviewed);
        $scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, onStatusConditionallyApproved);
        $scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, onStatusApproved);
        $scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, onStatusRejected);
        $rootScope.$on('$translateChangeSuccess', initializeForm);
        $scope.tabs = { activeTab: 0 };
        $scope.TAB_NAMES = TAB_NAMES;
        $scope.forms = {};
        $scope.form = {
            schema: null,
            definition: null,
            model: {},
            comments: null
        };
        if ($routeParams.id) {
            initializeForm().then(function () {
                getRequest();
            });
        }
    }])
    .controller('DataAccessRequestEditController', ['$rootScope',
    '$scope',
    '$q',
    '$routeParams',
    '$location',
    '$uibModal',
    'DataAccessRequestsResource',
    'DataAccessRequestResource',
    'DataAccessFormConfigResource',
    'AlertService',
    'ServerErrorUtils',
    'SessionProxy',
    'DataAccessEntityService',
    'ngObibaMicaAccessTemplateUrl',
    'DataAccessRequestConfig',
    'SfOptionsService',
    'FormDirtyStateObserver',
    'DataAccessRequestDirtyStateService',
    function ($rootScope, $scope, $q, $routeParams, $location, $uibModal, DataAccessRequestsResource, DataAccessRequestResource, DataAccessFormConfigResource, AlertService, ServerErrorUtils, SessionProxy, DataAccessEntityService, ngObibaMicaAccessTemplateUrl, DataAccessRequestConfig, SfOptionsService, FormDirtyStateObserver, DataAccessRequestDirtyStateService) {
        var onSuccess = function (response, getResponseHeaders) {
            FormDirtyStateObserver.unobserve();
            var parts = getResponseHeaders().location.split('/');
            $location.path('/data-access-request/' + parts[parts.length - 1]).replace();
        };
        var onError = function (response) {
            AlertService.alert({
                id: 'DataAccessRequestEditController',
                type: 'danger',
                msg: ServerErrorUtils.buildMessage(response)
            });
        };
        $scope.getDataAccessListPageUrl = DataAccessEntityService.getListDataAccessRequestPageUrl();
        var validate = function (form) {
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
        var cancel = function () {
            $location.path('/data-access-request' + ($routeParams.id ? '/' + $routeParams.id : 's')).replace();
        };
        var save = function () {
            $scope.dataAccessRequest.content = angular.toJson($scope.sfForm.model || {});
            function doSaveOnGoingRequest() {
                DataAccessRequestResource.save($scope.dataAccessRequest, function () {
                    FormDirtyStateObserver.unobserve();
                    $location.path('/data-access-request' + ($scope.dataAccessRequest.id ? '/' + $scope.dataAccessRequest.id : 's')).replace();
                }, onError);
            }
            if ($scope.newRequest) {
                DataAccessRequestsResource.save($scope.dataAccessRequest, onSuccess, onError);
            }
            else {
                var isUnusual = ['OPENED', 'CONDITIONALLY_APPROVED'].indexOf($scope.dataAccessRequest.status) === -1;
                if (isUnusual) {
                    $scope.$broadcast('schemaFormValidate');
                    if ($scope.form.$valid) {
                        doSaveOnGoingRequest();
                    }
                    else {
                        validate($scope.form);
                    }
                }
                else {
                    doSaveOnGoingRequest();
                }
            }
        };
        function initializeForm() {
            // Retrieve form data
            $q.all([
                $routeParams.id ?
                    DataAccessRequestResource.get({ id: $routeParams.id }, function onSuccess(request) {
                        request.attachments = request.attachments || [];
                        return request;
                    }).$promise : {
                    applicant: SessionProxy.login(),
                    status: DataAccessEntityService.status.OPENED,
                    attachments: []
                },
                DataAccessFormConfigResource.get().$promise
            ]).then(function (values) {
                $scope.dataAccessRequest = values[0];
                $scope.sfForm = values[1] || {};
                $scope.sfForm.model = $scope.dataAccessRequest.content ? JSON.parse($scope.dataAccessRequest.content) : {};
                $scope.loaded = true;
            }, function (response) {
                $scope.validForm = false;
                onError(response);
            });
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
        $scope.sfForm = null;
        FormDirtyStateObserver.observe($scope);
        DataAccessRequestDirtyStateService.setForm($scope.form);
        $scope.$on('$destroy', function () {
            DataAccessRequestDirtyStateService.setForm(null);
        });
    }]);
//# sourceMappingURL=data-access-request-controller.js.map
'use strict';
(function () {
    function Controller($scope, $rootScope, $location, $q, $routeParams, $uibModal, DataAccessEntityResource, DataAccessAmendmentFormConfigResource, DataAccessEntityUrls, DataAccessEntityService, ServerErrorUtils, AlertService, DataAccessRequestDirtyStateService, FormDirtyStateObserver, SessionProxy, ngObibaMicaAccessTemplateUrl) {
        function getDataContent(data) {
            return data.content ? JSON.parse(data.content) : {};
        }
        function onSuccess(response, headersFunction) {
            FormDirtyStateObserver.unobserve();
            var parts = headersFunction().location.split('/');
            $location.path($scope.entityUrl + '/amendment/' + parts[parts.length - 1]).replace();
        }
        function onError(response) {
            AlertService.alert({
                id: 'DataAccessAmendmentEditController',
                type: 'danger',
                msg: ServerErrorUtils.buildMessage(response)
            });
        }
        function destroyFormObserver() {
            FormDirtyStateObserver.unobserve();
            DataAccessRequestDirtyStateService.setForm(null);
        }
        $scope.entityUrl = $routeParams.id ? DataAccessEntityUrls.getDataAccessAmendmentUrl($routeParams.parentId, $routeParams.id) : DataAccessEntityUrls.getDataAccessRequestUrl($routeParams.parentId);
        $scope.read = false;
        $scope.formDrawn = false;
        $rootScope.$on('$translateChangeSuccess', function () {
            DataAccessAmendmentFormConfigResource.get().$promise.then(function (value) {
                $scope.dataAccessForm = value;
            });
        });
        var amendment = $routeParams.id ?
            DataAccessEntityResource.get($scope.entityUrl, $routeParams.id) :
            {
                'obiba.mica.DataAccessAmendmentDto.amendment': { parentId: $routeParams.parentId },
                $promise: new Promise(function (resolve) { setTimeout(resolve, 0, {}); }),
                status: DataAccessEntityService.status.OPENED
            };
        var model = amendment.$promise.then(getDataContent);
        var dataAccessForm = DataAccessAmendmentFormConfigResource.get();
        $q.all([amendment, model, dataAccessForm.$promise]).then(function (values) {
            $scope.requestEntity = values[0];
            $scope.model = values[1];
            $scope.dataAccessForm = values[2];
            return values;
        }, function (reason) {
            console.error('Failed to resolve amendment promises because', reason);
        });
        $scope.headerTemplateUrl = ngObibaMicaAccessTemplateUrl.getHeaderUrl('amendmentForm');
        $scope.footerTemplateUrl = ngObibaMicaAccessTemplateUrl.getFooterUrl('amendmentForm');
        FormDirtyStateObserver.observe($scope);
        DataAccessRequestDirtyStateService.setForm($scope.form);
        $scope.$on('$destroy', destroyFormObserver);
        $scope.cancel = function () {
            destroyFormObserver();
            $location.path($scope.entityUrl).replace();
        };
        $scope.save = function () {
            $scope.requestEntity.content = angular.toJson($scope.model || {});
            $scope.requestEntity.parentId = $routeParams.parentId;
            delete $scope.requestEntity.$promise;
            if (!$scope.requestEntity.applicant) {
                $scope.requestEntity.applicant = SessionProxy.login();
            }
            function doSaveOnGoingRequest() {
                DataAccessEntityResource.update($scope.entityUrl, $scope.requestEntity).$promise.then(function () {
                    FormDirtyStateObserver.unobserve();
                    $location.path($scope.entityUrl).replace();
                }, onError);
            }
            if (!$routeParams.id) {
                DataAccessEntityResource.create($scope.entityUrl, $scope.requestEntity, onSuccess, onError);
            }
            else {
                var isUnusual = ['OPENED', 'CONDITIONALLY_APPROVED'].indexOf($scope.requestEntity.status) === -1;
                if (isUnusual) {
                    $scope.$broadcast('schemaFormValidate');
                    if ($scope.forms.requestForm.$valid) {
                        doSaveOnGoingRequest();
                    }
                    else {
                        $scope.validate($scope.forms.requestForm);
                    }
                }
                else {
                    doSaveOnGoingRequest();
                }
            }
        };
        $scope.validate = function (form) {
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
        $scope.toggleFormDrawnStatus = function (value) {
            $scope.formDrawn = value;
        };
    }
    angular.module('obiba.mica.access')
        .controller('DataAccessAmendmentEditController', ['$scope',
        '$rootScope',
        '$location',
        '$q',
        '$routeParams',
        '$uibModal',
        'DataAccessEntityResource',
        'DataAccessAmendmentFormConfigResource',
        'DataAccessEntityUrls',
        'DataAccessEntityService',
        'ServerErrorUtils',
        'AlertService',
        'DataAccessRequestDirtyStateService',
        'FormDirtyStateObserver',
        'SessionProxy',
        'ngObibaMicaAccessTemplateUrl',
        Controller
    ]);
})();
//# sourceMappingURL=data-access-amendment-edit-controller.js.map
'use strict';
(function () {
    function Controller($scope, $rootScope, $routeParams, $q, $uibModal, DataAccessEntityResource, DataAccessEntityService, DataAccessEntityFormService, DataAccessAmendmentFormConfigResource, DataAccessEntityUrls, AlertService, ngObibaMicaAccessTemplateUrl, UserProfileService) {
        $rootScope.$on('$translateChangeSuccess', function () {
            DataAccessAmendmentFormConfigResource.get().$promise.then(function (value) {
                $scope.dataAccessForm = value;
            });
        });
        $scope.userProfile = function (profile) {
            $scope.applicant = profile;
            $uibModal.open({
                scope: $scope,
                templateUrl: 'access/views/data-access-request-profile-user-modal.html'
            });
        };
        function getFullName(profile) {
            return UserProfileService.getFullName(profile);
        }
        function getProfileEmail(profile) {
            return UserProfileService.getEmail(profile);
        }
        function getDataContent(data) {
            return data.content ? JSON.parse(data.content) : {};
        }
        function resetRequestEntity() {
            var entity = DataAccessEntityResource.get($scope.entityUrl, $routeParams.id);
            $q.all([entity, entity.$promise.then(getDataContent)])
                .then(function (values) {
                $scope.requestEntity = values[0];
                $scope.model = values[1];
            });
        }
        $scope.entityUrl = DataAccessEntityUrls.getDataAccessAmendmentUrl($routeParams.parentId, $routeParams.id);
        $scope.read = true;
        $scope.formDrawn = false;
        var amendment = DataAccessEntityResource.get($scope.entityUrl, $routeParams.id);
        var model = amendment.$promise.then(getDataContent);
        var dataAccessForm = DataAccessAmendmentFormConfigResource.get();
        $q.all([amendment, model, dataAccessForm.$promise]).then(function (values) {
            $scope.requestEntity = values[0];
            $scope.model = values[1];
            $scope.dataAccessForm = values[2];
            $scope.actions = DataAccessEntityService.actions;
            $scope.nextStatus = DataAccessEntityService.nextStatus;
            Object.assign($scope, DataAccessEntityFormService.for($scope, $scope.requestEntity, resetRequestEntity));
            return values;
        }, function (reason) {
            console.error('Failed to resolve amendment promises because', reason);
        });
        $scope.headerTemplateUrl = ngObibaMicaAccessTemplateUrl.getHeaderUrl('amendmentView');
        $scope.footerTemplateUrl = ngObibaMicaAccessTemplateUrl.getFooterUrl('amendmentView');
        $scope.submit = function () {
            $scope.$broadcast('schemaFormValidate');
            if ($scope.forms.requestForm.$valid) {
                DataAccessEntityResource.updateStatus($scope.entityUrl, $routeParams.id, DataAccessEntityService.status.SUBMITTED).$promise
                    .then(function () {
                    $uibModal.open({
                        scope: $scope,
                        templateUrl: 'access/views/data-access-request-submitted-modal.html'
                    }).result.then(function () {
                        resetRequestEntity();
                    });
                });
            }
            else {
                AlertService.alert({
                    id: 'DataAccessAmendmentViewController',
                    type: 'danger',
                    msgKey: 'data-access-request.submit.invalid'
                });
            }
        };
        $scope.toggleFormDrawnStatus = function (value) {
            $scope.formDrawn = value;
        };
        $scope.getFullName = getFullName;
        $scope.getProfileEmail = getProfileEmail;
    }
    angular.module('obiba.mica.access').controller('DataAccessAmendmentViewController', [
        '$scope',
        '$rootScope',
        '$routeParams',
        '$q',
        '$uibModal',
        'DataAccessEntityResource',
        'DataAccessEntityService',
        'DataAccessEntityFormService',
        'DataAccessAmendmentFormConfigResource',
        'DataAccessEntityUrls',
        'AlertService',
        'ngObibaMicaAccessTemplateUrl',
        'UserProfileService',
        Controller
    ]);
})();
//# sourceMappingURL=data-access-amendment-view-controller.js.map
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
        })
            .when('/data-access-request/:parentId/amendment/new', {
            templateUrl: 'access/views/data-access-amendment-view.html',
            controller: 'DataAccessAmendmentEditController'
        })
            .when('/data-access-request/:parentId/amendment/:id/edit', {
            templateUrl: 'access/views/data-access-amendment-view.html',
            controller: 'DataAccessAmendmentEditController'
        })
            .when('/data-access-request/:parentId/amendment/:id', {
            templateUrl: 'access/views/data-access-amendment-view.html',
            controller: 'DataAccessAmendmentViewController'
        });
    }]);
//# sourceMappingURL=data-access-request-router.js.map
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
ngObibaMica.access
    .factory('DataAccessFormConfigResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
        return $resource(ngObibaMicaUrl.getUrl('DataAccessFormConfigResource'), {}, {
            'get': { method: 'GET', errorHandler: true }
        });
    }])
    .factory('DataAccessAmendmentFormConfigResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
        return $resource(ngObibaMicaUrl.getUrl('DataAccessAmendmentFormConfigResource'), {}, {
            'get': { method: 'GET', errorHandler: true }
        });
    }])
    .factory('DataAccessRequestsResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
        return $resource(ngObibaMicaUrl.getUrl('DataAccessRequestsResource'), {}, {
            'save': { method: 'POST', errorHandler: true },
            'get': { method: 'GET' }
        });
    }])
    .factory('DataAccessRequestsExportCsvResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
        return $resource(ngObibaMicaUrl.getUrl('DataAccessRequestsExportCsvResource'), {}, {
            'get': { method: 'GET' }
        });
    }])
    .factory('DataAccessRequestResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
        return $resource(ngObibaMicaUrl.getUrl('DataAccessRequestResource'), {}, {
            'save': { method: 'PUT', params: { id: '@id' }, errorHandler: true },
            'editStartDate': { method: 'PUT', params: { id: '@id', date: '@date' }, url: ngObibaMicaUrl.getUrl('DataAccessRequestStartDateResource'), errorHandler: true },
            'editActionLogs': { method: 'PUT', params: { id: '@id' }, url: ngObibaMicaUrl.getUrl('DataAccessRequestActionLogsResource'), errorHandler: true },
            'get': { method: 'GET' },
            'delete': { method: 'DELETE' }
        });
    }])
    .factory('DataAccessAmendmentsResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
        return $resource(ngObibaMicaUrl.getUrl('DataAccessAmendmentsResource'), {}, {
            'save': { method: 'POST', params: { parentId: '@parentId' }, errorHandler: true },
            'get': { method: 'GET', params: { parentId: '@parentId' } },
            'getLogHistory': { method: 'GET', isArray: true, url: ngObibaMicaUrl.getUrl('DataAccessAmendmentsLogHistoryResource') }
        });
    }])
    .factory('DataAccessAmendmentResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
        return $resource(ngObibaMicaUrl.getUrl('DataAccessAmendmentResource'), {}, {
            'save': { method: 'PUT', params: { parentId: '@parentId', id: '@id' }, errorHandler: true },
            'get': { method: 'GET' },
            'delete': { method: 'DELETE' }
        });
    }])
    .factory('DataAccessRequestAttachmentsUpdateResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
        return $resource(ngObibaMicaUrl.getUrl('DataAccessRequestAttachmentsUpdateResource'), {}, {
            'save': { method: 'PUT', params: { id: '@id' }, errorHandler: true }
        });
    }])
    .factory('DataAccessRequestCommentsResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
        return $resource(ngObibaMicaUrl.getUrl('DataAccessRequestCommentsResource'), {}, {
            'save': {
                method: 'POST',
                params: { id: '@id', admin: '@admin' },
                headers: { 'Content-Type': 'text/plain' },
                errorHandler: true
            },
            'get': { method: 'GET', params: { id: '@id', admin: '@admin' }, errorHandler: true }
        });
    }])
    .factory('DataAccessRequestCommentResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
        return $resource(ngObibaMicaUrl.getUrl('DataAccessRequestCommentResource'), {}, {
            'delete': {
                method: 'DELETE',
                params: { id: '@id', commentId: '@commentId' },
                errorHandler: true
            },
            'update': {
                method: 'PUT',
                params: { id: '@id', commentId: '@commentId' },
                headers: { 'Content-Type': 'text/plain' },
                errorHandler: true
            }
        });
    }])
    .factory('DataAccessRequestStatusResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
        return $resource(ngObibaMicaUrl.getUrl('DataAccessRequestStatusResource'), {}, {
            'update': {
                method: 'PUT',
                params: { id: '@id', status: '@status' },
                errorHandler: true
            }
        });
    }])
    .factory('DataAccessAmendmentStatusResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
        return $resource(ngObibaMicaUrl.getUrl('DataAccessAmendmentStatusResource'), {}, {
            'update': {
                method: 'PUT',
                params: { id: '@id', parentId: '@parentId', status: '@status' },
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
        if (typeof (newOptions) === 'object') {
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
    function () {
        var form = null;
        this.setForm = function (f) {
            form = f;
        };
        this.isDirty = function () {
            return form && form.$dirty;
        };
    }
])
    .filter('filterProfileAttributes', function () {
    return function (attributes) {
        var exclude = ['email', 'firstName', 'lastName', 'createdDate', 'lastLogin', 'username'];
        return attributes.filter(function (attribute) {
            return exclude.indexOf(attribute.key) === -1;
        });
    };
})
    .filter('capitalizeFirstLetter', ['StringUtils', function (StringUtils) {
        return function (text) {
            return StringUtils.capitaliseFirstLetter(text);
        };
    }]);
//# sourceMappingURL=data-access-request-service.js.map
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
ngObibaMica.sets = angular.module('obiba.mica.sets', [
    'obiba.alert',
    'ui.bootstrap',
    'pascalprecht.translate',
    'templates-ngObibaMica',
    'LocalStorageModule'
]);
//# sourceMappingURL=sets.js.map
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
(function () {
    ngObibaMica.sets
        .config(['$provide', function ($provide) {
            $provide.provider('ngObibaMicaSetsTemplateUrl', new NgObibaMicaTemplateUrlFactory().create({
                cart: { header: null, footer: null },
                sets: { header: null, footer: null }
            }));
        }]);
})();
//# sourceMappingURL=sets-template-url-provider.js.map
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
        .factory('SetResource', ['$resource', 'ApplicationCacheService', 'ngObibaMicaUrl',
        function ($resource, ApplicationCacheService, ngObibaMicaUrl) {
            var url = ngObibaMicaUrl.getUrl('SetResource');
            return $resource(url, {}, {
                'get': {
                    method: 'GET',
                    params: { type: '@type', id: '@id' },
                    errorHandler: true
                },
                'delete': {
                    method: 'DELETE',
                    params: { type: '@type', id: '@id' },
                    errorHandler: true,
                    transformResponse: function () {
                        ApplicationCacheService.clearCache('taxonomyResource');
                        ApplicationCacheService.clearCache('taxonomiesResource');
                    }
                }
            });
        }])
        .factory('SetDocumentsResource', ['$resource', 'ngObibaMicaUrl',
        function ($resource, ngObibaMicaUrl) {
            var url = ngObibaMicaUrl.getUrl('SetDocumentsResource');
            return $resource(url, {}, {
                'get': {
                    method: 'GET',
                    params: { type: '@type', id: '@id', from: '@from', limit: '@limit' },
                    errorHandler: true
                }
            });
        }])
        .factory('SetClearResource', ['$resource', 'ngObibaMicaUrl',
        function ($resource, ngObibaMicaUrl) {
            var url = ngObibaMicaUrl.getUrl('SetClearResource');
            return $resource(url, {}, {
                'clear': {
                    method: 'DELETE',
                    params: { type: '@type', id: '@id' },
                    errorHandler: true
                }
            });
        }])
        .factory('SetExistsResource', ['$resource', 'ngObibaMicaUrl',
        function ($resource, ngObibaMicaUrl) {
            var url = ngObibaMicaUrl.getUrl('SetExistsResource');
            return $resource(url, {}, {
                'get': {
                    method: 'GET',
                    params: { type: '@type', id: '@id', did: '@did' },
                    errorHandler: true
                }
            });
        }])
        .factory('SetImportResource', ['$resource', 'ngObibaMicaUrl',
        function ($resource, ngObibaMicaUrl) {
            var url = ngObibaMicaUrl.getUrl('SetImportResource');
            return $resource(url, {}, {
                'save': {
                    method: 'POST',
                    params: { type: '@type', id: '@id' },
                    headers: { 'Content-Type': 'text/plain' },
                    errorHandler: true
                }
            });
        }])
        .factory('SetImportQueryResource', ['$resource', 'ngObibaMicaUrl',
        function ($resource, ngObibaMicaUrl) {
            var url = ngObibaMicaUrl.getUrl('SetImportQueryResource');
            var requestTransformer = function (obj) {
                var str = [];
                for (var p in obj) {
                    str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                }
                return str.join('&');
            };
            return $resource(url, {}, {
                'save': {
                    method: 'POST',
                    params: { type: '@type', id: '@id' },
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    errorHandler: true,
                    transformRequest: requestTransformer
                }
            });
        }])
        .factory('SetRemoveResource', ['$resource', 'ngObibaMicaUrl',
        function ($resource, ngObibaMicaUrl) {
            var url = ngObibaMicaUrl.getUrl('SetRemoveResource');
            return $resource(url, {}, {
                'delete': {
                    method: 'POST',
                    params: { type: '@type', id: '@id' },
                    headers: { 'Content-Type': 'text/plain' },
                    errorHandler: true
                }
            });
        }]);
})();
//# sourceMappingURL=set-resources.js.map
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
        .factory('SetsResource', ['$resource', 'ApplicationCacheService', 'ngObibaMicaUrl',
        function ($resource, ApplicationCacheService, ngObibaMicaUrl) {
            return $resource(ngObibaMicaUrl.getUrl('SetsResource'), {}, {
                'save': {
                    method: 'POST',
                    params: { type: '@type' },
                    errorHandler: true,
                    transformResponse: function (data) {
                        ApplicationCacheService.clearCache('taxonomyResource');
                        ApplicationCacheService.clearCache('taxonomiesResource');
                        return JSON.parse(data);
                    }
                }
            });
        }])
        .factory('SetsImportResource', ['$resource', 'ApplicationCacheService', 'ngObibaMicaUrl',
        function ($resource, ApplicationCacheService, ngObibaMicaUrl) {
            return $resource(ngObibaMicaUrl.getUrl('SetsImportResource'), {}, {
                'save': {
                    method: 'POST',
                    params: { type: '@type' },
                    headers: { 'Content-Type': 'text/plain' },
                    errorHandler: true,
                    transformResponse: function (data) {
                        ApplicationCacheService.clearCache('taxonomyResource');
                        ApplicationCacheService.clearCache('taxonomiesResource');
                        return JSON.parse(data);
                    }
                }
            });
        }]);
})();
//# sourceMappingURL=sets-resources.js.map
/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";
var SetService = /** @class */ (function () {
    function SetService($window, $location, $log, $translate, localStorageService, PageUrlService, SetsImportResource, SetResource, SetDocumentsResource, SetClearResource, SetExistsResource, SetImportResource, SetImportQueryResource, SetRemoveResource, ObibaServerConfigResource, SessionProxy) {
        this.$window = $window;
        this.$location = $location;
        this.$log = $log;
        this.$translate = $translate;
        this.localStorageService = localStorageService;
        this.PageUrlService = PageUrlService;
        this.SetsImportResource = SetsImportResource;
        this.SetResource = SetResource;
        this.SetDocumentsResource = SetDocumentsResource;
        this.SetClearResource = SetClearResource;
        this.SetExistsResource = SetExistsResource;
        this.SetImportResource = SetImportResource;
        this.SetImportQueryResource = SetImportQueryResource;
        this.SetRemoveResource = SetRemoveResource;
        this.ObibaServerConfigResource = ObibaServerConfigResource;
        this.SessionProxy = SessionProxy;
        this.options = {
            CartHelpText: null,
            SetsHelpText: null,
        };
    }
    SetService.prototype.setSettingOption = function (newOptions) {
        var _this = this;
        if (typeof (newOptions) === "object") {
            Object.keys(newOptions).forEach(function (option) {
                if (option in _this.options) {
                    _this.options[option] = newOptions[option];
                }
            });
        }
    };
    SetService.prototype.setGettingOption = function () {
        return angular.copy(this.options);
    };
    SetService.prototype.serverConfig = function () {
        var _this = this;
        var serverConfigPromise = this.ObibaServerConfigResource.get(function (micaConfig) {
            _this.hasMultipleStudies = !micaConfig.isSingleStudyEnabled || micaConfig.isHarmonizedDatasetEnabled;
            _this.hasHarmonization = micaConfig.isHarmonizedDatasetEnabled;
            _this.maxNumberOfSets = micaConfig.maxNumberOfSets;
            _this.maxItemsPerSets = micaConfig.maxItemsPerSet;
            return micaConfig;
        });
        return serverConfigPromise.$promise || serverConfigPromise;
    };
    SetService.prototype.isSingleStudy = function () {
        return !this.hasMultipleStudies;
    };
    SetService.prototype.hasHarmonizedDatasets = function () {
        return this.hasHarmonization;
    };
    SetService.prototype.getMaxItemsPerSets = function () {
        return this.maxItemsPerSets;
    };
    SetService.prototype.getMaxNumberOfSets = function () {
        return this.maxNumberOfSets;
    };
    /**
     * Get the documents in the set.
     * Return a promise on the documents.
     * @param setId the set's identifier
     * @param documentType the document type
     * @param fromIdx from position
     * @param limitIdx maximum number of documents that are fetched
     */
    SetService.prototype.getSetDocuments = function (setId, documentType, fromIdx, limitIdx) {
        return this.SetDocumentsResource.get({
            from: fromIdx,
            id: setId,
            limit: limitIdx,
            type: documentType,
        }).$promise;
    };
    /**
     * Get the documents in the cart. Create the cart's set if missing.
     * Return a promise on the documents.
     * @param documentType the document type
     * @param fromIdx from position
     * @param limitIdx maximum number of documents that are fetched
     */
    SetService.prototype.getCartDocuments = function (documentType, fromIdx, limitIdx) {
        var _this = this;
        return this.getOrCreateCart(documentType).then(function (set) {
            return _this.getSetDocuments(set.id, documentType, fromIdx, limitIdx);
        });
    };
    /**
     * Check if document is in the set.
     * Return a promise on the response.
     * @param setId the set's identifier
     * @param documentType the document type
     * @param documentId the document ID
     */
    SetService.prototype.isDocumentInSet = function (setId, documentType, documentId) {
        return this.SetExistsResource.get({ type: documentType, id: setId, did: documentId }).$promise;
    };
    /**
     * Check if document is in the cart.
     * Return a promise on the response.
     * @param documentType the document type
     * @param documentId the document ID
     */
    SetService.prototype.isDocumentInCart = function (documentType, documentId) {
        var _this = this;
        return this.getOrCreateCart(documentType).then(function (set) {
            return _this.isDocumentInSet(set.id, documentType, documentId);
        });
    };
    /**
     * Add one or more documents to the set.
     * Return a promise on the set.
     * @param setId the set's identifier
     * @param documentType the document type
     * @param documentId the document ID or an array od document IDs
     */
    SetService.prototype.addDocumentToSet = function (setId, documentType, documentId) {
        var _this = this;
        var did = Array.isArray(documentId) ? documentId.join("\n") : documentId;
        return this.SetResource.get({ type: documentType, id: setId }).$promise.then(function (set) {
            return _this.SetImportResource.save({ type: documentType, id: set.id }, did).$promise;
        }).then(function (set) {
            _this.notifySetChanged(set);
            return set;
        });
    };
    /**
     * Add one or more documents to the cart's set.
     * Return a promise on the cart's set.
     * @param documentType the document type
     * @param documentId the document ID or an array of document IDs
     */
    SetService.prototype.addDocumentToCart = function (documentType, documentId) {
        var _this = this;
        var did = Array.isArray(documentId) ? documentId.join("\n") : documentId;
        return this.getOrCreateCart(documentType).then(function (set) {
            return _this.SetImportResource.save({ type: documentType, id: set.id }, did).$promise;
        }).then(function (set) {
            return _this.saveCart(documentType, set);
        });
    };
    /**
     * Add documents matching the query to the set.
     * Return a promise on the set.
     * @param setId the set's identifier
     * @param documentType the document type
     * @param rqlQuery the documents join query
     */
    SetService.prototype.addDocumentQueryToSet = function (setId, documentType, rqlQuery) {
        var _this = this;
        this.$log.info("query=" + rqlQuery);
        return this.SetImportQueryResource.save({ type: documentType, id: setId, query: rqlQuery }).$promise
            .then(function (set) {
            _this.notifySetChanged(set);
            return set;
        });
    };
    /**
     * Add documents matching the query to the cart's set.
     * Return a promise on the cart's set.
     * @param documentType the document type
     * @param rqlQuery the documents join query
     */
    SetService.prototype.addDocumentQueryToCart = function (documentType, rqlQuery) {
        var _this = this;
        this.$log.info("query=" + rqlQuery);
        return this.getOrCreateCart(documentType).then(function (set) {
            return _this.SetImportQueryResource.save({ type: documentType, id: set.id, query: rqlQuery }).$promise;
        }).then(function (set) {
            return _this.saveCart(documentType, set);
        });
    };
    /**
     * Remove one or more documents from the set.
     * Return a promise on the set.
     * @param setId the set's identifier
     * @param documentType the document type
     * @param documentId the document ID or an array of document IDs
     */
    SetService.prototype.removeDocumentFromSet = function (setId, documentType, documentId) {
        var _this = this;
        var did = Array.isArray(documentId) ? documentId.join("\n") : documentId;
        return this.SetRemoveResource.delete({ type: documentType, id: setId }, did).$promise.then(function (set) {
            _this.notifySetChanged(set);
            return set;
        });
    };
    /**
     * Remove one or more documents from the cart's set.
     * Return a promise on the cart's set.
     * @param documentType the document type
     * @param documentId the document ID or an array of document IDs
     */
    SetService.prototype.removeDocumentFromCart = function (documentType, documentId) {
        var _this = this;
        var did = Array.isArray(documentId) ? documentId.join("\n") : documentId;
        return this.getOrCreateCart(documentType).then(function (set) {
            return _this.SetRemoveResource.delete({ type: documentType, id: set.id }, did).$promise;
        }).then(function (set) {
            return _this.saveCart(documentType, set);
        });
    };
    /**
     * Clear the documents list of the set.
     * @param setId the set's identifier
     * @param documentType the document type
     */
    SetService.prototype.clearSet = function (setId, documentType) {
        var _this = this;
        return this.SetClearResource.clear({ type: documentType, id: setId }).$promise.then(function () {
            return _this.SetResource.get({ id: setId, type: documentType }).$promise;
        }).then(function (set) {
            _this.notifySetChanged(set);
            return set;
        });
    };
    /**
     * Clear the documents list of the cart.
     * @param documentType the document type
     */
    SetService.prototype.clearCart = function (documentType) {
        var _this = this;
        return this.getOrCreateCart(documentType).then(function (set) {
            return _this.SetClearResource.clear({ type: documentType, id: set.id }).$promise;
        }).then(function () {
            _this.notifyCartChanged(documentType);
            return _this.getOrCreateCart(documentType);
        });
    };
    /**
     * Go to the entities count page for the variables belonging to the provided set.
     * Note that the number of variables for this type of analysis is limited to 20.
     * @param setId the set ID, if undefined, the cart set ID is used
     * @param documentId one or more document id (optional)
     */
    SetService.prototype.gotoSetEntitiesCount = function (setId, documentId) {
        var _this = this;
        var max = 20;
        var sid = setId;
        if (!sid) {
            var cartSet = this.getCartSet("variables");
            if (cartSet) {
                sid = cartSet.id;
            }
        }
        // TODO make a search query instead to force variable type to Collected
        if (!documentId) {
            this.SetDocumentsResource.get({ type: "variables", id: sid, from: 0, limit: max }).$promise
                .then(function (documents) {
                _this.gotoEntitiesCount(documents.variables.map(function (doc) { return doc.id; }));
            });
        }
        else {
            var ids = Array.isArray(documentId) ? documentId : [documentId];
            this.gotoEntitiesCount(ids.slice(0, max));
        }
    };
    /**
     * Go to the entities count page with the provided identifiers.
     * @param ids the selected identifiers
     */
    SetService.prototype.gotoEntitiesCount = function (ids) {
        if (ids) {
            var queryStr = ids.map(function (id) {
                return "all(" + id + ")";
            }).join(",");
            this.$window.location.href = this.PageUrlService.entitiesCountPage(queryStr);
            this.$location.replace();
        }
    };
    SetService.prototype.getOpalViewsDownloadUrl = function (type, setId, ids) {
        if (!setId) {
            var cartSet = this.getCartSet("variables");
            if (cartSet) {
                setId = cartSet.id;
            }
        }
        return this.PageUrlService.downloadOpalView(type, setId, ids);
    };
    SetService.prototype.getDownloadUrl = function (documentType, setId) {
        var id = setId;
        if (!id) {
            var cartSet = this.getCartSet(documentType);
            if (cartSet) {
                id = cartSet.id;
            }
        }
        if (id) {
            var queryStr = "variable(in(Mica_variable.sets," + id + "),limit(0," + this.maxItemsPerSets + ")"
                + ",fields((attributes.label.*,variableType,populationId,dceId,datasetId,datasetAcronym,attributes.Mlstr_area*))"
                + ",sort(variableType,containerId,populationWeight,dataCollectionEventWeight,datasetId,index,name))"
                + ",locale(" + this.$translate.use() + ")";
            return this.PageUrlService.downloadList(documentType, queryStr);
        }
        return null;
    };
    SetService.prototype.getDownloadUrlForIds = function (documentType, setId, ids) {
        if (!ids || ids.length < 1) {
            return this.getDownloadUrl(documentType, setId);
        }
        var queryStr = "variable(in(id,(" + ids.join(",") + ")),limit(0," + this.maxItemsPerSets + ")"
            + ",fields((attributes.label.*,variableType,datasetId,datasetAcronym))"
            + ",sort(variableType,containerId,populationWeight,dataCollectionEventWeight,datasetId,index,name))"
            + ",locale(" + this.$translate.use() + ")";
        return this.PageUrlService.downloadList(documentType, queryStr);
    };
    SetService.prototype.getSearchQuery = function (documentType, setId) {
        var target = typeToTarget(documentType);
        return setId
            ? target + "(in(Mica_" + target + ".sets," + setId + "))"
            : target + "(in(Mica_" + target + ".sets," + this.getCartSet(documentType).id + "))";
    };
    /**
     * Go to search page with documents filtered by the set they belong to.
     * @param documentType the document type
     * @param setId the set ID, if undefined, the cart set ID is used
     */
    SetService.prototype.gotoSearch = function (documentType, setId) {
        var id = setId;
        if (!id) {
            var cartSet = this.getCartSet(documentType);
            if (cartSet) {
                id = cartSet.id;
            }
        }
        if (id) {
            var queryStr = this.getSearchQuery(documentType, id);
            this.$window.location.href = this.PageUrlService.searchPage(queryStr);
            this.$location.replace();
        }
    };
    /**
     * Get the cart set if it exists.
     * @param documentType the document type
     */
    SetService.prototype.getCartSet = function (documentType) {
        var storage = this.localStorageService.get(this.getCartKey(documentType)) || {};
        var username = this.SessionProxy.profile() ? this.SessionProxy.login() : "anonymous";
        return storage[username];
    };
    /**
     * Always get the cart set in case of the set was deleted from the server. If unknown or not found, create it.
     * Return a promise on the cart's set.
     * @param documentType the document type
     */
    SetService.prototype.getOrCreateCart = function (documentType) {
        var _this = this;
        var cartSet = this.getCartSet(documentType);
        if (cartSet) {
            return this.SetResource.get({ type: documentType, id: cartSet.id }).$promise
                .then(function (set) {
                return _this.saveCart(documentType, set);
            })
                .catch(function () {
                return _this.createCart(documentType, "");
            });
        }
        else {
            return this.createCart(documentType, "");
        }
    };
    /**
     * Create a cart and returns a promise on the created set.
     * @param documentType the document type
     * @param documentId the document ID to be added to the cart (can be empty)
     */
    SetService.prototype.createCart = function (documentType, documentId) {
        var _this = this;
        return this.SetsImportResource.save({ type: documentType }, documentId).$promise
            .then(function (set) {
            return _this.saveCart(documentType, set);
        });
    };
    SetService.prototype.saveCart = function (documentType, set) {
        if (set && set.id) { // sanity check
            var storage = this.localStorageService.get(this.getCartKey(documentType)) || {};
            storage[set.username] = set;
            this.localStorageService.set(this.getCartKey(documentType), storage);
            this.notifyCartChanged(documentType);
            return set;
        }
        return undefined;
    };
    /**
     * Get the local storage key for the cart.
     * @param documentType the document type
     */
    SetService.prototype.getCartKey = function (documentType) {
        return "cart." + documentType;
    };
    /**
     * Notify at document level.
     * @param eventType the type of the event
     * @param documentType the document type
     */
    SetService.prototype.notify = function (eventType, detail) {
        var event;
        try {
            // For modern browsers except IE:
            event = new CustomEvent(eventType, { detail: detail });
        }
        catch (err) {
            // If IE 11 (or 10 or 9...?) do it this way:
            // Create the event.
            event = document.createEvent("Event");
            // Define that the event name is 'build'.
            event.initEvent(eventType, true, true);
            event.detail = detail;
        }
        // Dispatch/Trigger/Fire the event
        document.dispatchEvent(event);
    };
    /**
     * Notify at document level that the set was updated.
     * @param documentType the document type
     */
    SetService.prototype.notifySetChanged = function (documentType) {
        this.notify("set-updated", documentType);
    };
    /**
     * Notify at document level that the cart set was updated.
     * @param documentType the document type
     */
    SetService.prototype.notifyCartChanged = function (documentType) {
        this.notify("cart-updated", documentType);
    };
    SetService.$inject = [
        "$window",
        "$location",
        "$log",
        "$translate",
        "localStorageService",
        "PageUrlService",
        "SetsImportResource",
        "SetResource",
        "SetDocumentsResource",
        "SetClearResource",
        "SetExistsResource",
        "SetImportResource",
        "SetImportQueryResource",
        "SetRemoveResource",
        "ObibaServerConfigResource",
        "SessionProxy"
    ];
    return SetService;
}());
ngObibaMica.sets.service("SetService", SetService);
//# sourceMappingURL=set-service.js.map
"use strict";
var DocumentsSetTableComponentController = /** @class */ (function () {
    function DocumentsSetTableComponentController(SetService, AnalysisConfigService, $log, $uibModal) {
        this.SetService = SetService;
        this.AnalysisConfigService = AnalysisConfigService;
        this.$log = $log;
        this.$uibModal = $uibModal;
        this.allSelected = false;
        this.allPageSelected = {};
        this.selections = {};
        this.documents = {
            from: 0,
            limit: 0,
            total: 0,
        };
        this.pagination = {
            currentPage: 1,
            from: 0,
            itemsPerPage: 10,
            maxSize: 3,
            pageCount: 1,
            to: 0,
            totalHits: 0,
        };
        this.micaConfigShowAnalysis = true;
        this.micaConfigShowOpalViews = false;
    }
    DocumentsSetTableComponentController.prototype.showAnalysis = function () {
        return this.AnalysisConfigService.showAnalysis() && this.micaConfigShowAnalysis;
    };
    DocumentsSetTableComponentController.prototype.hasSelections = function () {
        return this.allSelected || this.getSelectedDocumentIds().length > 0;
    };
    DocumentsSetTableComponentController.prototype.updateAllSelected = function () {
        this.$log.info("ALL=" + this.allSelected);
        this.allSelected = !this.allSelected;
        if (this.allSelected) {
            this.allPageSelected[this.pagination.currentPage] = true;
            this.updateAllCurrentPageSelected();
        }
        else {
            this.allPageSelected = {};
            this.selections = {};
        }
    };
    DocumentsSetTableComponentController.prototype.updateAllCurrentPageSelected = function () {
        var _this = this;
        this.$log.info("ALLPAGE=" + JSON.stringify(this.allPageSelected));
        if (this.allSelected && !this.allPageSelected[this.pagination.currentPage]) {
            this.allSelected = false;
            this.allPageSelected = {};
            this.selections = {};
        }
        else if (this.documents && this.documents[this.type]) {
            this.documents[this.type].forEach(function (doc) {
                _this.selections[doc.id] = _this.allPageSelected[_this.pagination.currentPage];
            });
        }
    };
    DocumentsSetTableComponentController.prototype.updateSelection = function (documentId) {
        if (!this.selections[documentId]) {
            this.allPageSelected[this.pagination.currentPage] = false;
            this.allSelected = false;
        }
    };
    DocumentsSetTableComponentController.prototype.entitiesCount = function () {
        if (this.pagination.totalHits) {
            var sels = this.getSelectedDocumentIds();
            this.SetService.gotoSetEntitiesCount(this.setId, (sels && sels.length > 0 ? sels : undefined));
        }
    };
    DocumentsSetTableComponentController.prototype.download = function () {
        return this.hasSelections()
            ? this.SetService.getDownloadUrlForIds(this.type, this.setId, this.getSelectedDocumentIds())
            : this.SetService.getDownloadUrl(this.type, this.setId);
    };
    DocumentsSetTableComponentController.prototype.opalExport = function () {
        return this.SetService.getOpalViewsDownloadUrl(this.type, this.setId, this.hasSelections() ? this.getSelectedDocumentIds() : []);
    };
    DocumentsSetTableComponentController.prototype.search = function () {
        this.SetService.gotoSearch(this.type, this.setId);
    };
    DocumentsSetTableComponentController.prototype.clearSet = function () {
        var _this = this;
        if (!this.hasSelections()) {
            return;
        }
        var sels = this.getSelectedDocumentIds();
        if (sels && sels.length > 0) {
            this.SetService.removeDocumentFromSet(this.setId, this.type, sels)
                .then(function () {
                _this.allSelected = false;
                _this.allPageSelected = {};
                _this.selections = {};
                _this.onPageChange(_this.type, 0);
            });
        }
        else {
            this.SetService.clearSet(this.setId, this.type)
                .then(function () {
                _this.clearSelections();
                _this.onPageChange(_this.type, 0);
            });
        }
    };
    DocumentsSetTableComponentController.prototype.pageChanged = function () {
        var from = (this.pagination.currentPage - 1) * this.documents.limit;
        this.onPageChange(this.type, from);
    };
    DocumentsSetTableComponentController.prototype.addToSet = function () {
        var _this = this;
        this.$uibModal.open({
            component: "addToSetModal",
            keyboard: false,
            resolve: {
                excludeId: function () { return _this.setId; },
                ids: function () { return _this.allSelected ? {} : _this.selections; },
                query: function () { return _this.SetService.getSearchQuery(_this.type, _this.setId); },
                type: function () { return _this.type; },
            },
        }).result.then(function (result) {
            _this.clearSelections();
            _this.onUpdate(result.id, result.name, result.newCount);
        });
    };
    DocumentsSetTableComponentController.prototype.$onInit = function () {
        this.table = {
            rows: new Array(),
        };
    };
    DocumentsSetTableComponentController.prototype.getSelectedDocumentIds = function () {
        var _this = this;
        if (this.allSelected) {
            return [];
        }
        return Object.keys(this.selections).filter(function (id) { return _this.selections[id]; });
    };
    DocumentsSetTableComponentController.prototype.clearSelections = function () {
        this.allSelected = false;
        this.allPageSelected = {};
        this.selections = {};
    };
    return DocumentsSetTableComponentController;
}());
//# sourceMappingURL=document-set-table-component-controller.js.map
/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";
var SetsAlertBuilder = /** @class */ (function () {
    function SetsAlertBuilder(AlertService) {
        this.AlertService = AlertService;
    }
    SetsAlertBuilder.newBuilder = function (AlertService) {
        return new SetsAlertBuilder(AlertService);
    };
    SetsAlertBuilder.prototype.withId = function (value) {
        this.id = value;
        return this;
    };
    SetsAlertBuilder.prototype.withName = function (value) {
        this.name = value;
        return this;
    };
    SetsAlertBuilder.prototype.withCount = function (value) {
        this.count = value;
        return this;
    };
    SetsAlertBuilder.prototype.withMsgKey = function (value) {
        this.msgKey = value;
        return this;
    };
    SetsAlertBuilder.prototype.withEmptyMsgKey = function (value) {
        this.emptyMsgKey = value;
        return this;
    };
    SetsAlertBuilder.prototype.withRedirectUrl = function (value) {
        this.redirectUrl = value;
        return this;
    };
    SetsAlertBuilder.prototype.showAlert = function () {
        var msgKey = this.msgKey;
        var msgArgs = [this.redirectUrl];
        if (this.id) {
            msgArgs.push(this.id);
        }
        msgArgs.push(this.count + "");
        if (this.name) {
            msgArgs.push(this.name);
        }
        if (this.count === 0) {
            msgKey = this.emptyMsgKey;
            msgArgs = [];
        }
        this.AlertService.growl({
            delay: 4000,
            id: "MainControllerGrowl",
            msgArgs: msgArgs,
            msgKey: msgKey,
            type: "info",
        });
    };
    return SetsAlertBuilder;
}());
//# sourceMappingURL=sets-alert-builder.js.map
"use strict";
var AddToSetComponentModalController = /** @class */ (function () {
    function AddToSetComponentModalController(RqlQueryService, RqlQueryUtils, SetsResource, SetsImportResource, SetService, ngObibaMicaUrl, AlertService) {
        this.RqlQueryService = RqlQueryService;
        this.RqlQueryUtils = RqlQueryUtils;
        this.SetsResource = SetsResource;
        this.SetsImportResource = SetsImportResource;
        this.SetService = SetService;
        this.ngObibaMicaUrl = ngObibaMicaUrl;
        this.AlertService = AlertService;
        this.disableActions = false;
    }
    AddToSetComponentModalController.prototype.accept = function () {
        var _this = this;
        this.disableActions = true;
        if (this.choice.radio === "NEW") {
            this.choice.name = this.choice.name.trim();
        }
        if (this.choice.radio === "EXISTING" && this.choice.selected !== undefined) {
            this.processDocumentSet(this.choice.selected.id, this.resolve.type, this.resolve.query, this.resolve.ids).then(function (updatedSet) {
                _this.close({
                    $value: {
                        id: updatedSet.id,
                        name: updatedSet.name,
                        newCount: updatedSet.count - _this.choice.selected.count,
                    },
                });
            });
        }
        else {
            this.SetsImportResource.save({ type: this.resolve.type, name: this.choice.name }, "")
                .$promise.then(function (set) {
                _this.processDocumentSet(set.id, _this.resolve.type, _this.resolve.query, _this.resolve.ids).then(function (updatedSet) {
                    _this.close({
                        $value: {
                            id: updatedSet.id,
                            name: updatedSet.name,
                            newCount: updatedSet.count,
                        },
                    });
                });
            });
        }
    };
    AddToSetComponentModalController.prototype.cancel = function () {
        this.dismiss();
    };
    AddToSetComponentModalController.prototype.onRadioChanged = function () {
        if (this.choice.radio === "NEW") {
            this.onNameChanged();
        }
        else if (this.choice.radio === "EXISTING") {
            this.onSelected();
        }
    };
    AddToSetComponentModalController.prototype.onNameChanged = function () {
        this.choice.radio = "NEW";
        this.canAccept = this.choice.name && this.choice.name.trim().length > 0;
        if (this.choice.selected !== undefined) {
            this.choice.selected = undefined;
        }
    };
    AddToSetComponentModalController.prototype.onSelected = function () {
        this.choice.radio = "EXISTING";
        this.canAccept = this.choice.selected !== undefined;
        if (this.choice.name !== undefined) {
            this.choice.name = undefined;
        }
    };
    AddToSetComponentModalController.prototype.$onInit = function () {
        var _this = this;
        this.SetsResource.query({ type: this.resolve.type }).$promise.then(function (allSets) {
            _this.sets = allSets.filter(function (set) { return set.name && (!_this.resolve.excludeId || _this.resolve.excludeId !== set.id); });
            var maxNumberOfSets = _this.SetService.getMaxNumberOfSets();
            _this.canAddMoreSets = _this.sets.length < maxNumberOfSets - (_this.resolve.excludeId ? 1 : 0);
            if (!_this.canAddMoreSets) {
                _this.AlertService.alert({
                    delay: 0,
                    id: "MaxAttainedAlert",
                    msgArgs: [maxNumberOfSets, _this.ngObibaMicaUrl.getUrl("SetsPage")],
                    msgKey: "sets.maximum-number-attained",
                    type: "warning",
                });
            }
        });
    };
    AddToSetComponentModalController.prototype.addQuery = function (setId, type, query) {
        var parsedQuery = this.RqlQueryService.parseQuery(query);
        var target = typeToTarget(type);
        var queryWithLimitAndFields = this.RqlQueryUtils
            .rewriteQueryWithLimitAndFields(parsedQuery, target, this.SetService.getMaxItemsPerSets(), ["id"]);
        return this.SetService.addDocumentQueryToSet(setId, type, queryWithLimitAndFields);
    };
    AddToSetComponentModalController.prototype.processDocumentSet = function (setId, type, query, identifiers) {
        var selections = Object.keys(identifiers);
        if (identifiers !== undefined && selections.length > 0) {
            return this.SetService.addDocumentToSet(setId, type, selections);
        }
        else {
            return this.addQuery(setId, type, query);
        }
    };
    AddToSetComponentModalController.EXISTING_CHOICE = "EXISTING";
    AddToSetComponentModalController.NEW_CHOICE = "NEW";
    AddToSetComponentModalController.$inject = [
        "RqlQueryService",
        "RqlQueryUtils",
        "SetsResource",
        "SetsImportResource",
        "SetService",
        "ngObibaMicaUrl",
        "AlertService"
    ];
    return AddToSetComponentModalController;
}());
var AddToSetComponentModalComponent = /** @class */ (function () {
    function AddToSetComponentModalComponent() {
        this.transclude = true;
        this.bindings = {
            close: "&",
            dismiss: "&",
            resolve: "<",
        };
        this.controller = AddToSetComponentModalController;
        this.controllerAs = "$ctrl";
        this.templateUrl = "sets/components/add-to-set-modal/component.html";
    }
    return AddToSetComponentModalComponent;
}());
angular.module("obiba.mica.sets").component("addToSetModal", new AddToSetComponentModalComponent());
//# sourceMappingURL=component.js.map
/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CartDocumentsTableController = /** @class */ (function (_super) {
    __extends(CartDocumentsTableController, _super);
    function CartDocumentsTableController(PageUrlService, LocalizedValues, SetService, AnalysisConfigService, $translate, $log, $scope, $uibModal) {
        var _this = _super.call(this, SetService, AnalysisConfigService, $log, $uibModal) || this;
        _this.PageUrlService = PageUrlService;
        _this.LocalizedValues = LocalizedValues;
        _this.SetService = SetService;
        _this.AnalysisConfigService = AnalysisConfigService;
        _this.$translate = $translate;
        _this.$log = $log;
        _this.$scope = $scope;
        SetService.serverConfig().then(function (config) {
            _this.showStudies = !_this.SetService.isSingleStudy();
            _this.showVariableType = _this.SetService.hasHarmonizedDatasets();
            _this.currentUserCanCreateSets = config.currentUserCanCreateSets;
            _this.micaConfigShowAnalysis = config.isSetsAnalysisEnabled;
            _this.micaConfigShowSearch = config.isSetsSearchEnabled;
            _this.micaConfigShowOpalViews = config.downloadOpalViewsFromSetsAllowed;
        });
        return _this;
    }
    CartDocumentsTableController.prototype.search = function () {
        this.SetService.gotoSearch(this.type);
    };
    CartDocumentsTableController.prototype.clearSet = function () {
        var _this = this;
        if (!this.hasSelections()) {
            return;
        }
        var sels = this.getSelectedDocumentIds();
        if (sels && sels.length > 0) {
            this.SetService.removeDocumentFromCart(this.type, sels)
                .then(function () {
                _this.allSelected = false;
                _this.allPageSelected = {};
                _this.selections = {};
                _this.$scope.$emit("cart-cleared", _this.type);
            });
        }
        else {
            this.SetService.clearCart(this.type)
                .then(function () {
                _this.allSelected = false;
                _this.allPageSelected = {};
                _this.selections = {};
                _this.$scope.$emit("cart-cleared", _this.type);
            });
        }
    };
    CartDocumentsTableController.prototype.$onChanges = function () {
        this.table = this.asTable();
        this.localizedTotal = this.LocalizedValues
            .formatNumber((this.documents && this.documents.total) ? this.documents.total : 0);
    };
    CartDocumentsTableController.prototype.localize = function (values) {
        return this.LocalizedValues.forLang(values, this.$translate.use());
    };
    CartDocumentsTableController.prototype.asTable = function () {
        var _this = this;
        var table = {
            rows: new Array(),
        };
        this.pagination.totalHits = this.documents ? this.documents.total : 0;
        this.pagination.currentPage = this.documents ? this.documents.from / this.documents.limit + 1 : 0;
        this.pagination.itemsPerPage = this.documents ? this.documents.limit : 0;
        this.pagination.pageCount = Math.ceil(this.pagination.totalHits / this.pagination.itemsPerPage);
        this.pagination.currentPage = this.documents ? this.documents.from / this.documents.limit + 1 : 0;
        this.pagination.from = this.documents ? this.documents.from + 1 : 0;
        var documentCounts = this.documents && this.documents[this.type] ? this.documents[this.type].length : 0;
        this.pagination.to = this.documents ? this.documents.from + documentCounts : 0;
        if (documentCounts) {
            if (this.allSelected) {
                this.allPageSelected[this.pagination.currentPage] = true;
            }
            this.documents[this.type].forEach(function (doc) {
                if (_this.allSelected) {
                    _this.selections[doc.id] = true;
                }
                var studyAcronym = _this.localize(doc.studySummary.acronym);
                var studyName = _this.localize(doc.studySummary.name);
                var studyType = doc.variableType === "Dataschema" ? "harmonization" : "individual";
                var studyLink = _this.PageUrlService.studyPage(doc.studyId, studyType);
                var population = (doc.studySummary.populationSummaries || [])[0];
                var populationName = _this.localize(population.name);
                var populationLink = _this.PageUrlService.studyPopulationPage(doc.studyId, studyType, population.id, true);
                var dce = (population.dataCollectionEventSummaries || [])[0];
                var dceName = dce ? _this.localize(dce.name) : undefined;
                var dceLink = dce ? _this.PageUrlService.StudyDcePage(doc.studyId, studyType, dce.id) : undefined;
                var datasetName = _this.localize(doc.datasetName);
                var datasetLink = _this.PageUrlService.datasetPage(doc.datasetId, doc.variableType);
                var variableLink = _this.PageUrlService.variablePage(doc.id);
                var attrLabel = (doc.attributes || []).filter(function (attr) { return attr.name === "label"; });
                var variableLabel = attrLabel && attrLabel.length > 0 ? _this.localize(attrLabel[0].values) : "";
                var row = new Array({
                    link: undefined,
                    value: doc.id,
                }, {
                    link: variableLink ? variableLink : datasetLink,
                    value: doc.name,
                }, {
                    link: undefined,
                    value: variableLabel,
                }, {
                    link: undefined,
                    value: doc.variableType,
                }, {
                    link: studyLink,
                    value: studyAcronym,
                }, {
                    link: populationLink,
                    value: populationName,
                }, {
                    link: dceLink,
                    value: dceName,
                }, {
                    link: datasetLink,
                    value: datasetName,
                });
                table.rows.push(row);
            });
        }
        return table;
    };
    CartDocumentsTableController.$inject = ["PageUrlService", "LocalizedValues", "SetService", "AnalysisConfigService",
        "$translate", "$log", "$scope", "$uibModal"];
    return CartDocumentsTableController;
}(DocumentsSetTableComponentController));
var CartDocumentsTableComponent = /** @class */ (function () {
    function CartDocumentsTableComponent() {
        this.transclude = true;
        this.bindings = {
            documents: "<",
            onPageChange: "<",
            onUpdate: "<",
            options: "<",
            type: "<",
        };
        this.controller = CartDocumentsTableController;
        this.controllerAs = "$ctrl";
        this.templateUrl = "sets/components/cart-documents-table/component.html";
    }
    return CartDocumentsTableComponent;
}());
ngObibaMica.sets
    .component("cartDocumentsTable", new CartDocumentsTableComponent());
//# sourceMappingURL=component.js.map
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var VariablesSetTableComponentController = /** @class */ (function (_super) {
    __extends(VariablesSetTableComponentController, _super);
    function VariablesSetTableComponentController(SetService, AnalysisConfigService, $log, $translate, PageUrlService, LocalizedValues, $uibModal) {
        var _this = _super.call(this, SetService, AnalysisConfigService, $log, $uibModal) || this;
        _this.SetService = SetService;
        _this.AnalysisConfigService = AnalysisConfigService;
        _this.$log = $log;
        _this.$translate = $translate;
        _this.PageUrlService = PageUrlService;
        _this.LocalizedValues = LocalizedValues;
        _this.$uibModal = $uibModal;
        SetService.serverConfig().then(function (config) {
            _this.micaConfigShowAnalysis = config.isSetsAnalysisEnabled;
            _this.micaConfigShowSearch = config.isSetsSearchEnabled;
            _this.micaConfigShowOpalViews = config.downloadOpalViewsFromSetsAllowed;
        });
        return _this;
    }
    VariablesSetTableComponentController.prototype.$onChanges = function (changes) {
        if (changes.setId !== undefined) {
            this.allSelected = false;
            this.allPageSelected = {};
            this.selections = {};
        }
        this.table = this.asTable();
        this.localizedTotal = this.LocalizedValues
            .formatNumber((this.documents && this.documents.total) ? this.documents.total : 0);
    };
    VariablesSetTableComponentController.prototype.localize = function (values) {
        return this.LocalizedValues.forLang(values, this.$translate.use());
    };
    VariablesSetTableComponentController.prototype.asTable = function () {
        var _this = this;
        var table = {
            rows: new Array(),
        };
        this.pagination.totalHits = this.documents ? this.documents.total : 0;
        this.pagination.currentPage = this.documents ? this.documents.from / this.documents.limit + 1 : 0;
        this.pagination.itemsPerPage = this.documents ? this.documents.limit : 0;
        this.pagination.pageCount = Math.ceil(this.pagination.totalHits / this.pagination.itemsPerPage);
        this.pagination.from = this.documents ? this.documents.from + 1 : 0;
        var documentCounts = this.documents && this.documents[this.type] ? this.documents[this.type].length : 0;
        this.pagination.to = this.documents ? this.documents.from + documentCounts : 0;
        if (documentCounts) {
            if (this.allSelected) {
                this.allPageSelected[this.pagination.currentPage] = true;
            }
            this.documents[this.type].forEach(function (doc) {
                if (_this.allSelected) {
                    _this.selections[doc.id] = true;
                }
                var studyAcronym = _this.localize(doc.studySummary.acronym);
                var studyName = _this.localize(doc.studySummary.name);
                var studyType = doc.variableType === "Dataschema" ? "harmonization" : "individual";
                var studyLink = _this.PageUrlService.studyPage(doc.studyId, studyType);
                var population = (doc.studySummary.populationSummaries || [])[0];
                var populationName = _this.localize(population.name);
                var populationLink = _this.PageUrlService.studyPopulationPage(doc.studyId, studyType, population.id, true);
                var dce = (population.dataCollectionEventSummaries || [])[0];
                var dceName = dce ? _this.localize(dce.name) : undefined;
                var dceLink = dce ? _this.PageUrlService.StudyDcePage(doc.studyId, studyType, dce.id) : undefined;
                var datasetName = _this.localize(doc.datasetName);
                var datasetLink = _this.PageUrlService.datasetPage(doc.datasetId, doc.variableType);
                var variableLink = _this.PageUrlService.variablePage(doc.id);
                var attrLabel = (doc.attributes || []).filter(function (attr) { return attr.name === "label"; });
                var variableLabel = attrLabel && attrLabel.length > 0 ? _this.localize(attrLabel[0].values) : "";
                var row = new Array({
                    link: undefined,
                    value: doc.id,
                }, {
                    link: variableLink ? variableLink : datasetLink,
                    value: doc.name,
                }, {
                    link: undefined,
                    value: variableLabel,
                }, {
                    link: undefined,
                    value: doc.variableType,
                }, {
                    link: studyLink,
                    value: studyAcronym,
                }, {
                    link: populationLink,
                    value: populationName,
                }, {
                    link: dceLink,
                    value: dceName,
                }, {
                    link: datasetLink,
                    value: datasetName,
                });
                table.rows.push(row);
            });
        }
        return table;
    };
    VariablesSetTableComponentController.$inject = ["SetService", "AnalysisConfigService", "$log", "$translate", "PageUrlService",
        "LocalizedValues", "$uibModal"];
    return VariablesSetTableComponentController;
}(DocumentsSetTableComponentController));
var DocumentSetTableComponent = /** @class */ (function () {
    function DocumentSetTableComponent() {
        this.transclude = true;
        this.bindings = {
            documents: "<",
            onPageChange: "<",
            onUpdate: "<",
            options: "<",
            setId: "<",
            type: "<",
        };
        this.controller = VariablesSetTableComponentController;
        this.controllerAs = "$ctrl";
        this.templateUrl = "sets/components/set-variables-table/component.html";
    }
    return DocumentSetTableComponent;
}());
angular.module("obiba.mica.sets").component("setVariablesTable", new DocumentSetTableComponent());
//# sourceMappingURL=component.js.map
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
    function manageSetsCartHelpText($scope, $translate, $cookies, optionKey, trKey) {
        var cookiesSetsCartHelp = optionKey + '_micaHideHelpText';
        $translate([trKey])
            .then(function (translation) {
            if (!$scope.options[optionKey] && !$cookies.get(cookiesSetsCartHelp)) {
                $scope.options[optionKey] = translation[trKey];
            }
        });
        // Close the cart help box and set the local cookies
        $scope.closeHelpBox = function () {
            $cookies.put(cookiesSetsCartHelp, true);
            $scope.options[optionKey] = null;
        };
        // Retrieve from local cookies if user has disabled the cart help box and hide the box if true
        if ($cookies.get(cookiesSetsCartHelp)) {
            $scope.options[optionKey] = null;
        }
    }
    ngObibaMica.sets
        .controller('CartController', [
        '$scope',
        '$location',
        '$translate',
        '$cookies',
        'SetService',
        'ngObibaMicaSetsTemplateUrl',
        'AlertService',
        'ngObibaMicaUrl',
        'ObibaSearchOptions',
        function ($scope, $location, $translate, $cookies, SetService, ngObibaMicaSetsTemplateUrl, AlertService, ngObibaMicaUrl, ObibaSearchOptions) {
            $scope.options = SetService.setGettingOption();
            manageSetsCartHelpText($scope, $translate, $cookies, 'CartHelpText', 'sets.cart.help');
            $scope.cartHeaderTemplateUrl = ngObibaMicaSetsTemplateUrl.getHeaderUrl('cart');
            $scope.loading = true;
            var limit = 100;
            var onDocuments = function (variables) {
                $scope.loading = false;
                $scope.variables = variables;
            };
            var promisedDocs = SetService.getCartDocuments('variables', 0, limit);
            if (promisedDocs) {
                promisedDocs.then(onDocuments);
            }
            else {
                $scope.variables = { total: 0 };
            }
            function onUpdate(setId, setName, addedCount) {
                SetsAlertBuilder.newBuilder(AlertService)
                    .withId(setId)
                    .withName(setName)
                    .withCount(addedCount)
                    .withMsgKey('sets.set.variables-added')
                    .withEmptyMsgKey('sets.set.no-variable-added')
                    .withRedirectUrl(ngObibaMicaUrl.getUrl('SetsPage'))
                    .showAlert();
            }
            // TODO uncomment when other sets are implemented
            // var searchTaxonomyDisplay = {
            //   variable: ObibaSearchOptions.variables.showSearchTab,
            //   dataset: ObibaSearchOptions.datasets.showSearchTab,
            //   study: ObibaSearchOptions.studies.showSearchTab,
            //   network: ObibaSearchOptions.networks.showSearchTab
            // };
            var searchTaxonomyDisplay = {
                variable: ObibaSearchOptions.variables.showSearchTab
            };
            // use in `initSets` function instead of hard-coded ['variable'] when resources are available
            $scope.tabs = ObibaSearchOptions.targetTabsOrder
                .filter(function (target) { return searchTaxonomyDisplay[target]; })
                .map(function (target) {
                var type = targetToType(target);
                return { type: type, options: ObibaSearchOptions[type] };
            });
            $scope.$on('cart-cleared', function (event, type) {
                $scope.loading = true;
                SetService.getCartDocuments(type, 0, limit).then(onDocuments);
            });
            $scope.onPaginate = function (type, from) {
                SetService.getCartDocuments(type, from, limit).then(onDocuments);
            };
            $scope.onUpdate = onUpdate;
        }
    ])
        .controller('VariableToCartController', [
        '$scope',
        'SetService',
        'AlertService',
        'ngObibaMicaUrl',
        function ($scope, SetService, AlertService, ngObibaMicaUrl) {
            $scope.canBeAdded = false;
            $scope.canBeRemoved = false;
            $scope.loading = true;
            $scope.onInit = function (id) {
                SetService.serverConfig().then(function (config) {
                    var canEditCart = config.isCartEnabled && config.currentUserCanCreateCart;
                    SetService.isDocumentInCart('variables', id)
                        .then(function () {
                        $scope.loading = false;
                        $scope.canBeRemoved = canEditCart;
                    })
                        .catch(function () {
                        $scope.loading = false;
                        $scope.canBeAdded = canEditCart;
                    });
                });
            };
            $scope.onAdd = function (id) {
                $scope.loading = true;
                var beforeCart = SetService.getCartSet('variables');
                SetService.addDocumentToCart('variables', id)
                    .then(function (set) {
                    $scope.loading = false;
                    var addedCount = set.count - (beforeCart ? beforeCart.count : 0);
                    $scope.canBeRemoved = addedCount > 0;
                    $scope.canBeAdded = !$scope.canBeRemoved;
                    SetsAlertBuilder.newBuilder(AlertService)
                        .withCount(addedCount)
                        .withMsgKey('sets.cart.variable-added')
                        .withEmptyMsgKey('sets.cart.no-variable-added')
                        .withRedirectUrl(ngObibaMicaUrl.getUrl('CartPage'))
                        .showAlert();
                })
                    .catch(function () {
                    $scope.loading = false;
                });
            };
            $scope.onRemove = function (id) {
                $scope.loading = true;
                var beforeCart = SetService.getCartSet('variables');
                SetService.removeDocumentFromCart('variables', id)
                    .then(function (set) {
                    $scope.loading = false;
                    var removedCount = (beforeCart ? beforeCart.count : 0) - set.count;
                    $scope.canBeAdded = removedCount > 0;
                    $scope.canBeRemoved = !$scope.canBeAdded;
                    SetsAlertBuilder.newBuilder(AlertService)
                        .withCount(removedCount)
                        .withMsgKey('sets.cart.variable-removed')
                        .withEmptyMsgKey('sets.cart.no-variable-removed')
                        .withRedirectUrl(ngObibaMicaUrl.getUrl('CartPage'))
                        .showAlert();
                })
                    .catch(function () {
                    $scope.loading = false;
                });
            };
        }
    ])
        .controller('SetsController', [
        '$rootScope',
        '$scope',
        '$route',
        '$location',
        '$cookies',
        '$translate',
        'ObibaSearchOptions',
        'ngObibaMicaSetsTemplateUrl',
        'MetaTaxonomyService',
        'SetsResource',
        'SetResource',
        'SetService',
        'NOTIFICATION_EVENTS',
        'AlertService',
        'ngObibaMicaUrl',
        'ServerErrorUtils',
        function ($rootScope, $scope, $route, $location, $cookies, $translate, ObibaSearchOptions, ngObibaMicaSetsTemplateUrl, MetaTaxonomyService, SetsResource, SetResource, SetService, NOTIFICATION_EVENTS, AlertService, ngObibaMicaUrl, ServerErrorUtils) {
            $scope.options = SetService.setGettingOption();
            manageSetsCartHelpText($scope, $translate, $cookies, 'SetsHelpText', 'sets.set.help');
            // TODO uncomment when other sets are implemented
            // var searchTaxonomyDisplay = {
            //   variable: ObibaSearchOptions.variables.showSearchTab,
            //   dataset: ObibaSearchOptions.datasets.showSearchTab,
            //   study: ObibaSearchOptions.studies.showSearchTab,
            //   network: ObibaSearchOptions.networks.showSearchTab
            // };
            var searchTaxonomyDisplay = {
                variable: ObibaSearchOptions.variables.showSearchTab
            };
            var limit = 100;
            var registeredlocationChangeEvent;
            $scope.setsHeaderTemplateUrl = ngObibaMicaSetsTemplateUrl.getHeaderUrl('sets');
            // use in `initSets` function instead of hard-coded ['variable'] when resources are available
            $scope.tabs = ObibaSearchOptions.targetTabsOrder
                .filter(function (target) { return searchTaxonomyDisplay[target]; })
                .map(function (target) {
                var type = targetToType(target);
                return { type: type, options: ObibaSearchOptions[type] };
            });
            $scope.sets = {};
            $scope.checked = {};
            $scope.canDelete = {};
            $scope.selectedSet = {};
            function findSetById(sets, id) {
                return (sets || []).filter(function (set) {
                    return set.id === id;
                }).pop();
            }
            function initSets() {
                MetaTaxonomyService.getMetaTaxonomyForTargets(['variable']).then(function (metaTaxonomies) {
                    $scope.useableTabs = metaTaxonomies;
                    metaTaxonomies.forEach(function (meta) {
                        SetsResource.query({ type: targetToType(meta.name) }).$promise.then(function (allSets) {
                            return allSets.filter(function (set) { return set.name; });
                        }).then(function (sets) {
                            $scope.sets[meta.name] = sets;
                            var selectedSetId = $scope.selectedSet.id;
                            var selectedInSet = findSetById(sets, selectedSetId); // ensure selected is not deleted
                            if (selectedInSet) {
                                selectSetId(selectedInSet.id);
                            }
                            else if (!selectedInSet) {
                                // ensure route ID exists and hasn't been deleted
                                var routeId = $route.current.params.id && $route.current.params.id !== selectedSetId ? $route.current.params.id : null;
                                var setToSelect = null;
                                if (routeId) {
                                    setToSelect = routeId;
                                }
                                else if (sets.length > 0) {
                                    setToSelect = sets[0].id;
                                }
                                else {
                                    $scope.selectedSet = {};
                                    unsetLocationChange();
                                    $location.search('id', null);
                                    setLocationChange();
                                }
                                selectSetId(setToSelect);
                            }
                        }).catch(function (response) {
                            AlertService.alert({
                                id: 'MainController',
                                type: 'danger',
                                msg: ServerErrorUtils.buildMessage(response)
                            });
                        });
                    });
                });
            }
            function setLocationChange() {
                if (registeredlocationChangeEvent) {
                    unsetLocationChange();
                }
                registeredlocationChangeEvent = $scope.$on('$locationChangeSuccess', function () { return selectSetId($route.current.params.id); });
            }
            function unsetLocationChange() {
                if (registeredlocationChangeEvent) {
                    registeredlocationChangeEvent();
                    registeredlocationChangeEvent = undefined;
                }
            }
            function selectSetId(setId) {
                if (setId) {
                    var foundSet = Object.keys($scope.sets).reduce(function (acc, key) { return acc.concat($scope.sets[key]); }, []).find(function (set) { return set.id === setId; });
                    if (foundSet) {
                        selectSet(foundSet.type.toLowerCase(), foundSet);
                    }
                    else {
                        unsetLocationChange();
                        setLocationChange();
                        if ($scope.selectedSet.id === setId) {
                            $scope.selectedSet = {};
                        }
                        $location.search('id', $scope.selectedSet.id);
                    }
                }
            }
            function selectSet(target, set) {
                $scope.loading = true;
                $scope.selectedType = targetToType(target);
                $scope.selectedSet = set;
                unsetLocationChange();
                $location.search('id', set.id);
                setLocationChange();
                var promisedDocs = SetService.getSetDocuments($scope.selectedSet.id, $scope.selectedType, 0, limit);
                if (promisedDocs) {
                    promisedDocs.then(onDocuments);
                }
                else {
                    $scope.documents = { total: 0 };
                }
            }
            function onDocuments(documents) {
                $scope.loading = false;
                $scope.documents = documents;
                $scope.selectedSet.count = documents.total;
            }
            function showAlert(setId, setName, addedCount, addedMsgKey, noCountMsgKey, url) {
                var msgKey = addedMsgKey;
                var msgArgs = [url, setId, addedCount, setName];
                if (addedCount === 0) {
                    msgKey = noCountMsgKey;
                    msgArgs = [];
                }
                AlertService.growl({
                    id: 'MainControllerGrowl',
                    type: 'info',
                    msgKey: msgKey,
                    msgArgs: msgArgs,
                    delay: 4000
                });
            }
            function onUpdate(setId, setName, addedCount) {
                showAlert(setId, setName, addedCount, 'sets.set.variables-added', 'sets.set.no-variable-added', ngObibaMicaUrl.getUrl('SetsPage'));
                initSets();
            }
            function onPaginate(type, from) {
                if ($scope.selectedSet) {
                    SetService.getSetDocuments($scope.selectedSet.id, type, from, limit).then(onDocuments);
                }
            }
            function getCheckedIds(tabName) {
                return Object.keys($scope.checked[tabName]).filter(function (item) { return $scope.checked[tabName][item]; });
            }
            function canDeleteChecked(tabName) {
                return $scope.checked[tabName] && getCheckedIds(tabName).length > 0;
            }
            function onDeleteConfirm(event, tabName) {
                getCheckedIds(tabName).reduce(function (acc, id) {
                    if (acc === undefined || acc === null) {
                        return SetResource.delete({ id: id, type: targetToType(tabName) }).$promise;
                    }
                    return acc.then(function () {
                        return SetResource.delete({ id: id, type: targetToType(tabName) }).$promise;
                    });
                }, null).then(function () {
                    initCheckBoxes(tabName);
                    initSets();
                });
                $scope.onDeleteConfirmed();
            }
            function deleteChecked(tabName) {
                $rootScope.$broadcast(NOTIFICATION_EVENTS.showConfirmDialog, {
                    titleKey: 'sets.delete-dialog.title',
                    messageKey: 'sets.delete-dialog.message'
                }, tabName);
                $scope.onDeleteConfirmed = $scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, onDeleteConfirm);
            }
            function check(tabName) {
                $scope.canDelete[tabName] = canDeleteChecked(tabName);
            }
            function initCheckBoxes(tabName) {
                $scope.checked[tabName] = {};
                $scope.documents = { total: 0 };
                check(tabName);
            }
            initSets();
            $scope.check = check;
            $scope.deleteChecked = deleteChecked;
            $scope.canDeleteChecked = canDeleteChecked;
            $scope.onUpdate = onUpdate;
            $scope.onPaginate = onPaginate;
            $scope.selectSet = selectSet;
        }
    ]);
})();
//# sourceMappingURL=sets-controller.js.map
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
ngObibaMica.sets
    .config(['$routeProvider',
    function ($routeProvider) {
        var optionsResolve = ['ngObibaMicaSearch', function (ngObibaMicaSearch) {
                return ngObibaMicaSearch.getOptionsAsyn();
            }];
        $routeProvider
            .when('/cart', {
            templateUrl: 'sets/views/cart.html',
            controller: 'CartController',
            reloadOnSearch: false,
            resolve: {
                ObibaSearchOptions: optionsResolve
            }
        })
            .when('/sets', {
            templateUrl: 'sets/views/sets.html',
            controller: 'SetsController',
            reloadOnSearch: false,
            resolve: {
                ObibaSearchOptions: optionsResolve
            }
        });
    }]);
//# sourceMappingURL=sets-router.js.map
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
ngObibaMica.search = angular.module('obiba.mica.search', [
    'obiba.alert',
    'ui.bootstrap',
    'pascalprecht.translate',
    'ngclipboard',
    'templates-ngObibaMica',
    'obiba.mica.sets'
]);
(function () {
    ngObibaMica.search
        .run(['GraphicChartsConfigurations',
        function (GraphicChartsConfigurations) {
            GraphicChartsConfigurations.setClientConfig();
        }]);
})();
//# sourceMappingURL=search.js.map
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
/* global QUERY_TARGETS */
(function () {
    var FIELDS_TO_FILTER = ['name', 'title', 'description', 'keywords'];
    function NgObibaMicaSearchOptionsWrapper() {
        var options = {
            taxonomyPanelOptions: {
                network: {
                    taxonomies: { 'Mica_network': { trKey: 'properties' } }
                },
                study: {
                    taxonomies: { 'Mica_study': { trKey: 'properties' } }
                },
                dataset: {
                    taxonomies: { 'Mica_dataset': { trKey: 'properties' } }
                },
                variable: {
                    taxonomies: {
                        'Mica_variable': { trKey: 'properties' }
                    }
                },
                fieldsToFilter: FIELDS_TO_FILTER
            },
            targetTabsOrder: [QUERY_TARGETS.VARIABLE, QUERY_TARGETS.DATASET, QUERY_TARGETS.STUDY, QUERY_TARGETS.NETWORK]
        };
        function sanitizeFieldsToFilter(valueFieldsToFilter) {
            if (valueFieldsToFilter) {
                return valueFieldsToFilter.filter(function (valueField) {
                    return FIELDS_TO_FILTER.indexOf(valueField) > -1;
                });
            }
            return null;
        }
        function setOptions(value) {
            options = angular.merge(options, value);
            //NOTICE: angular.merge merges arrays by position. Overriding manually.
            options.targetTabsOrder = value.targetTabsOrder || options.targetTabsOrder;
            //TODO: Needs a better mechanism for setting options
            options.studies.fields = value.studies && value.studies.fields || options.studies.fields;
            options.networks.fields = value.networks && value.networks.fields || options.networks.fields;
            options.datasets.fields = value.datasets && value.datasets.fields || options.datasets.fields;
            if (value.taxonomyPanelOptions) {
                options.taxonomyPanelOptions.fieldsToFilter = sanitizeFieldsToFilter(value.taxonomyPanelOptions.fieldsToFilter) || options.taxonomyPanelOptions.fieldsToFilter;
            }
        }
        function getOptions() {
            return angular.copy(options);
        }
        this.setOptions = setOptions;
        this.getOptions = getOptions;
    }
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
    function ObibaMicaSearchOptionsService($q, $translate, optionsWrapper, ObibaServerConfigResource) {
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
            }
            else {
                ObibaServerConfigResource.get(function (micaConfig) {
                    var updatedOptions = {
                        locale: micaConfig.languages || $translate.use()
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
            getOptionsAsyn: function () {
                return resolveOptions();
            },
            /**
             * Returns the options and if getOptionsAsyn() has never been called, the default options will be returned.
             * @returns {*}
             */
            getOptions: function () {
                return optionsWrapper.getOptions();
            },
            getDefaultListPageSize: function (target) {
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
    }
    ngObibaMica.search
        .config(['$provide', function ($provide) {
            $provide.provider('ngObibaMicaSearch', function () {
                var optionsWrapper = new NgObibaMicaSearchOptionsWrapper();
                function initialize(options) {
                    optionsWrapper.setOptions(options);
                }
                this.initialize = initialize;
                this.$get = ['$q', '$translate', 'ObibaServerConfigResource',
                    function ($q, $translate, ObibaServerConfigResource) {
                        return new ObibaMicaSearchOptionsService($q, $translate, optionsWrapper, ObibaServerConfigResource);
                    }];
            });
        }]);
})();
//# sourceMappingURL=search-options-provider.js.map
/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";
var AbstractSelectionsDecorator = /** @class */ (function () {
    function AbstractSelectionsDecorator(documentType) {
        this.documentType = documentType;
    }
    AbstractSelectionsDecorator.prototype.getSelections = function () {
        return this.component.selections;
    };
    AbstractSelectionsDecorator.prototype.getSelectionIds = function () {
        return this.component.selections ? Object.keys(this.component.selections) : [];
    };
    AbstractSelectionsDecorator.prototype.clearSelections = function () {
        this.component.selections = {};
        this.component.page = { selections: {}, all: false };
    };
    AbstractSelectionsDecorator.prototype.decorate = function (component) {
        this.component = component;
        this.component.selections = {};
        this.component.page = { selections: {}, all: false };
    };
    return AbstractSelectionsDecorator;
}());
//# sourceMappingURL=abstract-selections-decroator.js.map
/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
//# sourceMappingURL=selections.js.map
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
    var pageSizes = [
        { label: '10', value: 10 },
        { label: '20', value: 20 },
        { label: '50', value: 50 },
        { label: '100', value: 100 }
    ];
    ngObibaMica.search.PaginationState = function (target, defaultPageSize) {
        this.target = target;
        this.initialPageSize = defaultPageSize;
        this.currentPage = 1;
        this.from = 0;
        this.to = 0;
        this.selected = this.findPageSize(defaultPageSize);
        this.totalHits = null;
        this.pageCount = 0;
        this.maxSize = 3;
    };
    ngObibaMica.search.PaginationState.prototype.updateRange = function () {
        var pageSize = this.selected.value;
        var current = this.currentPage;
        this.from = pageSize * (current - 1) + 1;
        this.to = Math.min(this.totalHits, pageSize * current);
    };
    ngObibaMica.search.PaginationState.prototype.initializeCurrentPage = function (pagination) {
        if (pagination && pagination.hasOwnProperty('from')) {
            this.selected = this.findPageSize(pagination.size);
            this.currentPage = 1 + pagination.from / this.selected.value;
        }
        else {
            this.selected = this.findPageSize(this.initialPageSize);
            this.currentPage = 1;
        }
    };
    ngObibaMica.search.PaginationState.prototype.update = function (pagination, hits) {
        this.totalHits = hits || null;
        this.initializeCurrentPage(pagination);
        this.updateRange();
        this.updatePageCount();
        this.updateMaxSize();
    };
    ngObibaMica.search.PaginationState.prototype.findPageSize = function (pageSize) {
        var result = pageSizes.filter(function (p) {
            return p.value === pageSize;
        }).pop();
        return result ? result : pageSizes[0];
    };
    ngObibaMica.search.PaginationState.prototype.totalHitsChanged = function (hits) {
        return null !== this.totalHits && this.totalHits !== hits;
    };
    ngObibaMica.search.PaginationState.prototype.updatePageCount = function () {
        this.pageCount = Math.ceil(this.totalHits / this.selected.value);
    };
    ngObibaMica.search.PaginationState.prototype.updateMaxSize = function () {
        this.maxSize = Math.min(3, this.pageCount);
    };
    ngObibaMica.search.PaginationState.prototype.data = function () {
        return {
            target: this.target,
            initialPageSize: this.initialPageSize,
            currentPage: this.currentPage,
            from: this.from,
            to: this.to,
            selected: this.selected,
            totalHits: this.totalHits,
            maxSize: this.maxSize,
            pageCount: this.pageCount,
            pageSizes: pageSizes
        };
    };
})();
//# sourceMappingURL=pagination-state.js.map
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
    function getTaxonomyWeightAttribute(taxonomy) {
        var defaultWeight = 0;
        if (taxonomy.attributes) {
            var weightAttribute = taxonomy.attributes.filter(function (attribute) { return 'weight' === attribute.key; })[0];
            defaultWeight = weightAttribute ? parseInt(weightAttribute.value) || 0 : 0;
        }
        return defaultWeight;
    }
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
    ngObibaMica.search.MetaTaxonomyParser = function (config) {
        function parseTerms(targetConfig, terms) {
            return terms.map(function (taxonomy, index) {
                var result = {
                    state: new ngObibaMica.search.PanelTaxonomyState(index + ''),
                    info: { name: taxonomy.name || '', title: taxonomy.title || '', description: taxonomy.description || '',
                        weight: getTaxonomyWeightAttribute(taxonomy) },
                    taxonomies: [taxonomy]
                };
                var taxonomyConfig = targetConfig.taxonomies[taxonomy.name];
                if (taxonomyConfig && taxonomyConfig.hasOwnProperty('trKey')) {
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
        function sortTaxonomies(taxonomies) {
            taxonomies.sort(function (a, b) {
                return a.info.weight - b.info.weight;
            });
        }
        this.config = config;
        this.parseTerms = parseTerms;
        this.createResultObject = createResultObject;
        this.sortTaxonomies = sortTaxonomies;
    };
    ngObibaMica.search.MetaTaxonomyParser.prototype.parseEntityTaxonomies = function (metaVocabulary) {
        return this.createResultObject(metaVocabulary, this.parseTerms(this.config[metaVocabulary.name], metaVocabulary.terms || []));
    };
    /**
     * Variable meta taxonomies need to be massaged a little more:
     * - extract Variable characteristics
     * - extract Scales as one taxonomy (there are four related taxonomies) into one
     * - sort them and return the list to the client code
     * @param metaVocabulary
     * @returns {{name, title, taxonomies}|*}
     */
    ngObibaMica.search.MetaTaxonomyParser.prototype.parseVariableTaxonomies = function (metaVocabulary) {
        var metaTaxonomies = metaVocabulary.terms.filter(function (term) {
            return ['Variable_chars', 'Scales'].indexOf(term.name) > -1;
        }).reduce(function (acc, term) {
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
                    names: scales.terms.map(function (t) { return t.name; }),
                    title: scales.title,
                    description: scales.description || '',
                    weight: getTaxonomyWeightAttribute(scales)
                },
                taxonomies: scales.terms
            });
        }
        this.sortTaxonomies(taxonomies);
        return this.createResultObject(metaVocabulary, taxonomies);
    };
})();
//# sourceMappingURL=meta-taxonomy-parser.js.map
/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
(function () {
    'use strict';
    ngObibaMica.search.PanelTaxonomyState = function (id) {
        var STATES = {
            NONE: 0,
            ACTIVE: 1,
            LOADING: 2
        };
        this.id = id;
        this.STATES = STATES;
        this.state = STATES.NONE;
    };
    ngObibaMica.search.PanelTaxonomyState.prototype.isLoading = function () {
        return this.STATES.LOADING === (this.state & this.STATES.LOADING);
    };
    ngObibaMica.search.PanelTaxonomyState.prototype.isActive = function () {
        return this.STATES.ACTIVE === (this.state & this.STATES.ACTIVE);
    };
    ngObibaMica.search.PanelTaxonomyState.prototype.active = function () {
        this.state = this.state | this.STATES.ACTIVE;
    };
    ngObibaMica.search.PanelTaxonomyState.prototype.inactive = function () {
        this.state = this.state & ~this.STATES.ACTIVE;
    };
    ngObibaMica.search.PanelTaxonomyState.prototype.loading = function () {
        this.state = this.state | this.STATES.LOADING;
    };
    ngObibaMica.search.PanelTaxonomyState.prototype.loaded = function () {
        this.state = this.state & ~this.STATES.LOADING;
    };
    ngObibaMica.search.PanelTaxonomyState.prototype.none = function () {
        this.state = this.STATES.NONE;
    };
})();
//# sourceMappingURL=panel-taxonomy-state.js.map
/*
 * Copyright (c) 2019 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
var TaxonomyCartFilter = /** @class */ (function () {
    function TaxonomyCartFilter() {
    }
    TaxonomyCartFilter.filter = function (SetService, taxonomy, $translate) {
        var cartSet = SetService.getCartSet(targetToType(taxonomy.name.split("Mica_")[1]));
        (taxonomy.vocabularies || []).filter(function (vocabulary) { return vocabulary.name === "sets"; })
            .forEach(function (setsVocabulary) {
            if (Array.isArray(setsVocabulary.terms)) {
                var filteredTerms = setsVocabulary.terms.filter(function (term) {
                    if (cartSet && term.name === cartSet.id) {
                        $translate(["sets.cart.title"]).then(function (translation) {
                            term.title = [{ locale: $translate.use(), text: translation["sets.cart.title"] }];
                        });
                    }
                    return Array.isArray(term.title) || (cartSet && term.name === cartSet.id);
                });
                setsVocabulary.terms = filteredTerms.length > 0 ? filteredTerms : null;
            }
        });
    };
    return TaxonomyCartFilter;
}());
//# sourceMappingURL=taxonomy-cart-filter.js.map
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
    ngObibaMica.search
        .factory('DocumentSuggestionResource', ['$resource', 'ngObibaMicaUrl',
        function ($resource, ngObibaMicaUrl) {
            return $resource(ngObibaMicaUrl.getUrl('DocumentSuggestion'), {}, {
                'query': {
                    method: 'GET',
                    errorHandler: true,
                    isArray: true
                }
            });
        }]);
})();
//# sourceMappingURL=document-suggestion-resource.js.map
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
//# sourceMappingURL=meta-taxonomy-resource.js.map
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
    ngObibaMica.search
        .factory('TaxonomiesResource', ['$resource', 'ngObibaMicaUrl', 'SetService', '$translate',
        function ($resource, ngObibaMicaUrl, SetService, $translate) {
            return $resource(ngObibaMicaUrl.getUrl('TaxonomiesResource'), {}, {
                'get': {
                    method: 'GET',
                    isArray: true,
                    errorHandler: true,
                    transformResponse: function (data) {
                        var parsedData = JSON.parse(data);
                        parsedData.filter(function (taxonomy) { return taxonomy.name.startsWith('Mica_'); }).forEach(function (micaTaxonomy) {
                            TaxonomyCartFilter.filter(SetService, micaTaxonomy, $translate);
                        });
                        return parsedData;
                    }
                }
            });
        }]);
})();
//# sourceMappingURL=taxonomies-resource.js.map
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
        }]);
})();
//# sourceMappingURL=taxonomies-search-resource.js.map
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
        .factory('TaxonomyResource', ['$resource', 'ngObibaMicaUrl', '$cacheFactory', 'SetService', '$translate',
        function ($resource, ngObibaMicaUrl, $cacheFactory, SetService, $translate) {
            return $resource(ngObibaMicaUrl.getUrl('TaxonomyResource'), {}, {
                'get': {
                    method: 'GET',
                    errorHandler: true,
                    transformResponse: function (data) {
                        var taxonomy = JSON.parse(data);
                        if (taxonomy.name.startsWith('Mica_') && !taxonomy.name.endsWith('_taxonomy')) {
                            TaxonomyCartFilter.filter(SetService, taxonomy, $translate);
                        }
                        return taxonomy;
                    }
                }
            });
        }]);
})();
//# sourceMappingURL=taxonomy-resource.js.map
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
    ngObibaMica.search.factory('VocabularyResource', ['$resource', 'ngObibaMicaUrl',
        function ($resource, ngObibaMicaUrl) {
            return $resource(ngObibaMicaUrl.getUrl('VocabularyResource'), {}, {
                'get': {
                    method: 'GET',
                    errorHandler: true
                }
            });
        }]);
})();
//# sourceMappingURL=vocabulary-resource.js.map
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
/* exported QUERY_GROWL_EVENT */
var QUERY_GROWL_EVENT = 'query.growl-event';
(function () {
    ngObibaMica.search
        .controller('SearchController', ['$timeout',
        '$scope',
        '$location',
        '$translate',
        '$filter',
        'AlertService',
        'LocalizedValues',
        'options',
        function ($timeout, $scope, $location, $translate, $filter, AlertService, LocalizedValues, options) {
            $scope.options = options;
            $scope.taxonomyTypeMap = {
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
            $scope.lang = $translate.use();
            function initSearchTabs() {
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
                if ($location.search().target) {
                    $scope.target = $location.search().target;
                }
                else if (!$scope.target) {
                    $scope.target = $scope.targetTabsOrder[0];
                }
            }
            var onSelectTerm = function (target, taxonomy, vocabulary, args) {
                args = args || {};
                if (args.text) {
                    args.text = args.text.replace(/[^a-zA-Z0-9*" _-]/g, '');
                }
                if (angular.isString(args)) {
                    args = { term: args };
                }
                console.log('onSelectTerm');
            };
            $scope.navigateToTarget = function (target) {
                $location.search('target', target);
                $location.search('taxonomy', null);
                $location.search('vocabulary', null);
                $scope.target = target;
            };
            $scope.$on(QUERY_GROWL_EVENT, function (event, vocabularyTitle, lang, target, msgKey) {
                msgKey = msgKey || 'search.criterion.updated';
                AlertService.growl({
                    id: 'SearchControllerGrowl',
                    type: 'info',
                    msgKey: msgKey,
                    msgArgs: [LocalizedValues.forLocale(vocabularyTitle, lang), $filter('translate')('taxonomy.target.' + target)],
                    delay: 3000
                });
            });
            $scope.onSelectTerm = onSelectTerm;
            $scope.toggleFullscreen = function (fullscreen) {
                if ($scope.isFullscreen && $scope.isFullscreen !== fullscreen) {
                    // in case the ESC key was pressed
                    $timeout(function () { $scope.isFullscreen = fullscreen; });
                }
                else {
                    $scope.isFullscreen = fullscreen;
                }
            };
            $scope.isFullscreen = false;
            function init() {
                $scope.lang = $translate.use();
                initSearchTabs();
            }
            init();
        }]);
})();
//# sourceMappingURL=search-controller.js.map
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
ngObibaMica.search
    .config(['$routeProvider',
    function ($routeProvider) {
        // This will be used to delay the loading of the search config until the options are all resolved; the result is
        // injected to the SearchController.
        var optionsResolve = ['ngObibaMicaSearch', function (ngObibaMicaSearch) {
                return ngObibaMicaSearch.getOptionsAsyn();
            }];
        $routeProvider
            .when('/classifications', {
            templateUrl: 'search/views/classifications.html',
            controller: 'SearchController',
            reloadOnSearch: false,
            resolve: {
                options: optionsResolve
            }
        });
    }]);
//# sourceMappingURL=search-router.js.map
/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";
/* global BUCKET_TYPES  */
var CoverageGroupByService = /** @class */ (function () {
    function CoverageGroupByService(ngObibaMicaSearch) {
        this.options = ngObibaMicaSearch.getOptions();
        this.groupByOptions = this.options.coverage.groupBy;
    }
    CoverageGroupByService.prototype.isSingleStudy = function () {
        // coverage => there are datasets and at least one study
        // not showing study means that there is only one
        return !this.options.studies.showSearchTab;
    };
    CoverageGroupByService.prototype.canShowStudyType = function () {
        // showing study type column means that there are several
        return this.options.studies.studiesColumn.showStudiesTypeColumn;
    };
    CoverageGroupByService.prototype.canShowStudy = function () {
        return this.groupByOptions.study || this.groupByOptions.dce;
    };
    CoverageGroupByService.prototype.canShowDce = function (bucket) {
        return (bucket.indexOf("study") > -1 || bucket.indexOf("dce") > -1)
            && this.groupByOptions.study && this.groupByOptions.dce;
    };
    CoverageGroupByService.prototype.canShowDataset = function () {
        return this.groupByOptions.dataset;
    };
    CoverageGroupByService.prototype.canShowVariableTypeFilter = function (bucket) {
        var forStudy = (bucket.indexOf("study") > -1 || bucket.indexOf("dce") > -1) && (this.groupByOptions.study);
        var forDataset = bucket.indexOf("dataset") > -1 && this.groupByOptions.dataset;
        return forStudy || forDataset;
    };
    CoverageGroupByService.prototype.studyTitle = function () {
        return "search.coverage-buckets.study";
    };
    CoverageGroupByService.prototype.studyBucket = function () {
        return BUCKET_TYPES.STUDY;
    };
    CoverageGroupByService.prototype.dceBucket = function () {
        if (this.groupByOptions.study && this.groupByOptions.dce) {
            return BUCKET_TYPES.DCE;
        }
        else {
            return this.studyBucket();
        }
    };
    CoverageGroupByService.prototype.datasetTitle = function () {
        return "search.coverage-buckets.dataset";
    };
    CoverageGroupByService.prototype.datasetBucket = function () {
        return BUCKET_TYPES.DATASET;
    };
    CoverageGroupByService.prototype.canGroupBy = function (bucket) {
        var isAllowed = false;
        switch (bucket) {
            case BUCKET_TYPES.STUDY:
            case BUCKET_TYPES.STUDY_INDIVIDUAL:
            case BUCKET_TYPES.STUDY_HARMONIZATION:
                isAllowed = this.groupByOptions.study;
                break;
            case BUCKET_TYPES.DCE:
            case BUCKET_TYPES.DCE_INDIVIDUAL:
            case BUCKET_TYPES.DCE_HARMONIZATION:
                isAllowed = this.groupByOptions.dce;
                break;
            case BUCKET_TYPES.DATASET:
            case BUCKET_TYPES.DATASET_COLLECTED:
            case BUCKET_TYPES.DATASCHEMA:
            case BUCKET_TYPES.DATASET_HARMONIZED:
                isAllowed = this.groupByOptions.dataset;
        }
        return isAllowed;
    };
    CoverageGroupByService.prototype.defaultBucket = function () {
        if (this.groupByOptions.study) {
            if (this.options.studies.showSearchTab) {
                return this.studyBucket();
            }
            else {
                return this.dceBucket();
            }
        }
        else if (this.groupByOptions.dataset) {
            return this.datasetBucket();
        }
        return "";
    };
    return CoverageGroupByService;
}());
ngObibaMica.search.service("CoverageGroupByService", ["ngObibaMicaSearch", CoverageGroupByService]);
//# sourceMappingURL=coverage-group-by-service.js.map
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
    function CriteriaNodeCompileService($templateCache, $compile) {
        return {
            compile: function (scope, element, templateUrl) {
                var template = '';
                if (scope.item.type === RQL_NODE.OR || scope.item.type === RQL_NODE.AND || scope.item.type === RQL_NODE.NAND || scope.item.type === RQL_NODE.NOR) {
                    template = angular.element($templateCache.get(templateUrl));
                }
                else {
                    template = angular.element('<criterion-dropdown criterion="item" query="query"></criterion-dropdown>');
                }
                if (scope.item.rqlQuery.args) {
                    $compile(template)(scope, function (cloned) {
                        element.replaceWith(cloned);
                    });
                }
            }
        };
    }
    ngObibaMica.search.factory('CriteriaNodeCompileService', ['$templateCache', '$compile', CriteriaNodeCompileService]);
})();
//# sourceMappingURL=criteria-node-compile-service.js.map
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
    function EntitySuggestionService($rootScope, $location, $translate, DocumentSuggestionResource, RqlQueryService, EntitySuggestionRqlUtilityService, AlertService, ServerErrorUtils) {
        function suggest(entityType, query) {
            var obibaUtils = new obiba.utils.NgObibaStringUtils();
            var cleanQuery = obibaUtils.cleanDoubleQuotesLeftUnclosed(query);
            cleanQuery = obibaUtils.cleanOrEscapeSpecialLuceneBrackets(cleanQuery);
            cleanQuery = obibaUtils.cleanSpecialLuceneCharacters(cleanQuery);
            if (entityType && query && cleanQuery.length > 1) {
                return DocumentSuggestionResource.query({ locale: $translate.use(), documentType: entityType, query: cleanQuery })
                    .$promise
                    .then(function (response) {
                    var parsedResponse = Array.isArray(response) ? response : [];
                    for (var i = 0; i < parsedResponse.length; i++) {
                        parsedResponse[i] = obibaUtils.quoteQuery(parsedResponse[i].replace(/\/.*/, ''));
                    }
                    return parsedResponse;
                }, function (response) {
                    AlertService.alert({
                        id: 'SearchController',
                        type: 'danger',
                        msg: ServerErrorUtils.buildMessage(response),
                        delay: 5000
                    });
                });
            }
            else {
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
                    var matchQuery = EntitySuggestionRqlUtilityService
                        .givenFilterQueryGetMatchQuery(EntitySuggestionRqlUtilityService.givenTargetQueryGetFilterQuery(targetQuery));
                    if (matchQuery && matchQuery.args) {
                        if (Array.isArray(matchQuery.args[0]) && matchQuery.args[0].length === 1) {
                            return matchQuery.args[0][0];
                        }
                        else if (Array.isArray(matchQuery.args[0]) && matchQuery.args[0].length > 1) {
                            return matchQuery.args[0].join(',');
                        }
                        return matchQuery.args[0].length ? matchQuery.args[0][0] : '';
                    }
                    else {
                        return '';
                    }
                }
            }
            return '';
        }
        function selectSuggestion(target, suggestion, withSpecificFields) {
            var obibaUtils = new obiba.utils.NgObibaStringUtils();
            var cleanSuggestion = obibaUtils.cleanDoubleQuotesLeftUnclosed(suggestion);
            cleanSuggestion = obibaUtils.cleanOrEscapeSpecialLuceneBrackets(cleanSuggestion);
            cleanSuggestion = obibaUtils.cleanSpecialLuceneCharacters(cleanSuggestion);
            $rootScope.$new().$emit('ngObibaMicaSearch.searchSuggestion', cleanSuggestion, target, withSpecificFields);
        }
        this.getCurrentSuggestion = getCurrentSuggestion;
        this.suggest = suggest;
        this.selectSuggestion = selectSuggestion;
        this.suggestForTargetQuery = suggestForTargetQuery;
    }
    function EntitySuggestionRqlUtilityService() {
        function createMatchQueryArgs(suggestion, filterFields) {
            var args = [];
            args.push([suggestion]);
            // add filterFields
            if (Array.isArray(filterFields)) {
                args.push(filterFields);
            }
            else if (filterFields) {
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
            return filterQuery.args.filter(function (arg) { return arg.name === RQL_NODE.MATCH; }).pop();
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
            }
            else {
                filterQuery.args = filterQuery.args.filter(function (arg) {
                    return arg.name !== RQL_NODE.MATCH;
                });
            }
        }
        this.createMatchQuery = createMatchQuery;
        this.givenTargetQueryGetFilterQuery = givenTargetQueryGetFilterQuery;
        this.givenFilterQueryGetMatchQuery = givenFilterQueryGetMatchQuery;
        this.removeFilteredMatchQueryFromTargetQuery = removeFilteredMatchQueryFromTargetQuery;
    }
    ngObibaMica.search.service('EntitySuggestionRqlUtilityService', EntitySuggestionRqlUtilityService);
    ngObibaMica.search
        .service('EntitySuggestionService', [
        '$rootScope',
        '$location',
        '$translate',
        'DocumentSuggestionResource',
        'RqlQueryService', 'EntitySuggestionRqlUtilityService',
        'AlertService',
        'ServerErrorUtils',
        EntitySuggestionService
    ]);
})();
//# sourceMappingURL=entity-suggestion-service.js.map
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
    function FullScreenService($document, $window, $rootScope) {
        // based on: https://github.com/fabiobiondi/angular-fullscreen
        var document = $document[0];
        var emitter = $rootScope.$new();
        var serviceInstance = {
            $on: angular.bind(emitter, emitter.$on),
            enable: function (element) {
                if (element.requestFullScreen) {
                    element.requestFullScreen();
                }
                else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                }
                else if (element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen();
                }
                else if (element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                }
            },
            cancel: function () {
                if (document.cancelFullScreen) {
                    document.cancelFullScreen();
                }
                else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                }
                else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
                else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            },
            isEnabled: function () {
                var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
                return fullscreenElement ? true : false;
            }
        };
        $document.on('fullscreenchange webkitfullscreenchange mozfullscreenchange MSFullscreenChange', function () {
            emitter.$emit('ngObibaMicaSearch.fullscreenChange', serviceInstance.isEnabled());
        });
        return serviceInstance;
    }
    ngObibaMica.search.factory('FullScreenService', ['$document', '$window', '$rootScope', FullScreenService]);
})();
//# sourceMappingURL=full-screen-service.js.map
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
    function MetaTaxonomyService($q, $translate, TaxonomyResource, ngObibaMicaSearch) {
        var taxonomyPanelOptions = ngObibaMicaSearch.getOptions().taxonomyPanelOptions, parser = new ngObibaMica.search.MetaTaxonomyParser(taxonomyPanelOptions);
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
            getMetaTaxonomies().then(function (metaTaxonomy) {
                var metaVocabularies = (metaTaxonomy.vocabularies || []).filter(function (vocabulary) {
                    return targets.indexOf(vocabulary.name) > -1;
                });
                var taxonomies = metaVocabularies.map(function (vocabulary) {
                    switch (vocabulary.name) {
                        case QUERY_TARGETS.VARIABLE:
                            return parser.parseVariableTaxonomies(vocabulary);
                        case QUERY_TARGETS.NETWORK:
                        case QUERY_TARGETS.STUDY:
                        case QUERY_TARGETS.DATASET:
                            return parser.parseEntityTaxonomies(vocabulary);
                    }
                });
                taxonomies.sort(function (a, b) {
                    return targets.indexOf(a.name) - targets.indexOf(b.name);
                });
                deferred.resolve(taxonomies || []);
            });
            return deferred.promise;
        }
        /**
         * Return taxonomy panel options
         * @returns {taxonomyPanelOptions|{network, study, dataset, variable}}
         */
        function getTaxonomyPanelOptions() {
            return taxonomyPanelOptions;
        }
        // exported functions
        this.getTaxonomyPanelOptions = getTaxonomyPanelOptions;
        this.getMetaTaxonomyForTargets = getMetaTaxonomyForTargets;
        this.getMetaTaxonomiesPromise = getMetaTaxonomies;
    }
    ngObibaMica.search
        .service('MetaTaxonomyService', [
        '$q',
        '$translate',
        'TaxonomyResource',
        'ngObibaMicaSearch',
        MetaTaxonomyService
    ]);
})();
//# sourceMappingURL=meta-taxonomy-service.js.map
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
    function ObibaSearchConfig() {
        var options = {
            networks: {
                showSearchTab: 1
            },
            studies: {
                showSearchTab: 1
            },
            datasets: {
                showSearchTab: 1
            },
            variables: {
                showSearchTab: 1
            }
        };
        this.setOptions = function (newOptions) {
            if (typeof (newOptions) === 'object') {
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
    }
    ngObibaMica.search.service('ObibaSearchConfig', ObibaSearchConfig);
})();
//# sourceMappingURL=obiba-search-config.js.map
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
        this.studyPopulationPage = function (id, type, populationId, cleanPopId) {
            if (cleanPopId) {
                var pattern = {};
                pattern[id + ':'] = '';
                populationId = StringUtils.replaceAll(populationId, pattern);
            }
            var sType = (type.toLowerCase() === 'individual' ? 'individual' : 'harmonization') + '-study';
            return id ? StringUtils.replaceAll(ngObibaMicaUrl.getUrl('StudyPopulationsPage'), { ':type': urlEncode(sType), ':study': urlEncode(id), ':population': urlEncode(populationId) }) : '';
        };
        this.StudyDcePage = function (id, type, dceId) {
            var sType = (type.toLowerCase() === 'individual' ? 'individual' : 'harmonization') + '-study';
            return id ? StringUtils.replaceAll(ngObibaMicaUrl.getUrl('StudyDcePage'), { ':type': urlEncode(sType), ':study': urlEncode(id), ':dce': dceId }) : '';
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
        this.downloadList = function (type, query) {
            return StringUtils.replaceAll(ngObibaMicaUrl.getUrl('JoinQuerySearchCsvResource'), { ':type': type, ':query': query });
        };
        this.downloadCoverage = function (query) {
            return StringUtils.replaceAll(ngObibaMicaUrl.getUrl('JoinQueryCoverageDownloadResource'), { ':query': query });
        };
        this.entitiesCountPage = function (query) {
            var url = ngObibaMicaUrl.getUrl('BaseUrl') + ngObibaMicaUrl.getUrl('EntitiesCountBaseUrl');
            if (query) {
                url = url + '?query=' + urlEncode(query);
            }
            return url;
        };
        this.downloadOpalView = function (type, setId, ids) {
            var url = StringUtils.replaceAll(ngObibaMicaUrl.getUrl('SetOpalExportResource'), { ':type': type, ':id': setId });
            if (ids && ids.length) {
                url = url + '?ids=' + ids.join(',');
            }
            return url;
        };
        this.searchPage = function (query) {
            var url = ngObibaMicaUrl.getUrl('BaseUrl') + ngObibaMicaUrl.getUrl('SearchBaseUrl');
            if (query) {
                url = url + '?query=' + urlEncode(query);
            }
            return url;
        };
        return this;
    }
    ngObibaMica.search.service('PageUrlService', ['ngObibaMicaUrl', 'StringUtils', 'urlEncode', PageUrlService]);
})();
//# sourceMappingURL=page-url-service.js.map
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
    function PaginationService(ngObibaMicaSearch) {
        var listeners = {};
        var states = Object.keys(QUERY_TARGETS).reduce(function (acc, key) {
            if (null === /TAXONOMY/.exec(key)) {
                var target = QUERY_TARGETS[key];
                acc[target] = new ngObibaMica.search.PaginationState(target, ngObibaMicaSearch.getDefaultListPageSize(target));
            }
            return acc;
        }, {});
        function update(pagination, results) {
            var preventPaginationEvent = false;
            var target;
            for (target in states) {
                var state = states[target];
                var hits = results[target + 'TotalCount'].hits || 0;
                var targetPagination = pagination[target];
                var totalHitsChanged = state.totalHitsChanged(hits);
                preventPaginationEvent = preventPaginationEvent || totalHitsChanged;
                state.update(targetPagination, hits);
            }
            for (target in states) {
                if (listeners[target] && Array.isArray(listeners[target])) {
                    listeners[target].forEach(function (listener) { return listener.onUpdate(states[target].data(), preventPaginationEvent); });
                }
            }
        }
        function registerListener(target, listener) {
            if (listener) {
                if (!listener.onUpdate) {
                    throw new Error('PaginationService::registerListener() - listener must implement onUpdate()');
                }
                listeners[target] = [].concat(listeners[target] || [], listener);
            }
        }
        this.registerListener = registerListener;
        this.update = update;
    }
    ngObibaMica.search.service('PaginationService', ['ngObibaMicaSearch', PaginationService]);
})();
//# sourceMappingURL=pagination-service.js.map
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
/* global DISPLAY_TYPES */
/* global CriteriaItem */
/* global CriteriaItemBuilder */
/* global CriteriaBuilder */
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
(function () {
    function RqlQueryService($q, $log, TaxonomiesResource, TaxonomyResource, LocalizedValues, VocabularyService, RqlQueryUtils, ngObibaMicaSearch) {
        var self = this;
        var searchOptions = ngObibaMicaSearch.getOptions();
        this.findItemNodeById = function (root, targetId, result, strict) {
            var splitTagetId = targetId.split('.');
            if (root && root.children && result) {
                return root.children.some(function (child) {
                    if (strict ? targetId === child.id : (child.id && child.id.split('.').reduce(function (acc, val) { return acc && splitTagetId.indexOf(val) > -1; }, true))) {
                        result.item = child;
                        return true;
                    }
                    return self.findItemNodeById(child, targetId, result, strict);
                });
            }
            return false;
        };
        this.findItemNode = function (root, item, result) {
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
                return parent.args.some(function (arg) {
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
            search(target, new RegExp((taxonomy ? taxonomy : '') + '\\.' + vocabulary + '$'), result);
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
                            var fields = (searchOptions.variables.fields || [])
                                .concat((searchOptions.variables.annotationTaxonomies || [])
                                .map(function (taxonomy) {
                                return 'attributes.' + taxonomy + '*';
                            }));
                            return RqlQueryUtils.fields(fields);
                        case QUERY_TARGETS.DATASET:
                            return RqlQueryUtils.fields(searchOptions.datasets.fields);
                        case QUERY_TARGETS.NETWORK:
                            return RqlQueryUtils.fields(searchOptions.networks.fields);
                    }
                    break;
            }
            return null;
        }
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
        function isTarget(name) {
            switch (name) {
                case RQL_NODE.VARIABLE:
                case RQL_NODE.DATASET:
                case RQL_NODE.NETWORK:
                case RQL_NODE.STUDY:
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
                }
                else {
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
                }
                else {
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
            }
            else if (parentQuery.args.length === 0) {
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
                var leafQueries = query.args.filter(function (arg) {
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
            return (targets || []).filter(function (target) {
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
        this.parseQuery = function (query) {
            try {
                return new RqlParser().parse(query);
            }
            catch (e) {
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
            }
            else {
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
                        vocabulary.terms.filter(function (t) { return t.name === term; })[0] :
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
            function updateItemForExistsQuery() {
                existingItem = isRepeatable ? existingItem.first() : existingItem;
                existingItem.rqlQuery.name = RQL_NODE.EXISTS;
                existingItem.rqlQuery.args.splice(1, 1);
            }
            if (newItem.rqlQuery && RQL_NODE.EXISTS === newItem.rqlQuery.name) {
                updateItemForExistsQuery();
            }
            else {
                if (replace && newItem.rqlQuery) {
                    existingItem.rqlQuery.name = newItem.rqlQuery.name;
                }
                if (newItem.rqlQuery) {
                    newTerms = newItem.rqlQuery.args[isMatchNode ? 0 : 1];
                }
                else if (newItem.term) {
                    newTerms = [newItem.term.name];
                }
                else {
                    updateItemForExistsQuery();
                }
                if (newTerms) {
                    if (isRepeatable) {
                        RqlQueryUtils.updateRepeatableQueryArgValues(existingItem, newTerms);
                    }
                    else {
                        RqlQueryUtils.updateQueryArgValues(existingItem.rqlQuery, newTerms, replace);
                    }
                }
            }
        };
        /**
         * Builders registry
         *
         * @type {{variable: builders.variable, study: builders.study}}
         */
        this.builders = function (target, rootRql, rootItem, lang) {
            var deferred = $q.defer();
            function build(rootRql, rootItem, taxonomies) {
                var builder = new CriteriaBuilder(rootRql, rootItem, taxonomies, LocalizedValues, lang);
                builder.initialize(target);
                builder.build();
                deferred.resolve({ root: builder.getRootItem(), map: builder.getLeafItemMap() });
            }
            TaxonomiesResource.get({ target: target })
                .$promise
                .then(function (taxonomies) {
                build(rootRql, rootItem, taxonomies);
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
                deferred.resolve({ root: rootItem, map: leafItemMap });
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
                        deferred.resolve({ root: rootItem, map: leafItemMap });
                    }
                });
            });
            return deferred.promise;
        };
        /**
         * Append the aggregate and facet for criteria term listing.
         *
         * @param query
         * @param item
         * @param lang
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
                var anyQuery = new RqlQuery(RQL_NODE.EXISTS), criteriaId = RqlQueryUtils.criteriaId(item.taxonomy, item.vocabulary);
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
        function prepareSearchQueryInternal(context, type, query, lang, sort, addFieldsQuery) {
            var rqlQuery = angular.copy(query);
            var target = typeToTarget(type);
            RqlQueryUtils.addLocaleQuery(rqlQuery, lang);
            var targetQuery = findTargetQuery(target, rqlQuery);
            if (!targetQuery) {
                targetQuery = new RqlQuery(target);
                rqlQuery.args.push(targetQuery);
            }
            var limitQuery = RqlQueryUtils.getLimitQuery(targetQuery);
            if (!limitQuery) {
                RqlQueryUtils.addLimit(targetQuery, RqlQueryUtils.limit(0, ngObibaMicaSearch.getDefaultListPageSize(target)));
            }
            if (addFieldsQuery) {
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
        function prepareQueryPagination(rqlQuery, target, from, size) {
            var targetQuery = findTargetQuery(target, rqlQuery);
            if (!targetQuery) {
                targetQuery = new RqlQuery(target);
                rqlQuery.args.push(targetQuery);
            }
            RqlQueryUtils.addLimit(targetQuery, RqlQueryUtils.limit(from, size));
        }
        function getQueryPaginations(rqlQuery) {
            if (!rqlQuery || rqlQuery.args.length === 0) {
                return {};
            }
            return rqlQuery.args.reduce(function (acc, query) {
                if (isTarget(query.name)) {
                    var limitQuery = RqlQueryUtils.getLimitQuery(query);
                    if (limitQuery) {
                        acc[query.name] = { from: limitQuery.args[0], size: limitQuery.args[1] };
                    }
                }
                return acc;
            }, {});
        }
        this.isOperator = isOperator;
        this.isLeaf = isLeaf;
        this.getQueryPaginations = getQueryPaginations;
        this.prepareQueryPagination = prepareQueryPagination;
        this.findCriteriaItemFromTreeById = findCriteriaItemFromTreeById;
        this.findCriteriaItemFromTree = findCriteriaItemFromTree;
        this.findTargetCriteria = findTargetCriteria;
        this.findTargetQuery = findTargetQuery;
        this.findQueryInTargetByVocabulary = findQueryInTargetByVocabulary;
        this.findQueryInTargetByTaxonomyVocabulary = findQueryInTargetByTaxonomyVocabulary;
        this.prepareSearchQuery = function (context, type, query, lang, sort) {
            return prepareSearchQueryInternal(context, type, query, lang, sort, true);
        };
        this.prepareSearchQueryNoFields = function (context, type, query, lang, sort) {
            return prepareSearchQueryInternal(context, type, query, lang, sort, false);
        };
        this.prepareSearchQueryAndSerialize = function (context, type, query, lang, sort) {
            return new RqlQuery().serializeArgs(self.prepareSearchQuery(context, type, query, lang, sort).args);
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
                    }
                    else {
                        variableType.args.push(['Collected', 'Dataschema']);
                    }
                }
                else if (['individual', 'collected'].indexOf(filterBy) > -1) {
                    variableType.args.push('Collected');
                }
                else if (['harmonization', 'harmonized'].indexOf(filterBy) > -1) {
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
        this.prepareGraphicsQuery = function (query, aggregateArgs, bucketArgs, ensureIndividualStudies) {
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
            if (ensureIndividualStudies) {
                // Make sure the graphics query is done on individual studies
                var classNameQuery = findQueryInTargetByVocabulary(study, 'className');
                if (!classNameQuery) {
                    classNameQuery = new RqlQuery(RQL_NODE.IN);
                    classNameQuery.args = ['Mica_study.className', 'Study'];
                    RqlQueryUtils.addQuery(study, classNameQuery);
                }
                else {
                    classNameQuery.args[1] = 'Study';
                }
            }
            else if (!hasQuery) {
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
                        }
                        else {
                            return VocabularyService.isRangeVocabulary(criterion.vocabulary) ?
                                addMissingTerms(filteredAgg['obiba.mica.RangeAggregationResultDto.ranges'], criterion.vocabulary) :
                                addMissingTerms(filteredAgg['obiba.mica.TermsAggregationResultDto.terms'], criterion.vocabulary);
                        }
                    }
                    else {
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
        this.findCriterion = function (criteria, id) {
            function inner(criteria, id) {
                var result;
                if (criteria.id === id) {
                    return criteria;
                }
                var children = criteria.children.filter(function (childCriterion) { return childCriterion instanceof CriteriaItem; });
                for (var i = children.length; i--;) {
                    result = inner(children[i], id);
                    if (result) {
                        return result;
                    }
                }
            }
            return inner(criteria, id);
        };
        /**
         * Clean a RQL query node from limit, sort, fields, locale nodes.
         *
         * @param rqlRuery The RQL query root node
         * @returns the new query
         */
        this.cleanQuery = function (rqlQuery) {
            var query = angular.copy(rqlQuery);
            if (query.args) {
                // remove limit or sort statements as these will be handled by other clients
                angular.forEach(query.args, function (arg) {
                    if (arg.args) {
                        var i = arg.args.length;
                        while (i--) {
                            if (arg.args[i].name === 'limit' || arg.args[i].name === 'sort' || arg.args[i].name === 'fields') {
                                arg.args.splice(i, 1);
                            }
                        }
                    }
                });
                // remove empty RQL nodes and locale node
                var i = query.args.length;
                while (i--) {
                    if (query.args[i].name === 'locale' || !query.args[i].args || query.args[i].args.length === 0) {
                        query.args.splice(i, 1);
                    }
                }
            }
            return query;
        };
    }
    ngObibaMica.search.service('RqlQueryService', ['$q',
        '$log',
        'TaxonomiesResource',
        'TaxonomyResource',
        'LocalizedValues',
        'VocabularyService',
        'RqlQueryUtils',
        'ngObibaMicaSearch',
        RqlQueryService]);
})();
//# sourceMappingURL=rql-query-service.js.map
/*
 * Copyright (c) 2019 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
/**
 * Helper class that updates the root RqlQuery. Client code can either execute the modified version or retrieve as a
 * string.*
 */
var RqlQueryUpdater = /** @class */ (function () {
    function RqlQueryUpdater($location, $filter, $translate, RqlQueryService, AlertService, TaxonomyService, LocalizedValues) {
        this.$location = $location;
        this.$filter = $filter;
        this.$translate = $translate;
        this.RqlQueryService = RqlQueryService;
        this.AlertService = AlertService;
        this.TaxonomyService = TaxonomyService;
        this.LocalizedValues = LocalizedValues;
    }
    RqlQueryUpdater.getQueryTaxonomyAndVocabulary = function (query) {
        var parts = query.args[0].split(".");
        var taxonomy = null;
        var vocabulary = null;
        if (parts.length > 1) {
            taxonomy = parts[0];
            vocabulary = parts[1];
        }
        else {
            vocabulary = parts[0];
        }
        return { taxonomy: taxonomy, vocabulary: vocabulary };
    };
    /**
     * Prepare the updater before adding/updating RqlQueries
     *
     * @param query - if null the browser query param is parsed
     * @param type - one of QUERY_TARGETS
     * @param display - one of DISPLAY_TYPES
     */
    RqlQueryUpdater.prototype.prepare = function (query, type, display) {
        if (query === null) {
            this.parsedQuery = this.RqlQueryService.parseQuery(this.$location.search().query);
        }
        else {
            this.parsedQuery = this.RqlQueryService.parseQuery(query);
        }
        this.type = type;
        this.display = display;
        return this;
    };
    /**
     * Updated the parsed query by adding or updating an existing RqlQuery
     *
     * @param target
     * @param newQuery
     * @param andQuery - used for MUST queries
     * @param showNotification
     */
    RqlQueryUpdater.prototype.update = function (target, newQuery, andQuery, showNotification) {
        var targetQuery = this.ensureTarget(target);
        var query = this.findQueryInTarget(targetQuery, newQuery);
        var isNewQuery = false;
        if (query) {
            this.replaceQuery(query, newQuery);
        }
        else {
            isNewQuery = true;
            this.insertNewQuery(targetQuery, newQuery);
            query = newQuery;
        }
        if (showNotification) {
            this.notify(targetQuery, query, isNewQuery);
        }
        if (andQuery && targetQuery.args.length > 0) {
            var parent_1 = this.findParentQuery(targetQuery, query);
            if (parent_1 && this.RqlQueryService.isOperator(parent_1.name)) {
                parent_1.name = RQL_NODE.AND;
            }
        }
        return this;
    };
    /**
     * Executes the query by updating the window.location query params
     */
    RqlQueryUpdater.prototype.execute = function () {
        if (this.type) {
            this.$location.search("type", this.type).replace();
        }
        if (this.display) {
            this.$location.search("display", this.display).replace();
        }
        this.$location.search("query", new RqlQuery().serializeArgs(this.parsedQuery.args));
    };
    /**
     * Returns the parsed query along with query and display types as query params
     */
    RqlQueryUpdater.prototype.asQueryParams = function () {
        var asParam = function (key, value) { return key + "=" + value; };
        return asParam("query", new RqlQuery().serializeArgs(this.parsedQuery.args)) + "&"
            + (this.type ? asParam("type", this.type) + "&" : "")
            + (this.display ? asParam("display", this.display) : "");
    };
    RqlQueryUpdater.prototype.ensureTarget = function (target) {
        var targetQuery = this.RqlQueryService.findTargetQuery(target, this.parsedQuery);
        if (!targetQuery) {
            targetQuery = new RqlQuery(target);
            this.parsedQuery.args.push(targetQuery);
        }
        return targetQuery;
    };
    RqlQueryUpdater.prototype.findQueryInTarget = function (targetQuery, query) {
        var result = RqlQueryUpdater.getQueryTaxonomyAndVocabulary(query);
        return this.RqlQueryService.findQueryInTargetByTaxonomyVocabulary(targetQuery, result.taxonomy, result.vocabulary);
    };
    RqlQueryUpdater.prototype.notify = function (targetQuery, query, isNewQuery) {
        var _this = this;
        var target = targetQuery.name;
        var result = RqlQueryUpdater.getQueryTaxonomyAndVocabulary(query);
        this.TaxonomyService.getTaxonomy(target, result.taxonomy).then(function (taxonomy) {
            (taxonomy.vocabularies || []).some(function (vocabulary) {
                if (vocabulary.name === result.vocabulary) {
                    var msgKey = isNewQuery ? "search.criterion.created" : "search.criterion.updated";
                    _this.AlertService.growl({
                        delay: 3000,
                        id: "SearchControllerGrowl",
                        msgArgs: [
                            _this.LocalizedValues.forLocale(vocabulary.title, _this.$translate.use()),
                            _this.$filter("translate")("taxonomy.target." + target),
                        ],
                        msgKey: msgKey,
                        type: "info",
                    });
                    return true;
                }
                return false;
            });
        });
    };
    RqlQueryUpdater.prototype.insertNewQuery = function (targetQuery, newQuery) {
        var _this = this;
        if (targetQuery.args.length > 0) {
            var replace = targetQuery.args.filter(function (arg) {
                return _this.RqlQueryService.isLeaf(arg.name) || _this.RqlQueryService.isOperator(arg.name);
            }).pop();
            if (replace) {
                // replaceable args are operators or leaf nodes
                var andStudyClassName = new RqlQuery(RQL_NODE.AND);
                var index = targetQuery.args.indexOf(replace);
                andStudyClassName.args.push(newQuery, replace);
                targetQuery.args[index] = andStudyClassName;
            }
            else {
                targetQuery.args.push(newQuery);
            }
        }
        else {
            targetQuery.args = [newQuery];
        }
    };
    RqlQueryUpdater.prototype.replaceQuery = function (query, newQuery) {
        query.name = newQuery.name;
        query.args = newQuery.args;
    };
    RqlQueryUpdater.prototype.findParentQuery = function (targetQuery, query) {
        var result = { parent: null };
        this.search(targetQuery, query, result);
        return result.parent;
    };
    RqlQueryUpdater.prototype.search = function (parent, query, result) {
        var _this = this;
        return parent.args.some(function (arg) {
            if (arg === query) {
                result.parent = parent;
                return true;
            }
            if (arg instanceof RqlQuery) {
                return _this.search(arg, query, result);
            }
            return false;
        });
    };
    return RqlQueryUpdater;
}());
var RqlQueryUpdaterFactory = /** @class */ (function () {
    function RqlQueryUpdaterFactory($location, $filter, $translate, RqlQueryService, AlertService, TaxonomyService, LocalizedValues) {
        this.$location = $location;
        this.$filter = $filter;
        this.$translate = $translate;
        this.RqlQueryService = RqlQueryService;
        this.AlertService = AlertService;
        this.TaxonomyService = TaxonomyService;
        this.LocalizedValues = LocalizedValues;
    }
    RqlQueryUpdaterFactory.prototype.create = function (query, type, display) {
        return new RqlQueryUpdater(this.$location, this.$filter, this.$translate, this.RqlQueryService, this.AlertService, this.TaxonomyService, this.LocalizedValues).prepare(query, type, display);
    };
    return RqlQueryUpdaterFactory;
}());
ngObibaMica.search.factory("RqlQueryUpdaterFactory", ["$location", "$filter", "$translate", "RqlQueryService", "AlertService", "TaxonomyService", "LocalizedValues",
    function ($location, $filter, $translate, RqlQueryService, AlertService, TaxonomyService, LocalizedValues) {
        return new RqlQueryUpdaterFactory($location, $filter, $translate, RqlQueryService, AlertService, TaxonomyService, LocalizedValues);
    },
]);
//# sourceMappingURL=rql-query-updater-service.js.map
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
    function RqlQueryUtils(VocabularyService) {
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
        function vocabularyTermNames(vocabulary) {
            return vocabulary && vocabulary.terms ? vocabulary.terms.map(function (term) {
                return term.name;
            }) : [];
        }
        function hasTargetQuery(rootRql, target) {
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
        }
        function variableQuery() {
            return new RqlQuery(QUERY_TARGETS.VARIABLE);
        }
        function eqQuery(field, term) {
            var query = new RqlQuery(RQL_NODE.EQ);
            query.args.push(term);
            return query;
        }
        function orQuery(left, right) {
            var query = new RqlQuery(RQL_NODE.OR);
            query.args = [left, right];
            return query;
        }
        function aggregate(fields) {
            var query = new RqlQuery(RQL_NODE.AGGREGATE);
            fields.forEach(function (field) {
                query.args.push(field);
            });
            return query;
        }
        function fields(fieldsQuery) {
            var query = new RqlQuery(RQL_NODE.FIELDS);
            query.args.push(fieldsQuery);
            return query;
        }
        function limit(from, size) {
            var query = new RqlQuery(RQL_NODE.LIMIT);
            query.args.push(from);
            query.args.push(size);
            return query;
        }
        function fieldQuery(name, field, terms) {
            var query = new RqlQuery(name);
            query.args.push(field);
            if (terms && terms.length > 0) {
                query.args.push(terms);
            }
            return query;
        }
        function inQuery(field, terms) {
            var hasValues = terms && terms.length > 0;
            var name = hasValues ? RQL_NODE.IN : RQL_NODE.EXISTS;
            return fieldQuery(name, field, terms);
        }
        function matchQuery(field, queryString) {
            var query = new RqlQuery(RQL_NODE.MATCH);
            query.args.push(queryString || '*');
            query.args.push(field);
            return query;
        }
        function isFreeTextMatch(query) {
            return query.name === RQL_NODE.MATCH && query.args.length === 1;
        }
        function updateMatchQuery(query, queryString) {
            query.args[0] = queryString || '*';
            return query;
        }
        function rangeQuery(field, from, to) {
            var query = new RqlQuery(RQL_NODE.BETWEEN);
            query.args.push(field);
            updateRangeQuery(query, from, to);
            return query;
        }
        function updateQueryInternal(query, terms) {
            var hasValues = terms && terms.length > 0;
            if (hasValues) {
                query.args[1] = terms;
            }
            else {
                query.args.splice(1, 1);
            }
            return query;
        }
        function mergeInQueryArgValues(query, terms, replace) {
            var hasValues = terms && terms.length > 0;
            if (hasValues) {
                var current = query.args[1];
                if (!current || replace) {
                    query.args[1] = terms;
                }
                else {
                    if (!(current instanceof Array)) {
                        current = [current];
                    }
                    var unique = terms.filter(function (term) {
                        return current.indexOf(term) === -1;
                    });
                    query.args[1] = current.concat(unique);
                }
            }
            else {
                query.args.splice(1, 1);
            }
            return query;
        }
        function updateRangeQuery(query, from, to, missing) {
            if (missing) {
                query.name = RQL_NODE.MISSING;
                query.args.splice(1, 1);
            }
            else if (angular.isDefined(from) && from !== null && angular.isDefined(to) && to !== null) {
                query.name = RQL_NODE.BETWEEN;
                query.args[1] = [from, to];
            }
            else if (angular.isDefined(from) && from !== null) {
                query.name = RQL_NODE.GE;
                query.args[1] = from;
            }
            else if (angular.isDefined(to) && to !== null) {
                query.name = RQL_NODE.LE;
                query.args[1] = to;
            }
            else {
                query.name = RQL_NODE.EXISTS;
                query.args.splice(1, 1);
            }
        }
        /**
         * Creates a RqlQuery from an item
         *
         * @param item
         * @returns {RqlQuery}
         */
        function buildRqlQuery(item) {
            if (VocabularyService.isNumericVocabulary(item.vocabulary)) {
                return rangeQuery(criteriaId(item.taxonomy, item.vocabulary), null, null);
            }
            else if (VocabularyService.isMatchVocabulary(item.vocabulary)) {
                return matchQuery(criteriaId(item.taxonomy, item.vocabulary), null);
            }
            else {
                var args;
                if (Array.isArray(item.selectedTerms) && item.selectedTerms.length > 0) {
                    args = item.selectedTerms;
                }
                else if (item.term) {
                    args = item.term.name;
                }
                return inQuery(criteriaId(item.taxonomy, item.vocabulary), args);
            }
        }
        /**
         * Adds a new query to the parent query node
         *
         * @param parentQuery
         * @param query
         * @returns {*}
         */
        function addQuery(parentQuery, query, logicalOp) {
            if (parentQuery.args.length === 0) {
                parentQuery.args.push(query);
            }
            else {
                var parentIndex = findValidParentNode(parentQuery);
                if (parentIndex === -1) {
                    parentQuery.args.push(query);
                }
                else {
                    var oldArg = parentQuery.args.splice(parentIndex, 1).pop();
                    // check if the field is from the target's taxonomy, in which case the criteria is
                    // added with a AND operator otherwise it is a OR
                    if (!logicalOp && query.args && query.args.length > 0) {
                        var targetTaxo = 'Mica_' + parentQuery.name;
                        if (!isFreeTextMatch(query)) {
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
        }
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
        function updateRepeatableQueryArgValues(existingItem, terms) {
            existingItem.items().forEach(function (item) {
                var query = item.rqlQuery;
                switch (query.name) {
                    case RQL_NODE.EXISTS:
                        query.name = RQL_NODE.CONTAINS;
                        mergeInQueryArgValues(query, terms, false);
                        break;
                    case RQL_NODE.CONTAINS:
                        mergeInQueryArgValues(query, terms, false);
                        break;
                    case RQL_NODE.IN:
                        var values = query.args[1] ? [].concat(query.args[1]) : [];
                        if (values.length === 1) {
                            query.name = RQL_NODE.CONTAINS;
                            mergeInQueryArgValues(query, terms, false);
                            break;
                        }
                        var field = query.args[0];
                        var contains = values.filter(function (value) {
                            // remove duplicates (e.g. CONTAINS(q, [a,a])
                            return terms.indexOf(value) < 0;
                        }).map(function (value) {
                            return fieldQuery(RQL_NODE.CONTAINS, field, [].concat(value, terms));
                        });
                        var orRql;
                        if (contains.length > 1) {
                            var firstTwo = contains.splice(0, 2);
                            orRql = orQuery(firstTwo[0], firstTwo[1]);
                            contains.forEach(function (value) {
                                orRql = orQuery(value, orRql);
                            });
                            query.name = orRql.name;
                            query.args = orRql.args;
                        }
                        else {
                            query.name = RQL_NODE.CONTAINS;
                            query.args = contains[0].args;
                        }
                }
            });
        }
        function updateQueryArgValues(query, terms, replace) {
            switch (query.name) {
                case RQL_NODE.EXISTS:
                case RQL_NODE.MISSING:
                    query.name = RQL_NODE.IN;
                    mergeInQueryArgValues(query, terms, replace);
                    break;
                case RQL_NODE.CONTAINS:
                case RQL_NODE.IN:
                    mergeInQueryArgValues(query, terms, replace);
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
        }
        function updateQuery(query, values) {
            switch (query.name) {
                case RQL_NODE.CONTAINS:
                case RQL_NODE.IN:
                case RQL_NODE.OUT:
                case RQL_NODE.EXISTS:
                case RQL_NODE.MISSING:
                    updateQueryInternal(query, values);
                    break;
            }
        }
        function addLocaleQuery(rqlQuery, locale) {
            var found = rqlQuery.args.filter(function (arg) {
                return arg.name === RQL_NODE.LOCALE;
            }).pop();
            if (!found) {
                var localeQuery = new RqlQuery('locale');
                localeQuery.args.push(locale);
                rqlQuery.args.push(localeQuery);
            }
        }
        function addFields(targetQuery, fieldsQuery) {
            if (targetQuery && targetQuery.args) {
                var found = targetQuery.args.filter(function (arg) {
                    return arg.name === RQL_NODE.FIELDS;
                }).pop();
                if (found) {
                    found.args = fieldsQuery.args;
                }
                else {
                    targetQuery.args.push(fieldsQuery);
                }
            }
        }
        function getLimitQuery(targetQuery) {
            if (targetQuery && targetQuery.args) {
                return targetQuery.args.filter(function (arg) {
                    return arg.name === RQL_NODE.LIMIT;
                }).pop();
            }
            return null;
        }
        function addLimit(targetQuery, limitQuery) {
            if (targetQuery && targetQuery.args) {
                var found = getLimitQuery(targetQuery);
                if (found) {
                    found.args = limitQuery.args;
                }
                else {
                    targetQuery.args.push(limitQuery);
                }
            }
        }
        /**
         * Adds a sort criteria on given fields
         *
         * @param targetQuery
         * @param sort field name or an array of field names
         */
        function addSort(targetQuery, sort) {
            var sortQuery = targetQuery.args.filter(function (arg) {
                return arg.name === RQL_NODE.SORT;
            }).pop();
            if (!sortQuery) {
                sortQuery = new RqlQuery('sort');
                targetQuery.args.push(sortQuery);
            }
            sortQuery.args = Array.isArray(sort) ? sort : [sort];
        }
        /**
         * Helper finding the vocabulary field, return name if none was found
         *
         * @param taxonomy
         * @param vocabulary
         * @returns {*}
         */
        function criteriaId(taxonomy, vocabulary) {
            return taxonomy.name + '.' + vocabulary.name;
        }
        function rewriteQueryWithLimitAndFields(parsedQuery, target, maximumLimit, fieldsArray) {
            var targetQuery = parsedQuery.args.filter(function (query) {
                return query.name === target;
            }).pop();
            addLimit(targetQuery, limit(0, maximumLimit));
            if (fieldsArray) {
                addFields(targetQuery, fields(fieldsArray));
            }
            return new RqlQuery().serializeArgs(parsedQuery.args);
        }
        function createSelectionsQuery(parsedQuery, target, maximumLimit, fieldsArray, selections) {
            var localeQuery = parsedQuery.args.filter(function (query) {
                return query.name === RQL_NODE.LOCALE;
            }).pop();
            var currentTargetQuery = parsedQuery.args.filter(function (query) {
                return query.name === target;
            }).pop();
            addLimit(currentTargetQuery, limit(0, maximumLimit));
            if (fieldsArray) {
                addFields(currentTargetQuery, fields(fieldsArray));
            }
            var ids = selections.slice(0, maximumLimit);
            var rootQuery = new RqlQuery(RQL_NODE.AND);
            if (Array.isArray(ids) && ids.length) {
                var targetQuery = new RqlQuery(target);
                targetQuery.args.push(inQuery('id', ids));
                // steal required properties from current target query
                currentTargetQuery.args.forEach(function (arg) {
                    if (['fields', 'limit', 'sort'].indexOf(arg.name) > -1) {
                        targetQuery.args.push(arg);
                    }
                });
                rootQuery.args.push(targetQuery);
            }
            else {
                rootQuery.args.push(currentTargetQuery);
            }
            if (localeQuery) {
                rootQuery.args.push(localeQuery);
            }
            if (selections.length === 0) {
                var otherQueries = parsedQuery.args.filter(function (query) {
                    return query.name !== RQL_NODE.LOCALE && query.name !== target;
                });
                rootQuery.args = rootQuery.args.concat(otherQueries);
            }
            return decodeURIComponent(new RqlQuery().serializeArgs(rootQuery.args));
        }
        // exports
        this.vocabularyTermNames = vocabularyTermNames;
        this.hasTargetQuery = hasTargetQuery;
        this.variableQuery = variableQuery;
        this.eqQuery = eqQuery;
        this.orQuery = orQuery;
        this.aggregate = aggregate;
        this.fields = fields;
        this.limit = limit;
        this.fieldQuery = fieldQuery;
        this.inQuery = inQuery;
        this.matchQuery = matchQuery;
        this.isFreeTextMatch = isFreeTextMatch;
        this.updateMatchQuery = updateMatchQuery;
        this.rangeQuery = rangeQuery;
        this.updateQueryInternal = updateQueryInternal;
        this.mergeInQueryArgValues = mergeInQueryArgValues;
        this.updateRangeQuery = updateRangeQuery;
        this.buildRqlQuery = buildRqlQuery;
        this.addQuery = addQuery;
        this.updateRepeatableQueryArgValues = updateRepeatableQueryArgValues;
        this.updateQueryArgValues = updateQueryArgValues;
        this.updateQuery = updateQuery;
        this.addLocaleQuery = addLocaleQuery;
        this.addFields = addFields;
        this.getLimitQuery = getLimitQuery;
        this.addLimit = addLimit;
        this.addSort = addSort;
        this.criteriaId = criteriaId;
        this.rewriteQueryWithLimitAndFields = rewriteQueryWithLimitAndFields;
        this.createSelectionsQuery = createSelectionsQuery;
    }
    ngObibaMica.search.service('RqlQueryUtils', ['VocabularyService', RqlQueryUtils]);
})();
//# sourceMappingURL=rql-query-utils.js.map
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
    function SearchContext() {
        var selectedLocale = null;
        this.setLocale = function (locale) {
            selectedLocale = locale;
        };
        this.currentLocale = function () {
            return selectedLocale;
        };
    }
    ngObibaMica.search.service('SearchContext', SearchContext);
})();
//# sourceMappingURL=search-context.js.map
var SearchResultSelectionsService = /** @class */ (function () {
    function SearchResultSelectionsService(PaginationService, $log) {
        this.PaginationService = PaginationService;
        this.$log = $log;
        this.decorators = {};
    }
    SearchResultSelectionsService.prototype.getSelections = function (type) {
        return this.decorators[type] ? this.decorators[type].getSelections() : {};
    };
    SearchResultSelectionsService.prototype.getSelectionIds = function (type) {
        return this.decorators[type] ? this.decorators[type].getSelectionIds() : {};
    };
    SearchResultSelectionsService.prototype.clearSelections = function (type) {
        return this.decorators[type] ? this.decorators[type].clearSelections() : {};
    };
    SearchResultSelectionsService.$inject = ["PaginationService", "$log"];
    return SearchResultSelectionsService;
}());
ngObibaMica.search.service("SearchResultSelectionsService", SearchResultSelectionsService);
//# sourceMappingURL=search-result-selections-service.js.map
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
    function StudyFilterShortcutService($location, RqlQueryService) {
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
            }
            else {
                studyClassNameQuery = new RqlQuery(RQL_NODE.IN);
            }
            studyClassNameQuery.args = ['Mica_study.className'];
            switch (choice) {
                case ngObibaMica.search.STUDY_FILTER_CHOICES.INDIVIDUAL_STUDIES:
                    studyClassNameQuery.args.push('Study');
                    break;
                case ngObibaMica.search.STUDY_FILTER_CHOICES.HARMONIZATION_STUDIES:
                    studyClassNameQuery.args.push('HarmonizationStudy');
                    break;
                case ngObibaMica.search.STUDY_FILTER_CHOICES.ALL_STUDIES:
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
                    var replace = study.args.filter(function (arg) {
                        return RqlQueryService.isLeaf(arg.name) || RqlQueryService.isOperator(arg.name);
                    }).pop();
                    if (replace) {
                        // replaceable args are operators or leaf nodes
                        var andStudyClassName = new RqlQuery(RQL_NODE.AND);
                        var index = study.args.indexOf(replace);
                        andStudyClassName.args.push(studyClassNameQuery, replace);
                        study.args[index] = andStudyClassName;
                    }
                    else {
                        study.args.push(studyClassNameQuery);
                    }
                }
                else {
                    study.args = [studyClassNameQuery];
                }
            }
            $location.search('query', new RqlQuery().serializeArgs(parsedQuery.args));
        };
        this.getStudyClassNameChoices = function () {
            return {
                choseAll: classNameQueryIsExists(getCurrentClassName()),
                choseIndividual: classNameQueryHasStudyArg(getCurrentClassName()),
                choseHarmonization: classNameQueryHasHarmonizationStudyArg(getCurrentClassName())
            };
        };
    }
    ngObibaMica.search.service('StudyFilterShortcutService', ['$location', 'RqlQueryService', StudyFilterShortcutService]);
})();
//# sourceMappingURL=study-filter-shortcut-service.js.map
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
    function TaxonomyService($q, TaxonomiesResource, TaxonomyResource, VocabularyService) {
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
                mode: 'admin',
                query: 'taxonomyName:' + taxonomyNames.join(' OR taxonomyName:')
            }).$promise;
        }
        function sortTaxonomies(order, taxonomies) {
            taxonomies.sort(function (a, b) {
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
                getTaxonomiesInternal(target, taxonomyNames).then(function (taxonomies) {
                    taxonomies.forEach(function (taxonomy) {
                        taxonomy.vocabularies = VocabularyService.visibleVocabularies(taxonomy.vocabularies);
                    });
                    sortTaxonomies(taxonomyNames, taxonomies);
                    deferred.resolve(taxonomies);
                });
            }
            else {
                getTaxonomy(target, taxonomyNames).then(function (taxonomy) {
                    taxonomy.vocabularies = VocabularyService.visibleVocabularies(taxonomy.vocabularies);
                    deferred.resolve(taxonomy);
                });
            }
            return deferred.promise;
        }
        this.findVocabularyInTaxonomy = findVocabularyInTaxonomy;
        this.getTaxonomy = getTaxonomy;
        this.getTaxonomies = getTaxonomies;
    }
    ngObibaMica.search
        .service('TaxonomyService', ['$q', 'TaxonomiesResource', 'TaxonomyResource', 'VocabularyService', TaxonomyService]);
})();
//# sourceMappingURL=taxonomy-service.js.map
/*
 * Copyright (c) 2019 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
var VariableAnnotationsService = /** @class */ (function () {
    function VariableAnnotationsService($q, $log, $translate, $cacheFactory, ngObibaMicaSearch, TaxonomyResource, LocalizedValues) {
        this.$q = $q;
        this.$log = $log;
        this.$translate = $translate;
        this.$cacheFactory = $cacheFactory;
        this.ngObibaMicaSearch = ngObibaMicaSearch;
        this.TaxonomyResource = TaxonomyResource;
        this.LocalizedValues = LocalizedValues;
        this.localizedAnnotations = {};
        this.annotationTaxonomies = this.ngObibaMicaSearch.getOptions().variables.annotationTaxonomies;
        this.annotationsEnabled = this.annotationTaxonomies && this.annotationTaxonomies.length > 0;
    }
    VariableAnnotationsService.prototype.isAnnotationsEnabled = function () {
        return this.annotationsEnabled;
    };
    VariableAnnotationsService.prototype.processAnnotations = function (variables) {
        var _this = this;
        var deferred = this.$q.defer();
        if (!this.annotationsEnabled || !variables || variables.length < 0) {
            deferred.resolve();
        }
        this.ensureAnnotationTaxonomies().then(function () {
            variables.forEach(function (variable) {
                (variable.annotations || []).forEach(function (annotation) {
                    var cachedResult = _this.localizedAnnotations[_this.createMapKey(annotation)];
                    if (!cachedResult) {
                        _this.localizeAnnotation(annotation).then(function (result) {
                            annotation.index = result.index;
                            annotation.title = result.title;
                        });
                    }
                    else {
                        annotation.index = cachedResult.index;
                        annotation.title = cachedResult.title;
                    }
                });
            });
            deferred.resolve();
        });
        return deferred.promise;
    };
    VariableAnnotationsService.prototype.createMapKey = function (annotation) {
        return annotation.taxonomy + "_" + annotation.vocabulary + "_" + annotation.value;
    };
    VariableAnnotationsService.prototype.ensureAnnotationTaxonomies = function () {
        var _this = this;
        var deferred = this.$q.defer();
        this.annotationTaxonomies.forEach(function (taxonomy) {
            // cache in Angular App
            _this.TaxonomyResource.get({
                target: QUERY_TARGETS.VARIABLE,
                taxonomy: taxonomy,
            }).$promise.then(deferred.resolve());
        });
        return deferred.promise;
    };
    VariableAnnotationsService.prototype.localizeAnnotation = function (annotation) {
        var _this = this;
        var deferred = this.$q.defer();
        var key = this.createMapKey(annotation);
        if (this.localizedAnnotations[key]) {
            deferred.resolve(this.localizedAnnotations[key] || annotation.value);
        }
        var localized = null;
        var index = 0;
        this.TaxonomyResource.get({
            target: QUERY_TARGETS.VARIABLE,
            taxonomy: annotation.taxonomy,
        }).$promise.then(function (taxonomy) {
            taxonomy.vocabularies.some(function (vocabulary, index1) {
                if (vocabulary.name === annotation.vocabulary) {
                    (vocabulary.terms || []).some(function (term, index2) {
                        index = (index1 + 1) * 10000 + index2;
                        if (term.name === annotation.value) {
                            localized = _this.LocalizedValues.forLocale(term.title, _this.$translate.use());
                            return true;
                        }
                    });
                    return true;
                }
            });
            var result = { index: index, title: localized || annotation.value };
            _this.localizedAnnotations[key] = result;
            deferred.resolve(result);
        });
        return deferred.promise;
    };
    VariableAnnotationsService.$inject = ["$q", "$log", "$translate", "$cacheFactory",
        "ngObibaMicaSearch", "TaxonomyResource", "LocalizedValues"];
    return VariableAnnotationsService;
}());
ngObibaMica.search.service("VariableAnnotationsService", VariableAnnotationsService);
//# sourceMappingURL=variable-annotations-service.js.map
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
    function VocabularyService($translate, LocalizedValues, MetaTaxonomyService) {
        var TOKEN_LENGTH = 1;
        var VOCABULARY_TYPES = {
            STRING: 'string',
            INTEGER: 'integer',
            DECIMAL: 'decimal',
            KEYWORD: 'keyword'
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
                        var toMatchField = fieldsToFilter.reduce(function (toMatchField, field) {
                            return toMatchField + ' ' + translateField(term[field]);
                        }, fieldsToFilter[0]);
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
                        }).reduce(function (acc, val) {
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
            var hidden = vocabulary.attributes ? vocabulary.attributes.filter(function (a) {
                return a.key === 'hidden';
            }).pop() : null;
            return !hidden || hidden.value === 'false';
        }
        function isFacetVocabularyVisible(vocabulary) {
            if (!vocabulary || !vocabulary.attributes) {
                return false;
            }
            var result = vocabulary.attributes.filter(function (attribute) {
                return ['hidden', 'facet'].indexOf(attribute.key) > -1;
            }).reduce(function (a, i) {
                a[i.key] = i.value;
                return a;
            }, {});
            return 'true' === result.facet && (!result.hidden || 'false' === result.hidden);
        }
        function findVocabularyAttributes(vocabulary, pattern) {
            return (vocabulary.attributes || []).filter(function (attribute) {
                return attribute.key.search(pattern) > -1;
            }).reduce(function (a, i) {
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
            return [VOCABULARY_TYPES.KEYWORD, VOCABULARY_TYPES.STRING].indexOf(vocabularyType(vocabulary)) > -1 && vocabulary.terms;
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
        this.vocabularyField = vocabularyField;
        return this;
    }
    ngObibaMica.search.service('VocabularyService', ['$translate', 'LocalizedValues', 'MetaTaxonomyService', VocabularyService]);
})();
//# sourceMappingURL=vocabulary-service.js.map
'use strict';
ngObibaMica.search
    .filter('dceDescription', function () {
    return function (input) {
        return input.split(':<p>').map(function (d) {
            return '<p>' + d;
        })[2];
    };
});
//# sourceMappingURL=dce-description.js.map
'use strict';
ngObibaMica.search
    .filter('orderBySelection', function () {
    return function (elements, selections) {
        if (!elements) {
            return [];
        }
        var selected = [];
        var unselected = [];
        elements.forEach(function (element) {
            if (selections[element.key]) {
                selected.push(element);
            }
            else {
                unselected.push(element);
            }
        });
        return selected.concat(unselected);
    };
});
//# sourceMappingURL=order-by-selection.js.map
'use strict';
ngObibaMica.search
    .filter('regex', function () {
    return function (elements, regex, fields, lang) {
        var out = [];
        try {
            var pattern = new RegExp(regex, 'i');
            out = elements.filter(function (element) {
                return fields.some(function (field) {
                    var value = element[field];
                    if (angular.isArray(value) && lang) {
                        return value.filter(function (item) {
                            return item.locale === lang;
                        }).some(function (item) {
                            return pattern.test(item.text);
                        });
                    }
                    return pattern.test(value);
                });
            });
        }
        catch (e) {
        }
        return out;
    };
});
//# sourceMappingURL=regex.js.map
'use strict';
ngObibaMica.search
    .filter('renderableTargets', ['RqlQueryService', function (RqlQueryService) {
        return function (targets) {
            return RqlQueryService.getRenderableTargetCriteria(targets);
        };
    }]);
//# sourceMappingURL=renderable-targets.js.map
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
    ngObibaMica.search.STUDY_FILTER_CHOICES = {
        ALL_STUDIES: 'all',
        INDIVIDUAL_STUDIES: 'individual',
        HARMONIZATION_STUDIES: 'harmonization'
    };
})();
//# sourceMappingURL=study-filter-choices.js.map
'use strict';
ngObibaMica.search
    .filter('visibleVocabularies', ['VocabularyService', function (VocabularyService) {
        return function (vocabularies) {
            return VocabularyService.visibleVocabularies(vocabularies);
        };
    }]);
//# sourceMappingURL=visible-vocabularies.js.map
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
    ngObibaMica.search.SortVocabularyTerms = function (VocabularyService) {
        return function (terms, vocabulary) {
            VocabularyService.sortFilteredVocabularyTerms(vocabulary, terms);
            return terms;
        };
    };
    ngObibaMica.search.filter('sortTerms', ['VocabularyService', ngObibaMica.search.SortVocabularyTerms]);
})();
//# sourceMappingURL=vocabulary-filters.js.map
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
    function FullScreen(FullScreenService) {
        return {
            link: function ($scope, $element, $attrs) {
                if ($attrs.fullscreen) {
                    $scope.$watch($attrs.fullscreen, function (value) {
                        var isEnabled = FullScreenService.isEnabled();
                        if (value && !isEnabled) {
                            FullScreenService.enable($element[0]);
                            $element.addClass('isInFullScreen');
                        }
                        else if (!value && isEnabled) {
                            FullScreenService.cancel();
                            $element.removeClass('isInFullScreen');
                        }
                    });
                }
            }
        };
    }
    ngObibaMica.search.directive('fullscreen', ['FullScreenService', FullScreen]);
})();
//# sourceMappingURL=component.js.map
'use strict';
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
/* exported BaseTaxonomiesController */
function BaseTaxonomiesController($rootScope, $scope, $translate, $location, MetaTaxonomyResource, MetaTaxonomyMoveResource, MetaTaxonomyAttributeResource, ngObibaMicaSearch, VocabularyService) {
    $scope.options = ngObibaMicaSearch.getOptions();
    $scope.metaTaxonomy = MetaTaxonomyResource.get();
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
    $scope.canNavigate = function (vocabulary) {
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
            }
            else {
                search.vocabulary = null;
            }
            $location.search(search);
        }
        else {
            $scope.taxonomies.taxonomy = taxonomy;
            if (!$scope.taxonomies.vocabulary || $scope.taxonomies.vocabulary.name !== vocabulary.name) {
                VocabularyService.sortVocabularyTerms(vocabulary, $scope.lang);
            }
            $scope.taxonomies.vocabulary = vocabulary;
        }
    };
    this.moveTaxonomyUp = function (taxonomy) {
        MetaTaxonomyMoveResource.put({
            target: $scope.target,
            taxonomy: taxonomy.name,
            dir: 'up'
        }).$promise.then(function () {
            $scope.metaTaxonomy = MetaTaxonomyResource.get();
        });
    };
    this.moveTaxonomyDown = function (taxonomy) {
        MetaTaxonomyMoveResource.put({
            target: $scope.target,
            taxonomy: taxonomy.name,
            dir: 'down'
        }).$promise.then(function () {
            $scope.metaTaxonomy = MetaTaxonomyResource.get();
        });
    };
    this.isTaxonomyHidden = function (taxonomy) {
        if (taxonomy.attributes) {
            var attr = taxonomy.attributes.filter(function (attr) { return attr.key === 'hidden'; }).pop();
            return attr && attr.value === 'true';
        }
        return false;
    };
    this.hideTaxonomy = function (taxonomy) {
        MetaTaxonomyAttributeResource.put({
            target: $scope.target,
            taxonomy: taxonomy.name,
            name: 'hidden',
            value: 'true'
        }).$promise.then(function () {
            $scope.metaTaxonomy = MetaTaxonomyResource.get();
        });
    };
    this.showTaxonomy = function (taxonomy) {
        MetaTaxonomyAttributeResource.put({
            target: $scope.target,
            taxonomy: taxonomy.name,
            name: 'hidden',
            value: 'false'
        }).$promise.then(function () {
            $scope.metaTaxonomy = MetaTaxonomyResource.get();
        });
    };
    this.updateStateFromLocation = function () {
        var search = $location.search();
        var taxonomyName = search.taxonomy, vocabularyName = search.vocabulary, taxonomy = null, vocabulary = null;
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
            if (vocabulary) {
                VocabularyService.sortVocabularyTerms(vocabulary, $scope.lang);
            }
            $scope.taxonomies.vocabulary = vocabulary;
        }
    };
    this.selectTerm = function (target, taxonomy, vocabulary, args) {
        $scope.onSelectTerm(target, taxonomy, vocabulary, args);
    };
    var self = this;
    $scope.$on('$locationChangeSuccess', function () {
        if ($scope.isHistoryEnabled) {
            self.updateStateFromLocation();
        }
    });
    $scope.navigateTaxonomy = this.navigateTaxonomy;
    $scope.moveTaxonomyUp = this.moveTaxonomyUp;
    $scope.moveTaxonomyDown = this.moveTaxonomyDown;
    $scope.hideTaxonomy = this.hideTaxonomy;
    $scope.showTaxonomy = this.showTaxonomy;
    $scope.selectTerm = this.selectTerm;
}
//# sourceMappingURL=base.js.map
'use strict';
/* global BaseTaxonomiesController */
(function () {
    /**
    * ClassificationPanelController
    *
    * @constructor
    */
    function ClassificationPanelController($rootScope, $scope, $translate, $location, MetaTaxonomyResource, MetaTaxonomyMoveResource, MetaTaxonomyAttributeResource, TaxonomiesResource, ngObibaMicaSearch, VocabularyService) {
        BaseTaxonomiesController.call(this, $rootScope, $scope, $translate, $location, MetaTaxonomyResource, MetaTaxonomyMoveResource, MetaTaxonomyAttributeResource, ngObibaMicaSearch, VocabularyService);
        var groupTaxonomies = function (taxonomies, target) {
            var res = taxonomies.reduce(function (res, t) {
                if (target) {
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
                        taxonomy.props = {
                            _first: true,
                            _last: true
                        };
                        if (v.attributes) {
                            if (taxonomy.attributes) {
                                taxonomy.attributes = taxonomy.attributes.concat(v.attributes);
                            }
                            else {
                                taxonomy.attributes = v.attributes;
                            }
                        }
                        if (taxonomy.attributes) {
                            taxonomy.attributes.forEach(function (attr) { return taxonomy.props[attr.key] = attr.value; });
                        }
                        return { title: null, taxonomies: [taxonomy] };
                    }
                    var taxonomies = v.terms.map(function (t) {
                        var taxonomy = res[t.name];
                        if (!taxonomy) {
                            return null;
                        }
                        taxonomy.title = t.title;
                        taxonomy.description = t.description;
                        if (t.attributes) {
                            if (taxonomy.attributes) {
                                taxonomy.attributes = taxonomy.attributes.concat(t.attributes);
                            }
                            else {
                                taxonomy.attributes = t.attributes;
                            }
                        }
                        taxonomy.props = {};
                        if (taxonomy.attributes) {
                            taxonomy.attributes.forEach(function (attr) { return taxonomy.props[attr.key] = attr.value; });
                        }
                        return taxonomy;
                    }).filter(function (t) {
                        return t;
                    });
                    taxonomies[0].props._first = true;
                    taxonomies[taxonomies.length - 1].props._last = true;
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
                target: $scope.taxonomies.target,
                mode: 'admin'
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
        $scope.$watch('metaTaxonomy', function () {
            getClassificationTaxonomies();
        });
        this.refreshTaxonomyCache = function () {
            getClassificationTaxonomies();
        };
        $scope.refreshTaxonomyCache = this.refreshTaxonomyCache;
    }
    ngObibaMica.search
        .controller('ClassificationPanelController', ['$rootScope',
        '$scope',
        '$translate',
        '$location',
        'MetaTaxonomyResource',
        'MetaTaxonomyMoveResource',
        'MetaTaxonomyAttributeResource',
        'TaxonomiesResource',
        'ngObibaMicaSearch',
        'VocabularyService',
        ClassificationPanelController])
        .directive('classificationsPanel', [function () {
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
                templateUrl: 'search/components/panel/classification/component.html'
            };
        }]);
})();
//# sourceMappingURL=component.js.map
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
    function TaxonomyPanel() {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                taxonomy: '=',
                lang: '=',
                onNavigate: '=',
                onUp: '=',
                onDown: '=',
                onHide: '=',
                onShow: '='
            },
            templateUrl: 'search/components/panel/taxonomy-panel/component.html'
        };
    }
    ngObibaMica.search.directive('taxonomyPanel', [TaxonomyPanel]);
})();
//# sourceMappingURL=component.js.map
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
    function TermPanel() {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                target: '=',
                taxonomy: '=',
                vocabulary: '=',
                term: '=',
                lang: '='
            },
            templateUrl: 'search/components/panel/term-panel/component.html'
        };
    }
    ngObibaMica.search.directive('termPanel', [TermPanel]);
})();
//# sourceMappingURL=component.js.map
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
    function VocabularyPanel() {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                target: '=',
                taxonomy: '=',
                vocabulary: '=',
                lang: '=',
                onNavigate: '='
            },
            templateUrl: 'search/components/panel/vocabulary-panel/component.html'
        };
    }
    ngObibaMica.search.directive('vocabularyPanel', [VocabularyPanel]);
})();
//# sourceMappingURL=component.js.map
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
    function ScrollToTop() {
        return {
            restrict: 'A',
            scope: {
                trigger: '=scrollToTop'
            },
            link: function postLink(scope, elem) {
                scope.$watch('trigger', function () {
                    elem[0].scrollTop = 0;
                });
            }
        };
    }
    function TableScroll($timeout, $rootScope) {
        return {
            restrict: 'C',
            scope: {},
            link: function (scope, elem) {
                var timeoutPromise = null;
                var fullscreenElement = document.querySelector('.can-full-screen');
                var windowFirstChild = document.querySelector('body .navbar-fixed-top');
                var thead = elem.find('table > thead');
                var theadTop = null;
                var saveTheadTop = null;
                var initialTheadBackgroundColor = elem.find('table > thead').css('background-color');
                var opaqueTheadBackground = rgbaToRgb(initialTheadBackgroundColor);
                function updateTHeadTop() {
                    timeoutPromise = $timeout(function () {
                        theadTop = getElementRectangle(thead[0]).top;
                    });
                }
                function rgbaToRgb(color) {
                    var rgbaRegex = /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+),?[\s+]?(\S+)\)$/i;
                    var matches = color.match(rgbaRegex);
                    if (matches && matches.length >= 4) {
                        var r = parseInt(matches[1], 10);
                        var g = parseInt(matches[2], 10);
                        var b = parseInt(matches[3], 10);
                        var a = parseFloat(matches[4] || '1', 10);
                        var rPrime = (1 - a) * 255 + a * r;
                        var gPrime = (1 - a) * 255 + a * g;
                        var bPrime = (1 - a) * 255 + a * b;
                        return 'rgb(' + rPrime + ', ' + gPrime + ', ' + bPrime + ')';
                    }
                    return color;
                }
                function getWindowScroll() {
                    return {
                        top: window.pageYOffset,
                        left: window.pageXOffset
                    };
                }
                function getElementRectangle(item) {
                    var rectangle = item.getBoundingClientRect();
                    var windowScroll = getWindowScroll();
                    return {
                        left: rectangle.left + windowScroll.left,
                        top: rectangle.top + windowScroll.top,
                        width: rectangle.width,
                        height: rectangle.height
                    };
                }
                function onScrollFullscreen() {
                    if (fullscreenElement.scrollTop > theadTop) {
                        thead.css('transform', 'translateY(' + (fullscreenElement.scrollTop - theadTop) + 'px)');
                        thead.css('background-color', opaqueTheadBackground);
                    }
                    else {
                        thead.css('transform', 'translateY(0)');
                        thead.css('background-color', initialTheadBackgroundColor);
                    }
                }
                function onFullscreenChanged(obj, isFullscreen) {
                    if (isFullscreen) {
                        fullscreenElement.scrollTo(0, 0);
                        saveTheadTop = theadTop;
                        updateTHeadTop();
                        window.removeEventListener('scroll', onScroll);
                        fullscreenElement.addEventListener('scroll', onScrollFullscreen);
                    }
                    else {
                        theadTop = saveTheadTop;
                        saveTheadTop = null;
                        fullscreenElement.removeEventListener('scroll', onScrollFullscreen);
                        window.addEventListener('scroll', onScroll);
                        onScroll();
                    }
                }
                function onScroll() {
                    theadTop = theadTop || getElementRectangle(thead[0]).top;
                    var bodyFirstItemHeight = windowFirstChild ? windowFirstChild.getBoundingClientRect().height : 0;
                    var itemTop = theadTop + bodyFirstItemHeight;
                    if (window.scrollY > itemTop) {
                        thead.css('transform', 'translateY(' + Math.max(0, window.scrollY + bodyFirstItemHeight - theadTop) + 'px)');
                        thead.css('background-color', opaqueTheadBackground);
                    }
                    else {
                        thead.css('transform', 'translateY(0)');
                        thead.css('background-color', initialTheadBackgroundColor);
                    }
                }
                function onDestroy() {
                    $timeout.cancel(timeoutPromise);
                    window.removeEventListener('scroll', onScroll);
                    fullscreenElement.removeEventListener('scroll', onScrollFullscreen);
                }
                $rootScope.$on('ngObibaMicaSearch.fullscreenChange', onFullscreenChanged);
                scope.$on('ngObibaMicaLeftPaneToggle', updateTHeadTop);
                scope.$on('$destroy', onDestroy);
                window.addEventListener('scroll', onScroll);
                updateTHeadTop();
            }
        };
    }
    function InfiniteScroll($timeout) {
        return {
            restrict: 'C',
            scope: {
                load: '&'
            },
            link: function (scope, element) {
                function scroll() {
                    var rawEle = element[0];
                    if (window.scrollY >= (0.8 * rawEle.offsetHeight)) {
                        $timeout(function () {
                            scope.load();
                        });
                    }
                }
                window.document.addEventListener('scroll', scroll);
                scope.$on('$destroy', function () {
                    window.document.removeEventListener('scroll', scroll);
                });
            }
        };
    }
    ngObibaMica.search.directive('scrollToTop', ScrollToTop);
    ngObibaMica.search.directive('tableScroll', ['$timeout', '$rootScope', TableScroll]);
    ngObibaMica.search.directive('infiniteScroll', ['$timeout', InfiniteScroll]);
})();
//# sourceMappingURL=component.js.map
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
    ngObibaMica.DatasetVariableCrosstab = angular.module('obiba.mica.DatasetVariableCrosstab', [
        'ui.bootstrap',
        'obiba.notification',
        'obiba.mica.analysis',
        'schemaForm',
        'schemaForm-datepicker',
        'pascalprecht.translate',
        'angularMoment',
        'ui.bootstrap',
        'ui.select'
    ]);
})();
//# sourceMappingURL=dataset-variable-crosstab.js.map
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
    ngObibaMica.DatasetVariableCrosstab
        .controller('DatasetVariableCrosstabController', ['$rootScope',
        '$scope',
        '$routeParams',
        '$log',
        '$location',
        '$route',
        '$translate',
        'DatasetResource',
        'DatasetCategoricalVariablesResource',
        'DatasetVariablesResource',
        'DatasetVariableResource',
        'DatasetVariablesCrosstabResource',
        'ServerErrorAlertService',
        'ContingencyService',
        'LocalizedValues',
        'ChiSquaredCalculator',
        'PageUrlService',
        'ngObibaMicaAnalysisTemplateUrl',
        'AnalysisConfigService',
        function ($rootScope, $scope, $routeParams, $log, $location, $route, $translate, DatasetResource, DatasetCategoricalVariablesResource, DatasetVariablesResource, DatasetVariableResource, DatasetVariablesCrosstabResource, ServerErrorAlertService, ContingencyService, LocalizedValues, ChiSquaredCalculator, PageUrlService, ngObibaMicaAnalysisTemplateUrl, AnalysisConfigService) {
            var analysisOptions = AnalysisConfigService.getOptions();
            function updateLocation(currentPath, param) {
                var original = $location.path;
                $location.path = function (path, reload) {
                    if (reload === false) {
                        var lastRoute = $route.current;
                        var un = $rootScope.$on('$locationChangeSuccess', function () {
                            $route.current = lastRoute;
                            un();
                        });
                    }
                    return original.apply($location, [path]);
                };
                $location.path(currentPath + '/' + param, false);
                $location.path = original;
            }
            var onError = function (response) {
                $scope.serverError = true;
                ServerErrorAlertService.alert('MainController', response);
            };
            var searchCategoricalVariables = function (queryString) {
                if (!queryString || queryString.trim().length < 2) {
                    return;
                }
                DatasetCategoricalVariablesResource.get({
                    dsType: $routeParams.type,
                    dsId: $routeParams.ds,
                    query: queryString.trim() + '*'
                }, function onSuccess(response) {
                    $scope.crosstab.lhs.variables = response.variables;
                }, onError);
            };
            var searchVariables = function (queryString) {
                if (!queryString || queryString.trim().length < 2) {
                    return;
                }
                DatasetVariablesResource.get({
                    dsType: $routeParams.type,
                    dsId: $routeParams.ds,
                    query: queryString.trim() + '*'
                }, function onSuccess(response) {
                    $scope.crosstab.rhs.variables = response.variables;
                }, onError);
            };
            var isStatistical = function (variable) {
                return variable && variable.nature === 'CONTINUOUS';
            };
            var canExchangeVariables = function () {
                return $scope.crosstab.lhs.variable && $scope.crosstab.rhs.variable && !isStatistical($scope.crosstab.rhs.variable);
            };
            /**
             * Submits the crosstab query
             */
            var submit = function () {
                if ($scope.crosstab.lhs.variable && $scope.crosstab.rhs.variable) {
                    $scope.crosstab.lhs.xVariable = $scope.crosstab.lhs.variable;
                    $scope.crosstab.rhs.xVariable = $scope.crosstab.rhs.variable;
                    updateLocation(ContingencyService.removeVariableFromUrl($location.path()), ContingencyService.createVariableUrlPart($scope.crosstab.lhs.xVariable.id, $scope.crosstab.rhs.xVariable.id));
                    $scope.loading = true;
                    DatasetVariablesCrosstabResource.get({
                        dsType: $routeParams.type,
                        dsId: $routeParams.ds,
                        v1: $scope.crosstab.lhs.xVariable.name,
                        v2: $scope.crosstab.rhs.xVariable.name
                    }, function onSuccess(response) {
                        if (Object.keys(response).filter(function (k) {
                            return k[0] !== '$';
                        }).length === 0) {
                            // response with all properties prefixed with '$' filtered out is empty
                            onError({ status: 'crosstab.no-data' });
                        }
                        else {
                            $scope.crosstab.contingencies = normalizeData(response.contingencies ? response.contingencies : [response]);
                            if ($scope.datasetHarmo) {
                                $scope.crosstab.all = normalizeData(response.all ? [response.all] : [])[0];
                            }
                        }
                        $scope.loading = false;
                    }, onError);
                }
            };
            var exchangeVariables = function () {
                if (canExchangeVariables()) {
                    var temp = $scope.crosstab.lhs.variable;
                    $scope.crosstab.lhs.variable = $scope.crosstab.rhs.variable;
                    $scope.crosstab.rhs.variable = temp;
                    submit();
                }
            };
            var initCrosstab = function () {
                $scope.crosstab = {
                    lhs: {
                        variable: null,
                        xVariable: null,
                        variables: []
                    },
                    rhs: {
                        variable: null,
                        xVariable: null,
                        variables: []
                    },
                    all: null,
                    contingencies: null
                };
            };
            var clear = function () {
                initCrosstab();
            };
            function normalizeStatistics(contingency, v1Cats) {
                function createEmptyStatistics() {
                    return {
                        min: '-',
                        max: '-',
                        mean: '-',
                        stdDeviation: '-'
                    };
                }
                contingency.privacyCheck = contingency.aggregations.filter(function (aggregation) {
                    return aggregation.statistics !== null;
                }).length === contingency.aggregations.length;
                var terms = contingency.aggregations.map(function (aggregation) {
                    return aggregation.term;
                });
                if (!contingency.privacyCheck) {
                    // server returns no aggregation, create emptyu ones
                    contingency.aggregations.forEach(function (aggregation) {
                        aggregation.statistics = createEmptyStatistics();
                    });
                    contingency.all.statistics = createEmptyStatistics();
                }
                else {
                    // create the missing category aggregations
                    v1Cats.forEach(function (cat, i) {
                        if (terms.indexOf(cat) === -1) {
                            // create a cat at the same index
                            contingency.aggregations.splice(i, 0, {
                                n: '-',
                                statistics: createEmptyStatistics()
                            });
                        }
                    });
                }
            }
            function normalizeFrequencies(contingency, v2Cats) {
                function percentage(value, total) {
                    return total === 0 ? 0 : value / total * 100;
                }
                function expected(cTotal, rTotal, gt) {
                    return (cTotal * rTotal) / gt;
                }
                function cellChiSquared(value, expected) {
                    return expected === 0 ? 0 : Math.pow(value - expected, 2) / expected;
                }
                function degreeOfFreedom(rows, columns) {
                    return (rows - 1) * (columns - 1);
                }
                /**
                 * Normalized data; accounts for frequencies with no value (ignored by Elasticsearch)
                 * @param aggregation
                 */
                function normalize(aggregation) {
                    if (!aggregation.frequencies) {
                        aggregation.frequencies = [];
                    }
                    var fCats = aggregation.frequencies.map(function (frq) {
                        return frq.value;
                    });
                    v2Cats.forEach(function (cat, i) {
                        if (fCats.indexOf(cat) === -1) {
                            // create a cat at the same index
                            aggregation.frequencies.splice(i, 0, {
                                count: aggregation.privacyCheck ? 0 : '-',
                                value: cat
                            });
                        }
                    });
                }
                /**
                 * Calulates frequency percentages and chi-squared
                 * @param aggregation
                 * @param grandTotal
                 * @param totals
                 * @param chiSquaredInfo
                 */
                function statistics(aggregation, grandTotal, totals, chiSquaredInfo) {
                    if (chiSquaredInfo) {
                        aggregation.percent = percentage(aggregation.n, grandTotal);
                        aggregation.frequencies.forEach(function (frequency, i) {
                            frequency.percent = percentage(frequency.count, totals.frequencies[i].count);
                            frequency.cpercent = percentage(frequency.count, aggregation.n);
                            chiSquaredInfo.sum += cellChiSquared(frequency.count, expected(aggregation.n, totals.frequencies[i].count, grandTotal));
                        });
                    }
                    else {
                        aggregation.frequencies.forEach(function (frequency) {
                            frequency.percent = percentage(frequency.count, grandTotal);
                            frequency.cpercent = percentage(frequency.n, grandTotal);
                        });
                    }
                }
                /**
                 * process contingency
                 */
                var privacyThreshold = contingency.privacyThreshold;
                var grandTotal = contingency.all.total;
                contingency.all.privacyCheck = contingency.all.frequencies && contingency.all.frequencies.length > 0;
                normalize(contingency.all, privacyThreshold);
                statistics(contingency.all, grandTotal, contingency.all);
                if (contingency.aggregations) {
                    contingency.chiSquaredInfo = {
                        pValue: 0,
                        sum: 0,
                        df: degreeOfFreedom($scope.crosstab.rhs.xVariable.categories.length, $scope.crosstab.lhs.xVariable.categories.length)
                    };
                    contingency.privacyCheck = true;
                    contingency.aggregations.forEach(function (aggregation) {
                        aggregation.privacyCheck = aggregation.frequencies ? aggregation.frequencies.length > 0 : false;
                        contingency.privacyCheck = contingency.privacyCheck && aggregation.privacyCheck;
                        normalize(aggregation);
                        statistics(aggregation, grandTotal, contingency.all, contingency.chiSquaredInfo);
                    });
                    if (contingency.privacyCheck) {
                        // no cell has an observation < 5
                        contingency.chiSquaredInfo.pValue = (1 - ChiSquaredCalculator.compute(contingency.chiSquaredInfo));
                    }
                }
            }
            /**
             * Retrieves study table info for the result page
             * @param opalTable
             * @returns {{summary: *, population: *, dce: *, project: *, table: *}}
             */
            var extractSummaryInfo = function (opalTable) {
                var summary = opalTable.studySummary;
                var pop = {};
                var dce = {};
                if (opalTable.studySummary) {
                    var studySummary = opalTable.studySummary;
                    pop = studySummary.populationSummaries ? studySummary.populationSummaries[0] : null;
                    dce = pop && pop.dataCollectionEventSummaries ? pop.dataCollectionEventSummaries.filter(function (dce) {
                        return dce.id === opalTable.dataCollectionEventId;
                    }) : null;
                }
                var currentLanguage = $translate.use();
                return {
                    summary: LocalizedValues.forLang(summary.acronym, currentLanguage),
                    population: pop ? LocalizedValues.forLang(pop.name, currentLanguage) : '',
                    dce: dce ? LocalizedValues.forLang(dce[0].name, currentLanguage) : '',
                    project: opalTable.project,
                    table: opalTable.table,
                    tableName: LocalizedValues.forLang(opalTable.name, currentLanguage)
                };
            };
            /**
             * Normalized data; fills collection with dummy values (statistical or categorical)
             * @param contingencies
             * @returns {*}
             */
            function normalizeData(contingencies) {
                var v2Cats = $scope.crosstab.rhs.xVariable.categories ? $scope.crosstab.rhs.xVariable.categories.map(function (category) {
                    return category.name;
                }) : undefined;
                var v1Cats = $scope.crosstab.lhs.xVariable.categories ? $scope.crosstab.lhs.xVariable.categories.map(function (category) {
                    return category.name;
                }) : undefined;
                if (contingencies) {
                    contingencies.forEach(function (contingency) {
                        // Show the details anyway.
                        contingency.totalPrivacyCheck = contingency.all.n !== -1;
                        if (!contingency.totalPrivacyCheck || contingency.all.n > 0) {
                            if (isStatistical($scope.crosstab.rhs.xVariable)) {
                                normalizeStatistics(contingency, v1Cats);
                            }
                            else {
                                normalizeFrequencies(contingency, v2Cats);
                            }
                        }
                        if (contingency.studyTable) {
                            contingency.info = extractSummaryInfo(contingency.studyTable);
                        }
                    });
                }
                return contingencies;
            }
            var downloadUrl = function (docType) {
                return ContingencyService.getCrossDownloadUrl({
                    ':dsType': $routeParams.type,
                    ':dsId': $routeParams.ds,
                    ':docType': docType,
                    ':v1': $scope.crosstab.lhs.xVariable.name,
                    ':v2': $scope.crosstab.rhs.xVariable.name
                });
            };
            var lhsVariableCategory = function (category) {
                return getVariableCategory($scope.crosstab.lhs.xVariable, category);
            };
            var rhsVariableCategory = function (category) {
                return getVariableCategory($scope.crosstab.rhs.xVariable, category);
            };
            function getVariableCategory(variable, category) {
                var result = null;
                if (variable && variable.categories) {
                    result = variable.categories.filter(function (cat) {
                        return cat.name === category;
                    });
                }
                return result ? result[0] : category;
            }
            var getPrivacyErrorMessage = function (contingency) {
                return !contingency.totalPrivacyCheck ? 'dataset.crosstab.total-privacy-check-failed' : (!contingency.privacyCheck ? 'dataset.crosstab.privacy-check-failed' : '');
            };
            /**
             * Returns the proper template based on total.n
             * @param contingency
             * @returns {string}
             */
            var getTemplatePath = function (contingency) {
                if (!$scope.crosstab.rhs.xVariable) {
                    $log.error('RHS variable is not initialized!');
                    return;
                }
                return isStatistical($scope.crosstab.rhs.xVariable) ?
                    (!contingency.totalPrivacyCheck || contingency.all.n > 0 ?
                        ngObibaMicaAnalysisTemplateUrl.getTemplateUrl('variableStatistics') : ngObibaMicaAnalysisTemplateUrl.getTemplateUrl('variableStatisticsEmpty')) :
                    (!contingency.totalPrivacyCheck || contingency.all.n > 0 ?
                        ngObibaMicaAnalysisTemplateUrl.getTemplateUrl('variableFrequencies') : ngObibaMicaAnalysisTemplateUrl.getTemplateUrl('variableFrequenciesEmpty'));
            };
            $scope.crosstabTemplateUrl = ngObibaMicaAnalysisTemplateUrl.getTemplateUrl('variableCrosstab');
            $scope.isStatistical = isStatistical;
            $scope.getTemplatePath = getTemplatePath;
            $scope.getPrivacyErrorMessage = getPrivacyErrorMessage;
            $scope.canExchangeVariables = canExchangeVariables;
            $scope.exchangeVariables = exchangeVariables;
            $scope.extractSummaryInfo = extractSummaryInfo;
            $scope.lhsVariableCategory = lhsVariableCategory;
            $scope.rhsVariableCategory = rhsVariableCategory;
            $scope.clear = clear;
            $scope.submit = submit;
            $scope.searchCategoricalVariables = searchCategoricalVariables;
            $scope.searchVariables = searchVariables;
            $scope.PageUrlService = PageUrlService;
            $scope.DocType = { CSV: 'csv', EXCEL: 'excel' };
            $scope.StatType = { CPERCENT: 1, RPERCENT: 2, CHI: 3 };
            $scope.routeParams = $routeParams;
            $scope.options = {
                showDetailedStats: analysisOptions.crosstab.showDetailedStats,
                showDetails: true,
                statistics: $scope.StatType.CPERCENT
            };
            $scope.downloadUrl = downloadUrl;
            initCrosstab();
            DatasetResource.get({
                dsType: $routeParams.type,
                dsId: $routeParams.ds
            }, function onSuccess(response) {
                $scope.dataset = response;
                $scope.dataset.translatedAcronym = LocalizedValues.forLang($scope.dataset.acronym, $translate.use());
                $scope.datasetHarmo = $scope.dataset.hasOwnProperty('obiba.mica.HarmonizedDatasetDto.type');
            }, onError);
            var varCount = 0;
            if ($routeParams.varId) {
                DatasetVariableResource.get({ varId: $routeParams.varId }, function onSuccess(response) {
                    $scope.crosstab.lhs.variable = response;
                    $scope.crosstab.lhs.variables = [response];
                    varCount++;
                    if (varCount > 1) {
                        submit();
                    }
                }, onError);
            }
            if ($routeParams.byId) {
                DatasetVariableResource.get({ varId: $routeParams.byId }, function onSuccess(response) {
                    $scope.crosstab.rhs.variable = response;
                    $scope.crosstab.rhs.variables = [response];
                    varCount++;
                    if (varCount > 1) {
                        submit();
                    }
                }, onError);
            }
        }]);
})();
//# sourceMappingURL=dataset-variable-crosstab-controller.js.map
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
    ngObibaMica.DatasetVariableCrosstab
        .filter('variableCategory', function () {
        return function (categories, category) {
            var result = null;
            if (categories) {
                result = categories.filter(function (cat) {
                    return cat.name === category;
                });
            }
            return result ? result[0] : null;
        };
    })
        .filter('variableLabel', ['AttributeService',
        function (AttributeService) {
            return function (variable) {
                var label = '';
                if (variable) {
                    var attributes = AttributeService.getAttributes(variable, ['label']);
                    if (attributes) {
                        attributes.forEach(function (attribute) {
                            label = AttributeService.getValue(attribute);
                            return false;
                        });
                    }
                    return label;
                }
            };
        }])
        .filter('roundNumber', ['$filter',
        function ($filter) {
            return function (value) {
                return isNaN(value) ? value : $filter('number')(value, 2);
            };
        }]);
})();
//# sourceMappingURL=dataset-variable-crosstab-filter.js.map
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
    ngObibaMica.DatasetVariableCrosstab.config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/crosstab/:type/:ds', {
                templateUrl: 'analysis/crosstab/views/crosstab-variable-crosstab.html',
                controller: 'DatasetVariableCrosstabController'
            })
                .when('/crosstab/:type/:ds/variable/:varId', {
                templateUrl: 'analysis/crosstab/views/crosstab-variable-crosstab.html',
                controller: 'DatasetVariableCrosstabController'
            })
                .when('/crosstab/:type/:ds/variable/:varId/by/:byId', {
                templateUrl: 'analysis/crosstab/views/crosstab-variable-crosstab.html',
                controller: 'DatasetVariableCrosstabController'
            });
        }]);
})();
//# sourceMappingURL=dataset-variable-crosstab-router.js.map
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
ngObibaMica.analysis = angular.module('obiba.mica.analysis', [
    'obiba.alert',
    'ui.bootstrap',
    'pascalprecht.translate',
    'templates-ngObibaMica'
]);
//# sourceMappingURL=analysis.js.map
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
(function () {
    ngObibaMica.analysis
        .config(['$provide', function ($provide) {
            $provide.provider('ngObibaMicaAnalysisTemplateUrl', new NgObibaMicaTemplateUrlFactory().create({
                entities: { header: null, footer: null },
                variableCrosstab: { template: null },
                variableFrequencies: { template: null },
                variableFrequenciesEmpty: { template: null },
                variableStatistics: { template: null },
                variableStatisticsEmpty: { template: null },
            }));
        }]);
})();
//# sourceMappingURL=analysis-template-url-provider.js.map
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
    ngObibaMica.DatasetVariableCrosstab
        .factory('DatasetCategoricalVariablesResource', ['$resource', 'ngObibaMicaUrl',
        function ($resource, ngObibaMicaUrl) {
            return $resource(ngObibaMicaUrl.getUrl('DatasetCategoricalVariablesResource'), {}, {
                'get': { method: 'GET', errorHandler: true }
            });
        }]);
})();
//# sourceMappingURL=crosstab-dataset-categorical-variables-resource.js.map
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
    ngObibaMica.DatasetVariableCrosstab
        .factory('DatasetResource', ['$resource', 'ngObibaMicaUrl',
        function ($resource, ngObibaMicaUrl) {
            var url = ngObibaMicaUrl.getUrl('DatasetResource');
            return $resource(url, {}, {
                'get': { method: 'GET', errorHandler: true }
            });
        }]);
})();
//# sourceMappingURL=crosstab-dataset-resource.js.map
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
    ngObibaMica.DatasetVariableCrosstab
        .factory('DatasetVariableResource', ['$resource', 'ngObibaMicaUrl',
        function ($resource, ngObibaMicaUrl) {
            return $resource(ngObibaMicaUrl.getUrl('DatasetVariableResource'), {}, {
                'get': { method: 'GET', errorHandler: true }
            });
        }]);
})();
//# sourceMappingURL=crosstab-dataset-variable-resource.js.map
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
    ngObibaMica.DatasetVariableCrosstab
        .factory('DatasetVariablesCrosstabResource', ['$resource', 'ngObibaMicaUrl',
        function ($resource, ngObibaMicaUrl) {
            return $resource(ngObibaMicaUrl.getUrl('DatasetVariablesCrosstabResource'), {}, {
                'get': { method: 'GET', errorHandler: true }
            });
        }]);
})();
//# sourceMappingURL=crosstab-dataset-variables-crosstab-resource.js.map
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
    ngObibaMica.DatasetVariableCrosstab
        .factory('DatasetVariablesResource', ['$resource', 'ngObibaMicaUrl',
        function ($resource, ngObibaMicaUrl) {
            return $resource(ngObibaMicaUrl.getUrl('DatasetVariablesResource'), {}, {
                'get': { method: 'GET', errorHandler: true }
            });
        }]);
})();
//# sourceMappingURL=crosstab-dataset-variables-resource.js.map
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
    ngObibaMica.search.factory('EntitiesCountResource', ['$resource', 'ngObibaMicaUrl',
        function ($resource, ngObibaMicaUrl) {
            var resourceUrl = ngObibaMicaUrl.getUrl('EntitiesCountResource');
            var method = resourceUrl.indexOf(':query') === -1 ? 'POST' : 'GET';
            var contentType = method === 'POST' ? 'application/x-www-form-urlencoded' : 'application/json';
            var requestTransformer = function (obj) {
                var str = [];
                for (var p in obj) {
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
                    transformRequest: requestTransformer,
                    errorHandler: true
                }
            });
        }]);
})();
//# sourceMappingURL=entities-count-analysis-resource.js.map
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
    ngObibaMica.search
        .factory('VariableResource', ['$resource', 'ngObibaMicaUrl', '$cacheFactory',
        function ($resource, ngObibaMicaUrl, $cacheFactory) {
            return $resource(ngObibaMicaUrl.getUrl('VariableResource'), {}, {
                'get': {
                    method: 'GET',
                    errorHandler: true,
                    cache: $cacheFactory('variableResource')
                }
            });
        }]);
})();
//# sourceMappingURL=variable-resource.js.map
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
    ngObibaMica.search
        .factory('VariableSummaryResource', ['$resource', 'ngObibaMicaUrl', '$cacheFactory',
        function ($resource, ngObibaMicaUrl, $cacheFactory) {
            return $resource(ngObibaMicaUrl.getUrl('VariableSummaryResource'), {}, {
                'get': {
                    method: 'GET',
                    errorHandler: true,
                    cache: $cacheFactory('variableSummaryResource')
                }
            });
        }]);
})();
//# sourceMappingURL=variable-summary-resource.js.map
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
    function manageEntitiesCountHelpText($scope, $translate, $cookies) {
        var cookiesHelp = 'micaHideEntitiesCountHelpText';
        $translate(['analysis.entities-count.help'])
            .then(function (translation) {
            if (!$scope.options.EntitiesCountHelpText && !$cookies.get(cookiesHelp)) {
                $scope.options.EntitiesCountHelpText = translation['analysis.entities-count.help'];
            }
        });
        // Close the cart help box and set the local cookies
        $scope.closeHelpBox = function () {
            $cookies.put(cookiesHelp, true);
            $scope.options.EntitiesCountHelpText = null;
        };
        // Retrieve from local cookies if user has disabled the cart help box and hide the box if true
        if ($cookies.get(cookiesHelp)) {
            $scope.options.EntitiesCountHelpText = null;
        }
    }
    ngObibaMica.analysis
        .controller('EntitiesCountController', [
        '$scope',
        '$location',
        '$translate',
        '$cookies',
        'LocalizedValues',
        'AnalysisConfigService',
        'EntitiesCountResource',
        'AlertService',
        'ServerErrorUtils',
        'ngObibaMicaAnalysisTemplateUrl',
        function ($scope, $location, $translate, $cookies, LocalizedValues, AnalysisConfigService, EntitiesCountResource, AlertService, ServerErrorUtils, ngObibaMicaAnalysisTemplateUrl) {
            $scope.options = AnalysisConfigService.getOptions();
            manageEntitiesCountHelpText($scope, $translate, $cookies);
            $scope.entitiesHeaderTemplateUrl = ngObibaMicaAnalysisTemplateUrl.getHeaderUrl('entities');
            $scope.result = {};
            $scope.query = $location.search().query;
            $scope.loading = false;
            function refresh() {
                if ($scope.query) {
                    $scope.loading = true;
                    EntitiesCountResource.get({ query: $scope.query }, function onSuccess(response) {
                        $scope.result = response;
                        $scope.loading = false;
                        $scope.localizedTotal = ($scope.result.belowPrivacyThreshold ? '<' : '') + LocalizedValues.formatNumber($scope.result.total, $translate.use());
                    }, function onError(response) {
                        $scope.result = {};
                        $scope.loading = false;
                        AlertService.alert({
                            id: 'EntitiesCountController',
                            type: 'danger',
                            msg: ServerErrorUtils.buildMessage(response),
                            delay: 5000
                        });
                    });
                }
                else {
                    $scope.result = {};
                }
            }
            refresh();
            $scope.$on('$locationChangeSuccess', function () {
                $scope.query = $location.search().query;
                refresh();
            });
        }
    ]);
})();
//# sourceMappingURL=analysis-controller.js.map
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
ngObibaMica.analysis
    .config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/entities-count', {
            templateUrl: 'analysis/views/analysis-entities-count.html',
            controller: 'EntitiesCountController',
            reloadOnSearch: false
        });
    }]);
//# sourceMappingURL=analysis-router.js.map
/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";
var AnalysisConfigService = /** @class */ (function () {
    function AnalysisConfigService() {
        this.options = {
            crosstab: {
                showDetailedStats: true,
            },
            showAnalysis: true,
        };
    }
    AnalysisConfigService.prototype.setOptions = function (newOptions) {
        var _this = this;
        if (typeof (newOptions) === "object") {
            Object.keys(newOptions).forEach(function (option) {
                if (option in _this.options) {
                    _this.options[option] = newOptions[option];
                }
            });
        }
    };
    AnalysisConfigService.prototype.getOptions = function () {
        return angular.copy(this.options);
    };
    AnalysisConfigService.prototype.showAnalysis = function () {
        return this.options.showAnalysis;
    };
    return AnalysisConfigService;
}());
ngObibaMica.analysis.service("AnalysisConfigService", [AnalysisConfigService]);
//# sourceMappingURL=analysis-config-service.js.map
/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";
var ChiSquaredCalculator = /** @class */ (function () {
    function ChiSquaredCalculator() {
    }
    ChiSquaredCalculator.prototype.compute = function (chiSquaredInfo) {
        var Chisqcdf = null;
        var Z = chiSquaredInfo.sum;
        var DF = chiSquaredInfo.df;
        if (DF <= 0) {
            // console.log("Degrees of freedom must be positive");
        }
        else {
            Chisqcdf = this.gammacdf(Z / 2, DF / 2);
        }
        Chisqcdf = Math.round(Chisqcdf * 100000) / 100000;
        return Chisqcdf;
    };
    ChiSquaredCalculator.prototype.logGamma = function (Z) {
        var S = 1 + 76.18009173 / Z - 86.50532033 / (Z + 1) + 24.01409822 / (Z + 2) - 1.231739516 / (Z + 3) +
            0.00120858003 / (Z + 4) - 0.00000536382 / (Z + 5);
        var LG = (Z - 0.5) * Math.log(Z + 4.5) - (Z + 4.5) + Math.log(S * 2.50662827465);
        return LG;
    };
    // Good for X>A+1.
    ChiSquaredCalculator.prototype.gcf = function (X, A) {
        var A0 = 0;
        var B0 = 1;
        var A1 = 1;
        var B1 = X;
        var AOLD = 0;
        var N = 0;
        while (Math.abs((A1 - AOLD) / A1) > 0.00001) {
            AOLD = A1;
            N = N + 1;
            A0 = A1 + (N - A) * A0;
            B0 = B1 + (N - A) * B0;
            A1 = X * A0 + N * A1;
            B1 = X * B0 + N * B1;
            A0 = A0 / B1;
            B0 = B0 / B1;
            A1 = A1 / B1;
            B1 = 1;
        }
        var Prob = Math.exp(A * Math.log(X) - X - this.logGamma(A)) * A1;
        return 1 - Prob;
    };
    // Good for X<A+1.
    ChiSquaredCalculator.prototype.gser = function (X, A) {
        var T9 = 1 / A;
        var G = T9;
        var I = 1;
        while (T9 > G * 0.00001) {
            T9 = T9 * X / (A + I);
            G = G + T9;
            I = I + 1;
        }
        G = G * Math.exp(A * Math.log(X) - X - this.logGamma(A));
        return G;
    };
    ChiSquaredCalculator.prototype.gammacdf = function (x, a) {
        var GI;
        if (x <= 0) {
            GI = 0;
        }
        else if (x < a + 1) {
            GI = this.gser(x, a);
        }
        else {
            GI = this.gcf(x, a);
        }
        return GI;
    };
    return ChiSquaredCalculator;
}());
ngObibaMica.DatasetVariableCrosstab.service("ChiSquaredCalculator", [ChiSquaredCalculator]);
//# sourceMappingURL=crosstab-chisquared-calculator.js.map
/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";
var ContingencyService = /** @class */ (function () {
    function ContingencyService() {
    }
    ContingencyService.prototype.removeVariableFromUrl = function (path) {
        return path.replace(/\/variable\/.*/, "");
    };
    ContingencyService.prototype.getCrossDownloadUrl = function (params) {
        return this.searchReplace(":dsType/:dsId/download_:docType/cross/:v1/by/:v2/ws", params);
    };
    ContingencyService.prototype.createVariableUrlPart = function (var1, var2) {
        return this.searchReplace("variable/:var/by/:by", {
            ":by": var2,
            ":var": var1,
        });
    };
    ContingencyService.prototype.searchReplace = function (pattern, params) {
        return pattern.replace(/:\w+/g, function (all) {
            return params[all] || all;
        });
    };
    return ContingencyService;
}());
ngObibaMica.DatasetVariableCrosstab.service("ContingencyService", [ContingencyService]);
//# sourceMappingURL=crosstab-contingency-service.js.map
/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";
var EntitiesCountService = /** @class */ (function () {
    function EntitiesCountService($location, ObibaServerConfigResource) {
        this.$location = $location;
        this.ObibaServerConfigResource = ObibaServerConfigResource;
        var that = this;
        ObibaServerConfigResource.get(function (micaConfig) {
            that.hasMultipleStudies = !micaConfig.isSingleStudyEnabled || micaConfig.isHarmonizedDatasetEnabled;
        });
    }
    EntitiesCountService.prototype.isSingleStudy = function () {
        return !this.hasMultipleStudies;
    };
    /**
     * Replace the original query with the new one in the browser location. If new query is empty,
     * the criteria is to be removed.
     * @param originalQuery Query before update
     * @param newQuery Query after update
     */
    EntitiesCountService.prototype.update = function (originalQuery, newQuery) {
        if (originalQuery === newQuery) {
            return;
        }
        var search = this.$location.search();
        search.query = search.query.split(originalQuery).join("").replace(/,,/, ",").replace(/^,/, "").replace(/,$/, "");
        if (newQuery && newQuery.length !== 0) {
            if (search.query && search.query.length > 0) {
                search.query = search.query + "," + newQuery;
            }
            else {
                search.query = newQuery;
            }
        }
        this.$location.search(search);
    };
    EntitiesCountService.$inject = ["$location", "ObibaServerConfigResource"];
    return EntitiesCountService;
}());
ngObibaMica.analysis.service("EntitiesCountService", ["$location", "ObibaServerConfigResource", EntitiesCountService]);
//# sourceMappingURL=entities-count-service.js.map
/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";
var CrosstabStudyTableController = /** @class */ (function () {
    function CrosstabStudyTableController(PageUrlService) {
        this.PageUrlService = PageUrlService;
        this.contingency = {};
    }
    CrosstabStudyTableController.prototype.$onChanges = function () {
        if (this.contingency.studyTable) {
            this.studyLink = this.PageUrlService.studyPage(this.contingency.studyTable.studyId, "individual-study");
        }
    };
    CrosstabStudyTableController.$inject = ["PageUrlService"];
    return CrosstabStudyTableController;
}());
var CrosstabStudyTableComponent = /** @class */ (function () {
    function CrosstabStudyTableComponent() {
        this.transclude = true;
        this.bindings = {
            contingency: "<",
        };
        this.controller = CrosstabStudyTableController;
        this.controllerAs = "$ctrl";
        this.templateUrl = "analysis/components/crosstab-study-table/component.html";
    }
    return CrosstabStudyTableComponent;
}());
ngObibaMica.DatasetVariableCrosstab
    .component("crosstabStudyTable", new CrosstabStudyTableComponent());
//# sourceMappingURL=component.js.map
/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";
var EntitiesCountResultTableController = /** @class */ (function () {
    function EntitiesCountResultTableController(PageUrlService, LocalizedValues, EntitiesCountService, $translate, $log) {
        this.PageUrlService = PageUrlService;
        this.LocalizedValues = LocalizedValues;
        this.EntitiesCountService = EntitiesCountService;
        this.$translate = $translate;
        this.$log = $log;
        this.result = {};
    }
    EntitiesCountResultTableController.prototype.$onInit = function () {
        this.table = {
            rows: new Array(),
        };
    };
    EntitiesCountResultTableController.prototype.$onChanges = function () {
        this.table = this.asTable();
        this.localizedTotal = this.LocalizedValues.formatNumber(this.result.total ? this.result.total : 0);
        if (this.result.belowPrivacyThreshold) {
            this.localizedTotal = "<" + this.localizedTotal;
        }
    };
    EntitiesCountResultTableController.prototype.showStudyColumn = function () {
        return !this.EntitiesCountService.isSingleStudy();
    };
    EntitiesCountResultTableController.prototype.localize = function (values) {
        return this.LocalizedValues.forLang(values, this.$translate.use());
    };
    EntitiesCountResultTableController.prototype.asTable = function () {
        var _this = this;
        var table = {
            rows: new Array(),
        };
        this.studyCount = this.result.counts ? this.result.counts.length : 0;
        if (this.studyCount) {
            this.result.counts.forEach(function (studyResult) {
                var studyAcronym = _this.localize(studyResult.study.acronym);
                var studyName = _this.localize(studyResult.study.name);
                if (studyResult.counts) {
                    var studyRowCount_1 = 0;
                    studyResult.counts.forEach(function (datasetResult) {
                        var datasetAcronym = _this.localize(datasetResult.dataset.acronym);
                        var datasetName = _this.localize(datasetResult.dataset.name);
                        if (datasetResult.counts) {
                            datasetResult.counts.forEach(function (variableResult) {
                                var parts = variableResult.variable.id.split(":");
                                var variableName = parts[1];
                                if (variableResult.studyTableName) {
                                    variableName = variableName + " (" + _this.localize(variableResult.studyTableName) + ")";
                                }
                                var variableType = parts[2];
                                var variableLink = _this.PageUrlService.variablePage(variableResult.variable.id);
                                var datasetLink = _this.PageUrlService.datasetPage(datasetResult.dataset.id, variableType);
                                var studyType = variableType === "Dataschema" ? "harmonization" : "individual";
                                var row = new Array({
                                    colspan: 1,
                                    link: _this.PageUrlService.studyPage(studyResult.study.id, studyType),
                                    rowspan: studyRowCount_1 === 0 ? 1 : 0,
                                    title: studyRowCount_1 === 0 ? studyName : "",
                                    value: studyRowCount_1 === 0 ? studyAcronym : "",
                                }, {
                                    colspan: 1,
                                    link: variableLink ? variableLink : datasetLink,
                                    rowspan: 1,
                                    title: _this.localize(variableResult.variable.name),
                                    value: variableName,
                                }, {
                                    colspan: 1,
                                    link: datasetLink,
                                    rowspan: 1,
                                    title: datasetName,
                                    value: datasetAcronym,
                                }, {
                                    colspan: 1,
                                    link: undefined,
                                    rowspan: 1,
                                    title: variableResult.query,
                                    value: variableResult.query,
                                }, {
                                    colspan: 1,
                                    link: undefined,
                                    rowspan: 1,
                                    title: undefined,
                                    value: _this.LocalizedValues.formatNumber(variableResult.count),
                                });
                                table.rows.push(row);
                                studyRowCount_1++;
                            });
                        }
                    });
                    table.rows[table.rows.length - studyRowCount_1][0].rowspan = studyRowCount_1 + 1;
                    table.rows.push(new Array({
                        colspan: 1,
                        rowspan: 0,
                        title: undefined,
                        value: undefined,
                    }, {
                        colspan: 3,
                        rowspan: 1,
                        title: studyResult.query,
                        value: undefined,
                    }, {
                        colspan: 1,
                        rowspan: 1,
                        title: undefined,
                        value: (studyResult.belowPrivacyThreshold ? "<" : "")
                            + _this.LocalizedValues.formatNumber(studyResult.total),
                    }));
                }
            });
        }
        return table;
    };
    EntitiesCountResultTableController.$inject = ["PageUrlService", "LocalizedValues", "EntitiesCountService", "$translate", "$log"];
    return EntitiesCountResultTableController;
}());
var EntitiesCountResultTableComponent = /** @class */ (function () {
    function EntitiesCountResultTableComponent() {
        this.transclude = true;
        this.bindings = {
            result: "<",
        };
        this.controller = EntitiesCountResultTableController;
        this.controllerAs = "$ctrl";
        this.templateUrl = "analysis/components/entities-count-result-table/component.html";
    }
    return EntitiesCountResultTableComponent;
}());
ngObibaMica.analysis
    .component("entitiesCountResultTable", new EntitiesCountResultTableComponent());
//# sourceMappingURL=component.js.map
/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";
var Operation;
(function (Operation) {
    Operation["All"] = "all";
    Operation["Exists"] = "exists";
    Operation["Empty"] = "empty";
    Operation["In"] = "in";
    Operation["Out"] = "out";
})(Operation || (Operation = {}));
var VariableCriteriaController = /** @class */ (function () {
    function VariableCriteriaController(VariableResource, VariableSummaryResource, LocalizedValues, EntitiesCountService, $log, $translate, $filter) {
        this.VariableResource = VariableResource;
        this.VariableSummaryResource = VariableSummaryResource;
        this.LocalizedValues = LocalizedValues;
        this.EntitiesCountService = EntitiesCountService;
        this.$log = $log;
        this.$translate = $translate;
        this.$filter = $filter;
        this.query = "";
        this.state = { open: false };
        this.categoriesData = [];
        this.selectedCategories = {};
        this.selectedNumericalOperation = "range";
        this.selectedTemporalOperation = "range";
    }
    VariableCriteriaController.prototype.$onInit = function () {
        this.loading = true;
        this.initializeState();
    };
    /**
     * Close on return submit and escape. Submit the update request only on return.
     * @param event event to get the key
     */
    VariableCriteriaController.prototype.onKeyup = function (event) {
        if (event.keyCode === 13) {
            this.closeDropdown(false);
        }
        else if (event.keyCode === 27) {
            this.closeDropdown(true);
        }
    };
    /**
     * Applies the categories filter text: visible categories are the ones which label matches the searched text.
     * @param event ignored
     */
    VariableCriteriaController.prototype.onSearchTextKeyup = function (event) {
        var filter = this.searchText.trim();
        if (this.categoriesData) {
            var regex_1 = new RegExp(filter, "i");
            this.categoriesData.forEach(function (cat) {
                cat.visible = cat.label.match(regex_1) !== null;
            });
        }
    };
    VariableCriteriaController.prototype.onNumericalMinKeyup = function (event) {
        this.selectedMin = this.ensureNumericValue(this.selectedMin + "", " ");
    };
    VariableCriteriaController.prototype.onNumericalMaxKeyup = function (event) {
        this.selectedMax = this.ensureNumericValue(this.selectedMax + "", " ");
    };
    /**
     * Make sure numerical values are space separated numbers.
     * @param event ignored
     */
    VariableCriteriaController.prototype.onNumericalValuesKeyup = function (event) {
        this.selectedNumericalValues = this.ensureNumericValue(this.selectedNumericalValues, " ");
    };
    /**
     * Close the dropdown and submit update request if changes are detected.
     * @param cancel cancel update request if true
     */
    VariableCriteriaController.prototype.closeDropdown = function (cancel) {
        this.state.open = false;
        if (cancel) {
            return;
        }
        this.update(this.makeNewQuery());
    };
    /**
     * Open the dropdown.
     */
    VariableCriteriaController.prototype.openDropdown = function () {
        if (this.state.open) {
            this.closeDropdown(false);
            return;
        }
        this.state.open = true;
    };
    /**
     * Removes the criteria.
     */
    VariableCriteriaController.prototype.onRemove = function () {
        this.update("");
    };
    /**
     * Get a human readable translated label of the criteria query.
     * @param truncated true if the title is to be truncated
     */
    VariableCriteriaController.prototype.getQueryTitle = function (truncated) {
        var _this = this;
        if (!this.rqlQuery) {
            return "?";
        }
        var title = this.getOperationTitle();
        var rqlQueryWithArgs = this.getRqlQueryWithArgs();
        if (rqlQueryWithArgs.args.length > 1) {
            var items = rqlQueryWithArgs.args[1];
            if (this.getNature() === "CATEGORICAL") {
                items = items.map(function (x) { return _this.localizeCategory(x); });
            }
            if (rqlQueryWithArgs.name === "range") {
                title = title + " [" + items.join(", ") + "]";
            }
            else {
                title = title + " (" + items.join(", ") + ")";
            }
        }
        if (!truncated) {
            return title.length > 50 ? title : "";
        }
        return title.length > 50 ? title.substring(0, 50) + "..." : title;
    };
    /**
     * Check wether there are options for this criteria.
     */
    VariableCriteriaController.prototype.showInOperations = function () {
        return this.getNature() === "CATEGORICAL" || this.isNumerical() || this.isTemporal();
    };
    /**
     * Check whether the categorical options are to be shown.
     */
    VariableCriteriaController.prototype.showCategoricalOptions = function () {
        return this.getNature() === "CATEGORICAL" && this.showOptions();
    };
    /**
     * Check whether the numerical options are to be shown.
     */
    VariableCriteriaController.prototype.showNumericalOptions = function () {
        return this.getNature() === "CONTINUOUS" && this.isNumerical() && this.showOptions();
    };
    /**
     * Check whether the temporal options are to be shown.
     */
    VariableCriteriaController.prototype.showTemporalOptions = function () {
        return this.getNature() === "TEMPORAL" && this.isTemporal() && this.showOptions();
    };
    VariableCriteriaController.prototype.localizeNumber = function (value) {
        return this.LocalizedValues.formatNumber(value);
    };
    /**
     * Parse the query and initialize the component state with variable information.
     */
    VariableCriteriaController.prototype.initializeState = function () {
        this.rqlQuery = this.parseQuery();
        if (this.rqlQuery.args) {
            var rqlQueryWithArgs = this.getQueryWithArgs();
            // get variable from field name
            this.id = rqlQueryWithArgs.args[0].join(":");
            this.VariableResource.get({ id: this.id }, this.onVariable(), this.onError());
        }
    };
    VariableCriteriaController.prototype.getQueryWithArgs = function () {
        return this.isQueryNot() ? this.rqlQuery.args[0] : this.rqlQuery;
    };
    VariableCriteriaController.prototype.isQueryNot = function () {
        return this.rqlQuery.name === "not";
    };
    /**
     * Replace the original query by the new one. If query is empty, the criteria is to be removed.
     * @param newQuery critera query
     */
    VariableCriteriaController.prototype.update = function (newQuery) {
        this.EntitiesCountService.update(this.query, newQuery);
    };
    /**
     * Check if none of the global operations are selected (all, exists, empty).
     */
    VariableCriteriaController.prototype.showOptions = function () {
        return Operation.All !== this.selectedOperation
            && Operation.Exists !== this.selectedOperation
            && Operation.Empty !== this.selectedOperation;
    };
    /**
     * Get the variable's nature.
     */
    VariableCriteriaController.prototype.getNature = function () {
        return this.variable ? this.variable.nature : "?";
    };
    /**
     * Check if the variable has a numerical type (integer or decimal).
     */
    VariableCriteriaController.prototype.isNumerical = function () {
        return this.variable && (this.variable.valueType === "integer" || this.variable.valueType === "decimal");
    };
    /**
     * Check if the variable has a logical type (boolean).
     */
    VariableCriteriaController.prototype.isLogical = function () {
        return this.variable && this.variable.valueType === "boolean";
    };
    /**
     * Check if the variable has a numerical type (integer or decimal).
     */
    VariableCriteriaController.prototype.isTemporal = function () {
        return this.variable && (this.variable.valueType === "date" || this.variable.valueType === "datetime");
    };
    /**
     * Get the translated label of the criteria query operation.
     */
    VariableCriteriaController.prototype.getOperationTitle = function () {
        var rqlQueryWithArgs = this.getRqlQueryWithArgs();
        if (this.isNotQuery()) {
            if (rqlQueryWithArgs.name === "exists") {
                return this.$filter("translate")("analysis.empty");
            }
            else {
                return this.$filter("translate")("analysis.out");
            }
        }
        return this.$filter("translate")("analysis." + (rqlQueryWithArgs.name === "range" ? "in" : rqlQueryWithArgs.name));
    };
    /**
     * Get the RQL query node that contains the criteria arguments.
     */
    VariableCriteriaController.prototype.getRqlQueryWithArgs = function () {
        if (this.isNotQuery()) {
            return this.rqlQuery.args[0];
        }
        return this.rqlQuery;
    };
    /**
     * Check if the RQL query node is a 'not' operation.
     */
    VariableCriteriaController.prototype.isNotQuery = function () {
        return this.rqlQuery && this.rqlQuery.name === "not";
    };
    /**
     * Parse the query string as a RQL query node.
     */
    VariableCriteriaController.prototype.parseQuery = function () {
        try {
            return new RqlParser().parse(this.normalize(this.query)).args[0];
        }
        catch (e) {
            this.$log.error(e.message);
        }
        return new RqlQuery();
    };
    /**
     * Variable identifier separator is not valid for the RQL parser: using path separator, the RQL parser will
     * split the variable identifier tokens automatically.
     * @param str variable identifier
     */
    VariableCriteriaController.prototype.normalize = function (str) {
        return str.split(":").join("/");
    };
    /**
     * Get the translated label of a variable category.
     * @param value category name
     */
    VariableCriteriaController.prototype.localizeCategory = function (value) {
        if (!this.variable.categories) {
            return this.isLogical() ? this.$filter("translate")("global." + value) : value;
        }
        var categories = this.variable.categories.filter(function (cat) { return cat.name === value + ""; });
        if (categories.length === 0) {
            return value;
        }
        var category = categories[0];
        if (!category.attributes) {
            return value;
        }
        var labels = category.attributes.filter(function (attr) { return attr.name === "label"; });
        if (labels.length === 0) {
            return value;
        }
        var label = this.localize(labels[0].values);
        return label || value;
    };
    /**
     * Extract the translation for the current language.
     * @param values labels object
     */
    VariableCriteriaController.prototype.localize = function (values) {
        return this.LocalizedValues.forLang(values, this.$translate.use());
    };
    /**
     * Extract the categories from the variable object.
     */
    VariableCriteriaController.prototype.prepareCategories = function () {
        var _this = this;
        this.categoriesData = [];
        if (this.getNature() === "CATEGORICAL") {
            var categories = this.variable.categories;
            if (categories) {
                categories.forEach(function (cat) {
                    _this.categoriesData.push({
                        label: _this.localizeCategory(cat.name),
                        name: cat.name,
                        visible: true,
                    });
                });
            }
            else if (this.isLogical()) {
                this.categoriesData.push({
                    label: this.$filter("translate")("global.true"),
                    name: "true",
                    visible: true,
                });
                this.categoriesData.push({
                    label: this.$filter("translate")("global.false"),
                    name: "false",
                    visible: true,
                });
            }
        }
    };
    /**
     * Set the state of the options according to the variable and the query.
     */
    VariableCriteriaController.prototype.prepareOptions = function () {
        var _this = this;
        this.prepareCategories();
        var rqlQueryWithArgs = this.getRqlQueryWithArgs();
        // get categories if any
        if (rqlQueryWithArgs.args.length > 1) {
            if (rqlQueryWithArgs.name === "in") {
                if (this.showCategoricalOptions()) {
                    rqlQueryWithArgs.args[1].forEach(function (value) {
                        _this.selectedCategories[value] = true;
                    });
                }
                else if (this.showNumericalOptions()) {
                    this.selectedNumericalOperation = "in";
                    this.selectedNumericalValues = rqlQueryWithArgs.args[1].filter(function (val) { return !isNaN(val); }).join(" ");
                }
                else if (this.showTemporalOptions()) {
                    this.selectedTemporalOperation = "in";
                    this.selectedTemporalValue = rqlQueryWithArgs.args[1].length > 0 ?
                        new Date(Date.parse(rqlQueryWithArgs.args[1][0])) : undefined;
                }
            }
            else if (rqlQueryWithArgs.name === "range" && rqlQueryWithArgs.args[1].length > 0) {
                var arg1 = rqlQueryWithArgs.args[1][0];
                if (arg1 === "*") {
                    this.selectedMin = undefined;
                    this.selectedFrom = undefined;
                }
                else if (this.showNumericalOptions() && !isNaN(arg1)) {
                    this.selectedMin = arg1;
                }
                else if (this.showTemporalOptions()) {
                    this.selectedFrom = new Date(Date.parse(arg1));
                }
                if (rqlQueryWithArgs.args[1].length >= 2) {
                    var arg2 = rqlQueryWithArgs.args[1][1];
                    if (arg2 === "*") {
                        this.selectedMax = undefined;
                        this.selectedTo = undefined;
                    }
                    else if (this.showNumericalOptions() && !isNaN(arg2)) {
                        this.selectedMax = arg2;
                    }
                    else if (this.showTemporalOptions()) {
                        this.selectedTo = new Date(Date.parse(arg2));
                    }
                }
            }
        }
        this.selectedOperation = this.rqlQuery.name === "range" ? "in" : this.rqlQuery.name;
        if (this.isQueryNot() && (rqlQueryWithArgs.name === "in" || rqlQueryWithArgs.name === "range")) {
            this.selectedOperation = "out";
        }
        if (this.isQueryNot() && rqlQueryWithArgs.name === "exists") {
            this.selectedOperation = "empty";
        }
    };
    VariableCriteriaController.prototype.ensureNumericValue = function (selection, separator) {
        var values = "";
        if (selection) {
            for (var i = 0; i < selection.length; i++) {
                var c = selection.charAt(i);
                if (c === separator
                    || (this.variable.valueType === "decimal" && c === ".")
                    || c === "-"
                    || !isNaN(parseInt(c, 10))) {
                    values = values + c;
                }
            }
        }
        return values;
    };
    /**
     * Get the new query from the selections.
     */
    VariableCriteriaController.prototype.makeNewQuery = function () {
        var _this = this;
        var newQuery = "";
        var args;
        if (this.showCategoricalOptions()) {
            args = Object.keys(this.selectedCategories).filter(function (key) {
                return _this.selectedCategories[key];
            }).map(function (key) { return key; }).join(",");
        }
        if (this.showNumericalOptions()) {
            if (this.selectedNumericalOperation === "range") {
                var min = this.selectedMin && this.selectedMin !== "-" ? this.selectedMin : "*";
                var max = this.selectedMax && this.selectedMax !== "-" ? this.selectedMax : "*";
                args = [min, max].join(",");
            }
            else {
                args = this.selectedNumericalValues.split(" ").join(",");
            }
        }
        if (this.showTemporalOptions()) {
            if (this.selectedTemporalOperation === "range") {
                var min = this.selectedFrom ? this.dateToString(this.selectedFrom) : "*";
                var max = this.selectedTo ? this.dateToString(this.selectedTo) : "*";
                args = [min, max].join(",");
            }
            else {
                args = this.dateToString(this.selectedTemporalValue);
            }
        }
        switch (this.selectedOperation) {
            case Operation.All:
            case Operation.Exists:
                newQuery = this.selectedOperation + "({field})";
                break;
            case Operation.Empty:
                newQuery = "not(exists({field}))";
                break;
            case Operation.In:
                if (args && args.length > 0) {
                    if (this.showCategoricalOptions()
                        || (this.showNumericalOptions() && this.selectedNumericalOperation === "in")
                        || (this.showTemporalOptions() && this.selectedTemporalOperation === "in")) {
                        newQuery = "in({field},({args}))";
                    }
                    else if ((this.showNumericalOptions() && this.selectedNumericalOperation === "range")
                        || (this.showTemporalOptions() && this.selectedTemporalOperation === "range")) {
                        newQuery = "range({field},({args}))";
                    }
                }
                else {
                    newQuery = "not(exists({field}))";
                    this.selectedOperation = "empty";
                }
                break;
            case Operation.Out:
                if (args && args.length > 0) {
                    if (this.showCategoricalOptions()
                        || (this.showNumericalOptions() && this.selectedNumericalOperation === "in")
                        || (this.showTemporalOptions() && this.selectedTemporalOperation === "in")) {
                        newQuery = "not(in({field},({args})))";
                    }
                    else if ((this.showNumericalOptions() && this.selectedNumericalOperation === "range")
                        || (this.showTemporalOptions() && this.selectedTemporalOperation === "range")) {
                        newQuery = "not(range({field},({args})))";
                    }
                }
                else {
                    newQuery = "exists({field})";
                    this.selectedOperation = "exists";
                }
        }
        newQuery = newQuery.replace("{field}", this.variable.id);
        newQuery = newQuery.replace("{args}", args);
        return newQuery;
    };
    VariableCriteriaController.prototype.dateToString = function (date) {
        if (!date) {
            return "";
        }
        var mm = date.getMonth() + 1; // getMonth() is zero-based
        var dd = date.getDate();
        return [date.getFullYear(), (mm > 9 ? "" : "0") + mm, (dd > 9 ? "" : "0") + dd].join("-");
    };
    /**
     * Variable response processor.
     */
    VariableCriteriaController.prototype.onVariable = function () {
        var that = this;
        return function (response) {
            that.variable = response;
            that.loading = false;
            that.prepareOptions();
            that.VariableSummaryResource.get({ id: response.id }, that.onVariableSummary(), that.onError());
        };
    };
    /**
     * Variable summary response processor.
     */
    VariableCriteriaController.prototype.onVariableSummary = function () {
        var that = this;
        return function (response) {
            that.summary = response;
            if (that.summary["Math.ContinuousSummaryDto.continuous"]) {
                var summary = that.summary["Math.ContinuousSummaryDto.continuous"].summary;
                that.rangeMin = summary.min;
                that.rangeMax = summary.max;
                var frequencies = that.summary["Math.ContinuousSummaryDto.continuous"].frequencies;
                var notNullFreq = frequencies ? frequencies.filter(function (elem) { return elem.value === "NOT_NULL"; }).pop() : undefined;
                that.existsFrequency = notNullFreq ? notNullFreq.freq : 0;
                var emptyFreq = frequencies.filter(function (elem) { return elem.value === "N/A"; }).pop();
                that.emptyFrequency = emptyFreq ? emptyFreq.freq : 0;
                that.allFrequency = that.existsFrequency + that.emptyFrequency;
            }
            if (that.summary["Math.CategoricalSummaryDto.categorical"]) {
                var frequencies_1 = that.summary["Math.CategoricalSummaryDto.categorical"].frequencies;
                that.categoriesData.forEach(function (cat) {
                    var freqs = frequencies_1.filter(function (elem) { return elem.value === cat.name; });
                    if (freqs.length > 0) {
                        cat.frequency = freqs[0].freq;
                    }
                });
                that.allFrequency = that.summary["Math.CategoricalSummaryDto.categorical"].n;
                that.existsFrequency = that.summary["Math.CategoricalSummaryDto.categorical"].otherFrequency +
                    frequencies_1.filter(function (elem) { return elem.value !== "N/A"; }).map(function (elem) { return elem.freq; }).reduce(function (acc, curr) { return acc + curr; });
                that.emptyFrequency = that.allFrequency - that.existsFrequency;
            }
            if (that.summary["Math.TextSummaryDto.textSummary"]) {
                that.allFrequency = that.summary["Math.TextSummaryDto.textSummary"].n;
                var frequencies = that.summary["Math.TextSummaryDto.textSummary"].frequencies;
                if (frequencies) {
                    that.existsFrequency = frequencies.filter(function (elem) { return elem.value !== "N/A"; })
                        .map(function (elem) { return elem.freq; }).reduce(function (acc, curr) { return acc + curr; });
                }
                if (that.summary["Math.TextSummaryDto.textSummary"].otherFrequency) {
                    that.existsFrequency = that.existsFrequency + that.summary["Math.TextSummaryDto.textSummary"].otherFrequency;
                }
                that.emptyFrequency = that.allFrequency - that.existsFrequency;
            }
            if (that.summary["Math.DefaultSummaryDto.defaultSummary"]) {
                that.allFrequency = that.summary["Math.DefaultSummaryDto.defaultSummary"].n;
                var frequencies = that.summary["Math.DefaultSummaryDto.defaultSummary"].frequencies;
                var notNullFreq = frequencies ? frequencies.filter(function (elem) { return elem.value === "NOT_NULL"; }).pop() : undefined;
                that.existsFrequency = notNullFreq ? notNullFreq.freq : 0;
                that.emptyFrequency = that.allFrequency - that.existsFrequency;
            }
        };
    };
    /**
     * General error handler (to be improved).
     */
    VariableCriteriaController.prototype.onError = function () {
        var that = this;
        return function (response) {
            that.variable = undefined;
            that.loading = false;
        };
    };
    VariableCriteriaController.$inject = [
        "VariableResource", "VariableSummaryResource", "LocalizedValues", "EntitiesCountService",
        "$log", "$translate", "$filter"
    ];
    return VariableCriteriaController;
}());
var VariableCriteriaComponent = /** @class */ (function () {
    function VariableCriteriaComponent() {
        this.transclude = true;
        this.bindings = {
            query: "<",
        };
        this.controller = VariableCriteriaController;
        this.controllerAs = "$ctrl";
        this.templateUrl = "analysis/components/variable-criteria/component.html";
    }
    return VariableCriteriaComponent;
}());
ngObibaMica.analysis
    .component("variableCriteria", new VariableCriteriaComponent());
//# sourceMappingURL=component.js.map
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
ngObibaMica.localized = angular.module('obiba.mica.localized', [
    'obiba.notification',
    'pascalprecht.translate',
    'templates-ngObibaMica'
]);
//# sourceMappingURL=localized.js.map
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
            link: function (scope) {
                scope.keyLang = scope.keyLang || 'lang';
                scope.keyValue = scope.keyValue || 'value';
                scope.LocalizedValues = LocalizedValues;
            }
        };
    }])
    .directive('localizedNumber', ['LocalizedValues', function (LocalizedValues) {
        return {
            restrict: 'E',
            scope: { number: '=value' },
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
                        { lang: $scope.lang, value: '' }
                    ];
                }
                $scope.$watch('model', function (newModel) {
                    if (angular.isUndefined(newModel) || newModel === null) {
                        $scope.model = [{ lang: $scope.lang, value: '' }];
                    }
                    var currentLang = $scope.model.filter(function (e) {
                        if (e.lang === $scope.lang) {
                            return e;
                        }
                    });
                    if (currentLang.length === 0) {
                        $scope.model.push({ lang: $scope.lang, value: '' });
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
                        { lang: $scope.lang, value: '' }
                    ];
                }
                $scope.$watch('model', function (newModel) {
                    if (angular.isUndefined(newModel) || newModel === null) {
                        $scope.model = [{ lang: $scope.lang, value: '' }];
                    }
                    var currentLang = $scope.model.filter(function (e) {
                        if (e.lang === $scope.lang) {
                            return e;
                        }
                    });
                    if (currentLang.length === 0) {
                        $scope.model.push({ lang: $scope.lang, value: '' });
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
                        { lang: $scope.lang, value: '' }
                    ];
                }
                $scope.$watch('model', function (newModel) {
                    if (angular.isUndefined(newModel) || newModel === null) {
                        $scope.model = [{ lang: $scope.lang, value: '' }];
                    }
                    var currentLang = $scope.model.filter(function (e) {
                        if (e.lang === $scope.lang) {
                            return e;
                        }
                    });
                    if (currentLang.length === 0) {
                        $scope.model.push({ lang: $scope.lang, value: '' });
                    }
                }, true);
                $scope.fieldName = $scope.name + '-' + $scope.lang;
                $scope.form = ctrl;
            }
        };
    }]);
//# sourceMappingURL=localized-directives.js.map
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
    .service('LocalizedValues', ['$translate', '$sce', function ($translate, $sce) {
        var self = this;
        var fixLength = function (val, length) {
            if (val === '-') {
                return $sce.trustAsHtml(val);
            }
            var toAdd = val.split('.').length - 1 || val.split(',').length - 1 || 0;
            var blankToAdd = '&nbsp;'.repeat((val.length > length) ? (length + toAdd - val.length) : (length - val.length));
            return $sce.trustAsHtml(blankToAdd + val);
        };
        this.for = function (values, lang, keyLang, keyValue) {
            if (angular.isArray(values)) {
                var result = values.filter(function (item) {
                    return item[keyLang] === lang;
                });
                if (result && result.length > 0) {
                    return result[0][keyValue];
                }
                else {
                    var langs = values.map(function (value) {
                        return value[keyLang];
                    });
                    if (langs.length > 0) {
                        return self.for(values, langs.length === 1 ? langs[0] : 'en', keyLang, keyValue);
                    }
                }
            }
            else if (angular.isObject(values)) {
                return self.for(Object.keys(values).map(function (k) {
                    return { lang: k, value: values[k] };
                }), lang, keyLang, keyValue);
            }
            return values || '';
        };
        this.forLocale = function (values, lang) {
            var rval = this.for(values, lang, 'locale', 'text');
            if (!rval || rval === '') {
                rval = this.for(values, 'und', 'locale', 'text');
            }
            if (!rval || rval === '') {
                rval = this.for(values, 'en', 'locale', 'text');
            }
            return rval;
        };
        this.forLang = function (values, lang) {
            var rval = this.for(values, lang, 'lang', 'value');
            if (!rval || rval === '') {
                rval = this.for(values, 'und', 'lang', 'value');
            }
            if (!rval || rval === '') {
                rval = this.for(values, 'en', 'lang', 'value');
            }
            return rval;
        };
        this.formatNumber = function (val, lengthToFix) {
            return (typeof val === 'undefined' || val === null || typeof val !== 'number') ?
                (lengthToFix ? fixLength(val, lengthToFix) : val) :
                (lengthToFix ? fixLength(val.toLocaleString($translate.use()), lengthToFix) :
                    val.toLocaleString($translate.use()));
        };
        this.arrayToObject = function (values) {
            var rval = {};
            if (values) {
                values.forEach(function (entry) {
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
    }])
    .service('LocalizedSchemaFormService', ['$filter', function ($filter) {
        this.translate = function (value) {
            if (!value) {
                return value;
            }
            if (typeof value === 'string') {
                return this.translateString(value);
            }
            else if (typeof value === 'object') {
                if (Array.isArray(value)) {
                    return this.translateArray(value);
                }
                else {
                    return this.translateObject(value);
                }
            }
            return value;
        };
        this.translateObject = function (object) {
            if (!object) {
                return object;
            }
            for (var prop in object) {
                if (object.hasOwnProperty(prop)) {
                    if (typeof object[prop] === 'string') {
                        object[prop] = this.translateString(object[prop]);
                    }
                    else if (typeof object[prop] === 'object') {
                        if (Array.isArray(object[prop])) {
                            object[prop] = this.translateArray(object[prop]);
                        }
                        else {
                            object[prop] = this.translateObject(object[prop]);
                        }
                    } // else ignore
                }
            }
            return object;
        };
        this.translateArray = function (array) {
            if (!array) {
                return array;
            }
            var that = this;
            array.map(function (item) {
                return that.translate(item);
            });
            return array;
        };
        this.translateString = function (string) {
            if (!string) {
                return string;
            }
            return string.replace(/t\(([^\)]+)\)/g, function (match, p1) {
                return $filter('translate')(p1);
            });
        };
    }]);
//# sourceMappingURL=localized-service.js.map
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
    .filter('localizedNumber', ['LocalizedValues', function (LocalizedValues) {
        return function (value) {
            return value === 0 ? 0 : value ? LocalizedValues.formatNumber(value) : '';
        };
    }])
    .filter('localizedString', ['$translate', 'LocalizedValues', function ($translate, LocalizedValues) {
        return function (input) {
            return LocalizedValues.forLocale(input, $translate.use());
        };
    }]);
//# sourceMappingURL=localized-filter.js.map
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
function NgObibaMicaFileBrowserOptionsProvider() {
    var options = {
        locale: 'en',
        downloadInline: true,
        downloadKey: false,
        folders: {
            excludes: ['population']
        },
        documentsTitle: 'file.documents'
    };
    this.addExcludeFolder = function (folder) {
        if (folder) {
            options.folders.excludes.push(folder);
        }
    };
    this.setOptions = function (newOptions) {
        if (typeof (newOptions) === 'object') {
            Object.keys(newOptions).forEach(function (option) {
                if (option in options) {
                    options[option] = newOptions[option];
                }
            });
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
//# sourceMappingURL=file-browser.js.map
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
                subject: '=',
                refresh: '=',
                showTitle: '@'
            },
            templateUrl: 'file-browser/views/file-browser-template.html',
            link: function (scope, elem) {
                scope.selfNode = elem[0];
            }
        };
    }]);
//# sourceMappingURL=file-browser-directive.js.map
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
    'CustomWatchDomElementService',
    function ($rootScope, $scope, $log, $filter, StringUtils, FileBrowserService, BrowserBreadcrumbHelper, AlertService, ServerErrorUtils, FileBrowserFileResource, FileBrowserSearchResource, ngObibaMicaFileBrowserOptions, FileBrowserDownloadService, CustomWatchDomElementService) {
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
            if (keyToken) {
                fileParam = { path: path, keyToken: keyToken };
            }
            else {
                fileParam = { path: path };
            }
            FileBrowserFileResource.get(fileParam, function onSuccess(response) {
                if (response.code !== 404) {
                    $scope.pagination.selected = -1;
                    $scope.data.document = $scope.data.details.document = response;
                    if (!$scope.data.document.children) {
                        $scope.data.document.children = [];
                    }
                    if (keyToken) {
                        $scope.data.document.keyToken = keyToken;
                    }
                    if ($scope.data.document.path === $scope.data.rootPath) {
                        $scope.data.document.children = $scope.data.document.children.filter(function (child) {
                            return ngObibaMicaFileBrowserOptions.folders.excludes.indexOf(child.name) < 0;
                        });
                        $scope.data.document.size = $scope.data.document.children.length;
                    }
                    $scope.data.breadcrumbs = BrowserBreadcrumbHelper.toArray(path, $scope.data.rootPath);
                    $scope.data.isFile = FileBrowserService.isFile(response);
                    $scope.data.isRoot = FileBrowserService.isRoot(response);
                    $scope.noDocument = false;
                    if (response.type === 'FOLDER' && response.size < 1) {
                        $scope.noDocument = true;
                    }
                }
                else {
                    $scope.noDocument = true;
                }
            }, onError);
        }
        function navigateToParent(event, document, keyToken) {
            event.stopPropagation();
            var path = document.path;
            if (path.lastIndexOf('/') === 0) {
                path = '/';
            }
            else {
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
                }
                catch (error) {
                    // just return the input query
                }
                return query ? query + ' AND ' + excludeQuery : excludeQuery;
            }
            searchParams.query = excludeFolders(searchParams.query);
            var urlParams = angular.extend({}, { path: path }, searchParams);
            FileBrowserSearchResource.search(urlParams, function onSuccess(response) {
                var clone = $scope.data.document ? angular.copy($scope.data.document) : {};
                clone.children = response;
                $scope.data.document = clone;
            }, function onError(response) {
                $log.debug('ERROR:', response);
            });
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
            var searchParams = { query: query, recursively: recursively, sort: sortBy, order: orderBy, limit: limit };
            searchDocumentsInternal($scope.data.document.path, searchParams);
        };
        var toggleRecursively = function () {
            $scope.data.search.recursively = !$scope.data.search.recursively;
            if ($scope.data.search.text) {
                searchDocuments($scope.data.search.text);
            }
            else if ($scope.data.search.query) {
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
                    }
                    else {
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
        var showDetails = function (document, index) {
            $scope.pagination.selected = index;
            $scope.data.details.document = document;
            $scope.data.details.show = true;
        };
        var getTypeParts = function (document) {
            return FileBrowserService.isFile(document) && document.attachment.type ?
                document.attachment.type.split(/,|\s+/) :
                [];
        };
        var getLocalizedValue = function (values) {
            return FileBrowserService.getLocalizedValue(values, ngObibaMicaFileBrowserOptions.locale);
        };
        var hasLocalizedValue = function (values) {
            return FileBrowserService.hasLocalizedValue(values, ngObibaMicaFileBrowserOptions.locale);
        };
        var refresh = function (docPath, docId) {
            if (docPath && docId) {
                $scope.docPath = docPath;
                $scope.docId = docId;
            }
            if (($scope.docPath && $scope.docPath !== '/') && $scope.docId) {
                $scope.data.docRootIcon = BrowserBreadcrumbHelper.rootIcon($scope.docPath);
                $scope.data.rootPath = $scope.docPath + ($scope.docId !== 'null' ? '/' + $scope.docId : '');
                if ($scope.tokenKey) {
                    getDocument($scope.data.rootPath, $scope.tokenKey, null);
                }
                else {
                    getDocument($scope.data.rootPath, null);
                }
            }
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
        $scope.documentsTitle = ngObibaMicaFileBrowserOptions.documentsTitle;
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
            refresh();
        });
        $scope.__defineSetter__('selfNode', function (selfNode) {
            if (selfNode) {
                CustomWatchDomElementService.configWatch(selfNode, ['refresh', 'show-title']).customWatch(function () {
                    if (selfNode.attributes[4].value === 'true') {
                        refresh(selfNode.attributes[1].value, selfNode.attributes[2].value);
                        $scope.showTitle = selfNode.attributes[6].value;
                    }
                });
            }
        });
    }
]);
//# sourceMappingURL=file-browser-controller.js.map
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
ngObibaMica.fileBrowser
    .factory('FileBrowserFileResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
        var url = ngObibaMicaUrl.getUrl('FileBrowserFileResource');
        return $resource(url, { path: '@path', keyToken: '@keyToken' }, {
            'get': { method: 'GET', errorHandler: true }
        });
    }])
    .factory('FileBrowserSearchResource', ['$resource', 'ngObibaMicaUrl',
    function ($resource, ngObibaMicaUrl) {
        return $resource(ngObibaMicaUrl.getUrl('FileBrowserSearchResource'), { path: '@path' }, {
            'search': { method: 'GET', isArray: true, errorHandler: true }
        });
    }])
    .service('FileBrowserDownloadService', ['ngObibaMicaUrl', 'ngObibaMicaFileBrowserOptions',
    function (ngObibaMicaUrl, ngObibaMicaFileBrowserOptions) {
        this.getUrl = function (path, keyToken) {
            var url = ngObibaMicaUrl.getUrl('FileBrowserDownloadUrl')
                .replace(/:path/, window.encodeURIComponent(path))
                .replace(/:inline/, ngObibaMicaFileBrowserOptions.downloadInline);
            if (keyToken) {
                url = url.replace(/:key/, keyToken);
            }
            else {
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
                    parts.push({ name: part, path: prev });
                });
                return parts;
            }
            // Should never happen
            return [{ name: '', path: '' }];
        };
        this.rootIcon = function (docPath) {
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
//# sourceMappingURL=file-browser-service.js.map
angular.module('templates-ngObibaMica', ['access/components/action-log/component.html', 'access/components/action-log/item/component.html', 'access/components/action-log/item/delete-modal.html', 'access/components/action-log/item/edit-modal.html', 'access/components/entity-list/component.html', 'access/components/print-friendly-view/component.html', 'access/components/reports-progressbar/component.html', 'access/components/reports-progressbar/edit-start-date-modal.html', 'access/components/status-progressbar/component.html', 'access/components/timeline/component.html', 'access/views/data-access-amendment-view.html', 'access/views/data-access-request-documents-view.html', 'access/views/data-access-request-form.html', 'access/views/data-access-request-history-view.html', 'access/views/data-access-request-list.html', 'access/views/data-access-request-profile-user-modal.html', 'access/views/data-access-request-submitted-modal.html', 'access/views/data-access-request-validation-modal.html', 'access/views/data-access-request-view.html', 'analysis/components/crosstab-study-table/component.html', 'analysis/components/entities-count-result-table/component.html', 'analysis/components/variable-criteria/component.html', 'analysis/crosstab/views/crosstab-variable-crosstab.html', 'analysis/crosstab/views/crosstab-variable-frequencies-empty.html', 'analysis/crosstab/views/crosstab-variable-frequencies.html', 'analysis/crosstab/views/crosstab-variable-statistics-empty.html', 'analysis/crosstab/views/crosstab-variable-statistics.html', 'analysis/views/analysis-entities-count.html', 'attachment/attachment-input-template.html', 'attachment/attachment-list-template.html', 'file-browser/views/document-detail-template.html', 'file-browser/views/documents-table-template.html', 'file-browser/views/file-browser-template.html', 'file-browser/views/toolbar-template.html', 'localized/localized-input-group-template.html', 'localized/localized-input-template.html', 'localized/localized-template.html', 'localized/localized-textarea-template.html', 'search/components/panel/classification/component.html', 'search/components/panel/taxonomy-panel/component.html', 'search/components/panel/term-panel/component.html', 'search/components/panel/vocabulary-panel/component.html', 'search/views/classifications.html', 'search/views/classifications/taxonomy-template.html', 'sets/components/add-to-set-modal/component.html', 'sets/components/cart-documents-table/component.html', 'sets/components/set-variables-table/component.html', 'sets/views/cart.html', 'sets/views/list/pagination-template.html', 'sets/views/sets.html', 'utils/components/entity-schema-form/component.html', 'utils/components/table-alert-header/component.html', 'utils/services/user-profile-modal/service.html', 'utils/views/unsaved-modal.html', 'views/pagination-template.html']);

angular.module("access/components/action-log/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("access/components/action-log/component.html",
    "<form class=\"form-inline voffset2\" name=\"actionLogForm\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <input type=\"text\"\n" +
    "           class=\"form-control\"\n" +
    "           ng-model=\"$ctrl.item.action\"\n" +
    "           ng-required=\"true\"\n" +
    "           placeholder=\"{{'data-access-request.action-log.action-placeholder' | translate}}\"\n" +
    "           typeahead-editable=\"true\"\n" +
    "           uib-typeahead=\"value for value in $ctrl.predefinedActionNames | filter:$viewValue | limitTo:8\">\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <div class=\"input-group\">\n" +
    "      <input type=\"datetime\"\n" +
    "             class=\"form-control\"\n" +
    "             uib-datepicker-popup=\"dd/MM/yyyy\"\n" +
    "             ng-model=\"$ctrl.item.changedOn\"\n" +
    "             ng-required=\"true\"\n" +
    "             ng-focus=\"$ctrl.open = !$ctrl.item.changedOn\" is-open=\"$ctrl.open\"\n" +
    "             placeholder=\"dd/MM/yyyy\"\n" +
    "             show-button-bar=\"false\">\n" +
    "\n" +
    "      <span class=\"input-group-btn\">\n" +
    "        <button type=\"button\" class=\"btn btn-sm btn-default\" ng-click=\"$ctrl.open = !$ctrl.open\">\n" +
    "          <i class=\"glyphicon glyphicon-calendar\"></i>\n" +
    "        </button>\n" +
    "      </span>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <button type=\"button\" class=\"btn btn-sm btn-info\" ng-click=\"$ctrl.add($ctrl.item)\">{{'global.add' | translate}}\n" +
    "    <i class=\"fa fa-plus\"></i>\n" +
    "  </button>\n" +
    "\n" +
    "  <div class=\"form-group has-error\" ng-if=\"$ctrl.showError && (!$ctrl.item.action || !$ctrl.item.changedOn)\">\n" +
    "    <span class=\"control-label\">{{'data-access-request.action-log.required' | translate}}</span>\n" +
    "  </div>\n" +
    "</form>");
}]);

angular.module("access/components/action-log/item/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("access/components/action-log/item/component.html",
    "<ul class=\"list-inline\" ng-if=\"$ctrl.showButtons\">\n" +
    "  <li>\n" +
    "    <a ng-click=\"$ctrl.edit($ctrl.item)\">\n" +
    "      <i class=\"fa fa-pencil\"></i>\n" +
    "    </a>\n" +
    "  </li>\n" +
    "  <li>\n" +
    "    <a ng-click=\"$ctrl.remove($ctrl.item)\">\n" +
    "      <i class=\"fa fa-trash-o\"></i>\n" +
    "    </a>\n" +
    "  </li>\n" +
    "</ul>");
}]);

angular.module("access/components/action-log/item/delete-modal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("access/components/action-log/item/delete-modal.html",
    "<div class=\"modal-header\">\n" +
    "  <h4 class=\"modal-title\">\n" +
    "    <i class=\"fa fa-exclamation-triangle\"></i>\n" +
    "    {{'data-access-request.action-log.delete.title' | translate}}\n" +
    "  </h4>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal-body\">\n" +
    "  {{'data-access-request.action-log.delete.message' | translate:$modal.item}}\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button class=\"btn btn-responsive btn-default\" type=\"button\" ng-click=\"$dismiss()\" translate>cancel</button>\n" +
    "  <button class=\"btn btn-responsive btn-primary\" type=\"button\" ng-click=\"$close()\" translate>ok</button>\n" +
    "</div>");
}]);

angular.module("access/components/action-log/item/edit-modal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("access/components/action-log/item/edit-modal.html",
    "<div class=\"modal-header\">\n" +
    "  <h4 class=\"modal-title\">\n" +
    "    {{'data-access-request.action-log.edit.title' | translate}}\n" +
    "  </h4>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal-body\">\n" +
    "  <form name=\"actionLogModalForm\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <input type=\"text\"\n" +
    "             class=\"form-control\"\n" +
    "             ng-model=\"$modal.item.action\"\n" +
    "             ng-required=\"true\"\n" +
    "             placeholder=\"{{'data-access-request.action-log.action-placeholder' | translate}}\"\n" +
    "             typeahead-editable=\"true\"\n" +
    "             uib-typeahead=\"value for value in $modal.predefinedActionNames | filter:$viewValue | limitTo:8\">\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"form-group\">\n" +
    "      <div class=\"input-group\">\n" +
    "        <input type=\"datetime\" class=\"form-control\" uib-datepicker-popup=\"dd/MM/yyyy\" ng-model=\"$modal.item.changedOn\" ng-required=\"true\"\n" +
    "          ng-focus=\"$modal.open = !$modal.item.changedOn\" is-open=\"$modal.open\" placeholder=\"dd/MM/yyyy\" show-button-bar=\"false\">\n" +
    "\n" +
    "        <span class=\"input-group-btn\">\n" +
    "          <button type=\"button\" class=\"btn btn-sm btn-default\" ng-click=\"$modal.open = !$modal.open\">\n" +
    "            <i class=\"glyphicon glyphicon-calendar\"></i>\n" +
    "          </button>\n" +
    "        </span>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button class=\"btn btn-responsive btn-default\" type=\"button\" ng-click=\"$dismiss()\" translate>cancel</button>\n" +
    "  <button class=\"btn btn-responsive btn-primary\" type=\"button\" ng-disabled=\"!$modal.item.action || !$modal.item.changedOn\"\n" +
    "    ng-click=\"$close($modal.item)\" translate>ok</button>\n" +
    "</div>");
}]);

angular.module("access/components/entity-list/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("access/components/entity-list/component.html",
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
    "  <div class=\"row\">\n" +
    "    <div class=\"col-xs-12\">\n" +
    "      <a ng-href=\"#{{$ctrl.entityBaseUrl}}/new\" class=\"btn btn-info\" ng-if=\"$ctrl.canAdd\">\n" +
    "        <i class=\"fa fa-plus\"></i>\n" +
    "        <span>{{$ctrl.addButtonCaption | translate}}</span>\n" +
    "      </a>\n" +
    "\n" +
    "      <span ng-bind-html=\"config.newRequestButtonHelpText\" ng-if=\"$ctrl.canAdd\"></span>\n" +
    "\n" +
    "      <span class=\"pull-right\" ng-if=\"$ctrl.requests.length > 0 && !$ctrl.parentId\">\n" +
    "        <a target=\"_self\" download class=\"btn btn-info\" ng-href=\"{{$ctrl.getCsvExportHref()}}\">\n" +
    "          <i class=\"fa fa-download\"></i> {{'report' | translate}}\n" +
    "        </a>\n" +
    "\n" +
    "        <a target=\"_self\" download class=\"btn btn-info\" ng-href=\"{{$ctrl.getHistoryExportHref()}}\">\n" +
    "          <i class=\"fa fa-download\"></i> {{'history' | translate}}\n" +
    "        </a>\n" +
    "      </span>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <p class=\"help-block\">\n" +
    "    <span ng-if=\"!$ctrl.canAdd\" translate>data-access-amendment.cannot-add</span>\n" +
    "    <span ng-if=\"$ctrl.canAdd && $ctrl.requests.length == 0 && !loading\">{{$ctrl.noneCaption | translate}}</span>\n" +
    "  </p>\n" +
    "\n" +
    "  <p ng-if=\"$ctrl.loading\" class=\"voffset2 loading\">\n" +
    "  </p>\n" +
    "\n" +
    "  <div ng-if=\"$ctrl.requests.length > 0\">\n" +
    "    <div class=\"row voffset2\">\n" +
    "      <div class=\"col-xs-4\">\n" +
    "        <span class=\"input-group input-group-sm no-padding-top\">\n" +
    "          <span class=\"input-group-addon\" id=\"data-access-requests-search\">\n" +
    "            <i class=\"glyphicon glyphicon-search\"></i>\n" +
    "          </span>\n" +
    "          <input ng-model=\"$ctrl.searchText\" type=\"text\" class=\"form-control\" aria-describedby=\"data-access-requests-search\">\n" +
    "        </span>\n" +
    "      </div>\n" +
    "      <div class=\"col-xs-2\">\n" +
    "        <ui-select id=\"status-select\" theme=\"bootstrap\" ng-model=\"$ctrl.searchStatus.filter\" reset-search-input=\"true\">\n" +
    "          <ui-select-match allow-clear=\"true\" placeholder=\"{{'data-access-request.status-placeholder' | translate}}\">\n" +
    "            <span ng-bind-html=\"$select.selected.translation\"></span>\n" +
    "          </ui-select-match>\n" +
    "          <ui-select-choices repeat=\"data in $ctrl.REQUEST_STATUS\">\n" +
    "            {{data.translation}}\n" +
    "          </ui-select-choices>\n" +
    "        </ui-select>\n" +
    "      </div>\n" +
    "      <div class=\"col-xs-6\">\n" +
    "        <dir-pagination-controls class=\"pull-right\"></dir-pagination-controls>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"table-responsive\">\n" +
    "      <table class=\"table table-bordered table-striped\" obiba-table-sorter=\"$ctrl.requests\" data-column-name=\"lastUpdate\" data-order=\"down\">\n" +
    "        <thead>\n" +
    "          <tr>\n" +
    "            <th data-column-name=\"id\">ID</th>\n" +
    "            <th ng-if=\"$ctrl.showApplicant\" data-column-name=\"applicant\">{{\"data-access-request.applicant\" | translate}}</th>\n" +
    "            <th data-column-name=\"title\">{{\"title\" | translate}}</th>\n" +
    "            <th data-column-name=\"lastUpdate\">{{\"data-access-request.lastUpdate\" | translate}}</th>\n" +
    "            <th data-column-name=\"submissionDate\">{{\"data-access-request.submissionDate\" | translate}}</th>\n" +
    "            <th data-column-name=\"status\">{{\"data-access-request.status\" | translate}}</th>\n" +
    "            <th data-column-name=\"amendmentsSummary.pending\" ng-if=\"!$ctrl.parentId\">{{\"data-access-request.pending-amendments\" | translate}}</th>\n" +
    "            <th data-column-name=\"amendmentsSummary.total\" ng-if=\"!$ctrl.parentId\">{{\"data-access-request.total-amendments\" | translate}}</th>\n" +
    "            <th translate>actions</th>\n" +
    "          </tr>\n" +
    "        </thead>\n" +
    "        <tbody>\n" +
    "          <tr dir-paginate=\"request in $ctrl.requests | filter:{status: $ctrl.searchStatus.filter.key} : true | filter:$ctrl.searchText | itemsPerPage: 20\">\n" +
    "            <td>\n" +
    "              <a ng-href=\"#{{$ctrl.entityBaseUrl}}/{{request.id}}\" ng-if=\"$ctrl.actions.canView(request)\" translate>{{request.id}}</a>\n" +
    "              <span ng-if=\"!$ctrl.actions.canView(request)\">{{request.id}}</span>\n" +
    "            </td>\n" +
    "            <td ng-if=\"$ctrl.showApplicant\">\n" +
    "              <span ng-if=\"!request.profile.attributes\">\n" +
    "                {{request.applicant}}\n" +
    "              </span>\n" +
    "              <span ng-if=\"request.profile.attributes && $ctrl.actions.canViewProfile('mica-user') && !$ctrl.actions.canViewProfile('mica-data-access-officer')\">\n" +
    "                {{$ctrl.UserProfileService.getFullName(request.profile) || request.applicant}}\n" +
    "              </span>\n" +
    "              <a href ng-click=\"$ctrl.UserProfileModalService.show(request.profile)\" ng-if=\"request.profile.attributes && $ctrl.actions.canViewProfile('mica-data-access-officer')\">\n" +
    "                {{$ctrl.UserProfileService.getFullName(request.profile) || request.applicant}}\n" +
    "              </a>\n" +
    "            </td>\n" +
    "            <td>\n" +
    "              {{request.title}}\n" +
    "            </td>\n" +
    "            <td>\n" +
    "              <span title=\"{{(request.lastUpdate || request.timestamps.created) | amDateFormat: 'lll'}}\">\n" +
    "                {{(request.lastUpdate || request.timestamps.created) | amCalendar}}\n" +
    "              </span>\n" +
    "\n" +
    "            </td>\n" +
    "            <td>\n" +
    "              <span ng-if=\"request.submissionDate\" title=\"{{ request.submissionDate | amDateFormat: 'lll' }}\">\n" +
    "                {{request.submissionDate | amCalendar}}\n" +
    "              </span>\n" +
    "            </td>\n" +
    "            <td>\n" +
    "              {{request.status | translate}}\n" +
    "            </td>\n" +
    "            <td ng-if=\"!$ctrl.parentId\">\n" +
    "              <span ng-if=\"request.amendmentsSummary\">\n" +
    "                {{request.amendmentsSummary.pending}}\n" +
    "              </span>\n" +
    "              <span ng-if=\"!request.amendmentsSummary\"></span>\n" +
    "            </td>\n" +
    "            <td ng-if=\"!$ctrl.parentId\">\n" +
    "              <span ng-if=\"request.amendmentsSummary\">\n" +
    "                {{request.amendmentsSummary.total}}\n" +
    "              </span>\n" +
    "              <span ng-if=\"!request.amendmentsSummary\"></span>\n" +
    "            </td>\n" +
    "            <td>\n" +
    "              <ul class=\"list-inline\">\n" +
    "                <li ng-if=\"$ctrl.actions.canEdit(request)\">\n" +
    "                  <a ng-href=\"#{{$ctrl.entityBaseUrl}}/{{request.id}}/edit\" title=\"{{'edit' | translate}}\">\n" +
    "                    <i class=\"fa fa-pencil\"></i>\n" +
    "                  </a>\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                  <a ng-if=\"$ctrl.actions.canDelete(request)\" ng-click=\"$ctrl.deleteRequest(request)\" title=\"{{'delete' | translate}}\">\n" +
    "                    <i class=\"fa fa-trash-o\"></i>\n" +
    "                  </a>\n" +
    "                </li>\n" +
    "              </ul>\n" +
    "            </td>\n" +
    "          </tr>\n" +
    "        </tbody>\n" +
    "      </table>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("access/components/print-friendly-view/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("access/components/print-friendly-view/component.html",
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
    "  <div class=\"clearfix\"></div>\n" +
    "  <div class=\"voffset2\" ng-if=\"$ctrl.project && $ctrl.project.permissions && $ctrl.project.permissions.view\">\n" +
    "    <div ng-if=\"$ctrl.project\" class=\"pull-right\">\n" +
    "      <small class=\"help-block inline\"> {{'research-project.label' | translate}} :\n" +
    "        <a route-checker route-checker-hides-parent=\"true\" href ng-href=\"#/project/{{$ctrl.project.id}}\">{{$ctrl.project.id}}</a>\n" +
    "      </small>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div>\n" +
    "    <form id=\"request-form\" name=\"forms.requestForm\">\n" +
    "      <obiba-schema-form-renderer model=\"$ctrl.model\" schema-form=\"$ctrl.accessForm\" read-only=\"true\"></obiba-schema-form-renderer>\n" +
    "    </form>\n" +
    "  </div>\n" +
    "\n" +
    "  <div ng-if=\"$ctrl.lastSubmittedDate\">\n" +
    "    <h3 translate>data-access-request.submissionDate</h3>\n" +
    "    <p>{{$ctrl.lastSubmittedDate.changedOn | amDateFormat:'dddd, MMMM Do YYYY' | capitalizeFirstLetter}}</p>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("access/components/reports-progressbar/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("access/components/reports-progressbar/component.html",
    "<timeline steps=\"$ctrl.steps\" ng-if=\"$ctrl.isVisible()\"></timeline>");
}]);

angular.module("access/components/reports-progressbar/edit-start-date-modal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("access/components/reports-progressbar/edit-start-date-modal.html",
    "<div class=\"modal-header\">\n" +
    "  <h4 class=\"modal-title\">\n" +
    "    {{'start-date' | translate}}\n" +
    "  </h4>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal-body\">\n" +
    "  <form name=\"startDateModalForm\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <div class=\"input-group\">\n" +
    "        <input type=\"text\" class=\"form-control\" uib-datepicker-popup=\"yyyy-MM-dd\" ng-model=\"$modal.startDate\" ng-required=\"true\"\n" +
    "          ng-focus=\"$modal.open = !$modal.startDate\" is-open=\"$modal.open\" placeholder=\"yyyy-MM-dd\" show-button-bar=\"false\">\n" +
    "        <span class=\"input-group-btn\">\n" +
    "          <button type=\"button\" class=\"btn btn-sm btn-default\" ng-click=\"$modal.open = !$modal.open\">\n" +
    "            <i class=\"glyphicon glyphicon-calendar\"></i>\n" +
    "          </button>\n" +
    "        </span>\n" +
    "      </div>\n" +
    "      <p class=\"help-block\">{{'data-access-request.start-date-help' | translate}}</p>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button class=\"btn btn-responsive btn-default\" type=\"button\" ng-click=\"$dismiss()\" translate>cancel</button>\n" +
    "  <button class=\"btn btn-responsive btn-primary\" type=\"button\" ng-disabled=\"!$modal.valideDate()\"\n" +
    "    ng-click=\"$modal.close()\" translate>ok</button>\n" +
    "</div>");
}]);

angular.module("access/components/status-progressbar/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("access/components/status-progressbar/component.html",
    "<timeline steps=\"$ctrl.steps\" ng-if=\"$ctrl.isVisible()\"></timeline>");
}]);

angular.module("access/components/timeline/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("access/components/timeline/component.html",
    "<ol class=\"timeline\">\n" +
    "    <li class=\"timeline__step\" ng-class=\"{ 'done': $ctrl.isDone(step) }\" ng-style=\"{'width': $ctrl.stepWidth + '%'}\" ng-repeat=\"step in $ctrl.steps\">\n" +
    "        <label class=\"timeline__step-label\" ng-if=\"$ctrl.getContent(step)\">\n" +
    "            <span class=\"timeline__step-content\">{{$ctrl.getContent(step) | translate}}</span>\n" +
    "        </label>\n" +
    "        <span class=\"timeline__step-title\">{{step.title | translate}}</span>\n" +
    "        <i class=\"timeline__step-marker\">{{step.marker | translate}}</i>\n" +
    "    </li>\n" +
    "</ol>\n" +
    "");
}]);

angular.module("access/views/data-access-amendment-view.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("access/views/data-access-amendment-view.html",
    "<div>\n" +
    "  <print-friendly-view class=\"visible-print\" valid-form=\"true\" model=\"model\" access-form=\"dataAccessForm\" last-submitted-date=\"lastSubmittedDate\">\n" +
    "  </print-friendly-view>\n" +
    "\n" +
    "  <div class=\"hidden-print\">\n" +
    "    <div ng-if=\"headerTemplateUrl\" ng-include=\"headerTemplateUrl\"></div>\n" +
    "\n" +
    "    <obiba-alert id=\"DataAccessAmendmentViewController\"></obiba-alert>\n" +
    "\n" +
    "    <p class=\"help-block pull-left\" ng-if=\"requestEntity.applicant\">\n" +
    "      <span translate>created-by</span>\n" +
    "      <span ng-if=\"!actions.canViewProfile('mica-data-access-officer')\">\n" +
    "        {{getFullName(requestEntity.profile) || requestEntity.applicant}},\n" +
    "      </span>\n" +
    "      <span ng-if=\"actions.canViewProfile('mica-data-access-officer')\">\n" +
    "        <a href ng-click=\"userProfile(requestEntity.profile)\">\n" +
    "          {{getFullName(requestEntity.profile) || requestEntity.applicant}}</a>,\n" +
    "      </span>\n" +
    "      <span title=\"{{requestEntity.timestamps.created | amDateFormat: 'lll'}}\">{{requestEntity.timestamps.created | amCalendar}}</span>\n" +
    "      <span class=\"label label-primary hoffset1\">{{requestEntity.status | translate}}</span>\n" +
    "    </p>\n" +
    "\n" +
    "    <div class=\"pull-right\" ng-if=\"read && formDrawn\">\n" +
    "      <a ng-click=\"submit()\" ng-if=\"actions.canEditStatus(requestEntity) && nextStatus.canSubmit(requestEntity)\" class=\"btn btn-info\"\n" +
    "        translate>submit</a>\n" +
    "\n" +
    "      <a ng-click=\"reopen()\" ng-if=\"actions.canEditStatus(requestEntity) && nextStatus.canReopen(requestEntity)\" class=\"btn btn-info\"\n" +
    "        translate>reopen</a>\n" +
    "\n" +
    "      <a ng-click=\"review()\" ng-if=\"actions.canEditStatus(requestEntity) && nextStatus.canReview(requestEntity)\" class=\"btn btn-info\"\n" +
    "        translate>review</a>\n" +
    "\n" +
    "      <a ng-click=\"conditionallyApprove()\" ng-if=\"actions.canEditStatus(requestEntity) && nextStatus.canConditionallyApprove(requestEntity)\"\n" +
    "        class=\"btn btn-info\" translate>conditionallyApprove</a>\n" +
    "\n" +
    "      <a ng-click=\"approve()\" ng-if=\"actions.canEditStatus(requestEntity) && nextStatus.canApprove(requestEntity)\" class=\"btn btn-info\"\n" +
    "        translate>approve</a>\n" +
    "\n" +
    "      <a ng-click=\"reject()\" ng-if=\"actions.canEditStatus(requestEntity) && nextStatus.canReject(requestEntity)\" class=\"btn btn-info\"\n" +
    "        translate>reject</a>\n" +
    "\n" +
    "      <a ng-href=\"#{{entityUrl}}/edit\" ng-if=\"actions.canEdit(requestEntity)\" class=\"btn btn-primary\" title=\"{{'edit' | translate}}\">\n" +
    "        <i class=\"fa fa-pencil-square-o\"></i>\n" +
    "      </a>\n" +
    "\n" +
    "      <a ng-click=\"printForm()\" class=\"btn btn-default\" title=\"{{'global.print' | translate}}\">\n" +
    "        <i class=\"fa fa-print\"></i>\n" +
    "        <span translate>global.print</span>\n" +
    "      </a>\n" +
    "\n" +
    "      <a ng-click=\"delete()\" ng-if=\"actions.canDelete(requestEntity)\" class=\"btn btn-danger\" title=\"{{'delete' | translate}}\">\n" +
    "        <i class=\"fa fa-trash-o\"></i>\n" +
    "      </a>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"clearfix\"></div>\n" +
    "\n" +
    "    <status-progressbar status=\"requestEntity.status\" config=\"dataAccessForm\"></status-progressbar>\n" +
    "\n" +
    "    <form id=\"request-form\" name=\"forms.requestForm\">\n" +
    "      <div class=\"pull-right\" ng-if=\"!read && formDrawn\">\n" +
    "        <a ng-click=\"cancel()\" type=\"button\" class=\"btn btn-default\">\n" +
    "          <span translate>cancel</span>\n" +
    "        </a>\n" +
    "\n" +
    "        <a ng-click=\"save()\" type=\"button\" class=\"btn btn-primary\">\n" +
    "          <span translate>save</span>\n" +
    "        </a>\n" +
    "\n" +
    "        <a ng-click=\"validate(forms.requestForm)\" type=\"button\" class=\"btn btn-info\">\n" +
    "          <span translate>validate</span>\n" +
    "        </a>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"clearfix\"></div>\n" +
    "\n" +
    "      <obiba-schema-form-renderer model=\"model\" schema-form=\"dataAccessForm\" read-only=\"read\" on-redraw=\"toggleFormDrawnStatus\"></obiba-schema-form-renderer>\n" +
    "\n" +
    "      <div class=\"clearfix\"></div>\n" +
    "\n" +
    "      <div class=\"pull-right\" ng-if=\"!read && formDrawn\">\n" +
    "        <a ng-click=\"cancel()\" type=\"button\" class=\"btn btn-default\">\n" +
    "          <span translate>cancel</span>\n" +
    "        </a>\n" +
    "\n" +
    "        <a ng-click=\"save()\" type=\"button\" class=\"btn btn-primary\">\n" +
    "          <span translate>save</span>\n" +
    "        </a>\n" +
    "\n" +
    "        <a ng-click=\"validate(forms.requestForm)\" type=\"button\" class=\"btn btn-info\">\n" +
    "          <span translate>validate</span>\n" +
    "        </a>\n" +
    "      </div>\n" +
    "    </form>\n" +
    "  </div>\n" +
    "</div>");
}]);

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
    "        <attachment-input files=\"attachments\" multiple=\"true\" on-error=\"onAttachmentError\" delete-attachments=\"actions.canDeleteAttachments(dataAccessRequest)\"></attachment-input>\n" +
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
    "      <attachment-list files=\"dataAccessRequest.attachments\" href-builder=\"getDownloadHref\"></attachment-list>\n" +
    "      <a ng-if=\"actions.canEditAttachments(dataAccessRequest)\" ng-click=\"editAttachments()\" type=\"button\" class=\"btn btn-info\">\n" +
    "        <span>{{actions.canDeleteAttachments(dataAccessRequest) ? 'data-access-request.edit-documents' : 'data-access-request.add-documents' | translate}}</span>\n" +
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
    "      <obiba-schema-form-renderer model=\"sfForm.model\" schema-form=\"sfForm\" read-only=\"false\"></obiba-schema-form-renderer>\n" +
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
    "<div ng-if=\"actions.canEditActionLogs(dataAccessRequest)\">\n" +
    "  <action-log-editor source-collection=\"dataAccessRequest.actionLogHistory\" predefined-actions=\"dataAccessForm.predefinedActions\"\n" +
    "    update=\"updateActionLogs(logs)\"></action-log-editor>\n" +
    "</div>\n" +
    "<div class=\"table-responsive\">\n" +
    "  <table id=\"data-access-request-history\" class=\"table table-bordered table-striped\" obiba-table-sorter=\"logsHistory\">\n" +
    "    <thead>\n" +
    "      <tr>\n" +
    "        <th class=\"status-icon\"></th>\n" +
    "        <th translate>status</th>\n" +
    "        <th translate>changed-by</th>\n" +
    "        <th data-column-name=\"changedOn\" translate>changed-on</th>\n" +
    "        <th class=\"col-xs-1\" ng-if=\"actions.canEditActionLogs(dataAccessRequest)\" translate>actions</th>\n" +
    "      </tr>\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "      <tr ng-repeat=\"log in logsHistory track by $index\">\n" +
    "        <td>\n" +
    "          <span>\n" +
    "            <i class=\"{{log.icon}} hoffset\"></i>\n" +
    "          </span>\n" +
    "        </td>\n" +
    "        <td>\n" +
    "          <span ng-if=\"log.reference\">{{'data-access-amendment.title' | translate}}\n" +
    "            <a ng-href=\"#{{'/data-access-request/' + dataAccessRequest.id + '/amendment/' + log.reference}}\">{{log.reference}}</a>\n" +
    "          </span>\n" +
    "          {{log.msg | translate}}\n" +
    "        </td>\n" +
    "        <td>{{UserProfileService.getFullName(log.profile) || log.author}}</td>\n" +
    "        <td>\n" +
    "          <span title=\"{{log.changedOn | amDateFormat: 'lll'}}\">\n" +
    "            {{log.changedOn | amCalendar}}\n" +
    "          </span>\n" +
    "        </td>\n" +
    "        <td ng-if=\"actions.canEditActionLogs(dataAccessRequest)\">\n" +
    "          <span ng-if=\"!loading\">\n" +
    "            <action-log-item-editor item=\"log\" source-collection=\"dataAccessRequest.actionLogHistory\" predefined-actions=\"dataAccessForm.predefinedActions\"\n" +
    "              update=\"updateActionLogs(logs)\"></action-log-item-editor>\n" +
    "          </span>\n" +
    "          \n" +
    "          <span class=\"loading\" ng-if=\"loading\"></span>\n" +
    "        </td>\n" +
    "      </tr>\n" +
    "    </tbody>\n" +
    "  </table>\n" +
    "</div>");
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
    "  <entity-list parent-id=\"null\" can-add=\"true\"></entity-list>\n" +
    "\n" +
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
    "    <button type=\"button\" class=\"close\" aria-hidden=\"true\" ng-click=\"$close('OK')\">&times;</button>\n" +
    "    <h4 class=\"modal-title\">\n" +
    "      <i class=\"fa fa-check fa-lg\"></i>\n" +
    "      {{'data-access-request.submit-confirmation.title' | translate}}\n" +
    "    </h4>\n" +
    "  </div>\n" +
    "  <div class=\"modal-body\">\n" +
    "    <p>{{'data-access-request.submit-confirmation.message' | translate}}</p>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <button type=\"button\" class=\"btn btn-primary voffest4\" ng-click=\"$close('OK')\">\n" +
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
    "  <!--<div class=\"visible-print\" print-friendly-view></div>-->\n" +
    "  <print-friendly-view\n" +
    "    class=\"visible-print\"\n" +
    "    project=\"dataAccessRequest.project\"\n" +
    "    valid-form=\"validForm\"\n" +
    "    model=\"form.model\"\n" +
    "    access-form=\"dataAccessForm\"\n" +
    "    last-submitted-date=\"lastSubmittedDate\">\n" +
    "  </print-friendly-view>\n" +
    "  <div class=\"hidden-print\">\n" +
    "    <div ng-if=\"headerTemplateUrl\" ng-include=\"headerTemplateUrl\"></div>\n" +
    "\n" +
    "    <obiba-alert id=\"DataAccessRequestViewController\"></obiba-alert>\n" +
    "\n" +
    "    <div ng-if=\"validForm\">\n" +
    "\n" +
    "      <p class=\"help-block pull-left\"><span translate>created-by</span>\n" +
    "        <span ng-if=\"!actions.canViewProfile('mica-data-access-officer')\">\n" +
    "           {{getFullName(dataAccessRequest.profile) || dataAccessRequest.applicant}},\n" +
    "        </span>\n" +
    "        <span ng-if=\"actions.canViewProfile('mica-data-access-officer')\">\n" +
    "          <a href ng-click=\"userProfile(dataAccessRequest.profile)\">\n" +
    "            {{getFullName(dataAccessRequest.profile) || dataAccessRequest.applicant}}</a>,\n" +
    "        </span>\n" +
    "        <span title=\"{{dataAccessRequest.timestamps.created | amDateFormat: 'lll'}}\">{{dataAccessRequest.timestamps.created | amCalendar}}</span>\n" +
    "        <span class=\"label label-primary hoffset1\">{{dataAccessRequest.status | translate}}</span>\n" +
    "      </p>\n" +
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
    "        <a ng-click=\"editStartDate()\"\n" +
    "          ng-if=\"dataAccessRequest.reportsTimeline && actions.canEditStartDate(dataAccessRequest)\"\n" +
    "          class=\"btn btn-primary\">\n" +
    "          <i class=\"fa fa-clock-o\"></i>\n" +
    "          <span>{{'start-date' | translate}}</span>\n" +
    "        </a>\n" +
    "        <a ng-href=\"#/data-access-request/{{dataAccessRequest.id}}/edit\"\n" +
    "          ng-if=\"actions.canEdit(dataAccessRequest)\"\n" +
    "          class=\"btn btn-primary\" title=\"{{'edit' | translate}}\">\n" +
    "          <i class=\"fa fa-pencil-square-o\"></i>\n" +
    "        </a>\n" +
    "        <span ng-if=\"tabs.activeTab === TAB_NAMES.form\">\n" +
    "          <a ng-if=\"dataAccessForm.downloadTemplate === false\" ng-click=\"printForm()\"\n" +
    "           class=\"btn btn-default\" title=\"{{'global.print' | translate}}\">\n" +
    "            <i class=\"fa fa-print\"></i> <span translate>global.print</span>\n" +
    "          </a>\n" +
    "          <a ng-if=\"dataAccessForm.downloadTemplate === true\" target=\"_self\" href=\"{{requestDownloadUrl}}\" class=\"btn btn-default\">\n" +
    "            <i class=\"fa fa-download\"></i> <span>{{config.downloadButtonCaption || 'download' | translate}}</span>\n" +
    "          </a>\n" +
    "        </span>\n" +
    "        <a ng-click=\"delete()\"\n" +
    "          ng-if=\"actions.canDelete(dataAccessRequest)\"\n" +
    "          class=\"btn btn-danger\" title=\"{{'delete' | translate}}\">\n" +
    "          <i class=\"fa fa-trash-o\"></i>\n" +
    "        </a>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"clearfix\"></div>\n" +
    "\n" +
    "      <status-progressbar status=\"dataAccessRequest.status\" history=\"dataAccessRequest.statusChangeHistory\" config=\"dataAccessForm\"></status-progressbar>\n" +
    "\n" +
    "      <reports-progressbar timeline=\"dataAccessRequest.reportsTimeline\"></reports-progressbar>\n" +
    "\n" +
    "      <div class=\"voffset2\" ng-if=\"dataAccessRequest.project.permissions && dataAccessRequest.project.permissions.view\">\n" +
    "        <div ng-if=\"dataAccessRequest.project\" class=\"pull-right\">\n" +
    "          <small class=\"help-block inline\"> {{'research-project.label' | translate}} :\n" +
    "            <a route-checker route-checker-hides-parent=\"true\" href ng-href=\"#/project/{{dataAccessRequest.project.id}}\">{{dataAccessRequest.project.id}}</a>\n" +
    "          </small>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <uib-tabset active=\"tabs.activeTab\" class=\"voffset5\">\n" +
    "        <!--Form-->\n" +
    "        <uib-tab index=\"0\" select=\"selectTab(TAB_NAMES.form)\" heading=\"{{'data-access-request.form' | translate}}\">\n" +
    "          <form id=\"request-form\" name=\"forms.requestForm\">\n" +
    "            <obiba-schema-form-renderer model=\"form.model\" schema-form=\"dataAccessForm\" read-only=\"true\"></obiba-schema-form-renderer>\n" +
    "          </form>\n" +
    "        </uib-tab>\n" +
    "        <!--Amendments-->\n" +
    "        <uib-tab ng-if=\"dataAccessForm.amendmentsEnabled\" index=\"1\" select=\"selectTab(TAB_NAMES.amendments)\">\n" +
    "          <uib-tab-heading>\n" +
    "            {{'data-access-amendments' | translate}}\n" +
    "          </uib-tab-heading>\n" +
    "\n" +
    "          <div ng-show=\"parentId\" class=\"voffset1\">\n" +
    "            <entity-list parent-id=\"parentId\" can-add=\"actions.canAddAmendments(dataAccessRequest)\"></entity-list>\n" +
    "          </div>\n" +
    "        </uib-tab>\n" +
    "        <!--Documents-->\n" +
    "        <uib-tab index=\"2\" select=\"selectTab(TAB_NAMES.documents)\">\n" +
    "          <uib-tab-heading>\n" +
    "            {{config.documentsSectionTitle || 'data-access-request.documents' | translate}}\n" +
    "            <span class=\"badge hoffset1\" ng-show=\"dataAccessRequest.attachments\"><small>{{dataAccessRequest.attachments.length}}</small></span>\n" +
    "          </uib-tab-heading>\n" +
    "          <div ng-include=\"'access/views/data-access-request-documents-view.html'\"></div>\n" +
    "        </uib-tab>\n" +
    "        <!--Comments-->\n" +
    "        <uib-tab index=\"3\"\n" +
    "                 ng-if=\"config.commentsEnabled\"\n" +
    "                 select=\"selectTab(TAB_NAMES.comments)\"\n" +
    "                 heading=\"{{'data-access-request.comments' | translate}}\">\n" +
    "          <obiba-comments class=\"voffset2\" comments=\"form.comments\"\n" +
    "                          on-update=\"updateComment\" on-delete=\"deleteComment\"\n" +
    "                          name-resolver=\"getFullName(profile)\"\n" +
    "                          edit-action=\"EDIT\" delete-action=\"DELETE\"></obiba-comments>\n" +
    "          <obiba-comment-editor on-submit=\"submitComment\"></obiba-comment-editor>\n" +
    "        </uib-tab>\n" +
    "        <uib-tab index=\"4\"\n" +
    "                 ng-if=\"config.commentsEnabled && actions.canViewPrivateComments(dataAccessRequest)\"\n" +
    "                 select=\"selectTab(TAB_NAMES.privateComments)\"\n" +
    "                 heading=\"{{'data-access-request.private-comments' | translate}}\">\n" +
    "          <obiba-comments class=\"voffset2\" comments=\"form.comments\"\n" +
    "                          on-update=\"updateComment\" on-delete=\"deleteComment\"\n" +
    "                          name-resolver=\"getFullName(profile)\"\n" +
    "                          edit-action=\"EDIT\" delete-action=\"DELETE\"></obiba-comments>\n" +
    "          <obiba-comment-editor on-submit=\"submitComment\"></obiba-comment-editor>\n" +
    "        </uib-tab>\n" +
    "        <!--History-->\n" +
    "        <uib-tab index=\"5\" select=\"selectTab(TAB_NAMES.history)\" heading=\"{{'data-access-request.history' | translate}}\">\n" +
    "          <div ng-include=\"'access/views/data-access-request-history-view.html'\"></div>\n" +
    "        </uib-tab>\n" +
    "      </uib-tabset>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("analysis/components/crosstab-study-table/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("analysis/components/crosstab-study-table/component.html",
    "<!--\n" +
    "  ~ Copyright (c) 2015 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<span title=\"{{$ctrl.contingency.info.population ? $ctrl.contingency.info.population + ':' + $ctrl.contingency.info.dce : ''}}\">\n" +
    "  <span ng-if=\"$ctrl.contingency.studyTable\">\n" +
    "    <a ng-href=\"{{$ctrl.studyLink}}\">{{$ctrl.contingency.info.summary}}</a>\n" +
    "    <span>{{$ctrl.contingency.info.tableName}}</span>\n" +
    "  </span>\n" +
    "</span>");
}]);

angular.module("analysis/components/entities-count-result-table/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("analysis/components/entities-count-result-table/component.html",
    "<div>\n" +
    "  <p class=\"help-block\" ng-if=\"$ctrl.result && $ctrl.result.query && (!$ctrl.result.counts || $ctrl.result.counts.length === 0)\" translate>search.no-results</p>\n" +
    "  <table class=\"table table-bordered table-striped\" ng-if=\"$ctrl.result && $ctrl.result.counts && $ctrl.result.counts.length>0\">\n" +
    "    <thead>\n" +
    "      <th ng-if=\"$ctrl.showStudyColumn()\" translate>taxonomy.target.study</th>\n" +
    "      <th translate>taxonomy.target.variable</th>\n" +
    "      <th translate>taxonomy.target.dataset</th>\n" +
    "      <th style=\"width: 400px\" translate>analysis.criteria</th>\n" +
    "      <th style=\"width: 100px\" translate>analysis.count</th>\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "        <tr ng-repeat=\"row in $ctrl.table.rows\">\n" +
    "          <td ng-if=\"row[0].rowspan>0 && $ctrl.showStudyColumn()\" colspan=\"{{row[0].colspan}}\" rowspan=\"{{row[0].rowspan}}\" title=\"{{row[0].title}}\">\n" +
    "            <a href=\"{{row[0].link}}\">{{row[0].value}}</a>\n" +
    "          </td>\n" +
    "          \n" +
    "          <!-- per variable criteria -->\n" +
    "          <td ng-if=\"row.length===5\" colspan=\"{{row[1].colspan}}\">\n" +
    "              <a href=\"{{row[1].link}}\">{{row[1].value}}</a>\n" +
    "              <div class=\"help-block\">{{row[1].title}}</div>\n" +
    "          </td>\n" +
    "          <td ng-if=\"row.length===5\" colspan=\"{{row[2].colspan}}\" title=\"{{row[2].title}}\">\n" +
    "              <a href=\"{{row[2].link}}\">{{row[2].value}}</a>\n" +
    "          </td>\n" +
    "          <td ng-if=\"row.length===5\" colspan=\"{{row[3].colspan}}\">\n" +
    "            <variable-criteria query=\"row[3].value\"></variable-criteria>  \n" +
    "          </td>\n" +
    "          <td ng-if=\"row.length===5\" colspan=\"{{row[4].colspan}}\">\n" +
    "            {{row[4].value}}\n" +
    "          </td>\n" +
    "\n" +
    "          <!-- all criteria -->\n" +
    "          <td ng-if=\"row.length===3\" colspan=\"{{row[1].colspan}}\" title=\"{{row[1].title}}\">\n" +
    "            <b translate>analysis.all-criteria</b>\n" +
    "          </td>\n" +
    "          <td ng-if=\"row.length===3\" colspan=\"{{row[2].colspan}}\">\n" +
    "            <span ng-if=\"$ctrl.studyCount === 1\" class=\"badge\">{{$ctrl.localizedTotal}}</span>\n" +
    "            <b ng-if=\"$ctrl.studyCount > 1\">{{row[2].value}}</b>\n" +
    "          </td>\n" +
    "        </tr>\n" +
    "        <tr ng-if=\"$ctrl.studyCount > 1\">\n" +
    "          <td colspan=\"{{$ctrl.showStudyColumn() ? 4 : 3}}\">\n" +
    "            <b translate>total</b>\n" +
    "          </td>\n" +
    "          <td>\n" +
    "            <span class=\"badge\">{{$ctrl.localizedTotal}}</span>\n" +
    "          </td>\n" +
    "        </tr>\n" +
    "    </tbody>\n" +
    "  </table>\n" +
    "</div>");
}]);

angular.module("analysis/components/variable-criteria/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("analysis/components/variable-criteria/component.html",
    "<div>\n" +
    "  <p ng-if=\"$ctrl.loading\" class=\"voffset2 loading\"></p>\n" +
    "  \n" +
    "  <div  ng-hide=\"$ctrl.loading\" class=\"btn-group voffset1 btn-variable\" ng-class=\"{open: $ctrl.state.open}\" ng-keyup=\"$ctrl.onKeyup($event)\">\n" +
    "\n" +
    "    <button class=\"btn btn-xs dropdown btn-variable\" ng-click=\"$ctrl.openDropdown()\">\n" +
    "      <span title=\"{{$ctrl.getQueryTitle(false)}}\" test-ref=\"search-criterion\">\n" +
    "        {{$ctrl.getQueryTitle(true)}}\n" +
    "      </span>\n" +
    "      <span class=\"fa fa-caret-down\"></span>\n" +
    "    </button>\n" +
    "    <button class=\"btn btn-xs btn-default\" ng-click=\"$ctrl.onRemove()\">\n" +
    "      <span class=\"fa fa-times\"></span>\n" +
    "    </button>\n" +
    "\n" +
    "    <ul class=\"dropdown-menu query-dropdown-menu\" aria-labelledby=\"\">\n" +
    "        <li class=\"criteria-list-item\">\n" +
    "          <span>{{$ctrl.variable.name}}</span>\n" +
    "          <span class=\"pull-right\" title=\"{{'search.close-and-search' | translate}}\" ng-click=\"$ctrl.closeDropdown()\"><i class=\"fa fa-check\"></i></span>\n" +
    "        </li>\n" +
    "        <li class='divider'></li>\n" +
    "        <li class=\"criteria-list-item\">\n" +
    "          <label title=\"{{'analysis.all-help' | translate}}\">\n" +
    "            <input ng-click=\"$ctrl.onUpdateOperation()\" type=\"radio\" ng-model=\"$ctrl.selectedOperation\" value=\"all\">\n" +
    "              {{'analysis.all' | translate}}\n" +
    "          </label>\n" +
    "          <div class=\"pull-right\">\n" +
    "            <span class=\"agg-term-count\">{{$ctrl.localizeNumber($ctrl.allFrequency)}}</span>\n" +
    "          </div>\n" +
    "        </li>\n" +
    "        <li class=\"criteria-list-item\">\n" +
    "          <label title=\"{{'analysis.exists-help' | translate}}\">\n" +
    "            <input ng-click=\"$ctrl.onUpdateOperation()\" type=\"radio\" ng-model=\"$ctrl.selectedOperation\" value=\"exists\">\n" +
    "              {{'analysis.exists' | translate}}\n" +
    "          </label>\n" +
    "          <div class=\"pull-right\">\n" +
    "            <span class=\"agg-term-count\">{{$ctrl.localizeNumber($ctrl.existsFrequency)}}</span>\n" +
    "          </div>\n" +
    "        </li>\n" +
    "        <li class=\"criteria-list-item\">\n" +
    "          <label title=\"{{'analysis.empty-help' | translate}}\">\n" +
    "            <input ng-click=\"$ctrl.onUpdateOperation()\" type=\"radio\" ng-model=\"$ctrl.selectedOperation\" value=\"empty\">\n" +
    "              {{'analysis.empty' | translate}}\n" +
    "          </label>\n" +
    "          <div class=\"pull-right\">\n" +
    "            <span class=\"agg-term-count\">{{$ctrl.localizeNumber($ctrl.emptyFrequency)}}</span>\n" +
    "          </div>\n" +
    "        </li>\n" +
    "        <li class=\"criteria-list-item\" ng-if=\"$ctrl.showInOperations()\">\n" +
    "          <label title=\"{{'analysis.in-help' | translate}}\">\n" +
    "            <input ng-click=\"$ctrl.onUpdateOperation()\" type=\"radio\" ng-model=\"$ctrl.selectedOperation\" value=\"in\">\n" +
    "              {{'analysis.in' | translate}}\n" +
    "          </label>\n" +
    "        </li>\n" +
    "        <li class=\"criteria-list-item\" ng-if=\"$ctrl.showInOperations()\">\n" +
    "          <label title=\"{{'analysis.out-help' | translate}}\">\n" +
    "            <input ng-click=\"$ctrl.onUpdateOperation()\" type=\"radio\" ng-model=\"$ctrl.selectedOperation\" value=\"out\">\n" +
    "              {{'analysis.out' | translate}}\n" +
    "          </label>\n" +
    "        <li>\n" +
    "\n" +
    "        <li class=\"divider\" ng-if=\"$ctrl.showCategoricalOptions()\"></li>\n" +
    "        <li class=\"criteria-list-item\" ng-if=\"$ctrl.showCategoricalOptions() && $ctrl.categoriesData && $ctrl.categoriesData.length>10\">\n" +
    "          <span class=\"input-group input-group-sm no-padding-top\">\n" +
    "            <input ng-model=\"$ctrl.searchText\" type=\"text\" class=\"form-control\" aria-describedby=\"category-search\" ng-keyup=\"$ctrl.onSearchTextKeyup($event)\">\n" +
    "            <span class=\"input-group-addon\" id=\"category-search\"><i class=\"fa fa-search\"></i></span>\n" +
    "          </span>\n" +
    "        </li>\n" +
    "        <li ng-if=\"$ctrl.showCategoricalOptions()\">\n" +
    "          <ul class=\"no-padding criteria-list-terms\">\n" +
    "            <li class=\"criteria-list-item\" ng-if=\"category.visible\" ng-repeat=\"category in $ctrl.categoriesData\">\n" +
    "              <label class=\"control-label\">\n" +
    "                <input \n" +
    "                  ng-model=\"$ctrl.selectedCategories[category.name]\"\n" +
    "                  type=\"checkbox\"\n" +
    "                  ng-click=\"$ctrl.updateSelection()\"/>\n" +
    "                  <span title=\"{{category.name}}\">{{category.label}}</span>\n" +
    "              </label>\n" +
    "              <div class=\"pull-right\">\n" +
    "                <span class=\"agg-term-count\">{{$ctrl.localizeNumber(category.frequency)}}</span>\n" +
    "              </div>\n" +
    "            </li>\n" +
    "          </ul>\n" +
    "        </li>\n" +
    "\n" +
    "        <li class=\"divider\" ng-if=\"$ctrl.showNumericalOptions()\"></li>\n" +
    "        <li class=\"criteria-list-item\" ng-if=\"$ctrl.showNumericalOptions()\">\n" +
    "          <select class=\"form-control input-sm form-select\" ng-model=\"$ctrl.selectedNumericalOperation\">\n" +
    "            <option value=\"range\">{{'analysis.range' | translate}}</option>\n" +
    "            <option value=\"in\">{{'analysis.values' | translate}}</option>\n" +
    "          </select>\n" +
    "        </li>\n" +
    "        <li class=\"criteria-list-item\" ng-if=\"$ctrl.showNumericalOptions() && $ctrl.selectedNumericalOperation === 'range'\">\n" +
    "          <div class=\"row\">\n" +
    "            <div class=\"col-xs-6\">\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"range-min\" translate>analysis.min</label>\n" +
    "                <input ng-model=\"$ctrl.selectedMin\" type=\"text\" class=\"form-control\" id=\"range-min\" ng-keyup=\"$ctrl.onNumericalMinKeyup($event)\" placeholder=\"{{$ctrl.rangeMin}}\">\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-xs-6\">\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"range-max\" translate>analysis.max</label>\n" +
    "                <input ng-model=\"$ctrl.selectedMax\" type=\"text\" class=\"form-control\" id=\"range-max\" ng-keyup=\"$ctrl.onNumericalMaxKeyup($event)\" placeholder=\"{{$ctrl.rangeMax}}\">\n" +
    "              </div>    \n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </li>\n" +
    "        <li class=\"criteria-list-item\" ng-if=\"$ctrl.showNumericalOptions() && $ctrl.selectedNumericalOperation === 'in'\">\n" +
    "          <div class=\"form-group\">\n" +
    "            <label for=\"in-values\" translate>analysis.values-title</label>\n" +
    "            <input ng-model=\"$ctrl.selectedNumericalValues\" type=\"text\" class=\"form-control\" id=\"in-values\" ng-keyup=\"$ctrl.onNumericalValuesKeyup($event)\">\n" +
    "          </div>\n" +
    "        </li>\n" +
    "\n" +
    "        <li class=\"divider\" ng-if=\"$ctrl.showTemporalOptions()\"></li>\n" +
    "        <li class=\"criteria-list-item\" ng-if=\"$ctrl.showTemporalOptions()\">\n" +
    "          <select class=\"form-control input-sm form-select\" ng-model=\"$ctrl.selectedTemporalOperation\">\n" +
    "            <option value=\"range\">{{'analysis.range' | translate}}</option>\n" +
    "            <option value=\"in\">{{'analysis.value' | translate}}</option>\n" +
    "          </select>\n" +
    "        </li>\n" +
    "        <li class=\"criteria-list-item\" ng-if=\"$ctrl.showTemporalOptions() && $ctrl.selectedTemporalOperation === 'range'\">\n" +
    "          <div class=\"row\">\n" +
    "            <div class=\"col-xs-6\">\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"from-date\" class=\"control-label\" translate>analysis.to</label>  \n" +
    "                <span class=\"input-group input-group-sm no-padding-top\">\n" +
    "                  <input id=\"from-date\" type=\"text\" class=\"form-control\" aria-describedby=\"from-date-picker\" uib-datepicker-popup=\"yyyy-MM-dd\" \n" +
    "                    ng-model=\"$ctrl.selectedFrom\" is-open=\"$ctrl.fromDatePickerOpened\"/>\n" +
    "                  <span class=\"input-group-addon\" id=\"from-date-picker\" ng-click=\"$ctrl.fromDatePickerOpened = true\"><i class=\"fa fa-calendar\"></i></span>\n" +
    "                </span>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-xs-6\">\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"to-date\" class=\"control-label\" translate>analysis.to</label>  \n" +
    "                <span class=\"input-group input-group-sm no-padding-top\">\n" +
    "                  <input id=\"to-date\" type=\"text\" class=\"form-control\" aria-describedby=\"to-date-picker\" uib-datepicker-popup=\"yyyy-MM-dd\" \n" +
    "                    ng-model=\"$ctrl.selectedTo\" is-open=\"$ctrl.toDatePickerOpened\"/>\n" +
    "                  <span class=\"input-group-addon\" id=\"to-date-picker\" ng-click=\"$ctrl.toDatePickerOpened = true\"><i class=\"fa fa-calendar\"></i></span>\n" +
    "                </span>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </li>\n" +
    "        <li class=\"criteria-list-item\" ng-if=\"$ctrl.showTemporalOptions() && $ctrl.selectedTemporalOperation === 'in'\">\n" +
    "          <div class=\"row\">\n" +
    "            <div class=\"col-xs-12\">\n" +
    "              <div class=\"form-group\">\n" +
    "                <label for=\"in-date\" class=\"control-label\" translate>analysis.date-title</label>  \n" +
    "                <span class=\"input-group input-group-sm no-padding-top\">\n" +
    "                  <input id=\"in-date\" type=\"text\" class=\"form-control\" aria-describedby=\"date-picker\" uib-datepicker-popup=\"yyyy-MM-dd\" \n" +
    "                    ng-model=\"$ctrl.selectedTemporalValue\" is-open=\"$ctrl.datePickerOpened\"/>\n" +
    "                  <span class=\"input-group-addon\" id=\"date-picker\" ng-click=\"$ctrl.datePickerOpened = true\"><i class=\"fa fa-calendar\"></i></span>\n" +
    "                </span>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("analysis/crosstab/views/crosstab-variable-crosstab.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("analysis/crosstab/views/crosstab-variable-crosstab.html",
    "<!--\n" +
    "  ~ Copyright (c) 2015 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<div ng-cloak>\n" +
    "  <h4>{{dataset.translatedAcronym}} {{'dataset.crosstab.title' | translate}}</h4>\n" +
    "\n" +
    "  <obiba-alert id=\"DatasetVariableCrosstabController\"></obiba-alert>\n" +
    "\n" +
    "  <!-- crosstab variable selection -->\n" +
    "  <div class=\"well well-sm\">\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"cross-tab col-xs-4\">\n" +
    "        <ui-select ng-model=\"crosstab.lhs.variable\" theme=\"bootstrap\">\n" +
    "          <ui-select-match placeholder=\"{{'dataset.crosstab.categorical' | translate}}\">{{$select.selected.name}}\n" +
    "          </ui-select-match>\n" +
    "          <ui-select-choices refresh=\"searchCategoricalVariables($select.search)\" refresh-delay=\"0\"\n" +
    "                             repeat=\"variable in crosstab.lhs.variables\">\n" +
    "\n" +
    "            <div>{{variable.name}}</div>\n" +
    "            <small>{{variable | variableLabel}}</small>\n" +
    "          </ui-select-choices>\n" +
    "        </ui-select>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"col-xs-1 text-center no-padding no-margin sm-width\">\n" +
    "        <i class=\"fa fa-times fa-2x\"></i>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"cross-tab col-xs-4\">\n" +
    "        <ui-select ng-model=\"crosstab.rhs.variable\" theme=\"bootstrap\">\n" +
    "          <ui-select-match placeholder=\"{{'dataset.crosstab.another' | translate}}\">{{$select.selected.name}}\n" +
    "          </ui-select-match>\n" +
    "          <ui-select-choices refresh=\"searchVariables($select.search)\" refresh-delay=\"0\"\n" +
    "                             repeat=\"variable in crosstab.rhs.variables\">\n" +
    "\n" +
    "            <div>{{variable.name}}</div>\n" +
    "            <small>{{variable | variableLabel}}</small>\n" +
    "          </ui-select-choices>\n" +
    "        </ui-select>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"col-xs-3\">\n" +
    "        <span>\n" +
    "          <button type=\"button\" class=\"btn btn-primary\" aria-hidden=\"true\" ng-click=\"submit()\">{{'submit' | translate}}\n" +
    "          </button>\n" +
    "          <button ng-if=\"canExchangeVariables()\" type=\"button\" class=\"btn btn-primary\"\n" +
    "                  aria-hidden=\"true\" ng-click=\"exchangeVariables()\"> v1 <i class=\"fa fa-exchange fa-1x\"></i> v2\n" +
    "          </button>\n" +
    "          <button type=\"button\" class=\"btn btn-default\" aria-hidden=\"true\" ng-click=\"clear()\">{{'clear' | translate}}\n" +
    "          </button>\n" +
    "        </span>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <span class=\"help-block\">{{'dataset.crosstab.query-help' | translate}}</span>\n" +
    "  </div>\n" +
    "\n" +
    "  <!-- crosstab results -->\n" +
    "  <div ng-if=\"crosstab.contingencies && crosstab.contingencies.length > 0\">\n" +
    "\n" +
    "    <div>\n" +
    "      <!-- table detail and stats options -->\n" +
    "      <div class=\"btn-group\">\n" +
    "        <label class=\"btn\" ng-class=\"{'btn-info': options.showDetails, 'btn-default': !options.showDetails}\"\n" +
    "               ng-model=\"options.showDetails\" uib-btn-checkbox>{{'global.detailed' | translate}}</label>\n" +
    "        <div class=\"btn-group\" ng-if=\"!isStatistical(crosstab.rhs.xVariable)\">\n" +
    "          <label class=\"btn\" ng-class=\"{'btn-info': options.statistics === StatType.CPERCENT, 'btn-default': options.statistics !== StatType.CPERCENT}\"\n" +
    "                 ng-model=\"options.statistics\" uib-btn-radio=\"StatType.CPERCENT\">{{'global.percentage' | translate}} <i class=\"fa fa-long-arrow-down\"></i></label>\n" +
    "          <label class=\"btn\" ng-class=\"{'btn-info': options.statistics === StatType.RPERCENT, 'btn-default': options.statistics !== StatType.RPERCENT}\"\n" +
    "                 ng-model=\"options.statistics\" uib-btn-radio=\"StatType.RPERCENT\">{{'global.percentage' | translate}} <i class=\"fa fa-long-arrow-right\"></i></label>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <!-- download menu -->\n" +
    "      <div class=\"pull-right sm-bottom-margin\">\n" +
    "        <div class=\"btn-group\" role=\"group\">\n" +
    "          <button type=\"button\" class=\"btn btn-info btn-sm dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\"\n" +
    "                  aria-expanded=\"false\">\n" +
    "            <i class=\"glyphicon glyphicon-download-alt\"></i> <span>{{'download' | translate}}</span>\n" +
    "            <span class=\"caret\"></span>\n" +
    "          </button>\n" +
    "          <ul class=\"dropdown-menu dropdown-menu-compact\">\n" +
    "            <li><a obiba-file-download url=\"downloadUrl(DocType.EXCEL)\" target=\"_self\" download ><i class=\"fa fa-file-excel-o\"></i> {{'excel' | translate}}</a></li>\n" +
    "            <li><a obiba-file-download url=\"downloadUrl(DocType.CSV)\" target=\"_self\" download ><i class=\"fa fa-file-text-o\"></i> {{'csv' | translate}}</a></li>\n" +
    "          </ul>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <!-- progress image -->\n" +
    "    <div>\n" +
    "      <div ng-if=\"loading\" class=\"loading \"></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <table ng-if=\"!loading\" class=\"table table-striped table-bordered no-margin no-padding\">\n" +
    "      <thead>\n" +
    "      <tr>\n" +
    "        <th style=\"vertical-align: top\" class=\"\" ng-if=\"datasetHarmo\" width=\"20%\"\n" +
    "            rowspan=\"{{crosstab.lhs.xVariable.categories.length}}\">{{options.showDetailedStats ? ('dataset.study-table.title' | translate) : ''}}\n" +
    "        </th>\n" +
    "        <th style=\"vertical-align: top\" rowspan=\"{{crosstab.lhs.xVariable.categories.length}}\" width=\"10%\">\n" +
    "          <a href=\"{{PageUrlService.variablePage(crosstab.rhs.xVariable.id)}}\">{{crosstab.rhs.xVariable.name}}</a>\n" +
    "        </th>\n" +
    "        <th class=\"text-center\" colspan=\"{{crosstab.lhs.xVariable.categories.length}}\">\n" +
    "          <a href=\"{{PageUrlService.variablePage(crosstab.lhs.xVariable.id)}}\">{{crosstab.lhs.xVariable.name}}</a>\n" +
    "        </th>\n" +
    "        <th style=\"vertical-align: top\" class=\"text-center\" rowspan=\"{{crosstab.lhs.xVariable.categories.length}}\">\n" +
    "          {{'total' | translate}}\n" +
    "        </th>\n" +
    "      </tr>\n" +
    "      <tr>\n" +
    "        <th class=\"text-center\" ng-repeat=\"category in crosstab.lhs.xVariable.categories\">\n" +
    "          <span  class=\"clickable\" popover-title=\"\" popover-popup-delay=\"250\" popover-placement=\"bottom\" popover-trigger=\"'mouseenter'\"\n" +
    "                uib-popover=\"{{crosstab.lhs.xVariable.categories | variableCategory:category.name | variableLabel}}\">{{category.name}}</span>\n" +
    "        </th>\n" +
    "      </tr>\n" +
    "      </thead>\n" +
    "\n" +
    "      <!-- Categorical -->\n" +
    "      <tbody ng-repeat=\"contingency in crosstab.contingencies track by $index\"\n" +
    "             ng-if=\"!isStatistical(crosstab.rhs.xVariable) && (!datasetHarmo || (datasetHarmo && options.showDetailedStats))\"\n" +
    "             ng-include=\"getTemplatePath(contingency)\">\n" +
    "      </tbody>\n" +
    "      <tbody ng-if=\"!isStatistical(crosstab.rhs.xVariable) && datasetHarmo && options.showDetailedStats\">\n" +
    "      <tr>\n" +
    "        <td colspan=\"{{crosstab.lhs.xVariable.categories.length + 3}}\"></td>\n" +
    "      </tr>\n" +
    "      </tbody>\n" +
    "      <tbody ng-repeat=\"contingency in [crosstab.all]\" ng-init=\"grandTotal = true\"\n" +
    "             ng-if=\"datasetHarmo && !isStatistical(crosstab.rhs.xVariable)\"\n" +
    "             ng-include=\"getTemplatePath(contingency)\">\n" +
    "      </tbody>\n" +
    "\n" +
    "      <!-- Statistical -->\n" +
    "      <tbody ng-repeat=\"contingency in crosstab.contingencies\"\n" +
    "             ng-if=\"isStatistical(crosstab.rhs.xVariable) && (!datasetHarmo || (datasetHarmo && options.showDetailedStats))\"\n" +
    "             ng-include=\"getTemplatePath(contingency)\">\n" +
    "      </tbody>\n" +
    "      <tbody ng-if=\"isStatistical(crosstab.rhs.xVariable) && datasetHarmo && options.showDetailedStats\">\n" +
    "      <tr>\n" +
    "        <td colspan=\"{{crosstab.lhs.xVariable.categories.length + 3}}\"></td>\n" +
    "      </tr>\n" +
    "      </tbody>\n" +
    "      <tbody ng-repeat=\"contingency in [crosstab.all]\" ng-init=\"grandTotal = true\"\n" +
    "             ng-if=\"datasetHarmo && isStatistical(crosstab.rhs.xVariable)\"\n" +
    "             ng-include=\"getTemplatePath(contingency)\">\n" +
    "      </tbody>\n" +
    "\n" +
    "    </table>\n" +
    "  </div>\n" +
    "  <span ng-bind-html=\"renderHtml(body)\"></span>\n" +
    "</div>\n" +
    "");
}]);

angular.module("analysis/crosstab/views/crosstab-variable-frequencies-empty.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("analysis/crosstab/views/crosstab-variable-frequencies-empty.html",
    "<!--\n" +
    "  ~ Copyright (c) 2015 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<tr>\n" +
    "  <td ng-if=\"datasetHarmo\" rowspan=\"{{crosstab.rhs.xVariable.categories.length + 1}}\">\n" +
    "    <crosstab-study-table contingency=\"contingency\"></crosstab-study-table>\n" +
    "  </td>\n" +
    "  <td colspan=\"{{crosstab.lhs.xVariable.categories.length + 2}}\"><em>{{'search.no-results' | translate}}</em></td>\n" +
    "</tr>\n" +
    "");
}]);

angular.module("analysis/crosstab/views/crosstab-variable-frequencies.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("analysis/crosstab/views/crosstab-variable-frequencies.html",
    "<!--\n" +
    "  ~ Copyright (c) 2015 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<tr ng-if=\"options.showDetails\" ng-repeat=\"frequency in contingency.aggregations[0].frequencies track by $index\">\n" +
    "  <td ng-if=\"datasetHarmo && $index === 0\" rowspan=\"{{crosstab.rhs.xVariable.categories.length + 2}}\">\n" +
    "      <crosstab-study-table ng-hide=\"grandTotal\" contingency=\"contingency\"></crosstab-study-table>\n" +
    "    <span ng-if=\"grandTotal\"><strong>{{'total' | translate}}</strong></span>\n" +
    "  </td>\n" +
    "\n" +
    "  <td>\n" +
    "    <span class=\"clickable\" popover-title=\"\" popover-popup-delay=\"250\" popover-placement=\"bottom\" popover-trigger=\"'mouseenter'\"\n" +
    "          uib-popover=\"{{crosstab.rhs.xVariable.categories | variableCategory:frequency.value | variableLabel}}\">\n" +
    "      {{frequency.value}}\n" +
    "    </span>\n" +
    "  </td>\n" +
    "\n" +
    "  <td ng-repeat=\"aggregation in contingency.aggregations\">\n" +
    "    {{aggregation.frequencies[$parent.$index].count}}&nbsp;\n" +
    "\n" +
    "    <span ng-show=\"aggregation.privacyCheck\" class=\"help-inline\">\n" +
    "      <span ng-show=\"options.statistics === StatType.RPERCENT\">\n" +
    "        ({{aggregation.frequencies[$parent.$index].percent | number:2}}%)\n" +
    "      </span>\n" +
    "      <span ng-show=\"options.statistics === StatType.CPERCENT\">\n" +
    "        ({{aggregation.frequencies[$parent.$index].cpercent | number:2}}%)\n" +
    "      </span>\n" +
    "    </span>\n" +
    "  </td>\n" +
    "  <td>\n" +
    "    {{contingency.all.frequencies[$index].count}}&nbsp;\n" +
    "    <span ng-if=\"contingency.all.privacyCheck\" class=\"help-inline\">\n" +
    "      <span ng-if=\"options.statistics === StatType.RPERCENT\">\n" +
    "        (100%)\n" +
    "      </span>\n" +
    "      <span ng-if=\"options.statistics === StatType.CPERCENT\">\n" +
    "        ({{contingency.all.frequencies[$index].percent | number:2}}%)\n" +
    "      </span>\n" +
    "    </span>\n" +
    "  </td>\n" +
    "</tr>\n" +
    "<tr>\n" +
    "  <td ng-if=\"options.showDetailedStats &&  datasetHarmo && !options.showDetails\" rowspan=\"{{crosstab.rhs.xVariable.categories.length}}\">\n" +
    "    <crosstab-study-table ng-hide=\"grandTotal\" contingency=\"contingency\"></crosstab-study-table>\n" +
    "    <span ng-if=\"grandTotal\"><strong>{{'total' | translate}}</strong></span>\n" +
    "  </td>\n" +
    "  <td><em>N</em></td>\n" +
    "  <td ng-repeat=\"aggregation in contingency.aggregations\">\n" +
    "    <span ng-if=\"contingency.totalPrivacyCheck\">\n" +
    "      {{aggregation.n}}&nbsp;\n" +
    "      <span class=\"help-inline\">\n" +
    "        <span ng-if=\"options.statistics === StatType.RPERCENT\">\n" +
    "          ({{aggregation.percent | number:2}}%)\n" +
    "        </span>\n" +
    "        <span ng-if=\"options.statistics === StatType.CPERCENT\">\n" +
    "          (100%)\n" +
    "        </span>\n" +
    "      </span>\n" +
    "    </span>\n" +
    "    <span ng-if=\"!contingency.totalPrivacyCheck\">\n" +
    "      -\n" +
    "    </span>\n" +
    "  </td>\n" +
    "  <td>\n" +
    "    <span ng-if=\"!contingency.totalPrivacyCheck\">\n" +
    "      -\n" +
    "    </span>\n" +
    "    <span ng-if=\"contingency.totalPrivacyCheck\">\n" +
    "      {{contingency.all.n}}&nbsp;\n" +
    "      <span ng-if=\"contingency.privacyCheck\" class=\"help-inline\">\n" +
    "        <span ng-if=\"options.statistics === StatType.CPERCENT\">\n" +
    "          (100%)\n" +
    "        </span>\n" +
    "        <span ng-if=\"options.statistics === StatType.RPERCENT\">\n" +
    "          (100%)\n" +
    "        </span>\n" +
    "      <span>\n" +
    "    </span>\n" +
    "  </td>\n" +
    "</tr>\n" +
    "\n" +
    "<tr ng-if=\"options.showDetails && !grandTotal && contingency.privacyCheck\">\n" +
    "  <td>\n" +
    "    <em>{{'dataset.crosstab.chi-squared.test' | translate}}</em>\n" +
    "  </td>\n" +
    "  <td colspan=\"{{crosstab.lhs.xVariable.categories.length + 1}}\">\n" +
    "    <span>\n" +
    "      χ2 = {{contingency.chiSquaredInfo.sum | number:4 }},&nbsp;&nbsp;\n" +
    "      df = {{contingency.chiSquaredInfo.df}},&nbsp;&nbsp;\n" +
    "      p-value = {{contingency.chiSquaredInfo.pValue | number:4 }}\n" +
    "    </span>\n" +
    "    <span class=\"text-danger\" ng-if=\"!contingency.privacyCheck\">\n" +
    "      {{'dataset.crosstab.privacy-check-failed' | translate:{arg0:contingency.privacyThreshold} }}\n" +
    "    </span>\n" +
    "  </td>\n" +
    "</tr>\n" +
    "<tr ng-if=\"!grandTotal && !contingency.privacyCheck\">\n" +
    "  <td colspan=\"{{crosstab.lhs.xVariable.categories.length + 2}}\">\n" +
    "    <span class=\"text-danger\" ng-if=\"!contingency.privacyCheck\">\n" +
    "      {{getPrivacyErrorMessage(contingency) | translate:{arg0:contingency.privacyThreshold} }}\n" +
    "    </span>\n" +
    "  </td>\n" +
    "</tr>\n" +
    "");
}]);

angular.module("analysis/crosstab/views/crosstab-variable-statistics-empty.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("analysis/crosstab/views/crosstab-variable-statistics-empty.html",
    "<!--\n" +
    "  ~ Copyright (c) 2015 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<tr>\n" +
    "  <td ng-if=\"datasetHarmo\">\n" +
    "    <crosstab-study-table contingency=\"contingency\"></crosstab-study-table>\n" +
    "  </td>\n" +
    "  <td colspan=\"4\" class=\"danger\"><em>{{'no-results' | translate}}</em></td>\n" +
    "</tr>\n" +
    "");
}]);

angular.module("analysis/crosstab/views/crosstab-variable-statistics.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("analysis/crosstab/views/crosstab-variable-statistics.html",
    "<!--\n" +
    "  ~ Copyright (c) 2015 OBiBa. All rights reserved.\n" +
    "  ~\n" +
    "  ~ This program and the accompanying materials\n" +
    "  ~ are made available under the terms of the GNU Public License v3.0.\n" +
    "  ~\n" +
    "  ~ You should have received a copy of the GNU General Public License\n" +
    "  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.\n" +
    "  -->\n" +
    "\n" +
    "<tr ng-if=\"options.showDetails\">\n" +
    "  <td ng-if=\"datasetHarmo\" rowspan=\"{{!grandTotal && !contingency.privacyCheck ? '6' : '5'}}\">\n" +
    "    <crosstab-study-table ng-hide=\"grandTotal\" contingency=\"contingency\"></crosstab-study-table>\n" +
    "    <span ng-if=\"grandTotal\"><strong>{{'total' | translate}}</strong></span>\n" +
    "  </td>\n" +
    "  <td translate>min</td>\n" +
    "  <td class=\"text-center\" ng-repeat=\"aggregation in contingency.aggregations\">{{aggregation.statistics.min | roundNumber}}</td>\n" +
    "  <td class=\"text-center\">{{contingency.all.statistics.min | roundNumber}}</td>\n" +
    "</tr>\n" +
    "<tr ng-if=\"options.showDetails\">\n" +
    "  <td translate>max</td>\n" +
    "  <td class=\"text-center\" ng-repeat=\"aggregation in contingency.aggregations\">{{aggregation.statistics.max | roundNumber}}</td>\n" +
    "  <td class=\"text-center\">{{contingency.all.statistics.max | roundNumber}}</td>\n" +
    "</tr>\n" +
    "<tr ng-if=\"options.showDetails\">\n" +
    "  <td translate>mean</td>\n" +
    "  <td class=\"text-center\" ng-repeat=\"aggregation in contingency.aggregations\">{{aggregation.statistics.mean | roundNumber}}</td>\n" +
    "  <td class=\"text-center\">{{contingency.all.statistics.mean | roundNumber}}</td>\n" +
    "</tr>\n" +
    "<tr ng-if=\"options.showDetails\">\n" +
    "  <td translate>std-deviation</td>\n" +
    "  <td class=\"text-center\" ng-repeat=\"aggregation in contingency.aggregations\">{{aggregation.statistics.stdDeviation | roundNumber}}</td>\n" +
    "  <td class=\"text-center\">{{contingency.all.statistics.stdDeviation | roundNumber}}</td>\n" +
    "</tr>\n" +
    "<tr>\n" +
    "  <td ng-if=\"datasetHarmo && !options.showDetails\">\n" +
    "    <crosstab-study-table ng-hide=\"grandTotal\" contingency=\"contingency\"></crosstab-study-table>\n" +
    "    <span ng-if=\"grandTotal\"><strong>{{'total' | translate}}</strong></span>\n" +
    "  </td>\n" +
    "  <td>N</td>\n" +
    "  <td class=\"text-center\" ng-repeat=\"aggregation in contingency.aggregations\">\n" +
    "    <span ng-if=\"contingency.totalPrivacyCheck\">\n" +
    "      {{aggregation.n}}\n" +
    "    </span>\n" +
    "    <span ng-if=\"!contingency.totalPrivacyCheck\">\n" +
    "      -\n" +
    "    </span>\n" +
    "  </td>\n" +
    "  <td class=\"text-center\">\n" +
    "    <span ng-if=\"contingency.totalPrivacyCheck\">\n" +
    "      {{contingency.all.n}}\n" +
    "    </span>\n" +
    "    <span ng-if=\"!contingency.totalPrivacyCheck\">\n" +
    "      -\n" +
    "    </span>\n" +
    "  </td>\n" +
    "</tr>\n" +
    "<tr>\n" +
    "  <td ng-if=\"!grandTotal && !contingency.privacyCheck\" colspan=\"{{crosstab.lhs.xVariable.categories.length + 3}}\">\n" +
    "    <span class=\"text-danger\" ng-if=\"!contingency.privacyCheck\">\n" +
    "      {{getPrivacyErrorMessage(contingency) | translate:{arg0:contingency.privacyThreshold} }}\n" +
    "    <span>\n" +
    "  </td>\n" +
    "</tr>\n" +
    "");
}]);

angular.module("analysis/views/analysis-entities-count.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("analysis/views/analysis-entities-count.html",
    "<div>\n" +
    "  <div ng-if=\"entitiesHeaderTemplateUrl\" ng-include=\"entitiesHeaderTemplateUrl\"></div>\n" +
    "  <div>\n" +
    "      <span class=\"btn btn-primary\" ng-show=\"result.counts\">\n" +
    "        <span ng-show=\"result.counts.length>0\" translate>{{result.counts[0].entityType}}</span>\n" +
    "        <span class=\"badge\">{{localizedTotal}}</span>\n" +
    "      </span>\n" +
    "      <span ng-if=\"loading\" class=\"voffset2 loading\"></span>\n" +
    "  </div>\n" +
    "  <entities-count-result-table ng-hide=\"loading && !result.total\" result=\"result\"></entities-count-result-table>\n" +
    "  <p ng-hide=\"query\" translate>analysis.entities-count.no-query</p>\n" +
    "</div>");
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
    "    <th ng-show=\"deleteAttachments\" translate>actions</th>\n" +
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
    "    <td style=\"width:20px;\" ng-show=\"deleteAttachments\">\n" +
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
    "  <div ng-if=\"!noDocument\">\n" +
    "    <h4 ng-show=\"showTitle\">{{documentsTitle | translate}}</h4>\n" +
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

angular.module("search/components/panel/classification/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/panel/classification/component.html",
    "<div class=\"voffset2\">\n" +
    "    <div>\n" +
    "      <ol class=\"breadcrumb\">\n" +
    "        <li ng-if=\"!taxonomies.taxonomy\">\n" +
    "          {{'all-' + taxonomies.target + '-classifications' | translate}}\n" +
    "        </li>\n" +
    "        <li ng-if=\"taxonomies.taxonomy\">\n" +
    "          <a href ng-click=\"navigateTaxonomy()\">{{'all-' + taxonomies.target + '-classifications' |\n" +
    "            translate}}</a>\n" +
    "        </li>\n" +
    "        <li ng-if=\"taxonomies.taxonomy\">\n" +
    "          <span ng-if=\"!taxonomies.vocabulary\">\n" +
    "            <localized value=\"taxonomies.taxonomy.title\" lang=\"lang\" key-lang=\"locale\" key-value=\"text\"></localized>\n" +
    "          </span>\n" +
    "          <a href ng-click=\"navigateTaxonomy(taxonomies.taxonomy)\" ng-if=\"taxonomies.vocabulary\">\n" +
    "            <span>\n" +
    "              <localized value=\"taxonomies.taxonomy.title\" lang=\"lang\" key-lang=\"locale\" key-value=\"text\"></localized>\n" +
    "            </span>\n" +
    "          </a>\n" +
    "        </li>\n" +
    "        <li ng-if=\"taxonomies.vocabulary\">\n" +
    "          <span>\n" +
    "            <localized value=\"taxonomies.vocabulary.title\" lang=\"lang\" key-lang=\"locale\" key-value=\"text\"></localized>\n" +
    "          </span>\n" +
    "        </li>\n" +
    "        <a title=\"{{'search.refresh-taxonomies' | translate}}\"\n" +
    "           href class=\"hoffset1\" ng-click=\"refreshTaxonomyCache()\">\n" +
    "          <span class=\"fa fa-refresh\"></span>\n" +
    "        </a>\n" +
    "      </ol>\n" +
    "  \n" +
    "    </div>\n" +
    "  \n" +
    "    <div ng-if=\"taxonomies.search.active\" class=\"loading\"></div>\n" +
    "  \n" +
    "    <div ng-if=\"!taxonomies.search.active\">\n" +
    "      <div ng-if=\"!taxonomies.taxonomy\">\n" +
    "        <div ng-repeat=\"group in taxonomyGroups\">\n" +
    "          <h3 ng-if=\"group.title\">{{group.title}}</h3>\n" +
    "          <p class=\"help-block\" ng-if=\"group.description\">{{group.description}}</p>\n" +
    "          <div ng-if=\"!taxonomies.taxonomy\">\n" +
    "            <div ng-repeat=\"taxonomy in group.taxonomies\" ng-if=\"$index % 3 == 0\" class=\"row\">\n" +
    "              <div class=\"col-md-4\">\n" +
    "                <div taxonomy-panel taxonomy=\"group.taxonomies[$index]\" lang=\"lang\"\n" +
    "                     on-navigate=\"navigateTaxonomy\"\n" +
    "                     on-up=\"moveTaxonomyUp\"\n" +
    "                     on-down=\"moveTaxonomyDown\"\n" +
    "                     on-hide=\"hideTaxonomy\"\n" +
    "                     on-show=\"showTaxonomy\"></div>\n" +
    "              </div>\n" +
    "              <div class=\"col-md-4\">\n" +
    "                <div taxonomy-panel taxonomy=\"group.taxonomies[$index + 1]\" lang=\"lang\"\n" +
    "                     on-navigate=\"navigateTaxonomy\"\n" +
    "                     on-up=\"moveTaxonomyUp\"\n" +
    "                     on-down=\"moveTaxonomyDown\"\n" +
    "                     on-hide=\"hideTaxonomy\"\n" +
    "                     on-show=\"showTaxonomy\"></div>\n" +
    "              </div>\n" +
    "              <div class=\"col-md-4\">\n" +
    "                <div taxonomy-panel taxonomy=\"group.taxonomies[$index + 2]\" lang=\"lang\"\n" +
    "                     on-navigate=\"navigateTaxonomy\"\n" +
    "                     on-up=\"moveTaxonomyUp\"\n" +
    "                     on-down=\"moveTaxonomyDown\"\n" +
    "                     on-hide=\"hideTaxonomy\"\n" +
    "                     on-show=\"showTaxonomy\"></div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "  \n" +
    "      <div ng-if=\"taxonomies.taxonomy && !taxonomies.vocabulary\">\n" +
    "        <h3 ng-repeat=\"label in taxonomies.taxonomy.title\"\n" +
    "            ng-if=\"label.locale === lang\">\n" +
    "          {{label.text}}\n" +
    "        </h3>\n" +
    "  \n" +
    "        <p class=\"help-block\" ng-repeat=\"label in taxonomies.taxonomy.description\" ng-if=\"label.locale === lang\">\n" +
    "          {{label.text}}\n" +
    "        </p>\n" +
    "  \n" +
    "        <div ng-repeat=\"vocabulary in taxonomies.taxonomy.vocabularies\" ng-if=\"$index % 3 == 0\" class=\"row\">\n" +
    "          <div class=\"col-md-4\">\n" +
    "            <div vocabulary-panel target=\"taxonomies.target\" taxonomy=\"taxonomies.taxonomy\" vocabulary=\"taxonomies.taxonomy.vocabularies[$index]\"\n" +
    "                 lang=\"lang\" on-navigate=\"navigateTaxonomy\"></div>\n" +
    "          </div>\n" +
    "          <div class=\"col-md-4\">\n" +
    "            <div vocabulary-panel target=\"taxonomies.target\" taxonomy=\"taxonomies.taxonomy\" vocabulary=\"taxonomies.taxonomy.vocabularies[$index + 1]\"\n" +
    "                 lang=\"lang\" on-navigate=\"navigateTaxonomy\"></div>\n" +
    "          </div>\n" +
    "          <div class=\"col-md-4\">\n" +
    "            <div vocabulary-panel target=\"taxonomies.target\" taxonomy=\"taxonomies.taxonomy\" vocabulary=\"taxonomies.taxonomy.vocabularies[$index + 2]\"\n" +
    "                 lang=\"lang\" on-navigate=\"navigateTaxonomy\"></div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "  \n" +
    "      <div ng-if=\"taxonomies.taxonomy && taxonomies.vocabulary && !taxonomies.term\">\n" +
    "        <h3 ng-repeat=\"label in taxonomies.vocabulary.title\"\n" +
    "            ng-if=\"label.locale === lang\">\n" +
    "          {{label.text}}\n" +
    "        </h3>\n" +
    "  \n" +
    "        <p class=\"help-block\" ng-repeat=\"label in taxonomies.vocabulary.description\"\n" +
    "           ng-if=\"label.locale === lang\">\n" +
    "          {{label.text}}\n" +
    "        </p>\n" +
    "  \n" +
    "        <div ng-repeat=\"term in taxonomies.vocabulary.terms\" ng-if=\"$index % 3 == 0\" class=\"row\">\n" +
    "          <div class=\"col-md-4\">\n" +
    "            <div term-panel target=\"taxonomies.target\" taxonomy=\"taxonomies.taxonomy\" vocabulary=\"taxonomies.vocabulary\" term=\"taxonomies.vocabulary.terms[$index]\"\n" +
    "                 lang=\"lang\" on-navigate=\"navigateTaxonomy\"></div>\n" +
    "          </div>\n" +
    "          <div class=\"col-md-4\">\n" +
    "            <div term-panel target=\"taxonomies.target\" taxonomy=\"taxonomies.taxonomy\" vocabulary=\"taxonomies.vocabulary\" term=\"taxonomies.vocabulary.terms[$index + 1]\"\n" +
    "                 lang=\"lang\" on-navigate=\"navigateTaxonomy\"></div>\n" +
    "          </div>\n" +
    "          <div class=\"col-md-4\">\n" +
    "            <div term-panel target=\"taxonomies.target\" taxonomy=\"taxonomies.taxonomy\" vocabulary=\"taxonomies.vocabulary\" term=\"taxonomies.vocabulary.terms[$index + 2]\"\n" +
    "                 lang=\"lang\" on-navigate=\"navigateTaxonomy\"></div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "  \n" +
    "      <div ng-if=\"taxonomies.taxonomy && taxonomies.vocabulary && taxonomies.term\">\n" +
    "        <h5 ng-repeat=\"label in taxonomies.term.title\" ng-if=\"label.locale === lang\">\n" +
    "          {{label.text}}\n" +
    "        </h5>\n" +
    "        <p ng-repeat=\"label in taxonomies.term.description\" ng-if=\"label.locale === lang\">\n" +
    "          <span class=\"help-block\" ng-bind-html=\"label.text | dceDescription\" ng-if=\"taxonomies.vocabulary.name === 'dceId'\"></span>\n" +
    "          <span class=\"help-block\" ng-bind-html=\"label.text\" ng-if=\"taxonomies.vocabulary.name !== 'dceId'\"></span>\n" +
    "        </p>\n" +
    "        <div>\n" +
    "          <a href class=\"btn btn-default btn-xs\"\n" +
    "             ng-click=\"selectTerm(taxonomies.target, taxonomies.taxonomy, taxonomies.vocabulary, {term: taxonomies.term})\">\n" +
    "            <i class=\"fa fa-plus-circle\"></i>\n" +
    "            <span translate>add-query</span>\n" +
    "          </a>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  \n" +
    "  </div>\n" +
    "  ");
}]);

angular.module("search/components/panel/taxonomy-panel/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/panel/taxonomy-panel/component.html",
    "<div>\n" +
    "  <div class=\"panel panel-default\" ng-if=\"taxonomy\">\n" +
    "    <div class=\"panel-heading\" ng-class=\"taxonomy.props.hidden !== 'true' ? '' : 'panel-heading-none'\">\n" +
    "      <div>\n" +
    "        <a href ng-click=\"onNavigate(taxonomy)\">\n" +
    "          <localized value=\"taxonomy.title\" lang=\"lang\" key-lang=\"locale\" key-value=\"text\"></localized>\n" +
    "        </a>\n" +
    "        <a href ng-click=\"onUp(taxonomy)\" ng-if=\"!taxonomy.props._first\">\n" +
    "          <i class=\"fa fa-arrow-up\" title=\"{{'up' | translate}}\"></i>\n" +
    "        </a>\n" +
    "        <a href ng-click=\"onDown(taxonomy)\" ng-if=\"!taxonomy.props._last\">\n" +
    "          <i class=\"fa fa-arrow-down\" title=\"{{'down' | translate}}\"></i>\n" +
    "        </a>\n" +
    "        <a href ng-click=\"onHide(taxonomy)\" ng-if=\"taxonomy.props.hidden !== 'true'\">\n" +
    "          <i class=\"fa fa-eye-slash\" title=\"{{'hide' | translate}}\"></i>\n" +
    "        </a>\n" +
    "        <a href ng-click=\"onShow(taxonomy)\" ng-if=\"taxonomy.props.hidden === 'true'\">\n" +
    "          <i class=\"fa fa-eye\" title=\"{{'show' | translate}}\"></i>\n" +
    "        </a>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"panel-body\">\n" +
    "      <div>\n" +
    "        <localized value=\"taxonomy.description\" lang=\"lang\" key-lang=\"locale\" key-value=\"text\"></localized>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("search/components/panel/term-panel/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/panel/term-panel/component.html",
    "<div>\n" +
    "  <div class=\"panel panel-default\" ng-if=\"term\">\n" +
    "    <div class=\"panel-heading\">\n" +
    "      <div>\n" +
    "        <localized value=\"term.title\" lang=\"lang\" key-lang=\"locale\" key-value=\"text\"></localized>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"panel-body\">\n" +
    "      <div>\n" +
    "        <localized value=\"term.description\" lang=\"lang\" key-lang=\"locale\" key-value=\"text\"></localized>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("search/components/panel/vocabulary-panel/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("search/components/panel/vocabulary-panel/component.html",
    "<div>\n" +
    "  <div class=\"panel panel-default\" ng-if=\"vocabulary\">\n" +
    "    <div class=\"panel-heading\">\n" +
    "      <div class=\"clearfix\">\n" +
    "        <a href ng-click=\"onNavigate(taxonomy, vocabulary)\" ng-if=\"vocabulary.terms\">\n" +
    "          <localized value=\"vocabulary.title\" lang=\"lang\" key-lang=\"locale\" key-value=\"text\"></localized>\n" +
    "        </a>\n" +
    "        <span ng-if=\"!vocabulary.terms\">\n" +
    "          <localized value=\"vocabulary.title\" lang=\"lang\" key-lang=\"locale\" key-value=\"text\"></localized>\n" +
    "        </span>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"panel-body\">\n" +
    "      <div>\n" +
    "        <localized value=\"vocabulary.description\" lang=\"lang\" key-lang=\"locale\" key-value=\"text\"></localized>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
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
    "  <div class=\"container alert-fixed-position\">\n" +
    "    <obiba-alert id=\"SearchController\"></obiba-alert>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"alert-growl-container\">\n" +
    "    <obiba-alert id=\"SearchControllerGrowl\"></obiba-alert>\n" +
    "  </div>\n" +
    "\n" +
    "  <!-- Lang tabs -->\n" +
    "  <ul class=\"nav nav-tabs voffset2\" role=\"tablist\" ng-if=\"tabs && tabs.length>1\">\n" +
    "    <li ng-repeat=\"tab in tabs\" role=\"presentation\" ng-class=\"{ active: tab === lang }\"><a href role=\"tab\"\n" +
    "      ng-click=\"setLocale(tab)\">{{'language.' + tab | translate}}</a></li>\n" +
    "  </ul>\n" +
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

angular.module("sets/components/add-to-set-modal/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("sets/components/add-to-set-modal/component.html",
    "<div class=\"modal-content\">\n" +
    "  <div class=\"modal-header\">\n" +
    "    <button type=\"button\" class=\"close\" aria-hidden=\"true\" ng-click=\"$ctrl.cancel()\">&times;</button>\n" +
    "    <h4 class=\"modal-title\" translate>sets.add.modal.title</h4>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"modal-body\">\n" +
    "    <obiba-alert id=\"MaxAttainedAlert\"></obiba-alert>\n" +
    "    <p translate>sets.add.modal.sub-title</p>\n" +
    "    <div ng-if=\"$ctrl.canAddMoreSets\">\n" +
    "        <div class=\"radio\" ng-show=\"$ctrl.sets.length\">\n" +
    "          <label for=\"new_set_choice\">\n" +
    "            <input type=\"radio\" ng-model=\"$ctrl.choice.radio\" ng-required=\"!$ctrl.choice.radio\" value=\"NEW\" id=\"new_set_choice\" ng-change=\"$ctrl.onRadioChanged()\">\n" +
    "            {{'sets.add.modal.create-new' | translate}}\n" +
    "          </label>\n" +
    "        </div>\n" +
    "\n" +
    "        <input class=\"form-control\" type=\"text\" ng-model=\"$ctrl.choice.name\" ng-keyup=\"$ctrl.onNameChanged()\">\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"$ctrl.sets.length\" class=\"margin-top-10\">\n" +
    "        <div class=\"radio\" ng-show=\"$ctrl.canAddMoreSets\">\n" +
    "          <label for=\"existing_set_choice\">\n" +
    "            <input type=\"radio\" ng-model=\"$ctrl.choice.radio\" ng-required=\"!$ctrl.choice.radio\" value=\"EXISTING\" id=\"existing_set_choice\" ng-change=\"$ctrl.onRadioChanged()\">\n" +
    "            {{'sets.add.modal.to-existing' | translate}}\n" +
    "          </label>\n" +
    "        </div>\n" +
    "\n" +
    "        <select class=\"form-control\" ng-options=\"set as set.name for set in $ctrl.sets\" ng-model=\"$ctrl.choice.selected\" ng-change=\"$ctrl.onSelected()\"></select>\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"modal-footer\" ng-if=\"!$ctrl.disableActions\">\n" +
    "    <button class=\"btn btn-responsive btn-default\" type=\"button\" ng-click=\"$ctrl.cancel()\" translate>cancel</button>\n" +
    "    <button class=\"btn btn-responsive btn-primary\" type=\"button\" ng-click=\"$ctrl.accept()\" ng-disabled=\"!$ctrl.canAccept\" translate>save</button>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"modal-footer\" ng-if=\"$ctrl.disableActions\">\n" +
    "    <span class=\"loading\"></span>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("sets/components/cart-documents-table/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("sets/components/cart-documents-table/component.html",
    "<div>\n" +
    "  <div class=\"pull-left\" ng-show=\"$ctrl.documents.total>0\">\n" +
    "    <a ng-if=\"$ctrl.currentUserCanCreateSets\" href=\"\" ng-click=\"$ctrl.addToSet(type)\" class=\"action btn btn-info btn-responsive\">\n" +
    "      <i class=\"fa fa-plus\"></i> {{'sets.add.button.set-label' | translate}}\n" +
    "    </a>\n" +
    "\n" +
    "    <div ng-if=\"$ctrl.showAnalysis()\" class=\"btn-group\" uib-dropdown is-open=\"$ctrl.analysis.isopen\">\n" +
    "      <button id=\"single-button\" type=\"button\" class=\"btn btn-primary\" uib-dropdown-toggle ng-disabled=\"disabled\">\n" +
    "        <i class=\"fa fa-cog\"></i> {{'analysis.action' | translate}} <span class=\"caret\"></span>\n" +
    "      </button>\n" +
    "      <ul class=\"dropdown-menu\" uib-dropdown-menu role=\"menu\" aria-labelledby=\"single-button\">\n" +
    "        <li role=\"menuitem\">\n" +
    "          <a href=\"\" ng-click=\"$ctrl.entitiesCount()\">\n" +
    "            {{'analysis.entities-count.action' | translate}}</a>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "\n" +
    "    <a obiba-file-download get-url=\"$ctrl.download()\" target=\"_self\" download class=\"action btn btn-info btn-responsive\">\n" +
    "      <i class=\"fa fa-download\"></i> {{'download' | translate}}\n" +
    "    </a>\n" +
    "\n" +
    "    <span ng-if=\"$ctrl.micaConfigShowOpalViews\">\n" +
    "      <a obiba-file-download get-url=\"$ctrl.opalExport()\" target=\"_self\" class=\"action btn btn-primary btn-responsive\" download title=\"{{'sets.opal-views-download-button-help' | translate}}\">\n" +
    "        <i class=\"fa fa-download\"></i> {{'sets.opal-views-download-button-text' | translate}}\n" +
    "      </a>\n" +
    "    </span>\n" +
    "\n" +
    "    <a ng-if=\"$ctrl.micaConfigShowSearch\" href=\"\" ng-click=\"$ctrl.search()\" class=\"action btn btn-info btn-responsive\">\n" +
    "      <i class=\"fa fa-search\"></i>\n" +
    "    </a>\n" +
    "\n" +
    "    <a href=\"\" ng-click=\"$ctrl.clearSet()\" ng-disabled=\"!$ctrl.hasSelections()\" class=\"action btn btn-danger btn-responsive\">\n" +
    "      <i class=\"fa fa-trash-o\"></i>\n" +
    "    </a>\n" +
    "  </div>\n" +
    "  <div ng-show=\"$ctrl.pagination.pageCount > 1\" class=\"pull-right\">\n" +
    "    <span\n" +
    "          uib-pagination\n" +
    "          total-items=\"$ctrl.pagination.totalHits\"\n" +
    "          max-size=\"$ctrl.pagination.maxSize\"\n" +
    "          ng-model=\"$ctrl.pagination.currentPage\"\n" +
    "          boundary-links=\"true\"\n" +
    "          force-ellipses=\"true\"\n" +
    "          items-per-page=\"$ctrl.pagination.itemsPerPage\"\n" +
    "          previous-text=\"&lsaquo;\"\n" +
    "          next-text=\"&rsaquo;\"\n" +
    "          first-text=\"&laquo;\"\n" +
    "          last-text=\"&raquo;\"\n" +
    "          template-url=\"sets/views/list/pagination-template.html\"\n" +
    "          ng-change=\"$ctrl.pageChanged()\"></span>\n" +
    "    <ul class=\"pagination pagination-sm\">\n" +
    "      <li>\n" +
    "        <a href class=\"pagination-total\">{{$ctrl.pagination.from}} - {{$ctrl.pagination.to}} {{'of' | translate}} {{$ctrl.pagination.totalHits}}</a>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "  <div class=\"clearfix\"></div>\n" +
    "  <div class=\"table-responsive\">\n" +
    "    <table-alert-header\n" +
    "      all-selected=\"$ctrl.allSelected\"\n" +
    "      on-select-all=\"$ctrl.updateAllSelected()\"\n" +
    "      ng-show=\"$ctrl.allPageSelected[$ctrl.pagination.currentPage]\">\n" +
    "    </table-alert-header>\n" +
    "    <table class=\"table table-bordered table-striped table-layout-fixed\" ng-if=\"$ctrl.documents.total>0\">\n" +
    "      <thead>\n" +
    "        <th class=\"col-width-xs\">\n" +
    "            <input\n" +
    "            ng-model=\"$ctrl.allPageSelected[$ctrl.pagination.currentPage]\"\n" +
    "            type=\"checkbox\"\n" +
    "            ng-click=\"$ctrl.updateAllCurrentPageSelected()\"/>\n" +
    "        </th>\n" +
    "        <th class=\"col-width-md\" translate>taxonomy.target.variable</th>\n" +
    "        <th class=\"col-width-md\" translate>search.variable.label</th>\n" +
    "        <th ng-if=\"$ctrl.options.variablesColumn.showVariablesTypeColumn\" translate>type</th>\n" +
    "        <th ng-if=\"$ctrl.options.variablesColumn.showVariablesStudiesColumn\" translate>search.study.label</th>\n" +
    "        <th class=\"col-width-10\" translate ng-if=\"$ctrl.options.variablesColumn.showVariablesStudiesColumn\">search.study.population-name</th>\n" +
    "        <th class=\"col-width-10\" translate ng-if=\"$ctrl.options.variablesColumn.showVariablesStudiesColumn\">search.study.dce-name</th>\n" +
    "        <th ng-if=\"$ctrl.options.variablesColumn.showVariablesDatasetsColumn\" translate>search.dataset.label</th>\n" +
    "      </thead>\n" +
    "      <tbody>\n" +
    "        <tr ng-repeat=\"row in $ctrl.table.rows\">\n" +
    "          <td>\n" +
    "              <input\n" +
    "              ng-model=\"$ctrl.selections[row[0].value]\"\n" +
    "              type=\"checkbox\"\n" +
    "              ng-click=\"$ctrl.updateSelection(row[0].value)\"/>\n" +
    "          </td>\n" +
    "          <td><a href=\"{{row[1].link}}\">{{row[1].value}}</a></td>\n" +
    "          <td>{{row[2].value}}</td>\n" +
    "          <td ng-if=\"$ctrl.options.variablesColumn.showVariablesTypeColumn\">{{'search.variable.' + row[3].value.toLowerCase() | translate}}</td>\n" +
    "          <td ng-if=\"$ctrl.options.variablesColumn.showVariablesStudiesColumn\"><a href=\"{{row[4].link}}\">{{row[4].value}}</a></td>\n" +
    "          <td ng-if=\"$ctrl.options.variablesColumn.showVariablesStudiesColumn\"><a href=\"{{row[5].link}}\">{{row[5].value}}</a></td>\n" +
    "          <td ng-if=\"$ctrl.options.variablesColumn.showVariablesStudiesColumn\">\n" +
    "            <a ng-if=\"row[6].link\" href=\"{{row[6].link}}\">{{row[6].value}}</a>\n" +
    "            <span ng-if=\"!row[6].link\">-</span>\n" +
    "          </td>\n" +
    "          <td ng-if=\"$ctrl.options.variablesColumn.showVariablesDatasetsColumn\"><a href=\"{{row[7].link}}\">{{row[7].value}}</a></td>\n" +
    "        </tr>\n" +
    "      </tbody>\n" +
    "    </table>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("sets/components/set-variables-table/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("sets/components/set-variables-table/component.html",
    "<div>\n" +
    "  <div class=\"pull-left\" ng-show=\"$ctrl.documents.total>0\">\n" +
    "    <a href=\"\" ng-click=\"$ctrl.addToSet(type)\" class=\"action btn btn-info btn-responsive\">\n" +
    "      <i class=\"fa fa-plus\"></i> {{'sets.add.button.set-label' | translate}}\n" +
    "    </a>\n" +
    "\n" +
    "    <div ng-if=\"$ctrl.showAnalysis()\" class=\"btn-group\" uib-dropdown is-open=\"$ctrl.analysis.isopen\">\n" +
    "      <button id=\"single-button\" type=\"button\" class=\"btn btn-primary\" uib-dropdown-toggle ng-disabled=\"disabled\">\n" +
    "        <i class=\"fa fa-cog\"></i> {{'analysis.action' | translate}} <span class=\"caret\"></span>\n" +
    "      </button>\n" +
    "      <ul class=\"dropdown-menu\" uib-dropdown-menu role=\"menu\" aria-labelledby=\"single-button\">\n" +
    "        <li role=\"menuitem\">\n" +
    "          <a href=\"\" ng-click=\"$ctrl.entitiesCount()\">\n" +
    "            {{'analysis.entities-count.action' | translate}}</a>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "\n" +
    "    <a obiba-file-download get-url=\"$ctrl.download()\" target=\"_self\" download class=\"action btn btn-info btn-responsive\">\n" +
    "      <i class=\"fa fa-download\"></i> {{'download' | translate}}\n" +
    "    </a>\n" +
    "\n" +
    "    <span ng-if=\"$ctrl.micaConfigShowOpalViews\">\n" +
    "      <a obiba-file-download get-url=\"$ctrl.opalExport()\" target=\"_self\" class=\"action btn btn-primary btn-responsive\" download title=\"{{'sets.opal-views-download-button-help' | translate}}\">\n" +
    "        <i class=\"fa fa-download\"></i> {{'sets.opal-views-download-button-text' | translate}}\n" +
    "      </a>\n" +
    "    </span>\n" +
    "\n" +
    "    <a ng-if=\"$ctrl.micaConfigShowSearch\" href=\"\" ng-click=\"$ctrl.search()\" class=\"action btn btn-info btn-responsive\">\n" +
    "      <i class=\"fa fa-search\"></i>\n" +
    "    </a>\n" +
    "\n" +
    "    <a href=\"\" ng-click=\"$ctrl.clearSet()\" ng-disabled=\"!$ctrl.hasSelections()\" class=\"action btn btn-danger btn-responsive\">\n" +
    "      <i class=\"fa fa-trash-o\"></i>\n" +
    "    </a>\n" +
    "  </div>\n" +
    "\n" +
    "  <div ng-show=\"$ctrl.pagination.pageCount > 1\" class=\"pull-right\">\n" +
    "    <span\n" +
    "      uib-pagination\n" +
    "      total-items=\"$ctrl.pagination.totalHits\"\n" +
    "      max-size=\"$ctrl.pagination.maxSize\"\n" +
    "      ng-model=\"$ctrl.pagination.currentPage\"\n" +
    "      boundary-links=\"true\"\n" +
    "      force-ellipses=\"true\"\n" +
    "      items-per-page=\"$ctrl.pagination.itemsPerPage\"\n" +
    "      previous-text=\"&lsaquo;\"\n" +
    "      next-text=\"&rsaquo;\"\n" +
    "      first-text=\"&laquo;\"\n" +
    "      last-text=\"&raquo;\"\n" +
    "      template-url=\"sets/views/list/pagination-template.html\"\n" +
    "      ng-change=\"$ctrl.pageChanged()\"></span>\n" +
    "\n" +
    "    <ul class=\"pagination pagination-sm\">\n" +
    "      <li>\n" +
    "        <a href class=\"pagination-total\">{{$ctrl.pagination.from}} - {{$ctrl.pagination.to}} {{'of' | translate}}\n" +
    "          {{$ctrl.pagination.totalHits}}</a>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "  <div class=\"clearfix\"></div>\n" +
    "\n" +
    "  <div class=\"table-responsive\">\n" +
    "    <table-alert-header\n" +
    "      all-selected=\"$ctrl.allSelected\"\n" +
    "      on-select-all=\"$ctrl.updateAllSelected()\"\n" +
    "      ng-show=\"$ctrl.allPageSelected[$ctrl.pagination.currentPage]\">\n" +
    "    </table-alert-header>\n" +
    "    <table class=\"table table-bordered table-striped table-layout-fixed\" ng-if=\"$ctrl.documents.total>0\">\n" +
    "      <thead>\n" +
    "        <th class=\"checkbox-width\">\n" +
    "          <input ng-model=\"$ctrl.allPageSelected[$ctrl.pagination.currentPage]\" type=\"checkbox\" ng-click=\"$ctrl.updateAllCurrentPageSelected()\" />\n" +
    "        </th>\n" +
    "        <th class=\"col-width-md\" translate>taxonomy.target.variable</th>\n" +
    "        <th class=\"col-width-md\" translate>search.variable.label</th>\n" +
    "        <th ng-if=\"$ctrl.options.variablesColumn.showVariablesTypeColumn\" translate>type</th>\n" +
    "        <th ng-if=\"$ctrl.options.variablesColumn.showVariablesStudiesColumn\" translate>search.study.label</th>\n" +
    "        <th class=\"col-width-10\" translate ng-if=\"$ctrl.options.variablesColumn.showVariablesStudiesColumn\">search.study.population-name</th>\n" +
    "        <th class=\"col-width-10\" translate ng-if=\"$ctrl.options.variablesColumn.showVariablesStudiesColumn\">search.study.dce-name</th>\n" +
    "        <th class=\"col-width-15\" ng-if=\"$ctrl.options.variablesColumn.showVariablesDatasetsColumn\" translate>search.dataset.label</th>\n" +
    "      </thead>\n" +
    "      <tbody>\n" +
    "        <tr ng-repeat=\"row in $ctrl.table.rows\">\n" +
    "          <td>\n" +
    "            <input ng-model=\"$ctrl.selections[row[0].value]\" type=\"checkbox\" ng-click=\"$ctrl.updateSelection(row[0].value)\" />\n" +
    "          </td>\n" +
    "          <td><a href=\"{{row[1].link}}\">{{row[1].value}}</a></td>\n" +
    "          <td>{{row[2].value}}</td>\n" +
    "          <td ng-if=\"$ctrl.options.variablesColumn.showVariablesTypeColumn\">{{'search.variable.' + row[3].value.toLowerCase() | translate}}</td>\n" +
    "          <td ng-if=\"$ctrl.options.variablesColumn.showVariablesStudiesColumn\"><a href=\"{{row[4].link}}\">{{row[4].value}}</a></td>\n" +
    "          <td ng-if=\"$ctrl.options.variablesColumn.showVariablesStudiesColumn\"><a href=\"{{row[5].link}}\">{{row[5].value}}</a></td>\n" +
    "          <td ng-if=\"$ctrl.options.variablesColumn.showVariablesStudiesColumn\">\n" +
    "            <a ng-if=\"row[6].link\" href=\"{{row[6].link}}\">{{row[6].value}}</a>\n" +
    "            <span ng-if=\"!row[6].link\">-</span>\n" +
    "          </td>\n" +
    "          <td ng-if=\"$ctrl.options.variablesColumn.showVariablesDatasetsColumn\"><a href=\"{{row[7].link}}\">{{row[7].value}}</a></td>\n" +
    "        </tr>\n" +
    "      </tbody>\n" +
    "    </table>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("sets/views/cart.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("sets/views/cart.html",
    "<div>\n" +
    "  <div ng-if=\"cartHeaderTemplateUrl\" ng-include=\"cartHeaderTemplateUrl\"></div>\n" +
    "  <h3>\n" +
    "    <span translate>variables</span>\n" +
    "    <span ng-if=\"loading\" class=\"voffset2 loading\"></span>\n" +
    "  </h3>\n" +
    "\n" +
    "  <div ng-repeat=\"tab in tabs\" >\n" +
    "    <cart-documents-table ng-if=\"'variables' === tab.type\"\n" +
    "                         type=\"tab.type\"\n" +
    "                         documents=\"variables\"\n" +
    "                         on-update=\"onUpdate\"\n" +
    "                         options=\"tab.options\"\n" +
    "                         on-page-change=\"onPaginate\"></cart-documents-table>\n" +
    "\n" +
    "    <p ng-hide=\"loading || variables && variables.total>0\" translate>sets.cart.no-variables</p>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("sets/views/list/pagination-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("sets/views/list/pagination-template.html",
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
    "</span>");
}]);

angular.module("sets/views/sets.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("sets/views/sets.html",
    "<div>\n" +
    "  <div ng-if=\"setsHeaderTemplateUrl\" ng-include=\"setsHeaderTemplateUrl\"></div>\n" +
    "\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-md-3\">\n" +
    "      <uib-accordion close-others=\"false\">\n" +
    "        <div uib-accordion-group class=\"panel-default\" ng-repeat=\"tab in useableTabs\" is-open=\"true\">\n" +
    "\n" +
    "          <div uib-accordion-heading>\n" +
    "            <span>\n" +
    "              {{tab.title | localizedString}}\n" +
    "            </span>\n" +
    "\n" +
    "            <a ng-if=\"canDelete[tab.name]\" class=\"pull-right\" href ng-click=\"$event.stopPropagation(); deleteChecked(tab.name)\">\n" +
    "              <i class=\"fa fa-trash-o\"></i>\n" +
    "            </a>\n" +
    "          </div>\n" +
    "\n" +
    "          <span ng-if=\"!sets[tab.name].length\" translate>sets.empty</span>\n" +
    "\n" +
    "          <ul class=\"nav nav-pills nav-stacked\">\n" +
    "            <li role=\"presentation\" ng-repeat=\"set in sets[tab.name]\" ng-class=\"{'active': selectedSet.id === set.id}\">\n" +
    "\n" +
    "              <span class=\"checkbox no-margin-top no-margin-bottom\" >\n" +
    "                <input class=\"margin-top-10 margin-left--5\" type=\"checkbox\" ng-model=\"checked[tab.name][set.id]\" ng-click=\"$event.stopPropagation(); check(tab.name);\">\n" +
    "              </span>\n" +
    "              <a class=\"flex margin-left-10\" href ng-click=\"$event.stopPropagation(); selectSet(tab.name, set);\">\n" +
    "                <span class=\"flex-item3\">{{set.name}}</span>\n" +
    "                <span class=\"flex-item1 text-right text-muted\">{{set.count}}</span>\n" +
    "              </a>\n" +
    "            </li>\n" +
    "          </ul>\n" +
    "        </div>\n" +
    "      </uib-accordion>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"col-md-9\">\n" +
    "      <span ng-if=\"loading\" class=\"voffset2 loading\"></span>\n" +
    "      <div ng-repeat=\"tab in tabs\" >\n" +
    "        <set-variables-table ng-if=\"'variables' === tab.type\"\n" +
    "                             set-id=\"selectedSet.id\"\n" +
    "                             type=\"tab.type\"\n" +
    "                             options=\"tab.options\"\n" +
    "                             documents=\"documents\"\n" +
    "                             on-update=\"onUpdate\"\n" +
    "                             on-page-change=\"onPaginate\"></set-variables-table>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("utils/components/entity-schema-form/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("utils/components/entity-schema-form/component.html",
    "<div sf-model=\"$ctrl.model\" sf-form=\"$ctrl.form.definition\" sf-schema=\"$ctrl.form.schema\" sf-options=\"$ctrl.sfOptions\"></div>");
}]);

angular.module("utils/components/table-alert-header/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("utils/components/table-alert-header/component.html",
    "<div class=\"alert alert-warning actions-select\">\n" +
    "  <span ng-hide=\"$ctrl.allSelected\">\n" +
    "    <a href ng-click=\"$ctrl.selectAll()\" class=\"hoffset1\">\n" +
    "      <i class=\"fa fa-square-o\"></i>\n" +
    "      <strong><span translate>table-selections.select-all</span></strong>\n" +
    "    </a>\n" +
    "    <strong><span class=\"pull-right\" translate>table-selections.all-page-selected</span></strong>\n" +
    "  </span>\n" +
    "  <span ng-show=\"$ctrl.allSelected\">\n" +
    "    <a href ng-click=\"$ctrl.selectAll()\" class=\"hoffset1\">\n" +
    "      <i class=\"fa fa-check-square-o\"></i>\n" +
    "      <b><span translate>table-selections.unselect-all</span></b>\n" +
    "    </a>\n" +
    "  <strong><span class=\"pull-right\" translate>table-selections.all-selected</span></strong>\n" +
    "  </span>\n" +
    "</div>\n" +
    "");
}]);

angular.module("utils/services/user-profile-modal/service.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("utils/services/user-profile-modal/service.html",
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
    "        <td>{{applicant.fullName}}</td>\n" +
    "      </tr>\n" +
    "      <tr>\n" +
    "        <th>{{'data-access-request.profile.email' | translate}}</th>\n" +
    "        <td>{{applicant.email}}</td>\n" +
    "      </tr>\n" +
    "      <tr ng-repeat=\"attribute in applicant.profile.attributes | filterProfileAttributes\">\n" +
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
    "    <a class=\"btn btn-default\" ng-if=\"applicant.email\" href=\"mailto:{{applicant.email}}\" target=\"_blank\">\n" +
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
    "</ul>\n" +
    "\n" +
    "<ul class=\"pagination no-margin pagination-sm\" ng-if=\"1 === pages.length\">\n" +
    "  <li>\n" +
    "    <a href=\"\" class=\"pagination-total\" class=\"pagination-total\"><span>{{'total' | translate}} {{ range.total }}</span></a>\n" +
    "  </li>\n" +
    "</ul>\n" +
    "\n" +
    "");
}]);
