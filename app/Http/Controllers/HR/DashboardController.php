<?php

namespace App\Http\Controllers\HR;

use App\Http\Controllers\Controller;
use App\Models\Leave;
use App\Models\Memo;
use App\Models\Payroll;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalEmployees = User::where('role', 'employee')
        ->count();

        $today = now()->toDateString();

        $activeEmployees = User::where('role', 'employee')
        ->whereHas('timekeepings', function ($query) use ($today) {
            $query->whereDate('date', $today)
                  ->whereNotNull('time_in');
        })
        ->count();

        $pendingLeaves = Leave::where('status', 'pending')
        ->count();

        $totalMemos = Memo::count();

        $counts = [
            'totalEmployees' => $totalEmployees,
            'activeEmployees' => $activeEmployees,
            'pendingLeaves' => $pendingLeaves,
            'totalMemos' => $totalMemos,
        ];

        $employeesData = User::select('id', 'first_name', 'last_name', 'email', 'contact_number' ,'position', 'department', 'hired_at', 'address')
        ->where('role', 'employee')
        ->with(['timekeepings' => function ($query) use ($today) {
            $query->whereDate('date', $today)
                  ->whereNotNull('time_in');
        }])
        ->get()
        ->take(5)
        ->map(function ($employee) {
            return [
                'id' => $employee->id,
                'first_name' => $employee->first_name,
                'last_name' => $employee->last_name,
                'name' => $employee->last_name . ', ' . $employee->first_name,
                'email' => $employee->email,
                'contact_number' => $employee->contact_number,
                'position' => $employee->position,
                'department' => $employee->department,
                'hired_at' => $employee->hired_at,
                'address' => $employee->address,
                'status' => $employee->timekeepings->isNotEmpty() ? 'Active' : 'Inactive',
            ];
        });

        $payrollData = Payroll::with('employee')
        ->where('status', 'pending')
        ->orderBy('created_at', 'desc')
        ->get()
        ->take(5)
        ->map(function ($payroll) {
            return [
                'id' => $payroll->id,
                'name' => $payroll->employee->last_name . ', ' . $payroll->employee->first_name,
                'period_start' => $payroll->period_start,
                'period_end' => $payroll->period_end,
                'basic_salary' => $payroll->basic_salary,
                'overtime_pay' => $payroll->overtime_pay,
                'deductions' => $payroll->deductions,
                'tax_percentage' => $payroll->tax_percentage,
                'net_pay' => $payroll->net_pay,
            ];
        });

        $leaveRequestData = Leave::with('employee')
        ->where('status', 'pending')
        ->get()
        ->take(5)
        ->map(function ($leave) {
            return [
                'id' => $leave->id,
                'first_name' => $leave->employee->first_name,
                'last_name' => $leave->employee->last_name,
                'name' => $leave->employee->last_name . ', ' . $leave->employee->first_name,
                'leave_type' => ucwords(str_replace('_', ' ', $leave->leave_type)),
                'start_date' => $leave->start_date,
                'end_date' => $leave->end_date,
                'days' => $leave->days,
                'reason' => $leave->reason ?? 'N/A',
                'status' => ucfirst($leave->status),
            ];
        });

        return Inertia::render('hr/DashboardPage', [
            'counts' => $counts,
            'employeesData' => $employeesData,
            'payrollData' => $payrollData,
            'leaveRequestData' => $leaveRequestData,
        ]);
    }
}
