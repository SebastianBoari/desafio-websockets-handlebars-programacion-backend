const { productManager } = require('../classes/ProductManager');
const { Router } = require('express');
const router = Router();


router.get('/', (req, res) => {
    const limit = Number(req.query.limit);
    limit? res.status(200).send(productManager.getProducts().slice(0, limit)) : res.status(200).send(productManager.getProducts()); 
});

router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    res.status(200).send(productManager.getProductById(id));
});

router.post('/', (req, res) => {
    const body = req.body;

    res.status(201).send(productManager.addProduct(body.title, body.description, body.price, body.status, body.thumbnail, body.code, body.stock));
});

router.put('/:id', (req, res) => {
    const body = req.body;
    const id = +req.params.id;

    res.status(200).send(productManager.updateProduct(id, body));
});

router.delete('/:id', (req, res) => {
    const id = +req.params.id;

    res.status(200).send(productManager.deleteProduct(id));
});

module.exports = router;