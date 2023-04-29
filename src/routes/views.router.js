const { productManager } = require('../classes/ProductManager');
const { Router } = require('express');
const router = Router();


// Productos estáticos:
router.get('/', (req, res) => {
    const allProducts = productManager.getProducts();
    
    res.render('home', {
        style: 'index',
        script: 'index',
        title: 'Productos',
        products: allProducts
    });
});

router.get('/realTimeProducts', (req, res) => {
    const allProducts = productManager.getProducts();
    
    res.render('realTimeProducts', {
        style: 'index',
        script: 'index',
        title: 'Productos',
        products: allProducts
    });
});


module.exports = router;