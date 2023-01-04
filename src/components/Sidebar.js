import { NavLink } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import Avatar from "./Avatar";


// styles & images
import './Sidebar.css'
import AddIcon from '../assets/add_icon.svg'
import MeetIcon from '../assets/meet_icon.svg'
import StatsIcon from '../assets/stats_icon.svg'
import ProjectsIcon from '../assets/wrench_icon.svg'

export default function Sidebar() {
  const { user } = useAuthContext()

  return (
    <div className='sidebar'>
      <div className="sidebar-content">
        <div className="user">
            <Avatar src={user.photoURL}/>
            <p>Welcome {user.displayName}</p>
        </div>
        <nav className="links">
            <ul>
                <li>
                    <NavLink exact to="/">
                        <img src={MeetIcon} alt="dashboard icon" />
                        <span>Meetings</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to="/create">
                        <img src={AddIcon} alt="add project icon" />
                        <span>New Meeting</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/statistics">
                        <img src={StatsIcon} alt="add project icon" />
                        <span>Statistic</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/folders">
                        <img src={ProjectsIcon} alt="add project icon" />
                        <span>Folders</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
      </div>
    </div>
  )
}
