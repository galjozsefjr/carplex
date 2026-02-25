<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\Rule;

class Movie extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'tagline',
        'release_date',
        'poster_path',
        'overview',
        'runtime',
        'certification'
    ];

    public static function validatationSchema()
    {
        return [
            'title' => ['required', 'string', 'max:120'],
            'tagline' => ['max:200', 'string', 'nullable'],
            'release_date' => ['required', 'date'],
            'poster_path' => ['required', 'max:120', 'string'],
            'overview' => ['required', 'string', 'nullable'],
            'runtime' => ['required', 'numeric', 'min:0', 'max:1440'],
            'certification' => ['nullable', 'string', Rule::in(['KN', '6', '12', '16', '18', 'X'])],
        ];
    }
}
