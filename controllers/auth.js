exports.getLogin = (req, res, next) => {
  res.render("auth/login", { title: "Login"});
};

exports.getRegister = (req, res, next) => {
  res.render("auth/register", { title: "Register"});
};
