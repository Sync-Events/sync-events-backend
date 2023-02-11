import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            unique: true,
        },
        userType:{
            type: String,
            required: true,
            enum: ["Society", "Student","Admin"]
        },
        fullName: {
            type: String,
            required: true,
        },
        
        image: {
            type: String,
        },
        bio:{
            type: String,
        },
        course:{
            type: String,
        },
        collegeYear: {
            type: String,
            enum: ["1", "2", "3","4"],
        },
        collegeName: {
            type: String,
            required: true
        },
        phoneNo: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true
        },
        
        isVerifyed: {
            type: Boolean
        },
        convenerDetail:{
            type:Object
        },
        socialLinks: {
           type:Array
        }

    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);
