<?php

use App\Http\Controllers\ClienteController;
use App\Http\Controllers\PraticaController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('dashboard');
});

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', function () {
        $user = auth()->user();

        if ($user->isAdmin()) {
            $totaleClienti = \App\Models\Cliente::count();
            $totalePratiche = \App\Models\Pratica::count();
            $pratichePerStato = \App\Models\Pratica::selectRaw('stato, count(*) as totale')
                ->groupBy('stato')->get();
            $ultimi5Clienti = \App\Models\Cliente::latest()->take(5)->get();
            $ultime5Pratiche = \App\Models\Pratica::where('stato', 'Aperta')
                ->with('cliente')->latest()->take(5)->get();

            return Inertia::render('Dashboard', [
                'isAdmin' => true,
                'totaleClienti' => $totaleClienti,
                'totalePratiche' => $totalePratiche,
                'pratichePerStato' => $pratichePerStato,
                'ultimi5Clienti' => $ultimi5Clienti,
                'ultime5Pratiche' => $ultime5Pratiche,
            ]);
        } else {
            $cliente = $user->cliente;
            $pratiche = \App\Models\Pratica::where('cliente_id', $cliente->id)->latest()->get();
            $pratichePerStato = \App\Models\Pratica::where('cliente_id', $cliente->id)
                ->selectRaw('stato, count(*) as totale')
                ->groupBy('stato')->get();

            return Inertia::render('Dashboard', [
                'isAdmin' => false,
                'pratiche' => $pratiche,
                'pratichePerStato' => $pratichePerStato,
            ]);
        }
    })->name('dashboard');

    Route::resource('clienti', ClienteController::class)->except(['show'])->parameters(['clienti' => 'cliente']);
    Route::resource('pratiche', PraticaController::class)->except(['show'])->parameters(['pratiche' => 'pratica']);

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';