<?php

declare(strict_types=1);

namespace Modules\Roles\Actions;

use Modules\Roles\DataTransferObjects\RoleData;
use Spatie\Permission\Models\Role;

final class UpdateRoleAction
{
    /**
     * Update a role and synchronize its permissions.
     */
    public function handle(Role $role, RoleData $data): Role
    {
        $role->update([
            'name' => $data->name,
            'guard_name' => $data->guardName,
        ]);

        $role->syncPermissions($data->permissions);

        return $role;
    }
}
