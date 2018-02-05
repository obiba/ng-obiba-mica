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

  }]);
