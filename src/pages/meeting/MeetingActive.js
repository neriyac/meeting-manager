import { useParams } from 'react-router-dom'
import { useDocument } from '../../hooks/useDocument'

//styles
import './MeetingActive.css'

export default function MeetingActive() {
  const { id } = useParams()
  const { document, error } = useDocument('meetings', id, 'active')

  if (error) {
    return <div className="error">{error}</div>
  }
  if (!document) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className='meeting-title'>
      <h2>Active Meeting</h2>
    </div>
  )
}