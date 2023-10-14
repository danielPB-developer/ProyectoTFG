"use strict";
console.log("home.js");

const doPortada = ()=>{
    cargarBanners();
    cargarDestacados();
    cargarOfertas()

    function cargarBanners(){
        const sliderContainer = document.getElementById("slider-home");
        fetch(urlApiGlobalBanners).then(response=>response.json()).then(data=>mostrarBanners(data)).then(()=>doSlider("#slider-home"));

        function mostrarBanners(banners){
            return new Promise((resolve,reject)=>{
                banners.forEach(banner => {
                    const newBanner = document.createElement("div");
                    newBanner.classList.add("banner");
                    const newImg = document.createElement("img");
                    newImg.src = "../../../images/banners/" + banner.imagen;
                    const newText = document.createElement("div");
                    newText.classList.add("texto-banner");
                    newText.innerHTML = banner.texto;
                    newBanner.append(newImg, newText);
                    sliderContainer.append(newBanner);
                });
                resolve();
            });
        }
    }

    function cargarDestacados(){
        const destacadoContainer = document.getElementById("lista-destacados");
        fetch(urlApiGlobalProductos).then((response)=>response.json()).then((data)=>mostrarDestacados(data));

        function mostrarDestacados(productos){
            productos.forEach((producto) =>{
                if(producto.destacado == 1){
                    const newProducto = new MiniaturaProducto(producto);
                    destacadoContainer.append(newProducto.contenedor);
                }
            });
        }
    }
    function cargarOfertas(){
        const ofertasContainer = document.getElementById("lista-ofertas");
        fetch(urlApiGlobalProductos).then((response)=>response.json()).then((data)=>mostrarOfertas(data));

        function mostrarOfertas(productos){
            productos.forEach((producto) =>{
                if(producto.offer == 1){
                    const newProducto = new MiniaturaProducto(producto);
                    ofertasContainer.append(newProducto.contenedor);
                }
            });
        }
    }
}

doPortada();