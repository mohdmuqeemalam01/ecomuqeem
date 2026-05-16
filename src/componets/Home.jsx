import { useContext, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import ReadMore from "./ReadMore";
import Slider from '../styles/slider.jsx'
import { Link, useNavigate } from "react-router-dom";
import { BuyItem } from "./context/store";



function Home() {
  const { user, showAlert } = useContext(BuyItem);    
  const [product, setProduct] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const Data = async () => {
      try {
        const res = await fetch(
          "https://dummyjson.com/products?limit=50&skip=" + Math.floor(Math.random() * 90)
        );
        const data = await res.json()
        // Filter out food/vegetable categories
        const filtered = data.products.filter(p =>
          p.category !== 'groceries' &&
          p.category !== 'food'
        );
        setProduct(filtered)

      } catch (error) {
        // console.log("We get error", error);
      }
    };

    Data();
  }, []);
  //router function
  const clickItem = (id) => {
    if (id) {
      navigate(`/buyitem/${id}`)
    }
  }

  //  const clickItem = (id) => {
  //  if (id) {
  //   window.open(`/buyitem/${id}`, "_blank", "noopener,noreferrer");
  // }
  // }



  return (
    <>
      <Slider />
      {/* there are not card  not change there */}
      <div className={styles.container}>
        {data.map((val, i) => (
          <div className={styles.card} key={i}>
            <img className={styles.img} src={val.img} alt="" />
            <Link to='/select' state={val.ress} className={styles.button}> {val.title}</Link>

          </div>
        ))}
      </div>
      {/* Start there  */}
      <div className={styles.Main}>


        {
          product.map((dt, i) => (
            <div className={styles.CardBody} onClick={() => clickItem(dt.id)} key={i}>
              <img className={styles.NewImage}
                src={dt.thumbnail}
                alt={dt.brand}
              />

              <div>
                <ReadMore text={dt.description} limit={80} />
              </div>

              <div className="price-section">
                <span className="price">₹{(dt.price *  89.9).toFixed(2)}</span>
                <span style={{ color: 'orange' }} className="discount"> OFF {dt.discountPercentage}%   <span className={styles.rating}>⭐ {dt.rating}</span></span>

              </div>



              {/*we are route the items from  */}
              {/* <button  className={styles.btn}>Buy</button> */}
            </div>
          ))}
           {showAlert && (
        <div style={{position:'absolute', zIndex:'200' ,marginTop: '100px', color: 'green'  }}>
          ✔️ Account Created successfully !{user.name}
        </div>
      )}
      </div>

    </>
  );
}
export default Home;



// there are we call the api by using the dummy json
// 
const data = [
  {
    img: "/image/1m.png",
    title: "Skin Care",
    ress: "https://dummyjson.com/products/category/skin-care",
  },

  {
    img: "/image/2m.jpeg",
    title: "Electronics Products",
    ress: "https://dummyjson.com/products/category/mobile-accessories",
  },
  {
    img: "/image/3m.png",
    title: "Makeup",
    ress: "https://dummyjson.com/products/category/beauty",
  },
  {
    img: "/image/4m.png",
    title: "Smart phones",
    ress: "https://dummyjson.com/products/category/smartphones",
    //  ress: "https://dummyjson.com/products/search?q=phone",//for searching
  },
  {
    img: "/image/5m.jpeg",
    title: "Bags",
    //  ress: "https://dummyjson.com/products/search?q=phone"//for searching
    ress: "https://dummyjson.com/products/category/womens-bags"
  },
  {
    img: "/image/6m.jpeg",
    title: "Shoes",
    ress: "https://dummyjson.com/products/category/mens-shoes",
  },
  {
    img: "/image/7m.jpeg",
    title: "sandals",
    ress: "https://dummyjson.com/products/category/womens-shoes",
  },
];
