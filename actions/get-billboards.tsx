import { Billboard as BillboardType } from "@/types";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}billboards`;
// const baseUrl="https://admin-dashboard-eight-lemon.vercel.app/api/66e1b12be5a4dd025ef9081f/billboards"
const getBillboards = async (): Promise<BillboardType[]> => {
  const res = await fetch(baseUrl);
  if (!res.ok) {
    throw new Error("Failed to fetch billboards");
  }

  return res.json();
};

export default getBillboards;
