<?php

namespace App\Http\Controllers\HR;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class EmployeesController extends Controller
{
    public function index(Request $request)
    {
        $today = now()->toDateString();
        $search = $request->input('query');

        $employees = User::select('id', 'first_name', 'last_name', 'email', 'contact_number' ,'position', 'department', 'hired_at', 'address')
        ->where('role', 'employee')
        ->when($search, function ($query, $search) {
            $query->where(function ($subQuery) use ($search) {
                $subQuery->where('first_name', 'like', '%' . $search . '%')
                ->orWhere('last_name', 'like', '%' . $search . '%');
            });
        })
        ->with(['timekeepings' => function ($query) use ($today) {
            $query->whereDate('date', $today)
                    ->whereNotNull('time_in');
        }])
        ->orderBy('last_name')
        ->paginate(10)
        ->withQueryString()
        ->through(function ($employee) {
            return [
                'id' => $employee->id,
                'first_name' => $employee->first_name,
                'last_name' => $employee->last_name,
                'name' => $employee->last_name . ', ' . $employee->first_name,
                'email' => $employee->email,
                'contact_number' => $employee->contact_number,
                'position' => $employee->position,
                'department' => $employee->department,
                'hired_at' => $employee->hired_at,
                'address' => $employee->address,
                'status' => $employee->timekeepings->isNotEmpty() ? 'Active' : 'Inactive',
            ];
        });

        return Inertia::render('hr/EmployeesPage', [
            'employees' => $employees,
        ]);
    }

    public function store(Request $request)
    {
        $validatedAttributes = $request->validate([
            'first_name' => ['required', 'string', 'max:50'],
            'last_name' => ['required', 'string', 'max:50'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', Password::min(8)],
            'password_confirmation' => ['required', 'same:password'],
            'contact_number' => ['required', 'string', 'max:15'],
            'position' => ['required', 'string', 'max:100'],
            'department' => ['required', 'string', 'max:100'],
            'hired_at' => ['required', 'date'],
            'address' => ['required', 'string', 'max:255'],
        ]);

        User::create($validatedAttributes);

        return redirect()->back();
    }

    public function update(Request $request, $id)
    {
        $employee = User::findOrFail($id);

        $validatedAttributes = $request->validate([
            'first_name' => ['required', 'string', 'max:50'],
            'last_name' => ['required', 'string', 'max:50'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email,' . $employee->id],
            'contact_number' => ['required', 'string', 'max:15'],
            'position' => ['required', 'string', 'max:100'],
            'department' => ['required', 'string', 'max:100'],
            'hired_at' => ['required', 'date'],
            'address' => ['required', 'string', 'max:255'],
        ]);

        $employee->update($validatedAttributes);

        return redirect()->back();
    }

    public function destroy($id)
    {
        $employee = User::findOrFail($id);
        $employee->delete();

        return redirect()->back();
    }
}
