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


//aplicação stateful != aplicação stateless
// stateful = os dados são armazenados localmente, se para de funcionar perde tudo 
//stateless = não tem memoria porque salva em dispositivos externos, se para de funcionar os dados se materão salvos.


//** convertendo arry em strings ***/
//JSON = JavaScript Object Notation
//JSON é um formato de dados que é legivel por humanos e facil de ser lido e escrito por maquinas
// Vamos usar o Json para converter array em string e vice versa 
// JSON.stringify() = converte um objeto ou valor em uma string JSON
// JSON.parse() = converte uma string JSON em um objeto ou valor JavaScript


//** Criando um servidor http ***/

const users =[]

const server = http.createServer(async(req, res) => {
   const{method, url }= req

   const buffers = []
    
   for await(const chunk of req){
        buffers.push(chunk)
    
    }

    //Nesta parte estamos usando o JSON.parse para converter a string em um objeto, 
    // e por isso consigo acesar o body.nome e body.email que vão me retornar somente o nome ou o email do objeto, 
    // criado la no insimonio


   try{
      req.body =JSON.parse(Buffer.concat(buffers).toString())
   }catch{
      req.body = null
   }
   
   //se der somente console.log(body) ele vai me retornar o objeto inteiro , todos os campos do objeto 
   //console.log(body)


//Metdo de listagem
if(method === 'GET' && url === '/users'){
         return res
         .setHeader('Content-Type', 'application/json')
         .end(JSON.stringify(users))
   }
//Metodo de criação 
if(method ==='POST' && url === '/users'){
      //esta linha esta me dizendo que const é uma função a constante body vai receber o nome e o email do objeto
      const { name, email} = req.body
      
      users.push({
         id:1,
         name, 
         email, 
      })
      return res.writeHead(201).end()
   }
   return res.writeHead(404).end()
}) 

server.listen(3333)