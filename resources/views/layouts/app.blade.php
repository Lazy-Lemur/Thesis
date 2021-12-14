<!DOCTYPE html>
<html lang="{{ str_replace('_','-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Styles -->
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <link rel="stylesheet" ref="{{ asset('css/dash.css') }}">
    <title>{{ config('app.name', 'Laravel') }}</title>
</head>
<body>
    @yield('content')
    <script src="load_layer.js"></script>
    <script src="map.js"></script>
    <script src="click_info.js"></script>
    <script src="click_graph.js"></script>
</body>
</html>