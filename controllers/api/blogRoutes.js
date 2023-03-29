const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const session = require('express-session');
const sequelize = require('../../config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

router.post('/', withAuth, async (req, res) => {
    const body = req.body;
    try {
        const newBlog = await Blog.create({ ...body, logged_in: req.session.logged_in});
        res.json(newBlog);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deleteBlog = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            },
    });
    if (!deleteBlog) {
        res.status(404).json({ message: 'No entry found with this id'});
        return;
    }
    res.status(200).json(deleteBlog);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;