"use strict"
console.log("registro.js 1.1");

const doRegistro = () =>{
    document.getElementById("registroForm").addEventListener("submit", function (event){
        event.preventDefault(); // Evita que el formulario se envie por defecto

        var form = event.target;
        var formData = new FormData(form);
        console.log("formData", formData);

        fetch(form.action, {
            method: "POST",
            body: formData,
        })
        .then(function (response) {
            if(response.ok){
                let nuevoCliente = `<div class='modal-cliente'>`;
                nuevoCliente += `<h4 class='cool-modal-message'>Bienvenido ${formData.get("nombre")}</h4>`;
                nuevoCliente += `<p>Tu registro se ha completado correctamente</p>`;
                nuevoCliente += `</div>`;
                //doModal("success", "", nuevoCliente);
                form.reset(); // Limpiar el formulario
            }else{
                throw new Error(response.statusText);
            }
        })
        .catch(function (error){
            let nuevoCliente = `<div class='modal-cliente'>`
            nuevoCliente += `<h4 class='cool-modal-message'>A ocurrido un error de tipo ${error}</h4>`;
            nuevoCliente += `<p>La conexion con la base de datos se ha perdido</p>`
            nuevoCliente += `<p>Vuelve a intentarlo mas tarde</p>`;
            nuevoCliente += `</div>`;
            //doModal("error", "", nuevoCliente);
        })
    });
};
doRegistro();