<?php

namespace App\Http\Controllers;

use App\Models\Pratica;
use App\Models\Cliente;
use App\Http\Requests\StorePraticaRequest;
use App\Http\Requests\UpdatePraticaRequest;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class PraticaController extends Controller
{
    use AuthorizesRequests;
    
    public function index()
    {
        $this->authorize('viewAny', Pratica::class);

        $user = auth()->user();

        if ($user->isAdmin()) {
            $pratiche = Pratica::with('cliente')->latest()->get();
        } else {
            $pratiche = Pratica::with('cliente')
                ->where('cliente_id', $user->cliente->id)
                ->latest()
                ->get();
        }

        return Inertia::render('Pratiche/Index', [
            'pratiche' => $pratiche
        ]);
    }

    public function create()
    {
        $this->authorize('create', Pratica::class);

        $clienti = Cliente::all();

        return Inertia::render('Pratiche/Create', [
            'clienti' => $clienti
        ]);
    }

    public function store(StorePraticaRequest $request)
    {
        Pratica::create($request->validated());

        return redirect()->route('pratiche.index')->with('success', 'Pratica creata con successo.');
    }

    public function edit(Pratica $pratica)
    {
        $this->authorize('update', $pratica);

        $clienti = Cliente::all();

        return Inertia::render('Pratiche/Edit', [
            'pratica' => $pratica,
            'clienti' => $clienti
        ]);
    }

    public function update(UpdatePraticaRequest $request, Pratica $pratica)
    {
        $pratica->update($request->validated());

        return redirect()->route('pratiche.index')->with('success', 'Pratica aggiornata con successo.');
    }

    public function destroy(Pratica $pratica)
    {
        $this->authorize('delete', $pratica);

        $pratica->delete();

        return redirect()->route('pratiche.index')->with('success', 'Pratica eliminata con successo.');
    }
}