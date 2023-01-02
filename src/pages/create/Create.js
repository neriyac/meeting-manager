import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { timestamp } from '../../firebase/config';
import { useCollection } from '../../hooks/useCollection';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import { useHistory } from 'react-router-dom';

//styles
import './Create.css'

const categories = [
  { value: 'weeked_meeting', label: 'Weeked Meeting' },
  { value: 'sunday_meeting', label: 'Sunday Meeting' },
  { value: 'new_project', label: 'New Project' },
  { value: 'other', label: 'Other' }
]

const options = [
  { value: 'option1', label: 'Option1' },
  { value: 'option2', label: 'Option2' },
  { value: 'option3', label: 'Option3' },
  { value: 'option4', label: 'Option4' }
]

export default function Create() {
  const history = useHistory()
  const { addDocument, response } = useFirestore('meetings')
  const { documents } = useCollection('users')
  const [ users, setUsers ] = useState([])
  const { user } = useAuthContext()

  // form field values
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [details, setDetails] = useState('')
  const [topics, setTopics] = useState([])
  const [dueDate, setDueDate] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])
  const [formError, setFormError] = useState(null)

  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return {value: user ,label: user.displayName}
      })
      setUsers(options)
    }
  
  }, [documents])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)

    if (!name) {
      setFormError('Please type meeting name !')
      return
    }
    if (!category) {
      setFormError('Please choose meeting category !')
      return
    }
    if (topics < 1) {
      setFormError('Please type at least 1 Topic to your meeting !')
      return
    }
    if (!dueDate) {
      setFormError('Please select the date for you meeting !')
      return
    }
    if (assignedUsers.length < 1) {
      setFormError('Please assign at least 1 Leader to your meeting !')
      return
    } 

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    }

    const assignedUsersList = assignedUsers.map((u) => {
      return{
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id
      }
    })

    const project = {
      name,
      category,
      details,
      topics,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList
    }


    await addDocument(project)
    if (!response.error) {
      history.push("/")
    }
  }

  const startMeeting = async (e) => {
    await handleSubmit(e)
    if (!response.error) {
      console.log('startmeeting');
    }
  }

  const handleChange = (selectedOption) => {
    console.log("handleChange", selectedOption);
    setTopics(...selectedOption)
  }


  return (
    <div className='create-form'>
      <h2 className="page-title">Create New Meeting</h2>
      <form>
        <label>
          <span>Meeting Name:*</span>
          <input
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Meeting category:*</span>
          <Select
            placeholder="Select new category here..."
            onChange={(option) => setCategory(option)}
            options={categories}
          />
        </label>
        <label>
          <span>Meeting Description (optional):</span>
          <textarea
            type="text"
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          />
        </label>
        <label>
        <span>Meeting Topics (Min 1):</span>          
          <CreatableSelect
            isMulti
            onChange={handleChange}
            options={options}
            placeholder="Type something and press enter..."
          />
        </label>
        <label>
          <span>Meeting Date:*</span>
          <input
            required
            type="datetime-local"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>
        <label>
          <span>Meeting Leader(s): (Min 1)</span>
          <Select
            onChange={(option) => setAssignedUsers(option) }
            options={users}
            isMulti
          />
        </label>
        <button onClick={handleSubmit} className="btn">Add Meeting</button>
        <button onClick={startMeeting} className="btngreen">Start Meeting Now</button>
        {formError && <p className='error'>{formError}</p> }
      </form>
    </div>
  )
}
