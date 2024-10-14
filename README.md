# Simplified Centralized Blockchain Demo

This project demonstrates a basic implementation of a centralized blockchain system inspired by the core concepts of Bitcoin. It's designed for educational purposes to help understand the fundamentals of blockchain technology.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Components](#components)
3. [Setup and Installation](#setup-and-installation)
4. [Usage](#usage)
5. [Core Concepts](#core-concepts)
6. [Proof of Work](#proof-of-work)
7. [Limitations and Educational Purpose](#limitations-and-educational-purpose)
8. [Further Reading](#further-reading)

## Project Overview

This project implements a simplified, centralized version of a blockchain. It includes a central server that manages the blockchain, handles transactions, and coordinates the mining process. A web-based frontend allows users to interact with the blockchain by sending transactions and triggering the mining process.

## Components

1. **Central Server** (`server.js`): Manages the blockchain, handles incoming transactions, and coordinates the mining process.
2. **Frontend** (`index.html`): Provides a user interface to interact with the blockchain.

## Setup and Installation

1. Ensure you have [Node.js](https://nodejs.org/) installed on your system.
2. Clone this repository or download the source code.
3. Navigate to the project directory in your terminal.
4. Install the required dependencies:
   ```
   npm install ws crypto
   ```

## Usage

1. Start the central server:
   ```
   node server.js
   ```
2. Open `index.html` in a web browser.
3. Use the "Send Transaction" button to create new transactions.
4. Use the "Mine a Block" button to mine new blocks and add them to the blockchain.

## Core Concepts

This demo implements several key concepts of blockchain technology:

1. **Blockchain**: A chain of blocks, each containing a set of transactions.
2. **Transactions**: Represent the transfer of value between addresses.
3. **Mining**: The process of creating new blocks and adding them to the blockchain.
4. **Proof of Work**: A mechanism to make block creation computationally expensive, securing the blockchain against tampering.

## Proof of Work

In this demo, the Proof of Work mechanism is simplified:

- A block hash must start with a certain number of zeros (e.g., '000').
- The server increments a nonce value and recalculates the block hash until this condition is met.
- This process is computationally intensive, mimicking the resource commitment in actual blockchain networks.

```javascript
while (!newBlock.hash?.startsWith('000')) {
    newBlock.nonce++;
    newBlock.hash = calculateHash(newBlock);
}
```

## Limitations and Educational Purpose

This demo is intentionally simplified and centralized for educational purposes. It differs from actual blockchain networks in several key ways:

- It's centralized, whereas real blockchains are typically decentralized.
- The Proof of Work mechanism is greatly simplified.
- There's no real consensus mechanism as there's only one node (the central server).
- Security measures are minimal.

These simplifications allow for easier understanding of core blockchain concepts but make this implementation unsuitable for any real-world use.

## Further Reading
Refer to the Bitcoin whitepaper:

[Bitcoin: A Peer-to-Peer Electronic Cash System](https://bitcoin.org/bitcoin.pdf) by Satoshi Nakamoto

This seminal paper introduced the concept of blockchain as a solution to the double-spending problem in digital currencies.
