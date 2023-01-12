'use strict';

/* global BaseTaxonomiesController */

(function () {
  /**
  * ClassificationPanelController
  * 
  * @param $rootScope
  * @param $scope
  * @param $translate
  * @param $location
  * @param MetaTaxonomyResource
  * @param TaxonomiesResource
  * @param ngObibaMicaSearch
  * @param RqlQueryUtils
  * @param $cacheFactory
  * @param VocabularyService
  * @constructor
  */
  function ClassificationPanelController($rootScope,
    $scope,
    $translate,
    $location,
    MetaTaxonomyResource,
    MetaTaxonomyMoveResource,
    MetaTaxonomyAttributeResource,
    TaxonomiesResource,
    ngObibaMicaSearch,
    RqlQueryUtils,
    VocabularyService) {
    BaseTaxonomiesController.call(this,
      $rootScope,
      $scope,
      $translate,
      $location,
      MetaTaxonomyResource,
      MetaTaxonomyMoveResource,
      MetaTaxonomyAttributeResource,
      ngObibaMicaSearch,
      RqlQueryUtils,
      VocabularyService);

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
              } else {
                taxonomy.attributes = v.attributes;
              }
            }
            if (taxonomy.attributes) {
              taxonomy.attributes.forEach(attr => taxonomy.props[attr.key] = attr.value);
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
              } else {
                taxonomy.attributes = t.attributes;
              }
            }
            taxonomy.props = {};  
            if (taxonomy.attributes) {
              taxonomy.attributes.forEach(attr => taxonomy.props[attr.key] = attr.value);
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
      'RqlQueryUtils',
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