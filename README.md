# express-rest-api

This is a template for a basic RESTful API in express with standardized CRUD operations. It's a good starting point for an application backend.

## Usage

Get dependencies: `npm install`<br>
Start the server: `npm start`

The server will run at `http://localhost:3000` by default.

## Database

Data operations currently support MongoDB via `mongoose`, with more to come later.

## Services

The API has some basic services built-in for example purposes:

`GET /users`<br>
`POST /users`<br>
`GET /users/{user_id}`<br>
`PATCH /users/{user_id}`<br>
`DELETE /users/{user_id}`<br>
`GET /profiles`<br>
`POST /profiles`<br>
`GET /profiles/{profile_id}`<br>
`PATCH /profiles/{profile_id}`<br>
`DELETE /profiles/{profile_id}`<br>
`POST /calculator`

`/users` is a basic user entity, and `/profiles` is an extension of the User data model with an id reference. `/calculator` is a function call invoked synchronously via `POST` with the function arguments passed in the request body. The calculator pattern is useful for arbitrarily exposing functions in a standard REST format.

## Capabilities

- Query filtering
- Query sorting
- Standardized CRUD interface that can be applied to any data model
- UUID primary keys with optional human-readable prefixes (e.g. `USER-5a57b557-6b3d-4efc-b39e-da74ba49dbc7`)
- User password encryption
- Customizable entity validation powerd by `joi` for `PATCH` and `POST` operations
