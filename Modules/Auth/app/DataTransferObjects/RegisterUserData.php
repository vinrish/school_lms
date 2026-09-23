<?php

declare(strict_types=1);

namespace Modules\Auth\DataTransferObjects;

use Modules\Auth\Http\Requests\RegisterRequest;

final class RegisterUserData
{
    public function __construct(
        public string $name,
        public string $email,
        public string $password,
    ) {}

    public static function fromRequest(RegisterRequest $request): self
    {
        /** @var array{name: string, email: string, password: string} $validated */
        $validated = $request->validated();

        return new self(
            name: $validated['name'],
            email: $validated['email'],
            password: $validated['password'],
        );
    }
}
