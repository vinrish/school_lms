<?php

declare(strict_types=1);

test('returns a successful response', function (): void {
    $this->withoutVite();

    $response = $this->get(route('home'));

    $response->assertOk();
});
