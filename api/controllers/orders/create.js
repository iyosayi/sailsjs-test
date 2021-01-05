module.exports = {
  friendlyName: "Create",

  description: "Create orders.",

  inputs: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    amount: {
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      statusCode: 201,
      description: "New user created",
    },
    error: {
      description: "Something went wrong",
    },
  },

  fn: async function (inputs, exits) {
    try {
      const { ...orderInfo } = inputs;
      // ID of the current loggedIn user gotten from the JWT
      const { id } = this.req.me;
      const order = await Order.create({ owner: id, ...orderInfo }).fetch();
      return exits.success({
        message: "Order created successfully.",
        data: order,
      });
    } catch (error) {
      sails.log.error(error);
      return exits.error({
        message: "An error occurred",
        error: error.message,
      });
    }
  },
};
