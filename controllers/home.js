exports.getHome = (req, res, next) => {
  return res.render("home/home", { title: "Orchard"});
};

exports.getAbout = (req, res, next) => {
  return res.render("home/about", { title: "About" });
};
