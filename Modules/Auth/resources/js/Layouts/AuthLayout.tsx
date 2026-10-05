import { Link } from '@inertiajs/react';
import type { PropsWithChildren, ReactNode } from 'react';

export default function AuthLayout({
    title,
    description,
    children,
}: PropsWithChildren<{ title?: string; description?: ReactNode }>) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#FDFDFC] p-6 text-[#1b1b18] selection:bg-[#FF2D20] selection:text-white lg:p-8 dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">
            <div className="w-full max-w-md">
                <div className="mb-6 flex flex-col items-center">
                    <Link
                        href="/"
                        className="mb-2 flex items-center gap-2 focus:outline-none"
                    >
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
                        <span className="text-xl font-bold tracking-tight">
                            School LMS
                        </span>
                    </Link>
                    {title && (
                        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
                            {title}
                        </h1>
                    )}
                    {description && (
                        <p className="mt-1 text-center text-sm text-gray-600 dark:text-gray-400">
                            {description}
                        </p>
                    )}
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-800 dark:bg-[#161615]">
                    {children}
                </div>
            </div>
        </div>
    );
}
