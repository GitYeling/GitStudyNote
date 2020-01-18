'use strict';


const md5Sign = require('md5')
module.exports = {
  up: (queryInterface, Sequelize) => {

   return queryInterface.bulkInsert('Users', [
      {    
        username: 'admin',
        nickname:'张三',
        email:'875917582@qq.com',
        openid: "admin",
        password:md5Sign('123456'),
        createdAt: new Date(),
        updatedAt:new Date()        
      },

    ], {});   
  },

  down: (queryInterface, Sequelize) => {

   return queryInterface.bulkDelete('Users', null, {});
  }
};
