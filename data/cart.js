export const cart = [];

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