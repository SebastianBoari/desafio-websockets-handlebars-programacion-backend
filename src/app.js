const express = require('express');
const { Server } = require('socket.io');
const productsRouter = require('./routes/products.router');
const cartRouter = require('./routes/cart.router');
const viewsRouter = require('./routes/views.router');
const handlebars = require('express-handlebars');

const app = express();
const port = 8080; 

app.engine('handlebars', handlebars.engine());
app.set('views', './src/views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/public'));

// Views Handler
app.use('/', viewsRouter);

// Products API Response
app.use('/api/products', productsRouter);

// Cart API Response
app.use('/api/cart', cartRouter);

const serverHttp = app.listen(port, () => {
    console.log(`Server Up on port ${port}`);
});

const serverSocket = new Server(serverHttp);

serverSocket.on('connection', () => {
    console.log('Nuevo cliente conectado...');
});