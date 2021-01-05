module.exports = {
  friendlyName: "Add new user.",

  description: "This action handles users registration.",

  inputs: {
    fullName: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
      unique: true,
      isEmail: true,
    },
    password: {
      type: "string",
      required: true,
      minLength: 6,
    },
  },

  exits: {
    success: {
      statusCode: 201,
      description: "New user created",
    },
    emailAlreadyInUse: {
      statusCode: 409,
      description: "Email address already in use.",
    },
    error: {
      description: "Something went wrong",
    },
  },

  fn: async function (inputs, exits) {
    try {
      const { email, ...info } = inputs;
      const emailAddress = email.toLowerCase();
      let user = await User.create({
        email: emailAddress,
        ...info,
      }).fetch();
      const token = await sails.helpers.generateJwtToken(user.email);
      this.req.me = user;
      return exits.success({
        message: `User created successfully`,
        data: user,
        token,
      });
    } catch (error) {
      sails.log.error(error);
      if (error.code === "E_UNIQUE") {
        return exits.emailAlreadyInUse({
          message: "UniqueConstraintError",
          error: "This email address already exists.",
        });
      }
      return exits.error({
        message: "An error occurred",
        error: error.message,
      });
    }
  },
};
