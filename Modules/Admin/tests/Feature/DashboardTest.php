<?php

declare(strict_types=1);

use Inertia\Testing\AssertableInertia as Assert;
use Modules\Auth\Models\User;
use Modules\Roles\Database\Seeders\RolesAndPermissionsSeeder;
use Modules\Roles\Enums\RoleName;

beforeEach(function (): void {
    $this->seed(RolesAndPermissionsSeeder::class);
});

test('unauthenticated users are redirected from admin dashboard to login', function (): void {
    $response = $this->get('/admin/dashboard');

    $response->assertRedirect('/login');
});

test('non-admin users are forbidden from viewing admin dashboard', function (): void {
    $student = User::factory()->create();
    $student->assignRole(RoleName::Student->value);

    $response = $this->actingAs($student)->get('/admin/dashboard');

    $response->assertForbidden();
});

test('admin users can access admin dashboard with statistics', function (): void {
    $this->withoutVite();

    $admin = User::factory()->create();
    $admin->assignRole(RoleName::Admin->value);

    $teacher = User::factory()->create();
    $teacher->assignRole(RoleName::Teacher->value);

    $student = User::factory()->create();
    $student->assignRole(RoleName::Student->value);

    $response = $this->actingAs($admin)->get('/admin/dashboard');

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('admin/dashboard', false)
        ->has('stats')
        ->has('recentUsers')
        ->where('stats.admins_count', 1)
        ->where('stats.teachers_count', 1)
        ->where('stats.students_count', 1)
    );
});
