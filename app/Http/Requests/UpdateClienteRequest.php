<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateClienteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->isAdmin();
    }

    public function rules(): array
    {
        $clienteId = $this->route('cliente')->id;

        return [
            'ragione_sociale' => 'required|string|max:255',
            'email' => 'required|email|unique:clienti,email,' . $clienteId,
            'telefono' => 'required|string|max:20',
            'indirizzo' => 'required|string|max:255',
            'partita_iva' => 'required|string|unique:clienti,partita_iva,' . $clienteId,
        ];
    }
}