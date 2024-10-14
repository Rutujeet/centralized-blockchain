const WebSocket = require("ws");
const crypto = require("crypto");

const wss = new WebSocket.Server({ port: 8080 });

let blockchain = [{ index: 0, hash: "000000", data: "Genesis Block" }];
let pendingTransactions = [];

wss.on("connection", (ws) => {
  console.log("New client connected");

  ws.on("message", (message) => {
    const data = JSON.parse(message);

    switch (data.type) {
      case "MINE":
        mineBlock(ws);
        break;
      case "NEW_TRANSACTION":
        handleNewTransaction(data.transaction, ws);
        break;
      case "GET_BLOCKCHAIN":
        sendBlockchain(ws);
        break;
    }
  });
});

function mineBlock(ws) {
  const lastBlock = blockchain[blockchain.length - 1];
  const newBlock = {
    index: lastBlock.index + 1,
    previousHash: lastBlock.hash,
    timestamp: Date.now(),
    data: pendingTransactions,
    nonce: 0,
  };

  while (!newBlock.hash?.startsWith("000")) {
    newBlock.nonce++;
    newBlock.hash = calculateHash(newBlock);
  }

  blockchain.push(newBlock);
  pendingTransactions = [];

  broadcastNewBlock(newBlock);
}

function handleNewTransaction(transaction, ws) {
  pendingTransactions.push(transaction);
  broadcast({ type: "NEW_TRANSACTION", transaction });
}

function sendBlockchain(ws) {
  ws.send(JSON.stringify({ type: "BLOCKCHAIN", chain: blockchain }));
}

function calculateHash(block) {
  return crypto
    .createHash("sha256")
    .update(
      block.index +
        block.previousHash +
        block.timestamp +
        JSON.stringify(block.data) +
        block.nonce
    )
    .digest("hex");
}

function broadcast(message) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

function broadcastNewBlock(block) {
  broadcast({ type: "NEW_BLOCK", block });
}

console.log("Blockchain server started on ws://localhost:8080");
