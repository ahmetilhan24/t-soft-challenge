"use strict";
//navigation menu
let navOpen = false;
const navMenu = (e) => {
    var elems;
    elems = {
        nav: document.querySelector(".header__nav")
    }
    const hamburger = e.firstElementChild;
    if (!navOpen) {
        hamburger.classList.add("header__hamburger__icon--open");
        elems.nav.classList.add("header__nav--open");
        navOpen = true;
    }
    else {
        hamburger.classList.remove("header__hamburger__icon--open");
        elems.nav.classList.remove("header__nav--open");
        navOpen = false;
    }
}
//fetch data for posts
var data = [];
var filterList = [];
//elems for data and inner
const dataElems = {
    src: "./fake-data/data.json",
    innerArea: document.getElementById("cardsarea"),
    rMethod: "GET",
    rHeaders: {
        'Content-Type': 'application/json;charset=utf-8'
    }
}

const getPosts = () => {
    //get data with fetch api
    fetch(dataElems.src, {
        method: dataElems.rMethod,
        headers: dataElems.rHeaders
    }).then(res => {
        return res.json();
    }).then(res => {
        data = res.posts;
        innerLoop(dataElems.innerArea, data);
    })
}
//search event
const search = () => {
    var elems;
    elems = {
        input: document.getElementById("searchinput")
    }
    elems.input.addEventListener("keyup", (e) => {
        filterPosts(e.target.value);
    })
}
//filter posts array
const filterPosts = (val) => {
    if (val.length >= 3) {
        //get clear data
        fetch(dataElems.src, {
            method: dataElems.rMethod,
            headers: dataElems.rHeaders
        }).then(res => {
            return res.json();
        }).then(res => {
            const newData = data.filter(post => {
                return post.author.nick.toLowerCase() === val.toLowerCase();
            });
            filterList = newData;
            dataElems.innerArea.innerHTML = "";
            innerLoop(dataElems.innerArea, filterList);
        })
    }
    else {
        innerLoop(dataElems.innerArea, data);
    }
}
//inner for funtion
const innerLoop = (area, data) => {
    //wait data
    var elems;
    elems = {
        notFound: `<p class="not-found flex--row row--middle--center">Henüz içerik yok!</p>`,
    }
    //clear area
    area.innerHTML = "";
    data.forEach(post => {
        let postTemp = `<article class="card flex--column column--middle--center">
            <div class="card__top flex--column column--middle--center">
                <div class="card__top__tool flex--row row--middle--center">
                ${toolControl(post.tool)
            }
                </div>
                <a href="#" class="card__top__poster flex--row row--middle--center"> 
                    <picture class="card__top__poster__img flex--row row--middle--center">
                        <img src=${post.poster} alt="">
                    </picture>
                </a>
            </div>
            <div class="card__bottom flex--row row--middle--center">
                <div class="card__bottom__author flex--row row--middle--center">
                    <div class="card__bottom__author__avatar flex--column column--middle--center">
                        <img src=${post.author.avatar}
                            alt=${post.author.nick}>
                    </div>
                    <p class="card__bottom__author__nick">by <strong>${post.author.nick}</strong></p>
                </div>
                <div class="card__bottom__info flex--row">
                    <div class="card__bottom__info__item flex--row row--middle--center">
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.58333 8.66669L3.25 13L7.58333 17.3334" stroke="#202142"
                                stroke-width="2.36364" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M18.4167 8.66669L22.75 13L18.4167 17.3334" stroke="#202142"
                                stroke-width="2.36364" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M15.1667 4.33331L10.8333 21.6666" stroke="#202142" stroke-width="2.36364"
                                stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <p>${post.info.code}</p>
                    </div>
                    <div class="card__bottom__info__item flex--row row--middle--center">
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0)">
                            <path d="M22.7094 16.6794L21.158 15.9078C20.5399 15.5927 20.2179 14.9746 20.2179 14.2718V11.1817C20.2179 10.5273 20.0604 9.87299 19.7694 9.27922L16.353 3.19722C15.9852 2.39785 14.9901 2.11636 14.258 2.60456C13.6885 2.98404 13.4675 3.71335 13.7299 4.34514L17.0793 10.9272C17.0913 10.9272 17.0793 10.9393 17.0913 10.9393C17.1519 11.1331 17.1883 11.327 17.1883 11.5331V15.1686C17.1883 15.5078 16.856 15.7745 16.5166 15.7745C16.1773 15.7745 15.9765 15.5078 15.9765 15.1686V12.7449C15.9765 12.0756 15.434 11.5331 14.7647 11.5331C14.0953 11.5331 13.5528 12.0756 13.5528 12.7449V17.0174C13.5528 18.3499 14.2162 19.5756 15.387 20.2118L20.4915 22.9848C20.5762 23.0211 20.6611 23.0454 20.758 23.0454C20.7971 23.0454 20.8362 23.0415 20.8746 23.0339C21.0874 22.9916 21.261 22.8368 21.3278 22.6304L23.016 17.4082C23.1083 17.123 22.9778 16.8129 22.7094 16.6794Z" fill="#202142"/>
                            <path d="M10.6446 11.5339C9.97529 11.5339 9.43281 12.0764 9.43281 12.7457V15.1694C9.43281 15.5086 9.23195 15.7753 8.8927 15.7753C8.55329 15.7753 8.22099 15.5086 8.22099 15.1694V11.5339C8.22099 11.3278 8.25744 11.1341 8.31803 10.9401C8.33002 10.9401 8.31803 10.928 8.33002 10.928L11.6794 4.34595C11.9418 3.71416 11.7206 2.98485 11.1513 2.60537C10.4192 2.11733 9.42413 2.39882 9.05633 3.19803L5.63986 9.27988C5.3489 9.87364 5.19142 10.5282 5.19142 11.1825V14.2727C5.19142 14.9755 4.86938 15.5935 4.25131 15.9086L2.69992 16.6802C2.43152 16.8137 2.30103 17.1236 2.39334 17.409L4.08137 22.6311C4.14812 22.8375 4.32185 22.9924 4.53455 23.0347C4.57305 23.0423 4.61218 23.0462 4.65131 23.0462C4.74819 23.0462 4.83308 23.0219 4.91782 22.9857L10.0222 20.2125C11.1931 19.5764 11.8565 18.3507 11.8565 17.0182V12.7457C11.8565 12.0764 11.314 11.5339 10.6446 11.5339Z" fill="#202142"/>
                            </g>
                            <defs>
                            <clipPath id="clip0">
                            <rect width="20.6818" height="20.6818" fill="white" transform="translate(2.36364 2.36365)"/>
                            </clipPath>
                            </defs>
                            </svg>
                            
                        <p>${post.info.clap}</p>
                    </div>
                </div>
            </div>
        </article>`;
        area.innerHTML += postTemp;
    });
    //data length control for notfound show
    if (notFound(data)) {
        return;
    }
    else {
        area.innerHTML = elems.notFound;
    }
}

//notfound control
const notFound = data => {
    if (data && data.length !== 0) {
        return true;
    }
    else {
        return false;
    }
}
//tool controler
const toolControl = (tool) => {
    tool.toLowerCase();
    const icons = {
        xd: `<svg  viewBox="0 0 31 29" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0)">
        <path d="M1.91382 1.242H29.1732V27.7579H1.91382V1.242Z" fill="#2E001E"/>
        <path d="M0.674744 0.00296021V28.997H30.4122V0.00296021H0.674744ZM1.91381 1.24202H29.1732V27.7579H1.91381V1.24202Z" fill="#FF2BC2"/>
        <path d="M22.2716 12.1829C22.0858 12.0962 21.8503 12.059 21.553 12.059C19.9917 12.059 18.9509 13.2609 18.9509 15.2558C18.9509 17.5357 20.0165 18.4526 21.4043 18.4526C21.7017 18.4526 22.0238 18.4154 22.2592 18.3163V12.1829H22.2716ZM16.7206 15.3549C16.7206 12.4679 18.5792 10.2128 21.6273 10.2128C21.8875 10.2128 22.0238 10.2128 22.2716 10.2376V7.01603C22.2716 6.94168 22.3336 6.89212 22.3955 6.89212H24.3904C24.4895 6.89212 24.5143 6.92929 24.5143 6.99125V18.3163C24.5143 18.6508 24.5143 19.0721 24.5763 19.5306C24.5763 19.6173 24.5763 19.6297 24.5019 19.6669C23.4611 20.1625 22.3707 20.3855 21.3299 20.3855C18.6412 20.3855 16.7206 18.7252 16.7206 15.3549ZM12.4954 13.3476L15.9648 20.0757C16.0267 20.1749 15.9896 20.274 15.8905 20.274H13.7345C13.5982 20.274 13.5362 20.2368 13.4743 20.1129C12.6813 18.4774 11.8759 16.7798 11.0457 15.0204H11.0209C10.2775 16.6807 9.45972 18.4897 8.66672 20.1253C8.60477 20.2244 8.54282 20.2616 8.44369 20.2616H6.38685C6.26294 20.2616 6.25055 20.1625 6.3125 20.0881L9.70753 13.5583L6.42402 7.06559C6.34968 6.96646 6.42402 6.87973 6.51075 6.87973H8.64194C8.76585 6.87973 8.8278 6.90451 8.86497 7.01603C9.64558 8.66398 10.4386 10.2872 11.182 11.9475H11.2068C11.9255 10.3119 12.7185 8.66398 13.4743 7.04081C13.5362 6.94168 13.5734 6.87973 13.6973 6.87973H15.6922C15.7913 6.87973 15.8285 6.95407 15.7665 7.06559L12.4954 13.3476Z" fill="#FF2BC2"/>
        </g>
        <defs>
        <clipPath id="clip0">
        <rect width="29.7375" height="29" fill="white" transform="translate(0.674744)"/>
        </clipPath>
        </defs>
        </svg>`,

        figma: `<svg  viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.4178 14.5C15.4178 11.8306 17.5575 9.66663 20.1971 9.66663C22.8366 9.66663 24.9764 11.8306 24.9764 14.5C24.9764 17.1694 22.8366 19.3333 20.1971 19.3333C17.5575 19.3333 15.4178 17.1694 15.4178 14.5Z" fill="#1ABCFE"/>
        <path d="M5.85913 24.1666C5.85913 21.4973 7.99891 19.3333 10.6385 19.3333H15.4178V24.1666C15.4178 26.836 13.278 29 10.6385 29C7.99891 29 5.85913 26.836 5.85913 24.1666Z" fill="#0ACF83"/>
        <path d="M15.4178 0V9.66664H20.1971C22.8367 9.66664 24.9764 7.5027 24.9764 4.83333C24.9764 2.16396 22.8367 0 20.1971 0H15.4178Z" fill="#FF7262"/>
        <path d="M5.85913 4.83333C5.85913 7.50271 7.99891 9.66664 10.6385 9.66664H15.4178V0H10.6385C7.99891 0 5.85913 2.16396 5.85913 4.83333Z" fill="#F24E1E"/>
        <path d="M5.85913 14.5C5.85913 17.1694 7.99891 19.3333 10.6385 19.3333H15.4178V9.66663H10.6385C7.99891 9.66663 5.85913 11.8306 5.85913 14.5Z" fill="#A259FF"/>
        </svg>`,

        sketch: `<svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.43628 10.8197V2.66346L15.4988 0.961517L24.5613 2.66346V10.8197H6.43628Z" fill="#FFD54F"/>
        <path d="M6.43628 10.8197L15.4988 0.961517L24.5613 10.8197H6.43628Z" fill="#FFECB3"/>
        <path d="M0.998779 10.8197L15.4988 28.0385L29.9988 10.8197H0.998779Z" fill="#FFA000"/>
        <path d="M6.43628 10.8197L15.4988 28.0385L24.5613 10.8197H6.43628Z" fill="#FFCA28"/>
        <path d="M0.998779 10.8197L6.43628 2.66345V10.8197H0.998779Z" fill="#FFC107"/>
        <path d="M24.5613 2.66345V10.8197H29.9988L24.5613 2.66345Z" fill="#FFC107"/>
        </svg>`
    }
    if (tool === "XD") {
        return icons.xd
    }
    else if (tool === "SKETCH") {
        return icons.sketch;
    }
    else if (tool === "FİGMA") {
        return icons.figma;
    }
}
//document after loaded
document.addEventListener("DOMContentLoaded", () => {
    getPosts();
    search()
});