const Sequelize = require('sequelize');
const path = require('path')
const User = require('./user')
const Comment = require('./comment')
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname,'/../config/config'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);



db.sequelize = sequelize;

db.User = User;
db.Comment = Comment;

User.init(sequelize);
Comment.init(sequelize);

User.associate(db);
Comment.associate(db);

module.exports = db;
