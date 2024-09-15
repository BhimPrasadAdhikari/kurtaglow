







import { Size } from '@/types';
// const url=`${process.env.NEXT_PUBLIC_API_URL}/sizes`;
const url="https://admin-dashboard-eight-lemon.vercel.app/api/66e1b12be5a4dd025ef9081f/sizes"
const getSizes =async ():Promise<Size[]> => {
  const res= await fetch(url);
    return res.json()
}
export default getSizes;