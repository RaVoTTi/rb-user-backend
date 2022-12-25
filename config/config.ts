import dotenv from 'dotenv'
dotenv.config()
export const {
    PORT,
    API_URL,
    FRONT_URL,
    NODE_ENV,
    MONGODB_CNN,
    MONGODB_CNN_ADMIN,
    PRIVATE_KEY,
    STRIPE_KEY,
    STRIPE_KEY_TEST,
    STRIPE_CURRENCY,
    STRIPE_WEBHOOK_TEST,
    STRIPE_WEBHOOK,
    CLOUDINARY_URL,
    CLOUDINARY_SECRET,
    CLOUDINARY_KEY,

} = process.env


