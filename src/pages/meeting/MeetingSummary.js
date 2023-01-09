import { useParams, useHistory, Link } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import ReactToolTip from '../../components/Tooltip';
import Avatar from '../../components/Avatar'

export default function MeetingSummary({ meeting }) {
  const { deleteDocument} = useFirestore('meetings')
  const { user } = useAuthContext()
  const history = useHistory()
  const { id } = useParams()


  const handleDelete = (e) => {
    deleteDocument(meeting.id)
    history.push("/")
  }
  
  return (
    <div>
      <div className="project-summary">
        <h2>{meeting.name}</h2>
        <p>Created by {meeting.createdBy.displayName}</p>
        <p className="due-date">
            Meeting start in {meeting.dueDate.toDate().toDateString()}
        </p>
        <p className="details">{meeting.details}</p>
        {meeting.topics > 0 && <h4>Meeting Topics:</h4>}
        <div className="topics">
          {meeting.topics > 0 && meeting.topics.map((topic, index) => (
          <div key={index}>
            <li>{topic.topic}</li>
          </div>
          ))}
        </div>  
        <h4>Meeting Leader(s):</h4>
        <div className="assigned-users">
          {meeting.assignedUsersList.map(user => (
          <div key={user.id}>
            <ReactToolTip theme="dark" position="top" title={user.displayName}>
              <Avatar src={user.photoURL} />
            </ReactToolTip>
          </div>
          ))}
        </div>
          <div>
            <span>Meeting Category:</span>
            {meeting.category && <h4>{meeting.category.label}</h4> }
          </div>
          </div>
          {user.uid === meeting.createdBy.id && (
            <button
              className="btn"
              onClick={(e) => {
                if (window.confirm('Are you sure you wish to delete this meeting?')) {
                  handleDelete(e)
                } else {
                 console.log("don't delete")
                }}}
              >Delete Meeting
            </button>
          )}
            <Link className="btngreen" to={`/meetings/${id}/active`}>Start Meeting Now</Link>
    </div>
  )
}
