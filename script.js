// ############################################## Mobile Navbar Related Function #########################################
const menuIcon = document.getElementById('menu-icon');
const mobileMenu = document.getElementById('nav-link-primary-container');
const closeMenuIcon = document.getElementById('close-menu-icon');
function menuDisplayer() {
    menuIcon.style.display = 'none';
    mobileMenu.style.transform = 'translateX(0%)';
}
function menuHider() {
    mobileMenu.style.transform = 'translateX(100%)';
    menuIcon.style.display = 'block';
}

menuIcon.addEventListener('click', () => menuDisplayer());
closeMenuIcon.addEventListener('click',()=>menuHider())
