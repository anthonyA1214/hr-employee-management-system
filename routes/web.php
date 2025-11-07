<?php

use App\Http\Controllers\Auth\SessionController;
use App\Http\Controllers\Employee\ArchiveController as EmployeeArchiveController;
use App\Http\Controllers\Employee\DashboardController as EmployeeDashboardController;
use App\Http\Controllers\Employee\LeaveRequestsController as EmployeeLeaveRequestsController;
use App\Http\Controllers\Employee\MemosController as EmployeeMemosController;
use App\Http\Controllers\Employee\PayrollController as EmployeePayrollController;
use App\Http\Controllers\Employee\TimekeepingController as EmployeeTimekeepingController;
use App\Http\Controllers\HR\ArchiveController;
use App\Http\Controllers\HR\DashboardController;
use App\Http\Controllers\HR\EmployeesController;
use App\Http\Controllers\HR\LeaveRequestsController;
use App\Http\Controllers\HR\MemosController;
use App\Http\Controllers\HR\PayrollController;
use App\Http\Controllers\HR\TimekeepingController;
use App\Http\Controllers\SettingsController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'LandingPage')->name('landing');

Route::middleware('guest')
->group(function () {
    Route::get('/login', [SessionController::class, 'create'])->name('login');
    Route::post('/login', [SessionController::class, 'store'])->name('login.store');
});

Route::post('/logout', [SessionController::class, 'destroy'])->name('logout');

Route::middleware(['auth', 'role:hr'])
->prefix('hr')
->name('hr.')
->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/employees', [EmployeesController::class, 'index'])->name('employees');
    Route::post('/employees/add', [EmployeesController::class, 'store'])->name('employees.add');
    Route::put('/employees/edit/{id}', [EmployeesController::class, 'update'])->name('employees.edit');
    Route::delete('/employees/delete/{id}', [EmployeesController::class, 'destroy'])->name('employees.delete');

    Route::get('/payroll', [PayrollController::class, 'index'])->name('payroll');
    Route::post('/payroll/add', [PayrollController::class, 'store'])->name('payroll.add');
    Route::put('/payroll/send/{id}', [PayrollController::class, 'send'])->name('payroll.send');
    Route::delete('/payroll/delete/{id}', [PayrollController::class, 'destroy'])->name('payroll.delete');

    Route::get('/timekeeping', [TimekeepingController::class, 'index'])->name('timekeeping');

    Route::get('/memos', [MemosController::class, 'index'])->name('memos');
    Route::post('/memos/send', [MemosController::class, 'store'])->name('memos.send');

    Route::get('/leave-requests', [LeaveRequestsController::class, 'index'])->name('leave-requests');
    Route::put('/leave-requests/approve/{id}', [LeaveRequestsController::class, 'approve'])->name('leave-requests.approve');
    Route::put('/leave-requests/reject/{id}', [LeaveRequestsController::class, 'reject'])->name('leave-requests.reject');

    Route::get('/archive', [ArchiveController::class, 'index'])->name('archive');
});

Route::middleware(['auth', 'role:employee'])
->prefix('employee')
->name('employee.')
->group(function () {
    Route::get('/dashboard', [EmployeeDashboardController::class, 'index'])->name('dashboard');

    Route::get('/payroll', [EmployeePayrollController::class, 'index'])->name('payroll');

    Route::get('/timekeeping', [EmployeeTimekeepingController::class, 'index'])->name('timekeeping');
    Route::post('/timekeeping/time-in', [EmployeeTimekeepingController::class, 'timeIn'])->name('timekeeping.time-in');
    Route::post('/timekeeping/time-out', [EmployeeTimekeepingController::class, 'timeOut'])->name('timekeeping.time-out');

    Route::get('/memos', [EmployeeMemosController::class, 'index'])->name('memos');

    Route::get('/leave-requests', [EmployeeLeaveRequestsController::class, 'index'])->name('leave-requests');
    Route::post('/leave-requests/submit', [EmployeeLeaveRequestsController::class, 'store'])->name('leave-requests.submit');

    Route::get('/archive', [EmployeeArchiveController::class, 'index'])->name('archive');
});

Route::middleware(['auth', 'role:hr,employee'])
->prefix('settings')
->name('settings.')
->group(function () {
    Route::get('/', [SettingsController::class, 'index'])->name('index');
    Route::put('/edit/{id}', [SettingsController::class, 'update'])->name('edit');
});