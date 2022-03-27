// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract Transactions {

  uint256 transactionCount;

  event Transact(address from, address to, string message, uint amount, uint256 timestamp, string keyword);

  struct TransferStruct {
    address sender;
    address receiver;
    uint amount;
    string message;
    uint256 timestamp;
    string keyword;
  }

  TransferStruct[] transactions;

  function addToBlockChain(address payable _receiver, string memory _message, uint _amount, string memory _keyword) public {
    transactionCount += 1;
    transactions.push(TransferStruct(msg.sender, _receiver, _amount, _message, block.timestamp, _keyword));

    emit Transact(msg.sender, _receiver, _message, _amount, block.timestamp, _keyword);
  }

  function getAllTransactions() public view returns (TransferStruct[] memory) {
    return transactions;
  }

  function getTransactionCount() public view returns (uint256) {
    return transactionCount;
  } 

}