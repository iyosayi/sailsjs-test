module.exports = {
  friendlyName: "Login",

  description: "Login users.",

  inputs: {
    email: {
      type: "string",
      required: true,
    },
    password: {
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      statusCode: 200,
      description: "Login successful",
    },
    notAUser: {
      statusCode: 404,
      description: "User not found",
    },
    passwordMisMatch: {
      statusCode: 401,
      description: "Passwords do not match",
    },
    operationalError: {
      statusCode: 400,
      description: "The request malfunctioned",
    },
  },

  fn: async function (inputs, exits) {
    try {
      const user = await User.findOne({ email: inputs.email });
      if (!user) {
        return exits.notAUser({
          error: "No user exists with this email address",
        });
      }
      await sails.helpers.passwords
        .checkPassword(inputs.password, user.password)
        .intercept("incorrect", (error) => {
          return exits.passwordMisMatch({ error: error.message });
        });
      const token = await sails.helpers.generateJwtToken(user.email);
      this.req.me = user;
      return exits.success({
        message: `User logged in successfully`,
        data: user,
        token,
      });
    } catch (error) {
      sails.log.error(error);
      if (error.isOperational) {
        return exits.operationalError({
          message: `Error logging in user ${inputs.email}`,
          error: error.raw,
        });
      }
      return exits.error({
        message: `Error logging in user ${inputs.email}`,
        error: error.message,
      });
    }
  },
};
