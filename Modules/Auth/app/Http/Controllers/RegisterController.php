<?php

declare(strict_types=1);

namespace Modules\Auth\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Auth\Actions\RegisterUserAction;
use Modules\Auth\DataTransferObjects\RegisterUserData;
use Modules\Auth\Http\Requests\RegisterRequest;
use Modules\Auth\Services\AuthService;

final readonly class RegisterController
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     */
    public function store(
        RegisterRequest $request,
        RegisterUserAction $registerUser,
        AuthService $auth,
    ): RedirectResponse {
        $user = $registerUser->handle(RegisterUserData::fromRequest($request));

        $auth->login($user);

        return redirect()->intended(route('home', absolute: false));
    }
}
