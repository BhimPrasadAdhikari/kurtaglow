




import qs from 'query-string';
export interface Query {
     email: string;
}

import { Order as OrderType } from '@/types';

// const baseUrl=`${process.env.NEXT_PUBLIC_API_URL}orders`;
const baseUrl="https://admin-dashboard-eight-lemon.vercel.app/api/66e1b12be5a4dd025ef9081f/orders"
const getOrders = async (query:Query):Promise<OrderType[]> => {
    const url=qs.stringifyUrl({
        url:baseUrl,
        query:{
          email:query.email,
        }
      })
 const res= await fetch(url);
 return res.json()
}

export default getOrders