import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { BuyItem } from "../context/store";
import styles from "../sign_login/login.module.css";

function LogIn() {
  const [pass, setPass] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);


  const { user, setLoginStatus } = useContext(BuyItem);

  const isValid = pass.length >= 8 && phone.length === 10;

  const authentication = (e) => {
    e.preventDefault();

    if (!isValid) return;

    if (user?.number === phone && user?.password === pass) {
      setLoginStatus(true);
      navigate("/");
    } else {
      setError("Invalid phone number or password");
    }
  };

  return (
    <div className={styles.main}>
      <form className={styles.Form} onSubmit={authentication}>
        <h1 className={styles.head}>Log In</h1>

        <input
          maxLength={10}
          className={styles.level}
          type="text"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value.replace(/[^0-9]/g, ""))
          }
          placeholder="Enter phone number"
        />

        {/* <input
          className={styles.levelpass}
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Password"
        /> */}
        <div className={styles.passwordWrapper}>
  <input
    className={styles.levelpass}
    type={showPassword ? "text" : "password"}
    value={pass}
    onChange={(e) => setPass(e.target.value)}
    placeholder="Password"
  />

  <span
    className={styles.eye}
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? "🙈" : "👁️"}
  </span>
</div>


        <button
          type="submit"
          className={isValid ? styles.button : styles.utton}
          disabled={!isValid}
        >
          Log In
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <p>
          Don’t have an account?{" "}
          <span
            className={styles.su}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
}

export default LogIn;
