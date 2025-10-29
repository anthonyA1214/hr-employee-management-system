<?php

use App\Http\Controllers\Auth\SessionController;
use App\Http\Controllers\HR\ArchiveController;
use App\Http\Controllers\HR\DashboardController;
use App\Http\Controllers\HR\EmployeesController;
use App\Http\Controllers\HR\LeaveRequestsController;
use App\Http\Controllers\HR\MemosController;
use App\Http\Controllers\HR\PayrollController;
use App\Http\Controllers\HR\SettingsController;
use App\Http\Controllers\HR\TimekeepingController;
use Illuminate\Support\Facades\Route;

Route::get('/login', [SessionController::class, 'create'])->name('login');
Route::post('/login', [SessionController::class, 'store'])->name('login.store');
Route::post('/logout', [SessionController::class, 'destroy'])->name('logout');

Route::middleware(['auth', 'role:hr'])
->prefix('hr')
->name('hr.')
->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/employees', [EmployeesController::class, 'index'])->name('employees');
    Route::get('/payroll', [PayrollController::class, 'index'])->name('payroll');
    Route::get('/timekeeping', [TimekeepingController::class, 'index'])->name('timekeeping');
    Route::get('/memos', [MemosController::class, 'index'])->name('memos');
    Route::get('/leave-requests', [LeaveRequestsController::class, 'index'])->name('leave-requests');
    Route::get('/settings', [SettingsController::class, 'index'])->name('settings');
    Route::get('/archive', [ArchiveController::class, 'index'])->name('archive');
});
