exports.checkAuthentication = (req, res, next) => {
  if (!req.cookies.jwt) {
    res.locals.isAuthenticated = false;
    res.locals.email = null;
    res.locals.cart = null;
  } else {
    res.locals.isAuthenticated = true;
    res.locals.email = req.cookies.email;
    res.locals.cart = JSON.parse(req.cookies.cart);
  }
  next();
};

exports.checkAuthorization = (req, res, next) => {
  if (!req.cookies.jwt) {
    res.redirect("/login");
  }
  next();
};
