import banner from "../../assets/banner1.png";
import "../check-offers/Check.css"

function Check({setShowDiscount}) {
     const handleCheckOffers = () => {
    if (setShowDiscount) setShowDiscount(true); 
    document.getElementById("prod").scrollIntoView({ 
      behavior: "smooth" 
    });
  };
  return (
    <main className="flex" id="collect">
        <div className="left">
            <h1>elevate your style with premium fashion
                collections
            </h1>

            <p>find clothing that comfort with modern trends, giving
                you a smart, stylish edge in every outfit daliy.
            </p>

            <button onClick={handleCheckOffers}>check offers</button>
        </div>

        <div className="right">
            <img src={banner} alt="" />
        </div>
    </main>
  )
}

export default Check;