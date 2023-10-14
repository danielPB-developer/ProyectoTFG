class MiniaturaProducto{
  id;
  name;
  idCategory;
  category;
  description;
  price;
  stock;
  offer;
  idBrand;
  brand;
  images;
  destacado;
  contenedor = document.createElement("div");
  boton = document.createElement("button");

  constructor(producto){
      this.id = producto.id;
      this.name = producto.name;
      this.idCategory = producto.id_category;
      this.category = producto.category_name;
      this.description = producto.description;
      this.price = producto.price;
      this.stock = producto.stock;
      this.offer = producto.offer;
      this.idBrand = producto.id_brand
      this.brand = producto.brand_name;
      this.images = producto.images.split(",");
      console.log(this.images)
      this.destacado = producto.destacado;
      this.contenedor.classList.add("miniatura-producto");
      if(this.destacado == 1){
        this.contenedor.classList.add("destacado");
      }
      if(this.offer == 1){
        this.contenedor.classList.add("oferta");
      }
      this.boton.classList.add("boton-comprar");
      this.boton.textContent = "Comprar"; 
      this.boton.addEventListener("click",(e)=>{
        e.preventDefault();
        myCart.addToCart(this); // la funcion esta en cart_class.js 
      });

      const precioEnteros = Math.floor(parseFloat(this.price));
      const precioDecimales = parseFloat(this.price % 1).toFixed(2).slice(-3);

      this.contenedor.innerHTML = ` <a href='../../pages/details/index.html?id_producto=${this.id}'> <img src='https://www.pixelandbyte.es/curso_IFCD55/shop/images/products/${this.images[0]}' /></a>`;
      this.contenedor.innerHTML += `<p class='miniatura-nombre'><a href='../../pages/details/index.html?id_producto=${this.id}'>${this.name}</a></p>`;
      this.contenedor.innerHTML += `<p class='miniatura-precio'>${this.price}€</p>`;
      this.contenedor.innerHTML += `<p class='miniatura-descripcion'>${this.description}</p>`;
      this.divMarcaCategoria = document.createElement("div");
      this.divMarcaCategoria.classList.add("miniatura-marca-categoria");
      this.divMarcaCategoria.innerHTML = `<a class='categoria' href='../../pages/list/index.html?filtroType=marca&filtro=${this.idBrand}'>${this.brand}</a>`;
      this.divMarcaCategoria.innerHTML += `<a class='marca' href='../../pages/list/index.html?filtroType=categoria&filtro=${this.idCategory}'>${this.category}</a>`; 


      this.contenedor.append(this.divMarcaCategoria,this.boton)
  }
}