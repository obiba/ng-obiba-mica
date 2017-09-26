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

angular.module('obiba.mica.lists.search.widget',['obiba.mica.lists'])
  .controller('listSearchWidgetController', ['$scope', '$rootScope',
    function ($scope, $rootScope) {
      var emitter = $rootScope.$new();
      $scope.onKeypress = function (ev) {
        if(ev.keyCode === 13){
          emitter.$emit('ngObibaMicaSearch.searchChange', $scope.searchFilter);
        }
      };
      $scope.search = function(){
        emitter.$emit('ngObibaMicaSearch.searchChange', $scope.searchFilter);
      };
    }])
  .directive('listSearchWidget', [function () {
    return {
      restrict: 'EA',
      scope: {
        searchItm: '='
      },
      controller: 'listSearchWidgetController',
      templateUrl: 'lists/component/input-search-widget/list-search-widget-template.html'
    };
  }]);
