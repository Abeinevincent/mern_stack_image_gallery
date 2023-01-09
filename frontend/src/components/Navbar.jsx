import { useNavigate, Link } from "react-router-dom";

export const Navbar = () => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");

  const isLoggedIn = token !== null ? true : false;

  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="navbar">
      {isLoggedIn ? (
        <>
          <h4>
            Welcome <span>{username ? username : null}</span>
          </h4>
          <div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </>
      ) : (
        <>
          <h4>Hi there!</h4>
          <div>
            <button onClick={handleLogin}>Login</button>
          </div>
        </>
      )}
    </div>
  );
};
