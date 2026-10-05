import { Link, usePage } from '@inertiajs/react';
import type { PropsWithChildren, ReactNode } from 'react';
import AppLayout from '@/Layouts/AppLayout';

export default function RolesLayout({
    title,
    action,
    children,
}: PropsWithChildren<{ title: string; action?: ReactNode }>) {
    const { url } = usePage();
    const isRolesTab = url.startsWith('/roles');
    const isPermissionsTab = url.startsWith('/permissions');

    return (
        <AppLayout
            title={title}
            subtitle="Manage access control, roles, and permissions across your school LMS."
            breadcrumbs={[
                { label: 'Dashboard', href: '/admin/dashboard' },
                { label: isRolesTab ? 'Roles' : 'Permissions' },
            ]}
            action={action}
        >
            <div className="space-y-6">
                <div className="border-b border-gray-200 dark:border-gray-800">
                    <nav className="-mb-px flex space-x-6">
                        <Link
                            href="/roles"
                            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                                isRolesTab
                                    ? 'border-[#f9322c] text-[#f9322c]'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'
                            }`}
                        >
                            Roles
                        </Link>
                        <Link
                            href="/permissions"
                            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                                isPermissionsTab
                                    ? 'border-[#f9322c] text-[#f9322c]'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'
                            }`}
                        >
                            Permissions
                        </Link>
                    </nav>
                </div>

                <div className="bg-white dark:bg-[#161615] rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
                    {children}
                </div>
            </div>
        </AppLayout>
    );
}
