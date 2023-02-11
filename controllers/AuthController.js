import User from '../models/User.js';

import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export const RegisterSociety = async (req, res) => {
  const { email } = req.body;
  try {

    const oldUser = await User.collection.findOne({
        email:email
    });

    if (oldUser) {
        res.status(409).json({
            message: "User already exists"
        });
    } else {

        const password = await bcrypt.hash(req.body.password.trim(), 10);
        const {userType, fullName, image, bio, collegeYear, collegeName, phoneNo, convenerDetail,socialLinks} = req.body;

        console.log(userType, fullName, image, bio, collegeYear, collegeName, phoneNo, convenerDetail,socialLinks);
        console.log(email);
        console.log("password");
        console.log(password);

        let token = uuidv4();
        while (true) {
            const user = await User.findOne({ uuid: token });
            if (user) {
                token = uuidv4();
            } else {
                break;
            }
        }
        const newUser = await User.create({
            id:token,
            email,userType, fullName, image, bio, collegeYear, collegeName, phoneNo, convenerDetail,socialLinks,
            password
        })

        if (newUser) {
            res.status(201).json({
                success:true,
                message: "User created successfully",
                data:newUser,
            });           
        } else {
            res.status(500).json({
                message: err.message,
            });
        }
    }   
  } catch (err) {
    console.log(err);
  }
};

