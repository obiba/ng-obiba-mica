'use strict';



/* exported NgObibaMicaTemplateUrlProvider */
function NgObibaMicaTemplateUrlProvider() {
  var registry = {header: null, footer: null};

  function TemplateUrlProvider(registry) {
    var urlRegistry = registry;

    this.getHeaderUrl =function() {
      return urlRegistry.header;
    };

    this.getFooterUrl =function() {
      return urlRegistry.footer;
    };
  }

  this.setHeaderUrl = function(url) {
    registry.header = url;
  };

  this.setFooterUrl = function(url) {
    registry.footer = url;
  };

  this.$get = function() {
    return new TemplateUrlProvider(registry);
  };
}

angular.module('ngObibaMica', [
  'schemaForm',
  'obiba.mica.utils',
  'obiba.mica.file',
  'obiba.mica.attachment',
  'obiba.mica.access'
])
  .constant('USER_ROLES', {
    all: '*',
    admin: 'mica-administrator',
    reviewer: 'mica-reviewer',
    editor: 'mica-editor',
    user: 'mica-user',
    dao: 'mica-data-access-officer'
  })
  .config(['$provide', function($provide) {
    $provide.provider('ngObibaMicaUrl', function NgObibaMicaUrlProvider() {
      var registry = {
        'DataAccessFormConfigResource': 'ws/config/data-access-form',
        'DataAccessRequestsResource': 'ws/data-access-requests',
        'DataAccessRequestResource': 'ws/data-access-request/:id',
        'DataAccessRequestCommentsResource': 'ws/data-access-request/:id/comments',
        'DataAccessRequestCommentResource': 'ws/data-access-request/:id/comment/:commentId',
        'DataAccessRequestStatusResource': 'ws/data-access-request/:id/_status?to=:status',
        'TempFileUploadResource': 'ws/files/temp',
        'TempFileResource': 'ws/files/temp/:id'
      };

      function UrlProvider(registry) {
        var urlRegistry = registry;

        this.getUrl =function(resource) {
          if (resource in urlRegistry) {
            return urlRegistry[resource];
          }

          return null;
        };
      }

      this.setUrl = function(key, url) {
        if (key in registry) {
          registry[key] = url;
        }
      };

      this.$get = function() {
        return new UrlProvider(registry);
      };
    });
  }]);

