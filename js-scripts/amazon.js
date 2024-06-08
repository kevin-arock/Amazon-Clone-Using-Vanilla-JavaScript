// const products = [
//     {
//         img:"images/products/athletic-cotton-socks-6-pairs.jpg",
//         name:"Black and Gray Athletic Cotton Socks - 6 Pairs",
//         rating:{
//                 star:"images/ratings/rating-45.png",
//                 count:87,

//             },
//         price:1090
        
//     },
//     {
//         img:"images/products/intermediate-composite-basketball.jpg",
//         name:"Intermediate Size Basketball",
//         rating:{
//                 star:"images/ratings/rating-40.png",
//                 count:127,

//             },
//         price:2095
        
//     },
//     {
//         img:"images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
//         name:"Adults Plain Cotton T-Shirt - 2 Pack",
//         rating:{
//                 star:"images/ratings/rating-45.png",
//                 count:56,

//             },
//         price:799
        
//     },


// ]
let productHTML = ``;
products.forEach((product) =>{
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
            <select>
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

document.querySelectorAll('.js-add-cart')
  .forEach((btn)=>{
    btn.addEventListener('click',()=>{
        const productID = btn.dataset.productId;

        let match;

        cart.forEach((item)=>{
          if(productID === item.productId){
            match = item;
          }
        });

        if(match){
          match.quantity +=1;
        }else{
          cart.push({
            productId:productID,
            quantity:1
          })
        }
        console.log(cart);
    })
  })
