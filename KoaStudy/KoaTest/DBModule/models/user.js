'use strict';
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    username: {
      type: DataTypes.STRING
    },
    nickname: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING(64),
      unique: true
    },
    openid: {
      type: DataTypes.STRING(64),
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      set(val) {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(val, salt)
        this.setDataValue('password', hash)
      }
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }

  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};