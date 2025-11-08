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
            'end_date' => ['nullable', 'date'], // we'll validate manually for vacation_leave
            'reason' => ['nullable', 'string', 'max:500'],
        ]);

        $days = match ($validatedAttributes['leave_type']) {
            'sick_leave' => 1,
            'maternity_leave' => 105,
            'paternity_leave' => 7,
            'emergency_leave' => 3,
            'vacation_leave' => null, // will calculate from dates
            default => 1,
        };

        $startDate = $validatedAttributes['start_date'] ? Carbon::parse($validatedAttributes['start_date']) : Carbon::tomorrow();

        if ($validatedAttributes['leave_type'] === 'vacation_leave') {
            if (!empty($validatedAttributes['end_date'])) {
                $endDate = Carbon::parse($validatedAttributes['end_date']);
                if ($endDate->lt($startDate)) {
                    return redirect()->back()->withErrors(['end_date' => 'End date cannot be before start date.']);
                }
                $days = $startDate->diffInDays($endDate) + 1; // include start date
            } else {
                $endDate = $startDate->copy(); // default to 1 day if end_date not provided
                $days = 1;
            }
            $status = 'pending';
        } else {
            $endDate = $startDate->copy()->addDays($days - 1);
            $status = 'approved';
        }

        $user = $request->user();

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