export async function json(req, res) { // Prestar atenção na ordem dos parâmetros, o req tem que vir antes do res
   const buffers = [];

   for await (const chunk of req) {
       buffers.push(chunk);
   }

   try {
       req.body = JSON.parse(Buffer.concat(buffers).toString());
   } catch {
       req.body = null;
   }

   res.setHeader('Content-Type', 'application/json');
}
