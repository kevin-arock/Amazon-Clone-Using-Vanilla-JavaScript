export let cart = [{
    productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity:2,
},
{
    productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:2,
}
];

export function addCart(productID){
  
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
  }


  export function removeCart(prodId){
    const newCart = cart.filter((val)=>{
      return val.productId !== prodId;
    });
    cart = newCart;
    
  }