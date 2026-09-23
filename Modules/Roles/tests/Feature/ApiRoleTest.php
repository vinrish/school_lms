<?php

declare(strict_types=1);

namespace Modules\Roles\Tests\Feature;

use Laravel\Passport\Passport;
use Modules\Auth\Models\User;
use Modules\Roles\Database\Seeders\RolesAndPermissionsSeeder;
use Modules\Roles\Enums\PermissionName;
use Modules\Roles\Enums\RoleName;
use Spatie\Permission\Models\Role;

beforeEach(function (): void {
    $this->seed(RolesAndPermissionsSeeder::class);
    $this->user = User::factory()->create();
    Passport::actingAs($this->user);
});

it('lists all roles via API', function (): void {
    $response = $this->getJson(route('api.roles.index'));

    $response->assertOk()
        ->assertJsonStructure([
            'data' => [
                '*' => ['id', 'name', 'guard_name', 'permissions'],
            ],
        ]);
});

it('creates a new role via API', function (): void {
    $response = $this->postJson(route('api.roles.store'), [
        'name' => 'counselor',
        'guard_name' => 'web',
        'permissions' => [PermissionName::ViewReports->value],
    ]);

    $response->assertCreated()
        ->assertJsonPath('data.name', 'counselor');

    expect(Role::findByName('counselor', 'web'))->not->toBeNull();
});

it('updates a role via API', function (): void {
    $role = Role::create(['name' => 'assistant', 'guard_name' => 'web']);

    $response = $this->putJson(route('api.roles.update', $role), [
        'name' => 'lead assistant',
        'guard_name' => 'web',
        'permissions' => [PermissionName::ViewAssessments->value],
    ]);

    $response->assertOk()
        ->assertJsonPath('data.name', 'lead assistant');
});

it('deletes a role via API', function (): void {
    $role = Role::create(['name' => 'to_delete', 'guard_name' => 'web']);

    $response = $this->deleteJson(route('api.roles.destroy', $role));

    $response->assertOk()
        ->assertJsonPath('message', 'Role deleted successfully.');
});

it('assigns roles to a user via API', function (): void {
    $targetUser = User::factory()->create();

    $response = $this->postJson(route('api.roles.assign'), [
        'user_id' => $targetUser->id,
        'roles' => [RoleName::Teacher->value, RoleName::Admin->value],
    ]);

    $response->assertOk();
    $targetUser->refresh();

    expect($targetUser->hasRole(RoleName::Teacher->value))->toBeTrue();
    expect($targetUser->hasRole(RoleName::Admin->value))->toBeTrue();
});

it('lists all permissions via API', function (): void {
    $response = $this->getJson(route('api.permissions.index'));

    $response->assertOk()
        ->assertJsonStructure([
            'data' => [
                '*' => ['id', 'name', 'guard_name'],
            ],
        ]);
});
