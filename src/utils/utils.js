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
  .factory('urlEncode', function() {
    return function(input) {
      return window.encodeURIComponent(input);
    };
  })
  .factory('MathFunction', function(){
    return {
      round: function(value, decimal){
        return +(Math.round(value + 'e+' + decimal)  + 'e-' + decimal);
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
              var columnWidth = Math.ceil(elem.querySelectorAll('thead')[0].offsetWidth/(elem.querySelectorAll('thead th').length || 1));

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
    }])
  
  .config(['localStorageServiceProvider', 
    function (localStorageServiceProvider) {
      localStorageServiceProvider
        .setPrefix('mica')
        .setStorageType('localStorage');
   }]);
})();