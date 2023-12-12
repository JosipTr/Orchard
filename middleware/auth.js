module.exports = (req, res, next) => {
    if (!req.cookies.jwt) {
      res.locals.isAuthenticated = false;
    } else {
      res.locals.isAuthenticated = true;
    }
    next();
  }