const express = require("express"); // import express
const app = express(); // create an express app

// import jsonwebtoken
const jwt = require("jsonwebtoken");

const verifyToken = require("./api/middleware/verifyToken"); // import verifyToken middleware

// Load environment variables from the .env file
require("dotenv").config();

const cors = require("cors"); // import cors
const port = process.env.PORT || 3001; // set the port

const mongoose = require("mongoose"); // import mongoose

// middleware
app.use(cors()); // use cors middleware
app.use(express.json()); // use express.json middleware

// connect to mongodb
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@khemzkitchen-database.bgzowuu.mongodb.net/Khemz-Kitchen-Database?retryWrites=true&w=majority&appName=khemzKitchen-database`
  )
  .then(() => {
    try {
      console.log("Connected to MongoDB Database!");
    } catch (error) {
      console.log(error);
    }
  })
  .catch((error) =>
    console.log("Error connecting to the Mongodb database", error)
  );

app.post("/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1hr",
  });

  res.send({ token });
});

//imports routes
const menuRoutes = require("./api/routes/menuRoutes");
const cartRoutes = require("./api/routes/cartRoutes");
const userRoutes = require("./api/routes/userRoutes");
const paymentRoutes = require("./api/routes/paymentRoutes");
// use routes
app.use("/menu", menuRoutes);
app.use("/cart", cartRoutes);
app.use("/user", userRoutes);
app.use("/payment", paymentRoutes);

// can check in browser by :http://localhost:3000/cart?email=khemzdesign98@gmail.com
//stripE payment gateway

// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // import stripe and set the secret key

//console.log(process.env.STRIPE_SECRET_KEY); // log the secret key to the console


// Create a PaymentIntent with the order amount and currency
app.post("/create-payment-intent", async (req, res) => {
  try {
    const { price } = req.body;
    const amount = price * 100;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
      
    });
   
  } catch (error) {
    console.error("Error creating PaymentIntent:", error);
    res.status(500).send({ error: "Failed to create PaymentIntent" });
  }
});
app.get("/", verifyToken, (req, res) => {
  res.send("Hello Khemz Kitchen!");
});

app.listen(port, () => {
  // listen to port
  console.log(`Example app listening on port ${port}`);
});



