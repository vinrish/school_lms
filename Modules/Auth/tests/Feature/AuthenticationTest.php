<?php

declare(strict_types=1);

use Inertia\Testing\AssertableInertia;
use Modules\Auth\Models\User;

it('renders the login page', function (): void {
    $this->withoutVite();

    $this->get(route('login'))
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page): AssertableInertia => $page->component('auth/login', false));
});

it('authenticates a user with valid credentials', function (): void {
    $user = User::factory()->create();

    $response = $this->post(route('login'), [
        'email' => $user->email,
        'password' => 'password',
    ]);

    $response->assertRedirect(route('home', absolute: false));
    $this->assertAuthenticatedAs($user);
});

it('rejects invalid credentials', function (): void {
    $user = User::factory()->create();

    $this->post(route('login'), [
        'email' => $user->email,
        'password' => 'wrong-password',
    ])->assertSessionHasErrors('email');

    $this->assertGuest();
});

it('logs the user out', function (): void {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->post(route('logout'))
        ->assertRedirect(route('home'));

    $this->assertGuest();
});
