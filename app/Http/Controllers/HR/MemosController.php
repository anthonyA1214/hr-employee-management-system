<?php

namespace App\Http\Controllers\HR;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MemosController extends Controller
{
    public function index()
    {
        return Inertia::render('hr/MemosPage');
    }
}
