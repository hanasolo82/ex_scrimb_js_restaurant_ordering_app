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
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'
/*para manejar eventos e id hago lo siguiente 
el  addEventList reside como parametro de para una funcion que exporta el id si el id corresponde con el clicado */
const shoppingCarr = [] 


document.addEventListener('click', (e) => {
    /*aqui puedo poner cualquier funcion que quiero que reaccione con el click */
     if(e.target.dataset.id) {
     addShoppingCarr(e.target.dataset.id)
     }
     if(e.target.dataset.quit)
     removeShoppingCarr(e.target.dataset.quit)
})

/*Render zone---------*/

function renderAll() {

const renderMenuArr =   menuArray.map((menu) => {
    const {name, ingredients, id, price, emoji} = menu
        
    return  `<div class="food-box" id="${name}">
                <p class="emoji">${emoji}</p>
                <div class="food-content">    
                    <h2>${name}</h2>
                    <p>${ingredients.join(", ")}</p>
                    <h3>${price} $</h3>
                </div>
                <button type='button' class="food-btn" data-id="${id}">+</button>
             </div>`
         }).join('')

const sectionContainerOrder = shoppingCarr.length > 0? `
<section class="container-order">
                    <h2 class="order-title">Your Order</h2>
                    <ul class="order-ul" id="list-container"> 
                        ${shoppingCarr.map(list => `
                <li class="order-li">
                    <div class="product-name">
                        <h2>${list.name}</h2>
                        <button class="order-remove-btn" data-quit ="${uuidv4()}">remove</button>
                    </div>
                    <div class="product-price">
                        <h2>${list.price}$</h2>
                    </div>
                </li>
                ` 
                ).join('')}
                    </ul>
                    <div class="order-total">
                        <h2>Total Price: </h2>
                        <h2 class="order-sum">
                         ${shoppingCarr.reduce((total, product) =>  total + product.price, 0)} $
                        </h2>
                    </div>
                    <button class="order-complete-btn">Complete order</button>
                </section> ` : ``

 return document.getElementById("main").innerHTML = `

                <section class="container-menu">
                    ${renderMenuArr}             
                </section>
                    ${sectionContainerOrder}
                `
}


/*isProduct confirma si ya hay algun elemento añadido a la cesta, lo que permite renderizarla */

function addShoppingCarr(productId) {
   
   const product = menuArray.filter(menu=> menu.id === Number(productId))[0]    
        if(product) {
            shoppingCarr.unshift(product)
        }
     renderAll() /*renderiza la lista de los productos añadidos */
}

function removeShoppingCarr(productId){
    const product = shoppingCarr.findIndex(item => item.id != productId)
    
        shoppingCarr.splice(product, 1)
    
    renderAll()

}



renderAll()
/*renderOrder() --------- renderiza con el primer producto añádido*/