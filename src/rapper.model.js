const { DataTypes } = require('sequelize');
const sequelize = require('./db');

// Модель «Рэперы» (таблица rappers)
const Rapper = sequelize.define('Rapper', {
  stageName: {            // сценический псевдоним
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { notEmpty: true },
  },
  realName: {             // настоящее имя
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthYear: {            // год рождения
    type: DataTypes.INTEGER,
    validate: { min: 1950, max: 2015 },
  },
  monthlyListeners: {     // слушателей в месяц, млн
    type: DataTypes.FLOAT,
    defaultValue: 0,
    validate: { min: 0 },
  },
  isActive: {             // продолжает выпускать музыку
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'rappers',
});

module.exports = Rapper;
