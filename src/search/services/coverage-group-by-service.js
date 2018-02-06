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

/* global BUCKET_TYPES  */

(function () {
  ngObibaMica.search.CoverageGroupByService = function (ngObibaMicaSearch) {
    var self = this;

    var options = ngObibaMicaSearch.getOptions();
    var groupByOptions = options.coverage.groupBy;

    this.isSingleStudy = function () {
      // coverage => there are datasets and at least one study
      // not showing study means that there is only one
      return !options.studies.showSearchTab;
    };

    this.canShowStudy = function () {
      return groupByOptions.study || groupByOptions.dce;
    };

    this.canShowDce = function (bucket) {
      return (bucket.indexOf('study') > -1 || bucket.indexOf('dce') > -1) && groupByOptions.study && groupByOptions.dce;
    };

    this.canShowDataset = function () {
      return groupByOptions.dataset;
    };

    this.canShowVariableTypeFilter = function (bucket) {
      var forStudy = (bucket.indexOf('study') > -1 || bucket.indexOf('dce') > -1) && (groupByOptions.study);
      var forDataset = bucket.indexOf('dataset') > -1 && groupByOptions.dataset;

      return forStudy || forDataset;
    };

    this.studyTitle = function () {
      return 'search.coverage-buckets.study';
    };

    this.studyBucket = function () {
      return BUCKET_TYPES.STUDY;
    };

    this.dceBucket = function () {
      if (groupByOptions.study && groupByOptions.dce) {
        return BUCKET_TYPES.DCE;
      } else {
        return this.studyBucket();
      }
    };

    this.datasetTitle = function () {
      return 'search.coverage-buckets.dataset';
    };

    this.datasetBucket = function () {
      return BUCKET_TYPES.DATASET;
    };

    this.canGroupBy = function (bucket) {
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

    this.defaultBucket = function () {
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
  };

  ngObibaMica.search.service('CoverageGroupByService', ['ngObibaMicaSearch', ngObibaMica.search.CoverageGroupByService]);
})();