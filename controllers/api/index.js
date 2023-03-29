
const router = require('express').Router();
const user_routes = require('./userRoutes');
const blog_routes = require('./blogRoutes');
const comment_routes = require('./commentRoutes');

router.use('/users', user_routes);
router.use('/blogs', blog_routes);
router.use('/comments', comment_routes);

module.exports = router;