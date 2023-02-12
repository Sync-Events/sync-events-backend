import Web3Wallet from '../../models/Web3Wallet.js';
import User from '../../models/User.js';
import bcrypt from "bcrypt";

import { ethers } from 'ethers';


export const ConnectWallet = async (req, res) => {
    try {

        const user = await User.collection.findOne({
            id: req.id
        });

        const wallet = await Web3Wallet.collection.findOne({
            userId: req.id
        });

        if (!user) {
            return res.status(201).json({
                message: "User already exists"
            });
        }

        if (wallet) {
            return res.status(409).json({
                message: "Wallet already Connected for this user"
            });
        }

        try {
            // const signerAddr = await ethers.utils.verifyMessage(mess, signedMessage)
            
            const newWallet = await Web3Wallet.create({
                publicKey: req.body.publicKey, privateKey:"Na", userId: user.id
            });
            
            return res.status(201).json({
                success: true,
                message: "Wallet Connected successfully",
                data: newWallet,
            });
        } catch (error) {
            return res.status(500).json({
                message: error
            });
        }

    } catch (err) {
        console.log(err);
    }
};


export const CreateWallet = async (req, res) => {
    try {

        const user = await User.collection.findOne({
            id: req.id
        });
        
        const wallet = await Web3Wallet.collection.findOne({
            userId: req.id
        });
        console.log("user");
        console.log(user);

        console.log("wallet");
        console.log(wallet);

        if (!user) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        if (wallet) {
            return res.status(409).json({
                message: "Wallet already exists for this user"
            });
        }

        try {
            const _wallet = ethers.Wallet.createRandom();

            console.log(_wallet);

            const newWallet = await Web3Wallet.create({
                publicKey: _wallet.address, privateKey: _wallet.privatekey, userId: user.id
            });

            return res.status(201).json({
                success: true,
                message: "Wallet created successfully",
                data: newWallet,
            });
        } catch (error) {
            return res.status(500).json({
                message: error
            });
        }

    } catch (err) {
        console.log(err);
    }
};


export const GetWallet = async (req, res) => {
    try {
        const wallet = await Web3Wallet.findOne({
            userId: req.id
        });
        if (wallet) {
            wallet.privateKey = "Na"
            return res.status(200).json({
                success:true,
                message: "Wallet created Succefully",
                data:wallet
            });
        } else {
            return res.status(404).json({
                success:false,
                message: "Wallet does not exits",
            });
        }
    } catch (err) {
        console.log(err);
    }
}

