import { Schema, model, Types } from 'mongoose';

interface IPet {
    name: string,
    age: number,
    weight: number,
    color: string,
    images: Array<string>,
    available: boolean,
    user: Types.ObjectId,
    adopter?: Types.ObjectId
}

const Pet = model<IPet>('Pet', new Schema<IPet>({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    available: {
        type: Boolean,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    adopter: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
}));

export default Pet;