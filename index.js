const express = require('express');
const app = express();
const port = 5000;

const products = [
    { id: 1, productName: "Mobile", price: 2000 },
    { id: 2, productName: "TV", price: 22000 }
]

app.get('/products', (req, res) => {
    res.status(200).json(products);
});

app.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const result = products.find(p => p.id === id);

    if (result) {
        res.status(200).json(result);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});

app.post('/products', (req, res) => {
    const { productName, price } = req.body;
    const newProduct = {
        id: products.length ? products[products.length - 1].id + 1 : 1,
        productName,
        price
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

app.put('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { productName, price } = req.body;
    const index = products.findIndex(p => p.id === id);

    if (index !== -1) {
        products[index] = { id, productName, price };
        res.status(200).json(products[index]);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});

app.put('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { productName, price } = req.body;
    const index = products.findIndex(p => p.id === id);

    if (index !== -1) {
        products[index] = { id, productName, price };
        res.status(200).json(products[index]);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});

app.delete('/products/:id', (req, res) => {
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
