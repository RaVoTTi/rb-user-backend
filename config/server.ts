// NODE
import path from 'path'

// TERCEROS
import express, { Express } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
// import multer from 'multer'
import os from 'os'

// DATABASE
import dbConnection from './database'

// HELPERS
// import { validateJwt } from '../helpers/validate-JWT'
// import { isAdminRole } from '../helpers/validate-admin-role'

// ROUTES
import { router as apiRoute } from '../api/api.routes'
import { router as webhookRoute } from '../api/webhook/webhook.routes'
import { Order } from '../api/order/order.models'
import { Cashback } from '../api/cashback/cashback.models'
import { User } from '../api/user/user.models'

// MarkDown

import { IBook } from '../api/book/book.models'
import cronTasks from '../tasks/cronTasks'
import booksFactory from '../factory/books/booksFactory'

export default class Server {
    private app: Express = express()
    public PORT: number = (process.env.PORT || 8080) as number
    public URL: string = process.env.API_URL || '/api'

    constructor() {
        this.middlewares()
        this.routes()
        dbConnection()
        cronTasks()
        // booksFactory()
    }
    // ROUTES
    routes() {
        this.app.use(
            this.URL,
            [express.json(), express.urlencoded({ extended: true })],
            apiRoute
        )
        this.app.use(
            '/webhook',
            express.raw({ type: 'application/json' }),
            webhookRoute
        )
        // this.app.use(
        //     '/assets',
        //     express.static(`${process.env.PWD}/public/`)
        // )
        // this.app.get('*',(req,res) => {
        //     res.sendFile(path.resolve (rootDir , 'index.html'))
        // })
    }

    // MIDDLEWARES
    middlewares() {
        // CORS
        this.app.use(cors())

        // this.app.options('*', cors())
        const scriptSources = ["'self'", 'https://js.stripe.com/v3/']
        const imgSources = ["'self'", 'https://res.cloudinary.com/']
        const styleSources = ["'self'"]

        this.app.use([
            // helmet.contentSecurityPolicy({
            //     directives:{
            //         defaultSrc: ["'self'"],
            //         scriptSrcElem: scriptSources,
            //         scriptSrc: scriptSources,
            //         styleSrc: styleSources,

            //         imgSrc: imgSources
            //     }
            // }),
            helmet.crossOriginEmbedderPolicy({ policy: 'credentialless' }),
            helmet.crossOriginOpenerPolicy({ policy: 'unsafe-none' }),
            helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }), // same-site
            helmet.dnsPrefetchControl(),
            // helmet.expectCt(),
            helmet.frameguard(),
            helmet.hidePoweredBy(),
            helmet.hsts(),
            helmet.ieNoOpen(),
            helmet.noSniff(),
            helmet.originAgentCluster(),
            helmet.permittedCrossDomainPolicies(),
            helmet.referrerPolicy(),
            helmet.xssFilter(),
        ])
        
        // FILE UPLOAD
        // this.app.use(
        //     fileUpload({
        //         useTempFiles: true,
        //     })
        // )

        // MORGAN
        this.app.use(morgan('dev'))

        // HTML
        this.app.use(express.static(`${process.env.PWD}/public`))
    }


    // LISTEN
    listen() {
        this.app.listen(this.PORT, () => {
            console.log('App Listening in PORT:', this.PORT)
        })
    }
}
