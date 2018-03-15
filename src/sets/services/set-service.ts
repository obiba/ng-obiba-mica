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

interface ISetService {
  isSingleStudy(): boolean;
  hasHarmonizedDatasets(): boolean;
  isDocumentInCart(documentType: string, documentId: string): any;
  addDocumentToCart(documentType: string, documentId: string | string[]): any;
  addDocumentQueryToCart(documentType: string, query: string): any;
  removeDocumentFromCart(documentType: string, documentId: string | string[]): any;
  getCartDocuments(documentType: string, fromIdx: number, limitIdx: number): any;
  clearCart(documentType: string): any;
  gotoSetEntitiesCount(documentType: string, setId: string): void;
  gotoEntitiesCount(ids: string[]): void;
  gotoSearch(documentType: string, setId: string): void;
}

class SetService implements ISetService {

  private static $inject = ["$location", "$window", "$log", "localStorageService", "PageUrlService", "AlertService",
    "SetsImportResource", "SetResource", "SetDocumentsResource", "SetClearResource", "SetExistsResource",
    "SetImportResource", "SetRemoveResource", "ObibaServerConfigResource"];

  private hasMultipleStudies: boolean;
  private hasHarmonization: boolean;

  constructor(
    private $location: any,
    private $window: any,
    private $log: any,
    private localStorageService: any,
    private PageUrlService: any,
    private AlertService: any,
    private SetsImportResource: any,
    private SetResource: any,
    private SetDocumentsResource: any,
    private SetClearResource: any,
    private SetExistsResource: any,
    private SetImportResource: any,
    private SetRemoveResource: any,
    private ObibaServerConfigResource: any) {
      const that = this;
      ObibaServerConfigResource.get((micaConfig) => {
        that.hasMultipleStudies = !micaConfig.isSingleStudyEnabled || micaConfig.isHarmonizedDatasetEnabled;
        that.hasHarmonization = micaConfig.isHarmonizedDatasetEnabled;
      });
  }

  public isSingleStudy(): boolean {
    return !this.hasMultipleStudies;
  }

  public hasHarmonizedDatasets(): boolean {
    return this.hasHarmonization;
  }

  /**
   * Get the documents in the cart. Create the cart's set if missing.
   * Return a promise on the documents.
   * @param documentType the document type
   * @param fromIdx from position
   * @param limitIdx maximum number of documents taht are fetched
   */
  public getCartDocuments(documentType: string, fromIdx: number, limitIdx: number): any {
      return this.getOrCreateCart(documentType).then((set) => {
        return this.SetDocumentsResource.get({
          from: fromIdx,
          id: set.id,
          limit: limitIdx,
          type: documentType,
        }).$promise;
      });
  }

  /**
   * Check if document is in the cart.
   * Return a promise on the response.
   * @param documentType the document type
   * @param documentId the document ID
   */
  public isDocumentInCart(documentType: string, documentId: string): any {
    return this.getOrCreateCart(documentType).then((set) => {
      return this.SetExistsResource.get({type: documentType, id: set.id, did: documentId}).$promise;
    });
  }

  /**
   * Add one or more documents to the cart's set.
   * Return a promise on the cart's set.
   * @param documentType the document type
   * @param documentId the document ID or an array of document IDs
   */
  public addDocumentToCart(documentType: string, documentId: string | string[]): any {
    const did = Array.isArray(documentId) ? documentId.join("\n") : documentId;
    return this.getOrCreateCart(documentType).then((set) => {
      return this.SetImportResource.save({type: documentType, id: set.id}, did).$promise;
    }).then((set) => {
      this.localStorageService.set(this.getCartKey(documentType), set);
      return set;
    });
  }

  /**
   * Add documents matching the query to the cart's set.
   * Return a promise on the cart's set.
   * @param documentType the document type
   * @param query the documents join query
   */
  public addDocumentQueryToCart(documentType: string, query: string): any {
    this.$log.info("query=" + query);
  }

  /**
   * Remove one or more documents from the cart's set.
   * Return a promise on the cart's set.
   * @param documentType the document type
   * @param documentId the document ID or an array of document IDs
   */
  public removeDocumentFromCart(documentType: string, documentId: string | string[]): any {
    const did = Array.isArray(documentId) ? documentId.join("\n") : documentId;
    return this.getOrCreateCart(documentType).then((set) => {
      return this.SetRemoveResource.delete({type: documentType, id: set.id}, did).$promise;
    }).then((set) => {
      this.localStorageService.set(this.getCartKey(documentType), set);
      return set;
    });
  }

  /**
   * Clear the documents list of the cart.
   * @param documentType the document type
   */
  public clearCart(documentType: string): any {
    return this.getOrCreateCart(documentType).then((set) => {
      return this.SetClearResource.clear({type: documentType, id: set.id}).$promise;
    }).then(() => {
      return this.getOrCreateCart(documentType);
    });
  }

  /**
   * Go to the entities count page for the variables belonging to the provided set.
   * @param setId the set ID, if undefined, the cart set ID is used
   */
  public gotoSetEntitiesCount(setId: string): void {
    let sid = setId;
    if (!sid) {
      const cartSet = this.getCartSet("variables");
      if (cartSet) {
        sid = cartSet.id;
      }
    }
    // TODO make a search query instead to force variable type to Collected
    this.SetDocumentsResource.get({type: "variables", id: sid, from: 0, limit: 20}).$promise
      .then((documents) => {
        this.gotoEntitiesCount(documents.variables.map((doc) => doc.id));
      });
  }

  /**
   * Go to the entities count page with the provided identifiers.
   * @param ids the selected identifiers
   */
  public gotoEntitiesCount(ids: string[]): void {
    if (ids) {
      const queryStr = ids.map((id) => {
        return "all(" + id + ")";
      }).join(",");
      this.$window.location.href = this.PageUrlService.entitiesCountPage(queryStr);
    }
  }

  /**
   * Go to search page with documents filtered by the set they belong to.
   * @param documentType the document type
   * @param setId the set ID, if undefined, the cart set ID is used
   */
  public gotoSearch(documentType: string, setId: string): void {
    let id = setId;
    if (!id) {
      const cartSet = this.getCartSet(documentType);
      if (cartSet) {
        id = cartSet.id;
      }
    }
    if (id) {
      const queryStr = "variable(in(Mica_variable.sets," + id + "))";
      this.$window.location.href = this.PageUrlService.searchPage(queryStr);
    }
  }

  /**
   * Get the cart set if it exists.
   * @param documentType the document type
   */
  private getCartSet(documentType: string) {
    return this.localStorageService.get(this.getCartKey(documentType));
  }

  /**
   * Always get the cart set in case of the set was deleted from the server. If unknown or not found, create it.
   * Return a promise on the cart's set.
   * @param documentType the document type
   */
  private getOrCreateCart(documentType: string): any {
    const cartSet = this.localStorageService.get(this.getCartKey(documentType));
    if (cartSet) {
      return this.SetResource.get({type: documentType, id: cartSet.id}).$promise
        .then((set) => {
          this.localStorageService.set(this.getCartKey(documentType), set);
          return set;
        })
        .catch(() => {
          return this.createCart(documentType, "");
        });
    } else {
      return this.createCart(documentType, "");
    }
  }

  /**
   * Create a cart and returns a promise on the created set.
   * @param documentType the document type
   * @param documentId the document ID to be added to the cart (can be empty)
   */
  private createCart(documentType: string, documentId: string): any {
    return this.SetsImportResource.save({type: documentType}, documentId).$promise
    .then((set) => {
      this.localStorageService.set(this.getCartKey(documentType), set);
      return set;
    });
  }

  /**
   * Get the local storage key for the cart.
   * @param documentType the document type
   */
  private getCartKey(documentType: string): string {
    return "cart." + documentType;
  }
}

ngObibaMica.sets.service("SetService", ["$location", "$window", "$log", "localStorageService",
  "PageUrlService", "AlertService",
  "SetsImportResource", "SetResource", "SetDocumentsResource", "SetClearResource", "SetExistsResource",
  "SetImportResource", "SetRemoveResource", "ObibaServerConfigResource", SetService]);
