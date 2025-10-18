import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div>
      Navbar
      <Link to='/'>Home</Link>   
      <Link to='/Create'>Create</Link>      
    </div>
  )
}

export default Navbar
