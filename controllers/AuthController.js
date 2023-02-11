import User from '../models/User.js';

import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
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
            password, isVerifyed:false
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


export const Login = async (req, res) => {
      const { email, password } = req.body;

      console.log(email, password);
      try {
        const user = await User.collection.findOne({
            email
        });

        if (!user) {
            res.status(404).json({
                message: "User not found",
            });
        } else {

            console.log("process.env.SIGNIN_SECRET");
            console.log(process.env.SIGNIN_SECRET);
            if (bcrypt.compareSync(password, user.password)) {
                const { username, email, id } = user;
                const token = jwt.sign(
                    {
                        id,
                    },
                    process.env.SIGNIN_SECRET,
                    // {
                    //     expiresIn: "3h",
                    // }
                );
                res.status(200).json({
                    message: "User logged in successfully",
                    data: { token, email, username },
                });
            } else {
                res.status(401).json({
                    message: "Invalid password",
                });
            }
        }
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
}
