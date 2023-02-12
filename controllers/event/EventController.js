import Event from "../../models/Event.js";
import EventRegistration from "../../models/EventRegistration.js";
import User from "../../models/User.js";
import mongoose from "mongoose";
import { CreateTicketContract, IssueTicket } from "../NftTicket/NftTicketController.js";
import Web3Wallet from "../../models/Web3Wallet.js";


export const Publish = async (req, res) => {
  try {

    const user = await User.collection.findOne({
      id: req.id
    });


    if (!user && user?.userType === "Society") {
      return res.status(404).json({
        message: "Society not exits",
      });
    }


    if (user?.userType !== "Society") {
      return res.status(404).json({
        message: "User is not a society",
      });
    }


    const societyWallet = await Web3Wallet.collection.findOne({
      userId: req.id
    });

    if (!societyWallet) {
      return res.status(404).json({
        message: "Society doesnot have wallet. ",
      });
    }
    const totalTickets = 999;
    const uri = "metadatauri";
    const { banner, eventName, eventDescription, venue, contact, eventDates, registrationDates } = req.body;

    const ticketContractAddress = await CreateTicketContract(societyWallet.publicKey, totalTickets, uri, eventName, eventName);
    if (!ticketContractAddress) {
      return res.status(404).json({
        message: "Problem is in ticket contract generation ",
      });
    }
    const newEvent = await Event.create({ societyId: user.id, banner, eventName, eventDescription, venue, contact, eventDates, registrationDates, ticketContractAddress });

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

export const GetEvents = async (req, res) => {
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

export const GetEventWithId = async (req, res) => {
  try {
    const { eventId } = req.params;

    const events = await Event.findOne({_id: new mongoose.Types.ObjectId(eventId)});
    return res.status(201).json({
      success: true,
      message: "All Events requested successfully",
      data: events,
    });
  } catch (err) {
    console.log(err);
  }
}

export const Register = async (req, res) => {
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

    const userWallet = await Web3Wallet.collection.findOne({
      userId: user.id
    });

    if (!userWallet) {
      return res.status(404).json({
        message: "User doesnot have wallet. ",
      });
    }

    const oldRegistration = await EventRegistration.findOne({ eventId: event._id, userId: user.id });
    if (oldRegistration) {
      return res.status(400).json({
        success: false,
        message: "You have already registred in this event",
      });
    }

    const issueTicket = await IssueTicket(event.ticketContractAddress, userWallet.publicKey);

    if (issueTicket) {
      const paymentDetails = "this is recipet"
      const registerNewEvent = await EventRegistration.create({
        eventId: event._id, userId: user.id, paymentDetails
      });
      if (registerNewEvent) {
        return res.status(201).json({
          success: true,
          message: "Event registred successfully",
          data: registerNewEvent,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "You are not registred",
          error: registerNewEvent,
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "ticket not issued. problem in that",
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export const EventsOfSociety = async (req, res) => {
  const { id } = req.params;
  try {
    const events = await Event.find({ societyId: id });

    return res.status(201).json({
      success: true,
      message: "All Events requested successfully",
      data: events,
    });
  } catch (err) {
    console.log(err);
  }
}



export const GetAllRegisteredEventsByUser = async (req, res) => {
  try {
    const allRegisrations = await EventRegistration.find({ userId: req.id });
    const allEvents = [];
    for (const regisrations of allRegisrations) {
      let _event = await Event.findOne({ _id: new mongoose.Types.ObjectId(regisrations.eventId) });
      allEvents.push(_event);
    }

    return res.status(201).json({
      success: true,
      message: "All Events registred by user",
      data: allEvents,
    });
  } catch (err) {
    console.log(err);
  }
}

export const GetAllUsersRegisteredInEvent = async (req, res) => {

  const { eventId } = req.params;
  try {
    const allRegisrations = await EventRegistration.find({ eventId });

    const allUsers = [];
    for (const regisrations of allRegisrations) {
      let _user = await User.findOne({ id: regisrations.userId });
      allUsers.push(_user);
    }

    return res.status(201).json({
      success: true,
      message: "All Users registred in Event",
      data: allUsers,
    });
  } catch (err) {
    console.log(err);
  }
}


export const HasUserRegistered = async(req,res)=>{
  const { eventId } = req.params;
  try {
    const isRegistered = await EventRegistration.findOne({ eventId, userId:req.id });

    if (isRegistered) {
      return res.status(201).json({
        success: true,
        isRegistered:true
      });
    } else {
      return res.status(201).json({
        success: true,
        isRegistered:false
      });
    }
    
  } catch (err) {
    console.log(err);
  }
}