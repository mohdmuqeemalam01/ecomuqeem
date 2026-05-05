import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../styles/ItemDetails.module.css";
import { BuyItem } from "../componets/context/store.jsx";

function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loginStatus, setData } = useContext(BuyItem);

  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
      setActiveImg(data.thumbnail);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <h2 className={styles.loading}>Loading...</h2>;

  const originalPrice = product.price * 89.9;
  const finalPrice =
    originalPrice - (originalPrice * product.discountPercentage) / 100;

  const addToCart = () => {
    setData((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const orderNow = () => {
    loginStatus ? navigate("/cart") : navigate("/login");
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* LEFT */}
        <div className={styles.imageSection}>
          <img src={activeImg} className={styles.mainImage} alt="product" />

          <div className={styles.thumbRow}>
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                className={`${styles.thumb} ${
                  activeImg === img ? styles.active : ""
                }`}
                onMouseOver={() => setActiveImg(img)}
              />
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className={styles.infoSection}>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.desc}>{product.description}</p>

          <div className={styles.rating}>⭐ {product.rating}</div>

          <div className={styles.priceBox}>
            <span className={styles.final}>
              ₹{finalPrice.toLocaleString("en-IN")}
            </span>
            <span className={styles.original}>
              ₹{originalPrice.toLocaleString("en-IN")}
            </span>
            <span className={styles.off}>
              {product.discountPercentage}% OFF
            </span>
          </div>

          <div className={styles.actions}>
            <button className={styles.cartBtn} onClick={addToCart}>
              Add to Cart
            </button>
            <button className={styles.buyBtn} onClick={orderNow}>
              Buy Now
            </button>
          </div>

          <div className={styles.meta}>
            <p><b>Warranty:</b> {product.warrantyInformation || "No warranty"}</p>
            <p><b>Return Policy:</b> {product.returnPolicy || "No return"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetails;
