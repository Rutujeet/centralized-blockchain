const CENTRAL_SERVER = "ws://localhost:8080"; // WebSocket address of the central server

export async function sendTransaction(signedTransaction) {
  try {
    const ws = new WebSocket(CENTRAL_SERVER);

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "NEW_TRANSACTION",
          transaction: signedTransaction,
        })
      );
      console.log("Transaction sent successfully");
      alert("Transaction sent successfully");
      ws.close();
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      alert("Error sending transaction: " + error.message);
    };
  } catch (error) {
    console.error("Error sending transaction:", error);
    alert("Error sending transaction: " + error.message);
  }
}
