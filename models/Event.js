import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        banner: {
            type: String,
            required:true,
        },
        eventName: {
            type: String,
            required: true,
        },
        
        eventDescription: {
            type: String,
            required: true,
        },
        venue: {
            type: String,
            required: true
        },
        contactEmail: {
            type: String,
            required: true,
        },
        publishedData:{
            type:Date,
        },
        eventDates:{
            type:Object,
            required:true
        },
        registrationDates:{
            type:Object, // end and start
            required:true
        }
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);
