# CarPlex Drive-in Cinema

## Running in docker
Run the following command:
```sh
docker-compose up --build
```
This will automatically install all necessary dependencies and creates 4 subtasks:
- db: MariaDB instance for database
- laravel: backend
- next_app: frontend
- nginx: proxy entry point

To have a proper test data run the following command after every subtask started:
```sh
docker exec -it laravel php artisan migrate:fresh --seed
```

The application will be available on your local machine using [http://localhost:8080/](http://localhost:8080/)

## Development setup

### Prerequisites
You need the following items installed on your machine:
- NodeJS 24+
- Yarn
- Composer
- PHP version 7.3+
- MariaDB / MySQL database

### Backend setup:
Run command from `./backend` directory:
```sh
composer install
```

This will install all necessary dependencies for the backend.

Create a `.env` file in the directory based on the `.env.example`. Please update the DB_* variables properly depending on your database setup.

To initialize database with seed data:
```sh
php artisan migrate:fresh --seed
```

To start backend in development mode run:
```sh
php artisan serve
```

This will automically starts the backend services on your localhost at port 8000

### Frontend
Run command from `./frontend` directory:
```sh
yarn install
```

Create a `.env` file in the directroy based on the `.env.example`.\
If you started the backend on a different location, please update the API_URL accordingly

Run the application in development mode:
```sh
yarn dev
```

Run the application in service mode:
```sh
yarn build
yarn start
```

Both command will start the NextJS application, the development mode follows the changes you apply automatically (watches code changes).\
The frontend will be available on [http://localhost:3000](http://localhost:3000)

To login the application use the following credentials (after running db seeding on the backend):
- username: admin@carplex.local
- password: password123
This will let you add, update or delete movies and screenings.

## Known security issues
- The Laravel's CSRF token is disabled. Future changes could fix this or replace this with a JWT token. Current PHP version does not properly ready for this (update to 8.* would be necessary)
- Authentication token is saved in the localstorage - a http only cookie would be better to resolve this risk
- Add / modify movie currently only checks if the URL is a valid link passed to poster path, but not checks if it's a real image or something else. Clearly an attack point for XSS.
