import React from "react";
import styles from "./Order.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {BuyItem} from '../context/store' 
import { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faUser, faTruck, faBox } from '@fortawesome/free-solid-svg-icons';


const steps = [
  { icon: faCheck, text: "Order confirmed", active: true },
  { icon: faUser, text: "Picked by courier", active: true },
  { icon: faTruck, text: "On the way", active: false },
  { icon: faBox, text: "Ready for pickup", active: false}
];

const items = [
  {
    img: "https://i.imgur.com/iDwDQ4o.png",
    title: "Dell Laptop with 500GB HDD",
    price: "$950"
  },
];

export default function Order() {
  const {user,data}=useContext(BuyItem);
  
  return (
    
    !user.OrderStatus ? 
    <div className={`container ${styles.container}`}>
      <article className={`card ${styles.card}`}>
        <header className="card-header">
          <strong>My Orders / Tracking </strong>
        </header>

        <div className="card-body">
          <h6>Order ID: OD45345345435</h6>

          {/* ORDER INFO */}
          <article className="card mb-4">
            <div className="card-body row text-center">
              <div className="col">
                <strong>Estimated Delivery</strong>
                <br /> 29 April 2026
              </div>
              <div className="col">
                <strong>Shipping By</strong>
                <br /> BLUEDART
              </div>
              <div className="col">
                <strong>Status</strong>
                <br /> Picked by courier
              </div>
              <div className="col">
                <strong>Tracking #</strong>
                <br /> BD045903594059
              </div>
            </div>
          </article>

          {/* TRACKING */}
          <div className={styles.track}>
            {steps.map((step, i) => (
              <div
                key={i}
                className={`${styles.step} ${step.active ? styles.active : ""}`}
              >
                <span className={styles.icon}>
                  {/* <i className={`fa ${step.icon}`} /> */}
                <FontAwesomeIcon icon={step.icon} />
                </span>
                <span className={styles.text}>{step.text}</span>
              </div>
            ))}
          </div>

          <hr />

          {/* ITEMS */}
          <ul className="row list-unstyled">
            {items.map((item, i) => (
              <li className="col-md-4" key={i}>
                <figure className={`${styles.itemside} mb-3`}>
                  <div className={styles.aside}>
                    <img src={item.img} className="img-sm border" alt="" />
                  </div>
                  <figcaption className="info align-self-center">
                    <p className={styles.title}>{item.title}</p>
                    <span className="text-muted">{item.price}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>

          <hr />

          <button className={`btn ${styles.btn_warning}`}>
            <i className="fa fa-chevron-left" /> Back to orders
          </button>
        </div>
      </article>
    </div> : <h1 className={styles.noOrder}>No Order</h1>
          
  );
}
