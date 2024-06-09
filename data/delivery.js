export const delivery = [
    {
        id:'1',
        deliveryDays:7,
        priceCents:0
    },
    {
        id:'2',
        deliveryDays:3,
        priceCents:490
    },
    {
        id:'3',
        deliveryDays:3,
        priceCents:999
    }
]


export function getDelivery(deliveryOptionId){
    let deliveryOption;

    delivery.forEach((opt)=>{
        if(opt.id === deliveryOptionId){
            deliveryOption = opt;
        }
    });

    return deliveryOption || delivery[0];


}