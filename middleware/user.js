module.exports = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
  
    const data = {
      email: email,
      password: password,
    };
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const jsonData = await response.json();
  
      if (response.status === 200) {
        res.cookie("jwt", jsonData.token);
        req.token = jsonData.token;
        return next();
      }
      
      req.flash("error", jsonData.message);
      return res.redirect("/login");
    } catch (err) {
      next(new Error(err));
    }
  };