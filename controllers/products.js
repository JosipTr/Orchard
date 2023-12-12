exports.getProducts =  (req, res, next) => {
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
