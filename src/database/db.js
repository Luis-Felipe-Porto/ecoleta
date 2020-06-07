//importar a depedencia do sqlite3

const sqlite3 = require("sqlite3").verbose()

//criar o objeto de banco de dados
const db = new sqlite3.Database("./src/database/database.db");
module.exports = db;
//usar o objeto de banco de dados para operacoes

db.serialize(() => {
    //criar uma tabela
    
    // db.run(`
    //     CREATE TABLE IF NOT EXISTS places(
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         image TEXT,
    //         name TEXT,
    //         address TEXT,
    //         address2 TEXT,
    //         state TEXT,
    //         city TEXT,
    //         items TEXT
    //     );
    // `)
    //inserir dados na tabela
   /* 
    //consultar dados da tabela
    */

    //deletar dados da tabela

    // db.run(`DELETE FROM places `,[],function(err){
    //     if(err){
    //         return console.log(err)
    //     }
    //     console.log("registro deletado com sucesso")
    // });
    // db.all(`SELECT * FROM places`,function(err,rows){
    //     if(err){
    //         return console.log(err)
    //     }
    //     console.log("Aqui estao seus registros");
    //     console.log(rows);
    // })
})
