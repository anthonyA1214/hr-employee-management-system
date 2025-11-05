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
        $timekeepingData = Timekeeping::with('employee')
        ->orderBy('date', 'desc')
        ->get()
        ->map(function ($record) {
            $record->name = $record->employee->last_name . ', ' . $record->employee->first_name;

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

        return Inertia::render('hr/TimekeepingPage', [
            'timekeepingData' => $timekeepingData
        ]);
    }
}
