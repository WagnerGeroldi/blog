const Sequelize = require('sequelize')
const connection = require('../database/db')


/*criacao do model */
const Category = connection.define("categories", {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    slug: {
      type: Sequelize.STRING,   
    },
  
  });
  
  
  /*mandar para o banco */
  // Category.sync({ force: true });
  
  
  module.exports = Category;