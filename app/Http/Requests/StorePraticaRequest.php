<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePraticaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->isAdmin();
    }

    public function rules(): array
    {
        return [
            'cliente_id' => 'required|exists:clienti,id',
            'titolo' => 'required|string|max:255',
            'descrizione' => 'nullable|string',
            'stato' => 'required|in:Aperta,In Lavorazione,Chiusa',
        ];
    }
}