






import { Order as OrderType } from '@/types';

// const url=`${process.env.NEXT_PUBLIC_API_URL}orders`;
const url ="https://admin-dashboard-eight-lemon.vercel.app/api/66e1b12be5a4dd025ef9081f/categories";

const getOrder = async (id:string):Promise<OrderType> => {
 const res= await fetch(`${url}/${id}`);
 return res.json()
}

export default getOrder