import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSignup } from '../../hooks/useSignup'

//styles
import './Signup.css'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState(null)
  const [displayName, setDisplayName] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailError, setThumbnailError] = useState(null)
  const { signup, isPending, error } = useSignup()

  const handleSubmit = (e) => {
    e.preventDefault()

    if ( confirmPassword !== password ) {
      setPasswordError('Password not matched. Please try again.')
      return
    }
    if (thumbnailError){
      setPasswordError(null)
      return
    }
    signup(email, password, displayName, thumbnail);
  }

  const handleFileChange = (e) => {
    setThumbnail(null)
    let selected = e.target.files[0]
    console.log(selected);

    if (!selected) { // remove the '!' if you want to allow profiles without photo. < NOT TRUE !!!
      setThumbnailError('Please select file')
      return //this return is cus when we got 1 error - we go out of this function.
    }
    if (!selected.type.includes('image')) { // the 'type' is from clg(selected). type: "text/plain"
      setThumbnailError('Selected file must be an Image')
      return
    }
    if (selected.size > 2000000) {
      setThumbnailError('Image file must be less than 2MB')
      return
    }

    setThumbnailError(null)
    setThumbnail(selected)
    console.log('Thumbnail updated !');
  }

  return (
    <div>
      <div className="title">
        <h2>Welcome to our Meeting Manager !<br />Please Signup to reveale more.</h2>
      </div>
      <p className='signup-link'>If you already have an account - <Link to="/login">Click here</Link> to Login</p>
      <form className='auth-form' onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <label>
          <span className='required'>Username</span>
          <input
            type="text"
            required
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
            />
        </label>
        <label>
          <span className='required'>Email</span>
          <input
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            />
        </label>
        <label>
          <span className='required'>Password</span>
          <input
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            />
        </label>
        <label>
          <span className='required'>Confirm Password</span>
          <input
            type="password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            />
            {passwordError && <div className="error">{passwordError}</div>  }
        </label>
        <label>
          <span className='required'>Profile IMG</span>
          <input
            type="file"
            required
            onChange={handleFileChange}
            />
            {thumbnailError && <div className='error'>{thumbnailError}</div>}
        </label>
        {!isPending && <button className="btn">Signup</button>}
        {isPending &&  <button className="btn" disabled>Loading...</button>}
        {error && <div className='error'>{error}</div>}
      </form>
    </div>

  )
}
