<div>
  <div ng-if="loading" class="loading"></div>
  <div ng-show="!loading">
    <p class="help-block" ng-if="!summaries || !summaries.length" translate>search.dataset.noResults</p>
    <div class="table-responsive" ng-if="summaries && summaries.length">
      <table class="table table-bordered table-striped" ng-init="lang = $parent.$parent.lang">
        <tbody test-ref="search-results">
        <tr ng-if="!summaries || !summaries.length">
          <td colspan="6" translate>search.dataset.noResults</td>
        </tr>
        <tr ng-repeat="summary in summaries">
          <td>
            <a ng-href="{{PageUrlService.datasetPage(summary.id, summary.variableType)}}">
              <localized value="summary.name" lang="lang"></localized>
            </a>
              <p>
            <localized value="summary.description"
                       ellipsis-size="250"
                       markdown-it="true"
                       lang="lang"></localized>
              </p>
              <div class="clear-fix"></div>
              <a href="{{PageUrlService.datasetPage(summary.id, summary.variableType)}}"
                 class="btn btn-primary btn-xs sm-top-margin">Read
                  More</a>
              <div class="sm-top-margin countDetail">
                  {{counts=summary['obiba.mica.CountStatsDto.datasetCountStats'];""}}
                  <a ng-if="counts.networks"
                     href="{{'networks' | doSearchQuery : 'dataset(in(Mica_dataset.id,' + summary.id +  '))' }}"
                     class="btn btn-default btn-xxs"
                     test-ref="studyCount">
                      <localized-number
                              value="counts.networks"></localized-number>
                      {{counts.networks > 1 ? "networks" : "network.label"
                      | translate}}
                  </a>
                  <a ng-if="counts.studies"
                     href="{{'studies' | doSearchQuery : 'dataset(in(Mica_dataset.id,' + summary.id +  '))' }}"
                     class="btn btn-default btn-xxs"
                     test-ref="studyCount">
                      <localized-number
                              value="counts.studies"></localized-number>
                      {{counts.studies > 1 ? "studies" : "study.label"
                      | translate}}
                  </a>
                  <a ng-if="counts.variables"
                     href="{{'variables' | doSearchQuery : 'dataset(in(Mica_dataset.id,' + summary.id +  '))' }}"
                     class="btn btn-default btn-xxs"
                     test-ref="variableCount">
                      <localized-number
                              value="counts.variables"></localized-number>
                      {{counts.variables > 1 ? "variables" : "search.variable.facet-label"
                      | translate}}
                  </a>
              </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>