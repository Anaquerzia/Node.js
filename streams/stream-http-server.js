import http from 'node:http'
import { Transform } from 'node:stream'

class inverterNunber  extends Transform{
    _transform(chunck, encoding, callback)
    {
        const transformed = Number(chunck.toString())* -1
        console.log(transformed)

        callback(null,Buffer.from(String(transformed)))
    }
}

const server = http.createServer(async(req, res) => {
    const buffers = []
    for await(const chunk of req){
        buffers.push(chunk)
    
    }
    const stringcompleta = Buffer.concat(buffers).toString()
    console.log(stringcompleta)
    return res.end(stringcompleta)
    // return req.pipe(new inverterNunber())
    // .pipe(res)
})


server.listen(3334)