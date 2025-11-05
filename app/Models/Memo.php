<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Memo extends Model
{
    protected $fillable = [
        'hr_id',
        'subject',
        'body',
        'sent_at',
    ];

    public function hr()
    {
        return $this->belongsTo(User::class, 'hr_id');
    }

    public function recipients()
    {
        return $this->belongsToMany(User::class, 'memo_recipients', 'memo_id', 'employee_id')->withTimestamps();
    }
}
