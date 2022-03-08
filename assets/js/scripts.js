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
