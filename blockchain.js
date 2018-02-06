const SHA256 = require("crypto-js/sha256");
class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }
    mineBlock(difficulty) {
	    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
	        this.nonce++;
	        this.hash = this.calculateHash();
	    }
	    console.log("BLOCK MINED: " + this.hash);
	}

    calculateHash() {
	    return SHA256(this.index +
	        this.previousHash +
	        this.timestamp +
	        JSON.stringify(this.data) +
	        this.nonce
	    ).toString();
	}
}

class Blockchain{
    constructor() {
	    this.chain = [this.createGenesisBlock()];
	    this.difficulty = 1;
	}

    createGenesisBlock() {
        return new Block(0, "01/01/2018", "Genesis block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
	    newBlock.previousHash = this.getLatestBlock().hash;
	    newBlock.mineBlock(this.difficulty);
	    this.chain.push(newBlock);
	}

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

let darkyCoin = new Blockchain();
darkyCoin.addBlock(new Block(1, Date.now(), { amount: 4 }));
darkyCoin.addBlock(new Block(2, Date.now(), { amount: 8 }));

// Check if chain is valid (will return true)
console.log('Blockchain valid? ' + darkyCoin.isChainValid());

//  manipulate the data
darkyCoin.chain[1].data = { amount: 100 };

// Check our chain again (will now return false)
console.log("Blockchain valid? " + darkyCoin.isChainValid());


