const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");

  next();
});

// connecting database
mongoose
  .connect(
    "mongodb+srv://database:database@portfoliodatabase.qog6w.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch(() => {
    console.log("Error in Database Connectivity");
  });

var user = require("./Schema.js");

app.get("/", async (req, res, next) => {
  res.json("Hey There");
});

app.post("/", async (req, res, next) => {
  const data = new user({
    email: req.body.email,
  });

  try {
    const result = await data.save();

    // Sending Email
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "rajadipatidar227@gmail.com",
        pass: "vnpn jgjl ynpe qyaa",
      },
    });

    const mailOptions = {
      from: "rajadipatidar227@gmail.com",
      to: "vasubhut157@gmail.com",
      subject: "Just Yours", // Subject line
      text: `Email From ${req.body.email} for Newsletter`,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent");
      }
    });

    res.send({ user: true, data: result });
  } catch (e) {
    console.log(e);
    res.send({ user: false });
  }
});

// Listening to the PORT
app.listen(5072, () => {
  console.log(`Server is running on 5072`);
});
