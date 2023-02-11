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
            type:String
        }
    },
    { timestamps: true }
);

export default mongoose.model("EventRegistration", EventRegistrationSchema);
