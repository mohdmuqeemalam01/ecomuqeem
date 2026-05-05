import styles from '../styles/slider.module.css'
import data from '../data.json'
import { useEffect, useState } from 'react'

function Slider() {
  const [val, setVal] = useState(0);
  const total = data.length;
    const [leaving, setLeaving] = useState(false);

   const next = () => {
    setLeaving(true);

    setTimeout(() => {
      setVal((prev) => (prev === data.length - 1 ? 0 : prev + 1));
      setLeaving(false);
    }, 500); // must match exit animation time
  };

  const previous = () => {
    setVal((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  // 🔥 AUTO SCROLL
  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div className={styles.slider} >
        <div onClick={previous} className={styles.left}></div>
        <img className={styles.images} src={data[val].download_url} alt="" />
  
      <h3
        className={`${styles.title} ${
          leaving ? styles.textOut : styles.textIn
        }`}
      >
        {data[val].title}
      </h3>

        <div onClick={next} className={styles.right}></div>
      </div>
      {/* <img className={styles.afterSlider} src="image/Group_1707479128_1400x.avif" alt="" /> */}

      <div className={styles.BoxContain}>

        <div className={styles.box}>12+3 Months
          <br /> Warranty</div>
        <div className={styles.box}>
          GST <br /> Billing

        </div>
        <div className={styles.box}>
          Free Express <br /> Delivery*

        </div>
        <div className={styles.box}>
          7-day <br /> Replacement


        </div>

      </div>
    </>
  )
}
export default Slider;