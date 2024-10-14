import {
  generateKeyPairSync,
  createSign,
} from "https://jspm.dev/crypto-browserify";

export function createWallet() {
  const { publicKey, privateKey } = generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: { type: "spki", format: "pem" },
    privateKeyEncoding: { type: "pkcs8", format: "pem" },
  });

  return {
    address: publicKey,
    privateKey: privateKey,
  };
}

export function signTransaction(transaction, privateKey) {
  const sign = createSign("SHA256");
  sign.update(JSON.stringify(transaction));
  const signature = sign.sign(privateKey, "base64");

  return {
    ...transaction,
    signature: signature,
  };
}
