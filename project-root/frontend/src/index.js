import { createWallet, signTransaction } from "./wallet.js";
import { sendTransaction } from "./api.js";

document.getElementById("createWallet").addEventListener("click", () => {
  const wallet = createWallet();
  document.getElementById("address").textContent = wallet.address;
  document.getElementById("privateKey").textContent = wallet.privateKey;
});

document.getElementById("sendTransaction").addEventListener("click", () => {
  const recipient = document.getElementById("recipient").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const privateKey = document.getElementById("privateKey").textContent;
  const fromAddress = document.getElementById("address").textContent;

  if (!recipient || !amount || !privateKey || !fromAddress) {
    alert("Please fill in all fields and create a wallet first.");
    return;
  }

  const transaction = {
    fromAddress,
    toAddress: recipient,
    amount: amount,
    timestamp: Date.now(),
  };

  const signedTransaction = signTransaction(transaction, privateKey);
  sendTransaction(signedTransaction);
});
