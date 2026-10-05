<?php

declare(strict_types=1);

namespace Modules\Auth\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Modules\Auth\Models\User;
use Modules\Roles\Enums\RoleName;

/**
 * @extends Factory<User>
 */
final class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<User>
     */
    protected $model = User::class;

    /**
     * The current password being used by the factory.
     */
    private static ?string $password = null;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => self::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes): array => [
            'email_verified_at' => null,
        ]);
    }

    /**
     * Indicate that the user has the admin role.
     */
    public function admin(): static
    {
        return $this->afterCreating(function (User $user): void {
            $user->assignRole(RoleName::Admin->value);
        });
    }

    /**
     * Indicate that the user has the teacher role.
     */
    public function teacher(): static
    {
        return $this->afterCreating(function (User $user): void {
            $user->assignRole(RoleName::Teacher->value);
        });
    }

    /**
     * Indicate that the user has the student role.
     */
    public function student(): static
    {
        return $this->afterCreating(function (User $user): void {
            $user->assignRole(RoleName::Student->value);
        });
    }

    /**
     * Indicate that the user has the parent role.
     */
    public function parent(): static
    {
        return $this->afterCreating(function (User $user): void {
            $user->assignRole(RoleName::Parent->value);
        });
    }
}
