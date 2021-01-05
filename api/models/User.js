/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "users",
  attributes: {
    fullName: {
      type: "string",
      required: true,
      columnName: "full_name",
    },
    email: {
      type: "string",
      required: true,
      unique: true,
    },
    password: {
      type: "string",
      required: true,
    },
    orders: {
      collection: "order",
      via: "owner",
    },
  },
  customToJSON: function () {
    return _.omit(this, ["password"]);
  },
  beforeCreate: async function (values, proceed) {
    const hashedPassword = await sails.helpers.passwords.hashPassword(
      values.password
    );
    values.password = hashedPassword;
    return proceed();
  },
};
