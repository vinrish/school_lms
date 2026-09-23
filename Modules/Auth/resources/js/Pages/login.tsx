import Checkbox from '../Components/Checkbox';
import InputError from '../Components/InputError';
import InputLabel from '../Components/InputLabel';
import PrimaryButton from '../Components/PrimaryButton';
import TextInput from '../Components/TextInput';
import AuthLayout from '../Layouts/AuthLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';

interface LoginProps {
    canResetPassword?: boolean;
    status?: string | null;
}

export default function Login({ canResetPassword, status }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post('/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout
            title="Log in to your account"
            description="Welcome back! Please enter your details."
        >
            <Head title="Log in" />

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
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} />
                </div>

                <div>
                    <div className="flex items-center justify-between mb-1.5">
                        <InputLabel htmlFor="password" value="Password" className="mb-0" />
                        {canResetPassword && (
                            <Link
                                href="/forgot-password"
                                className="text-xs font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300 focus:outline-none focus:underline"
                            >
                                Forgot password?
                            </Link>
                        )}
                    </div>

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} />
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="pt-2">
                    <PrimaryButton className="w-full" disabled={processing}>
                        {processing ? 'Logging in...' : 'Log in'}
                    </PrimaryButton>
                </div>

                <div className="text-center pt-2 text-sm text-gray-600 dark:text-gray-400">
                    Don't have an account?{' '}
                    <Link
                        href="/register"
                        className="font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300 focus:outline-none focus:underline"
                    >
                        Sign up
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
}
