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


/* exported CRITERIA_ITEM_EVENT */
var CRITERIA_ITEM_EVENT = {
  deleted: 'event:delete-criteria-item',
  refresh: 'event:refresh-criteria-item'
};

ngObibaMica.search  
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
