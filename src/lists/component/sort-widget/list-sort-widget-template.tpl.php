<div class="sortwidget">
        <label for="search-sort">{{"global.sort-by" | translate}}  {{selectSort | getLabel:selectedSort}}</label>
        <span class="btn-group dropdown" >
           <button id="SortOrder"  type="button" class="btn btn-primary dropdown-toggle"
                   data-toggle="dropdown" >
               <i ng-if="selectedOrder=='-'"
                  class="glyphicon glyphicon-sort-by-attributes-alt"></i>
               <i ng-if="selectedOrder==''"
                  class="glyphicon glyphicon-sort-by-attributes"></i>
           </button>
           <span class="dropdown-menu" role="menu" uib-dropdown-menu aria-labelledby="SortOrder">
               <form class="form-inline">
                <span class="list-group">
                       <span class="list-group-item text-center">
                                <span ng-repeat="optionorder in selectOrder.options">
                                    <label>
                                        <i ng-if="optionorder.value=='-'"
                                           class="fa fa-long-arrow-down"></i>
                                        <i ng-if="optionorder.value==''"
                                           class="fa fa-long-arrow-up"></i>
                                    </label>
                                    <input type="radio"
                                           ng-model="$parent.selectedOrder"
                                           ng-value="optionorder.value"
                                           name="search-order"
                                           ng-change="radioCheked()">
                                </span>
                       </span>
                       <span class="list-group-item"
                             ng-repeat="option in selectSort.options">
                                <input type="radio"
                                       ng-model="$parent.selectedSort"
                                       ng-value="option.value"
                                       name="search-sort"
                                       ng-change="radioCheked()">
                                <label>{{option.label}}</label>
                       </span>
                </span>
               </form>
            </span>
        </span>
</div>
