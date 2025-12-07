import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlenght: 3
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "This is not a valid email address"]
    },
    password: {
        type: String,
        required: true,
        minlenght: 5,
        select: false
    },
    image: {
        type: String,
        default: "",
    },
    agree: {
        type: Boolean,
        required: true,
    }
},
    {
        timestamps: true
    }
);

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
