<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        return Inertia::render('SettingsPage', [
            'user' => $user
        ]);
    }

    public function update(Request $request, $id)
    {
        $validatedAttributes = $request->validate([
            'first_name' => ['required', 'string', 'max:50'],
            'last_name' => ['required', 'string', 'max:50'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email,' . $id],
            'contact_number' => ['required', 'string', 'max:15'],
            'address' => ['required', 'string', 'max:255'],
            'position' => ['required', 'string', 'max:100'],
            'department' => ['required', 'string', 'max:100'],
            'old_password' => ['nullable', 'string', 'min:8', 'required_with:new_password'],
            'new_password' => ['nullable', 'string', 'min:8', 'confirmed', 'different:old_password'],
        ]);

        $user = $request->user();

        if ($user->id != $id) {
            abort(403, 'Unauthorized action.');
        }

        if ($request->filled('new_password')) {
            if (!Hash::check($request->old_password, $user->password)) {
                return back()->withErrors([
                    'old_password' => 'The provided old password does not match our records.',
                ]);
            }

            $validatedAttributes['password'] = Hash::make($request->new_password);
        }

        $user->update($validatedAttributes);

        return redirect()->back();
    }
}
