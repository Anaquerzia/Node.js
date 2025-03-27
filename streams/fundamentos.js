// Tipos de streams  Netflix e spotify

//Readable: stream de leitura, é uma stream de dados que você pode ler, mas não escrever.
//Writable: stream de escrita, é uma stream de dados que você pode escrever, mas não ler.
//Duplex: stream de leitura e escrita, é uma stream de dados que você pode ler e escrever.
//REs e req são streams de leitura e escrita, posso devolver a respostas aos poucos, sem precisar esperar a resposta inteira para enviar a resposta.
//Transform: stream que pode modificar os dados enquanto são lidos ou escritos.

//Streams são uma coleção de dados como arrays ou strings, mas são mais flexiveis e eficientes.
//stdin= stream de entrada padrão, é uma stream de leitura que é usada para ler dados que o usuario digita no terminal.
//stdout= stream de saida padrão, é uma stream de escrita que é usada para escrever dados no terminal.
//stderr= stream de erro padrão, é uma stream de escrita que é usada para escrever mensagens de erro no terminal.

import {Readable } from 'node:stream'

class OnetoHundredStream extends Readable{
    index=1
    _read()
    {
        const i= this.index++

        setTimeout(()=> {
            if(i > 100){
                this.push(null)
            }
            else
            { const buf = Buffer.from(String(i))
                this.push(buf)
            }
        },1000)
    }
}
new OnetoHundredStream()
.pipe(process.stdout)