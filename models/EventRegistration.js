import mongoose from "mongoose";

const EventRegistrationSchema = new mongoose.Schema(
    {
        eventId: {
            type: Array,
            required: true,
        },
        userId: {
            type: Array,
            required: true,
        },
        paymentDetails:{
            type:String,
            required:true
        }
    },
    { timestamps: true }
);

export default mongoose.model("EventRegistration", EventRegistrationSchema);
