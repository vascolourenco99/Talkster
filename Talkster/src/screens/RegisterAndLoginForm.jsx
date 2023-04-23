import { useContext, useState } from "react"
import "./RegisterAndLoginForm.css"
import axios from "axios"
import { UserContext } from "../UserContext"

const RegisterAndLoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoginOrRegister, setLoginOrRegister] = useState('register')
  const {setUsername:setLoogedInUsername, setId} = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLoginOrRegister === 'register' ? 'register' : 'login'
    const {data} = await axios.post(url, {username,password});
    setLoogedInUsername(username);
    setId(data.id)
  }
  return(
    <div className="container">
      <form className="register-form" onSubmit={handleSubmit}>
        <input value={username} 
                onChange={e => setUsername(e.target.value)} 
                type="text" placeholder="username" 
                className="box"/>
        <input value={password} 
                onChange={e => setPassword(e.target.value)} 
                type="password" placeholder="password" 
                className="box"/>
        <button>
          {isLoginOrRegister === 'register' ? 'Register' : 'login'}
        </button>
        <div>
         {isLoginOrRegister === 'register' && (
          <div>
            Already a Talkster?
            <button onClick={() => setLoginOrRegister('login')}>
              Login here
            </button>
          </div>
         )}
           {isLoginOrRegister === 'login' && (
          <div>
            Dont have an account?
            <button onClick={() => setLoginOrRegister('register')}>
              Register here
            </button>
          </div>
         )}
        </div>
      </form>
    </div>
  )
}
export default RegisterAndLoginForm