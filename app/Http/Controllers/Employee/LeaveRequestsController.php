<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeaveRequestsController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $leaveRequestsData = $user->leaves()
        ->paginate(10)
        ->through(function ($leave) {
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

        return Inertia::render('employee/LeaveRequestsPage', [
            'leaveRequestsData' => $leaveRequestsData,
        ]);
    }

    public function store(Request $request)
    {
        $validatedAttributes = $request->validate([
            'leave_type' => ['required', 'string', 'max:100'],
            'start_date' => ['nullable', 'date', 'after_or_equal:today'],
            'reason' => ['nullable', 'string', 'max:500'],
        ]);

        $days = match ($validatedAttributes['leave_type']) {
            'sick_leave' => 1,
            'vacation_leave' => 1,
            'maternity_leave' => 65,
            'paternity_leave' => 7,
            'emergency_leave' => 3,
            default => 1,
        };

        $startDate = $validatedAttributes['start_date'] ? Carbon::parse($validatedAttributes['start_date']) : Carbon::tomorrow();
        $endDate = $startDate->copy()->addDays($days - 1);

        $user = $request->user();  
        
        $status = $validatedAttributes['leave_type'] === 'vacation_leave' ? 'pending' : 'approved';

        $user->leaves()->create([
            ...$validatedAttributes,
            'start_date' => $startDate->toDateString(),
            'end_date' => $endDate->toDateString(),
            'days' => $days,
            'status' => $status,
        ]);

        return redirect()->back();
    }
}
