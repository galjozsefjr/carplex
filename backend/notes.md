# Notes

Start app:
`php artisan serve`

Generate models:
`php artisan make:model [MODEL] --migration`

Run migration:
`php artisan migrate`

Add test data: look for factory & seeders
URL: https://laravel.com/docs/8.x/seeding

`php artisan make:factory [MODEL_FACTORY] --model=[MODEL]`

`php artisan db:seed`

Restart all with test data:
`php artisan migrate:fresh --seed`

Generate controller:
`php artisan make:controller [CONTROLLER]`