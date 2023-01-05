import { useHistory, useParams, Link } from 'react-router-dom'
import { useDocument } from '../../hooks/useDocument'
import { useAuthContext } from '../../hooks/useAuthContext'
import ProjectSummary from './ProjectSummary'
import ProjectComments from './ProjectComments'
import { useFirestore } from '../../hooks/useFirestore'


//styles
import './Project.css'

export default function Project() {
  const { id } = useParams() // this "id" comes from (Route path="/projects/:id") we choose in App.
  const { document, error } = useDocument('meetings', id)
  const { user } = useAuthContext()
  const { deleteDocument} = useFirestore('meetings')
  const history = useHistory()


  const handleDelete = (e) => {
    deleteDocument(id)
    history.push("/")
  }

  if (error) {
    return <div className="error">{error}</div>
  }
  if (!document) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className='project-details'>
      <ProjectSummary project={document}/>
      <ProjectComments project={document}/>
      {user.uid === document.createdBy.id && (
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
            <Link to={`/meetings/${project.id}/active`} key={project.id}></Link>
            )}>Start Meeting Now</button>
    </div>
  )
}
