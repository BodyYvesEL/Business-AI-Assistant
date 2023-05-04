import { Link, NavLink } from "react-router-dom"; // <== IMPORT

function Navbar() {
    return (
      <nav className="Navbar" >
        <div className="Navbar-left">
            {/* <Link to="/"> Home </Link> */}
            {/* <Link to="/about"> About </Link> */}
            {/* <Link to="/projects"> Projects </Link> */}

            {/*    ADD    */}
            <NavLink to="/" className={({ isActive }) => isActive ? "selected" : ""}>
            QIQO
            </NavLink>
        
            <NavLink 
            to="/about" 
            className={({ isActive }) => isActive ? "selected" : ""}
            >
            About
            </NavLink>
        
            <NavLink 
            to="/projects" 
            className={({ isActive }) => isActive ? "selected" : ""}
            >
            Projects
            </NavLink>

        </div>

        <div className="Navbar-right">
            <NavLink
            to="/login"
            
            className={({ isActive }) => isActive ? "selected" : ""}
            >
            Login
            </NavLink>
            
            <button className="logout-btn">Login</button>
            <button className="logout-btn">Register</button>

            <NavLink to="/register" 
            className={({ isActive }) => isActive ? "selected" : ""}
            >
            Register
            </NavLink>
      </div>

      </nav>
    );
  }
   
  export default Navbar;