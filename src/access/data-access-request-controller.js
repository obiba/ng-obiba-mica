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

ngObibaMica.access
  .controller('DataAccessRequestListController', ['$rootScope',
    '$scope',
    '$uibModal',
    'DataAccessRequestsResource',
    'DataAccessRequestResource',
    'DataAccessRequestService',
    'NOTIFICATION_EVENTS',
    'SessionProxy',
    'USER_ROLES',
    'ngObibaMicaAccessTemplateUrl',
    'DataAccessRequestConfig',
    'ngObibaMicaUrl',
    '$translate',

    function ($rootScope,
              $scope,
              $uibModal,
              DataAccessRequestsResource,
              DataAccessRequestResource,
              DataAccessRequestService,
              NOTIFICATION_EVENTS,
              SessionProxy,
              USER_ROLES,
              ngObibaMicaAccessTemplateUrl,
              DataAccessRequestConfig,
              ngObibaMicaUrl,
              $translate) {

      var onSuccess = function(reqs) {
        for (var i = 0; i < reqs.length; i++) {
          var req = reqs[i];
          if (req.status !== 'OPENED') {
            for (var j = 0; j < req.statusChangeHistory.length; j++) {
              var change = req.statusChangeHistory[j];
              if (change.from === 'OPENED' && change.to === 'SUBMITTED') {
                req.submissionDate = change.changedOn;
              }
            }
          }
        }
        $scope.requests = reqs;
        $scope.loading = false;
      };

      var onError = function() {
        $scope.loading = false;
      };

      DataAccessRequestService.getStatusFilterData(function(translated) {
        $scope.REQUEST_STATUS  = translated;
      });

      $scope.headerTemplateUrl = ngObibaMicaAccessTemplateUrl.getHeaderUrl('list');
      $scope.footerTemplateUrl = ngObibaMicaAccessTemplateUrl.getFooterUrl('list');
      $scope.config = DataAccessRequestConfig.getOptions();
      $scope.searchStatus = {};
      $scope.loading = true;
      DataAccessRequestsResource.query({}, onSuccess, onError);
      $scope.actions = DataAccessRequestService.actions;
      $scope.showApplicant = SessionProxy.roles().filter(function(role) {
        return [USER_ROLES.dao, USER_ROLES.admin].indexOf(role) > -1;
      }).length > 0;

      $scope.deleteRequest = function (request) {
        $scope.requestToDelete = request.id;
        $rootScope.$broadcast(NOTIFICATION_EVENTS.showConfirmDialog,
          {
            titleKey: 'data-access-request.delete-dialog.title',
            messageKey:'data-access-request.delete-dialog.message',
            messageArgs: [request.title, request.applicant]
          }, request.id
        );
      };

      $scope.userProfile = function (profile) {
        $scope.applicant = profile;
        $uibModal.open({
          scope: $scope,
          templateUrl: 'access/views/data-access-request-profile-user-modal.html'
        });
      };

      var getAttributeValue = function(attributes, key) {
        var result = attributes.filter(function (attribute) {
          return attribute.key === key;
        });

        return result && result.length > 0 ? result[0].value : null;
      };

      $scope.getFullName = function (profile) {
        if (profile) {
          if (profile.attributes) {
            return getAttributeValue(profile.attributes, 'firstName') + ' ' + getAttributeValue(profile.attributes, 'lastName');
          }
          return profile.username;
        }
        return null;
      };

      $scope.getProfileEmail = function (profile) {
        if (profile) {
          if (profile.attributes) {
            return getAttributeValue(profile.attributes, 'email');
          }
        }
        return null;
      };

      $scope.getCsvExportHref = function () {
        return ngObibaMicaUrl.getUrl('DataAccessRequestsExportCsvResource').replace(':lang', $translate.use());
      };

      $scope.getDataAccessRequestPageUrl = function () {
        var DataAccessClientDetailPath = ngObibaMicaUrl.getUrl('DataAccessClientDetailPath');
        if(DataAccessClientDetailPath){
          return ngObibaMicaUrl.getUrl('BaseUrl') + ngObibaMicaUrl.getUrl('DataAccessClientDetailPath');
        }
        else{
          return null;
        }
      };

      $scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, function (event, id) {
        if ($scope.requestToDelete === id) {
          DataAccessRequestResource.delete({id: $scope.requestToDelete},
            function () {
              $scope.loading = true;
              DataAccessRequestsResource.query({}, onSuccess, onError);
            });

          delete $scope.requestToDelete;
        }
      });
    }])

  .controller('DataAccessRequestViewController',
    ['$rootScope',
      '$scope',
      '$location',
      '$uibModal',
      '$routeParams',
      '$filter',
      '$translate',
      'DataAccessRequestResource',
      'DataAccessRequestService',
      'DataAccessRequestStatusResource',
      'DataAccessFormConfigResource',
      'JsonUtils',
      'DataAccessRequestAttachmentsUpdateResource',
      'DataAccessRequestCommentsResource',
      'DataAccessRequestCommentResource',
      'ngObibaMicaUrl',
      'ngObibaMicaAccessTemplateUrl',
      'AlertService',
      'ServerErrorUtils',
      'NOTIFICATION_EVENTS',
      'DataAccessRequestConfig',
      'LocalizedSchemaFormService',
      'SfOptionsService',
      'moment',
      '$timeout',

    function ($rootScope,
              $scope,
              $location,
              $uibModal,
              $routeParams,
              $filter,
              $translate,
              DataAccessRequestResource,
              DataAccessRequestService,
              DataAccessRequestStatusResource,
              DataAccessFormConfigResource,
              JsonUtils,
              DataAccessRequestAttachmentsUpdateResource,
              DataAccessRequestCommentsResource,
              DataAccessRequestCommentResource,
              ngObibaMicaUrl,
              ngObibaMicaAccessTemplateUrl,
              AlertService,
              ServerErrorUtils,
              NOTIFICATION_EVENTS,
              DataAccessRequestConfig,
              LocalizedSchemaFormService,
              SfOptionsService,
              moment,
              $timeout) {

      var onError = function (response) {
        AlertService.alert({
          id: 'DataAccessRequestViewController',
          type: 'danger',
          msg: ServerErrorUtils.buildMessage(response)
        });
      };

      function onAttachmentError(attachment) {
        AlertService.alert({
          id: 'DataAccessRequestViewController',
          type: 'danger',
          msgKey: 'server.error.file.upload',
          msgArgs: [attachment.fileName]
        });
      }

      var retrieveComments = function() {
        $scope.form.comments = DataAccessRequestCommentsResource.query({id: $routeParams.id});
      };

      var selectTab = function(id) {
        $scope.selectedTab = id;
        switch (id) {
          case 'form':
            break;
          case 'comments':
            retrieveComments();
            break;
        }
      };

      var submitComment = function(comment) {
        DataAccessRequestCommentsResource.save({id: $routeParams.id}, comment.message, retrieveComments, onError);
      };

      var updateComment = function(comment) {
        DataAccessRequestCommentResource.update({id: $routeParams.id, commentId: comment.id}, comment.message, retrieveComments, onError);
      };

      var deleteComment = function(comment) {
        $scope.commentToDelete = comment.id;

        $rootScope.$broadcast(NOTIFICATION_EVENTS.showConfirmDialog,
          {
            titleKey: 'comment.delete-dialog.title',
            messageKey:'comment.delete-dialog.message',
            messageArgs: [comment.createdBy]
          }, comment.id
        );
      };

      var toggleAttachmentsForm = function(show) {
        if (show) {
          $scope.attachments = angular.copy($scope.dataAccessRequest.attachments) || [];
        }
        $scope.showAttachmentsForm = show;
      };

      var getRequest = function () {
        return DataAccessRequestResource.get({id: $routeParams.id}, function onSuccess(request) {
          try {
            $scope.form.model = request.content ? JSON.parse(request.content) : {};
            var requestDownloadUrlPdf =  ngObibaMicaUrl.getUrl('DataAccessRequestDownloadPdfResource').replace(':id', $scope.dataAccessRequest.id);
            $scope.requestDownloadUrl = requestDownloadUrlPdf + ((requestDownloadUrlPdf.indexOf('?q=')!==-1)?'&':'?') +'lang=' + $translate.use();


            $scope.attachments = angular.copy(request.attachments) || [];
          } catch (e) {
            $scope.validForm = false;
            $scope.form.model = {};
            AlertService.alert({
              id: 'DataAccessRequestViewController',
              type: 'danger',
              msgKey: 'data-access-request.parse-error'
            });
          }

          initializeForm();

          request.attachments = request.attachments || [];

          $scope.lastSubmittedDate = findLastSubmittedDate();

          return request;
        });
      };

      var updateAttachments = function() {
        var request = angular.copy($scope.dataAccessRequest);
        request.attachments = $scope.attachments;
        DataAccessRequestAttachmentsUpdateResource.save(request, function() {
          toggleAttachmentsForm(false);
          $scope.dataAccessRequest = getRequest();
        });
      };

      function initializeForm() {
        SfOptionsService.transform().then(function(options) {
          $scope.sfOptions = options;
          $scope.sfOptions.pristine = {errors: true, success: false};
        });

        // Retrieve form data
        DataAccessFormConfigResource.get(
          function onSuccess(dataAccessForm) {
            $scope.form.definition = LocalizedSchemaFormService.translate(JsonUtils.parseJsonSafely(dataAccessForm.definition, []));
            $scope.form.schema = LocalizedSchemaFormService.translate(JsonUtils.parseJsonSafely(dataAccessForm.schema, {}));
            $scope.form.downloadTemplate = dataAccessForm.pdfDownloadType === 'Template';

            if ($scope.form.definition.length === 0) {
              $scope.validForm = false;
              $scope.form.definition = [];
              AlertService.alert({
                id: 'DataAccessRequestViewController',
                type: 'danger',
                msgKey: 'data-access-config.parse-error.definition'
              });
            }
            if (Object.getOwnPropertyNames($scope.form.schema).length === 0) {
              $scope.validForm = false;
              $scope.form.schema = {readonly: true};
              AlertService.alert({
                id: 'DataAccessRequestViewController',
                type: 'danger',
                msgKey: 'data-access-config.parse-error.schema'
              });
            }
            $scope.form.schema.readonly = true;

            $timeout(function () {
              $scope.form = angular.copy($scope.form);
              $scope.$broadcast('schemaFormRedraw');
            }, 250);
          },
          onError
        );
      }

      function findLastSubmittedDate() {
        var history = $scope.dataAccessRequest.statusChangeHistory || [];
        return history.filter(function(item) {
          return item.to === DataAccessRequestService.status.SUBMITTED;
        }).sort(function (a, b) {
          if (moment(a).isBefore(b)) {
            return -1;
          }

          if (moment(a).isSame(b)) {
            return 0;
          }

          if (moment(a).isAfter(b)) {
            return 1;
          }
        }).pop();
      }

      $scope.form = {
        schema: null,
        definition: null,
        model: {},
        comments: null
      };

      $scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, function (event, id) {
        if ($scope.commentToDelete === id) {
           DataAccessRequestCommentResource.delete({id: $routeParams.id, commentId: id}, {}, retrieveComments, onError);
        }
      });

      $scope.getDownloadHref = function(attachment) {
        return ngObibaMicaUrl.getUrl('DataAccessRequestAttachmentDownloadResource')
          .replace(':id', $scope.dataAccessRequest.id).replace(':attachmentId', attachment.id);
      };
      
      $scope.config = DataAccessRequestConfig.getOptions();
      $scope.actions = DataAccessRequestService.actions;
      $scope.nextStatus = DataAccessRequestService.nextStatus;
      $scope.selectTab = selectTab;
      $scope.submitComment = submitComment;
      $scope.updateComment = updateComment;
      $scope.deleteComment = deleteComment;
      $scope.showAttachmentsForm = false;
      $scope.updateAttachments = updateAttachments;
      $scope.cancelAttachments = function() {
        toggleAttachmentsForm(false);
      };
      $scope.editAttachments = function() {
        toggleAttachmentsForm(true);
      };
      $scope.onAttachmentError = onAttachmentError;
      $scope.headerTemplateUrl = ngObibaMicaAccessTemplateUrl.getHeaderUrl('view');
      $scope.footerTemplateUrl = ngObibaMicaAccessTemplateUrl.getFooterUrl('view');
      $scope.getStatusHistoryInfoId = DataAccessRequestService.getStatusHistoryInfoId;
      DataAccessRequestService.getStatusHistoryInfo(function(statusHistoryInfo) {
        $scope.getStatusHistoryInfo = statusHistoryInfo;
      });

      $scope.validForm = true;

      $scope.dataAccessRequest = $routeParams.id ? getRequest() : {};

      $scope.delete = function () {
        $scope.requestToDelete = $scope.dataAccessRequest.id;
        $rootScope.$broadcast(NOTIFICATION_EVENTS.showConfirmDialog,
          {
            titleKey: 'data-access-request.delete-dialog.title',
            messageKey:'data-access-request.delete-dialog.message',
            messageArgs: [$scope.dataAccessRequest.title, $scope.dataAccessRequest.applicant]
          }, $scope.requestToDelete
        );
      };

      $scope.$on(NOTIFICATION_EVENTS.confirmDialogAccepted, function (event, id) {
        if ($scope.requestToDelete === id) {
          DataAccessRequestResource.delete({id: $scope.requestToDelete},
            function () {
              $location.path('/data-access-requests').replace();
            });

          delete $scope.requestToDelete;
        }
      });

      var onUpdatStatusSuccess = function () {
        setTimeout(function () {
          $scope.dataAccessRequest = getRequest();
        });        
      };

      var confirmStatusChange = function(status, messageKey, statusName) {
        $rootScope.$broadcast(
          NOTIFICATION_EVENTS.showConfirmDialog,
          {
            titleKey: 'data-access-request.status-change-confirmation.title',
            messageKey: messageKey !== null ? messageKey : 'data-access-request.status-change-confirmation.message',
            messageArgs: statusName !== null ? [$filter('translate')(statusName).toLowerCase()] : []
          }, status);
      };

      var statusChangedConfirmed = function(status, expectedStatus) {
        if (status === expectedStatus) {
          DataAccessRequestStatusResource.update({
            id: $scope.dataAccessRequest.id,
            status: status
          }, onUpdatStatusSuccess, onError);
        }
      };

      var printForm = function() {
        // let angular digest!
        setTimeout(function(){ window.print(); }, 250);
      };

      $scope.submit = function () {
        $scope.$broadcast('schemaFormValidate');
        if ($scope.forms.requestForm.$valid) {
          DataAccessRequestStatusResource.update({
            id: $scope.dataAccessRequest.id,
            status: DataAccessRequestService.status.SUBMITTED
          }, function onSubmitted() {            
            $uibModal.open({
              scope: $scope,
              templateUrl:'access/views/data-access-request-submitted-modal.html'
            }).result.then(function () {
              onUpdatStatusSuccess();
            });         
          }, onError);
        } else {
          AlertService.alert({
            id: 'DataAccessRequestViewController',
            type: 'danger',
            msgKey: 'data-access-request.submit.invalid'
          });
        }
      };

      $scope.reopen = function () {
        confirmStatusChange(DataAccessRequestService.status.OPENED, null, 'reopen');
      };
      $scope.review = function () {
        confirmStatusChange(DataAccessRequestService.status.REVIEWED, 'data-access-request.status-change-confirmation.message-review', null);
      };
      $scope.approve = function () {
        confirmStatusChange(DataAccessRequestService.status.APPROVED, null, 'approve');
      };
      $scope.reject = function () {
        confirmStatusChange(DataAccessRequestService.status.REJECTED, null, 'reject');
      };
      $scope.conditionallyApprove = function () {
        confirmStatusChange(DataAccessRequestService.status.CONDITIONALLY_APPROVED, null, 'conditionallyApprove');
      };

      $scope.userProfile = function (profile) {
        $scope.applicant = profile;
        $uibModal.open({
          scope: $scope,
          templateUrl: 'access/views/data-access-request-profile-user-modal.html'
        });
      };

      $scope.getDataAccessListPageUrl = DataAccessRequestService.getListDataAccessRequestPageUrl();

      var getAttributeValue = function(attributes, key) {
        var result = attributes.filter(function (attribute) {
          return attribute.key === key;
        });

        return result && result.length > 0 ? result[0].value : null;
      };

      $scope.printForm = printForm;

      $scope.getFullName = function (profile) {
        if (profile) {
          if (profile.attributes) {
            return getAttributeValue(profile.attributes, 'firstName') + ' ' + getAttributeValue(profile.attributes, 'lastName');
          }
          return profile.username;
        }
        return null;
      };

      $scope.getProfileEmail = function (profile) {
        if (profile) {
          if (profile.attributes) {
            return getAttributeValue(profile.attributes, 'email');
          }
        }
        return null;
      };

      $scope.$on(
        NOTIFICATION_EVENTS.confirmDialogAccepted,
        function(event, status) {
          statusChangedConfirmed(DataAccessRequestService.status.OPENED, status);
        }
      );
      $scope.$on(
        NOTIFICATION_EVENTS.confirmDialogAccepted,
        function(event, status) {
          statusChangedConfirmed(DataAccessRequestService.status.REVIEWED, status);
        }
      );
      $scope.$on(
        NOTIFICATION_EVENTS.confirmDialogAccepted,
        function(event, status) {
          statusChangedConfirmed(DataAccessRequestService.status.CONDITIONALLY_APPROVED, status);
        }
      );
      $scope.$on(
        NOTIFICATION_EVENTS.confirmDialogAccepted,
        function(event, status) {
          statusChangedConfirmed(DataAccessRequestService.status.APPROVED, status);
        }
      );
      $scope.$on(
        NOTIFICATION_EVENTS.confirmDialogAccepted,
        function(event, status) {
          statusChangedConfirmed(DataAccessRequestService.status.REJECTED, status);
        }
      );

      $rootScope.$on('$translateChangeSuccess', function () {
        initializeForm();
      });

      $scope.forms = {};
    }])

  .controller('DataAccessRequestEditController', ['$rootScope',
    '$log',
    '$scope',
    '$routeParams',
    '$location',
    '$uibModal', 'LocalizedSchemaFormService',
    'DataAccessRequestsResource',
    'DataAccessRequestResource',
    'DataAccessFormConfigResource',
    'JsonUtils',
    'AlertService',
    'ServerErrorUtils',
    'SessionProxy',
    'DataAccessRequestService',
    'ngObibaMicaAccessTemplateUrl',
    'DataAccessRequestConfig',
    'SfOptionsService',
    'FormDirtyStateObserver',
    'DataAccessRequestDirtyStateService',
    '$timeout',

    function ($rootScope,
              $log,
              $scope,
              $routeParams,
              $location,
              $uibModal,
              LocalizedSchemaFormService,
              DataAccessRequestsResource,
              DataAccessRequestResource,
              DataAccessFormConfigResource,
              JsonUtils,
              AlertService,
              ServerErrorUtils,
              SessionProxy,
              DataAccessRequestService,
              ngObibaMicaAccessTemplateUrl,
              DataAccessRequestConfig,
              SfOptionsService,
              FormDirtyStateObserver,
              DataAccessRequestDirtyStateService,
              $timeout) {

      var onSuccess = function(response, getResponseHeaders) {
        FormDirtyStateObserver.unobserve();
        var parts = getResponseHeaders().location.split('/');
        $location.path('/data-access-request/' + parts[parts.length - 1]).replace();
      };

      var onError = function(response) {
        AlertService.alert({
          id: 'DataAccessRequestEditController',
          type: 'danger',
          msg: ServerErrorUtils.buildMessage(response)
        });
      };

      function onAttachmentError(attachment) {
        AlertService.alert({
          id: 'DataAccessRequestEditController',
          type: 'danger',
          msgKey: 'server.error.file.upload',
          msgArgs: [attachment.fileName]
        });
      }

      $scope.getDataAccessListPageUrl = DataAccessRequestService.getListDataAccessRequestPageUrl();

      var validate = function(form) {
        $scope.$broadcast('schemaFormValidate');
        $uibModal.open({
          resolve: {
            isValid: form.$valid
          },
          templateUrl: 'access/views/data-access-request-validation-modal.html',
          controller: ['$scope', 'isValid', function ($scope, isValid) {
            $scope.isValid = isValid;
          }]
        });
      };

      var cancel = function() {
        $location.path('/data-access-request' + ($routeParams.id ? '/' + $routeParams.id : 's')).replace();
      };

      var save = function() {
        $scope.dataAccessRequest.content = angular.toJson($scope.sfForm.model);

        if ($scope.newRequest) {
          DataAccessRequestsResource.save($scope.dataAccessRequest, onSuccess, onError);
        } else {
          DataAccessRequestResource.save($scope.dataAccessRequest, function() {
            FormDirtyStateObserver.unobserve();
            $location.path('/data-access-request' + ($scope.dataAccessRequest.id ? '/' + $scope.dataAccessRequest.id : 's')).replace();
          }, onError);
        }
      };

      function initializeForm() {
        // Retrieve form data

        SfOptionsService.transform().then(function(options) {
          $scope.sfOptions = options;
          $scope.sfOptions.onError = onAttachmentError;
        });

        DataAccessFormConfigResource.get(
          function onSuccess(dataAccessForm) {
            $scope.sfForm.definition = LocalizedSchemaFormService.translate(JsonUtils.parseJsonSafely(dataAccessForm.definition, []));
            $scope.sfForm.schema = LocalizedSchemaFormService.translate(JsonUtils.parseJsonSafely(dataAccessForm.schema, {}));
            if ($scope.sfForm.definition.length === 0) {
              $scope.sfForm.definition = [];
              $scope.validForm = false;
              AlertService.alert({
                id: 'DataAccessRequestEditController',
                type: 'danger',
                msgKey: 'data-access-config.parse-error.definition'
              });
            }
            if (Object.getOwnPropertyNames($scope.sfForm.schema).length === 0) {
              $scope.sfForm.schema = {};
              $scope.validForm = false;
              AlertService.alert({
                id: 'DataAccessRequestEditController',
                type: 'danger',
                msgKey: 'data-access-config.parse-error.schema'
              });
            }

            if ($scope.validForm) {
              $scope.dataAccessRequest = $routeParams.id ?
                DataAccessRequestResource.get({id: $routeParams.id}, function onSuccess(request) {
                  try {
                    $scope.sfForm.model = request.content ? JSON.parse(request.content) : {};
                  } catch (e) {
                    $scope.sfForm.model = {};
                    AlertService.alert({
                      id: 'DataAccessRequestEditController',
                      type: 'danger',
                      msgKey: 'data-access-request.parse-error'
                    });
                  }

                  $scope.canEdit = DataAccessRequestService.actions.canEdit(request);
                  $scope.sfForm.schema.readonly = !$scope.canEdit;
                  $scope.$broadcast('schemaFormRedraw');

                  request.attachments = request.attachments || [];
                  return request;
                }) : {
                  applicant: SessionProxy.login(),
                  status: DataAccessRequestService.status.OPENED,
                  attachments: []
                };
            }

            $timeout(function () {
              $scope.sfForm = angular.copy($scope.sfForm);
              $scope.loaded = true;
            }, 250);
          },
          onError
        );
      }

      $rootScope.$on('$translateChangeSuccess', function () {
        initializeForm();
      });

      initializeForm();

      $scope.loaded = false;
      $scope.config = DataAccessRequestConfig.getOptions();
      $scope.validForm = true;
      $scope.requestId = $routeParams.id;
      $scope.newRequest = $routeParams.id ? false : true;
      $scope.cancel = cancel;
      $scope.save = save;
      $scope.editable = true;
      $scope.validate = validate;
      $scope.headerTemplateUrl = ngObibaMicaAccessTemplateUrl.getHeaderUrl('form');
      $scope.footerTemplateUrl = ngObibaMicaAccessTemplateUrl.getFooterUrl('form');
      $scope.sfForm = {
        schema: null,
        definition: null,
        model: {}
      };

      FormDirtyStateObserver.observe($scope);

      DataAccessRequestDirtyStateService.setForm($scope.form);
      $scope.$on('$destroy', function () {
        DataAccessRequestDirtyStateService.setForm(null);
      });

    }]);
