const router = require('express').Router();
const {Movie} = require('../models');
const Auth = require('../utils/auth');
router.get('/', Auth, async (req, res) => {
  try {
    const movieData = await Movie.findAll();
    const Movie = movieData.map((Movie) => Movie.get({ plain: true }));
    //DO THE ABOVE FOR YOUR GAME DATA OR USER DATA IN ORDER TO SHOW WITH HANDLEBARS

    res.render('homepage'
     , {movies: movies}
);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', Auth, async (req, res) => {
  try {
    res.render('login'
);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;