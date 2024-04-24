//aqui eu estou chamando o Router do express, e o routes pra representar ele.
//só pra lembrar, o Router é o cara que tem a estrutura e as "manha" para rotear as páginas.
const { Router } = require("express")
const routes = Router();

//aqui eu vou importar as rotas que eu criar dentro dessa pasta routes
const usersRouter = require("./users.routes")
const notesRouter = require("./notes.routes")
const tagsRouter = require("./tags.routes")



//aqui eu vou pedir pro routes (que tá representando o Router), pra inicializar o roteamento 
//passando pra ele a rota pro navegador, e depois, o que ele vai achar nessa rota. 
routes.use("/users", usersRouter)
routes.use("/notes", notesRouter)
routes.use("/tags", tagsRouter)

module.exports = routes;