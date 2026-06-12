import { createContext, useEffect, useState } from "react";
import { products as initialProducts } from "../data/products";
import { useAuth } from "./useAuth";

const ProductContext = createContext();

export { ProductContext };

export const ProductProvider = ({ children }) => {
  const { token } = useAuth();
  const [products, setProducts] = useState(initialProducts);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.warn("Failed to load product data from API:", error);
        setProducts(initialProducts);
      }
    };

    fetchProducts();
  }, []);

  const addProduct = async (productData) => {
    const headers = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers,
        body: JSON.stringify(productData),
      });
      if (!response.ok) {
        throw new Error("Failed to add product");
      }
      const newProduct = await response.json();
      setProducts((prev) => [newProduct, ...prev]);
    } catch (error) {
      console.error("Product add error:", error);
      throw error;
    }
  };

  const removeProduct = async (productId) => {
    const headers = {};
    if (token) headers.Authorization = `Bearer ${token}`;

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
        headers,
      });
      if (!response.ok && response.status !== 204) {
        throw new Error("Failed to remove product");
      }
      setProducts((prev) => prev.filter((product) => product.id !== productId));
    } catch (error) {
      console.error("Product remove error:", error);
      throw error;
    }
  };

  const getProductById = (id) =>
    products.find((product) => product.id === parseInt(id, 10));

  const getProductsByCategory = (category) => {
    if (!category || category === "all") return products;
    return products.filter((product) => product.category === category);
  };

  const getFeaturedProducts = () =>
    products.filter((product) => product.featured);

  const getDiscountedProducts = () =>
    products.filter((product) => product.originalPrice > product.price);

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        removeProduct,
        getProductById,
        getProductsByCategory,
        getFeaturedProducts,
        getDiscountedProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
