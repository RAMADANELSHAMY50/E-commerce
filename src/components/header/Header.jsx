import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase"; 
import logo from "../../assets/logo.png";
import userIcon from "../../assets/user.svg";
import searchIcon from "../../assets/search.svg";
import basket_add from "../../assets/basket-add.svg";
import "./Header.css";

function Header({ setSearchTerm, cartItems, user }) {
  const [input, setInput] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showLogout, setShowLogout] = useState(false); 
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);


  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      setSearchTerm(input);
      navigate("/products");
      setInput("");
      setShowSearchInput(false);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setShowLogout(false);
      navigate("/"); 
    } catch (err) {
      console.error(err);
    }
  };


  const getInitials = (name) => {
    if (!name) return "U"; 
    const parts = name.split(" ");
    return parts.map(p => p[0].toUpperCase()).join(" ").slice(0, 3); 
  };

  return (
    <div className="container">
      <div className="navbar flex">

  {/* Logo + Name */}
  <div className="icon flex">
    <img src={logo} alt="" />
    <h2>shop</h2>
  </div>

  {/* Search (دايمًا ظاهر) */}
  <div className="search-area">
    <button
      className="search-toggle"
      onClick={() => setShowSearchInput(!showSearchInput)}
    >
      <img src={searchIcon} alt="search" />
    </button>

    {showSearchInput && (
      <div className="search-wrapper">
        <form onSubmit={handleSearch} className="search-form flex">
          <input
            type="text"
            placeholder="Search products..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
          />
          <button type="submit">
            <img src={searchIcon} alt="search" />
          </button>
          
        </form>
      </div>
    )}
  </div>

  {/* Menu Button */}
  <button className="menu-toggle" onClick={() => setShowMenu(!showMenu)}>
    ☰
  </button>

  {/* Mobile Menu */}
  <div className={`mobile-menu ${showMenu ? "active" : ""}`}>

    <div className="links">
      <ul>
        <li><a href="#home">home</a></li>
        <li><a href="#collect">collection</a></li>
        <li><a href="#prod">products</a></li>
      </ul>
    </div>

    <div className="menu-actions">

      <div className="cart-icon">
        <img
          src={basket_add}
          alt="cart"
          onClick={() => navigate("/cart")}
        />
        {cartItems.length > 0 && (
          <span className="cart-count">{cartItems.length}</span>
        )}
      </div>

      {user ? (
        <div className="user-dropdown">
          <button
            className="user-initials"
            onClick={() => setShowLogout(!showLogout)}
          >
            {getInitials(user.displayName)}
          </button>
          {showLogout && (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      ) : (
        <button onClick={() => navigate("/login")}>
          <img src={userIcon} alt="" /> <span>Login</span>
        </button>
      )}

    </div>
  </div>

</div>

    </div>
  );
}

export default Header;
