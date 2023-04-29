const { productManager } = require('../classes/ProductManager');
const { Router } = require('express');
const router = Router();


/*
productManager.addProduct("producto prueba 1", "Este es un producto prueba 1", 100, true, "", "abc121", 21);
productManager.addProduct("producto prueba 2", "Este es un producto prueba 2", 200, true,"", "abc122", 22);
productManager.addProduct("producto prueba 3", "Este es un producto prueba 3", 300, false, "", "abc123", 23);
productManager.addProduct("producto prueba 4", "Este es un producto prueba 4", 400, true, "", "abc124", 24);
productManager.addProduct("producto prueba 5", "Este es un producto prueba 5", 500, true, "", "abc125", 25);
productManager.addProduct("producto prueba 6", "Este es un producto prueba 6", 600, true, "", "abc126", 26);
productManager.addProduct("producto prueba 7", "Este es un producto prueba 7", 700, true, "", "abc127", 27);
productManager.addProduct("producto prueba 8", "Este es un producto prueba 8", 800, true, "", "abc128", 28);
productManager.addProduct("producto prueba 9", "Este es un producto prueba 9", 900, true, "", "abc129", 29);
productManager.addProduct("producto prueba 10", "Este es un producto prueba 10", 1000, true, "Sin imagen", "abc130", 30);
productManager.addProduct("PRODUCTO", "PRUEBA 11", 9999, true, ['url1', 'url2', 'url3'], "z1z2z3", 30110); 
*/


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