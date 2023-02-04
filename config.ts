import dotenv from 'dotenv'
const path = require('path');

dotenv.config()
export const {
    PORT,
    API_URL,
    FRONT_URL,
    FRONT_URL_TEST,

    NODE_ENV,
    STRIPE_ENV,

    EMAIL_ADDRESS,
    EMAIL_PASSWORD,
    
    MONGODB_CNN,
    MONGODB_CNN_ADMIN,
    
    EMAIL_PRIVATE_KEY,
    AUTH_PRIVATE_KEY,
    PASS_PRIVATE_KEY,

    
    STRIPE_KEY,
    STRIPE_KEY_TEST,
    STRIPE_CURRENCY,
    STRIPE_WEBHOOK_TEST,
    STRIPE_WEBHOOK,
    
    CLOUDINARY_URL,
    CLOUDINARY_PRIVATE_KEY,
    CLOUDINARY_KEY,

    COIN_MARKET_CAP_KEY,

    CASHBACK_PERCENTAGE,
    REFERRAL_PERCENTAGE


} = process.env


export const rootDir = path.resolve(__dirname)


