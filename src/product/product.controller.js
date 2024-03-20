// Layer untuk handle request dan response
// Biasanya juga handle validasi body
const express = require("express");
const { getAllProducts, getProductById, createProduct, deleteProductById, editProductById } = require("./product.sevice");

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await getAllProducts();
  res.send(products);
});

router.get("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await getProductById(parseInt(productId));

    res.send(product);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/", async (req, res) => {
  const newProductData = req.body;
  try {
    const product = await createProduct(newProductData);

    res.status(201).send({ data: product, message: "Create product success" });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    await deleteProductById(productId);
    res.send("Delete product success");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  const productId = req.params.id; //string
  const productData = req.body;

  if (!(productData.name && productData.description && productData.price && productData.image)) {
    return res.status(201).send("Ada yang kosong");
  }

  const product = await editProductById(parseInt(productId), productData);

  res.status(201).send({ data: product, message: "Produk berhasil di rubah" });
});

router.patch("/:id", async (req, res) => {
  try {
    const productId = req.params.id; //string
    const productData = req.body;

    const product = await editProductById(parseInt(productId), productData);
    res.status(201).send({ data: product, message: "Produk berhasil di rubah" });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
