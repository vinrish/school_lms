<?php

declare(strict_types=1);

namespace Modules\Auth\DataTransferObjects;

use Modules\Auth\Http\Requests\LoginRequest;

final class LoginData
{
    public function __construct(
        public string $email,
        public string $password,
        public bool $remember = false,
    ) {}

    public static function fromRequest(LoginRequest $request): self
    {
        /** @var array{email: string, password: string} $validated */
        $validated = $request->validated();

        return new self(
            email: $validated['email'],
            password: $validated['password'],
            remember: $request->boolean('remember'),
        );
    }
}
