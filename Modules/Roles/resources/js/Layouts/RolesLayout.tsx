import AppLayout from '@/Layouts/AppLayout';
import { Link, usePage } from '@inertiajs/react';
import type { PropsWithChildren, ReactNode } from 'react';

export default function RolesLayout({
    title,
    action,
    children,
}: PropsWithChildren<{ title: string; action?: ReactNode }>) {
    const { url } = usePage();
    const isRolesTab = url.startsWith('/roles');
    const isPermissionsTab = url.startsWith('/permissions');

    const breadcrumbs: Array<{ label: string; href?: string }> = [
        { label: 'Admin', href: '/admin/dashboard' },
    ];

    if (isRolesTab) {
        if (url === '/roles') {
            breadcrumbs.push({ label: 'Roles' });
        } else {
            breadcrumbs.push({ label: 'Roles', href: '/roles' });
            breadcrumbs.push({ label: title });
        }
    } else if (isPermissionsTab) {
        if (url === '/permissions') {
            breadcrumbs.push({ label: 'Permissions' });
        } else {
            breadcrumbs.push({ label: 'Permissions', href: '/permissions' });
            breadcrumbs.push({ label: title });
        }
    }

    return (
        <AppLayout
            title={title}
            subtitle="Manage access control, roles, and permissions across your school LMS."
            action={action}
            breadcrumbs={breadcrumbs}
        >
            <div className="space-y-6">
                <div className="border-b border-gray-200 dark:border-gray-800">
                    <nav className="-mb-px flex space-x-6">
                        <Link
                            href="/roles"
                            className={`border-b-2 pb-3 text-sm font-medium transition-colors ${
                                isRolesTab
                                    ? 'border-[#f9322c] text-[#f9322c]'
                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                            }`}
                        >
                            Roles
                        </Link>
                        <Link
                            href="/permissions"
                            className={`border-b-2 pb-3 text-sm font-medium transition-colors ${
                                isPermissionsTab
                                    ? 'border-[#f9322c] text-[#f9322c]'
                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                            }`}
                        >
                            Permissions
                        </Link>
                    </nav>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs dark:border-gray-800 dark:bg-[#161615]">
                    {children}
                </div>
            </div>
        </AppLayout>
    );
}
