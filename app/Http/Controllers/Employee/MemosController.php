<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use App\Models\Memo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MemosController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $memosData = $user->receivedMemos()
        ->paginate(10)
        ->through(function ($memo) {
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
