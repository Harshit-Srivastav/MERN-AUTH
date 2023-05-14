import React, { useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { useChangeUserPasswordServiceMutation } from '../services/userServices'

const ChangePassword = () => {
const [password, setPassword] = useState("")
const [confirmPassword, setConfirmPassword] = useState("")
const [error, setError] = useState('')
const [success, setSuccess] = useState('')
const [changeUserPassword, {isLoading}] = useChangeUserPasswordServiceMutation()
const token = localStorage.getItem('token')

async function handleSubmit(e) {
    setError('')
    setSuccess('')
    e.preventDefault()
    if(password && confirmPassword){
        if(password !== confirmPassword) {
           return setError("Password doesn't match")
        } 

        const res = await changeUserPassword({
            token,
            password,
            confirmPassword
        })

        if(res) { 
            setSuccess('Password Change Successfully')
            setPassword('')
            setConfirmPassword('')
    }
    } else {
        setError('All Fields are required')
    }
}
  return (
    <div className='center'>
       <Form onSubmit={handleSubmit}> 
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
      </Form.Group>
      <Button variant="primary" className='px-5 py-2 m-3' type="submit">
        Submit
      </Button>
      {error ? <Alert variant='danger'>{error}</Alert> : ""} 
      {success ? <Alert variant='success'>{success}</Alert> : ""}
    </Form>
    </div>
  )
}

export default ChangePassword
