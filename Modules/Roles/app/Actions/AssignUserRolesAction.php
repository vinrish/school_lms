<?php

declare(strict_types=1);

namespace Modules\Roles\Actions;

use Modules\Auth\Models\User;
use Modules\Roles\DataTransferObjects\AssignRoleData;

final class AssignUserRolesAction
{
    /**
     * Assign / sync roles to a user.
     */
    public function handle(AssignRoleData $data): User
    {
        /** @var User $user */
        $user = User::query()->findOrFail($data->userId);

        $user->syncRoles($data->roles);

        return $user;
    }
}
