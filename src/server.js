const express = require("express")
const server = express()
const routes = require("./routes")
const path = require("path")

server.set('view engine', 'ejs')

//mudando a localização da pasta views
server.set('views', path.join(__dirname, 'views'))

//habilitar arquivs statics
server.use(express.static("public"))

// usar o req.body (tem que ser antes do routes)
server.use(express.urlencoded({ extended: true }))

//routes
server.use(routes)

server.listen(3000, ()=> console.log('rodando...'))