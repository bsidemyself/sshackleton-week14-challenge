const { User } = require('../models');

const userData = [
    {
        username: "Jerry",
        email: "jseinfeld@mail.com",
        password: "superman91"
    },
    {
        username: "George",
        email: "gcostanza@mail.com",
        password: "bosco7"
    },
    {
        username: "Elaine",
        email: "ebenes@mail.com",
        password: "dingobaby6"
    },
    {
        username: "Cosmo",
        email: "ckramer@mail.com",
        password: "giddyup1"
    }
];

const userSeed = () => User.bulkCreate(userData);

module.exports = userSeed