import mongoose, { model, Schema, Types, Document } from 'mongoose'

export interface IOrder extends Document {
    user: Types.ObjectId
    book: Types.ObjectId
    price: number
    condition: string
    dateCreated: Date
}

const orderSchema: Schema<IOrder> = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',

        required: true,
    },

    price: {
        type: Number,
        required: true,
    },
    condition: {
        type: String,
        enum: ['place order', 'purchased', 'pending giftback', 'giftbacked' , 'failed'],
        default: 'place order',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,

    },

    dateCreated: {
        type: Date,
        default: Date.now,
    },
})
orderSchema.methods.toJSON = function () {
    const { __v, ...resto } = this.toObject()

    return resto
}

export const Order = model<IOrder>('Order', orderSchema)
