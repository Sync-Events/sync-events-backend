import Event from "../../models/Event.js";
import User from "../../models/User.js";


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


export const EventsOf = async (req,res) => {
  const { id } = req.params;
  try {

    const users = await Event.find({societyId:id});
    return res.status(201).json({
      success: true,
      message: "All Events requested successfully",
      data: users,
    });
  } catch (err) {
    console.log(err);
  }
}


