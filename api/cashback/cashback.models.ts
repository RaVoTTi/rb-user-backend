import mongoose, { model, Schema, Types, Document } from 'mongoose'

export interface ICashback extends Document {
    type: string
    wallet: string
    amount: number
    // amountADA: number
    dateCreated: Date
    transferred: boolean
}

const cashbackSchema: Schema<ICashback> = new Schema({
    type: {
        type: String,
        required: true,
    },
    wallet: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    // amountADA: {
    //     type: Number,
    //     required: true,
    // },
    transferred: {
        type: Boolean,
        default: false
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
})
cashbackSchema.methods.toJSON = function () {
    const { __v, ...resto } = this.toObject()

    return resto
}

export const Cashback = model<ICashback>('Cashback', cashbackSchema)
