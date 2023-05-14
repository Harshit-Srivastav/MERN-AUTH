import React, { useEffect } from 'react'
import { Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useGetUsersQuery } from '../services/userServices.js'
import { useDispatch } from 'react-redux'
import { addUser } from '../reducers/userReducer.js'


const Dashboard = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()

  useEffect(() => {
    if(!token) {
        navigate('/login')
    }
}, [token, navigate])
const { data , error} = useGetUsersQuery(token)
useEffect(() => {
 if(data) {
  dispatch(addUser({
    name: data.user.name,
    token: data.token
  }))
 }
}, [data, dispatch])

  return (
    <div>
      {data ? <Alert style={{textAlign: 'center', color: 'green', fontSize: '1.8rem'}} variant='success' >Welcome to Amaze, 
       { data ? data.user.name : ''} - { data ? data.user.email : ''} Be ready for your amazing experience with us</Alert>: ''}
      {error ? <Alert variant='danger'>User Authentication Failed</Alert>: ''}
    </div>
  )
}

export default Dashboard
