/* de novo aqui eu chamei o Router do express
e criei o usersRouter pra representar ele */
const {Router} = require("express");
const tagsRouter = Router();

//Aqui vamos importar o controller que criamos e depois chamar uma instancia do userscontroller
const TagsController = require("../Controllers/TagsController")
const tagsController = new TagsController();

//Utilizando o método post, estou dizendo qual rota seguir e o que eu vou
//achar seguindo ela. O controller é que vai nos dar um caminho pra quem diz o que vai ser achado.
//Repare que coloquei somente uma barra pq "/users" ja foi especificado no index
tagsRouter.get("/:user_id", tagsController.index)


module.exports = tagsRouter;
