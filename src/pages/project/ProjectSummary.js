import { useHistory, Link } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import ReactToolTip from '../../components/Tooltip';
import Avatar from '../../components/Avatar'



export default function ProjectSummary({ project }) {
  const { deleteDocument} = useFirestore('meetings')
  const { user } = useAuthContext()
  const history = useHistory()

  const handleDelete = (e) => {
    deleteDocument(project.id)
    history.push("/")
  }
  
  return (
    <div>
      <div className="project-summary">
        <h2>{project.name}</h2>
        <p>Created by {project.createdBy.displayName}</p>
        <p className="due-date">
            Meeting start in {project.dueDate.toDate().toDateString()}
        </p>
        <p className="details">{project.details}</p>
        {/* <div>
        {project.topics?.map(topic => (
          <div key={topic.index}>
            <span>{topic.label}</span>
          </div>
          ))}
        </div>     */}
        <h4>Meeting Leader(s):</h4>
        <div className="assigned-users">
          {project.assignedUsersList.map(user => (
          <div key={user.id}>
            <ReactToolTip theme="dark" position="top" title={user.displayName}>
              <Avatar src={user.photoURL} />
            </ReactToolTip>
          </div>
          ))}
        </div>
          <div>
            <span>Project Category:</span>
            {project.category && <h4>{project.category.label}</h4> }
          </div>
          </div>
          {user.uid === project.createdBy.id && (
            <button
              className="btn"
              onClick={(e) => {
                if (window.confirm('Are you sure you wish to delete this meeting?')) {
                  handleDelete(e)
                } else {
                 console.log("don't delete")
                }}}
              >Mark as complete & Delete
            </button>
          )}
          <button className="btngreen" onClick={(project) => (
            <Link to={`/meetings/active/${project.id}`} key={project.id}></Link>
            )}>Start Meeting Now</button>
    </div>
  )
}
