const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');
const session = require('express-session');
const sequelize = require('../config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

router.get('/', withAuth, async (req, res) => {
    try {
        const allPosts = await Blog.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: ['id', 'title', 'blog_text', 'created_at'],
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_body', 'user_id', 'post_id', 'created_at']
                }
            ],
        });
        const post = allPosts.get({ plain: true });
        res.render('dashboard', {
            ...post, logged_in: req.session.logged_in
        });
        } catch (err) {
        res.status(500).json(err);
        }
});

router.get('/blog/:id', withAuth, async (req, res) => {
    try {
        const onePost = await Blog.findByPk(req.params.id, {
            attributes: ['id', 'title', 'blog_text', 'created_at'],
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_body', 'user_id', 'post_id', 'created_at']
                }
            ],
        });
        const post = onePost.get({ plain: true });
        res.render('single-post', {
            ...post, logged_in: req.session.logged_in
        });
        } catch (err) {
          res.status(500).json(err);
        }
});

module.exports = router;