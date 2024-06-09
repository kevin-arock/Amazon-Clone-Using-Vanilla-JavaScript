class Cart {
    cartItems;
    #localStorageKey;
    constructor(localStorageKey){
        this.#localStorageKey = localStorageKey;
        this.#localFromStorage(); 
    }
    #localFromStorage(){
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

        if(!this.cartItems){
            this.cartItems = [
                {
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
    }
    savStorage(){
        localStorage.setItem('cartItems', JSON.stringify(this.#localStorageKey));
    }
    addcartItem(productID,cq){
  
        let match;
      
        this.cartItem.forEach((item)=>{
          if(productID === item.productId){
            match = item;
          }
        });
      
        if(match){
          match.quantity +=Number(cq);
        }else{
          this.cartItem.push({
            productId:productID,
            quantity:Number(cq),
            deliveryId:'1'
          })
        }
        this.savStorage();
    
    }
    removecartItem(prodId){
        const newcartItem = this.cartItem.filter((val)=>{
          return val.productId !== prodId;
        });
        this.cartItem = newcartItem;
        this.savStorage(); 
    }
    updateDeliveryOption(productId,deliveryId){
        let match;
    
        this.cartItem.forEach((item)=>{
        if(productId === item.productId){
            match = item;
        }
        });
    
        match.deliveryId = deliveryId;
    
        this.savStorage();
    }
}


const cart = new Cart('user');
const bs = new Cart('business');



console.log(cart.cartItems);
console.log(bs.cartItems);





 


