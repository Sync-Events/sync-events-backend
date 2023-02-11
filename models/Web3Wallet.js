import mongoose from "mongoose";

const web3WalletSchema = new mongoose.Schema(
    {
        publicKey:{
            type:String,
            required:true
        },
        privateKey:{
            type:String
        },
        userId:{
            type:String,
            required:true
        }
    },
    { timestamps: true }
);

export default mongoose.model("Web3Wallet", web3WalletSchema);
