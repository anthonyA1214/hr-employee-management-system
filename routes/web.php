<?php

use App\Http\Controllers\Auth\SessionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/login', [SessionController::class, "create"])->name("login");

Route::get('/', function () {
    return Inertia::render('hr/DashboardPage');
});
