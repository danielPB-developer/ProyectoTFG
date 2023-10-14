"use strict";
console.log("session.js 1.1");

const doSession = () =>{
    if(sessionStorage.getItem("cliente")){
        const session = sessionStorage.getItem("cliente");
        const sessionNombre = JSON.parse(session).nombre;
        const userNameContainer = document.createElement("p");
        userNameContainer.textContent = sessionNombre;

        document.querySelector(".header-users").classList.add("logado");
        document.querySelector(".header-users").append(userNameContainer);
    }else{
        console.log("no hay sesion iniciada");
    }
};
doSession();