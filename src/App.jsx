import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./Styles/index.css";
import useAppStore from "./Store/useAppStore";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Toast from "./Components/Toast";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import ProductDetail from "./Pages/ProductDetail";
import Cart from "./Pages/Cart";
import Wishlist from "./Pages/Wishlist";
import About from "./Pages/About";
import Contact from "./Pages/Contact";

export default function App() {
  const loadProducts = useAppStore((s) => s.loadProducts);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <div className="flex min-h-svh flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <Toast />
    </div>
  );
}
