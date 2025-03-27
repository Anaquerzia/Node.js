import http from 'node:http'
import { url } from 'node:inspector'

// -criar usuarios 
// -listagem de usuarios
// -Edição de usuarios
// -Remoção de usuarios

// - Requisições em http temos :
//     Metodos http
//     url
// As rotas serão a soma do metodo + a url
    
// - GET: Buscar informações do back-end
// - POST: Criar uma informação no back-end  
// - PUT: Alterar uma informação no back-end
// - PATCH: Alterar uma informação no back-end
// - DELETE: Deletar uma informação no back-end 
         //Rotas 
//GET/users = buscar usuarios
//POST/users = criar um usuario


const server = http.createServer((req, res) => {
   const{method, url }= req

   if(method === 'GET' && url === '/users'){
      return res.end('Listagem de usuarios')
   }

   if(method ==='POST' && url === '/users'){
      return res.end('Usuario criado com sucesso')
   }
   return res.end('Hello Wordl ')
}) 

server.listen(3333)