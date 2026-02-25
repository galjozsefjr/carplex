<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

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

    public function show($id)
    {
        return Movie::find($id);
    }

    public function update(Request $request, $id)
    {
        $movie = Movie::find($id);
        if (!$movie) {
            return response()->json(
                ['message' => 'Movie not found'],
                404
            );
        }
        $request->validate(Movie::validatationSchema());
        return $movie->update($request->all());
    }

    public function destroy($id)
    {
        $isRemoved = Movie::destroy($id);
        if (!$isRemoved) {
            return response()->json(
                ['message' => 'Movie not found'],
                404
            );
        }
        return response()->noContent();
    }
}
