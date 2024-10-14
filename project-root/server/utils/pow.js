function fibonacci(n) {
  if (n < 0) return 0;
  if (n <= 1) return n;

  let a = 0,
    b = 1,
    temp;
  for (let i = 2; i <= n; i++) {
    temp = a + b;
    a = b;
    b = temp;
  }
  return b;
}

function calculateHash(data) {
  return require("crypto")
    .createHash("sha256")
    .update(JSON.stringify(data))
    .digest("hex");
}

function isValidProof(block, difficulty) {
  const hash = calculateHash(block);
  return (
    hash.startsWith("0".repeat(difficulty)) &&
    fibonacci(block.nonce) % 1000 === 0
  );
}

function performPoW(block, difficulty = 4) {
  return new Promise((resolve) => {
    while (!isValidProof(block, difficulty)) {
      block.nonce++;
    }
    block.hash = calculateHash(block);
    resolve(block);
  });
}

module.exports = { performPoW, isValidProof };
