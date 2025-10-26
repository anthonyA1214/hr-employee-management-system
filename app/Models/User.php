<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'role',
        'position',
        'department',
        'hired_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function memos()
    {
        return $this->hasMany(Memo::class, 'hr_id');
    }

    public function timekeepings()
    {
        return $this->hasMany(Timekeeping::class);
    }

    public function leaves()
    {
        return $this->hasMany(Leave::class, 'employee_id');
    }

    public function payrolls()
    {
        return $this->hasMany(Payroll::class, 'employee_id');
    }

    public function complaints()
    {
        return $this->hasMany(Complaint::class, 'employee_id');
    }

    public function resignations()
    {
        return $this->hasMany(Resignation::class, 'employee_id');
    }

    public function receivedMemos()
    {
        return $this->belongsToMany(Memo::class, 'memo_recipients', 'employee_id', 'memo_id');
    }
};
