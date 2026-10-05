<?php

declare(strict_types=1);

namespace Modules\Auth\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Modules\Auth\Models\User;
use Modules\Roles\Database\Seeders\RolesAndPermissionsSeeder;
use Modules\Roles\Enums\RoleName;

final class AuthDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call([
            RolesAndPermissionsSeeder::class,
        ]);

        $defaultUsers = [
            [
                'name' => 'Admin User',
                'email' => 'admin@school.test',
                'role' => RoleName::Admin->value,
            ],
            [
                'name' => 'Teacher User',
                'email' => 'teacher@school.test',
                'role' => RoleName::Teacher->value,
            ],
            [
                'name' => 'Student User',
                'email' => 'student@school.test',
                'role' => RoleName::Student->value,
            ],
            [
                'name' => 'Parent User',
                'email' => 'parent@school.test',
                'role' => RoleName::Parent->value,
            ],
        ];

        foreach ($defaultUsers as $userData) {
            $user = User::query()->firstOrCreate(['email' => $userData['email']], [
                'name' => $userData['name'],
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]);

            $user->syncRoles([$userData['role']]);
        }
    }
}
