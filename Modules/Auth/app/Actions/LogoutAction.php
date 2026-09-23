<?php

declare(strict_types=1);

namespace Modules\Auth\Actions;

use Illuminate\Http\Request;
use Modules\Auth\Services\AuthService;

final readonly class LogoutAction
{
    public function __construct(private AuthService $auth) {}

    /**
     * Log the current user out of the session guard.
     */
    public function handle(Request $request): void
    {
        $this->auth->logout($request);
    }
}
