<?php

declare(strict_types=1);

namespace Modules\Roles\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Roles\Actions\CreateRoleAction;
use Modules\Roles\Actions\DeleteRoleAction;
use Modules\Roles\Actions\UpdateRoleAction;
use Modules\Roles\DataTransferObjects\RoleData;
use Modules\Roles\Http\Requests\StoreRoleRequest;
use Modules\Roles\Http\Requests\UpdateRoleRequest;
use Modules\Roles\Services\PermissionService;
use Modules\Roles\Services\RoleService;
use Spatie\Permission\Models\Role;

final readonly class RoleController
{
    public function __construct(
        private readonly RoleService $roleService,
        private readonly PermissionService $permissionService,
    ) {}

    /**
     * Display a listing of the roles.
     */
    public function index(): Response
    {
        return Inertia::render('roles/index', [
            'roles' => $this->roleService->getAllRolesWithPermissions(),
            'permissions' => $this->permissionService->getAllPermissions(),
        ]);
    }

    /**
     * Show the form for creating a new role.
     */
    public function create(): Response
    {
        return Inertia::render('roles/create', [
            'permissions' => $this->permissionService->getAllPermissions(),
        ]);
    }

    /**
     * Store a newly created role.
     */
    public function store(
        StoreRoleRequest $request,
        CreateRoleAction $action,
    ): RedirectResponse {
        $action->handle(RoleData::fromRequest($request));

        return redirect()
            ->route('roles.index')
            ->with('success', 'Role created successfully.');
    }

    /**
     * Display the specified role.
     */
    public function show(Role $role): Response
    {
        $role->load(['permissions', 'users']);

        return Inertia::render('roles/show', [
            'role' => $role,
        ]);
    }

    /**
     * Show the form for editing the specified role.
     */
    public function edit(Role $role): Response
    {
        $role->load('permissions');

        return Inertia::render('roles/edit', [
            'role' => $role,
            'permissions' => $this->permissionService->getAllPermissions(),
        ]);
    }

    /**
     * Update the specified role.
     */
    public function update(
        UpdateRoleRequest $request,
        Role $role,
        UpdateRoleAction $action,
    ): RedirectResponse {
        $action->handle($role, RoleData::fromRequest($request));

        return redirect()
            ->route('roles.index')
            ->with('success', 'Role updated successfully.');
    }

    /**
     * Remove the specified role.
     */
    public function destroy(
        Role $role,
        DeleteRoleAction $action,
    ): RedirectResponse {
        $action->handle($role);

        return redirect()
            ->route('roles.index')
            ->with('success', 'Role deleted successfully.');
    }
}
