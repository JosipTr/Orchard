exports.getHome = (req, res, next) => {
  return res.render("home/home", { title: "BlogMerge"});
};
