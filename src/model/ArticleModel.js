const Sequelize = require("sequelize");
const connection = require("../database/db");
const CategoryModel = require('./CategoryModel.js')

/*criacao do model */
const Article = connection.define("articles", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
}); 

CategoryModel.hasMany(Article) /* one to many */
Article.belongsTo(CategoryModel) /* one to one */ 

/*mandar para o banco */
// Article.sync({ force: true }); 
module.exports = Article;
