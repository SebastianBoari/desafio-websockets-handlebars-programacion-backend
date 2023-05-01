const { Router } = require('express');
const uploader = require('../utils'); 
const router = Router();


// Productos estáticos:
router.get('/', async (req, res) => {
    try {
        const response = await fetch('http://localhost:8080/api/products');
        
        if (!response.ok) {
            throw new Error('Error al obtener productos');
        };
        
        const products = await response.json();
        
        res.render('home', {
            style: 'index',
            script: '',
            title: 'Productos',
            products: products
        });

    } catch (error) {

      console.error(error);

      res.status(500).send('Error interno del servidor');
    };
});
  

router.get('/realTimeProducts', async (req, res) => {
    try {
        const response = await fetch('http://localhost:8080/api/products');
        
        if (!response.ok) {
            throw new Error('Error al obtener productos');
        };
        
        const products = await response.json();
        
        res.render('realTimeProducts', {
            style: 'index',
            script: 'index',
            title: 'Productos',
            products: products
        });

    } catch (error) {

      console.error(error);

      res.status(500).send('Error interno del servidor');
    };
});

router.post('/realTimeProducts', uploader.single('file'), async (req, res) => {
    // TODO: Logica para guardar y mostrar el nuevo producto
    // Formateo de datos:
    let status;
    req.body.status ? status = true : status = false;
    
    const product = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        status: status,
        thumbnail: req.body.thumbnail,
        code: req.body.code,
        stock: req.body.stock
    };

    try {

        const response = await fetch('http://localhost:8080/api/products', {
            method: 'POST',
            body: JSON.stringify(product),
            headers: { 'Content-Type': 'application/json' },
        });
    
        if (!response.ok) {
            throw new Error('Error al agregar producto');
        };
    
        res.send('Producto agregado');

    } catch (error) {
    
        console.error(error);

        res.status(500).send('Error interno del servidor');

    };
});


module.exports = router;