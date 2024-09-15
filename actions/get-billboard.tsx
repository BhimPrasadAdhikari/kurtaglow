






import { Billboard as BillboardType } from '@/types';

// const baseUrl=`${process.env.NEXT_PUBLIC_API_URL}/billboards`;
const baseUrl="https://admin-dashboard-eight-lemon.vercel.app/api/66e1b12be5a4dd025ef9081f/billboards"
const getBillboard = async (id:string):Promise<BillboardType> => {
 const url=baseUrl+'/'+id;
 const res= await fetch(url);
 return res.json()
}

export default getBillboard