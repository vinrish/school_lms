<?php

declare(strict_types=1);

use Laravel\Passport\ClientRepository;
use Laravel\Passport\Passport;
use Modules\Auth\Models\User;

beforeEach(function (): void {
    $clientRepository = new ClientRepository();
    $clientRepository->createPersonalAccessGrantClient('Test Personal Access Client', 'users');
});

it('issues a passport token for valid credentials', function (): void {
    $user = User::factory()->create();

    $this->postJson(route('api.login'), [
        'email' => $user->email,
        'password' => 'password',
        'device_name' => 'pixel-8',
    ])
        ->assertOk()
        ->assertJsonStructure(['token']);

    expect($user->tokens()->count())->toBe(1);
});

it('rejects a token request with invalid credentials', function (): void {
    $user = User::factory()->create();

    $this->postJson(route('api.login'), [
        'email' => $user->email,
        'password' => 'wrong-password',
        'device_name' => 'pixel-8',
    ])->assertStatus(422);

    expect($user->tokens()->count())->toBe(0);
});

it('authenticates an api request with a passport token', function (): void {
    $user = User::factory()->create();
    $token = $user->createToken('pixel-8')->accessToken;

    $this->getJson(route('api.user'), ['Authorization' => 'Bearer '.$token])
        ->assertOk()
        ->assertJsonPath('email', $user->email);
});

it('rejects a revoked passport token', function (): void {
    $user = User::factory()->create();
    $tokenResult = $user->createToken('pixel-8');
    $tokenResult->getToken()?->revoke();

    $this->getJson(route('api.user'), ['Authorization' => 'Bearer '.$tokenResult->accessToken])
        ->assertUnauthorized();
});

it('authorizes third-party access through the passport api guard', function (): void {
    $user = User::factory()->create();

    Passport::actingAs($user);

    $this->getJson(route('api.profile'))
        ->assertOk()
        ->assertJsonPath('email', $user->email);
});
