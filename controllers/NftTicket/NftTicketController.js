import { ethers } from 'ethers';
import { PRIVATE_KEY_FOR_WALLET, SyncEventsContract, rpcUrl } from '../../config/web3Consts.js';
import {SyncEventsContractJson} from '../../abi/SyncEventsContractJson.js';


export const CreateTicketContract = async (societyWalletAddress, totalTickets, uri, contractName, contractSymbol) => {
    console.log("CreateTicketContract");
    try {
        console.log(societyWalletAddress, totalTickets, uri, contractName, contractSymbol);
        console.log(rpcUrl);
        const customHttpProvider = new ethers.providers.JsonRpcProvider(rpcUrl);
        
        const wallet = new ethers.Wallet(PRIVATE_KEY_FOR_WALLET, customHttpProvider);
        const contractWithSigner = new ethers.Contract(collectionAddress, SyncEventsContractJson.abi, wallet);

        const _newTicketContract = await contractWithSigner.deployTicketContract(societyWalletAddress, totalTickets, uri, contractName, contractSymbol);
        const newTicketContract = await _newTicketContract.wait();
        console.log(`New ticket Address: ${newTicketContract.events[0].args[0]}`);
        return newTicketContract.events[0].args[0];
    } catch (err) {
        console.log(err);
    }
};


export const IssueTicket = async (ticketContractAddress, toAddress) => {
    try {
        const customHttpProvider = new ethers.providers.JsonRpcProvider(SyncEventsContract);
        const wallet = new ethers.Wallet(PRIVATE_KEY_FOR_WALLET, customHttpProvider);
        const contractWithSigner = new ethers.Contract(collectionAddress, SyncEventsContractJson.abi, wallet);

        const _issueTickets = await contractWithSigner.issueTicket(ticketContractAddress,toAddress);
        const issueTickets = await _issueTickets.wait();
        console.log(issueTickets.events);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};

