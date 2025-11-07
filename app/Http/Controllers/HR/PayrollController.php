<?php

namespace App\Http\Controllers\HR;

use App\Http\Controllers\Controller;
use App\Models\Payroll;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PayrollController extends Controller
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

        $payrollData = Payroll::with('employee')
        ->where('status', 'pending')
        ->orderBy('created_at', 'desc')
        ->get()
        ->map(function ($payroll) {
            return [
                'id' => $payroll->id,
                'name' => $payroll->employee->last_name . ', ' . $payroll->employee->first_name,
                'period_start' => $payroll->period_start,
                'period_end' => $payroll->period_end,
                'basic_salary' => $payroll->basic_salary,
                'overtime_pay' => $payroll->overtime_pay,
                'deductions' => $payroll->deductions,
                'tax_percentage' => $payroll->tax_percentage,
                'net_pay' => $payroll->net_pay,
            ];
        });

        return Inertia::render('hr/PayrollPage', [
            'employees' => $employees,
            'payrollData' => $payrollData
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'employee_id' => 'required|exists:users,id',
            'period_start' => 'required|date',
            'basic_salary' => 'required|numeric|min:0',
        ]);

        $periodStart = Carbon::parse($validated['period_start']);
        $periodEnd = $periodStart->copy()->addMonth();

        // Calculate pay per hour assuming 160 working hours in a month
        $hoursPerMonth = 160;
        $payPerHour = $validated['basic_salary'] / $hoursPerMonth;
        $payPerMinute = $payPerHour / 60;

        $user = User::find($validated['employee_id']);
        $overtimeMinutes = $user->timekeepings()
        ->whereBetween('date', [$periodStart->toDateString(), $periodEnd->toDateString()])
        ->sum('overtime_minutes');
        $lateMinutes = $user->timekeepings()
        ->whereBetween('date', [$periodStart->toDateString(), $periodEnd->toDateString()])
        ->sum('late_minutes');

        $overtimePay = $overtimeMinutes * $payPerMinute;

        $SSS = $validated['basic_salary'] * 0.0363;
        $PhilHealth = $validated['basic_salary'] * 0.03;
        $PagIbig = $validated['basic_salary'] * 0.02;
        $withholdingTax = $validated['basic_salary'] * 0.1;
        $lateDeductions = $lateMinutes * $payPerMinute;

        $totalDeductions = $SSS + $PhilHealth + $PagIbig + $withholdingTax + $lateDeductions;

        $netPay = $validated['basic_salary'] + $overtimePay - $totalDeductions;

        Payroll::create([
            'employee_id' => $validated['employee_id'],
            'period_start' => $periodStart->toDateString(),
            'period_end' => $periodEnd->toDateString(),
            'basic_salary' => $validated['basic_salary'],
            'overtime_pay' => $overtimePay,
            'deductions' => $totalDeductions,
            'tax_percentage' => 10,
            'net_pay' => $netPay,
        ]);

        return redirect()->back();
    }

    public function send($id)
    {
        $payroll = Payroll::findOrFail($id);

        $payroll->update([
            'status' => 'paid',
        ]);

        return redirect()->back();
    }

    public function destroy($id)
    {
        $payroll = Payroll::findOrFail($id);
        $payroll->delete();

        return redirect()->back();
    }
}
