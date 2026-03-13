import "../style/authStyle.scss"
import FormGroup from "../components/FormGroup"
import {Link, useNavigate} from "react-router-dom"
import {useAuth} from "../hooks/useAuth"
import { useState } from "react"

const Register = () => {
  const navigate = useNavigate()
  const { loading, handleRegister} = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")

  const handleSubmit = async(e)=>{
    e.preventDefault()

    try{
      await handleRegister({username, email, password})
      console.log("Registration successful")
      navigate("/login")
    }
    catch(err){
      console.log("Registration failed", err)
    }

  }

  return (
    <main className="page">
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <FormGroup 
            value={username}
            onChange={(e)=> setUsername(e.target.value)}
            label={"username"} 
            placeholder={"Enter your username."} 
          />

          <FormGroup 
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            label={"email"} 
            placeholder={"Enter your email."} 
          />

          <FormGroup 
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            label={"password"} 
            placeholder={"Enter your password."} 
          />

          <button type='submit'>Register</button>
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </form>
      </div>
    </main>
  )
}

export default Register