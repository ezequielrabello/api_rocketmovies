//como nossa base de dados vai ser sqlite...
const sqlite = require("sqlite")
const sqlite3 = require("sqlite3")
//tambem vou chamar o path que vai direcionar a rota a ser seguida em qq sistema operacional
const path = require("path")

//agora vamos criar uma funcao que vai inicializar a nossa base de dados
 async function sqliteConnection() {
    //vamos criar uma variável chamada database, dizendo para aguardar o sqlite abrir 
    const database = await sqlite.open({
        filename: path.resolve(__dirname, "..", "database.db"),
        driver: sqlite3.Database
    });

    return database
 }

 module.exports = sqliteConnection;