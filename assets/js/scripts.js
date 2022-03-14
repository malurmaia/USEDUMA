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
   fetch('http://127.0.0.1:5500/products.json')
   .then (result => result.json())
   .then(data =>{
       
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
        <button class="btn btn-main">Adicionar</button>
        </div>
        `
        productsGridEl.appendChild(cardWrap)


    })
   return sectionEl
 }
fetchProducts()