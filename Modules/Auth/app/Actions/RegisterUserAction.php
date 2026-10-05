<?php

declare(strict_types=1);

namespace Modules\Auth\Actions;

use Illuminate\Auth\Events\Registered;
use Modules\Auth\DataTransferObjects\RegisterUserData;
use Modules\Auth\Models\User;
use Modules\Roles\Enums\RoleName;

final class RegisterUserAction
{
    /**
     * Register a new user, assign the default role and fire the Registered event.
     */
    public function handle(RegisterUserData $data): User
    {
        $user = User::query()->create([
            'name' => $data->name,
            'email' => $data->email,
            'password' => $data->password,
        ]);

        $user->assignRole(RoleName::Student->value);

        event(new Registered($user));

        return $user;
    }
}
