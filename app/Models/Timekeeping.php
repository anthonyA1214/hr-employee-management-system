<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Timekeeping extends Model
{
    protected $fillable = [
        'employee_id',
        'date',
        'time_in',
        'time_out',
        'late_minutes',
        'overtime_minutes',
    ];

    public function employee()
    {
        return $this->belongsTo(User::class, 'employee_id');
    }
}
