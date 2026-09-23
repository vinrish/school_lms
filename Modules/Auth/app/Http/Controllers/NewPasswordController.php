<?php

declare(strict_types=1);

namespace Modules\Auth\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Auth\Actions\ResetPasswordAction;
use Modules\Auth\DataTransferObjects\ResetPasswordData;
use Modules\Auth\Http\Requests\ResetPasswordRequest;

final readonly class NewPasswordController
{
    /**
     * Show the password reset page.
     */
    public function create(Request $request, string $token): Response
    {
        return Inertia::render('auth/reset-password', [
            'email' => $request->string('email')->value(),
            'token' => $token,
        ]);
    }

    /**
     * Handle an incoming new password request.
     *
     * @throws ValidationException
     */
    public function store(ResetPasswordRequest $request, ResetPasswordAction $resetPassword): RedirectResponse
    {
        $status = $resetPassword->handle(ResetPasswordData::fromRequest($request));

        if ($status !== Password::PASSWORD_RESET) {
            throw ValidationException::withMessages([
                'email' => __($status),
            ]);
        }

        return to_route('login')->with('status', __($status));
    }
}
