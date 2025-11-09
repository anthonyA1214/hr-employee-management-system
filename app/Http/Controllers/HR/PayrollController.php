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
    public function index(Request $request)
    {
        $search = $request->input('query');

        $employees = User::where('role', 'employee')
        ->orderBy('last_name', 'asc')
        ->get()
        ->map(function ($employee) {
            return [
                'id' => $employee->id,
                'name' => $employee->last_name . ', ' . $employee->first_name,
            ];
        });

        $payrollData = Payroll::with('employee')
        ->when($search, function ($query, $search) {
            $query->whereHas('employee', function ($subQuery) use ($search) {
                $subQuery->where('first_name', 'like', '%' . $search . '%')
                         ->orWhere('last_name', 'like', '%' . $search . '%');
            });
        })
        ->where('status', 'pending')
        ->orderBy('created_at', 'desc')
        ->paginate(10)
        ->withQueryString()
        ->through(function ($payroll) {
            return [
                'id' => $payroll->id,
                'name' => $payroll->employee->last_name . ', ' . $payroll->employee->first_name,
                'period_start' => $payroll->period_start,
                'period_end' => $payroll->period_end,
                'basic_salary' => $payroll->basic_salary,
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
            'basic_salary' => 'required|numeric|min:17000',
        ]);

        $periodStart = Carbon::parse($validated['period_start']);
        $periodEnd = $periodStart->copy()->addMonth();

        // Calculate pay per hour assuming 160 working hours in a month
        $hoursPerMonth = 160;
        $payPerHour = $validated['basic_salary'] / $hoursPerMonth;
        $payPerMinute = $payPerHour / 60;

        $user = User::find($validated['employee_id']);

        $lateMinutes = $user->timekeepings()
        ->whereBetween('date', [$periodStart->toDateString(), $periodEnd->toDateString()])
        ->sum('late_minutes');

        $governmentTaxes = 2700; // Fixed amount for SSS, PhilHealth, Pag-IBIG
        $withholdingTax = 0;

        if ($validated['basic_salary'] > 20388 && $validated['basic_salary'] <= 33333) {
            $excess = $validated['basic_salary'] - 20388;
            $withholdingTax = $excess * 0.15;
        } elseif ($validated['basic_salary'] > 33333 && $validated['basic_salary'] <= 66667) {
            $excess = $validated['basic_salary'] - 33333;
            $withholdingTax = $excess * 0.20;
        } elseif ($validated['basic_salary'] > 66667 && $validated['basic_salary'] <= 166667) {
            $excess = $validated['basic_salary'] - 66667;
            $withholdingTax = $excess * 0.25;
        } elseif ($validated['basic_salary'] > 166667 && $validated['basic_salary'] <= 666667) {
            $excess = $validated['basic_salary'] - 166667;
            $withholdingTax = $excess * 0.30;
        } elseif ($validated['basic_salary'] > 666667) {
            $excess = $validated['basic_salary'] - 666667;
            $withholdingTax = $excess * 0.35;
        }

        $lateDeductions = $lateMinutes * $payPerMinute;

        $totalDeductions = $governmentTaxes + $withholdingTax + $lateDeductions;

        $netPay = $validated['basic_salary'] - $totalDeductions;

        Payroll::create([
            'employee_id' => $validated['employee_id'],
            'period_start' => $periodStart->toDateString(),
            'period_end' => $periodEnd->toDateString(),
            'basic_salary' => $validated['basic_salary'],
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
