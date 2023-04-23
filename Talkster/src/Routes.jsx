import { useContext } from "react"
import RegisterAndLoginForm from "./screens/RegisterAndLoginForm"
import { UserContext } from "./UserContext"

const Routes = () => {
  const {username} = useContext(UserContext);

  if (username) {
    return 'Logged in!' + username;
  }

  return (
    <RegisterAndLoginForm/>
  )
}

export default Routes