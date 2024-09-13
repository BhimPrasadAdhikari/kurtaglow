






import { Product as ProductType } from '@/types';

const url=`${process.env.NEXT_PUBLIC_API_URL}/products`;
const getProduct = async (id:string):Promise<ProductType> => {
 const res= await fetch(`${url}/${id}`);
 return res.json()
}

export default getProduct