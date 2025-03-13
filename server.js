const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
require("dotenv").config(); // Load environment variables

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/send-message", (req, res) => {
  const { name, email, subject, message } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your email from .env file
      pass: process.env.EMAIL_PASS, // Your email password from .env file
    },
  });

  let mailOptions = {
    from: email,
    to: "priscphalis@gmail.com",
    subject: `New message from ${name}: ${subject}`,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Message sent: " + info.response);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
