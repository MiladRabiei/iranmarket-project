import { getData } from "./api.js";
const $ = document;
let mobileMenuBtn = $.querySelector('.mobile_nav__btn');
let mobileMenu = $.querySelector('.mobile_menu');



// mobile menu section

mobileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation()
    mobileMenuBtn.classList.toggle('mobile_nav__btn--active');
    if (mobileMenuBtn.classList.contains('mobile_nav__btn--active')) {
        mobileMenu.style.left = '0';
        document.body.classList.add('blurred');
    } else {
        mobileMenu.style.left = '-28rem';
        document.body.classList.remove('blurred');
    }
});

document.addEventListener('click', (e) => {
    if (mobileMenuBtn.classList.contains('mobile_nav__btn--active') && !mobileMenu.contains(e.target) && e.target !== mobileMenuBtn) {
        mobileMenuBtn.classList.remove('mobile_nav__btn--active');
        mobileMenu.style.left = '-28rem';
        document.body.classList.remove('blurred');
    }
});

//swiper section

const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    autoplay:true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
        el: '.swiper-scrollbar',
    },
});
const swiperProduct = new Swiper('.swiper_product', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    autoplay:true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
        el: '.swiper-scrollbar',
    },
    
});
let sswiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    spaceBetween: 10,
    freeMode: false,
    loop:false,
    pagination: {
        el: ".swiper-pagination",
        clickable: false,
    },
    breakpoints:{
        400:{
            slidesPerView: 2,
            spaceBetween: 10,
        },
        600:{
            slidesPerView: 3,
            spaceBetween: 10,
        },
        768:{
            slidesPerView: 3,
            spaceBetween: 10,
        },
        1200:{
            slidesPerView: 6,
            spaceBetween: 10,
        }
    }
    });

//shop basket mini menu & register login mini menu

let shopBasket=JSON.parse(localStorage.getItem('basket')) || []  
let productCountBox=$.querySelector('.productCount')
let productCount=$.querySelector('.productCount p')
let shopMiniMenu=$.querySelector('.desktop_nav__button.basket .shop-miniMenu')

let showBasketMiniMenu=(shopBasket)=>{
    if(shopBasket.length>0){
        productCountBox.style.display='block'
        productCount.innerHTML=shopBasket.length
        
    }else{
        productCountBox.style.display='none'
        shopMiniMenu.style.display = 'none';
    }
    $.querySelector('.desktop_nav__button.basket').addEventListener('mouseover', () => {
        if (shopBasket.length > 0) {
            shopMiniMenu.style.display = 'block';
        }else{
            shopMiniMenu.style.display = 'none';
        }
    });
    $.querySelector('.desktop_nav__button.basket').addEventListener('mouseout', () => {
        shopMiniMenu.style.display = 'none';
    });
    addItemsToMinimenu(shopBasket)
}

let addItemsToMinimenu=(shopBasket)=>{
    shopMiniMenu.innerHTML=''
    shopBasket.forEach(item=>{
        shopMiniMenu.insertAdjacentHTML('beforeend',`
        <div class="shop-miniMenu__item">
        <div class="shop-miniMenu__item-information">
            <img src="${item.path}" alt="">
            <div class="miniMenu-caption">
                <p>${item.name} 
                </p>
                <p class="miniMenu-price">قیمت:${item.price}</p>
            </div>
        </div>
        <div class="miniMenu-removeItem" onclick="removeItemMinimenu(${item.id})">
            <p>x</p>
        </div>
    </div>
        
        `)
    })
}

window.removeItemMinimenu=(id)=>{
    
    event.preventDefault()
    shopBasket=shopBasket.filter(item=>{
        return item.id!==id
    })
    localStorage.setItem('basket',JSON.stringify(shopBasket))
    console.log(shopBasket);
    showBasketMiniMenu(shopBasket)
}
showBasketMiniMenu(shopBasket)

export {showBasketMiniMenu}

// register miniMenu

let registerMiniMenu=$.querySelector('.register-miniMenu')


let getCookie=()=>{
    let cookies=document.cookie
    
    let mainCookie=null
    if(cookies.length>0){
        
    mainCookie=cookies.slice(cookies.indexOf('=')+1)
    }
    showRegisterMiniMenu(cookies,mainCookie)
}
let showRegisterMiniMenu=(array,mainCookie)=>{
    console.log(array.length);
    $.querySelector('.desktop_nav__button.register').addEventListener('mousemove',()=>{
        if(array.length>0){
            registerMiniMenu.style.display='block'
        }else{
            registerMiniMenu.style.display='none'
        }
    })
    $.querySelector('.desktop_nav__button.register').addEventListener('mouseout',()=>{
        registerMiniMenu.style.display='none'
    })
    addClientInfo(mainCookie)
}
let addClientInfo=(mainCookie)=>{
    registerMiniMenu.insertAdjacentHTML('beforeend',`
    <div class="client-Name">
    <img src="images/userNotImage.png" alt="">
    <p>${mainCookie}</p>
    </div>
    <hr class="register-miniMenu__hr">
    <div class="logout">
    <img src="images/exit.png" alt="">
    <p onclick="removeCookie('${mainCookie}')">خروج از حساب کاربری</p>
</div>
    `)
}
window.removeCookie=(cookie)=>{
    let now =new Date()
        now.setTime(now.getTime()-2*24*60*60*1000)
        document.cookie=`userName=${cookie};path=/;expires=${now}`
    getCookie()
}
getCookie()

// search box
let searchResultBox=$.querySelector('.search-results')

let products= await getData()
let searchedArray=[]
console.log(products);
let searchInputs=$.querySelectorAll('.mobile_search__input')
searchInputs.forEach(input=>{
    input.addEventListener('keyup',()=>{
        console.log(input.value);
        searchedArray=[]
        products.forEach(item=>{
            if(item.name.includes(input.value))
            if(input.value.trim().length>0){
                searchedArray.push(item)
                searchResultBox.style.display='block'
                addSearchItems(searchedArray)
            }else{
                searchResultBox.style.display='none'
            }
            
        })
        console.log(searchedArray);
    })
})

window.addSearchItems=array=>{
    searchResultBox.innerHTML=''
    array.forEach(item=>{
        searchResultBox.insertAdjacentHTML('beforeend',`
        <a href="main-product.html?id=${item.id}" onclick="emptySearchInput()">
        <div class="search-results__item">
        <img src="${item.path}" alt="">
        <div class="search-results__item--caption">
            <p>${item.name} 
            </p>
            <p class="search-results__item--price">قیمت:${item.price}</p>
        </div>
    </div>
        </a>
        
        `)
    })
}

window.emptySearchInput=()=>{
    searchInputs.forEach(input=>{
        input.value=''
        
    })
}