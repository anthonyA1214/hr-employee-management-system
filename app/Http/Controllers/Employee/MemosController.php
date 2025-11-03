<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MemosController extends Controller
{
    public function index()
    {
        return Inertia::render('employee/MemosPage');
    }
}
