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
                    $record->total_hours = round($timeOut->diffInMinutes($timeIn) / 60, 2); // e.g. 7.5 hours
                } else {
                    $record->total_hours = null; // no time out yet
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

        $existing = $user->timekeepings()->where('date', $date)->first();

        if ($existing) {
            return redirect()->back()->withErrors(['You have already timed in today.']);
        } else {
            $user->timekeepings()->create([
                'date' => $date,
                'time_in' => $time,
            ]);

            return redirect()->back()->with('success', 'Time in recorded successfully.');
        }
    }

    public function timeOut(Request $request)
    {
        $user = $request->user();

        // Logic to record time out
        $date = $request->input('date');
        $time = $request->input('time');

        $existing = $user->timekeepings()->where('date', $date)->first();

        if ($existing && !$existing->time_out) {
            $existing->update([
                'time_out' => $time,
            ]);

            return redirect()->back()->with('success', 'Time out recorded successfully.');
        } else {
            return redirect()->back()->withErrors(['You have not timed in today or already timed out.']);
        }
    }
}
