const fs = require('fs');

class ProductManager {

    #products
    cart 
    path
    pathCart

    constructor (path, pathCart){
        this.#products = [];
        this.cart = [];
        this.path = path;
        this.pathCart = pathCart;
        this.#loadProducts();
        this.#loadCarts();
    };

    async #loadProducts(){
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            this.#products = JSON.parse(data);
        } catch (err) {
            console.error(`Error al leer el archivo: ${err}`);
            this.#products = [];
        };
    };
    async #saveProducts() {
        try {
            const data = JSON.stringify(this.#products, null, 2); 
            await fs.promises.writeFile(this.path, data);
        } catch (err) {
            console.error(`Error al guardar el archivo: ${err}`);
        };
    };

    getProducts () {
        return this.#products;
    };

    getProductById (id) {
        return this.#products.find((product) => product.id === id);
    };

    #areFieldComplete (title, description, price, status, code, stock) {
        if (!title || !description || !price || (typeof status !== "boolean") || !code || !stock) {
            console.error("Por favor completa todos los campos");
            return false; 
        } else { 
            return true; 
        };
    };

    #isNotDuplicate (code) {
        if(this.#products.find((product) => product.code === code) !== undefined){
            console.error("El codigo ya existe, posible producto duplicado.");
            return false;
        } else {
            return true;
        };
    };

    #idGenerator(){
        let id = 0;
        if(this.#products.length === 0){
            id = 1;
        } else {
            id = this.#products[this.#products.length-1].id + 1;
        };
        return id;
    };

    addProduct (title, description, price, status, thumbnail, code, stock) {
        if(this.#areFieldComplete(title, description, price, status, code, stock) && this.#isNotDuplicate(code)){
            const newProduct = {
                id: this.#idGenerator(),
                title: title,
                description: description,
                price: price,
                status: true,
                thumbnail: thumbnail || ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAREAAAC4CAMAAADzLiguAAAANlBMVEXp7vG6vsHs8fS2ur3c4eTU2dzm6u3P1Ne4vL/u8/a4vL67v8G0ubzDx8rY3eDEyMvh5unKz9Izr04MAAADb0lEQVR4nO2c63KrIBRGFY1CY4x5/5c93nKiICZGGOvuWj86adowYc0HWxgxSQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOC3oiJwdJ/2oJr6Epy6Sc4qxeTXKtNPfoYfP9NXDj//f0xfv97oX2X6cU4l5pGl6TWNgdbF0b37AnPXUWwMVEd37wvqLKKQNnzm6A5uxcRMSEuWH93DrTRV/8XbaVBnQdFj9u4nm13Vpc+ILk3wy5FCn3LYqHL43hG+9ti0PqmRCNGO2HRMVJlGNqIx8mpakpEQyzRBRlSSd+u0vT0RY8Tkt6rq1mnXcl9fpBjp130DOt2Vk8HI9exG1G16VV81u5qWkBF7Ibxn6SrDSF5ZC7UdqxIRRoyzcZR9P25EGCnsiLRLwK87JMGIqt3NkjdL15VdQxFGSkfIm+v7Irt7jUmovm0f3B3o1Q7pVHuViMjIZeOo6aYdffP8hwQjSePuQq+U33Ee9ikRYcQ4tSar/Z996vMoEWHkue31wTSiJpV6WYkII4myjFS5rz/FdIAtKpFhxJpJqod3Xp3POEtKJFTf7vdGv2KSeYU4F7cLSoRkJFHJvRqcZDr3CnFrkntdIsVIW3CK8tam/ZEbb1+ckrSUEjlG2jeNUsbvw10PjimZf0KSkfVPLAyZxYHzV4woT0LcgSOk1rylWLu7YpaSv5KR9ftvpin5G0ZWhoyjRKIRU1tvF9XbO5JeSgQaMXU1nyrfJmSmRJ6RVkia3iZ/+CAhaVdcRiXijPRCpoPAex3iSYm06qvq+Q7ZZ0NmVDIxIiYjTyGdkv5vG4SINGIm9/32Kfl4yAg1YuppIlolWxIi0Yip7R2ybTdGizNiC9mMFlZr1O6zA8Iysjsh0oy0ZXf36SNRRsxlU1WRb8RcQpw/EmSkuw4JcGJPkJE6wJBJJVXfxXuMdho5d0YwkmDEBSM2GLGJboRaYxs5d0YSjNgZeVRBjoNXYowkTR6GsWkBRgI3jRG7aYzYTWPEbvqkRqI97sCc1MiwaaYfSRGa/JzPH3k+oyYNciEyZ2j4dE8Ac49vhmXHYdCjyOM+68p3QusXY8owm6uL6LPNqz0RlWTXozv3Haq5R5hXW66XMyakxwRb400p/IcNAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4FD+AZS0NBe99dfKAAAAAElFTkSuQmCC"],
                code: code,
                stock: stock
            };
            this.#products.push(newProduct);
            this.#saveProducts();
            console.log("El producto se ha creado satisfactoriamente.");
        };
    };

    updateProduct (id, updatedProduct) {
        const index = this.#products.findIndex((product) => product.id === id);
        if (index !== -1) {
            this.#products[index] = {...this.#products[index], ...updatedProduct};
            this.#saveProducts();
            console.log(`El producto se ha editado satisfactoriamente.`);
        } else {
            console.error(`No se encontró el producto con id ${id}`);
        };
    };

    deleteProduct (id) {
        const index = this.#products.findIndex((product) => product.id === id);
        if (index !== -1) {
            this.#products.splice(index, 1);
            this.#saveProducts();
            console.log(`El producto se ha eliminado satisfactoriamente.`);
        } else {
            console.error(`No se encontró el producto con id ${id}`);
        };
    };

    // CART
    async #loadCarts(){
        try {
            const data = await fs.promises.readFile(this.pathCart, 'utf-8');
            this.cart = JSON.parse(data);
        } catch (err) {
            console.error(`Error al leer el archivo: ${err}`);
            this.cart = [];
        };
    };

    async #saveCart() {
        try {
            const data = JSON.stringify(this.cart, null, 2); 
            await fs.promises.writeFile(this.pathCart, data);
        } catch (err) {
            console.error(`Error al guardar el archivo: ${err}`);
        };
    };

    #cartIdGenerator(){
        let id = 0;
        if(this.cart.length === 0){
            id = 1;
        } else {
            id = this.cart[this.cart.length-1].id + 1;
        };
        return id;
    };

    newCart (id, quantity) {
        if(!id || !quantity) return console.error("Por favor completa todos los campos");

        const newCart = {
            id: this.#cartIdGenerator(),
            products: [{
                id: id,
                quantity: quantity
            }],
        };

        this.cart.push(newCart);
        this.#saveCart();
        console.log(`Producto exitosamente agregado al carrito ${this.#cartIdGenerator() - 1}`)
    };

    getCartById (id) {
        return this.cart.find((cart) => cart.id === id);
    };

    addToCart(cartId, productId) {
        const productIndex = this.#products.findIndex((product) => product.id === productId);
        if (productIndex !== -1) {

            const cartIndex = this.cart.findIndex((cart) => cart.id === cartId);
            if (cartIndex !== -1) {
                const productInCartIndex = this.cart[cartIndex].products.findIndex((product) => product.id === productId);
                if (productInCartIndex !== -1) {
                    this.cart[cartIndex].products[productInCartIndex].quantity += 1;
                    this.#saveCart();
                    console.log(`El producto se ha agregado exitosamente al carrito`);
                } else {
                    this.cart[cartIndex].products.push({id: productId, quantity: 1});
                    this.#saveCart();
                    console.log(`El producto se ha agregado exitosamente al carrito`);
                };
            } else {
                console.error(`No se encontró el carrito con id ${cartId}`);
            };

        } else {
            console.error(`No se encontró el producto con id ${productId}`);
            console.log(typeof productId)
        };
    };
};

module.exports = {
    productManager: new ProductManager('./src/products.json', './src/cart.json')
};