import { useEffect, useState } from "react";
import Edit, { Delete } from "../../editanddelete";
import Add from "../add";
import "./Tabel.scss";
import EditCom from "../edit";
import Header  from "../header";

function Tabel() {
  const [isAddActive, setIsAddActive] = useState(false);
  const [isEditContact, setEditContact] = useState(false);
  const [id, setid] = useState();
  const [data, setData] = useState([]);
  const [filter, setfilter] = useState();
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("user")) || [];
    setData(data);
  }, [isAddActive || isEditContact]);

  const AddToggle = () => {
    setIsAddActive(!isAddActive);
  };

  //   delte////////////////////////

  const deleteAdd = (id) => {
    if (window.confirm("Delete Contact")) {
      let data = JSON.parse(localStorage.getItem("user")) || [];
      const newData = data?.filter((el) => el?.id !== id);
      localStorage.setItem("user", JSON.stringify(newData));
      setData(newData);
    }
  };

  //   edit////////////////////////////

  const editBtn = (id) => {
    setEditContact(!isEditContact);
    setid(id);
  };

  //   filter////////////////////////

  const filterChange = (e) => {
    let value = e.target.value;
    let data = JSON.parse(localStorage.getItem("user")) || [];
    let filter = data?.filter((el) =>
      value == "all" ? el : el?.gender == value
    );
    setData(filter);
  };

  //   search////////////////

  const search = (value) => {
    let upvalue = value.target.value.toLowerCase();
    let user = JSON.parse(localStorage.getItem("user")) || [];
    let search = user?.filter((element) => {
      return (
        element?.name?.toLowerCase().includes(upvalue) ||
        element?.last?.toLowerCase().includes(upvalue) ||
        element?.phone?.toLowerCase().includes(upvalue)
      );
    });
    setData(search);
  };

  // Like function///////////////////
  const like = (id) => {
    let person = JSON.parse(localStorage.getItem("user")) || [];
    let updatedData = person.map((item) => {
      if (item.id === id) {
        return { ...item, liked: true };
      }
      return item;
    });
    setData(updatedData);
    localStorage.setItem("user", JSON.stringify(updatedData));
  };

  // Unlike function/////////////////
  const unlike = (id) => {
    let person = JSON.parse(localStorage.getItem("user")) || [];
    let updatedData = person.map((item) => {
      if (item.id === id) {
        return { ...item, liked: false };
      }
      return item;
    });
    setData(updatedData);
    localStorage.setItem("user", JSON.stringify(updatedData));
  };

  return (
    <>
      <Header AddContact={AddToggle} />
      {isAddActive && <Add active={isAddActive} Close={setIsAddActive} />}
      {isEditContact && (
        <EditCom active={isEditContact} Close={setEditContact} id={id} />
      )}

      <div>
        <div className="container">
          <div className="filter">
            <div>
              <input
                className="filter__input"
                type="text"
                placeholder="Search..."
                onChange={search}
              />
            </div>
            <div className="filter-item">
              <select
                className="filter-item__select"
                value={filter}
                onChange={filterChange}>
                <option value="all">Select Gender</option>
                <option value="male">🧔🏻</option>
                <option value="female">👩🏻‍🦱</option>
              </select>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="tabel">
            <div className="map">
              <h4>#</h4>
              <h4>FirstName</h4>
              <h4>LastName</h4>
              <h4>Gender</h4>
              <h4>Phone</h4>
              <h4>Favorite</h4>
              <h4>Action</h4>
            </div>
            {data?.map((element, i) => (
              <div className="map-one" key={i}>
                <p>{i + 1}</p>
                <p>{element?.name}</p>
                <p>{element?.last}</p>
                <p> {element?.gender}</p>
                <p>{element?.phone} </p>
                <p
                  className="like"
                  onClick={() => (element?.liked ? unlike(element?.id) : like(element?.id))}>
                  {element?.liked ? "❤️" : "🖤"}
                </p>
                <p>
                  <button className="edit" onClick={() => editBtn(element?.id)}>
                    <Edit />
                  </button>
                  <button className="delete" onClick={() => deleteAdd(element?.id)}>
                    <Delete />
                  </button>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Tabel;
