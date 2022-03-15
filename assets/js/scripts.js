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
        <p class="price">R$${product.price}</p>
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

const productsCart = []
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
const handleCartUpdate = () => {
    if(productsCart.length > 0){
     const CartBadge = document.querySelector('.btn-cart-badge')
     CartBadge.classList.add('btn-cart-badge-show')
     let total = 0 
     productsCart.forEach (product => {
         total = total + product.qty

     })
     CartBadge.textContent = total
    }
}