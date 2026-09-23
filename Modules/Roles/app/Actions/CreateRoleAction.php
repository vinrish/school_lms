<?php

declare(strict_types=1);

namespace Modules\Roles\Actions;

use Modules\Roles\DataTransferObjects\RoleData;
use Spatie\Permission\Models\Role;

final class CreateRoleAction
{
    /**
     * Create a new role and synchronize its permissions.
     */
    public function handle(RoleData $data): Role
    {
        /** @var Role $role */
        $role = Role::create([
            'name' => $data->name,
            'guard_name' => $data->guardName,
        ]);

        if (! empty($data->permissions)) {
            $role->syncPermissions($data->permissions);
        }

        return $role;
    }
}
