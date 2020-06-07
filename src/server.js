const express = require('express');
const server = express();
//pegar o banco de dados
const db = require("./database/db.js");
//configurar pasta publica
server.use(express.static("public"));
//habilitar o uso do body na aplicacao
server.use(express.urlencoded({extended: true}))
//usando template engine
const nunjuncks = require("nunjucks")
nunjuncks.configure('src/views',{
    express: server,
    noCache: true //sem cache para evitar bugs
})
//configurar caminhos da aplicação
//req: Requisicao
//res: Resposta
server.get('/',(req,res) => {
    return res.render("index.html",);
})
server.get('/create-point',(req,res) => {
    //req-query string simbolos da url & 
    
    return res.render("create-point.html");
})
server.post('/savepoint',(req,res)=>{
    //req-body: corpo do nosso formulario
    //inserir dados no banco de dados
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES(?,?,?,?,?,?,?);    
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]
    function afterInsertData(err) {
        if (err) {
            console.log(err);
            return res.send("Erro no cadastro");
        }
        console.log("cadastrado com sucesso");
        console.log(this);
        return res.render('create-point.html',{saved: true});
    }
   db.run(query, values, afterInsertData)
    console.log(req.body)
});
server.get('/search',(req,res) => {
    const search = req.query.search;
    console.log(search);
    if(search == ""){
        //pesquisa vazia
        return res.render("search-result.html",{total: 0});
    }
    //pegar os ados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`,function(err,rows){
        if(err){
            return console.log(err)
        }

        const total = rows.length;
        //mostrar a pagina html com dados do banco
         return res.render("search-result.html",{places: rows, total: total});
    })
   
})
//ligar o servidor
server.listen(3000);