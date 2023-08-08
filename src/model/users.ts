import mongoose from 'mongoose';
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            // required: [true, 'PLZ'],
        },
        password: {
            type: String,
            // required: [true, 'PLZ'],
        },
    },
    {
        timestamps: true,
    },
);
const users = mongoose.model('users', userSchema);
export default users;
