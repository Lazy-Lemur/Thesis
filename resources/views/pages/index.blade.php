@extends('layouts.app')

@section('content')
    <div id="top">
        <h5>
            <center>{{$title}}</center>
        </h5>
    </div>
    <div id="drop">
        <!-- <label for="start_date">FROM:</label>-->
        <input
          type="date"
          id="start_date"
          name="start_date"
          placeholder="dd-mm-yyyy"
          min="2020-01-01"
          max="2021-07-31"
          value="2020-01-01"
        />
        <!--   <label for="end_date">TO:</label>-->
        <input
          type="date"
          id="end_date"
          name="end_date"
          placeholder="dd-mm-yyyy"
          min="2020-01-01"
          max="2021-07-31"
          value="2021-07-31"
        />
        <select
          id="parameter"
          class="form-select form-select-sm"
          aria-label=".form-select-sm example"
        >
          {{-- <option selected value="population">Population</option>
          <option value="employed">Employed</option>
          <option value="unemployed">Unemployed</option>
          <option value="underemployed">Underemployed</option> --}}
          <option selected value="cases">Confirmed Cases</option>
          <option value="deaths">Deaths</option>
          <option value="tests">Tests</option>
          <option value="vaccinations">Vaccinations</option>
        </select>
      </div>
      <div id="counter">
        <center>
          {{-- <button class="btn btn-light" type="button" id="population"></button>
          <button class="btn btn-danger" type="button" id="employed"></button>
          <button class="btn btn-warning" type="button" id="unemployed"></button>
          <button class="btn btn-info" type="button" id="underemployed"></button> --}}
          <button class="btn btn-light" type="button" id="cases"></button>
          <button class="btn btn-danger" type="button" id="deaths"></button>
          <button class="btn btn-warning" type="button" id="tests"></button>
          <button class="btn btn-info" type="button" id="vaccinations"></button>
        </center>
      </div>
  
      <div id="graph1"><canvas id="mycanvas1"></canvas></div>
      <div id="graph2"><canvas id="mycanvas2"></canvas></div>
      <div id="map" class="map">
        <div id="legend">
          <div class="">
            <div id="legend_title" style="font-size: 11px">Legend</div>
          </div>
          <div class="symbol">
            <div id="class6"></div>
            <div id="6" class="legend_txt" style="font-size: 12px"></div>
          </div>
          <div class="symbol">
            <div id="class5"></div>
            <div id="5" class="legend_txt" style="font-size: 12px"></div>
          </div>
          <div class="symbol">
            <div id="class4"></div>
            <div id="4" class="legend_txt" style="font-size: 12px"></div>
          </div>
          <div class="symbol">
            <div id="class3"></div>
            <div id="3" class="legend_txt" style="font-size: 12px"></div>
          </div>
          <div class="symbol">
            <div id="class2"></div>
            <div id="2" class="legend_txt" style="font-size: 12px"></div>
          </div>
          <div class="symbol">
            <div id="class1"></div>
            <div id="1" class="legend_txt" style="font-size: 12px"></div>
          </div>
          <div class="symbol">
            <div id="class0"></div>
            <div id="0" class="legend_txt" style="font-size: 12px"></div>
          </div>
        </div>
      </div>
      <div id="popup" class="ol-popup">
        <a href="#" id="popup-closer" class="ol-popup-closer"></a>
        <div id="popup-content"></div>
      </div>
  
      <div id="info">&nbsp;</div>
@endsection

@section('scripts')
    <script type="text/javascript">
      window.map_view.display();
    </script>
    {{-- <script src="{{ asset('js/mapp.js') }}"></script> --}}
    {{-- <script src="{{ asset('js/covid_load_layer.js') }}"></script> --}}
    {{-- <script src="{{ asset('js/covid_click_info.js') }}"></script> --}}
    {{-- <script src="{{ asset('js/covid_click_graph.js') }}"></script> --}}
@endsection