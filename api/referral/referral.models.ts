import mongoose, { model, Schema, Types, Document } from 'mongoose'

export interface IReferral extends Document {
    user: Types.ObjectId
    cashback: number
    condition: string


}

const referralSchema: Schema<IReferral> = new Schema({


    cashback: {
        type: Number,
        required: true,
    },
    condition: {
        type: String,
        enum: ['claimable cashback', 'claimed cashback', 'failed'],
        default: 'claimable cashback',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,

    },


})
referralSchema.methods.toJSON = function () {
    const { __v, ...resto } = this.toObject()

    return resto
}

export const Referral = model<IReferral>('Referral', referralSchema)
