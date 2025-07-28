<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Candidate extends Model
{
    use HasFactory, Searchable;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'address',
        'city',
        'state',
        'country',
        'postal_code',
        'date_of_birth',
        'position_applied',
        'experience_summary',
        'current_company',
        'current_position',
        'expected_salary',
        'resume_path',
        'status',
        'notes',
    ];

    protected $casts = [
        'date_of_birth' => 'date',
        'expected_salary' => 'decimal:2',
    ];

    // Accessors
    public function getFullNameAttribute()
    {
        return $this->first_name . ' ' . $this->last_name;
    }

    public function getLocationAttribute()
    {
        $parts = array_filter([$this->city, $this->state, $this->country]);
        return implode(', ', $parts);
    }

    // Query Scopes
    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    public function scopeSearch($query, $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where('first_name', 'like', "%{$search}%")
              ->orWhere('last_name', 'like', "%{$search}%")
              ->orWhere('email', 'like', "%{$search}%")
              ->orWhere('position_applied', 'like', "%{$search}%")
              ->orWhere('current_company', 'like', "%{$search}%");
        });
    }

    /**
     * Get the searchable fields for Scout.
     */
    public function toSearchableArray()
    {
        return [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'position_applied' => $this->position_applied,
            'current_company' => $this->current_company,
            'current_position' => $this->current_position,
            'status' => $this->status,
            'full_name' => $this->first_name . ' ' . $this->last_name,
        ];
    }

    /**
     * Get the index name for Scout.
     */
    public function searchableAs()
    {
        return 'candidates';
    }
}
