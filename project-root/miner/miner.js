const WebSocket = require("ws");
const Block = require("../server/block");
const Transaction = require("../server/transaction");
const { performPoW } = require("../server/utils/pow");

const CENTRAL_SERVER = "ws://localhost:8080";
const ws = new WebSocket(CENTRAL_SERVER);

let blockchain = [];
let mempool = [];

ws.on("open", () => {
  console.log("Connected to central server");
  requestBlockchain();
});

ws.on("message", (message) => {
  const data = JSON.parse(message);

  switch (data.type) {
    case "BLOCKCHAIN":
      handleBlockchain(data.chain);
      break;
    case "NEW_BLOCK":
      handleNewBlock(data.block);
      break;
    case "NEW_TRANSACTION":
      handleNewTransaction(data.transaction);
      break;
  }
});

function requestBlockchain() {
  ws.send(JSON.stringify({ type: "GET_BLOCKCHAIN" }));
}

function handleBlockchain(chain) {
  blockchain = chain;
  console.log("Received blockchain:", blockchain);
  startMining();
}

function handleNewBlock(block) {
  if (isValidNewBlock(block)) {
    blockchain.push(block);
    console.log("New block added to the blockchain");
    updateMempool();
    startMining();
  }
}

function handleNewTransaction(transaction) {
  if (isValidTransaction(transaction)) {
    mempool.push(transaction);
    console.log("New transaction added to mempool");
  }
}

function startMining() {
  const lastBlock = blockchain[blockchain.length - 1];
  const newBlock = createNewBlock(lastBlock);

  performPoW(newBlock, 4).then((minedBlock) => {
    ws.send(
      JSON.stringify({
        type: "NEW_BLOCK",
        block: minedBlock,
      })
    );
  });
}

function createNewBlock(lastBlock) {
  const block = new Block(
    lastBlock.index + 1,
    Date.now(),
    mempool.slice(0, 10), // Include up to 10 transactions
    lastBlock.hash
  );
  return block;
}

function updateMempool() {
  const lastBlock = blockchain[blockchain.length - 1];
  mempool = mempool.filter((tx) => !lastBlock.transactions.includes(tx));
}

function isValidNewBlock(block) {
  // Implement block validation logic
  return true;
}

function isValidTransaction(transaction) {
  // Implement transaction validation logic
  return true;
}

console.log("Miner node started");
