const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();
const { query, application } = require('express');
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oesrn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run(){
  try{
      await client.connect();
      const database = client.db('car-bd');
      const productsCollection = database.collection('products');
      const reviewsCollection = database.collection('reviews');
      console.log('database connected')
      // get api
      app.get('/products', async(req,res)=>{
        const cursor = productsCollection.find({});
        const products = await cursor.toArray();
        res.send(products)
      })
      // get api reviews
      app.get('/reviews', async(req,res)=>{
        const cursor = reviewsCollection.find({});
        const reviews = await cursor.toArray();
        res.send(reviews)
      })

      app.get('/products/:id', async(req, res)=>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const product = await productsCollection.findOne(query);

        res.send(product);
      })

      // post api
      app.post('/reviews', async(req, res)=>{
        const newReview = req.body;
          console.log('hit the post', req.body)
          const result = await reviewsCollection.insertOne(newReview);
          res.json(result);
      })

      // const doc = {
      //   review:'good'
      // }
      // const result = await reviewsCollection.insertOne(doc);

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