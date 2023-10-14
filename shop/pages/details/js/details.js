"use strict";
console.log("ficha.js 1.1");

const doFicha = () => {
  console.log("fichando");
    // Obtener la URL actual
    const url = window.location.href;
    // Obtener la parte de la URL después del signo de interrogación (?)
    const urlParamsString = url.split("?")[1];
    // Crear un objeto URLSearchParams a partir de la cadena de consulta
    const params = new URLSearchParams(urlParamsString);
    // Obtener el valor de un parámetro específico
    const idProducto = params.get("id_producto");

    const urlApi =
      "https://www.pixelandbyte.es/curso_IFCD55/api/products.php?id_producto=" +
      idProducto;
    fetch(urlApi)
      .then((response) => response.json())
      .then((data) => {procesarFicha(data[0])});

    function procesarFicha(producto){
      console.log(producto);
      
      const contenedorThumbs = document.querySelector("#thumbs-container .cool-carousel-viewer");
      
     
      const contenedorRelacionados = document.querySelector("#ficha-producto-relacionados");

      //imagen principal
      const contenedorImagenPrincipal = document.querySelector("#imagen-principal-container");
      const imagenPrincipal = document.createElement("img");
      let productImages = producto.images.split(",");
      imagenPrincipal.src = "/images/products/"+productImages[0];
      contenedorImagenPrincipal.append(imagenPrincipal);

      if(productImages.length > 1){
     
        function rellenarMiniaturas (){
          return  new Promise((resolve,reject)=>{
            productImages.forEach((thumb,index) => {
              const imagenThumbContainer = document.createElement("div");
              const imagenThumb = document.createElement("img");
              imagenThumb.src = "/images/products/"+thumb;
              if(index==0){
                imagenThumb.classList.add("selected");
              }
              imagenThumb.addEventListener("click",()=>{
                let actualSelected = document.querySelector("#thumbs-container .selected");
                actualSelected.classList.remove("selected");
                imagenPrincipal.src="/images/products/"+thumb;
                imagenThumb.classList.add("selected");
              })
              imagenThumbContainer.append(imagenThumb);
              contenedorThumbs.append(imagenThumbContainer);          
            });
          })
        }

        rellenarMiniaturas().then(doCaruosels(".cool-carousel"));
        
      }
      function rellenarRelacionados(){
        return new Promise((resolve, reject)=>{
          const promises = relatedProducts.map((relatedProducts)=>{
            const urlRelated = "https://www.pixelandbyte.es/curso_IFCD55/api/products.php?id_producto="+relatedProducts;
          })
        })
      }

      function montarMiniaturas(miniaturas, imagenPrincipal){
        return new Promise((resolve, reject) => {
          const promesas = miniaturas.map((miniatura)=>{
            return new Promise((resolve, reject)=>{
              const nuevaMiniatura = document.createElement("img");
              nuevaMiniatura.src = "https://www.pixelandbyte.es/curso_IFCD55/api/products.php?id_producto="+miniatura;
              nuevaMiniatura.addEventListener("click", ()=>{
                imagenPrincipal.src = miniatura; // mas cosas
              });
              thumbsContainer.append(nuevaMiniatura);
              nuevaMiniatura.addEventListener("load", resolve);
              nuevaMiniatura.addEventListener("error", reject);
            });
          });
          Promise.all(promesas).then(()=>resolve()).catch((error)=>reject(error));
        });
      }

      function montarRelacionados(relacionados){
        console.log("relacionados", relacionados);
        relacionados.forEach(relacionados=>{
          const apiReladed = "https://www.pixelandbyte.es/curso_IFCD55/api/products.php?id_producto="+relacionados;
          fetch(apiReladed).then(response=>response.json()).then(data=>{
            console.log(data[0]);
            const nuevoRelacionado = new MiniaturaProducto(data[0]);
            relacionadosContainer.append(nuevoRelacionado.contenedor);
          }).catch((error) => reject(error));
        });
        Promise.all(promesas).then(()=>{
          resolve();
        }).catch(error=>reject(error));
        doCaruosels("#");
      }

      // descripcion
      const contenedorDescripcion = document.querySelector("#producto-stock");
      contenedorDescripcion.innerHTML = producto.description;
      // detalles
      const productoNombre = document.querySelector("#producto-nombre");
      productoNombre.innerHTML =producto.name;

      const productoPrecio = document.querySelector("#producto-precio");
      productoPrecio.innerHTML =  `Precio: <span>${producto.price}€</span>`;

      const productoMarca = document.querySelector("#producto-marca");
      productoMarca.setAttribute("href","../../pages/list/index.html?filtroType=marca&filtro="+producto.id_brand);
      productoMarca.textContent = producto.brand_name;

      const productoCategoria = document.querySelector("#producto-categoria");
      productoCategoria.setAttribute("href","../../pages/list/index.html?filtroType=categoria&filtro="+producto.id_category)
      productoCategoria.textContent = producto.category_name;
    }

};
doFicha();
