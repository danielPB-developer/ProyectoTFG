"use strict";
console.log("routes.js 1.1");

const doNavigation = ()=>{
    const links = {
        "Home" : "/pages/home",
        "Categorias" : "/pages/categories",
        "Marcas" : "/pages/brands",
        "Registro" : "/pages/register",
        "Pedido" : "/pages/order",
        "Cesta" : "/pages/cart",
        "Contacto" : "/pages/contact",
    }

    const navContainer = document.getElementById("nav-principal");
    const ulContainer = document.createElement("ul");

    for(let link in links){
        const newLink = document.createElement("li");
        newLink.classList.add("nav-principal-link");
        const ancla = document.createElement("a");
        ancla.href = links[link];
        ancla.textContent = link;
        newLink.append(ancla);
        ulContainer.append(newLink);
        navContainer.append(ulContainer); 
    }
}
doNavigation();