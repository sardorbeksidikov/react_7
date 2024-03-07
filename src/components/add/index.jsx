import React, { useState } from "react";
import "./Add.scss";
function Add({ active, Close }) {
  const [isActive, setIsActive] = useState(active);
  let data = JSON.parse(localStorage.getItem("user")) || [];
  const [user, setUser] = useState({
    id: data?.length + 1,
    name: "",
    last: "",
    phone: "",
    gender: "",
  });
  const handleClose = () => {
    setIsActive(false);
    Close(false);
  };

  const handelChange = (e) => {
    setUser({
      ...user,
      [e.target.id]: e.target.value,
    });
  };

  const save = () => {
    let data = JSON.parse(localStorage.getItem("user")) || [];
    localStorage.setItem("user", JSON.stringify([...data, user]));
    setIsActive(false);
    Close(false);
  };

  return (
    <>
      <div className={`modal-cart ${isActive ? "active" : ""}`}>
        <div className="modal">
          <h2>Add Contact</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="name"
              id="name"
              placeholder="First Name"
              value={user.name}
              onChange={handelChange}
            />
            <input
              type="user"
              id="last"
              placeholder="Last Name"
              value={user.last}
              onChange={handelChange}
            />
            <input
              type="tel"
              id="phone"
              placeholder="+998"
              value={user.phone}
              onChange={handelChange}
            />
            <select id="gender" value={user.gender} onChange={handelChange}>
              <option value="all">Select Gender</option>
              <option value="male">🧔🏻</option>
              <option value="female">👩🏻‍🦱</option>
            </select>
            <div className="btn">
              <button
                className="save"
                type="submit"
                onClick={save}
                disabled={
                  !user.name || !user.gender || !user.last || !user.phone
                }>
                Save
              </button>
              <button className="close" onClick={handleClose}>
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Add;
