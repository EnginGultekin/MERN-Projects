import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            require: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            require: true,
            toJSON: false,
        },
        role: {
            type: String,
            default: 'user',
            enum: ['user', 'admin'],
        },
    },
    { timestamps: true }
);


userSchema.pre("save", async (next) => {
    try {
        if (this.isNew) {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(this.password, salt);
            this.password = hashed;
        }

        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.isValidPass = async (pass) => {
    return await bcrypt.compare(pass, this.password);
}


export default mongoose.model("User", userSchema);