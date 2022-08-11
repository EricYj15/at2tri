//carregar o modulo express
const { urlencoded } = require('express')
const express = require('express')

//carregar o modulo do mogoose
const mongoose = require('mongoose')

//conectar com  o banco de dados revisao
const conexao = ()=>{
    mongoose.connect('mongodb+srv://userRevisao:15102005@fiaptecnico.eftcw.mongodb.net/revisao')
}

//coneectar com a collection infos
const modelo = new mongoose.Schema({
    produto:String,
    validade:String,
}) 
const infos = mongoose.model('infos',modelo)

//executar o modulo express
const app = express()

//definir o local padrao para os arquivos ejs 
app.set('views','./')

//renderizar o arquivo index.ejs na requisiçao / (root)
app.get('/',async(req,res)=>{
    //conectar com o revisao 
    conexao()
    //buscar todos os dados de infos
    const resultado = await infos.find()
    res.render('index.ejs',{resultado})
})

//gravar dados
// app.use(urlencoded({extended:false}))
app.use(urlencoded({extended:false}))
app.post('/',async(req,res)=>{
    const dados = req.body
    //res.send(dados)
    const gravar = new infos ({
        produto:dados.produto,
        validade:dados.validade
    }).save()
    res.redirect('/')
})

const porta = process.env.PORT || 9902
//ligar o servidor na porta 9902
app.listen(porta,()=>{
    console.log('servidor local em http://localhost:9902')
})