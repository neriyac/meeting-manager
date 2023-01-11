import { NavLink } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useState } from 'react';
import Avatar from "./Avatar";


// styles & images
import './Sidebar.css'
import AddIcon from '../assets/add_icon.svg'
import MeetIcon from '../assets/meet_icon.svg'
import StatsIcon from '../assets/stats_icon.svg'
import ProjectsIcon from '../assets/wrench_icon.svg'
// import Menu from '../assets/menu_icon.svg'

export default function Sidebar() {
  const { user } = useAuthContext()
  const [mode, setMode] = useState('open')

  const switchModes = () => {
    setMode(mode === 'open' ? 'close' : 'open')
  }



  return (
    <div className={`sidebar ${mode}`}>
      <div className="sidebar-content">
        <div className='menu' onClick={() => switchModes() }>
            <div className="one"></div>
            <div className="two"></div>
            <div className="three"></div>
        </div>
        <div className={`user ${mode}`}>
            <Avatar src={user.photoURL}/>
            <p className={`${mode}`}>Welcome<br/>{user.displayName}</p>
        </div>
        <nav className="links">
            <ul>
                <li>
                    <NavLink exact to="/">
                        <img src={MeetIcon} alt="dashboard icon" />
                        <span className={`${mode}`}>Meetings</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to="/create">
                        <img src={AddIcon} alt="add project icon" />
                        <span className={`${mode}`}>New Meeting</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to="/statistics">
                        <img src={StatsIcon} alt="add project icon" />
                        <span className={`${mode}`}>Statistic</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink exact to="/folders">
                        <img src={ProjectsIcon} alt="add project icon" />
                        <span className={`${mode}`}>Folders</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
      </div>
    </div>
  )
}
