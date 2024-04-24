const knex = require("../database/knex")

class NotesController {
    async create(request, response) {
        const { title, description, tags, rating} = request.body;
        const {user_id} = request.params;

        //toda nota quando criada tem um id
        //vamos criar uma constante que vai receber esse id
        const [note_id] = await knex("notes").insert({
             //Vou passar aqui tudo o que vai está relacionado com a nota
            title,
            description,
            user_id,
            rating
        });

        //estamos fazendo isso pq, no futuro, vamos querer saber mais sobre essa tag,
        //por exemplo, sobre qual filme essa tag está se referindo. Estamos atribuindo a nota a uma tag

        const tagsInsert = tags.map(name => {
            return {
                note_id,
                name, 
                user_id
            }
        })
        //acima criamos uma variável que nos diz sobre qual filme é a tag,
        //qual o nome da tag,
        //e qual usuário fez essa tag.

        await knex("tags").insert(tagsInsert);

        response.json();

    }

    async show(request, response) {
        const { id } = request.params;

        const note = await knex("notes").where({id}).first();
        const tags = await knex("tags").where({note_id: id}).orderBy("name");
        

        return response.json({
            ...note,
            tags
        });
    }

    async delete(request, response) {
        const {id} = request.params;

        await knex("notes").where({id}).delete();

        return response.json();
    }

    async index(request, response) {
        const { title, user_id, tags } = request.query;
    
        let notes
    
        if (tags) {
          const filterTags = tags.split(',').map(tag => tag.trim())
    
          notes = await knex("tags")
            .select([
              "notes.id",
              "notes.title",
              "notes.user_id",
            ])
            .where("notes.user_id", user_id)
            .whereLike("notes.title", `%${title}%`)
            .whereIn("name", filterTags)
            .innerJoin("notes", "notes.id", "tags.note_id")
            .orderBy("notes.title")
            
        } else {
          notes = await knex("notes")
          .where({ user_id })
          .whereLike("title", `%${title}%`)
          .orderBy("title")
        }
    
        const userTags = await knex("tags").where({ user_id })
        const notesWhithTags = notes.map(note => {
          const noteTags = userTags.filter(tag => tag.note_id === note.id)
    
          return {
            ...note,
            tags: noteTags
          }
        })
    
        return response.json(notesWhithTags)
      }
}

module.exports = NotesController;