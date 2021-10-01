//navigation menu
let navOpen = false;
const navMenu = (e) => {
    var elems;
    elems = {
        nav: document.querySelector(".header__nav")
    }
    const hamburger = e.firstElementChild;
    if(!navOpen){
        hamburger.classList.add("header__hamburger__icon--open");
        elems.nav.classList.add("header__nav--open");
        navOpen = true;
    }
    else{
        hamburger.classList.remove("header__hamburger__icon--open");
        elems.nav.classList.remove("header__nav--open");
        navOpen = false;
    }
}
