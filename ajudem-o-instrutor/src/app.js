import express, { json } from 'express';
import cors from 'cors';


const server = express();
server.use(cors());
server.use(json());

const receitas = [
  {
    id: 1,
    titulo: "Pão com Ovo",
    ingredientes: "Ovo e pão",
    preparo: "Frite o ovo e coloque no pão",
    views: 0,
  },
  {
    id: 2,
    titulo: "Bolo",
    ingredientes: "Ovo e pão",
    preparo: "Frite o ovo e coloque no pão",
    views: 0,
  }
];

server.get('/receitas', (req, res) => {
  res.send(receitas);
});

server.get('/receitas/:idDaReceita', (req, res) => {
      const idDaReceita = parseInt(req.params.idDaReceita);
      const idExistente = receitas.find( receita => receita.id === idDaReceita);

      if(!idExistente){
        return res.sendStatus(404)
      };
      res.send(idExistente);

  });


server.post('/receitas', (req, res) => {
  const {titulo,ingredientes, preparo} = req.body;
  const receitaExistente =  receitas.find(receita => receita.titulo === titulo);
  
  if(receitaExistente){
    return res.status(409).send("Receita já existente");
  }
  if(!ingredientes || !titulo || !preparo){
    return res.status(422).send("Todos os campos são obrigatórios");
  }
  receitas.push({
    id: receitas.length + 1,
    titulo,
    ingredientes,
    preparo,
    views: 0
  });
  res.send("Criado");
})

server.listen(5000, () => {
  console.log("Rodando em http://localhost:5000");
});
