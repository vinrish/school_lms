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
                `inline-flex cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-xs transition-colors duration-150 hover:bg-gray-50 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 ${
                    disabled ? 'opacity-50' : ''
                } ` + className
            }
        >
            {children}
        </button>
    );
}
