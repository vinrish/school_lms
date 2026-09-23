<?php

declare(strict_types=1);

namespace Modules\Auth\Actions;

use Illuminate\Validation\ValidationException;
use Modules\Auth\DataTransferObjects\LoginData;
use Modules\Auth\Services\AuthService;

final readonly class LoginAction
{
    public function __construct(private AuthService $auth) {}

    /**
     * Attempt to log the user in using the session guard.
     *
     * @throws ValidationException
     */
    public function handle(LoginData $data): void
    {
        if (! $this->auth->attempt($data)) {
            throw ValidationException::withMessages([
                'email' => __('auth.failed'),
            ]);
        }
    }
}
