<?php

namespace App\Http\Controllers\HR;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PayrollController extends Controller
{
    public function index()
    {
        $employees = User::select('id', 'first_name', 'last_name')
        ->where('role', 'employee')
        ->get()
        ->map(function ($employee) {
            return [
                'id' => $employee->id,
                'name' => $employee->last_name . ', ' . $employee->first_name,
            ];
        });

        return Inertia::render('hr/PayrollPage', [
            'employees' => $employees
        ]);
    }


}
