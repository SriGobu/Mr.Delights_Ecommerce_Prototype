// PROTOTYPE: these functions replace the real HTTP calls with in-memory mock
// data. Signatures and response shape ({ success, data }) match the original
// API wrappers, so the store never needs to know the difference.
//
// To reconnect a real backend later, restore Config/axios.js and change these
// two functions back to:
//   api.get("/api/products")  and  api.get(`/api/products/${id}`)
import { MOCK_PRODUCTS } from "../Data/mockProducts";

export const fetchProducts = async () => ({
  success: true,
  data: MOCK_PRODUCTS,
});

export const fetchProductById = async (id) => {
  const product = MOCK_PRODUCTS.find((p) => p.id === id);
  if (!product) throw new Error("Product not found");
  return { success: true, data: product };
};
