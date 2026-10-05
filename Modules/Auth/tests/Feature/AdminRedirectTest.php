<?php

declare(strict_types=1);

use Modules\Auth\Models\User;
use Modules\Roles\Database\Seeders\RolesAndPermissionsSeeder;
use Modules\Roles\Enums\RoleName;

beforeEach(function (): void {
    $this->seed(RolesAndPermissionsSeeder::class);
});

test('admin user is redirected to admin dashboard upon logging in', function (): void {
    $admin = User::factory()->create([
        'email' => 'admin@school.test',
        'password' => bcrypt('password123'),
    ]);
    $admin->assignRole(RoleName::Admin->value);

    $response = $this->post('/login', [
        'email' => 'admin@school.test',
        'password' => 'password123',
    ]);

    $this->assertAuthenticatedAs($admin);
    $response->assertRedirect('/admin/dashboard');
});

test('non-admin user is redirected to home upon logging in', function (): void {
    $student = User::factory()->create([
        'email' => 'student@school.test',
        'password' => bcrypt('password123'),
    ]);
    $student->assignRole(RoleName::Student->value);

    $response = $this->post('/login', [
        'email' => 'student@school.test',
        'password' => 'password123',
    ]);

    $this->assertAuthenticatedAs($student);
    $response->assertRedirect('/');
});

test('authenticated admin visiting home route is redirected to admin dashboard', function (): void {
    $admin = User::factory()->create();
    $admin->assignRole(RoleName::Admin->value);

    $response = $this->actingAs($admin)->get('/');

    $response->assertRedirect('/admin/dashboard');
});

test('authenticated non-admin visiting home route renders welcome', function (): void {
    $student = User::factory()->create();
    $student->assignRole(RoleName::Student->value);

    $response = $this->actingAs($student)->get('/');

    $response->assertOk();
});
