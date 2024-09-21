






import { Specification as SpecificationType } from '@/types';
import qs from 'query-string';

export interface Query {
    categoryId?: string;
  }
const baseUrl=`${process.env.NEXT_PUBLIC_API_URL}specifications`;
// const baseUrl="https://admin-dashboard-eight-lemon.vercel.app/api/66e1b12be5a4dd025ef9081f/billboards"
const getSpecifications = async (query:Query):Promise<SpecificationType[]> => {
 const url=qs.stringifyUrl({
    url:baseUrl,
    query:{
      categoryId:query.categoryId,
    }
  })
 const res= await fetch(url);
 return res.json()
}

export default getSpecifications