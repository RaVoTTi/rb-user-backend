import { model, Schema, Document, Types } from 'mongoose'


export interface IEvaluation {
    question: string
    correctOption: number
    options?: string[]
}

export interface IBook extends Document {
    name: string
    description: string
    state: boolean
    isFeatured: boolean
    image: string
    imageSM:string
    subject: Types.ObjectId
    price: number
    rating: number
    dateCreated: Date
    numReviews: number
    autor: Types.ObjectId
    link: string
    evaluation: IEvaluation[]
    content: string
}

const bookSchema: Schema<IBook> = new Schema({
    name: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, 'The book is required']
    },
    description: {
        type: String,
        required: [true, 'The description is required']
    },
    state: {
        type: Boolean,
        default: true,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    image: {
        type: String,
    },
    imageSM: {
        type: String,
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: "Subject",
        required: true
    },

    price: {
        type: Number,
        min: 0,
        default: 30
    },

    dateCreated: {
        type: Date,
        default: Date.now,
    },
    autor: {
        type: Schema.Types.ObjectId,
        ref: 'Autor',
        required: true

    },
    link: {
        type: String,
        // required: true,
    },
    evaluation: [{
        type: {
            question: {
                type: String,
                require: true
            },
            options: [{
                type: String,
                require: true
            },],
            correctOption: {
                type: Number,
                require: true
            },
        }
    }],
    content: {
        type: String,
        required: [true, 'The content is required']
    },
})

bookSchema.methods.toJSON = function () {
    const { __v, ...resto } = this.toObject()

    return resto
}

export const Book = model<IBook>('Book', bookSchema)
{ }