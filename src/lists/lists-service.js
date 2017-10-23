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

/* global targetToType */

angular.module('obiba.mica.lists')

  .service('sortWidgetService', ['$filter', '$location', 'RqlQueryService', 'sortWidgetOptions', function ($filter, $location, RqlQueryService, sortWidgetOptions) {
    var newOptions = sortWidgetOptions.getOptions();
    var self = this;
    this.getOrderOptions = function () {
      newOptions.orderField.options.map(function (option) {
        return $filter('translate')(option.label);
      });
      return {
        options: newOptions.orderField.options
      };
    };
    this.getSortOptions = function () {
      newOptions.sortField.options.map(function (option) {

        return $filter('translate')(option.label);
      });
      return {
        options: newOptions.sortField.options
      };
    };
    this.getSelectedSort = function (rqlSort) {
      var selectedSortOption = null;
      var sortBy = rqlSort ? rqlSort : newOptions.sortField.default;
      angular.forEach(self.getSortOptions().options, function (option) {
        if (option.value === sortBy) {
          selectedSortOption = option;
        }
      });
      return selectedSortOption;
    };

    this.getSelectedOrder = function (order) {
      var selectedOption = '';
      var orderBy = order ? order : newOptions.orderField.default;
      angular.forEach(self.getOrderOptions().options, function (option) {
        if (option.value === orderBy) {
          selectedOption = option;
        }
      });
      return selectedOption;
    };

    this.getSortArg = function () {
      var order = null;
      var search = $location.search();
      var rqlQuery = RqlQueryService.parseQuery(search.query);
      if (rqlQuery) {
        var rqlSort = RqlQueryService.getTargetQuerySort(targetToType(rqlQuery.args[0].name), rqlQuery);
        if (rqlSort) {
          order = rqlSort.args[0].substring(0, 1) === '-' ? '-' :  self.getSelectedOrder(null);
          rqlSort = rqlSort.args[0].substring(0, 1) === '-' ? rqlSort.args[0].substring(1) : rqlSort.args[0];
          return {slectedOrder: self.getSelectedOrder(order), selectedSort: self.getSelectedSort(rqlSort)};
        }
      }
      return {
        slectedOrder: self.getSelectedOrder(null),
        selectedSort: self.getSelectedSort(null)
      };
    };

    this.getLabel = function(selectSort, valueSort){
      var result = null;
      angular.forEach(selectSort.options, function (value) {
        if (value.value === valueSort) {
          result = value.label;
        }
      });
      return result;
    };

  }]);