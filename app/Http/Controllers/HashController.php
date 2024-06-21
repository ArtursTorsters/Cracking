<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class HashController extends Controller
{
    public function store(Request $request)
    {
        // Validate the request to ensure 'hashed_password' is present
        $validatedData = $request->validate([
            'hashed_password' => 'required|string',
        ]);

        // Create a new user with the hashed password
        $user = new User();
        $user->name = 'default_name';  // Provide a default name or get it from the request
        $user->password = $validatedData['hashed_password'];
        $user->save();

        return response()->json(['message' => 'Hashed password stored successfully'], 200);
    }
}
