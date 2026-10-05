import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

interface DashboardStats {
    total_users: number;
    total_roles: number;
    total_permissions: number;
    teachers_count: number;
    students_count: number;
    parents_count: number;
    admins_count: number;
}

interface RecentUser {
    id: number;
    name: string;
    email: string;
    roles: string[];
    created_at: string;
}

interface DashboardProps {
    stats: DashboardStats;
    recentUsers: RecentUser[];
}

export default function Dashboard({ stats, recentUsers = [] }: DashboardProps) {
    const roleColor = (role: string) => {
        switch (role.toLowerCase()) {
            case 'admin':
                return 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 border-purple-200 dark:border-purple-800';
            case 'teacher':
                return 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200 dark:border-blue-800';
            case 'student':
                return 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 border-green-200 dark:border-green-800';
            case 'parent':
                return 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200 dark:border-amber-800';
            default:
                return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700';
        }
    };

    return (
        <AppLayout
            title="Admin Dashboard"
            subtitle="Overview of system metrics, users, roles, and administrative controls."
            breadcrumbs={[{ label: 'Admin' }, { label: 'Dashboard' }]}
        >
            <Head title="Admin Dashboard" />

            <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {/* Total Users */}
                    <div className="bg-white dark:bg-[#161615] rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-xs flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Total Users
                            </p>
                            <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">
                                {stats?.total_users ?? 0}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                Registered in the system
                            </p>
                        </div>
                        <div className="h-12 w-12 rounded-xl bg-[#f9322c]/10 text-[#f9322c] flex items-center justify-center shrink-0">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                    </div>

                    {/* Teachers */}
                    <div className="bg-white dark:bg-[#161615] rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-xs flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                                Teachers
                            </p>
                            <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">
                                {stats?.teachers_count ?? 0}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                Faculty & Instructors
                            </p>
                        </div>
                        <div className="h-12 w-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                        </div>
                    </div>

                    {/* Students */}
                    <div className="bg-white dark:bg-[#161615] rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-xs flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider">
                                Students
                            </p>
                            <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">
                                {stats?.students_count ?? 0}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                Enrolled learners
                            </p>
                        </div>
                        <div className="h-12 w-12 rounded-xl bg-green-50 dark:bg-green-950/50 text-green-600 dark:text-green-400 flex items-center justify-center shrink-0">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M12 14l9-5-9-5-9 5 9 5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                            </svg>
                        </div>
                    </div>

                    {/* Parents & Admins */}
                    <div className="bg-white dark:bg-[#161615] rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-xs flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                                Roles & RBAC
                            </p>
                            <div className="flex items-baseline gap-2 mt-2">
                                <span className="text-3xl font-bold text-gray-900 dark:text-white">{stats?.total_roles ?? 0}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">roles ({stats?.total_permissions ?? 0} permissions)</span>
                            </div>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                {stats?.admins_count ?? 0} Admins · {stats?.parents_count ?? 0} Parents
                            </p>
                        </div>
                        <div className="h-12 w-12 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Quick Actions & Navigation */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link
                        href="/roles"
                        className="group bg-white dark:bg-[#161615] rounded-xl border border-gray-200 dark:border-gray-800 p-5 shadow-xs hover:border-[#f9322c]/50 transition-colors flex items-center justify-between"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 group-hover:bg-[#f9322c]/10 group-hover:text-[#f9322c] transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-[#f9322c] transition-colors">
                                    Manage Roles
                                </h2>
                                <p className="text-xs text-gray-500 dark:text-gray-400">View and configure system roles</p>
                            </div>
                        </div>
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-[#f9322c] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>

                    <Link
                        href="/roles/create"
                        className="group bg-white dark:bg-[#161615] rounded-xl border border-gray-200 dark:border-gray-800 p-5 shadow-xs hover:border-[#f9322c]/50 transition-colors flex items-center justify-between"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 group-hover:bg-[#f9322c]/10 group-hover:text-[#f9322c] transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-[#f9322c] transition-colors">
                                    Create New Role
                                </h2>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Add a custom role with permissions</p>
                            </div>
                        </div>
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-[#f9322c] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>

                    <Link
                        href="/permissions"
                        className="group bg-white dark:bg-[#161615] rounded-xl border border-gray-200 dark:border-gray-800 p-5 shadow-xs hover:border-[#f9322c]/50 transition-colors flex items-center justify-between"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 group-hover:bg-[#f9322c]/10 group-hover:text-[#f9322c] transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-[#f9322c] transition-colors">
                                    Permissions Index
                                </h2>
                                <p className="text-xs text-gray-500 dark:text-gray-400">View and audit system permissions</p>
                            </div>
                        </div>
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-[#f9322c] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

                {/* Recent Users Section */}
                <div className="bg-white dark:bg-[#161615] rounded-xl border border-gray-200 dark:border-gray-800 shadow-xs p-6">
                    <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
                        <div>
                            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Recent Users</h2>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Latest registrations across the platform</p>
                        </div>
                    </div>

                    {recentUsers.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-sm text-gray-500 dark:text-gray-400">No users found.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto mt-4">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 uppercase text-xs">
                                    <tr>
                                        <th className="px-4 py-3 rounded-l-lg">User</th>
                                        <th className="px-4 py-3">Email</th>
                                        <th className="px-4 py-3">Roles</th>
                                        <th className="px-4 py-3 text-right rounded-r-lg">Joined</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                    {recentUsers.map((u) => (
                                        <tr key={u.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                                            <td className="px-4 py-3.5 font-medium text-gray-900 dark:text-gray-100">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 flex items-center justify-center font-medium text-xs">
                                                        {u.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <span>{u.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3.5 text-gray-500 dark:text-gray-400">{u.email}</td>
                                            <td className="px-4 py-3.5">
                                                <div className="flex flex-wrap gap-1">
                                                    {u.roles && u.roles.length > 0 ? (
                                                        u.roles.map((r) => (
                                                            <span
                                                                key={r}
                                                                className={`inline-block text-[11px] font-medium px-2 py-0.5 rounded border ${roleColor(
                                                                    r,
                                                                )}`}
                                                            >
                                                                {r}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span className="text-gray-400 italic text-xs">No role</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3.5 text-right text-xs text-gray-500 dark:text-gray-400">
                                                {u.created_at ? new Date(u.created_at).toLocaleDateString() : '-'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
