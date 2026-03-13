import { Link, useNavigate } from "react-router-dom"
import FormGroup from "../components/FormGroup"
import "../style/authStyle.scss"
import { useAuth } from "../hooks/useAuth"
import { useState } from "react"

const Login = () => {
  const navigate = useNavigate()
  const {loading, handleLogin} = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async(e)=>{
    e.preventDefault()

    try{
      await handleLogin({email, password})
      console.log("Login successful")
      navigate("/home")
    }
    catch(err){
      console.log("Login failed : ", err)
    }
  }

  return (
    <main className="page">
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <FormGroup 
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            label={"email"}
            placeholder={"Enter your email or username."} 
          />

          <FormGroup 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            label={"password"}
            placeholder={"Enter your password."} 
          />

          <button type='submit'>Login</button>
          <p>Don't have an account? <Link to="/register">Register</Link></p>
        </form>
      </div>
    </main>
  )
}

export default Login