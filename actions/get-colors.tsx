







import { Color } from '@/types';
// const url=`${process.env.NEXT_PUBLIC_API_URL}colors`;
const url ="https://admin-dashboard-eight-lemon.vercel.app/api/66e1b12be5a4dd025ef9081f/colors"
const getColors =async ():Promise<Color[]> => {
  const res= await fetch(url);
    return res.json()
}
export default getColors;