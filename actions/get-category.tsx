






import { Category as CategoryType } from '@/types';

// const url=`${process.env.NEXT_PUBLIC_API_URL}/categories`;
const url ="https://admin-dashboard-eight-lemon.vercel.app/api/66e1b12be5a4dd025ef9081f/categories";

const getCategory = async (id:string):Promise<CategoryType> => {
 const res= await fetch(`${url}/${id}`);
 return res.json()
}

export default getCategory