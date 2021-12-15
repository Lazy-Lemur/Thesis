<!DOCTYPE html>
<html lang="{{ str_replace('_','-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">

    <!-- Scripts -->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.7.0/css/ol.css"
      type="text/css"
    />
    <script src="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.7.0/build/ol.js"></script>
    <script src="https://unpkg.com/ol-layerswitcher@3.8.3"></script>
    <link
      rel="stylesheet"
      href="https://unpkg.com/ol-layerswitcher@3.8.3/dist/ol-layerswitcher.css"
    />
    <script type="module" src="{{ asset('js/app.js') }}" defer></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>


    <!-- Styles -->
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <link rel="stylesheet" ref="{{ asset('css/dash.css') }}">
    <title>{{ config('app.name', 'Laravel') }}</title>
</head>
<body>
    @yield('content')
    <script src="load_layer.js"></script>
    <script src="{{ asset('js/mapp.js') }}"></script>
    <script src="click_info.js"></script>
    <script src="click_graph.js"></script>
</body>
</html>