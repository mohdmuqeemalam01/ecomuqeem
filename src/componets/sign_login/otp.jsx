import React, { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router";
import { BuyItem } from "../context/store";

function FourDigitInput() {
  const { setLoginStatus, setShowAlert, user } = useContext(BuyItem);
  const [digits, setDigits] = useState(["", "", "", ""]);
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const OTP = "1223";

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);
    if (value && index < 3) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, 4);
    if (!/^\d+$/.test(paste)) return;
    const newDigits = paste.split("");
    setDigits([...newDigits, "", "", "", ""].slice(0, 4));
    inputsRef.current[Math.min(paste.length, 4) - 1]?.focus();
  };

  const verifyOtp = () => {
    const enteredOtp = digits.join("");
    if (enteredOtp === OTP) {
      navigate("/");
      setLoginStatus(true);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };
return (
  <div className="container-fluid d-flex flex-column align-items-center justify-content-center p-0">
    <div 
      className="w-100" 
      style={{ maxWidth: "450px" }}
    >
      <div className="text-center">
        <h4 className="fw-bold mb-2" style={{ color: "#2b6a4a" }}>Verify OTP</h4>
        <p className="text-muted small mb-4">Enter the 4-digit code sent to your device</p>

        <div className="d-flex gap-2 gap-sm-3 justify-content-center mb-4">
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="form-control text-center fw-bold shadow-none"
              style={{
                width: "50px",
                height: "60px",
                fontSize: "1.2rem",
                borderRadius: "10px",
                border: "2px solid #e1e8e4",
                backgroundColor: "#fafcfb",
                transition: "all 0.2s ease"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#77b479";
                e.target.style.boxShadow = "0 0 0 4px rgba(119, 180, 121, 0.15)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e1e8e4";
                e.target.style.boxShadow = "none";
              }}
            />
          ))}
        </div>

        <button
          onClick={verifyOtp}
          className="btn w-100 fw-bold text-white shadow-sm"
          style={{
            background: "linear-gradient(135deg, #77b479, #40916c)",
            borderRadius: "10px",
            padding: "12px",
            border: "none"
          }}
        >
          Verify Account
        </button>
        
        <div className="mt-3">
          <span className="text-muted small">Didn't receive a code? </span>
          <button className="btn btn-link btn-sm p-0 text-decoration-none fw-bold" style={{ color: "#40916c" }}>
            Resend
          </button>
        </div>
      </div>
    </div>
  </div>
);
}

export default FourDigitInput;