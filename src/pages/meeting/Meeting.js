import { useParams } from 'react-router-dom'
import { useDocument } from '../../hooks/useDocument'
import MeetingSummary from './MeetingSummary'
import MeetingComments from './MeetingComments'

//styles
import './Meeting.css'

export default function Meeting() {
  const { id } = useParams() // this "id" comes from (Route path="/projects/:id") we choose in App.
  const { document, error } = useDocument('meetings', id)


  if (error) {
    return <div className="error">{error}</div>
  }
  if (!document) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className='project-details'>
      <MeetingSummary meeting={document}/>
      <MeetingComments meeting={document}/>
    </div>
  )
}
