<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use App\Models\Memo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MemosController extends Controller
{
    public function index()
    {
        $employeeId = request()->user()->id;

        $memosData = Memo::with('recipients')
        ->whereHas('recipients', function ($query) use ($employeeId) {
            $query->where('employee_id', $employeeId);
        })
        ->orderBy('sent_at', 'desc')
        ->get()
        ->map(function ($memo) {
            return [
                'id' => $memo->id,
                'subject' => $memo->subject,
                'body' => $memo->body,
                'sent_at' => $memo->sent_at,
                'issued_by' => $memo->hr->last_name . ', ' . $memo->hr->first_name,
            ];
        });

        return Inertia::render('employee/MemosPage', [
            'memosData' => $memosData
        ]);
    }
}
