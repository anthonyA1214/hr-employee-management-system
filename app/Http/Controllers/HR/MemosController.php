<?php

namespace App\Http\Controllers\HR;

use App\Http\Controllers\Controller;
use App\Models\Memo;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MemosController extends Controller
{
    public function index()
    {
        $employees = User::select('id', 'first_name', 'last_name')
        ->where('role', 'employee')
        ->get()
        ->map(function ($employee) {
            return [
                'id' => $employee->id,
                'name' => $employee->last_name . ', ' . $employee->first_name,
            ];
        });

        $memosData = Memo::with('recipients')
        ->orderBy('sent_at', 'desc')
        ->get()
        ->map(function ($memo) {
            return [
                'id' => $memo->id,
                'subject' => $memo->subject,
                'body' => $memo->body,
                'sent_at' => $memo->sent_at,
                'name' => $memo->recipients->map(function ($recipient) {
                    return $recipient->last_name . ', ' . $recipient->first_name;
                })->join('; '),
            ];
        });

        return Inertia::render('hr/MemosPage', [
            'employees' => $employees,
            'memosData' => $memosData
        ]);
    }

    public function store(Request $request)
    {
        $validatedAttributes = $request->validate([
            'employee_id' => ['required'],
            'subject' => ['required', 'string', 'max:255'],
            'body' => ['required', 'string'],
        ]);

        $memo = Memo::create([
            'hr_id' => $request->user()->id,
            'subject' => $validatedAttributes['subject'],
            'body' => $validatedAttributes['body'],
            'sent_at' => now(),
        ]);

        if ($validatedAttributes['employee_id'] === 'all') {
            $employeeIds = User::where('role', 'employee')->pluck('id');
            $memo->recipients()->attach($employeeIds);
        } else {
            $memo->recipients()->attach($validatedAttributes['employee_id']);
        }

        return redirect()->route('hr.memos');
    }
}