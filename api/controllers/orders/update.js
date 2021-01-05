module.exports = {
  friendlyName: "Update",

  description: "Update orders.",

  inputs: {
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
    amount: {
      type: "string",
    },
  },

  exits: {
    success: {
      statusCode: 200,
      description: "Order updated.",
    },
    error: {
      description: "Something went wrong",
    },
  },

  fn: async function (inputs, exits) {
    try {
      // ID of the order.
      const { id } = this.req.params;
      const order = await Order.updateOne({ id }).set({ ...inputs });
      return exits.success({
        message: "Order updated successfully.",
        data: order,
      });
    } catch (error) {
      return exits.error({ message: error.message });
    }
  },
};
