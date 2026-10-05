<?php

declare(strict_types=1);

namespace Modules\Auth\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Modules\Auth\DataTransferObjects\LoginData;
use Modules\Auth\Models\User;

final class AuthService
{
    /**
     * Attempt to authenticate a user against the session guard.
     */
    public function attempt(LoginData $data): bool
    {
        return Auth::attempt(
            ['email' => $data->email, 'password' => $data->password],
            $data->remember,
        );
    }

    /**
     * Log the given user into the session guard.
     */
    public function login(User $user, bool $remember = false): void
    {
        Auth::login($user, $remember);
    }

    /**
     * Log the current user out and invalidate the session.
     */
    public function logout(Request $request): void
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();
    }
}
