import "./CartPage.css";
import { useNavigate } from "react-router-dom";

function CartPage({ cartItems, removeFromCart }) {
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (item.offerPrice || item.price),
    0
  );

  return (
    <div className="cart-page">

      {/* 🔙 زر الرجوع */}
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back to Home
      </button>

      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.images[0]} alt={item.name} />
                <div className="cart-item-info">
                  <p>{item.name}</p>
                  <p>${item.offerPrice || item.price}</p>
                  <button onClick={() => removeFromCart(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <h3>Total: ${totalPrice}</h3>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
