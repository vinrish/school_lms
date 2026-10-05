<?php

declare(strict_types=1);

namespace Modules\Auth\Actions;

use Illuminate\Auth\Events\Verified;
use Modules\Auth\Models\User;

final class VerifyEmailAction
{
    /**
     * Mark the given user's email address as verified.
     */
    public function handle(User $user): void
    {
        if ($user->hasVerifiedEmail()) {
            return;
        }

        $user->markEmailAsVerified();

        event(new Verified($user));
    }
}
