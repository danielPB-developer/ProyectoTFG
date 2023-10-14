class CartClass{
    cartStorage = JSON.parse(sessionStorage.getItem("cart")) || [];

    cartContainer = document.querySelector(".cart-container");
    cartContainerBody = document.querySelector(".cart-container-body");
    cartIcon = document.querySelector(".icon-cart");
    cartTotal = document.querySelector(".cart-total");
    resetCartButton = document.querySelector("#resetCart");
    itemCounterSelector = document.querySelector(".items-counter");

    constructor(){
        this.cartIcon.addEventListener("click", () =>{
            this.cartContainer.classList.toggle("visible");
        });
        this.resetCartButton.addEventListener("click", () =>{
            this.resetCart();
        });
        this.rellenarCart();
    }

    rellenarCart(){
        console.log("rellenarCart");
        if(this.cartStorage.length != 0){
            let totalRecuperado = 0;
            this.cartStorage.forEach(producto => {
                totalRecuperado += (parseFloat(producto.price) * parseInt(producto.quantity));
                this.updateCartView(producto, true, producto.quantity);
            });
            this.itemCounterSelector.textContent = this.itemCounterSelector.dataset["count"] = this.cartStorage.length;
        }
    }

    addToCart(productData){
        console.log("addToCart");
        let productToLocalStorage = {} // modelo de datos para guardar productos del carrito en localStorage
        this.cartStorage = JSON.parse(sessionStorage.getItem("cart")) || [];
        console.log(this.cartStorage)
        let encontrado = this.cartStorage.find((product) => product.id === productData.id);

        let newProduct;

        if(encontrado != undefined){
            if(encontrado.quantity < productData.stock){
                encontrado.quantity += 1;
                newProduct = false;
                this.mensaje("El producto se a añadido correctamente", "success", productData);
                this.updateLocalStorage(productToLocalStorage, newProduct);
                this.updateCartView(productData, newProduct, 1);
            }else{
                this.mensaje("No quedan mas unidades de este producto", "error", productData);
            }
        }else{
            console.log("productData.id", productData.id)
            productToLocalStorage = {
                id: productData.id,
                name: productData.name,
                price: productData.price,
                stock: productData.stock,
                image: productData.images[0],
                quantity: 1,
            };

            this.itemCounterSelector.dataset["count"] = parseInt(this.itemCounterSelector.dataset["count"]) + 1;
            this.itemCounterSelector.textContent = this.itemCounterSelector.dataset["count"];
            newProduct = true;
            this.mensaje("El producto se a añadido correctamente", "success", productData);
            this.updateLocalStorage(productToLocalStorage, newProduct);
            this.updateCartView(productData, newProduct, 1);
        }
    }

    updateCartView(productData, newProduct, quantity){
        console.log(this.cartTotal);
        console.log("updateCartView");
        if(newProduct){
            let cartItem;
            cartItem = new productCart(productData, quantity);
            this.cartContainerBody.append(cartItem.row);
        }else{
            let quantityContainer = document.querySelector("#product-" + productData.id + " .product-units");
            console.log("quantityContainer", quantityContainer)
            let newQuantity = parseInt(quantityContainer.dataset["units"]) + 1;
            quantityContainer.textContent = " x " + newQuantity;
            quantityContainer.dataset["units"] = newQuantity;
        }
        console.log(this.cartTotal.dataset["total"]);

        this.cartTotal.dataset["total"] = Number((parseFloat(this.cartTotal.dataset["total"]) + (parseFloat(productData.price)*parseInt(quantity))).toFixed(2));
        this.cartTotal.textContent = this.cartTotal.dataset["total"];
    }

    updateLocalStorage(product, newProduct){
        console.log("updateLocalStorage");
        if(newProduct){
            this.cartStorage.push(product);
        }
        sessionStorage.setItem("cart", JSON.stringify(this.cartStorage));
    }

    removeFromCart(id){
        console.log("removeFromCart", id);
        document.querySelector("#product-" + id).remove();

        let cartActualizado = this.cartStorage.filter((producto) => producto.id != id);
        console.log("cartActualizado", cartActualizado)
        this.itemCounterSelector.dataset["count"] = parseInt(this.itemCounterSelector.dataset["count"]) - 1;
        this.itemCounterSelector.textContent = this.itemCounterSelector.dataset["count"];

        let productoDescontar = this.cartStorage.filter((producto)=>producto.id == id)[0];
        console.log(this.cartTotal.dataset["total"]);

        this.cartTotal.dataset["total"] = Number ((parseFloat(this.cartTotal.dataset["total"]) - parseFloat(productoDescontar.price)*parseInt(productoDescontar.quantity)).toFixed(2));
        this.cartTotal.textContent = this.cartTotal.dataset["total"];

        sessionStorage.setItem("cart", JSON.stringify(cartActualizado));
    }

    resetCart(){
        console.log("resetCart");
        this.cartContainerBody.innerHTML = "";
        this.cartStorage = [];
        this.itemCounterSelector.textContent = this.itemCounterSelector.dataset["count"] = 0;
        this.cartTotal.dataset["total"] = 0;
        this.cartTotal.textContent = this.cartTotal.dataset["total"];
        sessionStorage.removeItem("cart");
    }
    mensaje(msg, type, productData){
        let imagenes;
        let productAdded = `<div class='modal-product'>`;
        productAdded += `<div>`;
        productAdded += `<h4 class='cool-modal-message'>${msg}</h4>`;
        productAdded += `<h3>${productData.name}</h3>`;
        productAdded += `<h3>${productData.price}</h3>`;
        productAdded += `</div>`;
        if(typeof(productData.images) === 'object'){
            imagenes = productData.images;
        }else{
            imagenes = productData.images.split(",");
        }
        productAdded += `<img src=${urlImagesGlobal}/products/${imagenes[0]} alt='${productData.name}'>`;
        //doModal(type, "", productAdded);
    }
}

const myCart = new CartClass;