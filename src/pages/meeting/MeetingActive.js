import { useParams, useHistory } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import { useDocument } from '../../hooks/useDocument'
import { useState, useRef } from 'react'
import ReactToolTip from '../../components/Tooltip'
import Avatar from '../../components/Avatar'
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"


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
  const [editorState, setEditorState] = useState(null)
  // const [position, setPosition] = useState(1)

  //scroll sections
  const categoryTest = useRef(null);
  const titleTest = useRef(null);
  // const prev = setPosition(position-1)
  // const next = setPosition(position+1)


  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: 'smooth'
    })
  }


  if (error) {
    return <div className="error">{error}</div>
  }
  if (!document) {
    return <div className="loading">Loading...</div>
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(notes);
  }
  
  const handleDelete = (e) => {
    deleteDocument(meeting.id)
    history.push("/")
  }

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    // return draftToHtml(convertToRaw(editorState.getCurrentContent()));
  };


  return (
    <div>
      <div ref={titleTest} className="project-active">
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
            {meeting.leaderList?.map(user => (
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
            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={onEditorStateChange}
            />;
          </div>
          ))}
        </div>
        <div ref={categoryTest}>
          <span>Meeting Category:</span>
          {meeting.category && <h4>{meeting.category.label}</h4> }
        </div>
        <div className='buttom-line'>
          <button className='btn'>prev</button>
          <button className='btn' onClick={() => scrollToSection(categoryTest) }>category</button>
          <button className='btn' onClick={() => scrollToSection(titleTest) }>Title</button>
          <button className='btn'>next</button>
          <button className='btn'>decisions</button>
          <button className='btn'>tasks</button>
          <button className='btn'>placeholder</button>
        </div>
        </div>
        {user.uid === meeting.createdBy.id && (
          <button
            className="btn"
            onClick={(e) => {
              if (window.confirm('Are you sure you wish to DELETE this meeting?')) {
                handleDelete(e)
              } else {
                console.log("don't delete")
              }}}
            >Delete Meeting
          </button>
        )}
        <button
          className="btngreen"
          onClick={(e) => {
            if (window.confirm('Are you sure you wish to END and ARCHIVE this meeting?')) {
              handleSubmit(e)
            } else {
              console.log("don't end")
            }}}
          >End Meeting
        </button>
    </div>
  )
}