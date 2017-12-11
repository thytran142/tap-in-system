<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Setting;
class SettingController extends Controller
{
    public function getSetting(){
        $settings = Setting::all();
        return response()->success($settings);
    }
}
