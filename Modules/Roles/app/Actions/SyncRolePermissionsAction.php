<?php

declare(strict_types=1);

namespace Modules\Roles\Actions;

use Spatie\Permission\Models\Role;

final class SyncRolePermissionsAction
{
    /**
     * Synchronize permissions for a given role.
     *
     * @param  array<int, string>  $permissions
     */
    public function handle(Role $role, array $permissions): Role
    {
        $role->syncPermissions($permissions);

        return $role;
    }
}
