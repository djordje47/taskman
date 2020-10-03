<?php

use Illuminate\Http\Request;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
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
Route::get('projects', [ProjectController::class, 'index']);
Route::post('projects', [ProjectController::class, 'store']);
Route::get('projects/{id}', [ProjectController::class, 'show']);
Route::put('projects/{projects}', [ProjectController::class, 'markAsCompleted']);

Route::post('tasks', [TaskController::class, 'store']);
Route::put('tasks/{task}', [TaskController::class, 'markAsCompleted']);

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//  return $request->user();
//});
