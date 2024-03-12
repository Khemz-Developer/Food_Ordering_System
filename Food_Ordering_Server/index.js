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