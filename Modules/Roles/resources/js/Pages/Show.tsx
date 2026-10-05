import { Head, Link, router } from '@inertiajs/react';
import RolesLayout from '../Layouts/RolesLayout';
import RoleBadge from '../Components/RoleBadge';
import type { Role } from '../types';

interface ShowProps {
    role: Role;
}

export default function Show({ role }: ShowProps) {
    const handleDelete = () => {
        if (confirm(`Are you sure you want to delete the role "${role.name}"? This action cannot be undone.`)) {
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
                        className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        Back to Roles
                    </Link>
                    <Link
                        href={`/roles/${role.id}/edit`}
                        className="inline-flex items-center px-4 py-2 bg-[#f9322c] hover:bg-[#d82a24] text-white text-sm font-medium rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#f9322c]/50"
                    >
                        Edit Role
                    </Link>
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="inline-flex items-center px-4 py-2 border border-red-300 dark:border-red-900/50 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 text-sm font-medium rounded-lg hover:bg-red-100 dark:hover:bg-red-900/60 transition-colors"
                    >
                        Delete Role
                    </button>
                </div>
            }
        >
            <Head title={`Role: ${role.name}`} />

            <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800/40 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div>
                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
                            Role Name
                        </span>
                        <div className="mt-1">
                            <RoleBadge roleName={role.name} />
                        </div>
                    </div>
                    <div>
                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
                            Guard Name
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100 mt-1 block">
                            {role.guard_name}
                        </span>
                    </div>
                    <div>
                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
                            Assigned Users
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100 mt-1 block">
                            {role.users ? role.users.length : role.users_count ?? 0}
                        </span>
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                        Assigned Permissions ({role.permissions ? role.permissions.length : 0})
                    </h2>
                    {role.permissions && role.permissions.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {role.permissions.map((permission) => (
                                <div
                                    key={permission.id}
                                    className="p-3 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col"
                                >
                                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100 capitalize">
                                        {permission.name.replace(/_/g, ' ')}
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        Guard: {permission.guard_name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                            No permissions have been granted to this role.
                        </p>
                    )}
                </div>

                {role.users && role.users.length > 0 && (
                    <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                            Users with this role ({role.users.length})
                        </h2>
                        <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                            {role.users.map((user) => (
                                <li key={user.id} className="py-2.5 flex items-center justify-between">
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
