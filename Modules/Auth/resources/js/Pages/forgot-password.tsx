import InputError from '../Components/InputError';
import InputLabel from '../Components/InputLabel';
import PrimaryButton from '../Components/PrimaryButton';
import TextInput from '../Components/TextInput';
import AuthLayout from '../Layouts/AuthLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';

interface ForgotPasswordProps {
    status?: string | null;
}

export default function ForgotPassword({ status }: ForgotPasswordProps) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post('/forgot-password');
    };

    return (
        <AuthLayout
            title="Forgot your password?"
            description="No problem. Just enter your email and we'll send you a password reset link."
        >
            <Head title="Forgot Password" />

            {status && (
                <div className="mb-4 text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 p-3 rounded-lg border border-emerald-200 dark:border-emerald-800">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        isFocused={true}
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} />
                </div>

                <div className="pt-2">
                    <PrimaryButton className="w-full" disabled={processing}>
                        {processing
                            ? 'Sending reset link...'
                            : 'Email Password Reset Link'}
                    </PrimaryButton>
                </div>

                <div className="text-center pt-2 text-sm text-gray-600 dark:text-gray-400">
                    Remember your password?{' '}
                    <Link
                        href="/login"
                        className="font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300 focus:outline-none focus:underline"
                    >
                        Back to login
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
}
