<?php

declare(strict_types=1);

namespace Modules\Roles\Services;

use Illuminate\Database\Eloquent\Collection;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

final class RoleService
{
    /**
     * Get all roles with permissions and user count.
     *
     * @return Collection<int, Role>
     */
    public function getAllRolesWithPermissions(): Collection
    {
        return Role::query()
            ->with('permissions')
            ->withCount('users')
            ->orderBy('name')
            ->get();
    }

    /**
     * Get a role by its ID with loaded permissions.
     */
    public function findRoleWithPermissions(int|string $id): Role
    {
        return Role::query()
            ->with('permissions')
            ->withCount('users')
            ->findOrFail($id);
    }

    /**
     * Get all permissions in the system.
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
