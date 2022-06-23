import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {MongoClient} from "mongodb";


dotenv.config();
const mongoClient = new MongoClient(process.env.MONGO_URI);


// mongoClient.connect().then(()=>{
//   db = mongoClient.db("lista_telefonica_vovo");
// })

const server = express();
server.use(cors());
server.use(json());

server.get('/contatos', async (req, res) => {
  

  try {
    await mongoClient.connect();
    const db = mongoClient.db("lista_telefonica_vovo");
    const contatosCollection = db.collection("contatos");
    const contatos = await contatosCollection.find().toArray();
    
    res.status(200).send(contatos);
  } catch (error) {
    res.sendStatus(404);
  }
});

server.post('/contatos', async (req, res) => {
  const{nome, telefone} = req.body;

  // escreva seu código aqui
  try {
    await mongoClient.connect();
    const db = mongoClient.db("lista_telefonica_vovo");
    db.collection("contatos").insertOne({
      nome,
      telefone
    });
    res.status(201).send("Contato criado!");
  } catch (error) {
    console.log(error);
    res.send("deu ruim")
  }
  
})

server.listen(5000, () => {
  console.log("Rodando em http://localhost:5000");
});
