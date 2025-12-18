import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Allproduct.css";
import basket from "../../assets/basket-add.svg";
import { dummyProducts } from "../product/Product-data";

function Allproduct({ showDiscount, setShowDiscount, addToCart }) {
  const [showAll, setShowAll] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

 
  const query = new URLSearchParams(location.search);
  const searchTerm = query.get("search")?.toLowerCase() || "";

  
  const discountProducts = dummyProducts.filter((item) => {
    const discount = Math.round(((item.price - item.offerPrice) / item.price) * 100);
    return discount >= 30;
  });


  const searchedProducts = searchTerm
    ? dummyProducts.filter((item) => item.name.toLowerCase().includes(searchTerm))
    : dummyProducts;

  const productsToShow = showDiscount
    ? discountProducts
    : showAll
      ? searchedProducts
      : searchedProducts.slice(0, 4);

  return (
    <section className="Allproducts-container" id="prod" >
      <div className="head">
        <h1 id="h1">popular products</h1>
        <p id="p">
          explore our collection of stylish clothing and footwear made for comfort,
          quality, and confidence
        </p>
      </div>

     
      {location.pathname === "/products" && (
        <button className="back-btn" onClick={() => navigate("/")}>
          ⬅ Back to Home
        </button>
      )}

      <div className="slider-track1">
        {productsToShow.map((item, index) => (
          <div
            className="product-card1 fade-in"
            key={item._id}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="image-wrapper1">
              <img src={item.images[0]} alt={item.name} />
              {item.offerPrice && (
                <span className="offer-tag1">
                  {Math.round(((item.price - item.offerPrice) / item.price) * 100)}% OFF
                </span>
              )}
            </div>

            <p className="product-name1">{item.name}</p>

            <div className="price-box1">
              <span className="new-price1">${item.offerPrice}</span>
              <span className="old-price1">${item.price}</span>
            </div>

            <button className="btn-add1" onClick={() => addToCart(item)}>
              <img src={basket} alt="" /> Add to Cart
            </button>
          </div>
        ))}
      </div>

      {!showDiscount && searchedProducts.length > 4 && (
        <button className="btn-show-more" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Less" : "Show More"}
        </button>
      )}

      {showDiscount && (
        <button className="btn-show-more" onClick={() => setShowDiscount(false)}>
          Show All Products
        </button>
      )}
    </section>
  );
}

export default Allproduct;
