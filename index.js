const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient } = require('mongodb');
const port = process.env.PORT || 5000;

// pass: QoMaUNcE969EUAoD
// name: car-bd

// middleware
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://car-bd:C9qWFC4tMslB6FrK@cluster0.oesrn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run(){
  try{
      await client.connect();
      const database = client.db('car-bd');
      const productsCollection = database.collection('products');
      console.log('database connected')
      // get api
      app.get('/products', async(req,res)=>{
        const cursor = productsCollection.find({});
        const products = await cursor.toArray();
        res.send(products)
      })
      // const doc = {
      //   img:'https://4wheelerbd.com/wp-content/uploads/2020/10/nissan-petrol.jpg',name:'Nissan Patrol',price: 78000, description: 'The Nissan Patrol is an off-road large family 4×4 SUV. It offers a level of luxury and value. The Nissan Patrol is a series of four-wheel-drive vehicles manufactured by Nissan in Japan'
      // }
      // const result = await productsCollection.insertOne(doc);

      // perform actions on the collection object
      // client.close();
      // post api
    }finally{
      // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req,res)=>{
    res.send('running my crud server')
})

app.listen(port, ()=>{
    console.log('running on port', port)
})