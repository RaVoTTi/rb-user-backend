import { connect } from 'mongoose'

const dbConnection = async () => {
    const { MONGODB_CNN, MONGODB_CNN_ADMIN, NODE_ENV } = process.env
    const connectionString =
        NODE_ENV === 'prod' ? MONGODB_CNN : MONGODB_CNN_ADMIN

    try {
        await connect(connectionString || '')
        console.log('Database Online')

        
    } catch (error) {
        console.log(error)
    }
}

export default dbConnection
