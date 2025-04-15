
import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)
//console.log(databasePath)
export class Database {
   #database = {}


   // o construtor vai ler o arquivo db.json e transformar em um objeto javascript
   // se o arquivo não existir, ele vai criar um arquivo vazio
// json.parse transforma o arquivo em um objeto javascript ou seja vai parsar os dados 
// json.stringify transforma o objeto javascript em um arquivo json
  
    constructor() {
      fs.readFile(databasePath, 'utf-8')
         .then(data => {
            this.#database = JSON.parse(data)
         })
         .catch(() => {
            this.#persist()
         })
 }


  //o metodo persist vai salvar os dados no arquivo db.json
   #persist(){
      fs.writeFile(databasePath, JSON.stringify(this.#database))
        
    }
  

    select(table) {
     const data = this.#database[table] ?? []
      
    
     return data
   }
 
   insert(table, data) {
     if (Array.isArray(this.#database[table])) {
       this.#database[table].push(data)
     } else {
       this.#database[table] = [data]
     }

   // após o metodo de inserção(insert), chamamos o persist para salvar os dados no arquivo db.json
    this.#persist();

     return data
   }
 }