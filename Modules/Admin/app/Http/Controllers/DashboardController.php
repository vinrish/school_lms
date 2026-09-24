<?php

declare(strict_types=1);

namespace Modules\Admin\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Modules\Auth\Models\User;
use Modules\Roles\Enums\RoleName;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

final readonly class DashboardController
{
    /**
     * Display the admin dashboard.
     */
    public function index(): Response
    {
        $totalUsers = User::count();
        $totalRoles = Role::count();
        $totalPermissions = Permission::count();

        $teachersCount = User::role(RoleName::Teacher->value)->count();
        $studentsCount = User::role(RoleName::Student->value)->count();
        $parentsCount = User::role(RoleName::Parent->value)->count();
        $adminsCount = User::role(RoleName::Admin->value)->count();

        $recentUsers = User::with('roles')
            ->latest('id')
            ->take(5)
            ->get()
            ->map(static fn (User $user): array => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $user->getRoleNames()->toArray(),
                'created_at' => $user->created_at?->toISOString() ?? '',
            ]);

        return Inertia::render('admin/dashboard', [
            'stats' => [
                'total_users' => $totalUsers,
                'total_roles' => $totalRoles,
                'total_permissions' => $totalPermissions,
                'teachers_count' => $teachersCount,
                'students_count' => $studentsCount,
                'parents_count' => $parentsCount,
                'admins_count' => $adminsCount,
            ],
            'recentUsers' => $recentUsers,
        ]);
    }
}
