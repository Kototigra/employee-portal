const userChecker = (req, res, next) => {
  if(req.session.name) {
    res.locals.name = req.session.name;
    
    return next();
  }
  return res.render('login')
}

module.exports = { userChecker }
