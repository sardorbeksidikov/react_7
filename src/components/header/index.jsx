import "./Header.scss";
function Header(props) {
  const add = () => {
    props.AddContact("active");
  };

  return (
    <>
      <header>
        <div className="container">
          <div className="header">
            <button className="header-btn" onClick={add}>Add</button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
