import type { LabelHTMLAttributes, ReactNode } from 'react';

export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}: LabelHTMLAttributes<HTMLLabelElement> & { value?: string; children?: ReactNode }) {
    return (
        <label
            {...props}
            className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ${className}`}
        >
            {value ? value : children}
        </label>
    );
}
