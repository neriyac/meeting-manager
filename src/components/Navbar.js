import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'

//styles & Images
import './Navbar.css'
import Temple from '../assets/temple.svg'
import { useAuthContext } from '../hooks/useAuthContext'

export default function Navbar() {
  const { logout, isPending } = useLogout()
  const { user } = useAuthContext()

  return (
    <div className='navbar'>
      <ul>
        <li className="logo">
          <Link to={"/"}><img src={Temple} alt="temple logo"/></Link>
            <Link to={"/"}><span>Manage your meetings</span></Link>
        </li>
        {!user && (
          <>
            <li className='btn'><Link to="/login">Login</Link></li>
            <li className='btn'><Link to="/signup">Signup</Link></li>
          </>
        )}
        {user && (
          <li>
              {!isPending && <button className="btn" onClick={logout}>Logout</button>}
              {isPending && <button className="btn" disabled>Logging out..</button>}
          </li>
        )}
      </ul>
    </div>
  )
}
