import { Head, Link, router } from '@inertiajs/react';
import RolesLayout from '../Layouts/RolesLayout';
import RoleBadge from '../Components/RoleBadge';
import type { Role } from '../types';

interface ShowProps {
    role: Role;
}

export default function Show({ role }: ShowProps) {
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
            title={`Role: ${role.name}`}
            action={
                <div className="flex items-center gap-2">
                    <Link
                        href="/roles"
                        className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                        Back to Roles
                    </Link>
                    <Link
                        href={`/roles/${role.id}/edit`}
                        className="inline-flex items-center rounded-lg bg-[#f9322c] px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#d82a24] focus:ring-2 focus:ring-[#f9322c]/50 focus:outline-none"
                    >
                        Edit Role
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
            <Head title={`Role: ${role.name}`} />

            <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 sm:grid-cols-3 dark:border-gray-700 dark:bg-gray-800/40">
                    <div>
                        <span className="block text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                            Role Name
                        </span>
                        <div className="mt-1">
                            <RoleBadge roleName={role.name} />
                        </div>
                    </div>
                    <div>
                        <span className="block text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                            Guard Name
                        </span>
                        <span className="mt-1 block text-sm font-medium text-gray-900 dark:text-gray-100">
                            {role.guard_name}
                        </span>
                    </div>
                    <div>
                        <span className="block text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                            Assigned Users
                        </span>
                        <span className="mt-1 block text-sm font-medium text-gray-900 dark:text-gray-100">
                            {role.users
                                ? role.users.length
                                : (role.users_count ?? 0)}
                        </span>
                    </div>
                </div>

                <div>
                    <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
                        Assigned Permissions (
                        {role.permissions ? role.permissions.length : 0})
                    </h2>
                    {role.permissions && role.permissions.length > 0 ? (
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {role.permissions.map((permission) => (
                                <div
                                    key={permission.id}
                                    className="flex flex-col rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800/50"
                                >
                                    <span className="text-sm font-medium text-gray-900 capitalize dark:text-gray-100">
                                        {permission.name.replace(/_/g, ' ')}
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        Guard: {permission.guard_name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500 italic dark:text-gray-400">
                            No permissions have been granted to this role.
                        </p>
                    )}
                </div>

                {role.users && role.users.length > 0 && (
                    <div className="border-t border-gray-100 pt-6 dark:border-gray-800">
                        <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
                            Users with this role ({role.users.length})
                        </h2>
                        <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                            {role.users.map((user) => (
                                <li
                                    key={user.id}
                                    className="flex items-center justify-between py-2.5"
                                >
                                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                        {user.name}
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {user.email}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </RolesLayout>
    );
}
