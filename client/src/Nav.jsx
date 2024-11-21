import { Link } from "react-router-dom";
import PropTypes from "prop-types";

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
    <div className="navbar">
      {userLoggedIn ? (
        <>
          <Link to={`/${name}/dashboard`}>Dashboard</Link>
          <Link to="/posts">Posts</Link>
          {name && <h3>{name}</h3>}{" "}
          <a href="/" onClick={handleLogout}>
            Log Out
          </a>{" "}
        </>
      ) : (
        <>
          <Link to="/">Home</Link>
          <Link to="/posts">Posts</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Log In</Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
