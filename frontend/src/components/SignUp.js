import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate} from 'react-router-dom'
import manageToken from '../services/localStorage.js';
import {usePostUserServiceMutation} from '../services/userServices.js'


function SignUp() {
const navigate = useNavigate()
const [name, setName] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [confirmPassword, setConfirmPassword] = useState("")

const [error, setError] = useState("")
const [success, setSuccess] = useState("")
const [postUserService, {isLoading}]= usePostUserServiceMutation()

async function handleSubmit(e){
  try {
    e.preventDefault()
    if(password !== confirmPassword) {
      setError("Password doesn't match")
    } else {
      setError('')
     const {data, error }= await postUserService({
        name,
        email,
        password,
        confirmPassword
      })
      if(data) {
        setSuccess(data.message)
        manageToken.createToken(data.token)
        navigate('/dashboard')
       }
      if(error) { setError(error.data.message)}
    }
  } catch(err) {
    setError(err.message)
  }
 
}


  return (
    <div className='center'>
    <Form onSubmit={handleSubmit}> 
        <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="name" value={name} onChange={e => setName(e.target.value)} placeholder="Enter Name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
      </Form.Group>
      <Button variant="primary" className='px-5 py-2 m-3' type="submit">
        Submit
      </Button>
     {error ? <Alert variant='danger'>{error}</Alert> : ""} 
     {success ? <Alert variant='primary'>{success}</Alert> : ""}
    </Form>
    
    </div>
  );
}

export default SignUp;