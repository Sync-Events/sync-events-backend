import mongoose from "mongoose";

const EventRegistrationSchema = new mongoose.Schema(
    {
        eventId: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
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
