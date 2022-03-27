import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers'; // Ethers.js vs Web3.js

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window; // MetaMask Docs, Ethereum Provider API

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

  // console.log({
  //   provider,
  //   signer,
  //   transactionContract
  // })
  return transactionContract;

}

export const TransactionProvider = ({ children }) => {

  const [currentAccount, setCurrentAccount] = useState("");
  const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
  const [transactions, setTransactions] = useState([]);

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  }

  const getAllTransactions = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask");

      const transactionContract = getEthereumContract();
      const availableTransactions = await transactionContract.getAllTransactions();


      const structuredTransactions = availableTransactions.map((transaction) => ({
        addressTo: transaction.receiver,
        addressFrom: transaction.sender,
        timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
        message: transaction.message,
        keyword: transaction.keyword,
        amount: parseInt(transaction.amount._hex) / (10 ** 18)
      }))

      // console.log(availableTransactions, 'availableTransactions')
      setTransactions(structuredTransactions);
      // console.log(structuredTransactions);
    } catch (error) {
      console.log(error);
    } 
  }

  const connectWallet = async() => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log(accounts, 'Connect Wallet');
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("No Ethereum object.");
    }
  }

  const checkIfTransactionsExist = async() => {
    try {
      const transactionContract = getEthereumContract();
      const transactionsCount = await transactionContract.getTransactionCount();

      window.localStorage.setItem("transactionCount", transactionsCount);

    } catch (error) {
      console.log(error);
      throw new Error("No Ethereum object.");
    }
  }

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask");
      const accounts = await ethereum.request({method: 'eth_accounts'});

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        getAllTransactions();
      } else {
        console.log("No accounts found")
      }
    } catch (error) {
      console.log(error);
      throw new Error("No Ethereum object.");
    }
  }

  const sendTransactions = async () => {
    try {
      if (!ethereum) alert("Please install MetaMask");

      const { addressTo, amount, message, keyword } = formData;
      const transactionContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);

      // sending eth through metamask
      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: currentAccount,
          to: addressTo,
          gas: '0x5208', // 21000 GWEI
          value: parsedAmount._hex, // 0.0001
        }]
      });

      console.log(parsedAmount);

      const transactionHash = await transactionContract.addToBlockChain(addressTo, message, parsedAmount, keyword);

      setIsLoading(true);
      console.log(`Loading - ${transactionHash.hash}`);
      await transactionHash.wait();
      setIsLoading(false);
      console.log(`Complete - ${transactionHash.hash}`);

      const transactionsCount = await transactionContract.getTransactionCount();
      setTransactionCount(transactionsCount.toNumber());

      window.location.reload()
    } catch (error) {
      console.log(error);
      throw new Error("No Ethereum object.");
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionsExist();
  }, [])

  return (
    <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, handleChange, sendTransactions, transactions, isLoading }}>
      {children}
    </TransactionContext.Provider>
  )
}