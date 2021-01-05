const jwt = require("jsonwebtoken");

module.exports = {
  friendlyName: "JWT Auth",

  description: "Provides authorization tokens",

  inputs: {
    subject: {
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      description: "Token generated successfully.",
    },
  },

  fn: async function (inputs) {
    const payload = {
      sub: inputs.subject,
      iss: sails.config.jwtIssuer || process.env.JWT_ISSUER,
    };
    const secret = sails.config.jwtSecret || process.env.JWT_SECRET;
    const token = jwt.sign(payload, secret, { expiresIn: "1d" });
    return token;
  },
};
