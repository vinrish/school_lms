import type { ButtonHTMLAttributes, ReactNode } from 'react';

export default function SecondaryButton({
    type = 'button',
    className = '',
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children?: ReactNode }) {
    return (
        <button
            {...props}
            type={type}
            disabled={disabled}
            className={
                `inline-flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-xs hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 transition-colors duration-150 cursor-pointer disabled:cursor-not-allowed ${
                    disabled ? 'opacity-50' : ''
                } ` + className
            }
        >
            {children}
        </button>
    );
}
