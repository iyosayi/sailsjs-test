module.exports = {
  friendlyName: "Index",

  description: "Index home.",

  inputs: {},

  exits: {
    success: {
      statusCode: 200,
      description: "Index route.",
    },
  },

  fn: async function (_, exits) {
    return exits.success({ message: "I am up and running" });
  },
};
