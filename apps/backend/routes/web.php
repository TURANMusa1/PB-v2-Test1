<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'message' => 'PeopleBox ATS v2 API',
        'version' => '1.0.0',
        'endpoints' => [
            'auth' => [
                'POST /api/login' => 'User login',
                'POST /api/register' => 'User registration',
                'POST /api/logout' => 'User logout (Auth required)',
                'GET /api/profile' => 'User profile (Auth required)',
            ]
        ]
    ]);
});
