<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreClienteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->isAdmin();
    }

    public function rules(): array
    {
        return [
            'ragione_sociale' => 'required|string|max:255',
            'email' => 'required|email|unique:clienti,email',
            'telefono' => 'required|string|max:20',
            'indirizzo' => 'required|string|max:255',
            'partita_iva' => 'required|string|unique:clienti,partita_iva',
        ];
    }
}