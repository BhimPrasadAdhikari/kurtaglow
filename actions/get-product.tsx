






import { Product as ProductType } from '@/types';

const url=`${process.env.NEXT_PUBLIC_API_URL}products`;
// const url="https://admin-dashboard-eight-lemon.vercel.app/api/66e1b12be5a4dd025ef9081f/products"
const getProduct = async (id:string):Promise<ProductType> => {
 const res= await fetch(`${url}`+'/'+`${id}`);
 return res.json()
}

export default getProduct