import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        userType:{
            type: String,
            required:true,
            enum: ["Society", "Student"]
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
            unique: true,
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
        converDetail:{
            type:Object
        },
        socialLinks: [
            {
                name: {
                    type: String,
                },
                link: {
                    type: String,
                }
            }
        ]

    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);
