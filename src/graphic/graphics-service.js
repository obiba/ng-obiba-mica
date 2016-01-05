/*
 * Copyright (c) 2014 OBiBa. All rights reserved.
 *
 * This program and the accompanying materials
 * are made available under the terms of the GNU Public License v3.0.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

mica.GraphicChartsStudyDesignChart
  .config(function(){
    console.log('config');
  })
    .factory('GraphicChartsStudiesDesignGetData', ['$resource',
        function ($resource) {
            return $resource('mica/statistics/get_study_design_statistics/:id/ws', {}, {
                'get': {method: 'GET', errorHandler: true}
            });
        }]);

mica.GraphicChartsGeoChart
    .factory('GraphicChartsGeoChartGetData', ['$resource',
        function ($resource ) {
            return $resource('mica/statistics/get_nbr_studies_networks_by_countries/:id/ws', {}, {
                'get': {method: 'GET', params: {id: '@id'}}
            });
        }]);