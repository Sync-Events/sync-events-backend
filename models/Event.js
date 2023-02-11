import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
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
        contact: {
            type: Array,
            required: true,
        },
        eventDates:{
            type:Object,
            required:true
        },
        registrationDates:{
            type:Object, // end and start
            required:true
        },
        societyId:{
            required:true,
            type:String
        }
    },
    { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
