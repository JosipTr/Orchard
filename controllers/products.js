exports.getProducts = (req, res, next) => {
  // const response = await fetch("http://localhost:8080/products", {
  //   method: "GET",
  //   headers: { Authorization: req.cookies.jwt },
  // });

  // if (response.status === 200) {
  //   const jsonData = await response.json();
  //   console.log(jsonData);
  //   return res.render("products/products", { title: "Orchard" });
  // }
  // return res.redirect("/")
  return res.render("home/products", { title: "Orchard" });
  //   return res.render("home/home", { title: "Orchard" });
};

exports.getAddProduct = (req, res, next) => {
  res.render("home/add-product", { title: "Add product" });
};

exports.postAddProduct = async (req, res, next) => {
  const name = req.body.name;
  const imageUrl = req.body.imageUrl;

  const data = JSON.stringify({ name: name, imageUrl: imageUrl });
  try {
    const response = await fetch("http://localhost:8080/add-product", {
      method: "post",
      headers: {
        Authorization: req.cookies.jwt,
        "Content-Type": "application/json",
      },
      body: data,
    });
    const jsonData = response.json();
    if (response === 201) {
      console.log(jsonData);
      return res.redirect("/products");
    }
    return res.redirect("/");
  } catch (err) {
    next(new Error(err));
  }
};
