// NODE
import path from 'path'

// TERCEROS
import express, { Express } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
// import multer from 'multer'
import fileUpload from 'express-fileupload'

// DATABASE
import dbConnection from './database'

// HELPERS
// import { validateJwt } from '../helpers/validate-JWT'
// import { isAdminRole } from '../helpers/validate-admin-role'

// ROUTES
import { router as apiRoute } from '../api/api.routes'
import { router as webhookRoute } from '../api/webhook/webhook.routes'

export default class Server {
    private app: Express = express()
    public PORT: number = (process.env.PORT || 8080) as number
    public URL: string = process.env.API_URL || '/api'

    constructor() {
        this.middlewares()
        this.routes()
        dbConnection()
    }
    // ROUTES
    routes() {
        this.app.use(
            this.URL,
            [express.json(), express.urlencoded({ extended: true })],
            apiRoute
        )
        this.app.use('/webhook', webhookRoute)
    }

    // MIDDLEWARES
    middlewares() {
        // CORS
        this.app.use(cors())
        // this.app.options('*', cors())

        // HELMET
        this.app.use(
            helmet({
                crossOriginResourcePolicy: false, // UPGRADE
            })
        )

        // fileUpload
        this.app.use(
            fileUpload({
                useTempFiles: true,
            })
        )


        // MORGAN
        this.app.use(morgan('dev'))

        // HTML
        this.app.use(express.static(`${process.env.PWD}/public`))
        this.app.use(
            '/public/uploads',
            express.static(`${process.env.PWD}/public/uploads`)
        )
    }

    // LISTEN
    listen() {
        this.app.listen(this.PORT, () => {
            console.log('App Listening in PORT:', this.PORT)
        })
    }
}
