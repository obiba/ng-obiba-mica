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

(function () {
  function Controller($rootScope, $timeout, LocalizedSchemaFormService, SfOptionsService, JsonUtils) {
    var ctrl = this,
      scope = $rootScope.$new();
    ctrl.form = {};
    ctrl.sfOptions = {};

    function broadcastSchemaFormRedraw() {
      $timeout(function () {
        ctrl.form = angular.copy(ctrl.form);
        scope.$broadcast('schemaFormRedraw');
      }, 250);
    }

    function validateSchemaParsing(schema, parseErrorCallback) {
      if (Object.getOwnPropertyNames(schema).length === 0) {
        schema = {};

        if (typeof parseErrorCallback === 'function') {
          parseErrorCallback();
        }
      }

      return schema;
    }

    function validateDefinitionParsing(definition, parseErrorCallback) {
      if (definition.length === 0) {
        definition = [];

        if (typeof parseErrorCallback === 'function') {
          parseErrorCallback();
        }
      }

      return definition;
    }

    function getParsingErrorCallback(type) {
      if (typeof ctrl.parsingErrorCallbacks !== 'object') {
        return null;
      }

      return ctrl.parsingErrorCallbacks[type];
    }

    function onChanges(changes) {
      if (changes && changes.schemaForm && changes.schemaForm.currentValue) {
        var form = changes.schemaForm.currentValue;

        ctrl.form.definition = validateDefinitionParsing(
          LocalizedSchemaFormService.translate(JsonUtils.parseJsonSafely(form.definition, [])), getParsingErrorCallback('definition'));

        ctrl.form.schema = validateSchemaParsing(
          LocalizedSchemaFormService.translate(JsonUtils.parseJsonSafely(form.schema, {})), getParsingErrorCallback('schema'));

        ctrl.form.downloadTemplate = form.pdfDownloadType === 'Template';
        ctrl.form.schema.readonly = ctrl.readOnly;        
      }

      broadcastSchemaFormRedraw();
    }

    SfOptionsService.transform().then(function (options) {
      ctrl.sfOptions = options;
      ctrl.sfOptions.pristine = { errors: true, success: false };
    });

    ctrl.$onChanges = onChanges;
  }

  angular.module('obiba.mica.utils').component('obibaSchemaFormRenderer', {
    bindings: {
      schemaForm: '<',
      model: '<',
      readOnly: '<',
      parsingErrorCallbacks: '<'
    },
    templateUrl: 'utils/components/entity-schema-form/component.html',
    controller: ['$rootScope', '$timeout', 'LocalizedSchemaFormService', 'SfOptionsService', 'JsonUtils', Controller]
  });
})();