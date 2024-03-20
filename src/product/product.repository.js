// Berkomunikasi dengan database
// Boleh pake ORM, boleh raw quwry
// Supaya mau ganti-ganti ORM tinggal di file ini ajah ygy

const prisma = require("../db");

const findProducts = async () => {
  const product = await prisma.product.findMany();

  return product;
};

const findProductsById = async (id) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  return product;
};

const insertProduct = async (newProductData) => {
  const product = await prisma.product.create({
    data: {
      name: newProductData.name,
      description: newProductData.description,
      image: newProductData.image,
      price: newProductData.price,
    },
  });

  return product;
};

const deleteProduct = async (id) => {
  await prisma.product.delete({
    where: {
      id,
    },
  });
};

const editProduct = async (id, productData) => {
  const product = await prisma.product.update({
    where: {
      id: parseInt(id),
    },
    data: {
      description: productData.description,
      image: productData.image,
      name: productData.name,
      price: productData.price,
    },
  });
  return product;
};

module.exports = {
  findProducts,
  findProductsById,
  insertProduct,
  deleteProduct,
  editProduct,
};
