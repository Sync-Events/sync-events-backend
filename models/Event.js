import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
    {
        banner: {
            type: String,
            required:true,
        },
        ticketContractAddress:{
            type: String,
            required:true,
        },
        eventName: {
            type: String,
            required: true,
        },
        registrationFee:{
            type: Object, // {"isFree":false,"Inr":"","Matic":""}
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
        },

    },
    { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
