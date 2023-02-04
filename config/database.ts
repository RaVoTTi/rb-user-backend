import mongoose from 'mongoose'

const dbConnection = async () => {
    const { MONGODB_CNN, MONGODB_CNN_TEST , NODE_ENV  } = process.env

    const url = NODE_ENV === 'prod' ? MONGODB_CNN : MONGODB_CNN_TEST

    try {
        mongoose.set('strictQuery', true)

        await mongoose.connect(url || '')
        console.log('Database Online')
    } catch (error) {
        console.log(error)
    }
}

export default dbConnection
