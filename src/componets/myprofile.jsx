import { BuyItem } from "./context/store";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "../styles/myprofile.module.css";

function MyProfile() {
  const { user, loginStatus, setUser } = useContext(BuyItem);
  const navigate = useNavigate();

  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [number, setNumber] = useState(user?.number || "");

  const handleSave = () => {
    setUser({ ...user, name, number });
    setEdit(false);
  };

  if (!loginStatus) {
    return (
      <h2 style={{height:'74vh'}} className={style.noUser}>
        No user data available. Please{" "}
        <span onClick={() => navigate("/SignUp")} className={style.link}>
          SignUp
        </span>{" "}
        or{" "}
        <span onClick={() => navigate("/Login")} className={style.link}>
          LogIn
        </span>
      </h2>
    );
  }

  return (
    <div className={style.container}>
      <div className={style.mainBody}>
        <div className={style.row}>
          {/* LEFT */}
          <div className={style.left}>
            <div className={style.cardCenter}>
              <img src="/image/profile.svg" alt="Profile" />
              {edit ? (
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              ) : (
                <h3>{user.name}</h3>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className={style.right}>
            <div className={style.card}>
              <div className={style.infoRow}>
                <span>Name</span>
                {edit ? (
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                ) : (
                  <span>{user.name}</span>
                )}
              </div>

              <div className={style.infoRow}>
                <span>Mobile</span>
                {edit ? (
                  <input
                    value={number}
                    maxLength="10"
                    onChange={(e) =>
                      /^\d*$/.test(e.target.value) &&
                      setNumber(e.target.value)
                    }
                  />
                ) : (
                  <span>{user.number}</span>
                )}
              </div>

              <div className={style.infoRow}>
                <span>Password</span>
                <span>{user.password.replace(/./g, "*")}</span>
              </div>

              <div className={style.actions}>
                {edit ? (
                  <button onClick={handleSave}>Save</button>
                ) : (
                  <button onClick={() => setEdit(true)}>Edit</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
