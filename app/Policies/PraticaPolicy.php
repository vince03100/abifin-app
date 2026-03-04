<?php

namespace App\Policies;

use App\Models\Pratica;
use App\Models\User;

class PraticaPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Pratica $pratica): bool
    {
        if ($user->isAdmin()) return true;
        return $user->cliente?->id === $pratica->cliente_id;
    }

    public function create(User $user): bool
    {
        return $user->isAdmin();
    }

    public function update(User $user, Pratica $pratica): bool
    {
        return $user->isAdmin();
    }

    public function delete(User $user, Pratica $pratica): bool
    {
        return $user->isAdmin();
    }
}