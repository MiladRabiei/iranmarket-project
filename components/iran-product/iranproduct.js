import { getData } from "../../js/api.js";
import { checkBoxInputs } from "../../js/products.js";

const template = document.createElement('template');
template.innerHTML = `  
<link rel="stylesheet" href="styles/reset.css" />
<link rel="stylesheet" href="styles/fonts.css" />
<link rel="stylesheet" href="styles/grid.css" />
<link rel="stylesheet" href="styles/app.css" />
<link rel="stylesheet" href="styles/responsive.css" />
<a href="#" class="product-box shadow">
    <div class="mySwiper-slide__banner">
        <img alt="">
    </div>
    <div class="mySwiper-slide__textbox">
        <div class="mySwiper-slide__caption">
            <p></p>
        </div>
        <div class="mySwiper-slide__price">
            <div class="mySwiper-slide__price--new"></div>
            <div class="mySwiper-slide__price--main"></div>
        </div>
    </div>
</a>
`;

class IranProduct extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    async connectedCallback() {
        this.data = await getData();
        this.addDataToDom();
        
        let inputs = checkBoxInputs();
        inputs.forEach(input => {
            input.addEventListener('change', () => {
                this.updateProductDisplay(inputs);
            });
        });
    }

    addDataToDom() {
        let id = this.dataset.id;
        if (this.data[id]) {
            let product = this.data[id];
            let productLink=this.shadowRoot.querySelector('.product-box')
            productLink.href = `http://127.0.0.1:5500/main-product.html?id=${product.id}`;
            this.shadowRoot.querySelector('.mySwiper-slide__banner img').src = product.path;
            this.shadowRoot.querySelector('.mySwiper-slide__caption p').innerHTML = product.name;
            this.shadowRoot.querySelector('.mySwiper-slide__price--new').innerHTML = product.previousPrice;
            this.shadowRoot.querySelector('.mySwiper-slide__price--main').innerHTML = product.price.toLocaleString();
        }
    }

    updateProductDisplay(inputs) {
        let id = this.dataset.id;
        if (this.data[id]) {
            let product = this.data[id];
            let showProduct = true;

            let selectedCategories = [];
            let selectedColors = [];

            inputs.forEach(input => {
                if (input.checked) {
                    if (input.classList.contains('category-checkBox')) {
                        selectedCategories.push(input.value);
                    } else if (input.classList.contains('color_checkBox')) {
                        selectedColors.push(input.value);
                    }
                }
            });

            if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
                showProduct = false;
            }
            if (selectedColors.length > 0 && !selectedColors.includes(product.color)) {
                showProduct = false;
            }

            this.style.display = showProduct ? 'block' : 'none';
        }
    }
}
window.customElements.define('iran-product',IranProduct)
export { IranProduct };
