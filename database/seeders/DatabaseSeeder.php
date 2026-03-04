<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Cliente;
use App\Models\Pratica;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Admin
        User::create([
            'name' => 'Admin',
            'email' => 'admin@abifin.it',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // Clienti di test
        $clientiData = [
            [
                'ragione_sociale' => 'Rossi Srl',
                'email' => 'rossi@example.com',
                'telefono' => '0512345678',
                'indirizzo' => 'Via Roma 1, Bologna',
                'partita_iva' => '12345678901',
            ],
            [
                'ragione_sociale' => 'Bianchi SpA',
                'email' => 'bianchi@example.com',
                'telefono' => '0519876543',
                'indirizzo' => 'Via Milano 5, Bologna',
                'partita_iva' => '98765432109',
            ],
        ];

        foreach ($clientiData as $cd) {
            $user = User::create([
                'name' => $cd['ragione_sociale'],
                'email' => $cd['email'],
                'password' => Hash::make('password'),
                'role' => 'cliente',
            ]);

            $cliente = Cliente::create([
                ...$cd,
                'user_id' => $user->id,
            ]);

            // Pratiche di test per ogni cliente
            Pratica::create([
                'cliente_id' => $cliente->id,
                'titolo' => 'Pratica Apertura ' . $cd['ragione_sociale'],
                'descrizione' => 'Descrizione pratica di test',
                'stato' => 'Aperta',
            ]);

            Pratica::create([
                'cliente_id' => $cliente->id,
                'titolo' => 'Pratica In Lavorazione ' . $cd['ragione_sociale'],
                'descrizione' => 'Altra pratica di test',
                'stato' => 'In Lavorazione',
            ]);
        }
    }
}