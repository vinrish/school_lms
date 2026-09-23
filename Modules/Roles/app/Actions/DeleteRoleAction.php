<?php

declare(strict_types=1);

namespace Modules\Roles\Actions;

use Spatie\Permission\Models\Role;

final class DeleteRoleAction
{
    /**
     * Delete a role.
     */
    public function handle(Role $role): bool
    {
        return (bool) $role->delete();
    }
}
