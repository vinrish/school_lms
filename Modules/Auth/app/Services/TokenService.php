<?php

declare(strict_types=1);

namespace Modules\Auth\Services;

use Laravel\Sanctum\NewAccessToken;
use Modules\Auth\Models\User;

final class TokenService
{
    /**
     * Issue a new first-party Sanctum token for the given user.
     *
     * @param  array<int, string>  $abilities
     */
    public function issueToken(User $user, string $name, array $abilities = ['*']): NewAccessToken
    {
        return $user->createToken($name, $abilities);
    }

    /**
     * Revoke the token currently used to authenticate the request.
     */
    public function revokeCurrentToken(User $user): void
    {
        $token = $user->currentAccessToken();

        if ($token !== null) {
            $token->delete();
        }
    }

    /**
     * Revoke all of the user's first-party tokens.
     */
    public function revokeAllTokens(User $user): void
    {
        $user->tokens()->delete();
    }
}
