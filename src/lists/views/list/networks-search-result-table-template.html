<div>
    <div ng-if="loading" class="loading"></div>
    <div ng-show="!loading">
        <p class="help-block" ng-if="!summaries || !summaries.length" translate>
            search.network.noResults</p>
        <div class="table-responsive" ng-if="summaries && summaries.length">
            <table class="table  " ng-init="lang = $parent.$parent.lang">
                <tbody test-ref="search-results">
                <tr ng-if="!summaries || !summaries.length">
                    <td colspan="2" translate>search.network.noResults</td>
                </tr>
                <tr ng-repeat="summary in summaries"
                    ng-init="lang = $parent.$parent.lang;">
                    <td width="15%">
                        <img ng-if="summary.logo" src="" alt="">

                        <img src="{{summary.logoUrl}}"
                             class="img-responsive"/>

                        <h1 ng-if="!summary.logo" src="" alt=""
                            class="big-character">
                            <span class="t_badge color_light i-obiba-S"></span>
                        </h1>
                    </td>
                    <td>
                        <h4>
                            <a href="{{'network/' + summary.id | getBaseUrl}}">
                                <localized value="summary.name"
                                           lang="lang"></localized>
                            </a></h4>
                        <p>
                            <localized value="summary.description" lang="lang"
                                       ellipsis-size="250"
                                       markdown-it="true"></localized>
                        </p>
                        <div class="clear-fix"></div>
                        <a href="{{'network/' + summary.id | getBaseUrl}}"
                           class="btn btn-primary btn-xs sm-top-margin">Read
                            More</a>
                        <div class="sm-top-margin countDetail">
                            {{counts=summary['obiba.mica.CountStatsDto.networkCountStats'];""}}
                            <a ng-if="counts.individualStudies"
                               href="{{'studies' | doSearchQuery:'network(in(Mica_network.id,' + summary.id +  ')),study(in(Mica_study.className,Study))' }}"
                               class="btn btn-default btn-xxs"
                               test-ref="individualStudyCount">
                                <localized-number
                                        value="counts.individualStudies"></localized-number>
                                {{counts.individualStudies > 1 ?
                                "global.individual-studies":"global.individual-study"
                                | translate}}
                            </a>

                            <a ng-if="counts.studiesWithVariables"
                               href="{{'studies' | doSearchQuery : 'network(in(Mica_network.id,' + summary.id +  ')),variable(in(Mica_variable.variableType,Collected))' }}"
                               class="btn btn-default btn-xxs"
                               test-ref="studyWithVariablesCount">
                                <localized-number
                                        value="counts.studiesWithVariables"></localized-number>
                                {{counts.studiesWithVariables > 1 ?
                                "metrics.mica.studies-with-variables" :
                                "metrics.mica.study-with-variables"
                                | translate}}
                            </a>

                            <a ng-if="counts.studyVariables"
                               href="{{'variables' | doSearchQuery : 'network(in(Mica_network.id,' + summary.id +  ')),variable(in(Mica_variable.variableType,Collected))' }}"
                               class="btn btn-default btn-xxs"
                               test-ref="studyVariableCount">
                                <localized-number
                                        value="counts.studyVariables"></localized-number>
                                {{counts.studyVariables > 1 ?
                                "metrics.mica.study-variables" :
                                "metrics.mica.study-variable"
                                | translate}}
                            </a>

                            <a ng-if="counts.harmonizationStudies"
                               href="{{'studies' | doSearchQuery : 'network(in(Mica_network.id,' + summary.id +  ')),study(in(Mica_study.className,HarmonizationStudy))' }}"
                               class="btn btn-default btn-xxs"
                               test-ref="harmonizationStudyCount">
                                <localized-number
                                        value="counts.harmonizationStudies"></localized-number>
                                {{counts.harmonizationStudies > 1 ?
                                "global.harmonization-studies" :
                                "global.harmonization-study"
                                | translate}}
                            </a>

                            <a ng-if="counts.dataschemaVariables"
                               href="{{'variables' | doSearchQuery : 'network(in(Mica_network.id,' + summary.id +  ')),variable(in(Mica_variable.variableType,Dataschema))' }}"
                               class="btn btn-default btn-xxs"
                               test-ref="harmonizationStudyWithVariablesCount">
                                <localized-number
                                        value="counts.dataschemaVariables"></localized-number>
                                {{counts.dataschemaVariables > 1 ?
                                "metrics.mica.harmonization-study-variables" :
                                "metrics.mica.harmonization-study-variable"
                                | translate}}
                            </a>
                            {{datasetsCount = counts.studyDatasets +
                            counts.harmonizationDatasets; ""}}
                            <a ng-if="datasetsCount"
                               href="{{'datasets' | doSearchQuery : 'network(in(Mica_network.id,' + summary.id +  '))' }}"
                               class="btn btn-default btn-xxs"
                               test-ref="datasetCount">
                                <localized-number
                                        value="datasetsCount"></localized-number>
                                {{datasetsCount > 1 ? "datasets" :
                                "dataset.details"
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
