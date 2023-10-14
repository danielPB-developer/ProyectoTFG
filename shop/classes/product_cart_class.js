class productCart{
    name = document.createElement("div");
    price = document.createElement("div");
    units = document.createElement("div");
    row = document.createElement("div");
    delete = document.createElement("div");

    constructor(product, quantity){
        this.row.classList.add("cart-product-row");
        this.row.setAttribute("id", "product-"+product.id);
        this.price.setAttribute("data-id", product.id);

        this.name.classList.add("product-name");
        this.name.textContent = product.name;

        this.price.classList.add("product-price");
        this.price.setAttribute("data-price", product.price);
        this.price.textContent = product.price;

        this.units.classList.add("product-units");
        this.units.setAttribute("data-units", quantity);
        this.units.textContent = " x " + quantity;

        this.delete.classList.add("delete-btn");
        this.delete.addEventListener("click", e=>{
            myCart.removeFromCart(product.id); // la funcion esta en cart_class.js
        });
        this.row.append(this.name, this.price, this.units, this.delete);
    }
}