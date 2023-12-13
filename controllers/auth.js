exports.getLogin = (req, res, next) => {
  const errorMsg = req.flash("error");
  if (!errorMsg) {
    errorMsg = null;
  }
  res.render("auth/login", { title: "Login", errorMsg: errorMsg });
};

exports.getRegister = (req, res, next) => {
  const errorMsg = req.flash("error");
  if (!errorMsg) {
    errorMsg = null;
  }
  res.render("auth/register", { title: "Register", errorMsg: errorMsg });
};

exports.postLogin = async (req, res, next) => {
  try {
    const response = await fetch("http://localhost:8080/user", {
      method: "get",
      headers: {
        Authorization: req.token,
        "Content-Type": "application/json",
      },
    });

    const jsonData = await response.json();

    if (response.status === 200) {
      res.cookie("email", jsonData.email);
      return res.redirect("/");
    }

    req.flash("error", jsonData.message);
    return res.redirect("/login");
  } catch (err) {
    next(new Error(err));
  }
};

exports.postRegister = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  const data = {
    email: email,
    password: password,
    confirmPassword: confirmPassword,
  };
  try {
    const response = await fetch("http://localhost:8080/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const jsonData = await response.json();
    if (response.status === 200) {
      res.cookie("jwt", jsonData.token);
      return res.redirect("/");
    }
    req.flash("error", jsonData.message);
    return res.redirect("/register");
  } catch (err) {
    next(new Error(err));
  }
};

exports.getLogout = (req, res, next) => {
  res.clearCookie("jwt");
  res.clearCookie("email");
  return res.redirect("/");
};
