/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  "GET /": "home/index",
  "POST /api/v1/users/register": "users/register",
  "POST /api/v1/users/login": "users/login",
  "GET /api/v1/orders/get": "orders/get",
  "POST /api/v1/orders/new": "orders/create",
  "PATCH /api/v1/orders/update/:id": "orders/update",
};
