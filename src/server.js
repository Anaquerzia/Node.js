import http from 'node:http';
//import { json } from 'node:stream/consumers';
import { json } from './middlewares/json.js'; // Corrigido hoje dia 31/03
import { Database } from './middlewares/database.js'; // Corrigido o caminho relativo



//const users =[]
const database =  new Database()


 //** Criando um servidor http ***/

const server = http.createServer(async(req, res) => {
   const{method, url }= req;
 
   await json(req, res); // Processa o JSON antes de usar req.body
 

//Metdo de listagem
if(method === 'GET' && url === '/users'){
   const users = database.select('users')
   
   return res.end(JSON.stringify(users))
   }
//Metodo de criação 
if(method ==='POST' && url === '/users'){
      //esta linha esta me dizendo que const é uma função a constante body vai receber o nome e o email do objeto
      const { name , email }  = req.body
      
      const user = {
         id: 2,
         name, 
         email
      } 
      database.insert('users', user)

      return res.writeHead(201).end()
   }
   return res.writeHead(404).end()
}) 

server.listen(3333)