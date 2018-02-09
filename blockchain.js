$(document).ready(function () {
  let i = 0;
  let number = 0;
  let genesis = false;
  class Block {
    constructor(index, timestamp, data, previousHash) {
      this.index = "<strong>" + index + "</strong>";
      this.timestamp = `<strong>` + timestamp + `</strong>`;
      this.data = `<strong>` + data + `</strong>`;
      this.previousHash = `<strong>` + previousHash + `</strong>`;
      this.Hash = "<strong>" + this.calculateHash() + "</strong>";
    }
    calculateHash() {
      return sha256(this.index + this.timestamp + JSON.stringify(this.data)).toString();
    }
  }
  class BlockChain {
    constructor() {
      this.chain = [this.createGenesisBlock()];
    }
    createGenesisBlock() {
      return new Block(i, new Date().toLocaleString(), "Genesis Block");
    }
    getLast() {
      return this.chain[this.chain.length - 1];
    }
    addBlock(newBlock) {
      if(genesis===false){
        newBlock.Hash = newBlock.calculateHash();
        this.chain.push(newBlock);
        genesis=true;
      }
      else{
        newBlock.previousHash = "<strong>" + this.getLast().Hash + "</strong>";
        newBlock.Hash = newBlock.calculateHash();
        this.chain.push(newBlock);
      }
    }
  }
  let kappaCoin = new BlockChain();

  function addNew() {
      // if(genesis===false){
      //   kappaCoin.addBlock(new Block(i,time.toLocaleString(),inputData));
      // }
      number++;
      const inputData = $("#inputField").val();
      let time = new Date();
      kappaCoin.addBlock(new Block(i, time.toLocaleString(), inputData));
      i++;
  }
  ///Keydown ENTER function
  $(document).keydown(function (key) {
    if (key.keyCode == 13) {
      $("#inputData").trigger("click");
    }
  });
  /////
  $("#inputData").click(function () {
    addNew();
    
   
    kappaCoin.chain.forEach(function (newChain) {
      $("#outputData").append("<div id='" + number + "' class='col-md-12'></div>");
      $("#" + number).html(JSON.stringify(newChain, null, '<br/>').replace(/[{}"']/g, ""));
    });

    $("#inputField").val("");
  });


  $("#Restart").click(function () {
    genesis = false;
    i = 0;
    kappaCoin.chain = [kappaCoin.createGenesisBlock()];
    $("#inputField").val('');
    $("#outputData").html('');
    number = 0;
  });
});