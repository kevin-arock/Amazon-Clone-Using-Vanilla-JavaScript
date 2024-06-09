import { cart,removeCart,updateDeliveryOption } from "../data/cart.js";
import { getProduct, products } from "../data/products.js";
import '../data/cart-oop.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { delivery,getDelivery } from "../data/delivery.js"; 
import { payment } from "../data/checkout-helper/payment.js";

function renderCart(){
  
      let carthtml = ``;
      cart.forEach((item)=>{
          let pid = item.productId;
          let matching = getProduct (pid);
          let deliveryOption = getDelivery(item.deliveryId);
          const today = dayjs();
          const date = today.add(deliveryOption.deliveryDays,'days');
          const dateString = date.format('dddd, MMMM D');
          carthtml +=`
          
          <div class="cart-item-container js-cart-container-${matching.id}">
                  <div class="delivery-date">
                    Delivery date:${dateString}
                  </div>

                  <div class="cart-item-details-grid">
                    <img class="product-image"
                      src="${matching.image}">

                    <div class="cart-item-details">
                      <div class="product-name">
                        ${matching.name}
                      </div>
                      <div class="product-price">
                        $${matching.getPrice}
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
          const isChecked = delivery.id === item.deliveryId;
          
          const today = dayjs();
          const date = today.add(delivery.deliveryDays,'days');
          const dateString = date.format('dddd, MMMM D');
          const price = delivery.priceCents === 0 ? 'FREE' : `$${delivery.priceCents.toFixed(2)}-`;
          html+=`
          <div class="delivery-option js-delivery-options" data-product-id="${matching.id}"
          data-delivery-option-id="${delivery.id}"
          >
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

          document.querySelectorAll('.js-delete-link')
            .forEach((link)=>{
              link.addEventListener('click',()=>{
                const delId = link.dataset.productId;
                removeCart(delId);
                const con = document.querySelector(`.js-cart-container-${delId}`)        
                console.log(con);
                con.remove();
                payment();
              })
            })

        document.querySelectorAll('.js-delivery-options')
            .forEach((el)=>{
              el.addEventListener('click',()=>{
                const {productId,deliveryOptionId} = el.dataset;
                console.log(productId,deliveryOptionId);
                updateDeliveryOption(productId,deliveryOptionId);
                renderCart();
                payment();
              })
            })
      console.log('ok');
}
payment();
renderCart();