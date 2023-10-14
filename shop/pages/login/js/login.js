"use strict";
console.log("login.js 1.1");

const doLogin = () => {
    const session = sessionStorage.getItem("cliente");
    const loginForm = document.getElementById("loginForm");

    if(!session){
        loginForm.addEventListener("submit", (e) =>{
            e.preventDefault();
            let formData = new FormData(loginForm);
            fetch(urlApiGlobalLogin, {
                method: "POST",
                body: formData,
            })
            .then((response) => {
                if(response.ok){
                    response.json()
                    .then((data) =>{
                        if(data[0].nombre){
                            console.log(data);
                            const fecha = new Date;
                            const year = fecha.getFullYear();
                            const month = String(fecha.getMonth() + 1).padStart(2, '0');
                            const day = String(fecha.getDate()).padStart(2, '0');
                            const fechaEnFormato = `${year}-${month}-${day}`;
    
                            sessionStorage.setItem("cliente",JSON.stringify({
                                nombre:data[0].nombre,
                                id:data[0].id,
                                token:data[1],
                                fecha:fechaEnFormato
                            }));
    
                            /*sessionStorage.setItem("token", data[1]);
                            sessionStorage.setItem("cliente", data[0].nombre);
                            sessionStorage.setItem("id_cliente", data[0].id);*/
    
                            const userNameContainer = document.createElement("p");
                            userNameContainer.textContent = data[0].nombre;

                            document.querySelector(".header-users").classList.add("logado");
                            document.querySelector(".header-users").append(userNameContainer);
    
                            let nuevoCliente = `<div class='modal-cliente'>`;
                            nuevoCliente += `<h4 class='cool-modal-message'>Bienvenido ${data[0].nombre}</h4>`;
                            nuevoCliente += `<h4 class='cool-modal-message'>Tu token ${data[1]}</h4>`;
                            nuevoCliente += `</div>`;
                            //doModal("success", "", nuevoCliente);
                            window.location.href = window.location.href;

                        }else{
                            let errorMostrar4 = "el usuario y/o la clave no son correctos";
                            throw new Error(errorMostrar4);
                        }
                    })
                    .catch((error) => {
                        console.log("error 1:", error);
    
                        let nuevoCliente = `<div class='modal-cliente'>`;
                        nuevoCliente += `<h4 class='cool-modal-message'> ${error}</h4>`;
                        nuevoCliente += `<p>Vuelve a intentarlo mas tarde</p>`;
                        nuevoCliente += `</div>`;
                        //doModal(("error"), "", nuevoCliente);
                    });
                }else{
                    let errorMostrar = "Ha ocurrido un error en la conexion con el servidor";
                    throw new Error(errorMostrar);
                }            
            })
            .catch(function(errorCode){
                console.log("error2", errorCode);
                let nuevoCliente = `<div class='modal-cliente'>`;
                nuevoCliente += `<h4 class='cool-modal-message'> ${errorCode}</h4>`;
                nuevoCliente += `<p>Vuelve a intentarlo mas tarde</p>`;
                nuevoCliente += `</div>`;
                //doModal(("error"), "", nuevoCliente);
            });
        });
    }else{
        document.querySelector("h1").textContent = "Area Privada";
        loginForm.innerHTML = `<h3>Usuario ${JSON.parse(session).nombre} ya esta logado</h3>`;

        const botonLogOut = document.createElement("button");

        botonLogOut.classList.add("boton-logout");
        botonLogOut.textContent = "Cerrar sesion";

        botonLogOut.addEventListener("click", (e)=>{
            e.preventDefault();
            sessionStorage.removeItem("cliente");
            window.location.href = window.location.href;
        });
        loginForm.append(botonLogOut, document.createElement("hr"));
    
        fetch(urlApiGlobalGetOrder + JSON.parse(session).id)
        .then(res=>res.json())
        .then(dat=>{
            console.log(dat);
            dat.forEach(pedido => {
                let total = 0;

                const table = document.createElement("table");
                table.classList.add("tabla-pedido", "cool-toggle-container");

                const thead = document.createElement("thead");
                thead.classList.add("cool-toggle-element-header");

                const tbody = document.createElement("tbody");
                tbody.classList.add("cool-toggle-element-content");

                const idPedido = pedido.id;
                const fechaPedido = pedido.fecha;
                const contenedorRow = document.createElement("tr");

                contenedorRow.classList.add("titular");

                contenedorRow.innerHTML = `<th>Referencia: ${idPedido}</th><th>Fecha: ${fechaPedido}</th>`;
                contenedorRow.innerHTML += `<th colspan=4></th>`;

                thead.append(contenedorRow);

                pedido.items.forEach(producto =>{
                    const precioTotalProducto = parseFloat(producto.precio_producto) * parseInt(producto.cantidad_producto);
                    total += precioTotalProducto;
                    const rowProducto = document.createElement("tr");
                    rowProducto.innerHTML += `<td><img src=${urlImagesGlobal}/products/${producto.imagen_producto}></td>`;
                    rowProducto.innerHTML += `<td>${producto.nombre_producto}</td>`;
                    rowProducto.innerHTML += `<td>${parseFloat(producto.precio_producto).toLocaleString("es-ES",{style:"currency", currency: "EUR"})}</td>`;
                    rowProducto.innerHTML += `<td> x ${producto.cantidad_producto}</td>`;
                    rowProducto.innerHTML += `<td>${precioTotalProducto.toLocaleString("es-ES", {style:"currency", currency: "EUR"})}</td>`;
                    tbody.append(rowProducto);
                    console.log(producto);
                });
                tbody.innerHTML += `<tr>
                <td colspan="3" style="background-color:white"><button class="buy-button">Volver a comprar</button></td>
                <td class="importe-total">${total.toLocaleString("es-ES",{ style:"currency", currency: "EUR"})}</td>
                </tr>`;
                table.append(thead,tbody);
                const botonComprar = tbody.querySelector(".buy-button");
                botonComprar.addEventListener("click", e=>{
                    e.preventDefault();
                    const orderData = [];
                    const ArrayProductos = pedido.items.map((producto)=>{
                        const productToNewPedido = {
                            id: producto.id_producto,
                            name: producto.nombre_producto,
                            price: producto.precio_producto,
                            image: producto.imagen_producto,
                            quantity: producto.cantidad_producto,
                        };
                        return productToNewPedido;
                    });
                    orderData.push(JSON.stringify(ArrayProductos));
                    orderData.push(session);
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
                        console.log("error", error)
                    });
                })
                loginForm.append(table);
            });


        })
        .catch(error=>console.log(error));
    }
    
}

doLogin();

/**/