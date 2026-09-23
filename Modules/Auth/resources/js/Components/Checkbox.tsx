import type { InputHTMLAttributes } from 'react';

export default function Checkbox({
    className = '',
    ...props
}: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'h-4 w-4 rounded border-gray-300 dark:border-gray-700 text-red-600 dark:bg-gray-900 focus:ring-red-500 focus:ring-offset-0 ' +
                className
            }
        />
    );
}
