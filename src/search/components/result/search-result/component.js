'use strict';

/* global DISPLAY_TYPES */
/* global QUERY_TYPES */

ngObibaMica.search
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
      $scope.activeTarget[QUERY_TYPES.VARIABLES] = { active: false, name: QUERY_TARGETS.VARIABLE, totalHits: 0 };
      $scope.activeTarget[QUERY_TYPES.DATASETS] = { active: false, name: QUERY_TARGETS.DATASET, totalHits: 0 };
      $scope.activeTarget[QUERY_TYPES.STUDIES] = { active: false, name: QUERY_TARGETS.STUDY, totalHits: 0 };
      $scope.activeTarget[QUERY_TYPES.NETWORKS] = { active: false, name: QUERY_TARGETS.NETWORK, totalHits: 0 };

      $scope.getUrlTemplate = function (tab) {
        switch (tab) {
          case 'list':
            console.log(ngObibaMicaSearchTemplateUrl.getTemplateUrl('searchResultList'));
            return ngObibaMicaSearchTemplateUrl.getTemplateUrl('searchResultList');
          case 'coverage':
            console.log(ngObibaMicaSearchTemplateUrl.getTemplateUrl('searchResultCoverage'));
            return ngObibaMicaSearchTemplateUrl.getTemplateUrl('searchResultCoverage');
          case 'graphics':
            console.log(ngObibaMicaSearchTemplateUrl.getTemplateUrl('searchResultGraphics'));
            return ngObibaMicaSearchTemplateUrl.getTemplateUrl('searchResultGraphics');
        }
      };

      $scope.selectType = function (type) {
        updateType(type);
        $scope.type = type;
        $scope.$parent.onTypeChanged(type);
      };

      $scope.getTotalHits = function (type) {
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
      templateUrl: 'search/components/result/search-result/component.html'
    };
  }]);