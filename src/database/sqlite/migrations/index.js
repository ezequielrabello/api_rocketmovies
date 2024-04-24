//temos que importar nosso createUsers e tambem o nosso sqliteConnection
const createUsers = require("./createUser")
const sqliteConnection = require("../../sqlite")


//A intenção desse arquivo é poder rodar as migrations, entao criamos a função...
async function migrationsRun() {
    //aqui dentro a ideia é criar uma variável que receba a tabela createUsers
    const schemas = [
        createUsers
      ].join('')
    //esse aqui é o cara que vai criar o meu banco de dados. Vai dar uma olhada de novo na função.
    sqliteConnection()
    .then(db => db.exec(schemas))
    .catch(error => console.error(error))
}

module.exports = migrationsRun;
