// ############################################## DESKTOP NAVBAR RELATED FUNCTIONS #######################################

const navLinksCollection = document.getElementsByClassName('nav-links');
const navLinks=Array.from(navLinksCollection)
navLinks.forEach((element) =>{
   
    document.getElementById(element.id).addEventListener('click',(event)=>contentFetcher(event.target.id))
})

// ############################################## Mobile Navbar Related Function #########################################
// Grab hamburger icon for add event listner
const menuIcon = document.getElementById('menu-icon');
// Grab nav-link-primary-container as mobileMenu to hide and show
const mobileMenu = document.getElementById('nav-link-primary-container');
// Grab close icon to add event listner
const closeMenuIcon = document.getElementById('close-menu-icon');

// This function show mobile navbar
function menuDisplayer() {
    // hide hamburger icon
    menuIcon.style.display = 'none';
    // translate or show mobile navbar
    mobileMenu.style.transform = 'translateX(0%)';
}
// This function hide navbar
function menuHider() {
    // hide navbar
    mobileMenu.style.transform = 'translateX(100%)';
    // show hamburger menu
    menuIcon.style.display = 'block';
}

// Add click event listner on hamburger icon and call menuDisplayer function
menuIcon.addEventListener('click', () => menuDisplayer());
// Add click event listner on close icon and call menuHider function
closeMenuIcon.addEventListener('click', () => menuHider())

// **************************************************************************************************************
function pageChanger(htmlData,clickedLinkId) {
    const stylesheet = document.getElementById('secondry-stylesheet');
    const main = document.getElementById('root');
    stylesheet.setAttribute('href', `./css/${clickedLinkId}-style.css`);
    main.innerHTML = htmlData;
}
function contentFetcher(clickedLinkId) {
    console.log(clickedLinkId)
   if (clickedLinkId!="") {
    fetch(`./page-content/${clickedLinkId}-page.txt`).then(response=>response.text()).then(data=>pageChanger(data,clickedLinkId)).catch(err=>console.log(err))
   }
}

contentFetcher('home')