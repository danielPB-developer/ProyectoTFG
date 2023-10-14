"use strict";
console.log("cool_carousel.js 1.1");

const doCaruosels = (identificador) =>{

  const carousels = document.querySelectorAll(identificador);

  carousels.forEach((carousel)=>{
    console.log(carousel);
    const elementosVisibles = carousel.dataset.view;
    const stepDimension = carousel.dataset.step;
    const carouselWidth = carousel.offsetWidth;
    
    const viewer = carousel.firstElementChild;
    const viewerElements = viewer.children;
    const viewerElementsLength = viewerElements.length;

    const viewerElemetWidth = carouselWidth / elementosVisibles;

    const viewerWidth = (( viewerElemetWidth * 100 ) / carouselWidth) * viewerElementsLength; // pasamos a porcentaje el ancho de viewer
    const stepWidth = (viewerElemetWidth * 100 * stepDimension) / carouselWidth; // pasomos a porcentaje el tamaño del paso


    const maxSteps = Math.ceil((viewerElementsLength - elementosVisibles) / stepDimension); // calcula sin decimales los pasos máximos del carousel
    
    let stepActual = 1;
    
    const iconPrev = document.createElement("i");
    const iconNext = document.createElement("i");


    const init = ()=>{

      iconPrev.classList.add("icon-prev" , "hide");
      iconNext.classList.add("icon-next");
      iconPrev.textContent = '<';
      iconNext.textContent = '>';
    
      carousel.append(iconNext,iconPrev);
      iconNext.addEventListener("click", ()=>{ move("next") });
      iconPrev.addEventListener("click", ()=>{ move("prev") });

      viewer.style.width = viewerWidth + "%";

    }

    const move = (direction) =>{
      if(direction == "next" && stepActual <= maxSteps){
        viewer.style.left = -stepWidth * stepActual + "%";
        ++stepActual;
        iconPrev.classList.remove('hide');
        if(stepActual > maxSteps){
          iconNext.classList.add('hide');
        }
      }
      if(direction == "prev" && stepActual >= 1){
        --stepActual;
        viewer.style.left = -stepWidth * (stepActual - 1) + "%";
        iconNext.classList.remove('hide');
        if(stepActual <= 1){
          iconPrev.classList.add('hide');
        }
      }
    }

    init();

  
  });


}

//doCaruosels(".cool-carousel");