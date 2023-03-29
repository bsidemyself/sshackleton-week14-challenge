const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const session = require('express-session');
const sequelize = require('../../config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

router.post('/', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password
        });
        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.username = newUser.username;
            req.session.logged_in = true;
            res.json(newUser);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const user = await User.findOne({
            where: { username: req.body.username},
        });
        if (!user) {
            res.status(400).json({ message: 'User not found' });
            return;
        }
        const validPassword = user.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'User not found' });
            return;
        }

        req.session.user_id = user.id;
        req.session.username = user.username;
        req.session.logged_in = true;
        res.json({ user, message: 'You are logged in' });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

module.exports = router;