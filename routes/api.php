<?php

use App\Http\Controllers\api\account\indexController as AccountIndexController;
use App\Http\Controllers\api\category\indexController as CategoryIndexController;
use App\Http\Controllers\api\product\indexController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'prefix' => 'auth'
], function(){
    Route::post('login',[AuthController::class,'login']);
    Route::post('register',[AuthController::class,'register']);
});

Route::group([
    'middleware' => ['auth:api']
],function(){
    Route::post('logout',[AuthController::class,'logout']);
    Route::post('/authenticate',[AuthController::class,'authenticate']);
    Route::resource('product', indexController::class);
    Route::resource('category', CategoryIndexController::class);
    Route::resource('account', AccountIndexController::class);
});