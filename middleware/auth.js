module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    res.locals.isAuthenticated = false;
    res.locals.email = null;
    res.locals.cart = null;
  } else {
    res.locals.isAuthenticated = true;
    res.locals.email = req.cookies.email;
    res.locals.cart = req.cookies.cart;
    console.log(res.locals.cart)
  }
  next();
};
