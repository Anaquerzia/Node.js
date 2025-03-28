export class database { 
    databse ={}


    select(table){
        const data = this.database[table] ?? []
        return data
    }
    insert(table){
        if( Array.isArray(this.database[table])){
            this.database[table].push(data)
        }else{
            this.database[table]=[data]
        }
    }

}