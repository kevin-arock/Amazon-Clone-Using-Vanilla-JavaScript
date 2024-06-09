export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart = [{
      productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity:2,
      deliveryId:'1'
    
  },
  {
      productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity:2,
      deliveryId:'2'
  }
  ];
}

function addToLocal(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addCart(productID,cq){
  
    let match;
  
    cart.forEach((item)=>{
      if(productID === item.productId){
        match = item;
      }
    });
  
    if(match){
      match.quantity +=Number(cq);
    }else{
      cart.push({
        productId:productID,
        quantity:Number(cq),
        deliveryId:'1'
      })
    }
    addToLocal();

  }


  export function removeCart(prodId){
    const newCart = cart.filter((val)=>{
      return val.productId !== prodId;
    });
    cart = newCart;
    addToLocal(); 
  }

export function updateDeliveryOption(productId,deliveryId){
  let match;
  
    cart.forEach((item)=>{
      if(productId === item.productId){
        match = item;
      }
    });

    match.deliveryId = deliveryId;

    addToLocal();
}

