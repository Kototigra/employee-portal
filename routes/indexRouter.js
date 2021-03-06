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

router.get('/', async (req, res) => {
  // if (!req.session.user) res.redirect('/login');

  const dep = await Department.findAll({ raw: true });
  const team = await Team.findAll({ raw: true });
  res.render('index', { dep, team });
});

router.post('/search', async (req, res) => {
  const { text, choose } = req.body;
  const input = text.trim();
  if (!choose) {
    const personsInfo = await User.findAll({ where: { last_name: input }, raw: true });
    res.json({ personsInfo });
  } else if (choose === 'Teams') {
    const team = await Team.findOne({ where: { title: input } });
    const peoples = await Team.findAll({
      where: { id: team.id },
      include: {
        model: User,
        include: {
          model: Role,
        },
      },

      raw: true,
    });
    // console.log(peoples);
    const personsInfo = peoples.map((el) => ({
      id: el['Users.id'],
      first_name: el['Users.first_name'],
      last_name: el['Users.last_name'],
      role_title: el['Users.Role.title'],
    }));
    // console.log(personsInfo);
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

router.post('/dep/:id', async (req, res) => {
  const { id } = req.params;
  const peoples = await Department.findAll({
    where: { id },
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
  res.json(personsInfo);
});

router.post('/team/:id', async (req, res) => {
  const { id } = req.params;
  const peoples = await Team.findAll({
    where: { id },
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
  res.json(personsInfo);
});

module.exports = router;
