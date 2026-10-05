import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import RolesLayout from '../Layouts/RolesLayout';
import PermissionCheckboxGroup from '../Components/PermissionCheckboxGroup';
import type { Permission, RoleFormData } from '../types';

interface CreateProps {
    permissions: Permission[];
}

export default function Create({ permissions = [] }: CreateProps) {
    const { data, setData, post, processing, errors } = useForm<RoleFormData>({
        name: '',
        guard_name: 'web',
        permissions: [],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/roles');
    };

    return (
        <RolesLayout
            title="Create Role"
            action={
                <Link
                    href="/roles"
                    className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                    Cancel
                </Link>
            }
        >
            <Head title="Create Role" />

            <form onSubmit={submit} className="max-w-4xl space-y-6">
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
                        placeholder="e.g. librarian, coordinator"
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
                        {processing ? 'Creating...' : 'Create Role'}
                    </button>
                </div>
            </form>
        </RolesLayout>
    );
}
