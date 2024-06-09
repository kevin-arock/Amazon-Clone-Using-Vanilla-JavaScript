import { cart } from "../cart.js";
import { getProduct } from "../products.js";
import { getDelivery } from "../delivery.js";
export function payment(){
    let payhtml = ``;
    let productPrice=0;
    let shippingPrice =0;
    cart.forEach((item)=>{
        const product  = getProduct(item.productId);
        productPrice+=product.priceCents * item.quantity;
        const deliveryOption = getDelivery(item.deliveryId);
        shippingPrice += deliveryOption.priceCents;
    });
    const totalBeforeTax = productPrice + shippingPrice;
    const tax = totalBeforeTax * 0.1;
    const total = totalBeforeTax + tax;
    payhtml += `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">
            $${(productPrice/100).toFixed(2)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">
            $${(shippingPrice/100).toFixed(2)}
            </div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">
            $${(totalBeforeTax/100).toFixed(2)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">
            $${(tax/100).toFixed(2)}
            </div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">
            $${(total/100).toFixed(2)}
            </div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `;
    document.querySelector('.js-pay-sum')
    .innerHTML = payhtml;
}
