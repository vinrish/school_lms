import { Link, router, usePage } from '@inertiajs/react';
import { type PropsWithChildren, type ReactNode, useState } from 'react';
import type { Auth } from '@/types/auth';

interface SharedProps {
    name?: string;
    auth: Auth;
    flash?: {
        success?: string | null;
        error?: string | null;
        status?: string | null;
    };
    [key: string]: unknown;
}

interface AppLayoutProps {
    title?: string;
    subtitle?: string;
    action?: ReactNode;
    breadcrumbs?: Array<{ label: string; href?: string }>;
}

export default function AppLayout({
    title,
    subtitle,
    action,
    breadcrumbs,
    children,
}: PropsWithChildren<AppLayoutProps>) {
    const { auth, flash } = usePage<SharedProps>().props;
    const { url } = usePage();
    const user = auth?.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const isAdmin = user?.roles?.includes('admin') ?? false;

    const navItems = [
        ...(isAdmin
            ? [
                  {
                      name: 'Admin Dashboard',
                      href: '/admin/dashboard',
                      icon: (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                              />
                          </svg>
                      ),
                      active: url.startsWith('/admin'),
                  },
              ]
            : [
                  {
                      name: 'Home',
                      href: '/',
                      icon: (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                              />
                          </svg>
                      ),
                      active: url === '/',
                  },
              ]),
        {
            name: 'Roles',
            href: '/roles',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                </svg>
            ),
            active: url.startsWith('/roles'),
        },
        {
            name: 'Permissions',
            href: '/permissions',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                </svg>
            ),
            active: url.startsWith('/permissions'),
        },
    ];

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <div className="min-h-screen bg-[#FDFDFC] dark:bg-[#0a0a0a] text-[#1b1b18] dark:text-[#EDEDEC] flex flex-col">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden backdrop-blur-xs transition-opacity"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-[#161615]/80 backdrop-blur-md px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 focus:outline-none lg:hidden"
                        aria-label="Toggle sidebar"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <Link href="/" className="flex items-center gap-2.5 font-bold text-lg tracking-tight">
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
                </div>

                <div className="flex items-center gap-3">
                    {user ? (
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none"
                            >
                                <div className="h-8 w-8 rounded-full bg-[#f9322c]/10 text-[#f9322c] flex items-center justify-center font-semibold text-sm">
                                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                </div>
                                <div className="hidden md:flex flex-col text-left">
                                    <span className="text-sm font-medium leading-none">{user.name}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                        {user.roles && user.roles.length > 0 ? user.roles[0] : user.email}
                                    </span>
                                </div>
                                <svg className="w-4 h-4 text-gray-500 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {userMenuOpen && (
                                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-[#161615] border border-gray-200 dark:border-gray-800 shadow-lg py-1.5 z-50">
                                    <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800">
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Signed in as</p>
                                        <p className="text-sm font-medium truncate text-gray-900 dark:text-gray-100 mt-0.5">{user.email}</p>
                                        {user.roles && user.roles.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mt-1.5">
                                                {user.roles.map((r) => (
                                                    <span key={r} className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                                        {r}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-800/60 flex items-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Sign out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link
                                href="/login"
                                className="px-3.5 py-1.5 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                Log in
                            </Link>
                            <Link
                                href="/register"
                                className="px-3.5 py-1.5 text-sm font-medium rounded-lg bg-[#f9322c] hover:bg-[#d82a24] text-white"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </header>

            <div className="flex flex-1">
                {/* Sidebar Navigation */}
                <aside
                    className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white dark:bg-[#161615] border-r border-gray-200 dark:border-gray-800 pt-16 transition-transform duration-200 ease-in-out lg:static lg:pt-0 lg:translate-x-0 ${
                        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    <div className="flex flex-col h-full justify-between p-4">
                        <div className="space-y-6">
                            <div className="lg:hidden flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
                                <span className="font-semibold text-sm text-gray-500 uppercase tracking-wider">Navigation</span>
                                <button
                                    type="button"
                                    onClick={() => setSidebarOpen(false)}
                                    className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <nav className="space-y-1">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                            item.active
                                                ? 'bg-[#f9322c]/10 text-[#f9322c] dark:bg-[#f9322c]/20'
                                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60'
                                        }`}
                                    >
                                        <span className={item.active ? 'text-[#f9322c]' : 'text-gray-400 dark:text-gray-500'}>
                                            {item.icon}
                                        </span>
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {user && (
                            <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    Sign out
                                </button>
                            </div>
                        )}
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto space-y-6">
                        {/* Flash message notifications */}
                        {flash?.success && (
                            <div className="rounded-xl border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/40 p-4 text-green-800 dark:text-green-300 text-sm flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>{flash.success}</span>
                                </div>
                            </div>
                        )}
                        {flash?.error && (
                            <div className="rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40 p-4 text-red-800 dark:text-red-300 text-sm flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    <span>{flash.error}</span>
                                </div>
                            </div>
                        )}
                        {flash?.status && (
                            <div className="rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/40 p-4 text-blue-800 dark:text-blue-300 text-sm flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{flash.status}</span>
                                </div>
                            </div>
                        )}

                        {/* Page Header */}
                        {(title || action || breadcrumbs) && (
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    {breadcrumbs && breadcrumbs.length > 0 && (
                                        <nav className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-1">
                                            {breadcrumbs.map((bc, idx) => (
                                                <span key={bc.label} className="flex items-center gap-1.5">
                                                    {idx > 0 && <span>/</span>}
                                                    {bc.href ? (
                                                        <Link href={bc.href} className="hover:text-gray-800 dark:hover:text-gray-200">
                                                            {bc.label}
                                                        </Link>
                                                    ) : (
                                                        <span className="text-gray-800 dark:text-gray-200 font-medium">{bc.label}</span>
                                                    )}
                                                </span>
                                            ))}
                                        </nav>
                                    )}
                                    {title && <h1 className="text-2xl font-bold tracking-tight">{title}</h1>}
                                    {subtitle && (
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                            {subtitle}
                                        </p>
                                    )}
                                </div>
                                {action && <div>{action}</div>}
                            </div>
                        )}

                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
