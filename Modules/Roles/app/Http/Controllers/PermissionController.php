<?php

declare(strict_types=1);

namespace Modules\Roles\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Modules\Roles\Services\PermissionService;

final readonly class PermissionController
{
    public function __construct(
        private readonly PermissionService $permissionService,
    ) {}

    /**
     * Display a listing of permissions.
     */
    public function index(): Response
    {
        return Inertia::render('roles/permissions/index', [
            'permissions' => $this->permissionService->getAllPermissions(),
        ]);
    }
}
