<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;

Route::middleware(['auth:api', 'role:admin'])->prefix('admin')->group(function (): void {
    //
});
