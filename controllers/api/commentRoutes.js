const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const session = require('express-session');
const sequelize = require('../../config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

router.get('/', withAuth, async (req, res) => {
    try {
        const allComments = await Comment.findAll({
            include: [User],
        });
        const comments = allComments.map((comment) => comment.get({ plain: true }));
        res.render('single-post', {comments, logged_in: req.session.logged_in});
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    const body = req.body;
    try {
        const addComment = await Comment.create({
            ...body, logged_in: req.session.logged_in
        });
        res.json(addComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router