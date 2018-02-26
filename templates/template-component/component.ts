/*
 * Copyright (c) 2018 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

"use strict";

class TemplateController implements ng.IComponentController {

  public dataBinding: number;
  public functionBinding: () => any; // function arguments and returned value may need to be declared
  public textBinding: string;

  constructor() {
      this.textBinding = "";
      this.dataBinding = 0;
  }

  public someFunction(): void {
      this.functionBinding();
  }
}

class TemplateComponent implements ng.IComponentOptions {

  public controller: ng.Injectable<ng.IControllerConstructor>;
  public controllerAs: string;
  public templateUrl: string;
  public transclude: boolean;
  public bindings: any;

  constructor() {
    this.transclude = true;
    this.bindings = {
      dataBinding: "<",
      functionBinding: "&",
      textBinding: "@",
    };
    this.controller = TemplateController;
    this.controllerAs = "$ctrl";
    this.templateUrl = "someModule/components/template-component/component.html";
  }
}

ngObibaMica.someModule
  .component("templateComponent", new TemplateComponent());
