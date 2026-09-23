<?php

declare(strict_types=1);

namespace Modules\Auth\DataTransferObjects;

use Modules\Auth\Http\Requests\ResetPasswordRequest;

final class ResetPasswordData
{
    public function __construct(
        public string $token,
        public string $email,
        public string $password,
    ) {}

    public static function fromRequest(ResetPasswordRequest $request): self
    {
        /** @var array{token: string, email: string, password: string} $validated */
        $validated = $request->validated();

        return new self(
            token: $validated['token'],
            email: $validated['email'],
            password: $validated['password'],
        );
    }
}
