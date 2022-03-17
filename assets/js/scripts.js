const cartSidebarEl = document.querySelector('.cart-sidebar')
function openSidebar (){
    cartSidebarEl.classList.add('cart-sidebar-open')    
}
function closeSidebar () {
cartSidebarEl.classList.remove('cart-sidebar-open')
}
const btnCartlEl = document.getElementById('btn-cart')
btnCartlEl.addEventListener('click', openSidebar)
const btnCloseCartlEl = document.querySelector('#btn-close-cart')
btnCloseCartlEl.addEventListener('click', closeSidebar)
const fetchProducts = () => {
    const groupsRootel = document.querySelector('#groups-root')
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
fetchProducts()

let productsCart = []
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
 handleCartUpdate
 if (productsCart.length === 0) {
     closeSidebar()
 }
}
const handleCartUpdate = () => {
    const emptyCart = document.querySelector
('#empty-cart')
const cartWithProducts = document.querySelector
('#cart-with-products')
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
          removeofcart(product.id)
       })
        cartProductsList.appendChild(listItem)
    })
    }else{
        // esconder badge
        CartBadge.classList.remove('btn-cart-badge-show')
//  exibir carrinho vazio
emptyCart.classList.add('empty-cart-show')
cartWithProducts.classList.remove('cart-with-products-show')
    }
}
handleCartUpdate()