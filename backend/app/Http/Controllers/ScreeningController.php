<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use App\Models\Screening;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class ScreeningController extends Controller
{

    const SCREENING_PAGE_LIMIT = 20;

    public function index(Request $request)
    {
        $params = $request->mergeIfMissing([
            'movie' => null,
            'period_start' => null,
            'period_end' => null,
        ])->validate([
            'movie' => ['nullable', 'integer', 'min:0'],
            'period_start' => ['nullable', 'date'],
            'period_end' => ['nullable', 'date'],
        ]);

        if ($params['period_start'] && $params['period_end']) {
            $periodStart = strtotime($params['period_start']);
            $periodEnd = strtotime($params['period_start']);
            if ($periodStart > $periodEnd) {
                return response()->json([
                    'message' => "The given data was invalid.",
                    'errors' => [
                        'period_start' => ['The period start must be a date before period end.'],
                        'period_end' => ['The period end must be a date after period start.'],
                    ],
                ], 422);
            }
        }

        $screenings = Screening::with(['movie'])
            ->when($params['movie'], function (Builder $query, int $movieId) {
                $query->where('movie_id', $movieId);
            })
            ->when($params['period_start'], function (Builder $query, $periodStart) {
                $query->where('start_time', '>=', $periodStart . ' 00:00:00');
            })
            ->when($params['period_end'], function (Builder $query, $periodEnd) {
                $query->where('start_time', '<=', $periodEnd . ' 23:59:59');
            })
            ->orderBy('start_time', 'asc');
        return $screenings->paginate(self::SCREENING_PAGE_LIMIT);
    }

    public function show($screeningId)
    {
        $screening = Screening::with(['Movie'])->find($screeningId);
        if (!$screening) {
            return response()->json(['message' => 'Screening not found'], 404);
        }
        return response()->json($screening);
    }

    public function store(Request $request)
    {
        $screening = $request->validate(Screening::validatationSchema());

        if (!$this->checkTimeDiff($screening['movie_id'], $screening['start_time'], $screening['end_time'])) {
            return response()->json(['message' => 'Cannot finish the movie before the defined runtime'], 400);
        }

        $existing = Screening::where([
            ['start_time', '<=', $screening['end_time']],
            ['end_time', '>=', $screening['start_time']],
        ])->count();
        if ($existing > 0) {
            return response()->json(['message' => 'The selected time slot is not available'], 409);
        }

        $item = Screening::create($screening);
        return response()->json($item, 201);
    }

    public function update(Request $request, $screeningId)
    {
        $screening = $request->validate(Screening::validatationSchema());

        $current = Screening::find($screeningId);
        if (!$current) {
            return response()->json(['message' => 'Item not found'], 404);
        }

        if (!$this->checkTimeDiff($screening['movie_id'], $screening['start_time'], $screening['end_time'])) {
            return response()->json(['message' => 'Cannot finish the movie before the defined runtime'], 400);
        }

        $existing = Screening::where([
            ['start_time', '<=', $screening['end_time']],
            ['end_time', '>=', $screening['start_time']],
            ['id', '<>', $screeningId],
        ])->count();

        if ($existing > 0) {
            return response()->json(['message' => 'The selected time slot is not available'], 409);
        }
        $current->update($screening);
        return Screening::find($screeningId);
    }

    public function destroy($screeningId)
    {
        $isRemoved = Screening::destroy($screeningId);
        if (!$isRemoved) {
            return response()->json(
                ['message' => 'Movie not found'],
                404
            );
        }
        return response()->noContent();
    }

    protected function checkTimeDiff($movieId, $startTime, $endTime)
    {
        $movie = Movie::find($movieId);
        $startTime = strtotime($startTime);
        $endTime = strtotime($endTime);
        $diff = $endTime - $startTime;
        // ? max overtime?
        return $movie->runtime * 60 <= $diff;
    }
}
