export interface Billboard {
    id:string;
    label:string;
    imageUrl:string;
}
export interface Category{
    id:string;
    name:string;
    billboard:Billboard;
}
export interface Product{
    id:string,
    name:string,
    price:number,
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