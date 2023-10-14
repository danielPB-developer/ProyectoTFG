"use strict";
console.log("order.js 1.1");
const doOrder = () => {

    const orderContainer = document.getElementById("order-container");
    const cartButton = document.querySelector(".header-cart .icon-cart");
    cartButton.style.pointerEvents = "none";

    if(sessionStorage.getItem("cart")){
        mostrarPedido();
        console.log("sessionStorage.getItem('cliente')",sessionStorage.getItem("cliente"));

        if(sessionStorage.getItem("cliente")){
            const botonCompletarPedido = document.createElement("button");
            botonCompletarPedido.classList.add("buy-botton");
            botonCompletarPedido.textContent = "Completar pedido";
            botonCompletarPedido.addEventListener("click", (e) =>{
                e.preventDefault();
                guardarPedido();
            });

            console.log("botonCompletarPedido",botonCompletarPedido);
            orderContainer.append(botonCompletarPedido);
        }else{
            mostrarAvisoLogin();
        }
    }else{
        console.log("Carro vacio");
    }

    function mostrarPedido(){
        const cartStorage = JSON.parse(sessionStorage.getItem("cart"));
        let total = 0;
        const table = document.createElement("table");
        const tbody = document.createElement("tbody");

        cartStorage.forEach((product) => {
            const precioTotalProducto = parseFloat(product.price) * parseInt(product.quantity);
            total += precioTotalProducto;
            tbody.innerHTML += `<tr><td><img src='${urlImagesGlobal}/products/${product.image}'</td><td>${product.name}</td><td>${product.price.toLocaleString("es-ES",{style:"currency", currency: "EUR"})}</td><td> x ${product.quantity}</td><td>${precioTotalProducto.toLocaleString("es-ES", {style: "currency", currency:"EUR",})}</td></tr>`;
        });
        tbody.innerHTML += `<tr><td colspan=4></td><td class="importe-total">${total.toLocaleString("es-ES", {style:"currency", currency:"EUR"})}</td></tr>`;
        table.append(tbody);
        orderContainer.append(table);
        console.log(cartStorage);
    }

    function guardarPedido(){
        const orderData = [];
        orderData.push(sessionStorage.getItem("cart"));
        orderData.push(sessionStorage.getItem("cliente"));
        console.log(orderData);
        fetch(urlApiGlobalSendOrder, {
            method: "POST",
            body: JSON.stringify(orderData),
        })
        .then((response) => response.json())
        .then((data) => {
            //doModal("success", data, "");
            myCart.resetCart();
        })
        .catch((error) => {
            //doModal("error", error, "");
        });
    }

    function mostrarAvisoLogin(){
        const avisoLogin = document.createElement("p");
        avisoLogin.textContent = "Para completar el pedido debes estar registrado y logado";
        const botonToLogin = document.createElement("button");
        botonToLogin.textContent = "Ir al login";
        botonToLogin.classList.add("buy-button");
        botonToLogin.addEventListener("click", () =>{
            window.location.href = "../login/";
        });
        orderContainer.append(avisoLogin, botonToLogin);
    }
};

doOrder();