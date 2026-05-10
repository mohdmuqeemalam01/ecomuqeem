import styles from "../styles/Home.module.css";
import ReadMore from "./ReadMore";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { BuyItem } from './context/store.jsx'
import { Link, useNavigate , useLocation} from "react-router-dom";

// import { useLocation, useNavigate } from "react-router-dom";
// const BuyItem=useContext( BuyItem)
function OneSelect() {


  const [product, setProduct] = useState([]);
  const location = useLocation();
  const receivedData = location.state;
  const navigate = useNavigate()
  useEffect(() => {
    const Data = async () => {
      try {
        const res = await fetch(receivedData);
        const data = await res.json()
        setProduct(data.products)

      } catch (error) {
        console.log("We get error", error);
      }
    };
    Data();
  }, [receivedData]);
  const clickItem = (id) => {
    if (id) {
      navigate(`/buyitem/${id}`)
    }
  }

  return (
    <div>

      <div  className={styles.Main}>
        {
          product.map((dt, i) => (
            <div onClick={() => clickItem(dt.id)} className={styles.CardBody} key={i}>
              <img className={styles.NewImage}
                src={dt.thumbnail}
                alt={dt.brand}
              />

              <div>
                <ReadMore text={dt.description} limit={60} />
              </div>

              <div className={styles.priceSection}>
                <span className="price">₹{(dt.price * 90).toFixed(2)}</span>
                <span className="discount"> OFF 20% </span> <span className={styles.rating}>⭐ {dt.rating}</span>

              </div>
              



              {/* <button onClick={() => clickItem(dt.id)} className={styles.btn}>Buy</button> */}
            </div>
          ))}
      </div>

    </div>
  )
}
export default OneSelect;
