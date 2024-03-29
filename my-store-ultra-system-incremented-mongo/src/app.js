import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;
mongoClient.connect(() => {
  db = mongoClient.db("my_store_ultra_system_incremented");
});

const app = express();
app.use(express.json());

/* Products Routes */
app.get('/products', async (req, res) => {
 
  try {
    const productsCollection = db.collection("products");
    const  products = await productsCollection.find().toArray();
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
  

});

app.get('/products/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const productsCollection = db.collection("products");
    const product = await productsCollection.findOne({_id: new ObjectId(id)});
    res.status(200).send(product);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
 
});

app.post('/products', (req, res) => {
  const product = req.body;

  try {
    const productsCollection = db.collection("products");
    productsCollection.insertOne(product);
    res.send(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500)
  }

});

/* Customers Routes */
app.get('/customers', async (req, res) => {
  try {
    const customers = await db.collection('customers').find().toArray();
    res.send(customers);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.get('/customers/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const customer = await db.collection('customers').findOne({ _id: new ObjectId(id) });

    if (!customer) {
      return res.sendStatus(404);
    }

    res.send(customer);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.post('/customers', async (req, res) => {
  try {
    const customer = req.body;

    await db.collection('customers').insertOne(customer);
    
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.listen(5000, () => {
  console.log('Server is litening on port 5000.');
});
