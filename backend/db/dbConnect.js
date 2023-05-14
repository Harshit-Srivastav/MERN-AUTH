import mongoose from "mongoose";
mongoose.set('strictQuery', true)

const connectDB = async (DB_URL) => {
    try {
        const dbObj = {
            dbName: 'AUTH'
        }
       const res = await mongoose.connect(DB_URL, dbObj)
    } catch(e) {
        console.log(e)
    }
}

export default connectDB