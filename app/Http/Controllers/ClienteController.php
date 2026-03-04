<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Models\User;
use App\Http\Requests\StoreClienteRequest;
use App\Http\Requests\UpdateClienteRequest;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ClienteController extends Controller
{
    use AuthorizesRequests;
    
    public function index()
    {
        $this->authorize('viewAny', Cliente::class);

        $clienti = Cliente::with('user')->latest()->get();

        return Inertia::render('Clienti/Index', [
            'clienti' => $clienti
        ]);
    }

    public function create()
    {
        $this->authorize('create', Cliente::class);

        return Inertia::render('Clienti/Create');
    }

    public function store(StoreClienteRequest $request)
    {
        $user = User::create([
            'name' => $request->ragione_sociale,
            'email' => $request->email,
            'password' => Hash::make('password'),
            'role' => 'cliente',
        ]);

        Cliente::create([
            ...$request->validated(),
            'user_id' => $user->id,
        ]);

        return redirect()->route('clienti.index')->with('success', 'Cliente creato con successo.');
    }

    public function edit(Cliente $cliente)
    {
        $this->authorize('update', $cliente);

        return Inertia::render('Clienti/Edit', [
            'cliente' => $cliente
        ]);
    }

    public function update(UpdateClienteRequest $request, Cliente $cliente)
    {
        $cliente->update($request->validated());

        return redirect()->route('clienti.index')->with('success', 'Cliente aggiornato con successo.');
    }

    public function destroy(Cliente $cliente)
    {
        $this->authorize('delete', $cliente);

        $cliente->user()->delete();
        $cliente->delete();

        return redirect()->route('clienti.index')->with('success', 'Cliente eliminato con successo.');
    }
}