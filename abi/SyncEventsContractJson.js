export const SyncEventsContractJson =  {
    "abi": [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_admin",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "TicketContractAddress",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "SocietyAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "atTime",
          "type": "uint256"
        }
      ],
      "name": "TicketContractDeployed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "TicketContract",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "TicketId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "atTime",
          "type": "uint256"
        }
      ],
      "name": "TicketIssued",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "SocietyAdressOfNftContract",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "admin",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_societyWalletAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "totalTickets",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_baseuri",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_contractName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_symbol",
          "type": "string"
        }
      ],
      "name": "deployTicketContract",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "ticketContract",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "issueTicket",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
}