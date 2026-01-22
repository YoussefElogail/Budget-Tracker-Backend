const jwt = require("jsonwebtoken");

const jwtGenerator = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

module.exports = jwtGenerator;
