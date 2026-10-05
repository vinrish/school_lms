<?php

declare(strict_types=1);

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Modules\Roles\Enums\RoleName;

Route::get('/', function (Request $request) {
    if ($request->user()?->hasRole(RoleName::Admin->value)) {
        return to_route('admin.dashboard');
    }

    return to_route('login');
})->name('home');
