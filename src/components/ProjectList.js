import { Link } from 'react-router-dom'
import Avatar from './Avatar'
import ReactToolTip from './Tooltip';
import './Tooltip.css';


// styles
import './ProjectList.css'

export default function ProjectList({ projects }) {
  return (
      <div className='project-list'>
        {projects.length === 0 && <p>No Meetings yet</p>}
        {projects.map(project => (
          <Link to={`/meetings/${project.id}`} key={project.id}>
              <h4>{project.name}</h4>
              <p>Due by {project.dueDate.toDate().toDateString()}</p>
              <div className='assigned-to'>
                  <ul>
                      {project.assignedUsersList.map(user => (
                          <li key={user.photoURL}>
                            <ReactToolTip theme="dark" position="top" title={user.displayName}>
                              <Avatar src={user.photoURL} />
                            </ReactToolTip>
                          </li>
                      ))}
                  </ul>
              </div>
          </Link>
        ))}
      </div>
  )
}
