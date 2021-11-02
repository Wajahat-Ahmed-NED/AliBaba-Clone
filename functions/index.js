const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { request, response } = require("express");
const stripe = require("stripe")(
  "sk_test_51HfXbsJpTJUk2O1KR1wLgGrDpGK8SONWxYO1AQiqYe1CvD6YQyZjgNR0QU3yljjYxgo1QOLvzxAHAliKLkiUdvpP009eWy2wiw"
);

//API

// app config
const app = express();

// middleware
app.use(cors({ origin: true }));
app.use(express.json());

//API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  console.log("Payment is there >>>?>>>>>", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, //subunits of the currencyy
    currency: "usd",
  });

  //OK-Created
  response.status(201).send({
    clientsecret: paymentIntent.client_secret,
  });
});
//Listen command
exports.api = functions.https.onRequest(app);

// Example endpoint
// http://localhost:5001/onlinewebmobile-86b64/us-central1/api
