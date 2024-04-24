const sqliteConnection = require('../database/sqlite')
const AppError = require('../utils/AppError')

//extensoes para encriptografar senha
const {hash, compare} = require("bcryptjs")

class UsersController {
  async create(request, response) {
    //aqui estamos "pegando" as informações do corpo da requisição do usuário
    const { name, email, password } = request.body;

    //Aqui vamos fazer as validações de usuário
    //vamos checar se o email que o usuário quer cadastrar já existe:
    //mas, como tudo está na nossa base de dados, vamos puxar ela primeiro:
    const database = await sqliteConnection(); 

    //a linha de baixo vai trazer um e-mail igual ao email que o usuário digitou para cadastro, se existir, é claro
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if (checkUserExists) /*se for vdd... */ { //se tiver um email igual, então é verdadeiro
      throw new AppError("Este e-mail já esta em uso.")
    }

    //vamos agora criptografar nossa senha (mas não esquece de instalar a extensao que permite isso)
    const hashedPassword = await hash(password, 8)
    //Lembrando que os dois parâmetros são: o que quero encriptografar e grau de complexidadedade, respct.
    
    //Aqui iremos enviar as informações passadas pelo usuário para o nosso banco de dados, todas já validadas
    await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword])

    response.status(201).json()
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const { id } = request.params; 

    const database = await sqliteConnection();

    //primeiro, vamos ver se o usuário existe pra poder ser atualizado
    //vamos pegar o usuário
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id])

    if (!user) {
      throw new AppError("Este usuário não existe!")
    }

    //agora vamos fazer a atualização de email
    const userNewEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if (userNewEmail && userNewEmail.id !== user.id) {
      throw new AppError("Este e-mail já está em uso.")
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    //verificar se o usuário vai passar as duas senhas para efetuar a troca
    if (password && !old_password) {
      throw new AppError("Você precisa informar a senha antiga para cadastrar uma nova.")
    };

    //vamos verificar se a senha antiga informada pelo usuário é a mesma senha que temos na bds
    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)

      if (!checkOldPassword) {
        throw new AppError("As senhas não conferem.")
      }

      user.password = await hash(password, 8)
    }


    await database.run(`
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME ('now')
      WHERE id = ?`,
      [user.name, user.email, user.password, id]

    );

    return response.status(200).json();
  }
}

module.exports = UsersController;