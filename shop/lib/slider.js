"use strict";
console.log("slider.js 1.4");

function cl(mensaje){
  console.log(mensaje);
}

const doSlider = (identificador)=>{
  const sliders = document.querySelectorAll(identificador);
  let actualPosition = 0;
  sliders.forEach(slider=>{
    
    const elements = Array.from(slider.children);
    const viewer = document.createElement("div");
    const viewerWidth = elements.length + 1;
    const maxPosition = elements.length + 1;
    const clonedElement = elements[0].cloneNode(true);// clonamos el primer elemento
    const handlerPrev = document.createElement("div");
    const handlerNext = document.createElement("div");
    
    let intervaloAutoMove = setInterval(autoMove, 2000); // declaramos un intervalo para ejecutar el movimiento automático

    handlerNext.classList.add("handler-next");
    handlerPrev.classList.add("handler-prev");

    handlerNext.addEventListener("click",()=>{
      move("next");
    });
    handlerNext.addEventListener("mouseenter",()=>{
      clearInterval(intervaloAutoMove);
    });
    handlerNext.addEventListener("mouseleave",()=>{
      intervaloAutoMove = setInterval(autoMove, 2000);
    });
    handlerPrev.addEventListener("click",()=>{
      move("prev");
    });
    handlerPrev.addEventListener("mouseenter",()=>{
      clearInterval(intervaloAutoMove);
    });
    handlerPrev.addEventListener("mouseleave",()=>{
      intervaloAutoMove = setInterval(autoMove, 2000);
    });
    viewer.classList.add("cool-slider-viewer");
    viewer.style.left = 0;

    elements.push(clonedElement);//añadimos el primer elemento clonado a la lista de elementos
    
    elements.forEach(element=>{ // recorremos la lista de elementos y los añadimos al contenedor
      viewer.appendChild(element);
    });

    slider.append(viewer,handlerPrev,handlerNext);
    viewer.style.width = (viewerWidth * 100) + "%";    

    // eventos de control de animación automática
    viewer.addEventListener("mouseenter",()=>{
      clearInterval(intervaloAutoMove);
    });
    viewer.addEventListener("mouseleave",()=>{
      intervaloAutoMove = setInterval(autoMove, 2000);
    });

    //funcion de animación automática
    function autoMove(){      
      ++actualPosition;

      //cl("prev automove: "+actualPosition)
      if(actualPosition < maxPosition){
        viewer.style.left = (-100 * actualPosition) + "%";        
      }else{
        viewer.style.transition = "none";
        viewer.style.left = 0;        
        actualPosition = 1;
        setTimeout(()=>{
          viewer.style.transition = "left .5s";
          viewer.style.left = (-100 * actualPosition) + "%";             
        }, 100);        
      }
      //cl("post automove: "+actualPosition)
    }

    function move(direction){
          
      if(direction == "next"){
        ++actualPosition;
        cl("pre move: "+actualPosition);
        if(actualPosition < maxPosition){
          viewer.style.left = (-100 * actualPosition) + "%";
        }else{
          viewer.style.transition = "none";
          viewer.style.left = 0;        
          actualPosition = 1;
          setTimeout(()=>{
            viewer.style.transition = "left .5s";
            viewer.style.left = (-100 * actualPosition) + "%";
          }, 100);
        }
        cl("post move: "+actualPosition);
      }

      if(direction == "prev"){
        cl("prev actualPosition: " + actualPosition);
        if(actualPosition > 0){
          --actualPosition;
          viewer.style.left = (-100 * actualPosition) + "%";
        }else{
          viewer.style.transition = "none";
          actualPosition = maxPosition - 1;
          viewer.style.left = (-100 * actualPosition) + "%";
          setTimeout(()=>{
            viewer.style.transition = "left .5s";
            actualPosition -= 1;
            viewer.style.left = (-100 * actualPosition) + "%";
          },100);
        }
      }
      
    }

  });



}

//doSlider(".cool-slider");