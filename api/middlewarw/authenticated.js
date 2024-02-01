const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  formHandler: function cookieJwtAuth(req, res, next) {
    const token = req.cookies.token;
    console.log(token);
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.MY_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      console.log("Sve je kako treba");
      console.log(token);
      next();
    });
  },
};
