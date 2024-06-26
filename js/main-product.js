import { getData } from './api.js';


const $ = document;
let mobileMenuBtn = $.querySelector('.mobile_nav__btn');
let mobileMenu = $.querySelector('.mobile_menu');
let shopBasket=JSON.parse(localStorage.getItem('basket')) || []


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



// thumbnail slider

let mainImg=$.querySelector('.main-image img')
let thumbnail=$.querySelector('.thumbnail-slider')
let price=$.querySelector('.price')
let itemCount=$.querySelector('.number input')
let addTobasket=$.querySelector('.add')

let locationSearch=location.search
let urlSearchParams=new URLSearchParams(locationSearch)
let idParams=urlSearchParams.get('id')

let data = await getData();
    data=Object.entries(data)

    

let addProductToDom=(data,idParams)=>{
    data.forEach(item=>{
        if(item[1].id==idParams){
            mainImg.src=item[1].path
            price.innerHTML=(item[1].price).toLocaleString()+' تومان'
            addTobasket.onclick=()=>{submitShoping(item[1])}
        }
    })
}

addProductToDom(data,idParams)

function submitShoping(item){
    let existingItem=shopBasket.find(product=>{
        if(product.id===item.id){
            return item
        }
    })
    if(existingItem){
        existingItem.count++
    }else{
        shopBasket.push(item)
    }
    updateProduct(item)
    
    console.log(shopBasket);
    localStorage.setItem('basket',JSON.stringify(shopBasket))
    itemCount.value=1
}

function updateProduct(item){
    itemCount.addEventListener('change',()=>{
        item.count=+itemCount.value
    })
}

thumbnail.addEventListener('click',event=>{
    if(event.target.tagName==='IMG'){

        mainImg.src=event.target.src
    }
})


// products detail mobile section

let details = document.querySelectorAll('.product-detail');
let hiddenMenus = document.querySelectorAll('.hidden');
let arrows = document.querySelectorAll('.mobile img');



    
    let technicalDetailMobileSection = () => {
        details.forEach(detail => {
            detail.addEventListener('click', (e) => {
                e.stopPropagation();
                let detailId = detail.dataset.id;
                console.log(detail);
                
                // Toggle corresponding arrow and menu
                toggleActiveState(detailId);
                
            });
        });
    };

    let toggleActiveState = (detailId) => {
        let arrow = document.querySelector(`img[data-id="${detailId}"]`);
        let menu = document.querySelector(`.hidden[data-id="${detailId}"]`);

        if (arrow && menu) {
            arrow.classList.toggle('active');
            menu.classList.toggle('active');
        }else{
            
        }
    };
    technicalDetailMobileSection();




// products detail desktop section
let desktopDetails = document.querySelector('.product-details__desktop');
let detailRowDivs = document.querySelectorAll('.details-row div');

let technicalDetailDesktopSection = () => {
    detailRowDivs.forEach(detail => {
        detail.addEventListener('click', () => {
            let desktopDetailId = detail.dataset.id;
            dynamicDetail(desktopDetailId);
        });
    });
}

let dynamicDetail = (id) => {
    // Deactivate currently active elements
    let activeDetails = desktopDetails.querySelectorAll('.details-row div.active');
    let activeHiddenMenus = desktopDetails.querySelectorAll('.hidden.active');
    
    activeDetails.forEach(activeDetail => {
        activeDetail.classList.remove('active');
    });

    activeHiddenMenus.forEach(activeMenu => {
        activeMenu.classList.remove('active');
    });

    // Activate the clicked element
    let detail = desktopDetails.querySelector(`.details-row div[data-id="${id}"]`);
    let hiddenMenuDesktop = desktopDetails.querySelector(`.hidden[data-id="${id}"]`);
    
    if (detail && hiddenMenuDesktop) {
        detail.classList.add('active');
        hiddenMenuDesktop.classList.add('active');
    }
}

technicalDetailDesktopSection();



// slider section


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





