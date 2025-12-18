import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/header/Header.jsx";
import Hero from "./components/hero/Hero.jsx";
import Product from "./components/product/Product.jsx";
import Check from "./components/check-offers/Check.jsx";
import Allproduct from "./components/all_products/Allproduct.jsx";
import Footer from "./components/footer/Footer.jsx";
import CartPage from "./components/cart/CartPage.jsx";
import Login from "./components/login/Login.jsx";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [showDiscount, setShowDiscount] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); 
    });
    return () => unsubscribe();
  }, []);

  const addToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  const removeFromCart = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <Header
        user={user}
        setSearchTerm={setSearchTerm}
        cartItems={cartItems}
      />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero setShowDiscount={setShowDiscount} />
              <Product addToCart={addToCart} />
              <Check setShowDiscount={setShowDiscount} />
              <Allproduct
                showDiscount={showDiscount}
                setShowDiscount={setShowDiscount}
                searchTerm={searchTerm}
                addToCart={addToCart}
              />
              <Footer />
            </>
          }
        />
        <Route
          path="/products"
          element={
            <Allproduct
              showDiscount={showDiscount}
              setShowDiscount={setShowDiscount}
              searchTerm={searchTerm}
              addToCart={addToCart}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <CartPage cartItems={cartItems} removeFromCart={removeFromCart} />
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
