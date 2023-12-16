module.exports = async (req, res, next) => {
  if (!req.body.cart) {
    try {
      const response = await fetch("http://localhost:8080/cart", {
        method: "get",
        headers: {
          Authorization: req.token,
          "Content-Type": "application/json",
        },
      });

      const jsonData = await response.json();

      if (response.status === 200) {
        const cart = JSON.stringify(jsonData.cart)
        res.cookie("cart", cart);
        return next();
      }

      req.flash("error", jsonData.message);
      return res.redirect("/login");
    } catch (err) {
      next(new Error(err));
    }
    next();
  }
  const cart = req.body.cart;

  try {
    const response = await fetch("http://localhost:8080/cart-add", {
      method: "post",
      headers: {
        Authorization: req.token,
        "Content-Type": "application/json",
      },
      body: cart,
    });

    const jsonData = await response.json();

    if (response.status === 200) {
      return next();
    }

    req.flash("error", jsonData.message);
    return res.redirect("/login");
  } catch (err) {
    next(new Error(err));
  }
};