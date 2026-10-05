import { Head } from '@inertiajs/react';
import { useState } from 'react';
import RolesLayout from '../../Layouts/RolesLayout';
import type { Permission } from '../../types';

interface IndexProps {
    permissions: Permission[];
}

export default function Index({ permissions = [] }: IndexProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPermissions = permissions.filter((permission) =>
        permission.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <RolesLayout title="Permissions Overview">
            <Head title="Permissions Overview" />

            <div className="space-y-6">
                <div className="flex flex-col gap-4 border-b border-gray-100 pb-4 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800">
                    <div>
                        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                            Available Permissions ({permissions.length})
                        </h2>
                        <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                            Standard system capabilities configured across LMS
                            roles.
                        </p>
                    </div>

                    <div className="w-full sm:w-64">
                        <input
                            type="text"
                            placeholder="Filter permissions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 outline-none focus:border-[#f9322c] focus:ring-2 focus:ring-[#f9322c]/50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredPermissions.map((permission) => (
                        <div
                            key={permission.id}
                            className="flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-xs transition-colors hover:border-[#f9322c]/40 dark:border-gray-700 dark:bg-gray-800/40"
                        >
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 capitalize dark:text-gray-100">
                                    {permission.name.replace(/_/g, ' ')}
                                </h3>
                                <p className="mt-1 font-mono text-xs text-gray-500 dark:text-gray-400">
                                    {permission.name}
                                </p>
                            </div>
                            <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3 text-[11px] text-gray-400 dark:border-gray-800/80">
                                <span>Guard: {permission.guard_name}</span>
                                <span>ID: #{permission.id}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredPermissions.length === 0 && (
                    <div className="py-8 text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            No permissions match "{searchTerm}".
                        </p>
                    </div>
                )}
            </div>
        </RolesLayout>
    );
}
