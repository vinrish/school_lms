<?php

declare(strict_types=1);

namespace Modules\Auth\Actions;

use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Modules\Auth\DataTransferObjects\ResetPasswordData;
use Modules\Auth\Models\User;

final class ResetPasswordAction
{
    /**
     * Reset the user's password using the password broker.
     *
     * @return string the password broker status
     */
    public function handle(ResetPasswordData $data): string
    {
        return Password::reset(
            [
                'email' => $data->email,
                'password' => $data->password,
                'password_confirmation' => $data->password,
                'token' => $data->token,
            ],
            function (CanResetPassword $user) use ($data): void {
                /** @var User $user */
                $user->forceFill([
                    'password' => Hash::make($data->password),
                    'remember_token' => Str::random(60),
                ])->save();

                event(new PasswordReset($user));
            },
        );
    }
}
