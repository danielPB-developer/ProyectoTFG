"use strict"
console.log("marcas.js 1.1");

const doMarcas = ()=>{
  const miMain = document.querySelector("main");
  const contenedorMarcas = document.querySelector("#listado-marcas")
  class Marca {
    id;
    name;
    img;
    contenedor = document.createElement("a");
    label = document.createElement("p");
    constructor(marca){
      this.id = marca.id;
      this.name = marca.name;
      this.label.textContent = marca.name;
      this.img = document.createElement("img");
      this.img.setAttribute("src","../../images/brands/"+marca.imagen);
      this.contenedor.setAttribute("href", "../../pages/list/index.html?filtroType=marca&filtro="+this.id);
      this.contenedor.classList.add("miniatura-marca");
      this.contenedor.append(this.label,this.img)
    }
  }
  const urlMarcas = "https://www.pixelandbyte.es/curso_IFCD55/api/brands.php";
  fetch(urlMarcas).then(response=>response.json()).then(data=>{
    console.log(data);
    data.forEach(marca => {
      const newMarca = new Marca(marca);
      contenedorMarcas.append(newMarca.contenedor);
   });
   miMain.append(contenedorMarcas)
  })
}
doMarcas();