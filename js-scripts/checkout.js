import { cart,removeCart } from "../data/cart.js";
import { products } from "../data/products.js";

import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { delivery } from "../data/delivery.js"; 

let carthtml = ``;
cart.forEach((item)=>{
    
    let pid = item.productId;
    let matching;

    products.forEach((i)=>{
        if(i.id === pid){
            matching = i;
        }
    });
    carthtml +=`
    
    <div class="cart-item-container js-cart-container-${matching.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matching.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matching.name}
                </div>
                <div class="product-price">
                  $${(matching.priceCents/100).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${item.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link"
                    data-product-id="${matching.id}"
                  >
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryHtml(matching,item)}
              </div>
            </div>
          </div>
    
    
    
    `;

});

function deliveryHtml(matching,item){
  let html = ``;
  delivery.forEach((delivery)=>{
    const today = dayjs();
    const date = today.add(delivery.deliveryDays,'days');
    const dateString = date.format(
      'dddd, MMMM D'
    );
    const isChecked = delivery.id === item.deliveryId;
    console.log(delivery.id,matching);
    const price = delivery.priceCents === 0 ? 'FREE' : `$${delivery.priceCents.toFixed(2)}-`;
    html+=`
    <div class="delivery-option">
      <input type="radio"
        ${isChecked ? 'checked' : ''}
        class="delivery-option-input"
        name="delivery-option-${matching.id}">
      <div>
        <div class="delivery-option-date">
          ${dateString}
        </div>
        <div class="delivery-option-price">
          ${price} Shipping
        </div>
      </div>
    </div>
    
    `;
  });
  return html;
}

let summary = document.querySelector('.js-order-summary');
    summary.innerHTML = carthtml;
    console.log(carthtml)

    document.querySelectorAll('.js-delete-link')
      .forEach((link)=>{
        link.addEventListener('click',()=>{
          const delId = link.dataset.productId;
          removeCart(delId);
          const con = document.querySelector(`.js-cart-container-${delId}`)        
          console.log(con);
          con.remove();
        })
      })