import jwt from 'jsonwebtoken'

export const emailJWT = (email: string) => {


    const payload = {
        email
    } // genera un json

    return new Promise((resolve, reject) => {

        const key = process.env.EMAIL_PRIVATE_KEY || ''
        if (key === '') {
            reject("Private key isn't valid")
        }

        jwt.sign(payload, key, {
            expiresIn: '1d'
        }, (err: any, token: string | undefined) => {
            if (err) {
                reject("Token couldn't generate")
            }
            resolve(token?.toString())
        })
    })
}