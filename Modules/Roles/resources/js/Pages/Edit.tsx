import { Head, Link, useForm, router } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import RolesLayout from '../Layouts/RolesLayout';
import PermissionCheckboxGroup from '../Components/PermissionCheckboxGroup';
import RoleBadge from '../Components/RoleBadge';
import type { Role, Permission, RoleFormData } from '../types';

interface EditProps {
    role: Role;
    permissions: Permission[];
}

export default function Edit({ role, permissions }: EditProps) {
    const { data, setData, put, processing, errors } = useForm<RoleFormData>({
        name: role.name,
        guard_name: role.guard_name,
        permissions: role.permissions
            ? role.permissions.map((p) => p.name)
            : [],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/roles/${role.id}`);
    };

    const handleDelete = () => {
        if (
            confirm(
                `Are you sure you want to delete the role "${role.name}"? This action cannot be undone.`,
            )
        ) {
            router.delete(`/roles/${role.id}`);
        }
    };

    return (
        <RolesLayout
            title={`Edit Role: ${role.name}`}
            action={
                <div className="flex items-center gap-2">
                    <Link
                        href={`/roles/${role.id}`}
                        className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                        View Details
                    </Link>
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="inline-flex items-center rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300 dark:hover:bg-red-900/60"
                    >
                        Delete Role
                    </button>
                </div>
            }
        >
            <Head title={`Edit Role: ${role.name}`} />

            <form onSubmit={submit} className="max-w-4xl space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4 dark:border-gray-800">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        Current Role:
                    </span>
                    <RoleBadge roleName={role.name} />
                </div>

                <div>
                    <label
                        htmlFor="name"
                        className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Role Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 transition-colors outline-none focus:border-[#f9322c] focus:ring-2 focus:ring-[#f9322c]/50 sm:w-1/2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                            {errors.name}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="guard_name"
                        className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Guard Name
                    </label>
                    <input
                        id="guard_name"
                        type="text"
                        value={data.guard_name}
                        onChange={(e) => setData('guard_name', e.target.value)}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 transition-colors outline-none focus:border-[#f9322c] focus:ring-2 focus:ring-[#f9322c]/50 sm:w-1/2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                    />
                    {errors.guard_name && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                            {errors.guard_name}
                        </p>
                    )}
                </div>

                <div className="border-t border-gray-100 pt-4 dark:border-gray-800">
                    <PermissionCheckboxGroup
                        permissions={permissions}
                        selectedPermissions={data.permissions}
                        onChange={(selected) =>
                            setData('permissions', selected)
                        }
                        error={errors.permissions}
                    />
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4 dark:border-gray-800">
                    <Link
                        href="/roles"
                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-lg bg-[#f9322c] px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#d82a24] focus:ring-2 focus:ring-[#f9322c]/50 focus:outline-none disabled:opacity-50"
                    >
                        {processing ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </RolesLayout>
    );
}
