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

import {Readable, Transform, Writable } from 'node:stream'

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

//metodo _write é chamado quando um pedaço de dados é escrito na stream.
// O parametro chunk é o pedaço de dados que foi escrito, é o que esta sendo enviado dentro do  this.push(buf)
// O parametro encoding é como os dados foram codificados. 
// O parametro callback é uma função que deve ser chamada quando a função terminou de fazer o que precisava fazer com a informação.

//Dentro de uma stream de escrita a gente não processa nada,  dentro do _write, a gente só processa ou escreve os dados , 
//Ela nunca vai transformar um dado , ela vai somente processar o dado e enviar para outro lugar. 
class MultiplyByTwoStream extends Writable{
    _write(chunk, encoding, callback) 
    {
        console.log(Number(chunk.toString())* 10)
        callback()
    }
}

class inverterNunber  extends Transform{
    _transform(chunck, encoding, callback)
    {
        const transformed = Number(chunck.toString())* -1
        callback(null,Buffer.from(String(transformed)))
    }
}
//Nesta linha estamos lendo os dados de 1 a 100  da função OneToHundredStream e passando para a função MultiplyByTwoStream
//A função MultiplyByTwoStream vai pegar os dados da OnetoHundred e  multiplicando  os dados por 10 e imprimindo no console.
new OnetoHundredStream()
.pipe(new inverterNunber())
.pipe( new MultiplyByTwoStream())