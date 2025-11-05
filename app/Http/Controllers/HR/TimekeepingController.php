<?php

namespace App\Http\Controllers\HR;

use App\Http\Controllers\Controller;
use App\Models\Timekeeping;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TimekeepingController extends Controller
{
    public function index()
    {
        $timekeepingData = Timekeeping::orderBy('date', 'desc')
        ->get()
        ->map(function ($record) {
            if ($record->time_in && $record->time_out) {
                $timeIn = Carbon::parse($record->time_in);
                $timeOut = Carbon::parse($record->time_out);
                $record->total_hours = round($timeOut->diffInMinutes($timeIn) / 60, 2); // e.g. 7.5 hours
            } else {
                $record->total_hours = null; // no time out yet
            }

            return [
                'id' => $record->id,
                'name' => $record->employee->last_name . ', ' . $record->employee->first_name,
                'date' => $record->date,
                'time_in' => $record->time_in,
                'time_out' => $record->time_out,
                'late_minutes' => $record->late_minutes,
                'overtime_minutes' => $record->overtime_minutes,
                'total_hours' => $record->total_hours,
            ];
        });

        return Inertia::render('hr/TimekeepingPage', [
            'timekeepingData' => $timekeepingData
        ]);
    }
}
