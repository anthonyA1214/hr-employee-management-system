<?php

namespace App\Http\Controllers\HR;

use App\Http\Controllers\Controller;
use App\Models\Leave;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeaveRequestsController extends Controller
{
    public function index()
    {
        $leaveRequestsData = Leave::with('employee')
        ->where('status', 'pending')
        ->get()
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

        return Inertia::render('hr/LeaveRequestsPage', [
            'leaveRequestsData' => $leaveRequestsData,
        ]);
    }

    public function approve($id)
    {
        $leaveRequest = Leave::findOrFail($id);
        $leaveRequest->status = 'approved';
        $leaveRequest->save();

        return redirect()->back();
    }

    public function reject($id)
    {
        $leaveRequest = Leave::findOrFail($id);
        $leaveRequest->status = 'rejected';
        $leaveRequest->save();

        return redirect()->back();
    }
}
