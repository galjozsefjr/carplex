<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    const TOKEN_NAME = 'carplexAuthToken';

    public function register(Request $request)
    {
        $fields = $request->validate([
            'name' => ['required', 'string'],
            'email' => ['required', 'string', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => Hash::make($fields['password']),
        ]);

        return response()->json($user, 201);
    }

    public function login(Request $request)
    {
        $loginData = $request->validate([
            'username' => ['required', 'string', 'email'],
            'password' => ['required', 'string', 'min:8'],
        ]);
        $user = User::where('email', 'like', $loginData['username'])->first();
        if (!$user || !Hash::check($loginData['password'], $user->password)) {
            Log::warning('Invalid credentials', ['user' => !!$user]);
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        $token = $user->createToken(self::TOKEN_NAME . ':' . $user->id);
        return response()->json([
            'accessToken' => $token->plainTextToken,
        ], 200);
    }

    public function getUserProfile(Request $request)
    {
        $user = $request->user();
        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
        ]);
    }
}
