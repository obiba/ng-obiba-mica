'use strict';

angular.module('obiba.mica.utils', ['schemaForm'])

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
            console.log('do redrawTable');
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

  .config(['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfBuilderProvider',
    function (schemaFormProvider, schemaFormDecoratorsProvider, sfBuilderProvider) {
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
      
      schemaFormDecoratorsProvider.defineAddOn(
        'bootstrapDecorator',
        'checkboxgroup',
        'templates/checkboxgroup-template.html',
        sfBuilderProvider.stdBuilders
      );
  }])

  .run(function ($templateCache) {
    $templateCache.put('templates/checkboxgroup-template.html', '<div class="checkboxgroup schema-form-checkboxgroup {{form.HtmlClass}}"><div ng-controller="schemaFormCheckboxgroupController"><div class="has-error" ng-show="showMessage"><span class="help-block">{{message}}</span></div></div></div>');
  })

  .controller('schemaFormCheckboxgroupController', ['$scope', function ($scope) {
    var keys = $scope.form.items.map(function (val) { return val.key[0]; });
    var min = $scope.form.minChecked ? parseInt($scope.form.minChecked) : 0;
    $scope.showMessage = false;
    $scope.message = 'Minimum ' + min + '.';

    var models = [];

    if ($scope.model) {
      $scope.$on('schemaFormValidate', function () {
        models = keys.map(function (k) {
          return $scope.model[k];
        });

        var enough = models.filter(function (e) { return e; }).length >= min;
        if (enough) {
          $scope.$broadcast('schemaForm.error', 'minimumChecked', true);
          $scope.showMessage = false;
        } else {
          $scope.$broadcast('schemaForm.error', 'minimumChecked', false);
          $scope.showMessage = true;
        }
      });
    }
  }]);
