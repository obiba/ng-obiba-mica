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

ngObibaMica.attachment
  .directive('attachmentList', [function() {
    return {
      restrict: 'E',
      scope: {
        hrefBuilder: '=',
        files: '=',
        emptyMessage: '='
      },
      templateUrl: 'attachment/attachment-list-template.html',
      link: function(scope) {
        scope.attachments = [];
        scope.hrefBuilder = scope.hrefBuilder || function(a) { return a.id; };
        scope.hasAttachments = false;

        scope.$watch('files', function(val) {
          scope.attachments = [];
          if (val) {
            scope.hasAttachments = val.length > 0;
            scope.attachments = val.map(function (a) {
              var temp = angular.copy(a);
              temp.href = scope.hrefBuilder(a);
              return temp;
            });
          }
        }, true);
      }
    };
  }])
  .directive('attachmentInput', [function () {
    return {
      restrict: 'E',
      require: '^form',
      scope: {
        multiple: '=',
        accept: '@',
        files: '=',
        disabled: '=',
        onError:'=',
        deleteAttachments: '<'
      },
      templateUrl: 'attachment/attachment-input-template.html',
      controller: 'AttachmentCtrl'
    };
  }])
  .controller('AttachmentCtrl', ['$scope', '$timeout', '$log', 'Upload', 'TempFileResource', 'ngObibaMicaUrl',
    function ($scope, $timeout, $log, Upload, TempFileResource, ngObibaMicaUrl) {
    if($scope.deleteAttachments === undefined || $scope.deleteAttachments === null){
        $scope.deleteAttachments = true;
      }
      var uploadFile = function (file) {
        $scope.files = $scope.files || [];

        var attachment = {
          showProgressBar: true,
          lang: 'en',
          progress: 0,
          fileName: file.name,
          size: file.size
        };

        if ($scope.multiple) {
          $scope.files.push(attachment);
        } else {
          $scope.files.splice(0, $scope.files.length);
          $scope.files.push(attachment);
        }

        $scope.upload = Upload
          .upload({
            url: ngObibaMicaUrl.getUrl('TempFileUploadResource'),
            method: 'POST',
            file: file
          })
          .progress(function (evt) {
            attachment.progress = parseInt(100.0 * evt.loaded / evt.total);
          })
          .success(function (data, status, getResponseHeaders) {
            var parts = getResponseHeaders().location.split('/');
            var fileId = parts[parts.length - 1];
            TempFileResource.get(
              {id: fileId},
              function (tempFile) {
                $log.debug('tempFile', tempFile);
                attachment.id = tempFile.id;
                attachment.md5 = tempFile.md5;
                attachment.justUploaded = true;
                attachment.timestamps = {created: new Date()};
                // wait for 1 second before hiding progress bar
                $timeout(function () { attachment.showProgressBar = false; }, 1000);
              }
            );
          })
          .error(function(response){
            $log.error('File upload failed: ', JSON.stringify(response, null, 2));
            var index = $scope.files.indexOf(attachment);
            if (index !== -1) {
              $scope.files.splice(index, 1);
            }

            if ($scope.onError){
              $scope.onError(attachment);
            }
        });
      };

      $scope.onFileSelect = function (file) {
        $scope.uploadedFiles = file;
        $scope.uploadedFiles.forEach(function (f) {
          uploadFile(f);
        });
      };

      $scope.deleteTempFile = function (tempFileId) {
        TempFileResource.delete(
          {id: tempFileId},
          function () {
            for (var i = $scope.files.length; i--;) {
              var attachment = $scope.files[i];
              if (attachment.justUploaded && attachment.id === tempFileId) {
                $scope.files.splice(i, 1);
              }
            }
          }
        );
      };

      $scope.deleteFile = function (fileId) {
        for (var i = $scope.files.length; i--;) {
          if ($scope.files[i].id === fileId) {
            $scope.files.splice(i, 1);
          }
        }
      };
    }
  ]);
