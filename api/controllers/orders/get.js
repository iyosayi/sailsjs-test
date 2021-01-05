module.exports = {
  friendlyName: "Get",

  description: "Get orders.",

  inputs: {},

  exits: {
    success: {
      statusCode: 201,
      description: "New user created",
    },
    error: {
      description: "Something went wrong",
    },
  },

  fn: async function (_, exits) {
    try {
      const foundOrders = await Order.find().populate("owner");
      const { id } = this.req.me;
      const foundUser = await User.findOne({ id }).populate("orders");
      if (!foundUser) {
        return res.status(404).json({ error: "No user with this id exists." });
      }

      const myOrders = foundOrders.some((order) => order.owner.id === id);
      if (!myOrders) {
        return exits.error({
          message: "You cannot view another person's order.",
        });
      }
      const filteredOrders = foundOrders.filter(
        (order) => order.owner.id === id
      );
      if (filteredOrders.length === 0) {
        return exits.error({
          message: "You do not have any orders",
        });
      }
      return exits.success({
        message: "Found orders",
        data: filteredOrders,
      });
    } catch (error) {
      return exits.error({ message: error.message });
    }
  },
};
