const { Router } = require("express");

const router = Router();
const { User, Role, Department, Team } = require("../db/models");

router.get('/logout', (req, res) => {
  console.log('test------------------------');
  req.session.destroy();
  res.clearCookie('auth');
  res.redirect('/');
});

router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const getUserInfo = await User.findOne({ where: { id: userId } });
  const getTeamInfo = await Team.findOne({ where: { id: userId } });
  const getRoleInfo = await Role.findOne({ where: { id: userId } });
  const getDepartmentInfo = await Department.findOne({ where: { id: userId } });
  res.render("profile", { getUserInfo,getTeamInfo, getRoleInfo, getDepartmentInfo});
});

// router.post("/upload", function (req, res, next) {
   
//   let filedata = req.file;
//   console.log(filedata);
//   if(!filedata)
//       res.send("Ошибка при загрузке файла");
//   else
//       res.send("Файл загружен");
// });

router.get('/:id', (req, res) => {
  
  res.render('profile'); // TODO: поменять на HBS ребят слева от нас
});


module.exports = router;
