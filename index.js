const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
const port = 5000;

const products = [
]

app.get('/products', async (req, res) => {
    res.status(200).json(products);
});

app.get('/products/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const result = products.find(p => p.id === id);

    if (result) {
        res.status(200).json(result);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});

app.post('/products', async (req, res) => {
    const { productName, price, category, image } = req.body;
    const newProduct = {
        id: products.length ? products[products.length - 1].id + 1 : 1,
        productName,
        price,
        category,
        image: image || ""
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

app.put('/products/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { productName, price, category, image } = req.body;
    const index = products.findIndex(p => p.id === id);

    if (index !== -1) {
        products[index] = { id, productName, price, category, image: image || "" };
        res.status(200).json(products[index]);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});

app.delete('/products/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);

    if (index !== -1) {
        const deletedProduct = products.splice(index, 1);
        res.status(200).json(deletedProduct[0]);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
