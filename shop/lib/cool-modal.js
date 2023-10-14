"use strict";
console.log("cool-modal 1.3");

const selectorsButtons = {
  success : document.querySelector(".cool-modal-success-button"),
  warning : document.querySelector(".cool-modal-warning-button"),
  error : document.querySelector(".cool-modal-error-button"),
  info : document.querySelector(".cool-modal-info-button")
}

selectorsButtons.success.addEventListener("click", ()=>{
  console.log("success");
  createModal("success","por aqui todo bien","");
});

selectorsButtons.warning.addEventListener("click", ()=>{
  createModal("warning","Ojo con esto","");
  console.log("warning");
});

selectorsButtons.error.addEventListener("click", ()=>{
  console.log("error");
  const htmlContent = "<div class='modal-buttons-inside'><button>volver a intentar</button><button>Salir y corregir</button></div>";
  createModal("error","Esto es un mensaje de error",htmlContent);
})

selectorsButtons.info.addEventListener("click", ()=>{
  console.log("info");
  const htmlContent = "<img src='assets/img/blue-prod.png'>"
  createModal("info","Esto es información relevante sobre el proceso que acabas de realizar",htmlContent);
})

function createModal(type,message,htmlContent){
  const modalBackground = document.createElement("div");
  const modalContainer = document.createElement("div");
  const modalCloseButton = document.createElement("div");
  const modalParraph = document.createElement("p");
  const modalContentHtml = document.createElement("div");
  const body = document.querySelector("body");

  const typeClass = "modal-type-"+type;

  modalBackground.setAttribute("class","cool-modal-background");
  modalContainer.setAttribute("class","cool-modal-container "+typeClass);
  modalCloseButton.setAttribute("class","cool-modal-close-button");
  modalParraph.setAttribute("class","cool-modal-message");
  modalContentHtml.setAttribute("class","cool-modal-htmlcontent");
  
  modalCloseButton.textContent = "X";

  modalCloseButton.addEventListener("click",(event)=>{
    modalBackground.remove();
  });
    
  if(message){
    modalParraph.textContent = message;
    modalContainer.append(modalParraph);
  }
  if(htmlContent){
    modalContentHtml.innerHTML = htmlContent;
    modalContainer.append(modalContentHtml);
  }

  modalContainer.append(modalCloseButton);
  modalBackground.append(modalContainer);
  body.append(modalBackground);
}