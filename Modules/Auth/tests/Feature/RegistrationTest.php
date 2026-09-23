<?php

declare(strict_types=1);

use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Event;
use Inertia\Testing\AssertableInertia;
use Modules\Auth\Database\Seeders\RolesAndPermissionsSeeder;
use Modules\Auth\Enums\RoleName;
use Modules\Auth\Models\User;

beforeEach(function (): void {
    $this->seed(RolesAndPermissionsSeeder::class);
});

it('renders the registration page', function (): void {
    $this->withoutVite();

    $this->get(route('register'))
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page): AssertableInertia => $page->component('auth/register', false));
});

it('registers a new user, assigns the default role and logs them in', function (): void {
    Event::fake();

    $response = $this->post(route('register'), [
        'name' => 'Jane Doe',
        'email' => 'jane@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertRedirect(route('home', absolute: false));
    $this->assertAuthenticated();

    $user = User::query()->where('email', 'jane@example.com')->firstOrFail();

    expect($user->hasRole(RoleName::Student->value))->toBeTrue();
    Event::assertDispatched(Registered::class);
});

it('rejects duplicate email registration', function (): void {
    User::factory()->create(['email' => 'jane@example.com']);

    $this->post(route('register'), [
        'name' => 'Jane Doe',
        'email' => 'jane@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ])->assertSessionHasErrors('email');

    $this->assertGuest();
});
