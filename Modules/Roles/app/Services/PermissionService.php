<?php

declare(strict_types=1);

namespace Modules\Roles\Services;

use Illuminate\Database\Eloquent\Collection;
use Spatie\Permission\Models\Permission;

final class PermissionService
{
    /**
     * Get all permissions.
     *
     * @return Collection<int, Permission>
     */
    public function getAllPermissions(): Collection
    {
        return Permission::query()
            ->orderBy('name')
            ->get();
    }
}
