import { useState } from 'react'
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'
import ProjectList from '../../components/ProjectList'
//styles
import './Dashboard.css'
import ProjectFilter from './ProjectFilter'

export default function Dashboard() {
  const { user } = useAuthContext()
  const { documents, error } = useCollection('meetings')
  const [filter, setFilter] = useState('all')

  const changeFilter = (newFilter) => {
    setFilter(newFilter)
  }

  const filteredProjects = documents ? documents.filter(document => {
    switch (filter) {
      case 'all':
        return true
      case 'mine':
        let assignedToMe = false
        document.assignedUsersList.forEach(u => {
          if (u.id === user.uid ) {
            assignedToMe = true
          }
        })
        return assignedToMe
      case 'Weeked Meeting':
      case 'Sunday Meeting':
      case 'New Project':
      case 'Other':
        console.log(document.category, filter);
        return document.category === filter

      default:
        return true;
    }
  }) : null

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p> }
      {documents && <ProjectFilter changeFilter={changeFilter} />}
      {filteredProjects && <ProjectList projects={filteredProjects}/>}
    </div>
  )
}