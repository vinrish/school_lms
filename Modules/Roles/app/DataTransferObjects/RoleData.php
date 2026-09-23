<?php

declare(strict_types=1);

namespace Modules\Roles\DataTransferObjects;

use Illuminate\Foundation\Http\FormRequest;

final readonly class RoleData
{
    /**
     * @param  array<int, string>  $permissions
     */
    public function __construct(
        public string $name,
        public string $guardName = 'web',
        public array $permissions = [],
    ) {}

    /**
     * Create a DTO instance from a FormRequest.
     */
    public static function fromRequest(FormRequest $request): self
    {
        /** @var array<int, string> $permissions */
        $permissions = $request->validated('permissions', []);

        return new self(
            name: (string) $request->validated('name'),
            guardName: (string) ($request->validated('guard_name') ?? 'web'),
            permissions: $permissions,
        );
    }

    /**
     * Create a DTO instance from an array.
     *
     * @param  array<string, mixed>  $data
     */
    public static function fromArray(array $data): self
    {
        /** @var array<int, string> $permissions */
        $permissions = $data['permissions'] ?? [];

        return new self(
            name: (string) $data['name'],
            guardName: (string) ($data['guard_name'] ?? 'web'),
            permissions: $permissions,
        );
    }
}
