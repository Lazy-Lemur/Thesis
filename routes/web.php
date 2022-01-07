<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use App\Http\Controllers\MapController;
// use DB;

Route::get('/', 'MapController@index');
Route::get('/fetch_data', [MapController::class, 'fetchData']);

Route::get('/get_max_value_spatial', [MapController::class, 'create']);
Route::post('/get_max_value_spatial', [MapController::class, 'max_value_spatial']);

Route::post('/get_geojson_layer_point_spatial', [MapController::class, 'geojson_layer_point_spatial']);
Route::post('/get_geojson_layer_spatial', [MapController::class, 'geojson_layer_spatial']);

Route::post('/get_graph_world_cumulative', [MapController::class, 'graph_world_cumulative']);
Route::post('/get_graph_world_daily', [MapController::class, 'graph_world_daily']);
Route::post('/get_counter_world', [MapController::class, 'counter_world']);

// Route::get('/get_geojson_layer_point_spatial/{param}/{date1}/{date2}', [MapController::class, 'get_geojson_layer_point_spatial'])->name('layer_point_spatial');
// Route::get('fetch-data', 'MapController@fetchData');

// Route::get('fetch_data', function (){
//     $data = DB::select('SELECT country_name, shape_area, geom FROM countries');
//     return response()
//         ->header('Content-Type', 'application/json')
//         ->json([
//             'data'=>$data,
//         ]);
// });
