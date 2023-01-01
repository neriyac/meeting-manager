import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLogin } from '../../hooks/useLogin'

//styles
import './Login.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isPending, error } = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password);
  }

  return (
    <div>
      <div className='title'>
        <h2>Welcome to our Meeting Manager!<br />Please Login to reveale more.</h2>  
      </div>
      <p className='signup-link'>If you have no account - <Link to="/signup">Click here</Link> to create one</p> 
      <form className='auth-form' onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label>
          <span>Email*</span>
          <input
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            />
        </label>
        <label>
          <span>Password*</span>
          <input
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            />
        </label>
        {!isPending && <button className="btn">Login</button>}
        {isPending &&  <button className="btn" disabled>Loading...</button>}
        {error && <div className='error'>{error}</div>}
      </form>      
    </div>

  )
}
