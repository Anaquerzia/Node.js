import {Readable}  from 'node:stream'



class OnetoHundredStream extends Readable{
    index=1
    _read()
    {
        const i= this.index++

        setTimeout(()=> {
            if(i > 5){
                this.push(null)
            }
            else
            { const buf = Buffer.from(String(i))
                this.push(buf)
            }
        },1000)
    }
}

fetch('http://localhost:3334', {
    method : 'POST',
    body: new OnetoHundredStream(),
    duplex: 'half'

}).then(Response => {
    return Response.text()
}).then(data => {
    console.log(data)
})