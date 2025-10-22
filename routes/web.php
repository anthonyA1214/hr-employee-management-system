<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/jsx', function () {
    return Inertia::render('jsx');
});
