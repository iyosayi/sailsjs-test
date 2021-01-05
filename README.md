# backend-test

### How it works.

1. For a user to create order, he/she must be registered first. The required \
   parameters to register are `fullName, email, password (not less than 6 characters)`. \
   The registration route is `/api/v1/users/register` and the method is `POST`.

2. There is also a login route, which can also generate tokens, it's accessible through the route \
   `/api/v1/users/login` and the method is a `POST` method. The required form values are `email` and `password`.

3. To create an order, the required form values are `title, description, amount` and it's accessible \
   through this route `/api/v1/orders/new`, and the method is a `POST` method \
   This route is only accessible if a token is provided. A `x-auth-token` header must be \
   attached to the request, as the `id` of the current user is pulled off the token.

4. To view orders, a `x-auth-token` with the token value also sent in the header must be attached to the request. \
   This route is accessible through `/api/v1/orders/get`. The method is `GET`. Also, you can't view other people's
   orders, just a little authorization check.

5. To update an order, a `x-auth-token` with the token value also sent in the header must be attached to the request. \
   This route is accessible through `/api/v1/orders/update`. The form values are `title, description, amount`. The method is `PATCH`
