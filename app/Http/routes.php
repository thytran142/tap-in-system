<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::group(['middleware' => ['web']], function () {
    Route::get('/', 'AngularController@serveApp');
    Route::get('/unsupported-browser', 'AngularController@unsupported');
    Route::get('user/verify/{verificationCode}', ['uses' => 'Auth\AuthController@verifyUserEmail']);
    Route::get('auth/{provider}', ['uses' => 'Auth\AuthController@redirectToProvider']);
    Route::get('auth/{provider}/callback', ['uses' => 'Auth\AuthController@handleProviderCallback']);
    Route::get('/api/authenticate/user', 'Auth\AuthController@getAuthenticatedUser');
});

$api->group(['middleware' => ['api']], function ($api) {
    $api->controller('auth', 'Auth\AuthController');

    // Password Reset Routes...
    $api->post('auth/password/email', 'Auth\PasswordResetController@sendResetLinkEmail');
    $api->get('auth/password/verify', 'Auth\PasswordResetController@verify');
    $api->post('auth/password/reset', 'Auth\PasswordResetController@reset');
    $api->get("records/list","RecordController@listRecord");
});

$api->group(['middleware' => ['api', 'api.auth']], function ($api) {
    $api->get('users/me', 'UserController@getMe');
    $api->put('users/me', 'UserController@putMe');
    $api->get('setting/get','SettingController@getSetting');
    $api->get('projects/get','ProjectController@getProjectList');
    $api->post('projects/delete','ProjectController@deleteProject');
    $api->post('projects/put',"ProjectController@putProject");
    $api->post("projects/show","ProjectController@showProject");
    $api->post("projects/update","ProjectController@updateProject");
    $api->post("records/put","RecordController@putRecord");
    $api->get("records/get-latest","RecordController@getLatestRecord");
    $api->post("records/update","RecordController@updateRecord");
    $api->post("records/delete","RecordController@deleteRecord");
    $api->get('tasks/list',"TaskController@getTaskList");
    $api->get('tasks/delete','TaskController@deleteTask');
    $api->post('tasks/put',"TaskController@putTask");
    $api->post("tasks/getTaskForProject","TaskController@getTaskForProject");
    $api->post("records/getReport","RecordController@getReport");
});

$api->group(['middleware' => ['api', 'api.auth', 'role:admin.super|admin.user']], function ($api) {
    $api->controller('users', 'UserController');
});
