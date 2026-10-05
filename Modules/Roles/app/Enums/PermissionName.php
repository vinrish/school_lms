<?php

declare(strict_types=1);

namespace Modules\Roles\Enums;

enum PermissionName: string
{
    case ManageUsers = 'manage users';
    case ManageRoles = 'manage roles';
    case ViewReports = 'view reports';
    case ManageAssessments = 'manage assessments';
    case SubmitAssessments = 'submit assessments';
    case ViewAssessments = 'view assessments';
    case ViewChildProgress = 'view child progress';

    /**
     * Get all permission values.
     *
     * @return array<int, string>
     */
    public static function values(): array
    {
        return array_map(static fn (self $permission): string => $permission->value, self::cases());
    }
}
