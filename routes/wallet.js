import { Router } from "express";
const router = Router();


// Controllers
import UserAuth from "../middleware/UserAuth.js";
import { ConnectWallet, CreateWallet, GetWallet } from "../controllers/web3Wallet/web3WalletController.js";

router.post("/createWallet",UserAuth,CreateWallet);
router.post("/connectWallet",UserAuth,ConnectWallet);
router.get("/getWallet",UserAuth,GetWallet);


export default router;
