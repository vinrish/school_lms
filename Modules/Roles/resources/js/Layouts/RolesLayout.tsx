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

    return (
        <div className="min-h-screen bg-[#FDFDFC] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">
            <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/70 backdrop-blur-md dark:border-gray-800 dark:bg-[#161615]/70">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center gap-6">
                            <Link
                                href="/"
                                className="flex items-center gap-2 text-lg font-bold"
                            >
                                <svg
                                    className="h-7 w-auto text-[#f9322c]"
                                    viewBox="0 0 62 65"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M61.8548 14.6253C61.8778 14.7102 61.8895 14.797 61.8895 14.8841V47.1099C61.8895 47.9611 61.3643 48.7346 60.5485 49.0759L31.6447 61.1275C31.2588 61.2882 30.8251 61.2882 30.4392 61.1275L1.5354 49.0759C0.719615 48.7346 0.194336 47.9611 0.194336 47.1099V14.8841C0.194336 14.797 0.206019 14.7102 0.229045 14.6253C0.079219 14.2887 0.000305176 13.9213 0.000305176 13.5416C0.000305176 11.9616 1.28095 10.681 2.86098 10.681C3.12569 10.681 3.38171 10.7169 3.62479 10.784L30.5694 0.252061C30.8703 0.134547 31.2136 0.134547 31.5145 0.252061L58.4591 10.784C58.7022 10.7169 58.9582 10.681 59.2229 10.681C60.803 10.681 62.0836 11.9616 62.0836 13.5416C62.0836 13.9213 62.0047 14.2887 61.8548 14.6253Z"
                                        fill="currentColor"
                                    />
                                </svg>
                                <span>School LMS</span>
                            </Link>

                            <nav className="flex items-center gap-1 sm:gap-4">
                                <Link
                                    href="/roles"
                                    className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                                        isRolesTab
                                            ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                                            : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                                    }`}
                                >
                                    Roles
                                </Link>
                                <Link
                                    href="/permissions"
                                    className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                                        isPermissionsTab
                                            ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                                            : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                                    }`}
                                >
                                    Permissions
                                </Link>
                            </nav>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link
                                href="/"
                                className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                Back to App
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            {title}
                        </h1>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Manage access control, roles, and permissions across
                            your school LMS.
                        </p>
                    </div>
                    {action && <div>{action}</div>}
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-[#161615]">
                    {children}
                </div>
            </main>
        </div>
    );
}
