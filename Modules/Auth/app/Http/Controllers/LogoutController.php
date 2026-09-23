<?php

declare(strict_types=1);

namespace Modules\Auth\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Modules\Auth\Actions\LogoutAction;

final readonly class LogoutController
{
    /**
     * Log the user out of the application.
     */
    public function __invoke(Request $request, LogoutAction $logout): RedirectResponse
    {
        $logout->handle($request);

        return to_route('home');
    }
}
