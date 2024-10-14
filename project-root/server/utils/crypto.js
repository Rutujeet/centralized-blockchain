const crypto = require("crypto");

function verifySignature(transaction) {
  const publicKey = transaction.fromAddress;
  const signature = transaction.signature;

  const verifier = crypto.createVerify("SHA256");
  verifier.update(
    JSON.stringify({
      fromAddress: transaction.fromAddress,
      toAddress: transaction.toAddress,
      amount: transaction.amount,
      timestamp: transaction.timestamp,
    })
  );

  return verifier.verify(publicKey, signature, "base64");
}

module.exports = { verifySignature };
