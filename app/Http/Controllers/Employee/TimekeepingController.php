<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use App\Models\Timekeeping;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TimekeepingController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $today = now()->toDateString();

        $timekeeping = Timekeeping::where('employee_id', $user->id)
        ->where('date', $today)
        ->first();
        
        $timekeepingData = Timekeeping::where('employee_id', $user->id)
        ->orderBy('date', 'desc')
        ->get()
        ->map(function ($record) {
            if ($record->time_in && $record->time_out) {
                $timeIn = Carbon::parse($record->time_in);
                $timeOut = Carbon::parse($record->time_out);

                // If time out is earlier than time in, add 1 day (overnight shift)
                if ($timeOut->lessThan($timeIn)) {
                    $timeOut->addDay();
                }

                $record->total_hours = round($timeIn->diffInMinutes($timeOut) / 60, 2);
            } else {
                $record->total_hours = null;
            }

            return $record;
        });

        return Inertia::render('employee/TimekeepingPage', [
            'timekeeping' => $timekeeping,
            'timekeepingData' => $timekeepingData
        ]);
    }

    public function timeIn(Request $request)
    {
        $user = $request->user();

        // Logic to record time in
        $date = $request->input('date');
        $time = $request->input('time');

        $timeIn = Carbon::createFromFormat('H:i:s', $time);
        $cutOff = Carbon::createFromTime(8, 10, 0); // 8:10 AM

        $existing = $user->timekeepings()->where('date', $date)->first();

        if ($existing) {
            return redirect()->back()->withErrors(['You have already timed in today.']);
        } 

        $lateMinutes = 0;
        if ($timeIn->greaterThan($cutOff)) {
            $lateMinutes = $cutOff->diffInMinutes($timeIn);
        }

        $user->timekeepings()->create([
            'date' => $date,
            'time_in' => $time,
            'late_minutes' => $lateMinutes,
        ]);

        return redirect()->back()->with('success', 'Time in recorded successfully.');
        
    }

    public function timeOut(Request $request)
    {
        $user = $request->user();

        // Logic to record time out
        $date = $request->input('date');
        $time = $request->input('time');

        $timeOut = Carbon::createFromFormat('H:i:s', $time);
        $cutOff = Carbon::createFromTime(17, 0, 0); // 5:00 PM

        $existing = $user->timekeepings()->where('date', $date)->first();

        $overtimeMinutes = 0;
        if ($timeOut->greaterThan($cutOff)) {
            $overtimeMinutes = $cutOff->diffInMinutes($timeOut);
        }

        if ($existing && !$existing->time_out) {
            $existing->update([
                'time_out' => $time,
                'overtime_minutes' => $overtimeMinutes,
            ]);

            return redirect()->back()->with('success', 'Time out recorded successfully.');
        } else {
            return redirect()->back()->withErrors(['You have not timed in today or already timed out.']);
        }
    }
}
