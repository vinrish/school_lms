<?php

declare(strict_types=1);

namespace Modules\Auth\Http\Controllers\Api;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Modules\Auth\Http\Requests\ApiLoginRequest;
use Modules\Auth\Models\User;
use Modules\Auth\Services\TokenService;

final readonly class ApiLoginController
{
    public function __construct(private TokenService $tokens) {}

    /**
     * Issue a first-party Sanctum token for a valid set of credentials.
     *
     * @throws ValidationException
     */
    public function __invoke(ApiLoginRequest $request): JsonResponse
    {
        /** @var array{email: string, password: string, device_name: string} $validated */
        $validated = $request->validated();

        $user = User::query()->where('email', $validated['email'])->first();

        if ($user === null || ! Hash::check($validated['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => __('auth.failed'),
            ]);
        }

        $token = $this->tokens->issueToken($user, $validated['device_name']);

        return response()->json([
            'token' => $token->accessToken,
        ]);
    }
}
