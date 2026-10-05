<?php

declare(strict_types=1);

namespace Modules\Roles\Providers;

use Illuminate\Routing\Router;
use Nwidart\Modules\Support\ModuleServiceProvider;
use Spatie\Permission\Middleware\PermissionMiddleware;
use Spatie\Permission\Middleware\RoleMiddleware;
use Spatie\Permission\Middleware\RoleOrPermissionMiddleware;

final class RolesServiceProvider extends ModuleServiceProvider
{
    /**
     * The name of the module.
     */
    protected string $name = 'Roles';

    /**
     * The lowercase version of the module name.
     */
    protected string $nameLower = 'roles';

    /**
     * Provider classes to register.
     *
     * @var string[]
     */
    protected array $providers = [
        EventServiceProvider::class,
        RouteServiceProvider::class,
    ];

    /**
     * Boot the module service provider.
     */
    public function boot(): void
    {
        parent::boot();

        $this->registerMiddlewareAliases();
    }

    /**
     * Register the spatie role/permission middleware aliases.
     */
    private function registerMiddlewareAliases(): void
    {
        /** @var Router $router */
        $router = $this->app->make(Router::class);

        $router->aliasMiddleware('role', RoleMiddleware::class);
        $router->aliasMiddleware('permission', PermissionMiddleware::class);
        $router->aliasMiddleware('role_or_permission', RoleOrPermissionMiddleware::class);
    }
}
