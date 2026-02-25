<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        /**
         * disable CSRF token validation for API calls
         * better solution would be to use JWT tokens for the communication
         * due to old PHP version (7.3) it's not worth the effort for this project - does not go to production
         */
        'api/*'
    ];
}
