<?php

declare(strict_types=1);

namespace Modules\Auth\Http\Controllers;

use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;
use Modules\Auth\Actions\VerifyEmailAction;
use Modules\Auth\Models\User;

final readonly class VerifyEmailController
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(EmailVerificationRequest $request, VerifyEmailAction $verifyEmail): RedirectResponse
    {
        /** @var User $user */
        $user = $request->user();

        if ($user->hasVerifiedEmail()) {
            return redirect()->intended(route('home', absolute: false).'?verified=1');
        }

        $verifyEmail->handle($user);

        return redirect()->intended(route('home', absolute: false).'?verified=1');
    }
}
