const jwt = require("jsonwebtoken");

const authorization = (request, response, next) => {
  try {
    const jwtToken = request["headers"].authorization.split(" ")[1];
    if (!jwtToken) {
      response.status(500).json({ message: "unauthorized" });
    } else {
      const isJwt = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
      request.payload = isJwt;
      next();
    }
  } catch (err) {
    response.status(500).json({ message: err });
  }
};

module.exports = authorization;
