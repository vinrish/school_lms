<?php

declare(strict_types=1);

namespace Modules\Auth\Actions;

use Illuminate\Support\Facades\Password;

final class SendPasswordResetLinkAction
{
    /**
     * Send a password reset link to the given email address.
     *
     * @return string the password broker status
     */
    public function handle(string $email): string
    {
        return Password::sendResetLink(['email' => $email]);
    }
}
