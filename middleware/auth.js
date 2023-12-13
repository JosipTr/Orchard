module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    res.locals.isAuthenticated = false;
    res.locals.email = null;
  } else {
    res.locals.isAuthenticated = true;
    res.locals.email = req.cookies.email;
  }
  next();
};
