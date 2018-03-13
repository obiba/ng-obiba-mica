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
  addDocumentToCart(documentType: string, documentId: string): void;
  getCartDocuments(documentType: string, fromIdx: number, limitIdx: number): any;
  clearCart(documentType: string): any;
  gotoSetEntitiesCount(documentType: string, setId: string): void;
  gotoEntitiesCount(ids: string[]): void;
  gotoSearch(documentType: string, setId: string): void;
}

class SetService implements ISetService {

  private static $inject = ["$location", "$window", "$log", "localStorageService", "PageUrlService",
    "SetsImportResource", "SetResource", "SetDocumentsResource", "SetImportResource"];

  constructor(
    private $location: any,
    private $window: any,
    private $log: any,
    private localStorageService: any,
    private PageUrlService: any,
    private SetsImportResource: any,
    private SetResource: any,
    private SetDocumentsResource: any,
    private SetImportResource: any) {
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
   * Add a document to the cart's set.
   * Return a promise on the cart's set.
   * @param documentType the document type
   * @param documentId the document ID
   */
  public addDocumentToCart(documentType: string, documentId: string): any {
    return this.getOrCreateCart(documentType).then((set) => {
      return this.SetImportResource.save({type: documentType, id: set.id}, documentId).$promise;
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
      return this.SetDocumentsResource.clear({type: documentType, id: set.id}).$promise;
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
      const href = this.PageUrlService.entitiesCountPage(queryStr);
      if (href.startsWith("http")) {
        this.$window.location.href = href;
      } else {
        this.$location.url(href);
      }
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
      const href = this.PageUrlService.searchPage(queryStr);
      if (href.startsWith("http")) {
        this.$window.location.href = href;
      } else {
        this.$location.url(href);
      }
    }
  }

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

ngObibaMica.sets.service("SetService", ["$location", "$window", "$log", "localStorageService", "PageUrlService",
  "SetsImportResource", "SetResource", "SetDocumentsResource", "SetImportResource", SetService]);
