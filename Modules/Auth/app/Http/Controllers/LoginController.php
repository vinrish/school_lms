<?php

declare(strict_types=1);

namespace Modules\Auth\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Auth\Actions\LoginAction;
use Modules\Auth\DataTransferObjects\LoginData;
use Modules\Auth\Http\Requests\LoginRequest;
use Modules\Roles\Enums\RoleName;

final readonly class LoginController
{
    /**
     * Show the login page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/login', [
            'canResetPassword' => true,
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request, LoginAction $login): RedirectResponse
    {
        $login->handle(LoginData::fromRequest($request));

        $request->session()->regenerate();

        if ($request->user()?->hasRole(RoleName::Admin->value)) {
            return redirect()->intended(route('admin.dashboard', absolute: false));
        }

        return redirect()->intended(route('home', absolute: false));
    }
}
