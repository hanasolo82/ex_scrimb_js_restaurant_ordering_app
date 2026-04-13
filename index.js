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
const confirmForm = document.getElementById("confirm-form")
const submitBtn = document.getElementById("submit-btn")
const targetInput = document.getElementById("card-input")
const inputContainer = document.getElementById("input-field")
 

const shoppingCarr = [] 

/*  adding and removing  items from shopping card ---------------------------------------------*/
document.addEventListener('click', (e) => {
    /*aqui puedo poner cualquier funcion que quiero que reaccione con el click */
     if(e.target.dataset.id) {
     addShoppingCarr(e.target.dataset.id)
     }
     if(e.target.dataset.quit)
     removeShoppingCarr(e.target.dataset.quit)
     if(e.target.dataset.call) {
        renderModal()
     }
})

function addShoppingCarr(productId) {
    const product = menuArray.filter(menu=> menu.id === Number(productId))[0]    
        if(product) {
            shoppingCarr.unshift(product)
        }
    renderAll() /*renderiza la lista de los productos añadidos */
}
function removeShoppingCarr(productId){
    const index = shoppingCarr.findIndex(item => item.id == productId)
    shoppingCarr.splice(index, 1)
    renderAll()/*renderiza la lista de los productos quitados */
}

/*form and inputs field ---------------------------------------------*/



/*format target input field-----it's from chatGpt not mine*/
targetInput.addEventListener("input", (e) =>{
    const cursor = e.target.selectionStart
        let value = e.target.value.replace(/\D/g, '').slice(0, 16)
        let formatted = value.match(/.{1,4}/g)?.join(' ') || ''
        e.target.value = formatted

    // reubicar cursor 
    e.target.setSelectionRange(cursor, cursor)

})


/*Render zone---------*/


function renderModal() {
document.getElementById("modal").classList.toggle("display")
submitBtn.disabled = false


    submitBtn.addEventListener("click", (e) => {
         if (!confirmForm.checkValidity()) {
        
        return // deja que el navegador muestre error
    }
        e.preventDefault()
        submitBtn.disabled = true
        const confirmFormData = new FormData(confirmForm)
        const  inputName = confirmFormData.get("name-input")

        const loadindDots = `
        
                <h2 id="input-title">Your order is comming...</h2>
                <img src="https://media.tenor.com/aTBicXrcp70AAAAi/loading-discord-grey.gif">`

        inputContainer.innerHTML = loadindDots
        
        setTimeout(()=> {

            inputContainer.innerHTML = `
                    <h2 id="input-title">Hitting the food..</h2>
                    <img src="https://media.tenor.com/aTBicXrcp70AAAAi/loading-discord-grey.gif">`

            shoppingCarr.length = 0
        
            setTimeout(()=> {
                document.getElementById("modal").classList.toggle("display")
                document.getElementById("container-order").innerHTML = `
                    <div class="thanks-message">
                        <p>Thanks ${inputName},! Your order is on its way!</p>
                    </div>

                `
            
            }, 3000)


        }, 1000)
       
        
    })
    
}



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
<section class="container-order" id="container-order">
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
                    <button class="order-complete-btn" id="complete-btn" data-call=${uuidv4()}>Complete order</button>
                </section> ` : ``            

 return document.getElementById("main").innerHTML = `

                <section class="container-menu">
                    ${renderMenuArr}             
                </section>
                    ${sectionContainerOrder}
                `
}

renderAll()
/*renderOrder() --------- renderiza con el primer producto añádido*/