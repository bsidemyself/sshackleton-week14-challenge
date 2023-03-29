const sequelize = require('../config/connection');
const userSeed = require('./user-seeds');
const blogSeed = require('./blog-seeds');
const commentSeed = require('./comment-seeds');

const allSeeds = async () => {
    await sequelize.sync({ force: true });

    await userSeed();
    await blogSeed();
    await commentSeed();

    process.exit(0);
};

allSeeds();