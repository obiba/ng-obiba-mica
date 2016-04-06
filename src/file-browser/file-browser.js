'use strict';

function NgObibaMicaFileBrowserOptionsProvider() {
  var options = {
    folders: {
      excludes: ['population']
    }
  };

  this.$get = function () {
    return options;
  };
}

angular.module('obiba.mica.fileBrowser', [
  'pascalprecht.translate',
  'ui.bootstrap',
  'templates-ngObibaMica'
]).config(['$provide', function ($provide) {
  $provide.provider('ngObibaMicaFileBrowserOptions', new NgObibaMicaFileBrowserOptionsProvider());
}]);
