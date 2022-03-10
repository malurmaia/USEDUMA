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
   fetch('http://127.0.0.1:5500/products.json')
   .then(res => res.json()) 
   .then (data => {
       const groupsRootEl = document.querySelector('#groups-root')
       console.log('acabou o JSON', data.groups)
       for (let contador = 0;contador < data.groups.length;contador++) {
           console.log(data.groups[contador])
           const sectionEl = document.createElement('section')
           const sectionTitleEl = document.createElement('h2')
           sectionTitleEl.textContent = data.groups[contador].name
           sectionEl.appendChild(sectionTitleEl)
           groupsRootEl.appendChild(sectionEl)
       }
      
   })
   .catch(() => {
       console.log('Ocorreu um erro. Tente novamente')
   })
}
fetchProducts()