/* eslint-disable no-console */
import bcrypt from "bcrypt";
import db from "../config/db.js";
import User from "../models/User.js";
import { v4 as uuidv4 } from "uuid";


(async () => {



  const user = {
    fullName: "Full Admin",
    userType: "Admin",
    email: "123@admin.com",
    password: await bcrypt.hash("123123", 10),
    collegeName: "Admin College"
  };

  try {
    await db;

    const oldAdmin = await User.findOne({ email: user.email });

    if (oldAdmin) {
      console.log("admin already exits");
      console.log(oldAdmin);
      process.exit();
    }

    let token = uuidv4();
    while (true) {
      const user = await User.findOne({ uuid: token });
      if (user) {
        token = uuidv4();
      } else {
        break;
      }
    }

    
    // Insert into DB
    const newAdmin = await User.create({...user,id:token});
    console.log("Admin created");
    console.log(newAdmin);

    process.exit();
  } catch (error) {
    console.log(error);
  }
})();
