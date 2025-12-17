
import "./Hero.css";
import bg from "../../assets/bg.png";

function Hero({ setShowDiscount }) {
    return (
        <section>
            <div className="hero flex" id='home'>
                <div className="hero-left ">
                    <p>trendy treasures</p>

                    <h1>
                        elevate your look <span>with every click.</span>
                        shop today!
                    </h1>

                    <h4 className='para'>
                        explore our collection of stylish clothing
                and footwear made for comfort, quality, and every confidence
                    </h4>

                    <div className="dual-button flex border">
                        <div className="left-box">
                            <span>30% OFF</span>
                            <p>On All Items</p>
                        </div>

                        <button
                            className="right-btn"
                            onClick={() => {
                                setShowDiscount(true);
                                document.getElementById("prod").scrollIntoView({
                                    behavior: "smooth"
                                });
                            }}
                        >
                            Shop now
                        </button>
                    </div>
                </div>

                <div className="hero-right">
                    <img src={bg} alt="" />
                </div>
            </div>
        </section>
    );
}

export default Hero;
