export interface Billboard {
  id: string;
  label: string;
  imageUrl: string;
}
export interface Category {
  id: string;
  name: string;
  billboard: Billboard;
  specifications: Specification[];
}
export interface Specification {
  id: String;
  name: String;
  values: String[];
}
export interface Product {
  id: string;
  name: string;
  detail: string;
  price: number;
  discount: number;
  quantity: number;
  averageRating: number;
  stock: number;
  isFeatured: boolean;
  color: Color;
  Ratings: Rating[];
  category: Category;
  images: Images[];
  sizes:Size[];
  size: Size;
  productSpecification: { name: string; value: string }[];
}
export interface Color {
  id: string;
  name: string;
  value: string;
}
export interface Size {
  id: string;
  name: string;
  value: string;
}
export interface Images {
  id: string;
  url: string;
}
export interface Order {
  id: string;
  orderItems: Orderitem[];
  isPaid: boolean;
  paymentStatus: string;
  orderStatus:string;
  orderTotal : number;
  phone: string;
  address: string;
  createdAt: Date;
}
export interface Orderitem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  product: Product;
}
export interface ProductSpecification {
  id: string;
  productId: string;
  specId: string;
  value: string;
}
export interface Rating {
  id: string;
  productId: string;
  rating: number;
  userEmail: string;
  createdAt: Date;
}
