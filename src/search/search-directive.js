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
