import { Schema, model } from 'mongoose';

interface IUser {
    name: string,
    email: string,
    password: string,
    image?: string,
    phone: string
}

const User = model<IUser>('User', new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: String,
    phone: {
        type: String,
        required: true
    }
}, {
    timestamps: true
}));

export default User;