const { Router } = require('express');
const {
  User, Team, Role, Relation, Department,
} = require('../db/models');

const router = Router();
const voc = {
  Teams: Team,
  Departments: Department,
  Roles: Role,
};

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index');
});

router.post('/search', async (req, res) => {
  // console.log(req.body);
  const { text, choose } = req.body;
  const input = text.trim();
  if (!choose) {
    const personsInfo = await User.findAll({ where: { last_name: input }, raw: true });
    console.log({ personsInfo });
    res.json({ personsInfo });
  } else {
    const modelName = voc[choose];
    const peoples = await modelName.findAll({
      where: { title: input },
      attributes: {
        exclude: ['id', 'title', 'createdAt', 'updatedAt'],
      },
      include: {
        model: User,
        attributes: ['id', 'first_name', 'last_name'],
      },
      raw: true,
    });
    const personsInfo = peoples.map((el) => ({ id: el['Users.id'], first_name: el['Users.first_name'], last_name: el['Users.last_name'] }));
    res.json({ personsInfo });
  }
});

module.exports = router;