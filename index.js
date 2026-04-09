/*Fase 1:
Renderezar data.js, order, modal, message
Inicialmente your order no se ve
tomal control de los bottones, addevent listener generico atendendo a target y confirmando que es ese.
Fase 2:
onclick:
Se crea una lista basada en el renderizado de your order
your order debe incluir una lista y una suma de la lista. 
Fase 3:
Tomar control de remove y quitar de la lista el producto seleccionado

Fase 4:
Tomar control de complete order
onclick-- hacer aparecer el modal
Modal:
Pendiente esta fase*/

import {menuArray} from "./data.js"
/*para manejar eventos e id hago lo siguiente 
el  addEventList reside como parametro de para una funcion que exporta el id si el id corresponde con el clicado */

document.addEventListener('click', (e) => {
  /*la funcion creada fuera se invoca aqui dentro y el parametro es  este */    targetId = e.target.id
    
})


/*Render zone---------*/

function renderMenu() {

 return   menuArray.map((menu) => {
const {name, ingredients, id, price, emoji} = menu
        
    return  `<div class="food-box" id="${name}">
                <p class="emoji">${emoji}</p>
                <div class="food-content">    
                    <h2>${name}</h2>
                    <p>${ingredients.join(", ")}</p>
                    <h3>${price} $</h3>
                </div>
                <button type='button' class="food-btn" id="${id}-btn">+</button>
             </div>`
         }).join('')
}

 document.getElementById("main").innerHTML = `<section class="container-menu">${renderMenu()}</section>`



const renderOrder = () => {
    

}
/*       <section class="container-order">
            <h2 class="order-title">Your Order</h2>
            <ul class="order-ul">
                <li class="order-li">
                    <div class="product-name">
                        <h2>Pizza</h2>
                        <button class="order-remove-btn">remove</button>
                    </div>
                    <div class="product-price">
                        <h2>$14</h2>
                    </div>
                </li>
            </ul>
            <div class="order-total">
                <h2>Total Price: </h2>
                <h2 class="order-sum">$14</h2>
            </div>
            <button class="order-complete-btn">Complete order</button>
        </section> */