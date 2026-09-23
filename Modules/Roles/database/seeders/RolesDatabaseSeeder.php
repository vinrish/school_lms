<?php

declare(strict_types=1);

namespace Modules\Roles\Database\Seeders;

use Illuminate\Database\Seeder;

final class RolesDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call([
            RolesAndPermissionsSeeder::class,
        ]);
    }
}
