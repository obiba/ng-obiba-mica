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

declare var ngObibaMica: any;

class CartDocumentsTableController implements ng.IComponentController {

  private static $inject = ["PageUrlService", "LocalizedValues", "SetService",
    "$translate", "$log", "$scope", "$location", "$window"];

  public documents: any;
  public pagination: any;
  public onPageChange: (type: string, from: number) => void;
  public type: string;
  public table: any;
  public localizedTotal: string;

  constructor(
    private PageUrlService: any,
    private LocalizedValues: any,
    private SetService: any,
    private $translate: any,
    private $log: any,
    private $scope: any,
    private $location: any,
    private $window: any) {
      this.documents = {
        from: 0,
        limit: 0,
        total: 0,
      };
      this.pagination = {
        currentPage: 1,
        from: 0,
        itemsPerPage: 10,
        maxSize: 10,
        to: 0,
        totalHits: 0,
      };
  }

  public entitiesCount(): void {
    if (this.pagination.totalHits) {
      this.SetService.gotoSetEntitiesCount();
    }
  }

  public search(): void {
    this.SetService.gotoSearch(this.type);
  }

  public clearSet(): void {
    this.SetService.clearCart(this.type)
      .then(() => this.$scope.$emit("cart-cleared", this.type));
  }

  public pageChanged(): void {
    const from = (this.pagination.currentPage - 1) * this.documents.limit;
    this.onPageChange(this.type, from);
  }

  public $onInit() {
    this.table = {
      rows: new Array(),
    };
  }

  public $onChanges() {
    this.table = this.asTable();
    this.localizedTotal = this.LocalizedValues
      .formatNumber((this.documents && this.documents.total) ? this.documents.total : 0);
  }

  private localize(values): string {
    return this.LocalizedValues.forLang(values, this.$translate.use());
  }

  private asTable(): any {
    const table = {
      rows: new Array(),
    };
    this.pagination.totalHits = this.documents ? this.documents.total : 0;
    this.pagination.currentPage = this.documents ? this.documents.from / this.documents.limit + 1 : 0;
    this.pagination.itemsPerPage = this.documents ? this.documents.limit : 0;
    this.pagination.from = this.documents ? this.documents.from + 1 : 0;
    const documentCounts = this.documents && this.documents[this.type] ? this.documents[this.type].length : 0;
    this.pagination.to = this.documents ? this.documents.from + documentCounts : 0;
    if (documentCounts) {
      this.documents[this.type].forEach((doc) => {
        const studyAcronym = this.localize(doc.studySummary.acronym);
        const studyName = this.localize(doc.studySummary.name);
        const studyType = doc.variableType === "Dataschema" ? "harmonization" : "individual";
        const studyLink = this.PageUrlService.studyPage(doc.studyId, studyType);
        const datasetName = this.localize(doc.datasetName);
        const datasetLink = this.PageUrlService.datasetPage(doc.datasetId, doc.variableType);
        const variableLink = this.PageUrlService.variablePage(doc.id);
        const attrLabel = doc.attributes.filter((attr) => attr.name === "label");
        const variableLabel = attrLabel && attrLabel.length > 0 ? this.localize(attrLabel[0].values) : "";
        const row = new Array(
          {
            link: variableLink ? variableLink : datasetLink,
            value: doc.name,
          },
          {
            link: undefined,
            value: variableLabel,
          },
          {
            link: undefined,
            value: doc.variableType,
          },
          {
            link: studyLink,
            value: studyAcronym,
          },
          {
            link: datasetLink,
            value: datasetName,
          },
        );
        table.rows.push(row);
      });
    }
    return table;
  }
}

class CartDocumentsTableComponent implements ng.IComponentOptions {

  public controller: ng.Injectable<ng.IControllerConstructor>;
  public controllerAs: string;
  public templateUrl: string;
  public transclude: boolean;
  public bindings: any;

  constructor() {
    this.transclude = true;
    this.bindings = {
      documents: "<",
      onPageChange: "<",
      type: "<",
    };
    this.controller = CartDocumentsTableController;
    this.controllerAs = "$ctrl";
    this.templateUrl = "sets/components/cart-documents-table/component.html";
  }
}

ngObibaMica.sets
  .component("cartDocumentsTable", new CartDocumentsTableComponent());
