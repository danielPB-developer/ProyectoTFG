"use strict"
console.log("categorias.js 1.1");

const doCategorias = ()=>{
  const miMain = document.querySelector("main");
  const contenedorCategorias = document.querySelector("#listado-categorias")
  class Categoria {
    id;
    name;
    img;
    contenedor = document.createElement("a");
    label = document.createElement("p");
    constructor(categoria){
      this.id = categoria.id;
      this.name = categoria.name;
      this.label.textContent = categoria.name;
      this.img = document.createElement("img");
      this.img.setAttribute("src","../../images/categories/"+categoria.imagen);
      this.contenedor.setAttribute("href", "../../pages/list/index.html?filtroType=categoria&filtro="+this.id);
      this.contenedor.classList.add("miniatura-categoria");
      this.contenedor.append(this.label,this.img)
    }
  }
  const urlCategorias = "https://www.pixelandbyte.es/curso_IFCD55/api/categories.php";
  fetch(urlCategorias).then(response=>response.json()).then(data=>{
    console.log(data);
    data.forEach(categoria => {
      const newCategoria = new Categoria(categoria);
      contenedorCategorias.append(newCategoria.contenedor);
   });
   miMain.append(contenedorCategorias)
  })
}
doCategorias();