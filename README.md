# express-rest-api

This is a template for a basic RESTful API in express with standardized CRUD operations. It's a decent starting point for an extensible application backend.

## Usage

Get dependencies: `npm install`<br>
Start the server: `npm start`

The server will run at `http://localhost:3000` by default.

## Database

Data operations currently support MongoDB via `mongoose`, with more to come later.

## Services

The API has some basic services built-in for example purposes:

`POST /users/register`<br>
`POST /users/login`<br>
`GET /profiles`<br>
`POST /profiles`<br>
`GET /profiles/{profile_id}`<br>
`PATCH /profiles/{profile_id}`<br>
`DELETE /profiles/{profile_id}`<br>
`POST /calculator`

`/users` is a basic user entity, and `/profiles` is a CRUD extension of the User data model with an id reference. `/calculator` is a function call invoked synchronously via `POST` with the function arguments passed in the request body. The calculator pattern is useful for exposing API-level orchestrations and/or arbitrary functions in a standard REST format.

## Capabilities

- Query filtering
- Query sorting
- Standardized CRUD interface that can be applied to any data schema
- UUID primary keys with optional human-readable prefixes (e.g. `USER-5a57b557-6b3d-4efc-b39e-da74ba49dbc7`)
- User password encryption
- Customizable request validation powerd by `joi` for `PATCH` and `POST` operations
