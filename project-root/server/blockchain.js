const Block = require("./block");
const Transaction = require("./transaction");

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 4;
    this.pendingTransactions = [];
    this.miningReward = 100;
  }

  createGenesisBlock() {
    return new Block(0, "01/01/2023", "Genesis block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  isValidNewBlock(newBlock) {
    const lastBlock = this.getLatestBlock();
    if (lastBlock.index + 1 !== newBlock.index) {
      return false;
    } else if (lastBlock.hash !== newBlock.previousHash) {
      return false;
    } else if (newBlock.calculateHash() !== newBlock.hash) {
      return false;
    }
    return true;
  }

  addTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }
}

module.exports = Blockchain;
