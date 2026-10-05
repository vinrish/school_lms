<?php

declare(strict_types=1);

namespace Modules\Roles\Tests\Unit;

use Modules\Roles\Database\Seeders\RolesAndPermissionsSeeder;
use Modules\Roles\Enums\PermissionName;
use Modules\Roles\Enums\RoleName;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

it('contains expected role names in enum', function (): void {
    $values = RoleName::values();

    expect($values)->toContain('admin', 'teacher', 'student', 'parent');
});

it('contains expected permission names in enum', function (): void {
    $values = PermissionName::values();

    expect($values)->toContain(
        'manage users',
        'manage roles',
        'view reports',
        'manage assessments',
        'submit assessments',
        'view assessments',
        'view child progress'
    );
});

it('seeds default roles and permissions correctly', function (): void {
    $this->seed(RolesAndPermissionsSeeder::class);

    foreach (RoleName::values() as $role) {
        expect(Role::where('name', $role)->exists())->toBeTrue();
    }

    foreach (PermissionName::values() as $permission) {
        expect(Permission::where('name', $permission)->exists())->toBeTrue();
    }

    $adminRole = Role::findByName(RoleName::Admin->value, 'web');
    expect($adminRole->permissions)->toHaveCount(count(PermissionName::values()));
});
