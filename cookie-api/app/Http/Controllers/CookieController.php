<?php

namespace App\Http\Controllers;

use App\Models\Cookie;
use Illuminate\Http\Request;

class CookieController extends Controller 
{

    public function index() 
    {
        return response()->json(Cookie::all());
    }

    public function storeCookie(Request $request)
    {

        $fraseTexto = $request->input('frase');

        if (Cookie::where('frase', $fraseTexto)->exists()) {
            return response()->json([
                'error' => 'Esa frase ya existe.'
            ], 409);
        }

        $data = $request->json()->all();
    
        $frase = Cookie::create([
            'frase' => $data['frase']        
        ]);
    
        return response()->json($frase, 201);
    }

    public function updateCookie(Request $request, $id)
    {
        $data = $request->json()->all();
        $cookie = Cookie::find($id);
        if (!$cookie) {
            return response()->json(['error' => 'Cookie no encontrada'], 404);
        }
        $cookie->frase = $data['frase'];
        $cookie->save();
    
        return response()->json($cookie, 200);
    }

    public function getCookieById(Request $request, $id)
    {
        $data = $request->json()->all();
        $cookie = Cookie::find($id);
        if (!$cookie) {
            return response()->json(['error' => 'Cookie no encontrada'], 404);
        }
        return response()->json($cookie, 200);
    }

    public function getFraseAleatoria()
    {
        $frase = Cookie::inRandomOrder()->first();

        if (!$frase) {
            return response()->json(['error' => 'No hay frases disponibles'], 404);
        }

        return response()->json($frase);
    }
        


}