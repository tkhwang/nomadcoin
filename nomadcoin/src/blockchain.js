const CryptoJS = require("crypto-js");

class Block {
  constructor(index, hash, previousHash, timestamp, data) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
  }
}

const genesisBlock = new Block(
  0,
  "586D919420B37A3A77E38A87FA55FDA908604784F0A8B3C58A639165F604DC2D",
  null,
  1520865023910,
  "This is the genesis!!"
);

let blockchain = [genesisBlock];

const getLastBlock = () => blockchain[blockchain.length - 1];
const getTimestamp = () => new Date().getTime() / 1000;
const createHash = (index, previousHash, timestamp, date) =>
  CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
const createNewBlock = data => {
  const previousBlock = getLastBlock();
  const newBlockIndex = previousBlock.index + 1;
  const newTimestamp = getTimestamp();
  const newHash = createHash(newBlockIndex, previousBlock.hash, newTimestamp, data);
  const newBlock = new Block(newBlockIndex, newHash, previousBlock.hash, newTimestamp, data);
  return newBlock;
};

const getBlockHash = block => createHash(block.index, block.previousHash, block.timestamp, block.data);

const isNewBlockValid = (candidateBlock, latestBlock) => {
  if (latestBlock.index + 1 != candidateBlock.index) {
    console.log("The candidate block doesnt have a valid index");
    return false;
  } else if (latestBlock.hash !== candidateBlock.previousHash) {
    console.log("The previousHash of the candidate block is not the hashof the latest block");
    return false;
  } else if (getBlockHash(candidateBlock) !== candidateBlock.hash) {
    console.log("The hash of this block is invalid.");
    return false;
  }
  return true;
};
