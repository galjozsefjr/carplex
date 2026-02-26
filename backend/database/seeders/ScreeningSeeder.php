<?php

namespace Database\Seeders;

use App\Models\Movie;
use App\Models\Screening;
use DateInterval;
use DateTime;
use Illuminate\Database\Seeder;

class ScreeningSeeder extends Seeder
{
  const EXAMPLES_COUNT = 20;

  public function run()
  {
    $movies = Movie::all()->toArray();
    $oneDay = DateInterval::createFromDateString('1 day');
    $startDate = new DateTime();
    $startDate->setTime(16, 0, 0);
    $startDate->add($oneDay);
    for ($i = 0; $i < self::EXAMPLES_COUNT; $i++) {
      $movie = $movies[array_rand($movies)];
      if ($i % 2) {
        $startDate->add($oneDay);
        $startDate->setTime(16, 0, 0);
      }
      Screening::create([
        'movie_id' => $movie['id'],
        'start_time' => $startDate->format('Y-m-d H:i:s'),
        'end_time' => $startDate->add(DateInterval::createFromDateString(ceil($movie['runtime'] / 60) . ' hours')),
        'capacity' => 50,
      ]);
    }
  }
}
