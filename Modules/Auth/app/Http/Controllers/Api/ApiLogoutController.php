<?php

declare(strict_types=1);

namespace Modules\Auth\Http\Controllers\Api;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Modules\Auth\Models\User;
use Modules\Auth\Services\TokenService;

final readonly class ApiLogoutController
{
    public function __construct(private TokenService $tokens) {}

    /**
     * Revoke the token used to authenticate the current request.
     */
    public function __invoke(Request $request): JsonResponse
    {
        /** @var User $user */
        $user = $request->user();

        $this->tokens->revokeCurrentToken($user);

        return response()->json(['message' => 'Logged out.']);
    }
}
