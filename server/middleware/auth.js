const User = require("../models/user");

let auth = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader && bearerHeader.length > 0) {
    const bearer = bearerHeader.split(" ");
    const token = bearer.length > 1 ? bearer[1] : null;
    if (token) {
      User.findByToken(token, (err, user) => {
        if (err)
          return res.json({
            error: err,
          });
        if (!user)
          return res.json({
            error: true,
          });

        req.token = token;
        req.user = user;
        next();
      });
    } else {
      next();
    }
  } else {
    next();
  }
};

module.exports = auth;
