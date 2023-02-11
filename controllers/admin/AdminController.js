import Event from "../../models/Event.js";
import User from "../../models/User.js";


export const VerifySociety = async (req, res) => {
  try {

    const user = await User.collection.findOne({
      id: req.id
    });

    if (!user) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    if (user.userType !== "Admin") {
      return res.status(404).json({
        message: "User is not Admin",
      });
    }
    const society = await User.find({id:req.body.societyId});
    if (!society) {
      return res.status(404).json({
        message: "Society not exits",
      });
    }

    const updatedSociety = await User.updateOne({id:req.body.societyId},{
        $set: {
            isVerifyed: true
        },
    });

    if (updatedSociety) {
        return res.status(201).json({
          success: true,
          message: "Society Verifyed successfully",
          data: updatedSociety,
        });
      } else {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

  } catch (err) {
    console.log(err);
  }
};


