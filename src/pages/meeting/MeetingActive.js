import { useParams, useHistory, Link } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import { useDocument } from '../../hooks/useDocument'
import { useState } from 'react'
import ReactToolTip from '../../components/Tooltip'
import Avatar from '../../components/Avatar'


//styles
import './MeetingActive.css'

export default function MeetingActive() {
  const { id } = useParams()
  const { document, error } = useDocument('meetings', id, 'active')
  const { deleteDocument } = useFirestore('meetings')
  const { user } = useAuthContext()
  const history = useHistory()
  const meeting = document

  //useStates
  const [notes, setNotes] = useState([])

  if (error) {
    return <div className="error">{error}</div>
  }
  if (!document) {
    return <div className="loading">Loading...</div>
  }

  const handleDelete = (e) => {
    deleteDocument(meeting.id)
    history.push("/")
  }

  return (
    <div>
      <div className="project-active">
        <div className='title-time-creator'>
          <h2>{meeting.name}</h2>
          <div className='div1'>
            <p>Created by {meeting.createdBy.displayName}</p>
            <p>
              Meeting start in {meeting.dueDate.toDate().toDateString()}
            </p>
          </div>
         </div>
         <div className="leaders">
          <h4>Meeting Leader(s):</h4>
          <div className="assigned-users-active">
            {meeting.assignedUsersList.map(user => (
            <div key={user.id}>
              <ReactToolTip theme="dark" position="top" title={user.displayName}>
                <Avatar src={user.photoURL} />
              </ReactToolTip>
            </div>
            ))}
          </div>
        </div> 
        <div className='details-active'>
          <p>{meeting.details}</p>
        </div>
        <div>
          {meeting.topics.length > 0 && <h4>Meeting Topics:</h4>}
        </div>
        <div className="div2">
          {meeting.topics.length > 0 && meeting.topics.map((topic, index) => (
          <div className={`div3${index}`} key={index}>
            <li>{topic.topic}</li>
            <input
              onChange={(e) => setNotes(e)}
              type="text"
              placeholder='Notes..'
            />
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