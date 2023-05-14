import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import manageToken from '../services/localStorage.js';
import { useLoginUserServiceMutation } from '../services/userServices.js';


function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loginUserService, {isLoading}] = useLoginUserServiceMutation()
  const navigate = useNavigate()
  async function handleSubmit(e){
    try{
      e.preventDefault()
      setError('')
      const {data, error } = await loginUserService({
        email,
        password
      }) 
      if(data) {
        setSuccess(data.message)
        manageToken.createToken(data.token)
        navigate('/dashboard')
       }
      if(error) { setError(error.data.message)}
    } catch(err){
      setError(err.message)
    }
    
  }
  return (
    <div className='center'>
    <Form onSubmit={handleSubmit}> 
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
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

export default Login;