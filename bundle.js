(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
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
},{}]},{},[1]);
