import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase.js";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from "firebase/auth";
import "./Login.css";

function Login() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignup, setIsSignup] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            if (isSignup) {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(userCredential.user, {
                    displayName: `${firstName} ${lastName}`
                });
                alert("Account created successfully 🎉");
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                alert("Logged in successfully ✅");
            }

            // إعادة ضبط الحقول
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");

            navigate("/"); // بعد تسجيل الدخول ارجع للصفحة الرئيسية

        } catch (err) {
            setError(err.message);
        }
    };

    // دالة تسجيل الدخول باستخدام Google
    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            alert(`Logged in as ${user.displayName}`);
            navigate("/"); // إعادة توجيه بعد تسجيل الدخول
        } catch (err) {
            console.error(err.message);
            setError(err.message);
        }
    };

    return (
        <div className="login-container">
            <form className="login-box" onSubmit={handleSubmit}>
                <h2>{isSignup ? "Sign Up" : "Login"}</h2>

                {error && <p className="error">{error}</p>}

                {isSignup && (
                    <>
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </>
                )}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">
                    {isSignup ? "Create Account" : "Login"}
                </button>

                <p className="toggle">
                    {isSignup ? "Already have an account?" : "Don't have an account?"}
                    <span onClick={() => setIsSignup(!isSignup)}>
                        {isSignup ? " Login" : " Sign Up"}
                    </span>
                </p>

                <button type="button" onClick={handleGoogleSignIn}>
                    Sign in with Google
                </button>
            </form>
        </div>
    );
}

export default Login;
