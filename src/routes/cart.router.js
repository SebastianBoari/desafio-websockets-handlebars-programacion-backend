const { productManager } = require('../classes/ProductManager');
const { Router } = require('express');
const router = Router();

router.post('/', (req, res)=>{
    const pId = req.body.id;
    const pQuantity = req.body.quantity;

    res.status(201).send(productManager.newCart(pId, pQuantity));
});

router.get('/:id', (req, res) => {
    const id = Number(req.params.id);

    res.status(200).send(productManager.getCartById(id));
});

router.post('/:cid/product/:pid', (req, res)=>{
    const pId = +req.params.pid;
    const cid = +req.params.cid;

    res.status(200).send(productManager.addToCart(cid, pId));
});

module.exports = router;