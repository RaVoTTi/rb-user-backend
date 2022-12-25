import { model, Schema, Document, Types } from 'mongoose'

export interface IOption {
    option: string
    key: string
}


export interface IEvaluation {
    question: string
    correctKey: string
    options?: IOption[]
}

export interface IBook extends Document {
    name: string
    description: string
    state: boolean
    isFeatured: boolean
    image: string
    subject: Types.ObjectId
    minPrice: number
    maxPrice: number
    rating: number
    dateCreated: Date
    numReviews: number
    autor: Types.ObjectId
    link: string
    // evaluation: IEvaluation[]
    content: string
}

const bookSchema: Schema<IBook> = new Schema({
    name: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, 'The book is required'],
    },
    description: {
        type: String,
        // required: [true, 'The description is required'],
    },
    state: {
        type: Boolean,
        default: true,
    },
    image: {
        type: String,
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: "Subject",
        required:true
    },

    minPrice: {
        type: Number,
        min: 0,
        default: 30
    },
    maxPrice: {
        type: Number,
        min: 0,
        default: 150
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    autor: {
        type: Schema.Types.ObjectId,
        ref: 'Autor',
        required:true
        
    },
    link: {
        type: String,
        required: true,
    },
    // evaluation: {
    //     type: [
    //         {
    //             question: {
    //                 type: String,
    //                 required: [true, 'The question is required'],
    //             },
    //             correctKey: {
    //                 lowercase: true,
    //                 type: String,
    //                 required: [true, 'The correctKey is required'],
    //             },
    //             options: {
    //                 type: [
    //                     {
    //                         option: {
    //                             type: String,
    //                             required: [true, 'The option is required'],
    //                         },
    //                         key: {
    //                             lowercase: true,
    //                             type: String,
    //                             required: [true, 'The key is required'],
    //                         },
    //                     },
    //                     {
    //                         _id: false,
    //                     },
    //                 ],
    //                 _id: false,
    //             },
    //         },
    //         {
    //             _id: false,
    //         },
    //     ],
    //     _id: false,
    // },
    content: {
        type: String,
        required: [true, 'The content is required'],
    },
})

bookSchema.methods.toJSON = function () {
    const { __v, ...resto } = this.toObject()

    return resto
}

export const Book = model<IBook>('Book', bookSchema)
{}