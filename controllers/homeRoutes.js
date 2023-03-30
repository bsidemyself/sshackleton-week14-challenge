const router = require('express').Router();
const { User, Blog, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
        const allPosts = await Blog.findAll({
            include: [
                {
                model: User,
                attributes: ['username'],
                },
            ],
        });
        console.log(allPosts, 'line 14')
        const posts = allPosts.map((blog) => blog.get({ plain: true })); 
        console.log(posts, 'line 16')
        //error must be line 18
        res.render('homepage', {
            ...posts
        });
        } catch (err) {
        res.status(500).json(err);
        }
});


router.get('/blog/:id', async (req, res) => {
    try {
        const onePost = await Blog.findByPk(req.params.id, {
            include: [
                {
                model: User,
                attributes: ['username'],
                },
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

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router;