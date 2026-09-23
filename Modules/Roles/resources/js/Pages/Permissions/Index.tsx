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
        permission.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <RolesLayout title="Permissions Overview">
            <Head title="Permissions Overview" />

            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-800">
                    <div>
                        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                            Available Permissions ({permissions.length})
                        </h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            Standard system capabilities configured across LMS roles.
                        </p>
                    </div>

                    <div className="w-full sm:w-64">
                        <input
                            type="text"
                            placeholder="Filter permissions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#f9322c]/50 focus:border-[#f9322c] outline-none"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredPermissions.map((permission) => (
                        <div
                            key={permission.id}
                            className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/40 hover:border-[#f9322c]/40 transition-colors shadow-xs flex flex-col justify-between"
                        >
                            <div>
                                <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100 capitalize">
                                    {permission.name.replace(/_/g, ' ')}
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono">
                                    {permission.name}
                                </p>
                            </div>
                            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between text-[11px] text-gray-400">
                                <span>Guard: {permission.guard_name}</span>
                                <span>ID: #{permission.id}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredPermissions.length === 0 && (
                    <div className="text-center py-8">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            No permissions match "{searchTerm}".
                        </p>
                    </div>
                )}
            </div>
        </RolesLayout>
    );
}
