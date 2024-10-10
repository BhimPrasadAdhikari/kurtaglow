const url = `${process.env.NEXT_PUBLIC_API_URL}products`;
// const url="https://admin-dashboard-eight-lemon.vercel.app/api/66e1b12be5a4dd025ef9081f/products"
const getProduct = async (id: string) => {
  const res = await fetch(`${url}` + "/" + `${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
};

export default getProduct;
