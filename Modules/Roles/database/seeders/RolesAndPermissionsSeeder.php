<?php

declare(strict_types=1);

namespace Modules\Roles\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;
use Modules\Roles\Enums\PermissionName;
use Modules\Roles\Enums\RoleName;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

final class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        App::make(PermissionRegistrar::class)->forgetCachedPermissions();

        foreach (PermissionName::values() as $permission) {
            Permission::findOrCreate($permission, 'web');
        }

        foreach ($this->rolePermissions() as $roleName => $permissions) {
            $role = Role::findOrCreate($roleName, 'web');
            $role->syncPermissions($permissions);
        }
    }

    /**
     * Define the initial role to permission mapping.
     *
     * @return array<string, array<int, string>>
     */
    private function rolePermissions(): array
    {
        return [
            RoleName::Admin->value => PermissionName::values(),
            RoleName::Teacher->value => [
                PermissionName::ManageAssessments->value,
                PermissionName::ViewAssessments->value,
                PermissionName::ViewReports->value,
            ],
            RoleName::Student->value => [
                PermissionName::SubmitAssessments->value,
                PermissionName::ViewAssessments->value,
            ],
            RoleName::Parent->value => [
                PermissionName::ViewChildProgress->value,
                PermissionName::ViewReports->value,
            ],
        ];
    }
}
