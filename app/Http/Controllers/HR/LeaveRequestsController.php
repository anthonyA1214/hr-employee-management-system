<?php

namespace App\Http\Controllers\HR;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeaveRequestsController extends Controller
{
    public function index()
    {
        return Inertia::render('hr/LeaveRequestsPage');
    }
}
