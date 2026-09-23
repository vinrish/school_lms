<?php

declare(strict_types=1);

namespace Modules\Roles\DataTransferObjects;

use Illuminate\Foundation\Http\FormRequest;

final readonly class AssignRoleData
{
    /**
     * @param  array<int, string>  $roles
     */
    public function __construct(
        public int|string $userId,
        public array $roles = [],
    ) {}

    /**
     * Create a DTO instance from a FormRequest.
     */
    public static function fromRequest(FormRequest $request): self
    {
        /** @var array<int, string> $roles */
        $roles = $request->validated('roles', []);

        return new self(
            userId: $request->validated('user_id'),
            roles: $roles,
        );
    }

    /**
     * Create a DTO instance from an array.
     *
     * @param  array<string, mixed>  $data
     */
    public static function fromArray(array $data): self
    {
        /** @var array<int, string> $roles */
        $roles = $data['roles'] ?? [];

        return new self(
            userId: $data['user_id'],
            roles: $roles,
        );
    }
}
