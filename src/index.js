const express = require("express");
const dotenv = require("dotenv");

// membuat apliaksi app dari express
const app = express();

// untuk baca yang ada di ENV
dotenv.config();
const cors = require("cors")

app.use(cors())
// Mengambil Port di env
const PORT = process.env.PORT;

// middleware
app.use(express.json());

// membuat endpoint
app.get("/api", (req, res) => {
  res.send("Hello World");
});

const productController = require("./product/product.controller")

app.use('/products', productController)

app.listen(PORT, () => {
  console.log("Express API running in port: " + PORT);
});
