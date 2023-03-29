const { Comment } = require('../models');

const commentData = [
    {
        comment_body: "Good luck with all that!",
        user_id: 1,
        post_id: 2
    },
    {
        comment_body: "We had a pact Jerry!!",
        user_id: 2,
        post_id: 1
    },
    {
        comment_body: "You are a hipster doofus.",
        user_id: 3,
        post_id: 4
    },
    {
        comment_body: "I need my meat slicer back!",
        user_id: 4,
        post_id: 3
    }
];

const commentSeed = () => Comment.bulkCreate(commentData);

module.exports = commentSeed