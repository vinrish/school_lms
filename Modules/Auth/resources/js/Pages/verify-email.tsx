import PrimaryButton from '../Components/PrimaryButton';
import AuthLayout from '../Layouts/AuthLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';

interface VerifyEmailProps {
    status?: string | null;
}

export default function VerifyEmail({ status }: VerifyEmailProps) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post('/email/verification-notification');
    };

    return (
        <AuthLayout
            title="Verify your email"
            description="Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another."
        >
            <Head title="Email Verification" />

            {status === 'verification-link-sent' && (
                <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm font-medium text-emerald-600 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400">
                    A new verification link has been sent to the email address
                    you provided during registration.
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <PrimaryButton className="w-full" disabled={processing}>
                        {processing
                            ? 'Sending verification email...'
                            : 'Resend Verification Email'}
                    </PrimaryButton>
                </div>

                <div className="flex items-center justify-center pt-2">
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="text-sm font-medium text-gray-600 underline hover:text-gray-900 focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                    >
                        Log Out
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
}
