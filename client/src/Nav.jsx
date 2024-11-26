import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import panda from "./assets/pandaLogo.svg";
import "../src/css/NavBar.css";

const Navbar = ({ userLoggedIn, userData, logOut }) => {
  Navbar.propTypes = {
    userLoggedIn: PropTypes.bool,
    userData: PropTypes.object,
    logOut: PropTypes.func,
  };

  const name = userData?.username;

  function handleLogout(e) {
    e.preventDefault();
    logOut();
  }

  return (
    <div className="navbar-wrapper">
      <div className="navbar">
        <div className="logo">
          <img src={panda} className="logo" alt="" /> thought panda
        </div>
        <div className="links">
          {userLoggedIn ? (
            <>
              <Link to={`/${name}/dashboard`}>Dashboard</Link>
              <Link to="/posts">Posts</Link>
              <a href="/" onClick={handleLogout}>
                Log Out
              </a>{" "}
            </>
          ) : (
            <>
              <Link to="/posts">Posts</Link>
              <Link to="/signup">Sign Up</Link>
              <Link to="/login">Log In</Link>
            </>
          )}
        </div>{" "}
      </div>
    </div>
  );
};

export default Navbar;
