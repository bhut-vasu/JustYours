const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();
// const cors = require("cors");
// const http = require("http");

const app = express();

// const server = http.createServer(app);
app.use(express.json());
// app.use(
//   cors({
//     credentials: true,
//     origin: ["https://arcfit.vasubhut.com/"],
//     allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
//   })
// );

app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');

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
  res.json(
    "Hey There. You are on a server of the world's best fitness platform."
  );
});

app.post("/", async (req, res, next) => {
  const data = new user({
    name: req.body.name,
    email: req.body.email,
    reason: req.body.reason,
    remarks: req.body.remarks,
  });

  try {
    const result = await data.save();

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
      subject: "ArcFit",
      text: `Email From {"${req.body.email}"}. Name is {"${req.body.name}"}. Message for query {"${req.body.reason}"} is {"${req.body.remarks}"}`,
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

app.listen(5071, () => {
  console.log(`Server is running on 5071`);
});
