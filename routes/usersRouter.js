const { Router } = require('express');

const router = Router();

router.get('/:id', (req, res) => {
  
  res.render('profile'); // TODO: поменять на HBS ребят слева от нас
});

module.exports = router;
