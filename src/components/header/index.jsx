import "./Header.scss";
import "react-toastify/dist/ReactToastify.css";
function Header(props) {
  const add = () => {
    props.AddContact("active");
  };

  return (
    <>
      
      <header>
        <div className="container">
          <div className="header">
           
            <button onClick={add}>Add</button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
