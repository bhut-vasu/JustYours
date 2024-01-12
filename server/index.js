const nodemailer = require("nodemailer");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const http = require("http");

const app = express();

const server = http.createServer(app);
app.use(cors({ origin: true }));
app.use(express.json());
app.use(cors());

// connecting database
mongoose
  .connect("mongodb+srv://admin:admin@cluster0.ge4y8ie.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch(() => {
    console.log("Error in Database Connectivity");
  });

app.get("/", async (req, res, next) => {
  res.json("Hey There, You are on a e-commerce server")
});

var user = require("./Schema.js");

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
        pass: "ilre donl ziku uhih",
      },
    });

    const mailOptions = {
      from: "rajadipatidar227@gmail.com",
      to: "vasubhut157@gmail.com", 
      subject: "Just Yours", // Subject line
      text: `Email From ${req.body.email} for Newsletter`, 
    };

    transporter.sendMail(mailOptions, (eri) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent");
      }
    });

    res.send({ user: true, data: result });
  } catch (e) {
    res.send({ user: false });
  }
});

// Listening to the PORT
app.listen(5072, () => {
  console.log(`Server is running on 5072`);
});
