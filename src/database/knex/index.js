//importando a configuração
const config = require("../../../knexfile")
//imporatndo o knex do propio knex
const knex = require("knex")

const connection = knex(config.development)

module.exports = connection;