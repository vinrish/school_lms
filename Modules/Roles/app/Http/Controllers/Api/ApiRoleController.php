<?php

declare(strict_types=1);

namespace Modules\Roles\Http\Controllers\Api;

use Illuminate\Http\JsonResponse;
use Modules\Roles\Actions\AssignUserRolesAction;
use Modules\Roles\Actions\CreateRoleAction;
use Modules\Roles\Actions\DeleteRoleAction;
use Modules\Roles\Actions\UpdateRoleAction;
use Modules\Roles\DataTransferObjects\AssignRoleData;
use Modules\Roles\DataTransferObjects\RoleData;
use Modules\Roles\Http\Requests\AssignRoleRequest;
use Modules\Roles\Http\Requests\StoreRoleRequest;
use Modules\Roles\Http\Requests\UpdateRoleRequest;
use Modules\Roles\Services\RoleService;
use Spatie\Permission\Models\Role;
use Symfony\Component\HttpFoundation\Response;

final readonly class ApiRoleController
{
    public function __construct(
        private readonly RoleService $roleService,
    ) {}

    /**
     * Display a listing of the roles.
     */
    public function index(): JsonResponse
    {
        return response()->json([
            'data' => $this->roleService->getAllRolesWithPermissions(),
        ]);
    }

    /**
     * Store a newly created role.
     */
    public function store(
        StoreRoleRequest $request,
        CreateRoleAction $action,
    ): JsonResponse {
        $role = $action->handle(RoleData::fromRequest($request));

        return response()->json([
            'message' => 'Role created successfully.',
            'data' => $role->load('permissions'),
        ], Response::HTTP_CREATED);
    }

    /**
     * Display the specified role.
     */
    public function show(Role $role): JsonResponse
    {
        $role->load(['permissions', 'users']);

        return response()->json([
            'data' => $role,
        ]);
    }

    /**
     * Update the specified role.
     */
    public function update(
        UpdateRoleRequest $request,
        Role $role,
        UpdateRoleAction $action,
    ): JsonResponse {
        $role = $action->handle($role, RoleData::fromRequest($request));

        return response()->json([
            'message' => 'Role updated successfully.',
            'data' => $role->load('permissions'),
        ]);
    }

    /**
     * Remove the specified role.
     */
    public function destroy(
        Role $role,
        DeleteRoleAction $action,
    ): JsonResponse {
        $action->handle($role);

        return response()->json([
            'message' => 'Role deleted successfully.',
        ]);
    }

    /**
     * Assign roles to a user.
     */
    public function assignRoles(
        AssignRoleRequest $request,
        AssignUserRolesAction $action,
    ): JsonResponse {
        $user = $action->handle(AssignRoleData::fromRequest($request));

        return response()->json([
            'message' => 'Roles assigned successfully.',
            'data' => [
                'user_id' => $user->id,
                'roles' => $user->getRoleNames(),
            ],
        ]);
    }
}
