<?php

namespace App\Providers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share([
            'auth' => function () {
                if (Auth::check()) {
                    return [
                        'user' => [
                            'first_name' => Auth::user()->first_name,
                            'last_name' => Auth::user()->last_name,
                            'profile_photo_path' => Auth::user()->profile_photo,
                            'role' => Auth::user()->role,
                        ],
                    ];
                }
                return ['user' => null];
            }
        ]);
    }
}
