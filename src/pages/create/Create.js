import Select from 'react-select';
import { useEffect, useState } from 'react';
import { timestamp } from '../../firebase/config';
import { useCollection } from '../../hooks/useCollection';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import { useHistory } from 'react-router-dom';
// import { useForm } from '../../hooks/useForm'

//styles
import './Create.css'

const categories = [
  { index: 0, value: 'projects', label: 'New Projects' },
  { index: 1, value: 'sunday', label: 'Sunday Meetings' },
  { index: 2, value: 'weekend', label: 'Weekend Meeting' },
  { index: 3, value: 'other', label: 'Other' }
]

export default function Create() {
  const history = useHistory()
  const { addDocument, response } = useFirestore('meetings')
  const { documents } = useCollection('users')
  const [ users, setUsers ] = useState([])
  const { user } = useAuthContext()
  // const { userName, userEmail, message } = useForm()

  // form field values
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [details, setDetails] = useState('')
  const [topics, setTopics] = useState([{ topic: ""}])
  const [dueDate, setDueDate] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])
  const [leaders, setLeaders] = useState([])
  const [formError, setFormError] = useState(null)

  const blankTopic = (items) => {
    for(const item of items)
    {
      if(item.topic === "") {
        return true
      } 
    } 
    return false
  }



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
    if(blankTopic(topics)) {
      setFormError('You either not added at least 1 topic or left field blank !')
      return
    }
    if (!dueDate) {
      setFormError('Please select the date for you meeting !')
      return
    }
    if (leaders.length < 1) {
      setFormError('Please assign at least 1 Leader to your meeting !')
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

    const leaderList = leaders.map((l) => {
      return{
        displayName: l.value.displayName,
        photoURL: l.value.photoURL,
        id: l.value.id
      }
    })

    const meeting = {
      name,
      category,
      details,
      topics,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      leaderList,
      assignedUsersList
    }

    console.log(meeting);
    console.log(typeof topics);

    await addDocument(meeting)
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


  const handleTopicChange = (i, e) => {
    let newTopics = [...topics];
    newTopics[i][e.target.name] = e.target.value;
    setTopics(newTopics);
  }

  const addFormFields = (e) => {
    if (e !== 0) {
      setTopics([...topics, { topic: ""}])
    }
  }

  const removeFormFields = (i) => {
    let newTopics = [...topics];
    newTopics.splice(i, 1);
    setTopics(newTopics)
  }

  return (
    <div className='create-form'>
      <h2 className="page-title">Create New Meeting</h2>
      <form>
        <label>
          <span className='required'>Meeting Name:</span>
          <input
            placeholder='Example: Morning Meeting'
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span className='required'>Meeting category:</span>
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
        <span className='required'>Meeting Topics: (Min 2)</span>          
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
                    onChange={(e) => handleTopicChange(index, e)}
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
                <button className="btngreen" type="button" onClick={() => addFormFields(topics.topic)}>Add Topic</button>
            </div>
            </label>
            <label>
              <span className='required'>Meeting Date:</span>
              <input
                required
                type="datetime-local"
                onChange={(e) => setDueDate(e.target.value)}
                value={dueDate}
              />
            </label>
            <label>
              <span className='required'>Meeting Leader(s): (Min 1)</span>
              <Select
                required
                onChange={(option) => setLeaders(option) }
                options={users}
                isMulti
              />
            </label>
            <label>
              <span className='required'>Participants: (Min 1)</span>
              <Select
                required
                onChange={(option) => setAssignedUsers(option) }
                options={users}
                isMulti
              />
            </label>
            <button onClick={handleSubmit} className="btn">Add Meeting</button>
            <button onClick={handleStart} className="btngreen">Start Meeting Now</button>
            {/* <label>
              <input type="checkbox"/>
              <Form />
            </label> */}
            {formError && <p className='error'>{formError}</p> }
      </form>
    </div>
  )
}
