const cartSidebarEl = document.querySelector('.cart-sidebar')
function openSidebar (event){
    event.stopPropagation()
    cartSidebarEl.classList.add('cart-sidebar-open')    
}
function closeSidebar () {
cartSidebarEl.classList.remove('cart-sidebar-open')
}
const btnCartlEl = document.getElementById('btn-cart')
btnCartlEl.addEventListener('click', openSidebar)
const btnCloseCartlEl = document.querySelector('#btn-close-cart')
btnCloseCartlEl?.addEventListener('click', closeSidebar)
document.addEventListener('click', closeSidebar)
cartSidebarEl?.addEventListener('click', (event) => {
    event.stopPropagation()
})
const btnaddmoreitens = document.querySelector('#btn-add-more-itens')
btnaddmoreitens?.addEventListener('click', closeSidebar)

const groupsRootel = document.querySelector('#groups-root')
const fetchProducts = () => {
   fetch('/products.json')
   .then (result => result.json())
   .then(data =>{
       groupsRootel.innerHTML =''
       data.groups.forEach((group) => {
           const groupSectionEl = getsectionelement(group)
           groupsRootel.appendChild(groupSectionEl)
       })
    })
   .catch(() => {
       groupsRootel.innerHTML = '<p class = "error-alert">Falha ao buscar produtos. Por favor, tente novamente.</p>'
   })
}
const getsectionelement = (group) =>{
    const sectionEl = document.createElement('section')
    const sectionTitleEl = document.createElement('h2')
    sectionTitleEl.textContent = group.name
    sectionEl.appendChild(sectionTitleEl)
    const productsGridEl = document.createElement('div')
    productsGridEl.classList.add('products-grid')
    sectionEl.appendChild(productsGridEl) 
    group.products.forEach((product) => { 
        console.log(product)
        const cardWrap = document.createElement('article')
        cardWrap.classList.add('card')
        cardWrap.innerHTML = `
        <img src="${product.image}" alt="${product.name}" width="316" height="193"/>
        <div class="card-content">
        <h3>${product.name}</h3>
        <p class="price">R$${product.price.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</p>
        <p>${product.description}</p>
        <button class="btn btn-main btn-adicionar">Adicionar</button>
        </div>
        `
        const btnAddCartEl = cardWrap.querySelector('button')
        btnAddCartEl.addEventListener('click',() =>{
            addToCart(product)
        })
        productsGridEl.appendChild(cardWrap)
    })
   return sectionEl
 }
 if (groupsRootel){
fetchProducts()
 }

let productsCart = []
const saveProducts = localStorage.getItem('productsCart')
if (saveProducts) {
productsCart = JSON.parse(saveProducts)
}
const addToCart = (newproduct) =>{
    const productIndex = productsCart.findIndex(
        item => item.id === newproduct.id
        )
    if(productIndex === -1){
        productsCart.push({
            ...newproduct,
            qty:1
        })
    } else {
        productsCart[productIndex].qty++
    }
    handleCartUpdate()
}
const removeofcart = id => {
   productsCart =  productsCart.filter((product) => {
        if (product.id === id){
            return false
        }
        return true 
    })
 handleCartUpdate()
 if (productsCart.length === 0) {
     closeSidebar()
 }
}
const updateItemQty = (id, newqty) => {
    const newQtynumber = parseInt(newqty)
    if (isNaN(newQtynumber)){
        return
    }
    if (newQtynumber > 0){
    const productIndex = productsCart.findIndex((product) => {
        if (product.id === id){
        return true
        }
        return false
    })
    productsCart[productIndex].qty = parseInt(newqty)
    handleCartUpdate(false)
    }else {
        removeofcart(id)
    }
}
const handleCartUpdate = (renderitens = true) => {
    // LocalStorage
    const productsCartString = JSON.stringify
    (productsCart)
    localStorage.setItem('productsCart', productsCartString)
    const emptyCart = document.querySelector('#empty-cart')
    const cartWithProducts = document.querySelector('#cart-with-products') 
    const cartProductsList = cartWithProducts.querySelector('ul')
    const CartBadge = document.querySelector('.btn-cart-badge')
    if (productsCart.length > 0) {
        //  Calcula total do carrinho
        let total = 0 
        let totalprice = 0 
        productsCart.forEach(product => {
            total = total + product.qty
            totalprice = totalprice + product.price * product.qty
        })       
        // atualizacao da badge
     CartBadge.classList.add('btn-cart-badge-show')
     CartBadge.textContent = total
    //  Atualizar o total do carrinho
     const cartTotal = document.querySelector('.cart-total p:last-child')
     cartTotal.textContent = totalprice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    //  exibir carrinho com produtos
    cartWithProducts.classList.add
    ('cart-with-products-show')
    emptyCart.classList.remove('empty-cart-show')
    // Exibir produtos do carrinho
    if (renderitens) {
    cartProductsList.innerHTML= ' '
    productsCart.forEach((product)=> {
        const listItem = document.createElement('li')
        listItem.innerHTML = `
        <img src="${product.image}" alt="${product.name}" width="70" height="70" />
        <div>
          <p class="h3">${product.name}</p>
          <p class="price">R$ ${product.price.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</p>
        </div>
        <input class="form-input" type="number" value="${product.qty}" />
        <button>
          <i class="fa-solid fa-trash-can"></i>
        </button>
        `
        const btnRemoveEl = listItem.querySelector('button')
        btnRemoveEl.addEventListener('click', () => {
          console.log('clicou em mim')
          removeofcart(product.id)
       })
       const inputQty = listItem.querySelector('input')
        inputQty .addEventListener('keyup', (event) => {
          updateItemQty(product.id, event.target.value)
        })
        inputQty .addEventListener('keydown', (event) => {
          if (event.key === '-' || event.key === '.' || event.key === ',') {
            event.preventDefault()
          }
        })
        inputQty.addEventListener('change', (event) => {
          updateItemQty(product.id, event.target.value)
        })
        cartProductsList.appendChild(listItem)
    })
}
    }else{
        // esconder badge
        CartBadge.classList.remove('btn-cart-badge-show')
//  exibir carrinho vazio
emptyCart.classList.add('empty-cart-show')
cartWithProducts.classList.remove('cart-with-products-show')
    }
}
handleCartUpdate()
window.addEventListener('storage', (event) => {
    if (event.key === 'productsCart'){
        productsCart = JSON.parse(event.newValue)
 handleCartUpdate
    }
})

const formCheckout = document.querySelector('.form-checkout')
formCheckout?.addEventListener('submit', (event) => {
    event.preventDefault()
    if(productsCart.length == 0){
        alert('Nenhum produto no carrinho.')
        return
    }
    let text = 'Confira o pedido abaixo:\n---------------------------------------\n\n'
  let total = 0
  productsCart.forEach(product => {
    text += `*${product.qty}x ${product.name}* - ${product.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}\n`
    total += product.price * product.qty
  })
  text += '\n*Taxa de entrega:* A combinar\n'
  text += `*Total: ${total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}*`
  text += '\n---------------------------------------\n\n'
  text += `*${formCheckout.elements['input-name'].value}*\n`
  text += `${formCheckout.elements['input-phone'].value}\n\n`
  text += `${formCheckout.elements['input-address'].value}, ${formCheckout.elements['input-number'].value}`
  const complement = formCheckout.elements['input-complement'].value
  if (complement) {
    text+= ` - ${complement}`
  }
    text += `\n${formCheckout.elements['input-neighborhood'].value}, ${formCheckout.elements['input-city'].value}\n`
    text += formCheckout.elements['input-cep'].value
    const subdomain = window.innerWidth > 768 ? 'web' : 'api'
    window.open(`https://${subdomain}.whatsapp.com/send?phone=5521996585647&text=${encodeURI(text)}`,'blank')
})

if (typeof IMask !== 'undefined') {
    const inputPhoneEl = document.querySelector('#input-phone')
    IMask(inputPhoneEl, {
      mask: '(00) 00000-0000'
    })
    const inputCepEl = document.querySelector('#input-cep')
    IMask(inputCepEl, {
      mask: '00000-000'
    })
  }