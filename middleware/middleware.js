const userChecker = (req, res, next) => {
  res.locals.username = req.session?.login;
  next();
};

module.exports = { userChecker };
