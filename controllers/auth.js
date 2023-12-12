exports.getLogin = (req, res, next) => {
  console.log(req.cookies.jwt);
  res.render("auth/login", { title: "Login" });
};

exports.getRegister = (req, res, next) => {
  res.render("auth/register", { title: "Register" });
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

    if (response.status === 200) {
      const jsonData = await response.json();
      res.cookie("jwt", jsonData.token);
      return res.redirect("/");
    }
    res.redirect("/bla");
  } catch (err) {
    next(new Error(err));
  }
};
