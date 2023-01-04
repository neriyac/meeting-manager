import { useHistory } from 'react-router-dom'
import Avatar from '../../components/Avatar'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import ReactToolTip from '../../components/Tooltip';



export default function ProjectSummary({ project }) {
  const { deleteDocument} = useFirestore('meetings')
  const { user } = useAuthContext()
  const history = useHistory()

  const handleDelete = (e) => {
    deleteDocument(project.id)
    history.push("/")
  }

  const StartMeeting = () => {
    console.log('StartMeeting');
  }
  
  return (
    <div>
      <div className="project-summary">
        <h2 className="page-title">{project.name}</h2>
        <p>Created by {project.createdBy.displayName}</p>
        <p className="due-date">
            Meeting start in {project.dueDate.toDate().toDateString()}
        </p>
        <p className="details">{project.details}</p>       
          <h4>Meeting Leader:</h4>
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
            {project.category && <p>{project.category.label}</p> }
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
          <button className="btngreen" onClick={StartMeeting}>Start Meeting Now</button>
    </div>
  )
}
