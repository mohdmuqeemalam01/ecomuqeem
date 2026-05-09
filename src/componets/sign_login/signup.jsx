import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { BuyItem } from "../context/store";
import FourDigitInpu from "./otp";
import styles from "../sign_login/signUp.module.css";

function SignUp() {
  const { setUser, user } = useContext(BuyItem);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [num, setNum] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);

  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [otpStep, setOtpStep] = useState(false);

  const isValid =
    name.length >= 3 && num.length === 10 && pass.length >= 8;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValid) {
      setError(
        "Name (min 3), valid 10-digit number & password (min 8) required"
      );
      return;
    }

    setUser({ name, number: num, password: pass });

    setShowAlert(true);
    setOtpStep(true);
    setError("");

    setTimeout(() => setShowAlert(false), 2000);
  };

  return (
    <div className={styles.main}>
      {!otpStep ? (
        <form className={styles.Form} onSubmit={handleSubmit}>
          <h2 className={styles.head}>Sign Up</h2>

          <input
            className={styles.level}
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value.replace(/[^a-zA-Z ]/g, ""))
            }
          />

          <input
            className={styles.level}
            type="text"
            maxLength={10}
            placeholder="Phone Number"
            value={num}
            onChange={(e) =>
              setNum(e.target.value.replace(/[^0-9]/g, ""))
            }
          />

          {/* PASSWORD */}
          <div className={styles.passwordWrapper}>
            <input
              className={styles.level}
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <span
              className={styles.eye}
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? "🙈" : "👁️"}
            </span>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button
            type="submit"
            className={isValid ? styles.button : styles.utton}
            disabled={!isValid}
          >
            Create Account
          </button>

          <p className={styles.bottomText}>
            Have an account?{" "}
            <span className={styles.link} onClick={() => navigate("/login")}>
              Log In
            </span>
          </p>
        </form>
      ) : (
        <div className={styles.otpBox}>
          <p className={styles.head}>
            Enter OTP sent to <br /> <b>{user.number}</b>
          </p>
          <FourDigitInpu />
        </div>
      )}

      {showAlert && <div className={styles.alertBox}>Your OTP is 1223</div>}
    </div>
  );
}

export default SignUp;
