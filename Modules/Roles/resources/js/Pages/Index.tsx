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
            title="Roles Management"
            action={
                <Link
                    href="/roles/create"
                    className="inline-flex items-center rounded-lg bg-[#f9322c] px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#d82a24] focus:ring-2 focus:ring-[#f9322c]/50 focus:outline-none"
                >
                    <svg
                        className="mr-1.5 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                    Create New Role
                </Link>
            }
        >
            <Head title="Roles Management" />

            {roles.length === 0 ? (
                <div className="py-12 text-center">
                    <p className="text-gray-500 dark:text-gray-400">
                        No roles found.
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-800/50 dark:text-gray-300">
                            <tr>
                                <th className="rounded-l-lg px-4 py-3">
                                    Role Name
                                </th>
                                <th className="px-4 py-3">Guard</th>
                                <th className="px-4 py-3">Users</th>
                                <th className="px-4 py-3">Permissions</th>
                                <th className="rounded-r-lg px-4 py-3 text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {roles.map((role) => (
                                <tr
                                    key={role.id}
                                    className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30"
                                >
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
                                    <td className="max-w-md px-4 py-4 text-gray-500 dark:text-gray-400">
                                        <div className="flex flex-wrap gap-1">
                                            {role.permissions &&
                                            role.permissions.length > 0 ? (
                                                role.permissions.map((p) => (
                                                    <span
                                                        key={p.id}
                                                        className="inline-block rounded bg-gray-100 px-2 py-0.5 text-[11px] text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                                                    >
                                                        {p.name}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-xs text-gray-400 italic">
                                                    No permissions assigned
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="space-x-2 px-4 py-4 text-right whitespace-nowrap">
                                        <Link
                                            href={`/roles/${role.id}`}
                                            className="text-xs font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
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
                                            className="text-xs font-medium text-red-600 hover:underline dark:text-red-400"
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
