<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use App\Models\Payroll;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PayrollController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $payrollData = Payroll::where('employee_id', $user->id)
        ->where('status', 'paid')
        ->orderBy('created_at', 'desc')
        ->get();
        
        return Inertia::render('employee/PayrollPage', [
            'payrollData' => $payrollData,
        ]);
    }
}
