import { cart,addCart } from "../data/cart.js";
import { products } from "../data/products.js";
let productHTML = ``;
products.forEach((product,i) =>{
     productHTML+= `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents/100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-sel-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    
    `;
})

const productGrid = document.querySelector('.js-product-grid');
productGrid.innerHTML = productHTML;
let cartQuantity = 0;
function updateCartUI(productID){
   const val = document.querySelector(`.js-quantity-sel-${productID}`);
   cartQuantity+=Number(val.value);
  
  let cartQuantityHtml = document.querySelector('.js-cart-quantity');
  cartQuantityHtml.innerHTML = `${cartQuantity}`;
}

document.querySelectorAll('.js-add-cart')
  .forEach((btn)=>{
    btn.addEventListener('click',()=>{
        const productID = btn.dataset.productId;
        const val = document.querySelector(`.js-quantity-sel-${productID}`);
        let cq =Number(val.value);
        updateCartUI(productID);
        addCart(productID,cq);
        
        
        
    })
  })
