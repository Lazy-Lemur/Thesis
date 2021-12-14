<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MapController extends Controller
{
    public function index(){
        $title = "Butuan Employment and Population Rate GIS Dashboard";
        return view('pages.index')->with('title', $title);
    }
}
