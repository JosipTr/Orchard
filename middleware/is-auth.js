module.exports = (req, res, next) => {
    if (!req.cookies.jwt) {
        res.redirect("/login");
    }
    next();
}