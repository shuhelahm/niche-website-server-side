const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const port = process.env.PORT || 5000;

// pass: QoMaUNcE969EUAoD
// name: car-bd

const uri = "mongodb+srv://DB_USER:DB_PASS@cluster0.oesrn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run(){
  try{
      await client.connect();
      const database = client.db('car-bd');
      const productsCollection = database.collection('products');
      // get api
      app.get('/products', async(req,res)=>{
        const cursor = productsCollection.find({});
        const products = await cursor.toArray();
        res.send(products)
      })
      const doc = {
        name: 'amiiii'
      }
      const result = await productsCollection.insertOne(doc);
      console.log(result)
      // perform actions on the collection object
      // client.close();
    }finally{
      await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req,res)=>{
    res.send('running my crud server')
})

app.listen(port, ()=>{
    console.log('running on port', port)
})