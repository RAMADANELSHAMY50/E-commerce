import "./Product.css";
import basket from "../../assets/basket-add.svg";
import { dummyProducts } from "../product/Product-data.js";
function Product({ addToCart }) {
  
    return (
    <section className="products-container" >
      <div className="head">
            <h1>new arrivals</h1>.
            <p>explore our collection of stylish clothing
                and footwear made for comfort, quality, and every confidence
            </p>
        </div>
  <div className="slider-track flex">
    {[...dummyProducts, ...dummyProducts].map((item, index) => (
      <div className="product-card " key={index}>
        <div className="image-wrapper">
          <img src={item.images[0]} alt={item.name} />
          {item.offerPrice && (
            <span className="offer-tag">
              {Math.round(((item.price - item.offerPrice) / item.price) * 100)}% OFF
            </span>
          )}
        </div>
        <p className="product-name">{item.name}</p>
        <div className="price-box">
          <span className="new-price">${item.offerPrice}</span>
          <span className="old-price">${item.price}</span>
        </div>
        <button 
              className="btn-add flex"
              onClick={() => addToCart(item)} 
            >
              <img src={basket} alt="" /> Add to Cart
            </button>
      </div>
    ))}
  </div>
</section>


    );
}

 

export default Product