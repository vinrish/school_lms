import React from 'react';

interface RoleBadgeProps {
    roleName: string;
    className?: string;
}

export default function RoleBadge({ roleName, className = '' }: RoleBadgeProps) {
    const getBadgeStyle = (name: string): string => {
        switch (name.toLowerCase()) {
            case 'admin':
                return 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300 border-red-200 dark:border-red-900';
            case 'teacher':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-900';
            case 'student':
                return 'bg-green-100 text-green-800 dark:bg-green-950/60 dark:text-green-300 border-green-200 dark:border-green-900';
            case 'parent':
                return 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-900';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700';
        }
    };

    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${getBadgeStyle(
                roleName
            )} ${className}`}
        >
            {roleName}
        </span>
    );
}
