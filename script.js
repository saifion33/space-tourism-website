"use strict"
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
        fetch(`./page-content/${clickedLinkId}-page.txt`).then(response => response.text()).then(data => pageChanger(data, clickedLinkId)).catch(err => console.log(err))
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

// ************************************************************************************************************
let activePageLink = '0';
function pageNavLinkActivater(linkId, pageName) {
    // console.log('page activater called');
    document.getElementById(activePageLink).classList.remove(`active-${pageName}-link`);
    document.getElementById(linkId).classList.add(`active-${pageName}-link`);
    console.log(activePageLink);
    activePageLink = linkId;
    console.log(activePageLink);
}
function pageContentChanger(data,clickedLinkId, pageName, optionalArgs) {
    pageNavLinkActivater(clickedLinkId,pageName)
    // Grab page image 
    const image = document.getElementById(`${pageName}-image`);
    // Grab page content name Like moon,mars,launch vehical etc.
    const name = document.getElementById(`${pageName}-name`);
    if (pageName=='technology') {
        image.setAttribute('src', data.images.portrait);
    }
    else {
        image.setAttribute('src',data.images.webp)
    }
    name.innerText = data.name;
    optionalArgs.forEach((element) => {
        document.getElementById(`${pageName}-${element}`).innerText = data[element];
})
    // name.innerText = data[name];
}
// Fetch page content according to clicked link and send filtered data to pageContentChanger function

function pageContentFetcher(pageName, clickedLinkId, optionalArgs) {
    console.log('page content fetcher called');
    fetch('./data.json').then(response => response.json()).then(data => {
        pageContentChanger(data[pageName][clickedLinkId],clickedLinkId, pageName, optionalArgs);
    }).catch(err => console.log(err));
}

/***************************************************************************************************************
###################################### PAGE SPECIFIC FUNCTIONS #################################################
****************************************************************************************************************/

// ********************************** HOME FUNCTION **********************************************************1
function home() {
    console.log('home called')
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