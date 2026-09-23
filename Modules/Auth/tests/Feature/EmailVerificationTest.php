<?php

declare(strict_types=1);

use Illuminate\Auth\Events\Verified;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\URL;
use Inertia\Testing\AssertableInertia;
use Modules\Auth\Models\User;

it('renders the email verification prompt for unverified users', function (): void {
    $this->withoutVite();

    $user = User::factory()->unverified()->create();

    $this->actingAs($user)
        ->get(route('verification.notice'))
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page): AssertableInertia => $page->component('auth/verify-email', false));
});

it('verifies the email with a valid signed url', function (): void {
    Event::fake();

    $user = User::factory()->unverified()->create();

    $url = URL::temporarySignedRoute(
        'verification.verify',
        now()->addMinutes(60),
        ['id' => $user->id, 'hash' => sha1((string) $user->email)],
    );

    $this->actingAs($user)->get($url)->assertRedirect(route('home', absolute: false).'?verified=1');

    expect($user->fresh()->hasVerifiedEmail())->toBeTrue();
    Event::assertDispatched(Verified::class);
});

it('does not verify the email with an invalid hash', function (): void {
    $user = User::factory()->unverified()->create();

    $url = URL::temporarySignedRoute(
        'verification.verify',
        now()->addMinutes(60),
        ['id' => $user->id, 'hash' => sha1('wrong-email')],
    );

    $this->actingAs($user)->get($url)->assertForbidden();

    expect($user->fresh()->hasVerifiedEmail())->toBeFalse();
});
