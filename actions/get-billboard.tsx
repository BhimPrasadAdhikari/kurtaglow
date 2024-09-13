






import { Billboard as BillboardType } from '@/types';

const baseUrl=`${process.env.NEXT_PUBLIC_API_URL}/billboards`;
const getBillboard = async (id:string):Promise<BillboardType> => {
 const url=baseUrl+'/'+id;
 const res= await fetch(url);
 return res.json()
}

export default getBillboard