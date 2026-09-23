<?php

declare(strict_types=1);

namespace Modules\Auth\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Auth\Actions\SendPasswordResetLinkAction;
use Modules\Auth\Http\Requests\ForgotPasswordRequest;

final readonly class PasswordResetLinkController
{
    /**
     * Show the password reset link request page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/forgot-password', [
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming password reset link request.
     *
     * @throws ValidationException
     */
    public function store(ForgotPasswordRequest $request, SendPasswordResetLinkAction $sendLink): RedirectResponse
    {
        /** @var array{email: string} $validated */
        $validated = $request->validated();

        $status = $sendLink->handle($validated['email']);

        if ($status !== Password::RESET_LINK_SENT) {
            throw ValidationException::withMessages([
                'email' => __($status),
            ]);
        }

        return back()->with('status', __($status));
    }
}
