<?php

namespace App\Models;

use DateTime;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Screening extends Model
{
    use HasFactory;

    protected $fillable = [
        'movie_id',
        'start_time',
        'end_time',
        'capacity',
    ];

    public static function validatationSchema()
    {
        return [
            'movie_id' => ['required', 'integer', 'exists:App\Models\Movie,id'],
            'capacity' => ['required', 'integer', 'min:1'],
            'start_time' => ['required', 'date_format:Y-m-d H:i:s', 'before:end_time'],
            'end_time' => ['required', 'date_format:Y-m-d H:i:s', 'after:start_time'],
        ];
    }

    public function movie(): HasOne
    {
        return $this->hasOne(Movie::class, 'id', 'movie_id');
    }
}
