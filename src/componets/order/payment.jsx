import { useState } from "react";
// import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./payment.module.css";

export default function Payment() {
  const [currentStep, setCurrentStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("qr");

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    zipCode: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const steps = ["Shipping", "Payment", "Review"];

  // 🔹 Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // 🔹 Validation
  const validateStep = () => {
    let newErrors = {};

    if (currentStep === 0) {
      if (!formData.fullName) newErrors.fullName = "Full name required";
      if (!formData.address) newErrors.address = "Address required";
    }

    if (currentStep === 1 && paymentMethod === "card") {
      if (!formData.cardName) newErrors.cardName = "Card name required";
      if (formData.cardNumber.length !== 16)
        newErrors.cardNumber = "Card must be 16 digits";
      if (!formData.expiry) newErrors.expiry = "Expiry required";
      if (formData.cvv.length !== 3) newErrors.cvv = "Invalid CVV";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔹 Navigation
  const nextStep = () => {
    if (!validateStep()) return;
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => setCurrentStep((prev) => prev - 1);

  // 🔹 Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("🎉 Purchase Complete!");
    console.log(formData);
  };

  const progressWidth = (currentStep / (steps.length - 1)) * 100;

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.formPanel}>
        <h1 className="h4 fw-bold mb-4">Complete your purchase</h1>

        {/* Progress Bar */}
        <div className={styles.stepProgressBar}>
          <div
            className={styles.progress_indicator}
            style={{ width: `${progressWidth}%` }}
          />
        </div>

        {/* Step Header */}
        <div className={styles.step_header}>
          {steps.map((step, index) => (
            <div
              key={index}
              className={`${styles.step_item} ${
                index === currentStep
                  ? styles.active
                  : index < currentStep
                  ? styles.completed
                  : ""
              }`}
            >
              <div className={styles.step_number}>{index + 1}</div>
              <div className={styles.step_title}>{step}</div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {/* STEP 1 */}
          {currentStep === 0 && (
            <>
              <h5 className="fw-bold mb-3">Shipping Information</h5>

              <input
                className="form-control mb-2"
                placeholder="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
              <small className="text-danger">{errors.fullName}</small>

              <input
                className="form-control mb-2"
                placeholder="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
              <small className="text-danger">{errors.address}</small>

              <div className="row g-3">
                <div className="col-md-7">
                  <input
                    className="form-control"
                    placeholder="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-5">
                  <input
                    className="form-control"
                    placeholder="Zip Code"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="text-end mt-4">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={nextStep}
                >
                  Next
                </button>
              </div>
            </>
          )}

          {/* STEP 2 */}
          {currentStep === 1 && (
            <>
              <h5 className="fw-bold mb-3">Payment Details</h5>

              <div className="mb-3">
                <label className="me-3">
                  <input
                    type="radio"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                  />{" "}
                  Card
                </label>
                <label>
                  <input
                    type="radio"
                    checked={paymentMethod === "qr"}
                    onChange={() => setPaymentMethod("qr")}
                  />{" "}
                  QR Code
                </label>
              </div>

              {paymentMethod === "card" ? (
                <>
                  <input
                    className="form-control mb-2"
                    placeholder="Name on Card"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                  />
                  <small className="text-danger">{errors.cardName}</small>

                  <input
                    className="form-control mb-2"
                    placeholder="Card Number"
                    name="cardNumber"
                    maxLength={16}
                    value={formData.cardNumber}
                    onChange={handleChange}
                  />
                  <small className="text-danger">{errors.cardNumber}</small>

                  <div className="row">
                    <div className="col-6">
                      <input
                        className="form-control"
                        placeholder="MM/YY"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleChange}
                      />
                      <small className="text-danger">{errors.expiry}</small>
                    </div>
                    <div className="col-6">
                      <input
                        className="form-control"
                        placeholder="CVV"
                        maxLength={3}
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                      />
                      <small className="text-danger">{errors.cvv}</small>
                    </div>
                  </div>

                  <div className="text-end mt-4">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={nextStep}
                    >
                      Continue
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center mt-4">
                  <img src="/image/qr.jpg" alt="QR" width="200" />
                  <button
                    type="button"
                    className="btn btn-primary mt-3"
                    onClick={nextStep}
                  >
                    Payment Done
                  </button>
                </div>
              )}
            </>
          )}

          {/* STEP 3 */}
          {currentStep === 2 && (
            <>
              <h5 className="fw-bold mb-3">Review Order</h5>

              <p>
                <strong>Shipping:</strong>
                <br />
                {formData.fullName}, {formData.address},{" "}
                {formData.city} {formData.zipCode}
              </p>

              <p>
                <strong>Payment:</strong>
                <br />
                {paymentMethod === "card"
                  ? `Card ending **** ${formData.cardNumber.slice(-4)}`
                  : "QR Payment"}
              </p>

              <div className="d-flex justify-content-between mt-4">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={prevStep}
                >
                  Back
                </button>
                <button type="submit" className="btn btn-success">
                  Complete Purchase
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
// // PaymentPage.jsx
// import { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import style from  '../order/payment.module.css'

// export default function Payment() {
//     const [paymentMethod, setPaymentMethod] = useState("qr");
//     const [form, setForm] = useState({
//         name: "",
//         email: "",
//         cardNumber: "",
//         expiry: "",
//         cvv: "",
//     });

//     //   const handleChange = (e) => {
//     //     setForm({ ...form, [e.target.name]: e.target.value });
//     //   };
//     const [currentStep, setCurrentStep] = useState(0);

//     const [formData, setFormData] = useState({
//         fullName: "",
//         address: "",
//         city: "",
//         zipCode: "",
//         cardNumber: "",
//         cardName: "",
//         expiry: "",
//         cvv: "",
//     });

//     const steps = ["Shipping", "Payment", "Review"];

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const nextStep = () => {
//         if (currentStep === 0 && (!formData.fullName || !formData.address)) {
//             alert("Please fill shipping details");
//             return;
//         }
//         setCurrentStep((prev) => prev + 1);
//     };

//     const prevStep = () => {
//         setCurrentStep((prev) => prev - 1);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         alert("Purchase Complete!");
//         console.log(formData);
//     };

//     const progressWidth = (currentStep / (steps.length - 1)) * 100;
//     return (
//         <div className={style.checkoutContainer}>
//             {/* FORM PANEL */}
//             <div className={style.formPanel}>
//                 <h1 className="h3 fw-bold mb-4">Complete your purchase</h1>

//                 {/* Progress Bar */}
//                 <div className={style.stepProgressBar}>
//                     <div
//                         className="progress-indicator"
//                         style={{ width: `${progressWidth}%` }}
//                     />
//                 </div>

//                 {/* Step Header */}
//                 <div className={style.step_header}>
//                     {steps.map((step, index) => (
//                         <div
//                             key={index}
//                             className={`style.step_item  ${index === currentStep
//                                     ? style.active
//                                     : index < currentStep
//                                         ? style.completed
//                                         : ""
//                                 }`}
//                         >
//                             <div className={style.step_number}>{index + 1}</div>
//                             <div className={` ${style.step_title}d-none d-md-block`}>{step}</div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* FORM */}
//                 <form onSubmit={handleSubmit}>
//                     {/* STEP 1 */}
//                     {currentStep === 0 && (
//                         <div className="form-step active">
//                             <h2 className="h5 fw-bold mb-4">Shipping Information</h2>

//                             <input
//                                 className="form-control mb-3"
//                                 placeholder="Full Name"
//                                 name="fullName"
//                                 value={formData.fullName}
//                                 onChange={handleChange}
//                             />

//                             <input
//                                 className="form-control mb-3"
//                                 placeholder="Address"
//                                 name="address"
//                                 value={formData.address}
//                                 onChange={handleChange}
//                             />

//                             <div className="row g-3">
//                                 <div className="col-md-7">
//                                     <input
//                                         className="form-control"
//                                         placeholder="City"
//                                         name="city"
//                                         value={formData.city}
//                                         onChange={handleChange}
//                                     />
//                                 </div>
//                                 <div className="col-md-5">
//                                     <input
//                                         className="form-control"
//                                         placeholder="Zip Code"
//                                         name="zipCode"
//                                         value={formData.zipCode}
//                                         onChange={handleChange}
//                                     />
//                                 </div>
//                             </div>

//                             <div className="text-end mt-4">
//                                 <button type="button" className="btn btn-primary" onClick={nextStep}>
//                                     Next
//                                 </button>
//                             </div>
//                         </div>
//                     )}

//                     {/* STEP 2 */}
//                     {currentStep === 1 && (
//                         <div style={{ maxWidth: "500px", margin: "auto", marginTop: '40px', padding: "20px" }}>
//                             <h2>Payment Details</h2>

//                             <div>
//                                 <label>        <input
//                                     type="radio"
//                                     value="card"
//                                     checked={paymentMethod === "card"}
//                                     onChange={() => setPaymentMethod("card")}
//                                 />
//                                     Card
//                                 </label>
//                                 <label style={{ marginLeft: "20px" }}>
//                                     <input
//                                         type="radio"
//                                         value="qr"
//                                         checked={paymentMethod === "qr"}
//                                         onChange={() => setPaymentMethod("qr")}
//                                     />
//                                     QR Code
//                                 </label>
//                             </div>

//                             {paymentMethod === "card" && (

//                                 <div class="col-md-8 order-md-1">

//                                     <form>
//                                         <h4 class="mb-3">Payment</h4>
//                                         <div class="my-3">
//                                             <div class="form-check">
//                                                 <input id="credit" name="paymentMethod" type="radio" class="form-check-input" required />
//                                                 <label class="form-check-label" for="credit">Credit card</label>
//                                             </div>
//                                             <div class="form-check">
//                                                 <input id="debit" name="paymentMethod" type="radio" class="form-check-input" required />
//                                                 <label class="form-check-label" for="debit">Debit card</label>
//                                             </div>
//                                             <div class="form-check">
//                                                 <input id="paypal" name="paymentMethod" type="radio" class="form-check-input" required />
//                                                 <label class="form-check-label" for="paypal">PayPal</label>
//                                             </div>
//                                         </div>

//                                         <div class="row gy-3">
//                                             <div class="col-md-6">
//                                                 <label for="cc-name" class="form-label">Name on card</label>
//                                                 <input type="text" class="form-control" id="cc-name" required />
//                                                 <small class="text-muted">Full name as displayed on card</small>
//                                             </div>

//                                             <div class="col-md-6">
//                                                 <label for="cc-number" class="form-label">Credit card number</label>
//                                                 <input type="text" class="form-control" id="cc-number" required />
//                                             </div>

//                                             <div class="col-md-3">
//                                                 <label for="cc-expiration" class="form-label">Expiration</label>
//                                                 <input type="text" class="form-control" id="cc-expiration" required />
//                                             </div>

//                                             <div class="col-md-3">
//                                                 <label for="cc-cvv" class="form-label">CVV</label >
//                                                 <input type="text" class="form-control" id="cc-cvv" required />
//                                             </div>
//                                         </div>

//                                         <hr class="my-4" />
//                                         <button class="w-100 btn btn-primary btn-lg" type="submit">Continue to checkout</button>
//                                     </form>
//                                 </div>
//                             )}

//                             {paymentMethod === "qr" && (
//                                 <div style={{ marginTop: "20px" }}>
//                                     <p>Scan this QR code to pay:</p>
//                                     <img
//                                         src="/image/qr.jpg"
//                                         alt="QR Code"
//                                     />
//                                     <button onClick={nextStep} class="w-10 btn btn-primary btn-lg" type="submit">Continue to  pay</button>
//                                 </div>
//                             )}


//                         </div>
//                     )}

//                     {/* STEP 3 */}
//                     {currentStep === 2 && (
//                         <div className={`${style.form_step } ${style.active}`}>
//                             <h2 className="h5 fw-bold mb-4">Review Your Order</h2>

//                             <p>
//                                 <strong>Shipping:</strong><br />
//                                 {formData.fullName}, {formData.address}, {formData.city}{" "}
//                                 {formData.zipCode}
//                             </p>

//                             <p>
//                                 <strong>Payment:</strong><br />
//                                 Card ending in **** {formData.cardNumber.slice(-4)}
//                             </p>

//                             <div className="d-flex justify-content-between mt-4">
//                                 <button type="button" className="btn btn-light" onClick={prevStep}>
//                                     Previous
//                                 </button>
//                                 <button type="submit" className="btn btn-success">
//                                     Complete Purchase
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                 </form>
//             </div>
//         </div>
//     );
// }
