Here’s the updated README file with the tech stack information included:

---

# Backend Service

This is the backend service for our application, built using NX and Node.js.

## Tech Stack

The following technologies are used in this monorepo:

- **React**
- **NestJS**
- **TypeORM**
- **Redis**
- **MySQL**

## Prerequisites

Before you start, make sure you have the following installed on your machine:

1. **Node.js**: Make sure you have Node.js installed (v14 or later recommended). You can download it from [nodejs.org](https://nodejs.org/).
2. **MySQL**: Ensure you have a running MySQL instance. You can download it from [mysql.com](https://www.mysql.com/) and set it up locally or use a remote instance.
3. **Redis**: Make sure Redis is installed and running on your machine or available via a remote connection. Check out [redis.io](https://redis.io/download) for installation instructions.
4. **Email Credentials**: Set up email credentials for your application to handle outgoing email services.

## Environment Configuration

Create a `.env` file in the root of your project and add the following environment variables:

```env
NODE_ENV=dev

# Database
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=itplus
DB_USERNAME=root
DB_PASSWORD=password

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Mail
MAIL_SERVICE=gmail
MAIL_PROTOCOL=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=mahmoodsami097@gmail.com
MAIL_PASSWORD=nfcfopjrdbrywhfe
MAIL_FROM_NAME=IT-Plus
MAIL_FROM_ADDRESS=mahmoodsami097@gmail.com
```

Make sure to replace sensitive information like passwords and API keys before using this in a production environment.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Daniel-Kasem48/test.git
   ```

2. Install the dependencies:
   ```bash
   yarn install
   ```

## Database Migrations

Ensure that your database is up to date with the latest migrations:
```bash
yarn migration:run
```

## Running the Backend Development Server

You can run the backend server in development mode using the following command:


```bash
npx nx run backend:serve
```

## Running the Frontend Development Server

To run the frontend application in development mode, use the following command:

```bash
npx nx run frontend:serve
```

This will start the frontend server on the specified port, typically defined in your environment variables or configuration files.

## API Documentation

The Swagger documentation for the backend API can be accessed at:

```
{{backendUrl}}/api-docs

example http://localhost:3000/api-docs
```

## License

This project is licensed under the MIT License.

---
