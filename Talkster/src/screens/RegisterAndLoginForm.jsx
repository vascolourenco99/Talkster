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
      <div className="wrapper">
        <div className="title"><span>Talkster</span></div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <i className="fas fa-user"></i>
            <input value={username} 
                    onChange={e => setUsername(e.target.value)} 
                    type="text" placeholder="username"/>
          </div>
          <div className="row">
            <i className="fas fa-lock"></i>
            <input value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    type="password" placeholder="password"/>
          </div>
            <div className="button-container">
              <button className="button-register">
                {isLoginOrRegister === 'register' ? 'Register' : 'login'}
              </button>
            </div>
            <div>
            {isLoginOrRegister === 'register' && (
              <div>
                Already a Talkster?
                <button className="button-login" onClick={() => setLoginOrRegister('login')}>
                  Login here
                </button>
              </div>
            )}
              {isLoginOrRegister === 'login' && (
              <div>
                Dont have an account?
                <button className="button-login" onClick={() => setLoginOrRegister('register')}>
                  Register here
                </button>
              </div>
            )}
            </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterAndLoginForm