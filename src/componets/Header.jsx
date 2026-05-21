import styles from "../styles/header.module.css";
import { GoSearch } from "react-icons/go";
import { RiUser3Line } from "react-icons/ri";
import { LiaOpencart } from "react-icons/lia";
import { TbTruckReturn } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { BuyItem } from "./context/store.jsx";

function Header() {
  const [value, setValue] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [searchHelp, setSearchHelp] = useState([]);
const [show, setShow] = useState(false);

  const { data, loginStatus, user, setLoginStatus } = useContext(BuyItem);

  /* ---------------- FETCH PRODUCTS ---------------- */
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const res = await fetch(
  //         "https://dummyjson.com/products?limit=198"
  //       );
  //       const result = await res.json();
  //       setAllProducts(result.products || []);
  //     } catch (error) {
  //       console.error("Product fetch failed", error);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  // /* ---------------- SEARCH FILTER ---------------- */
  // useEffect(() => {
  //   if (!value.trim()) {
  //     setSearchHelp([]);
  //     return;
  //   }

  //   const text = value.toLowerCase();

  //   const filtered = allProducts.filter(
  //     (item) =>
  //       item.title.toLowerCase().includes(text) ||
  //       item.category.toLowerCase().includes(text)
  //   );

  //   setSearchHelp(filtered.slice(0, 8)); // limit results
  // }, [value, allProducts]);

  //  useEffect(()=>{
  //   setTimeout(
  //     setShow()
  //   ,5000)
  //   },show)


  const toggleDropdown = () => {
    setShow(prev => !prev);
    // console.log(show)
  };

  const closeDropdown = () => {
    setShow(true);
  };

  const active = () => {
    setShow(true);
    // console.log(show);

  }
  /* ---------------- LOGOUT ---------------- */
  const handleLogout = () => {
    setLoginStatus(true);
  };

  return (
    <div className={styles.container}>
      {/* LOGO */}
      <img className={styles.logo} src="image/Logo.png" alt="Logo" />

      {/* SEARCH */}
      <div className={styles.inputcontainer}>
        <input
          className={styles.search}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search Products and Items"
        />
        <button className={styles.button}>
          <GoSearch />
        </button>

        {/* SEARCH SUGGESTIONS */}
        {searchHelp.length > 0 && (
          <ul className={styles.searchhelp}>
            {searchHelp.map((item) => (
              <li
                key={item.id}
                className={styles.searchList}
                onClick={() => {
                  setValue(item.title);
                  setSearchHelp([]);
                }}
              >
                {item.title}
                <small> ({item.category})</small>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* USER DROPDOWN */}
      <div className={styles.dropdown}
        onClick={toggleDropdown}>
        <span className={styles.toptext}>
          <RiUser3Line />
          {loginStatus && user?.name ? (
            ` Hello, ${user.name.slice(0, 4)}..`
          ) : (
            <Link    className={styles.Link} to="/Login">
              LogIn
            </Link>
          )}
        </span>

        <div className={show ? styles.drop : styles.notdrop}>
          {loginStatus ? (
            <p onClick={() => {
              handleLogout()

            // closeDropdown()
            }}
            >Logout</p>
          ) : (
            <div className={styles.newcustomer}>
              <h5>New Customer?</h5>
              <Link onClick= {()=>{toggleDropdown} } to="/SignUp">
                <button onClick= {()=>{toggleDropdown} } className={styles.btndrop}>SignUp</button>
              </Link>
            </div>
          )}

          <hr />

          <ul>
            <Link className={`${styles.Links} `}to="/MyProfile">
              <li  className={`  ${styles.list} `} onClick= {()=>{toggleDropdown} }>
                My Profile
              </li>
            </Link>
            <li onClick={active} className={styles.list}>Rewards</li>
            <li onClick={active} className={styles.list}>Gift Cards</li>
            <li onClick={()=>setShow(true)} className={styles.list}>Favorite</li>
          </ul>
        </div>
      </div>

      {/* CART */}
      <Link to="/Cart" className={`${styles.toptext} ${styles.cartImage}`}  >

        <span className={styles.cartCount}>{data.length}</span>


        <LiaOpencart />   Cart
      </Link>

      {/* ORDERS */}
      <Link
        className={styles.toptext}
        to={loginStatus ? "/Order" : "/Login"}
      >
        <TbTruckReturn /> Return & Order
      </Link>



    </div>
  );
}

export default Header;
