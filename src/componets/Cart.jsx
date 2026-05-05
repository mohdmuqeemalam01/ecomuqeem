import { useContext, useMemo } from "react";
import { BuyItem } from "../componets/context/store.jsx";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Link } from "react-router-dom";
export default function Cart() {
  const { data, setData, loginStatus } = useContext(BuyItem);
  const navigate = useNavigate();

  /* ===============================
     GROUP SAME PRODUCTS (IMPORTANT)
  =============================== */
  const groupedCart = useMemo(() => {
    const map = {};

    data.forEach((item) => {
      if (map[item.id]) {
        map[item.id].qty += 1;
      } else {
        map[item.id] = { ...item, qty: 1 };
      }
    });

    return Object.values(map);
  }, [data]);

  /* ===============================
     CHANGE QUANTITY
  =============================== */
  const changeQty = (id, delta) => {
    setData((prev) => {
      const index = prev.findIndex((item) => item.id === id);
      if (index === -1) return prev;

      if (delta === -1) {
        // remove one instance
        return prev.filter((_, i) => i !== index);
      }

      // add one more instance
      return [...prev, prev[index]];
    });
  };

  /* ===============================
     REMOVE PRODUCT COMPLETELY
  =============================== */
  const removeItem = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  /* ===============================
     TOTALS
  =============================== */
  const subtotal = useMemo(() => {
    return groupedCart.reduce((sum, item) => {
      const priceINR = item.price * 89.9;
      const discounted =
        priceINR - priceINR * (item.discountPercentage / 100);
      return sum + discounted * item.qty;
    }, 0);
  }, [groupedCart]);

  const tax = subtotal * 0;
  const total = subtotal + tax;

  /* ===============================
     EMPTY CART
  =============================== */
  if (groupedCart.length === 0) {
    return (
      <div style={{height:'91vh'}} className="container mt-4 py-5 text-center text-muted vh-80 ">
        <div className="fs-1 mb-1 h-80">🛍️</div>
        <h4>Your cart is empty</h4>
      </div>
    );
  }

  /* ===============================
     UI
  =============================== */
  return (
    <div className="container py-5 ">
      <h1 className="text-center mb-2">🛒 Shopping Cart</h1>
      <p className="text-center text-muted ">
        Review your items before payment
      </p>

      <div className="row g-4">
        {/* CART ITEMS */}
        <div className="col-lg-8">
          <div className="card p-4">
            {groupedCart.map((item) => {
              const priceINR = item.price * 89.9;
              const discounted =
                priceINR -
                priceINR * (item.discountPercentage / 100);

              return (
                <div
                  key={item.id}
                  className="row align-items-center border-bottom py-3 mb-2"
                >
                  {/* IMAGE */}
                  <div className="col-3 text-center">
                    <img
                      src={item.thumbnail}
                      alt="product"
                      className="img-fluid"
                      style={{
                        height: 80,
                        objectFit: "contain",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        navigate(`/buyitem/${item.id}`)
                      }
                    />
                  </div>

                  {/* DETAILS */}
                  <div className="col-6">
                    <h6 className="fw-semibold mb-1">
                      {item.description}
                    </h6>

                    <p className="text-muted mb-2">
                      <span className="bg-danger p-1 rounded text-white me-2" >{item.discountPercentage}% off</span>
                      ₹{Math.round(discounted)}

                      <strike className="ms-2 text-decoration-line-through"><br />  M.R.P. ₹{Math.round(priceINR)}</strike>
                    </p>

                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() =>
                          changeQty(item.id, -1)
                        }
                      >
                        −
                      </button>

                      <span>{item.qty}</span>

                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() =>
                          changeQty(item.id, 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* PRICE & REMOVE */}
                  <div className="col-3 text-end">
                    <p className="fw-semibold mb-2">
                      ₹{Math.round(discounted * item.qty)}
                    </p>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() =>
                        removeItem(item.id)
                      }
                    >
                      <RiDeleteBinLine /> Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ORDER SUMMARY */}
        <div className="col-lg-4">
          <div className="card p-4">
            <h4 className="fw-semibold mb-3">
              Order Summary
            </h4>
            <b style={{marginBottom:'10px' ,color:"green"}}> Your order is eligible for FREE Delivery. </b>

            <div className="d-flex justify-content-between mb-2 text-muted">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="d-flex justify-content-between mb-2 text-muted">
              <span>Tax (0%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>

            <div className="d-flex justify-content-between mb-4">
              <strong>Total</strong>
              <strong>₹{total.toFixed(2)}</strong>
            </div>

            <button onClick={() => {
              if (loginStatus) {
                navigate(`/Payment`)
              }

              else {
                 navigate(`/Login`)
              }



            }} className="btn btn-success w-100 py-2 fw-semibold">
              pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
