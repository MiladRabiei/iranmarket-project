import { getData } from './api.js';


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
