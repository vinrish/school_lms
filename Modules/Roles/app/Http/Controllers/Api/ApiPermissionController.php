<?php

declare(strict_types=1);

namespace Modules\Roles\Http\Controllers\Api;

use Illuminate\Http\JsonResponse;
use Modules\Roles\Services\PermissionService;

final readonly class ApiPermissionController
{
    public function __construct(
        private readonly PermissionService $permissionService,
    ) {}

    /**
     * Display a listing of permissions.
     */
    public function index(): JsonResponse
    {
        return response()->json([
            'data' => $this->permissionService->getAllPermissions(),
        ]);
    }
}
