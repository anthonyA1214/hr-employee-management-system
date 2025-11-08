<?php

namespace App\Http\Controllers\HR;

use App\Http\Controllers\Controller;
use App\Models\Timekeeping;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TimekeepingController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('query');

        $timekeepingData = Timekeeping::with('employee')
        ->when($search, function ($query, $search) {
            $query->whereHas('employee', function ($q) use ($search) {
                $q->where('first_name', 'like', '%' . $search . '%')
                    ->orWhere('last_name', 'like', '%' . $search . '%');
            });
        })
        ->orderBy('date', 'desc')
        ->paginate(10)
        ->withQueryString()
        ->through(function ($record) {
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
