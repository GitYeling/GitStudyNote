'use strict';
const bcrypt = require('bcryptjs')
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    username: {
      type: Sequelize.STRING
    },
    nickname: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    openid: {
      type: Sequelize.STRING(64),
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      set(val) {
        const salt = bcrypt.genSaltSync(10) 
        const hash = bcrypt.hashSync(val, salt)
        this.setDataValue('password', hash)
      }
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};