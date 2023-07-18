const ArticleModel = require("../model/ArticleModel");
const CategoryModel = require("../model/CategoryModel");
const slugify = require("slugify");
const { Op } = require("sequelize");

async function articles(req, res) {

  const quant = await ArticleModel.count({
    where: {
      id: {
        [Op.gt]: 0,
      },
    },
  });

  await ArticleModel.findAll({
    include: [{model: CategoryModel}],
    order: [ ["title", "ASC"]],
  }).then((artigos) => {
    res.render("../views/admin/articles/article.ejs", {
      title: `BlogDev | Artigos (${quant})`,
      artigos,
    });
  });
}

function newArticle(req, res) {
  CategoryModel.findAll({
    raw: true,
    order: [ ["title", "ASC"]]
  }).then((categorias) => {
    res.render("../views/admin/articles/newArticle.ejs", {
      title: "BlogDev | Novo Artigo",
      categorias,
    });
  });
}

async function saveArticle(req, res) {
  const { name, category, article  } = req.body;

 
    await ArticleModel.create({
      title: name,
      slug: slugify(name),
      body: article,
      categoryId: category
    });

    res.redirect("/admin/article/list");
}

async function deleteArticle(req, res) {
  const { id } = req.body;

  await ArticleModel.destroy({
    where: {
      id: id,
    },
  });

  const quant = await ArticleModel.count({
    where: {
      id: {
        [Op.gt]: 0,
      },
    },
  });

  await ArticleModel.findAll({

    order: [ ["createdAt", "DESC"]],
  }).then((artigos) => {
    res.render("../views/admin/articles/article.ejs", {
      title: `BlogDev | Artigos (${quant})`,
      artigos,
    });
  });
}


/*
async function countCategory(req, res) {
  const quant = await ArticleModel.count({
    where: {
      id: {
        [Op.gt]: 0,
      },
    },
  });
  await ArticleModel.findAll({
    raw: true,
    order: [ ["createdAt", "DESC"]],
  }).then((categorias) => {
    res.render("../views/admin/category/category.ejs", {
      title: `BlogDev | Categorias (${quant})`,
      categorias,
    });
  });
}



async function updateViewCategory(req, res) {
  const { id } = req.params;

  await ArticleModel.findByPk(id).then((categoria) => {
    res.render("../views/admin/category/updateCategory.ejs", {
      title: `BlogDev | Atualizar Categoria ${categoria.title}`,
      categoria,
    });
  });
}

async function updateCategory(req, res) {
  const { name, id } = req.body;
  const quant = await ArticleModel.count({
    where: {
      id: {
        [Op.gt]: 0,
      },
    },
  });

  await ArticleModel.update(
    {
      title: name,
      slug: slugify(name)
    },
    {
      where: {
        id: id,
      },
    }
  );

  await ArticleModel.findAll({
    raw: true,
    order: [ ["createdAt", "DESC"]],
  }).then((categorias) => {
    res.render("../views/admin/category/category.ejs", {
      title: `BlogDev | Categorias (${quant})`,
      categorias,
    });
  });
}
*/

module.exports = {
  articles,
  newArticle,
  saveArticle,
  deleteArticle
};
