export interface Billboard {
    id:string;
    label:string;
    imageUrl:string;
}
export interface Category{
    id:string;
    name:string;
    billboard:Billboard;
    specifications:Specification[];
}
export interface Specification{
    id:String;
    name:String;
    value:String[];
}
export interface Product{
    id:string,
    name:string,
    detail:string,
    price:number,
    discount:number,
    quantity:number,
    stock: number,    
    isFeatured:boolean,
    color:Color,
    category:Category,
    images:Images[],
    size:Size

}
export interface Color {
    id:string,
    name:string,
    value:string

}
export interface Size {
    id:string,
    name:string,
    value:string
}
export interface Images{
    id:string,
    url:string
}
export interface Order{
    id:string;
    orderItems: Orderitem[];
    isPaid:boolean;
    paymentStatus:string;
    phone:string;
    address:string;
}
export interface Orderitem{
    id:string;
    orderId:string;
    productId:string;
    quantity:number;
    product : Product;

}