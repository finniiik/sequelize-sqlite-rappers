const { Sequelize } = require('sequelize');
const path = require('path');

// Экземпляр Sequelize с диалектом SQLite и файлом хранилища
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'database.sqlite'),
  logging: false,
});

module.exports = sequelize;
