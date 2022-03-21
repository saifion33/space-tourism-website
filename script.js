"use strict"
// This javascript file part of space tourism website

// Developer:- Azeem Saifi
// Instagram:- www.instagram.com/frontendium


// ############################################## DESKTOP NAVBAR RELATED FUNCTIONS #######################################

const navLinksCollection = document.getElementsByClassName('nav-links');
const navLinks = Array.from(navLinksCollection)
navLinks.forEach((element) => {

    document.getElementById(element.id).addEventListener('click', (event) => mainContentFetcher(event.target.id))
});
// set activated link to home
let activatedLink = 'home';
function linkActivater(linkId) {
    document.getElementById(activatedLink).classList.remove(`active-link`);
    document.getElementById(linkId).classList.add(`active-link`);
    activatedLink = linkId;
}
// This function takes html data and clicked link id and insert html data to main tag, set secondry stylesheet according to page
function pageChanger(htmlData, clickedLinkId) {
    // Grab secondry stylesheet link
    const stylesheet = document.getElementById('secondry-stylesheet');
    // Grab main tag
    const main = document.getElementById('root');
    // set secondry stylesheet href according to clicked link
    stylesheet.setAttribute('href', `./css/${clickedLinkId}-style.css`);
    // insert html data into main
    main.innerHTML = htmlData;
    linkActivater(clickedLinkId);
    // call page specific function according to clicked link
    const pageSpecificFunc = eval(clickedLinkId);
    pageSpecificFunc();
}

// This function fetch html data of page according clicked navbar link and give html data to page changer function
function mainContentFetcher(clickedLinkId) {
    if (clickedLinkId != "") {
        fetch(`./page-template/${clickedLinkId}-page.txt`).then(response => response.text()).then(data => pageChanger(data, clickedLinkId)).catch(err => console.log(err))
    }
}
// Execute this function initially to fetch home page content on load web page
mainContentFetcher('home');


// ######################################################################################################################
// ############################################## Mobile Navbar Related Function #########################################

// Grab hamburger icon for add event listner
const menuIcon = document.getElementById('menu-icon');
// Grab nav-link-primary-container as mobileMenu to hide and show
const mobileMenu = document.getElementById('nav-link-primary-container');
// Grab close icon to add event listner
const closeMenuIcon = document.getElementById('close-menu-icon');
// Grab body for add event listener
const body = document.getElementById('body');
// This function check if user clicked outside mobile navigation menu then it call menu hider function for hide menu
let navbarOutClicklistener = function (event) {
    // checking if user not clicked inside navigation menu on it's childern element or menu icon which used for show menu
    if (!mobileMenu.contains(event.target) && event.target.id != 'menu-icon') {
        menuHider()
    }
}
// This function show mobile navbar and add a click event listener on body
function menuDisplayer() {
    // hide hamburger icon
    menuIcon.style.display = 'none'
    // translate or show mobile navbar
    mobileMenu.style.transform = 'translateX(0%)';
    // add a click a event listner for detect outside click of mobile menu
    body.addEventListener('click', navbarOutClicklistener);
}
// This function hide navbar and remove click event listner from body
function menuHider() {
    // hide navbar
    mobileMenu.style.transform = 'translateX(100%)';
    // show hamburger menu
    menuIcon.style.display = 'block';
    // remove event listener
    body.removeEventListener('click', navbarOutClicklistener);
}

// Add click event listner on hamburger icon and call menuDisplayer function
menuIcon.addEventListener('click', () => menuDisplayer());
// Add click event listner on close icon and call menuHider function
closeMenuIcon.addEventListener('click', () => menuHider());
// Add click event listner on mobile navbar to detect outside click of navbar

/*###################################################################################################################
###############################------------  MAIN FUNCTIONS ------------------------#################################
####################################################################################################################*/

// **************************** PAGE SPECIFIC LINK ACTIVATER FUNCTION **********************************************

// set active page specific navbar link id initially to 0 it changed by pageNavLinkActivater function.
let activePageLink = '0';

// This function use to present active page specific navbar links it takes page navbar clicked link id and page name
function pageNavLinkActivater(linkId, pageName) {
    document.getElementById(activePageLink).classList.remove(`active-${pageName}-link`);
    document.getElementById(linkId).classList.add(`active-${pageName}-link`);
    activePageLink = linkId;
}
// *************************************** PAGE CONTENT CHANGER FUNCTION ********************************************

// This function takes filtered data, main navbar clicked link id and page specific arguments and apply them in page
function pageContentChanger(data, clickedLinkId, pageName, pageSpecificArgs) {
    pageNavLinkActivater(clickedLinkId, pageName)
    // Grab page image 
    const image = document.getElementById(`${pageName}-image`);
    // Grab page content name Like moon,mars,launch vehical etc.
    const name = document.getElementById(`${pageName}-name`);

    /* check pageName because technology page images saved as portrait and landscape
    other page image saved as png and webp name in data.json file */
    if (pageName == 'technology') {
        if (screen.width > 800) {
            image.setAttribute('src', data.images.portrait)
        }
        else {
            image.setAttribute('src', data.images.landscape)
        }
    }
    else {
        // set image path
        image.setAttribute('src', data.images.webp)
    }
    // change name
    name.innerText = data.name;

    //Apply a for each loop on page specific Argument
    pageSpecificArgs.forEach((element) => {
        // get page specific argument one by one and chnage them from data
        document.getElementById(`${pageName}-${element}`).innerText = data[element];
    })
}


// ********************************************** PAGE CONTENT FETCHER FUNCTION ******************************************

// Fetch page content from data.json file and filter it according to clicked link and send it to pageContentChanger function
function pageContentFetcher(pageName, clickedLinkId, pageSpecificArgs) {
    fetch('./data.json').then(response => response.json()).then(data => {
        // filter data according to page
        const filteredData = data[pageName][clickedLinkId];
        // send data to page content changer function
        pageContentChanger(filteredData, clickedLinkId, pageName, pageSpecificArgs);
    }).catch(err => console.log(err));
}



/***************************************************************************************************************
###################################### PAGE SPECIFIC FUNCTIONS #################################################
****************************************************************************************************************/

// ********************************** HOME FUNCTION **********************************************************
function home() {
    // get oval shape to redirect user to destinations
    document.getElementById('oval').addEventListener('click', () => mainContentFetcher('destinations'))
}

// ********************************** DESTINATIONS FUNCTION ****************************************************
function destinations() {
    // Grab destinations page navbar
    const destNavbarHtmlCollection = document.getElementsByClassName('dest-nav-links');
    // convert html collection to array for run forEach loop
    const destNavLinks = Array.from(destNavbarHtmlCollection);
    // Execute pageContentFetcheer function initially for fetch first page content
    pageContentFetcher('destinations', '0', ['description', 'distance', 'travel']);
    // Add click event listener on page's navigation bar and when clicked call pageContentFetcher function 
    destNavLinks.forEach((destLink) => {
        document.getElementById(destLink.id).addEventListener('click', (event) => pageContentFetcher('destinations', destLink.id, ['description', 'distance', 'travel']));
    })
}

// ************************************ CREW FUNCTION **********************************************************
function crew() {
    // Grab destinations page navbar
    const crewNavbarHtmlCollection = document.getElementsByClassName('crew-nav-links');
    // convert html collection to array for run forEach loop
    const crewNavLinks = Array.from(crewNavbarHtmlCollection);
    // Execute pageContentFetcheer function initially for fetch first page content
    pageContentFetcher('crew', '0', ['role', 'bio']);
    // Add click event listener on page's navigation bar and when clicked call pageContentFetcher function 
    crewNavLinks.forEach((crewLink) => {
        document.getElementById(crewLink.id).addEventListener('click', (event) => pageContentFetcher('crew', crewLink.id, ['role', 'bio']));
    })
}

// ************************************ TECHNOLOGY FUNCTION **********************************************************
function technology() {
    // Grab destinations page navbar
    const technologyNavbarHtmlCollection = document.getElementsByClassName('technology-nav-links');
    // convert html collection to array for run forEach loop
    const technologyNavLinks = Array.from(technologyNavbarHtmlCollection);
    // Execute pageContentFetcheer function initially for fetch first page content
    pageContentFetcher('technology', '0', ['description']);
    // Add click event listener on page's navigation bar and when clicked call pageContentFetcher function 
    technologyNavLinks.forEach((technologyLink) => {
        document.getElementById(technologyLink.id).addEventListener('click', (event) => pageContentFetcher('technology', technologyLink.id, ['description']));

    })
}