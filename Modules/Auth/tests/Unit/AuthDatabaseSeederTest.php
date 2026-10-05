<?php

declare(strict_types=1);

namespace Modules\Auth\Tests\Unit;

use Illuminate\Support\Facades\Hash;
use Modules\Auth\Database\Seeders\AuthDatabaseSeeder;
use Modules\Auth\Models\User;
use Modules\Roles\Enums\RoleName;

it('seeds default users with their respective roles', function (): void {
    $this->seed(AuthDatabaseSeeder::class);

    $expectedUsers = [
        ['email' => 'admin@school.test', 'name' => 'Admin User', 'role' => RoleName::Admin->value],
        ['email' => 'teacher@school.test', 'name' => 'Teacher User', 'role' => RoleName::Teacher->value],
        ['email' => 'student@school.test', 'name' => 'Student User', 'role' => RoleName::Student->value],
        ['email' => 'parent@school.test', 'name' => 'Parent User', 'role' => RoleName::Parent->value],
    ];

    foreach ($expectedUsers as $expected) {
        $user = User::query()->where('email', $expected['email'])->first();

        expect($user)->not->toBeNull();
        expect($user?->name)->toBe($expected['name']);
        expect($user?->hasRole($expected['role']))->toBeTrue();
        expect($user?->email_verified_at)->not->toBeNull();
        expect(Hash::check('password', (string) $user?->password))->toBeTrue();
    }
});

it('can be run multiple times idempotently without duplicating users', function (): void {
    $this->seed(AuthDatabaseSeeder::class);
    $initialUserCount = User::count();

    $this->seed(AuthDatabaseSeeder::class);
    expect(User::count())->toBe($initialUserCount);
});
