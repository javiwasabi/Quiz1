import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    userEmail: string;
    score: string;
    active: boolean;
}

const userSchema: Schema = new Schema({
    userEmail: {
        type: String,
        required: true
    },
    score: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
