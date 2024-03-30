const express = require('express') // import express
const app = express() // create an express app
const port = process.env.PORT || 3000  // set the port

// Load environment variables from the .env file
require('dotenv').config()


const cors = require('cors') // import cors

// middleware
app.use(cors()) // use cors middleware
app.use(express.json()) // use express.json middleware



//mongoDB configuration

const { MongoClient, ServerApiVersion } = require('mongodb'); // import MongoClient and ServerApiVersion from mongodb
const { ObjectId } = require('mongodb'); // import ObjectId from mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@khemzkitchen-database.bgzowuu.mongodb.net/?retryWrites=true&w=majority&appName=khemzKitchen-database`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // database & collection name
    const database = client.db('khemzKitchen-database');
    const menuCollection = database.collection('menus');
    const cartCollection = database.collection('cartItems');

    // all menu items operation
    app.get('/menu', async (req,res) => {
      const result = await menuCollection.find({}).toArray();
      res.send(result);
    });

  

    //post our cart items to database
    app.post('/carts',async (req,res)=>{
      const cartItems = req.body;
      const result = await cartCollection.insertOne(cartItems);
      res.send(result);
    })
    
    //get our cart items using email
    app.get('/carts', async (req,res)=>{
      const email = req.query.email;
      const filter = {email: email};
      const result = await cartCollection.find(filter).toArray();
      res.send(result);
    })
    // can check in browser by :http://localhost:3000/carts?email=khemzdesign98@gmail.com
    
    //get specific cart
    app.get('/carts/:id', async (req, res) => { // Corrected the route path
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await cartCollection.findOne(filter);
      res.send(result);
    });

    // can check in browser by :http://localhost:3000/carts/60f7b3b3b3b3b3b3b3b3b3b3

    // delete cart items
    app.delete('/carts/:id',async(req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await cartCollection.deleteOne(query);
      res.send(result);
    }
    )

    // update carts quantity
    app.put('/carts/:id',async(req,res)=>{
      const id = req.params.id;
      const {quantity} = req.body; // here we are getting quantity from request body its called as destructuring
      const query = {_id: new ObjectId(id)};
      const options = {upsert: true}; // upsert is used to create a new document if it does not exist
      const updateDoc = {
        $set: {
          quantity: parseInt(quantity,10) // here we are converting quantity to integer
        }
      }
      const result = await cartCollection.updateOne(query,updateDoc,options);
      res.send(result);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
    //await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {  // listen to port
  console.log(`Example app listening on port ${port}`)
})