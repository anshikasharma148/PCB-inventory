const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb://localhost:27017/productsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const productSchema = new mongoose.Schema({
  toolID: { type: Number, required: true, unique: true },
  toolname: { type: String, required: true },
  cate: { type: String, required: true },
  subcate: { type: String, required: true },
  radius: { type: String, required: true },
  width: { type: String, required: true },
  length: { type: String, required: true },
  quantity: { type: Number, required: true },
  weight: { type: String, required: true },
  maintain: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true }
});

const Product = mongoose.model('Product', productSchema);

app.use(bodyParser.json());

// Get all products
app.get('/api/product', async (req, res) => {
  const products = await Product.find({});
  res.json({ products });
});

// Add a new product
app.post('/api/product', async (req, res) => {
  const { toolname, cate, subcate, radius, width, length, quantity, weight, maintain, description, price } = req.body;
  try {
    const lastProduct = await Product.findOne().sort({ toolID: -1 });
    const newToolID = lastProduct ? lastProduct.toolID + 1 : 1;

    const newProduct = new Product({
      toolID: newToolID,
      toolname,
      cate,
      subcate,
      radius,
      width,
      length,
      quantity,
      weight,
      maintain,
      description,
      price
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add product' });
  }
});

// Update a product
app.put('/api/product', async (req, res) => {
  const { toolID } = req.query;
  const { toolname, cate, subcate, radius, width, length, quantity, weight, maintain, description, price } = req.body;

  try {
    const product = await Product.findOneAndUpdate(
      { toolID },
      { toolname, cate, subcate, radius, width, length, quantity, weight, maintain, description, price },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product updated successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update product' });
  }
});

// Delete a product
app.delete('/api/product', async (req, res) => {
  const { toolID } = req.query;

  try {
    const product = await Product.findOneAndDelete({ toolID });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
