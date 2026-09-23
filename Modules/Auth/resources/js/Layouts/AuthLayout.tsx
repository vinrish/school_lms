import { Link } from '@inertiajs/react';
import type { PropsWithChildren, ReactNode } from 'react';

export default function AuthLayout({
    title,
    description,
    children,
}: PropsWithChildren<{ title?: string; description?: ReactNode }>) {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-[#FDFDFC] dark:bg-[#0a0a0a] text-[#1b1b18] dark:text-[#EDEDEC] p-6 lg:p-8 selection:bg-[#FF2D20] selection:text-white">
            <div className="w-full max-w-md">
                <div className="flex flex-col items-center mb-6">
                    <Link href="/" className="flex items-center gap-2 mb-2 focus:outline-none">
                        <svg
                            className="h-10 w-auto text-[#f9322c]"
                            viewBox="0 0 62 65"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M61.8548 14.6253C61.8778 14.7102 61.8895 14.797 61.8895 14.8841V47.1099C61.8895 47.9611 61.3643 48.7346 60.5485 49.0759L31.6447 61.1275C31.2588 61.2882 30.8251 61.2882 30.4392 61.1275L1.5354 49.0759C0.719615 48.7346 0.194336 47.9611 0.194336 47.1099V14.8841C0.194336 14.797 0.206019 14.7102 0.229045 14.6253C0.079219 14.2887 0.000305176 13.9213 0.000305176 13.5416C0.000305176 11.9616 1.28095 10.681 2.86098 10.681C3.12569 10.681 3.38171 10.7169 3.62479 10.784L30.5694 0.252061C30.8703 0.134547 31.2136 0.134547 31.5145 0.252061L58.4591 10.784C58.7022 10.7169 58.9582 10.681 59.2229 10.681C60.803 10.681 62.0836 11.9616 62.0836 13.5416C62.0836 13.9213 62.0047 14.2887 61.8548 14.6253Z"
                                fill="currentColor"
                            />
                        </svg>
                        <span className="text-xl font-bold tracking-tight">School LMS</span>
                    </Link>
                    {title && <h1 className="text-2xl font-semibold tracking-tight mt-2">{title}</h1>}
                    {description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-1">
                            {description}
                        </p>
                    )}
                </div>

                <div className="bg-white dark:bg-[#161615] rounded-xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 shadow-sm">
                    {children}
                </div>
            </div>
        </div>
    );
}
