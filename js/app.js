
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





