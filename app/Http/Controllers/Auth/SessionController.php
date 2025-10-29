<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class SessionController extends Controller
{
    public function create()
    {
        return Inertia::render('auth/LoginPage');
    }

    public function store(Request $request)
    {
        $validatedAttributes = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);

        // Attempt to authenticate the user...
        if(!Auth::attempt($validatedAttributes)) {
            throw ValidationException::withMessages([
                'email' => 'The provided credentials are incorrect.'
            ]);
        }

        $request->session()->regenerate();

        $user = Auth::user();

        if ($user->role === 'hr') {
            return redirect()->intended('/hr/dashboard');
        }

        if ($user->role === 'employee') {
            return redirect()->intended('/employee/dashboard');
        }

        // Default fallback (optional)
        return redirect()->intended('/');
    }

    public function destroy(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/login');
    }
}
