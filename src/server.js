import http from 'node:http'
import { json } from './middlewares/json'
import { Database } from './database'

//const users =[]
 const database = new Database()

 //** Criando um servidor http ***/

const server = http.createServer(async(req, res) => {
   const{method, url }= req
 
   await json(req, res)
 

//Metdo de listagem
if(method === 'GET' && url === '/users'){
   const users = database.select('users')
         return res.end(JSON.stringify(users))
   }
//Metodo de criação 
if(method ==='POST' && url === '/users'){
      //esta linha esta me dizendo que const é uma função a constante body vai receber o nome e o email do objeto
      const { name, email} = req.body
      
      const user = {
         id:1,
         name, 
         email, 
      }
      database.insert('users', user)

      return res.writeHead(201).end()
   }
   return res.writeHead(404).end()
}) 

server.listen(3333)