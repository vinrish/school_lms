<?php

declare(strict_types=1);

namespace Modules\Roles\Tests\Feature;

use Inertia\Testing\AssertableInertia;
use Modules\Auth\Models\User;
use Modules\Roles\Database\Seeders\RolesAndPermissionsSeeder;
use Modules\Roles\Enums\PermissionName;
use Modules\Roles\Enums\RoleName;
use Spatie\Permission\Models\Role;

beforeEach(function (): void {
    $this->seed(RolesAndPermissionsSeeder::class);
    $this->user = User::factory()->create(['email_verified_at' => now()]);
    $this->user->assignRole(RoleName::Admin->value);
});

it('renders the roles index page with roles and permissions', function (): void {
    $this->withoutVite();

    $this->actingAs($this->user)
        ->get(route('roles.index'))
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page): AssertableInertia => $page
            ->component('roles/index', false)
            ->has('roles')
            ->has('permissions')
        );
});

it('renders the create role page', function (): void {
    $this->withoutVite();

    $this->actingAs($this->user)
        ->get(route('roles.create'))
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page): AssertableInertia => $page
            ->component('roles/create', false)
            ->has('permissions')
        );
});

it('creates a new role with assigned permissions', function (): void {
    $response = $this->actingAs($this->user)->post(route('roles.store'), [
        'name' => 'editor',
        'guard_name' => 'web',
        'permissions' => [
            PermissionName::ViewReports->value,
            PermissionName::ViewAssessments->value,
        ],
    ]);

    $response->assertRedirect(route('roles.index'));
    $response->assertSessionHas('success');

    $role = Role::findByName('editor', 'web');
    expect($role)->not->toBeNull();
    expect($role->hasPermissionTo(PermissionName::ViewReports->value))->toBeTrue();
    expect($role->hasPermissionTo(PermissionName::ViewAssessments->value))->toBeTrue();
});

it('validates unique role name on creation', function (): void {
    $this->actingAs($this->user)
        ->post(route('roles.store'), [
            'name' => RoleName::Admin->value,
            'permissions' => [],
        ])
        ->assertSessionHasErrors('name');
});

it('renders the show role page', function (): void {
    $this->withoutVite();
    $role = Role::findByName(RoleName::Teacher->value, 'web');

    $this->actingAs($this->user)
        ->get(route('roles.show', $role))
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page): AssertableInertia => $page
            ->component('roles/show', false)
            ->has('role')
        );
});

it('renders the edit role page', function (): void {
    $this->withoutVite();
    $role = Role::findByName(RoleName::Teacher->value, 'web');

    $this->actingAs($this->user)
        ->get(route('roles.edit', $role))
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page): AssertableInertia => $page
            ->component('roles/edit', false)
            ->has('role')
            ->has('permissions')
        );
});

it('updates role and synchronizes permissions', function (): void {
    $role = Role::create(['name' => 'librarian', 'guard_name' => 'web']);

    $response = $this->actingAs($this->user)->put(route('roles.update', $role), [
        'name' => 'senior librarian',
        'guard_name' => 'web',
        'permissions' => [PermissionName::ViewReports->value],
    ]);

    $response->assertRedirect(route('roles.index'));
    $role->refresh();

    expect($role->name)->toBe('senior librarian');
    expect($role->hasPermissionTo(PermissionName::ViewReports->value))->toBeTrue();
});

it('deletes a role', function (): void {
    $role = Role::create(['name' => 'temporary_role', 'guard_name' => 'web']);

    $response = $this->actingAs($this->user)->delete(route('roles.destroy', $role));

    $response->assertRedirect(route('roles.index'));
    expect(Role::where('name', 'temporary_role')->exists())->toBeFalse();
});

it('renders the permissions index page', function (): void {
    $this->withoutVite();

    $this->actingAs($this->user)
        ->get(route('permissions.index'))
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page): AssertableInertia => $page
            ->component('roles/permissions/index', false)
            ->has('permissions')
        );
});
