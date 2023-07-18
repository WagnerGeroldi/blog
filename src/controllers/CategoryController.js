const CategoryModel = require("../model/CategoryModel");
const slugify = require("slugify");
const { Op } = require("sequelize");

function newCategory(req, res) {
  res.render("../views/admin/category/newCategory.ejs", {
    title: "BlogDev |  Nova Categoria",
  });
}

async function saveCategory(req, res) {
  const { name } = req.body;

  if (name != undefined) {
    await CategoryModel.create({
      title: name,
      slug: slugify(name),
    });

    res.redirect("/admin/category/list");
  } else {
  }
}

async function countCategory(req, res) {
  const quant = await CategoryModel.count({
    where: {
      id: {
        [Op.gt]: 0,
      },
    },
  });
  await CategoryModel.findAll({
    raw: true,
    order: [/*ordenação */ ["createdAt", "DESC"]],
  }).then((categorias) => {
    res.render("../views/admin/category/category.ejs", {
      title: `BlogDev | Categorias (${quant})`,
      categorias,
    });
  });
}

async function deleteCategory(req, res) {
  const { id } = req.body;

  await CategoryModel.destroy({
    where: {
      id: id,
    },
  });

  const quant = await CategoryModel.count({
    where: {
      id: {
        [Op.gt]: 0,
      },
    },
  });

  await CategoryModel.findAll({
    raw: true,
    order: [/*ordenação */ ["createdAt", "DESC"]],
  }).then((categorias) => {
    res.render("../views/admin/category/category.ejs", {
      title: `BlogDev | Categorias (${quant})`,
      categorias,
    });
  });
}

async function updateViewCategory(req, res) {
  const { id } = req.params;

  await CategoryModel.findByPk(id).then((categoria) => {
    res.render("../views/admin/category/updateCategory.ejs", {
      title: `BlogDev | Atualizar Categoria ${categoria.title}`,
      categoria,
    });
  });
}

async function updateCategory(req, res) {
  const { name, id } = req.body;
  const quant = await CategoryModel.count({
    where: {
      id: {
        [Op.gt]: 0,
      },
    },
  });

  await CategoryModel.update(
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

  await CategoryModel.findAll({
    raw: true,
    order: [/*ordenação */ ["createdAt", "DESC"]],
  }).then((categorias) => {
    res.render("../views/admin/category/category.ejs", {
      title: `BlogDev | Categorias (${quant})`,
      categorias,
    });
  });
}

module.exports = {
  newCategory,
  saveCategory,
  countCategory,
  deleteCategory,
  updateViewCategory,
  updateCategory,
};
