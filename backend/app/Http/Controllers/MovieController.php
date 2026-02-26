<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    const PAGE_ITEMS = 6;

    public function index()
    {
        return Movie::orderBy('title')->paginate(self::PAGE_ITEMS);
    }

    public function store(Request $request)
    {
        $movieData = $request->validate(Movie::validatationSchema());
        $newMovie = Movie::create($movieData);
        return response()->json($newMovie, 201);
    }

    public function show($movieId)
    {
        $movie = Movie::find($movieId);
        if (!$movie) {
            return response()->json(
                ['message' => 'Movie not found'],
                404
            );
        }
        return response()->json($movie);
    }

    public function update(Request $request, $movieId)
    {
        $movie = Movie::find($movieId);
        if (!$movie) {
            return response()->json(
                ['message' => 'Movie not found'],
                404
            );
        }
        $movieInfo = $request->validate(Movie::validatationSchema());
        $movie->update($movieInfo);
        return Movie::find($movieId);
    }

    public function destroy($movieId)
    {
        $isRemoved = Movie::destroy($movieId);
        if (!$isRemoved) {
            return response()->json(
                ['message' => 'Movie not found'],
                404
            );
        }
        return response()->noContent();
    }
}
