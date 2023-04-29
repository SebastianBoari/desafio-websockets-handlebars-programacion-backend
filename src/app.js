const express = require('express');
const { Server } = require('socket.io');
const productsRouter = require('./routes/products.router');
const cartRouter = require('./routes/cart.router');
const viewsRouter = require('./routes/views.router');

const app = express();
const port = 8080; 

app.listen(port, () => {
    console.log(`Server Up on port ${port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

// Views Handler
app.use('/', viewsRouter);

// Products API Response
app.use('/api/products', productsRouter);
// Cart API Response
app.use('/api/cart', cartRouter);


