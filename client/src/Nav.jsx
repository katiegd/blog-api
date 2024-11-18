import { Link } from "react-router-dom";

const Navbar = ({ userLoggedIn, userData, logOut }) => {
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
          <Link to="/" onClick={handleLogout}>
            Log Out
          </Link>
        </>
      ) : (
        <>
          <Link to="/">Home</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Log In</Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
