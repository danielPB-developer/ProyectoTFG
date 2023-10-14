"use strict"
console.log("listado.js 1.2");

const doListado = ()=>{
  const listadoContainer = document.querySelector("#listado-productos");
  const getFilterParams = ()=>{
    // Obtener la URL actual
    const url = window.location.href;
    // Obtener la parte de la URL después del signo de interrogación (?)
    const queryString = url.split('?')[1];
    // Crear un objeto URLSearchParams a partir de la cadena de consulta
    const params = new URLSearchParams(queryString);
    // Obtener el valor de un parámetro específico
    const filtroTipo = params.get('filtroType');
    const filtroValor = params.get('filtro');
    switch(filtroTipo){
      case "categoria":
        doListadoPorCategoria(filtroValor);
        break;
      case "marca":
        doListadoPorMarca(filtroValor);
        break;
      default:
        break;
    }
  }
  function doListadoPorCategoria(valor){
      const urlProductos = `https://www.pixelandbyte.es/curso_IFCD55/api/products.php?id_categoria=${valor}`;
      fetch(urlProductos).then(response=>response.json()).then(data=>{
        doMiniaturas(data);        
      })
  }
  function doListadoPorMarca(valor){
    const urlProductos = `https://www.pixelandbyte.es/curso_IFCD55/api/products.php?id_marca=${valor}`;
    fetch(urlProductos).then(response=>response.json()).then(data=>{
      doMiniaturas(data);        
    })
  }
  function doMiniaturas(data){
    data.forEach(producto => {
      const newProduct = new MiniaturaProducto(producto);
      listadoContainer.append(newProduct.contenedor);
    });
  }
   getFilterParams();
}
doListado();