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
  { index: 0, value: 'projects', label: 'New Projects' },
  { index: 1, value: 'sunday', label: 'Sunday Meetings' },
  { index: 2, value: 'weekend', label: 'Weekend Meeting' },
  { index: 3, value: 'other', label: 'Other' }
]

// const options = [
//   { label: 'option1', value: 'option1', __isNew__:false },
//   { label: 'option2', value: 'option2', __isNew__:false },
//   { label: 'option3', value: 'option3', __isNew__:false },
//   { label: 'option4', value: 'option4', __isNew__:false }
// ]

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
  const [topics, setTopics] = useState([{ topic: ""}])
  const [dueDate, setDueDate] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])
  const [formError, setFormError] = useState(null)

  useEffect(() => {
    if (documents) {
      const options = documents?.map((user) => {
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
    if (topics.length < 1) {
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

    alert(JSON.stringify(topics));
    await addDocument(project)
    if (!response.error) {
      history.push("/")
    }
  }

  const handleStart = async (e) => {
    await handleSubmit(e)
    if (!response.error) {
      history.push(`/meetings/${response.meetings.id}/active`)
    }
  }

  // const handleChange = (selectedOptions) => {
  //   setTopics(selectedOptions)
  //   console.log(selectedOptions);
  // }  

  const handleTopicChange = (i, e) => {
    let newTopics = [...topics];
    newTopics[i][e.target.name] = e.target.value;
    setTopics(newTopics);
  }

  const addFormFields = () => {
    setTopics([...topics, { topic: ""}])
  }

  const removeFormFields = (i) => {
    let newTopics = [...topics];
    newTopics.splice(i, 1);
    setTopics(newTopics)
  }

  // const handleTopicSubmit = (e) => {
  //   e.preventDefault();
  //   alert(JSON.stringify(topics));
  // }

  return (
    <div className='create-form'>
      <h2 className="page-title">Create New Meeting</h2>
      <form>
        <label>
          <span>Meeting Name:*</span>
          <input
            placeholder='Example: Morning Meeting'
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Meeting category:*</span>
          <Select
            placeholder="Select new Category here..."
            onChange={(option) => setCategory(option)}
            options={categories}
          />
        </label>
        <label>
          <span>Meeting Description (optional):</span>
          <textarea
            placeholder='Example: We decided to meet every Sunday morning to...'
            type="text"
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          />
        </label>
        <label>
        <span>Meeting Topic(s): (Min 1)</span>          
            {topics.map((element, index) => (
              <div key={index}>
                <span className='label'>Topic {index + 1}</span>
                <div className="form-inline">
                  <input
                    type="text"
                    name="topic"
                    placeholder="Add topic here.."
                    className="topicinput"
                    value={element.topic || ""}
                    onChange={e => handleTopicChange(index, e)}
                    />
                  {
                    index ? 
                      <button type="button"  className="btnremove" onClick={() => removeFormFields(index)}>X</button> 
                    : null
                  }
                </div>
              </div>
            ))}
            <div className="button-section">
                <button className="btngreen" type="button" onClick={() => addFormFields()}>Add Topic</button>
            </div>
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
        <button onClick={handleStart} className="btngreen">Start Meeting Now</button>
        {formError && <p className='error'>{formError}</p> }
      </form>
    </div>
  )
}
