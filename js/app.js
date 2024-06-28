
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
    shopBasket=shopBasket.filter(item=>{
        return item.id!==id
    })
    localStorage.setItem('basket',JSON.stringify(shopBasket))
    console.log(shopBasket);
    showBasketMiniMenu(shopBasket)
}
showBasketMiniMenu(shopBasket)

export {showBasketMiniMenu}

