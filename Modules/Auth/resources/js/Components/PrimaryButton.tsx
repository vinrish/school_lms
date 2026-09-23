import type { ButtonHTMLAttributes, ReactNode } from 'react';

export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children?: ReactNode }) {
    return (
        <button
            {...props}
            disabled={disabled}
            className={
                `inline-flex items-center justify-center rounded-md bg-[#f9322c] px-4 py-2 text-sm font-medium text-white shadow-xs hover:bg-[#e02424] focus:outline-none focus:ring-2 focus:ring-[#f9322c] focus:ring-offset-2 disabled:opacity-50 transition-colors duration-150 cursor-pointer disabled:cursor-not-allowed ${
                    disabled ? 'opacity-50' : ''
                } ` + className
            }
        >
            {children}
        </button>
    );
}
