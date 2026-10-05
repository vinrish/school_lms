import { Head, Link, router } from '@inertiajs/react';
import RolesLayout from '../Layouts/RolesLayout';
import RoleBadge from '../Components/RoleBadge';
import type { Role, Permission } from '../types';

interface IndexProps {
    roles: Role[];
    permissions: Permission[];
}

export default function Index({ roles = [] }: IndexProps) {
    const handleDelete = (role: Role) => {
        if (confirm(`Are you sure you want to delete the role "${role.name}"? This action cannot be undone.`)) {
            router.delete(`/roles/${role.id}`);
        }
    };

    return (
        <RolesLayout
            title="Roles Management"
            action={
                <Link
                    href="/roles/create"
                    className="inline-flex items-center px-4 py-2 bg-[#f9322c] hover:bg-[#d82a24] text-white text-sm font-medium rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#f9322c]/50"
                >
                    <svg
                        className="w-4 h-4 mr-1.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create New Role
                </Link>
            }
        >
            <Head title="Roles Management" />

            {roles.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">No roles found.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 uppercase text-xs">
                            <tr>
                                <th className="px-4 py-3 rounded-l-lg">Role Name</th>
                                <th className="px-4 py-3">Guard</th>
                                <th className="px-4 py-3">Users</th>
                                <th className="px-4 py-3">Permissions</th>
                                <th className="px-4 py-3 text-right rounded-r-lg">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {roles.map((role) => (
                                <tr key={role.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                                    <td className="px-4 py-4 font-medium text-gray-900 dark:text-gray-100">
                                        <div className="flex items-center gap-2">
                                            <RoleBadge roleName={role.name} />
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-gray-500 dark:text-gray-400">
                                        {role.guard_name}
                                    </td>
                                    <td className="px-4 py-4 text-gray-500 dark:text-gray-400">
                                        {role.users_count ?? 0}
                                    </td>
                                    <td className="px-4 py-4 text-gray-500 dark:text-gray-400 max-w-md">
                                        <div className="flex flex-wrap gap-1">
                                            {role.permissions && role.permissions.length > 0 ? (
                                                role.permissions.map((p) => (
                                                    <span
                                                        key={p.id}
                                                        className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-[11px] px-2 py-0.5 rounded"
                                                    >
                                                        {p.name}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-gray-400 italic text-xs">No permissions assigned</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-right space-x-2 whitespace-nowrap">
                                        <Link
                                            href={`/roles/${role.id}`}
                                            className="text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            href={`/roles/${role.id}/edit`}
                                            className="text-xs font-medium text-[#f9322c] hover:underline"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(role)}
                                            className="text-xs font-medium text-red-600 dark:text-red-400 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </RolesLayout>
    );
}
