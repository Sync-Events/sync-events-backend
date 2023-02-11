import Event from "../../models/Event.js";
import EventRegistration from "../../models/EventRegistration.js";
import User from "../../models/User.js";
import mongoose from "mongoose";


export const Publish = async (req, res) => {
  try {

    const user = await User.collection.findOne({
      id: req.id
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!user.isVerifyed) {
      return res.status(404).json({
        message: "Society is not verifyed",
      });
    }

    const { banner, eventName, eventDescription, venue, contact, eventDates, registrationDates } = req.body;

    const newEvent = await Event.create({ societyId: user.id, banner, eventName, eventDescription, venue, contact, eventDates, registrationDates });

    if (newEvent) {
      return res.status(201).json({
        success: true,
        message: "Event published successfully",
        data: newEvent,
      });
    } else {
      return res.status(500).json({
        message: err.message,
      });
    }


  } catch (err) {
    console.log(err);
  }
};

export const GetEvents = async (req,res) => {
  try {

    const events = await Event.find();
    return res.status(201).json({
      success: true,
      message: "All Events requested successfully",
      data: events,
    });
  } catch (err) {
    console.log(err);
  }
}

export const Register = async (req,res) => {
  const { id } = req.params;

  try {

    const user = await User.collection.findOne({
      id: req.id
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const event = await Event.collection.findOne({
      _id: new mongoose.Types.ObjectId(id)
    });

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    const oldRegistration = await EventRegistration.findOne({eventId:event._id,userId:user.id});

    console.log(oldRegistration);
    if (oldRegistration) {
      return res.status(400).json({
        success:false,
        message: "You have already registred in this event",
      });
    }

    const paymentDetails = "this is recipet"

    const registerNewEvent = await EventRegistration.create({
      eventId:event._id,userId:user.id,paymentDetails
    });

    if (registerNewEvent) {
      return res.status(201).json({
        success: true,
        message: "Event registred successfully",
        data: registerNewEvent,
      });
    } else {
      return res.status(201).json({
        success: false,
        message: "You are not registred",
        error: registerNewEvent,
      });
    }

    
  } catch (err) {
    console.log(err);
  }
}

export const EventsOfSociety = async (req,res) => {
  const { id } = req.params;
  try {

    const events = await Event.find({societyId:id});
    return res.status(201).json({
      success: true,
      message: "All Events requested successfully",
      data: events,
    });
  } catch (err) {
    console.log(err);
  }
}


