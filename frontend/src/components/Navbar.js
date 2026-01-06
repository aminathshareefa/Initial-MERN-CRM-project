import { Link } from "react-router-dom";

const Navbar = () => (
  <nav>
    <Link to="/">Customers</Link> | 
    <Link to="/add">Add Customer</Link> | 
    <Link to="/login">Login</Link>
  </nav>
);

export default Navbar;
