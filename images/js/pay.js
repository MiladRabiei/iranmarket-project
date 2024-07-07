import { getData } from './api.js';


const $ = document;




//payment section

let shopBasket=JSON.parse(localStorage.getItem('basket')) || []
let tbodyElem=$.querySelector('tbody')
let priceBox=$.querySelector('.totalPrice')


let addProductToDom=(shopBasket)=>{
    tbodyElem.innerHTML=''
    shopBasket.forEach(item=>{
        tbodyElem.insertAdjacentHTML('beforeend',`
        <tr>
        <td><img src="${item.path}" alt=""></td>
        <td>${item.name}</td>
        <td><div><input type="number" name="" id="" value=${item.count} min="0" onchange="updateProductPrice(${item.id},this.value)"></div></td>
        <td>${item.price} تومان</td>
        <td><a href="" onclick="removeProduct(${item.id})">حذف</a></td>
    </tr>
        `)
    })
    
}


window.updateProductPrice=(id,newCount)=>{
    shopBasket.forEach(item=>{
        if(item.id===id){
            item.count=+newCount
        }
    })
    
    if(+newCount===0){
        removeProduct(id)
    }
    localStorage.setItem('basket', JSON.stringify(shopBasket));
    addProductToDom(shopBasket)
    calcTotalPrice(shopBasket)
}

window.removeProduct=(id)=>{
    event.preventDefault()
    shopBasket=shopBasket.filter(item=>{
        return item.id!==id
    })
    console.log(shopBasket);
    localStorage.setItem('basket', JSON.stringify(shopBasket));
    addProductToDom(shopBasket)
    calcTotalPrice(shopBasket)
}

let calcTotalPrice=shopBasket=>{
    let totalPrice=0
    shopBasket.forEach(item=>{
        totalPrice+=item.price*item.count
    })
    priceBox.innerHTML=totalPrice.toLocaleString()+' تومان'
}
calcTotalPrice(shopBasket)
addProductToDom(shopBasket)