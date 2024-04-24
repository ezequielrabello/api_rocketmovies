/* Vimos que podemos criar o nosso usuário utilizando o Beekeeper
Mas não seria produtivo fazer aquilo toda vez. Por isso temos as Migrations
Vamos criar um código agora que será utilizado toda vez que o usuário solicitar cadastro */
const createUsers = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR,
    email VARCHAR,
    password VARCHAR,
    avatar VARCHAR NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`;

module.exports = createUsers;