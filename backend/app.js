import express from 'express'
import connectDB from './db/dbConnect.js'
import dotenv from 'dotenv'
import cors from 'cors'

import userRouter from './routes/userRoute.js'
dotenv.config()

const port = process.env.PORT || 5000
connectDB(process.env.DB_URL)
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/user', userRouter)



app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`)
})