/*libs*/
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

/*imports app*/
const routes = require("./src/routes");
const connection = require('./src/database/db');

/*ejs*/
app.set("view engine", "ejs");

/*rotas*/
app.use(express.json());
app.use(express.static("public")
); /*apontar os arquivos estáticos como CSS e imagens */
app.use(bodyParser.urlencoded({ extended: false })
); /* receber dados do formulario */
app.use(bodyParser.json());
app.use(routes);




 /*conexoes*/
connection
  .authenticate()
  .then(() => {
    console.log("banco de dados conectado");
  })
  .catch((erro) => {
    console.log(erro);
  });
app.listen(8080, () => console.log("server rodando na porta 8080"));
