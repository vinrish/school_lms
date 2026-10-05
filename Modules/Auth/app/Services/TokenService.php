<?php

declare(strict_types=1);

namespace Modules\Auth\Services;

use Laravel\Passport\PersonalAccessTokenResult;
use Laravel\Passport\Token;
use Modules\Auth\Models\User;

final class TokenService
{
    /**
     * Issue a new first-party Passport personal access token for the given user.
     *
     * @param  array<int, string>  $scopes
     * @return PersonalAccessTokenResult<mixed>
     */
    public function issueToken(User $user, string $name, array $scopes = []): PersonalAccessTokenResult
    {
        return $user->createToken($name, $scopes);
    }

    /**
     * Revoke the token currently used to authenticate the request.
     */
    public function revokeCurrentToken(User $user): void
    {
        $token = $user->token();

        if ($token instanceof Token) {
            $token->revoke();
        }
    }

    /**
     * Revoke all of the user's Passport tokens.
     */
    public function revokeAllTokens(User $user): void
    {
        $user->tokens()->each(static function (Token $token): void {
            $token->revoke();
        });
    }
}
