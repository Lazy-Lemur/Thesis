<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Country;
use JavaScript;
use DB;

class MapController extends Controller
{
    public function index(){
        $title = "Butuan Employment and Population Rate GIS Dashboard";

        // return view('pages.test');
        return view('pages.index')->with('title', $title);
    }

    public function fetchData() {
        // $data = DB::select('SELECT country_name, shape_area, geom FROM countries');
        // $data = Country::all();
        // $data = DB::select('SELECT * FROM countries');
        
        $data = DB::select("SELECT selected.deaths, selected.country, st_asgeojson(ST_Centroid(countries.geom)) FROM countries LEFT JOIN (SELECT SUM(daily_deaths) as deaths, country FROM world_covid_data WHERE date >= '25-02-2020' AND date <= '25-04-2020' GROUP BY country) as selected ON (selected.country = countries.country_name)");

        return response()->json(['data' => $data, 'data_count' => count($data)]);
        // return response('Hello WOrld', 200)
        //     ->header('Content-Type', 'text-plain');
        // return view('pages.test')->with('data', $data);
    }

    public function create(){
        return view('get_max_value_spatial');
    }

    public function max_value_spatial(Request $request){
        
        // $data = $request->all();
        // foreach($data as $key => $value){
        //     die($value);
        // }

        // $json_data = array(
        //     "type" => "FeatureCollection",
        //     "features" => []
        // );
        // $json_data['features'][] = array('as' => 'sa');
        // die($json_data['featues']);

        $start_date = $request->input('date1');
        $end_date = $request->input('date2');
        $param = $request->input('param');        
        $json = array(
            'maximum' => []
        );

        $parameter = "daily_" . $param;
        // $query = "SELECT MAX(SUM) FROM( SELECT SUM( ".$parameter." ) as sum FROM world_covid_data WHERE date >= '?' AND date <= '?' GROUP BY country) z";
        // die($query);

        $results = DB::select("SELECT MAX(SUM) FROM( SELECT SUM( ".$parameter." ) as sum FROM world_covid_data WHERE date >= ? AND date <= ? GROUP BY country) z", [$start_date, $end_date]);
        // die($results[0]->max);

        for($i = 0; $i < count($results); $i++){
            $json['maximum'][$i] = array('max' => $results[$i]->max);
        }

        return response()->json($json);
    }

    public function geojson_layer_point_spatial(Request $request){
        $start_date = $request->input('date1');
        $end_date = $request->input('date2');
        $param = $request->input('param');

        $parameter = "daily_" . $param;

        $data = DB::select("SELECT selected.".$param.", selected.country, st_asgeojson(ST_Centroid(countries.geom)) FROM countries LEFT JOIN (SELECT SUM(".$parameter.") as ".$param.", country FROM world_covid_data WHERE date >= ? AND date <= ? GROUP BY country) as selected ON (selected.country = countries.country_name)", [$start_date, $end_date]);

        $json = array(
            'type'=>'FeatureCollection',
            'features'=>[]
          );

        
        //   die($data);
        //   // $json['features'][] = array('type' => 'Feature');
        //   // $json['features'][0]['geometry'] = array('type' => 'Point', 'coordinates' => [123.23,232.11]);
        //   // $json['features'][0]['properties'] = array('deaths' => 5820, 'country' => 'Indonesia');
          
        // //   $i = 0;
          
        // //   for($i=0;$i<10;$i++){
        // //     $json['features'][$i] = array('type' => 'Feature');
        // //     $json['features'][$i]['geometry'] = array('type' => 'Point', 'coordinates' => [120.122,122.444]);
        // //     $json['features'][$i]['properties'] = array('deaths' => 5820, 'country' => 'Indonesia');
        // //   }
          
        // //   var_dump(json_encode($json));

        $i = 0;

        for($i=0;$i < count($data); $i++){
            $json['features'][$i] = array('type' => 'Feature');
            $json['features'][$i]['geometry'] = $data[$i]->st_asgeojson;
            if($param == 'cases'){
                $json['features'][$i]['properties'] = array($param => $data[$i]->cases, 'country' => $data[$i]->country);                        
            }
            else if($param == 'deaths'){
                $json['features'][$i]['properties'] = array($param => $data[$i]->deaths, 'country' => $data[$i]->country);
            }
            else if($param == 'tests'){
                $json['features'][$i]['properties'] = array($param => $data[$i]->tests, 'country' => $data[$i]->country);
            }
            else if($param == 'vaccinations'){
                $json['features'][$i]['properties'] = array($param => $data[$i]->vaccinations, 'country' => $data[$i]->country);
            }
        }

        return response()->json($json);
    }

    public function geojson_layer_spatial(Request $request){

        $start_date = $request->input('date1');
        $end_date = $request->input('date2');
        $param = $request->input('param');

        $parameter = "daily_" . $param;

        $data = DB::select("SELECT selected.".$param.", selected.country, st_asgeojson(ST_Simplify(countries.geom, 0.0007)) FROM countries LEFT JOIN( SELECT SUM(".$parameter.") as ".$param.", country FROM world_covid_data WHERE date >= ? AND date <= ? GROUP BY country) as selected ON (selected.country = countries.country_name)", [$start_date, $end_date]);
        
        $json = array(
            'type' => 'FeatureCollection',
            'features' => []
        );

        for($i=0; $i<count($data);$i++){
            $json['features'][$i] = array('type' => 'Feature');
            $json['features'][$i]['geometry'] = $data[$i]->st_asgeojson;
            
            if($param == 'cases'){
                $json['features'][$i]['properties'] = array($param => $data[$i]->cases, 'country' => $data[$i]->country);
            }
            else if($param == 'deaths'){
                $json['features'][$i]['properties'] = array($param => $data[$i]->deaths, 'country' => $data[$i]->country);
            }
            else if($param == 'tests'){
                $json['features'][$i]['properties'] = array($param => $data[$i]->tests, 'country' => $data[$i]->country);
            }
            else if($param == 'vaccinations'){
                $json['features'][$i]['properties'] = array($param => $data[$i]->vaccinations, 'county' => $data[$i]->country);
            }
        }

        return response()->json($json);
    }

    public function get_geojson_layer_point_spatial($param, $date1, $date2){
        $data = DB::select("SELECT selected.".$param.", selected.country, st_asgeojson(ST_Centroid(countries.geom)) FROM countries LEFT JOIN (SELECT SUM(daily_".$param.") as deaths, country FROM world_covid_data WHERE date >= '".$date1."' AND date <= '".$date2."' GROUP BY country) as selected ON (selected.country = countries.country_name)");

        return response()->json($data);
    }

    public function graph_world_cumulative(Request $request){
        
        $start_date = $request->input('date1');
        $end_date = $request->input('date2');
        $param = $request->input('param');

        $parameter = "total_" . $param;

        $data = DB::select("SELECT SUM(".$parameter.") as ".$param.", date FROM world_covid_data WHERE date >= ? AND date <= ? GROUP BY date ORDER BY date", [$start_date, $end_date]);

        $json = [];

        for($i=0;$i < count($data); $i++){
            if($param == 'cases'){
                $json[$i] = array($param => $data[$i]->cases, "date" => $data[$i]->date);
            }
            elseif($param == 'deaths'){
                $json[$i] = array($param => $data[$i]->deaths, "date" => $data[$i]->date);
            }
            elseif($param == 'tests'){
                $json[$i] = array($param => $data[$i]->tests, "date" => $data[$i]->date);
            }
            elseif($param == 'vaccinations'){
                $json[$i] = array($param => $data[$i]->vaccinations, "date" => $data[$i]->date);
            }
        }

        return response()->json($json);
    }

    public function graph_world_daily(Request $request){
        $start_date = $request->input('date1');
        $end_date = $request->input('date2');
        $param = $request->input('param');

        $parameter = "daily_" . $param;

        $data = DB::select("SELECT SUM(".$parameter.") as ".$param.", date FROM world_covid_data WHERE date >= ? AND date <= ? GROUP BY date ORDER BY date", [$start_date, $end_date]);
        
        $json = [];

        for($i = 0; $i < count($data); $i++){
            if($param == 'cases'){
                $json[$i] = array($param => $data[$i]->cases, "date" => $data[$i]->date);
            }
            elseif($param == 'deaths'){
                $json[$i] = array($param => $data[$i]->deaths, "date" => $data[$i]->date);
            }
            elseif($param == 'tests'){
                $json[$i] = array($param => $data[$i]->tests, "date" => $data[$i]->date);
            }
            elseif($param == 'vaccinations'){
                $json[$i] = array($param => $data[$i]->vaccinations, "data" => $data[$i]->date);
            }
        }

        return response()->json($json);
    }

    public function counter_world(Request $request){
        $start_date = $request->input('date1');
        $end_date = $request->input('date2');

        $data = DB::select("SELECT SUM(daily_cases) as cases, SUM(daily_deaths) as deaths, SUM(daily_vaccinations) as vaccinations, SUM(daily_tests) as tests FROM world_covid_data WHERE date >= ? AND date <= ? ", [$start_date, $end_date]);
        
        $json = [];

        for($i=0; $i < count($data); $i++){
            $json[$i] = array("cases" => $data[$i]->cases, "deaths" => $data[$i]->deaths, "tests" => $data[$i]->tests, "vaccinations" => $data[$i]->vaccinations);
        }

        return response()->json($json);
    }

    public function get_counter_world(){

        $data = DB::select("SELECT SUM(daily_cases) as cases, SUM(daily_deaths) as deaths, SUM(daily_vaccinations) as vaccinations, SUM(daily_tests) as tests FROM world_covid_data WHERE date >= '02-02-2020' AND date <= '02-03-2020' ");
        
        return response()->json(['data' => $data]);
    }
}
