const ArticleModel = require("../model/ArticleModel");


async function homePage(req, res) {


  await ArticleModel.findAll({
    order: [["createdAt", "DESC"]],
  }).then((artigos) => {
    res.render("../views/index", {
      title: "BlogDev | Início",
      artigos,
    });
  });
}

async function articleView(req, res) {
  const { id } = req.params
  await ArticleModel.findOne({
    where: {
      id: id
    }
  }).then((artigo) => {
    res.render("../views/article/article.ejs", {
      title: `BlogDev | Artigo: ${artigo.title}`,
      artigo,
    });
  });
}



module.exports = {
  homePage,
  articleView
};
