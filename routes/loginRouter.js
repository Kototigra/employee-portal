const { Router } = require("express");

const router = Router();

const { User } = require("../db/models");

router.get("/", (req, res) => {
  const { err } = req.query;
  if (err) {
    res.render("login", {
      message: "Вы ошиблись при вводе почты или пароля, повторите попытку ",
    });
  } else {
    res.render("login");
  }
});

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const ourUser = await User.findOne({ where: { email } });

  if (ourUser?.email === email) {
  
    if (ourUser.password === password) {
      req.session.user={
        id: ourUser.id,
        name: ourUser.first_name,
        email: ourUser.email,   
      }
      res.redirect("/");
    } else {
      res.redirect("/login/?err=1");
    }
  } else {
    res.redirect("/login/?err=11");
  }
});

module.exports = router;
