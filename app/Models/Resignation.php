<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Resignation extends Model
{
    protected $fillable = [
        'employee_id',
        'notice_date',
        'effective_date',
        'reason',
    ];

    public function employee()
    {
        return $this->belongsTo(User::class, 'employee_id');
    }
}
