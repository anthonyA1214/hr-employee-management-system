<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use App\Models\Leave;
use App\Models\Payroll;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $pendingLeaves = $user->leaves()
        ->where('status', 'pending')
        ->count();

        $approvedLeaves = $user->leaves()
        ->where('status', 'approved')
        ->count();

        $totalMemos = $user->receivedMemos()
        ->count();

        $counts = [
            'pendingLeaves' => $pendingLeaves,
            'approvedLeaves' => $approvedLeaves,
            'totalMemos' => $totalMemos,
        ];

        $payrollData = Payroll::where('employee_id', $user->id)
        ->where('status', 'paid')
        ->orderBy('created_at', 'desc')
        ->get();

        $leaveRequestsData = $user->leaves()
        ->get()
        ->map(function ($leave) {
            return [
                'id' => $leave->id,
                'leave_type' => ucwords(str_replace('_', ' ', $leave->leave_type)),
                'start_date' => $leave->start_date,
                'end_date' => $leave->end_date,
                'days' => $leave->days,
                'reason' => $leave->reason ?? 'N/A',
                'status' => ucfirst($leave->status),
            ];
        });

        $memosData = $user->receivedMemos()
        ->get()
        ->map(function ($memo) {
            return [
                'id' => $memo->id,
                'subject' => $memo->subject,
                'sent_at' => $memo->sent_at,
                'body' => $memo->body,
                'issued_by' => $memo->hr->last_name . ', ' . $memo->hr->first_name,
            ];
        });

        return Inertia::render('employee/DashboardPage', [
            'counts' => $counts,
            'payrollData' => $payrollData,
            'leaveRequestsData' => $leaveRequestsData,
            'memosData' => $memosData,
        ]);
    }
}
