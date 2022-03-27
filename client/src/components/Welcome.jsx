import { useContext } from 'react';

import { AiFillPlayCircle } from 'react-icons/ai';
import { SiEthereum } from 'react-icons/si';
import { BsInfoCircle } from 'react-icons/bs';

import { TransactionContext } from '../context/TransactionContext';
import { Loader } from './';
import { shortenAddress } from '../utils/shortenAddress';

const Input = ({ placeholder, name, type, handleChange}) => {
  return (
    <input 
      placeholder={placeholder}
      name={name}
      step="0.0001"
      type={type}
      onChange={(e) => handleChange(e, name)}
      className="border-none outline-none w-full p-2 rounded-sm my-2 bg-transparent white-glassmorphism text-sm text-white"
    />
  )
}

const Welcome = () => {
  const { connectWallet, currentAccount, formData, handleChange, sendTransactions, isLoading } = useContext(TransactionContext);
  
  const commonStyles = "text-white text-sm font-normal flex justify-center items-center border-[1px] border-gray-400 min-h-[70px] sm:min-w-[120px] sm:px-0 px-2"

  const handleSubmit = (e) => {
    const { addressTo, amount, message, keyword } = formData;
    e.preventDefault();

    if (!addressTo || !amount || !message || !keyword ) return;

    sendTransactions();
  }

  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">

        {/* Left Section */}
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
          <h1 className="text-white text-gradient text-5xl py-1">
            Send Crypto <br /> across the world
          </h1>
          <p className="text-white text-left mt-5 font-light md:w-9/12 w-11/12 text-base">
            Explore the crypto world. Buy and sell cryptocurrencies easily on Krypto
          </p>

          {!currentAccount && (
            <button
              type="submit"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] hover:bg-[#2546bd] p-3 rounded-full cursor-pointer" 
            >
              <AiFillPlayCircle className="text-white mr-2" />
              <p className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
          )}

          <div className="grid md:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${commonStyles}`}>
              Reliability
            </div>
            <div className={`${commonStyles}`}>Security</div>
            <div className={`rounded-tr-2xl ${commonStyles}`}>
              Ethereum
            </div>
            <div className={`rounded-bl-2xl ${commonStyles}`}>
              Web 3.0
            </div>
            <div className={`${commonStyles}`}>Low fees</div>
            <div className={`rounded-br-2xl ${commonStyles}`}>
              BlockChain
            </div>
          </div>
        </div>
        
        {/* Right Section */}
        <div className="flex flex-1 flex-col justify-start items-center w-full mf:mt-0 mt-10">
          {/* Card Section */}
          <div className="eth-card .white-glassmorphism sm:w-72 w-full h-40 rounded-xl p-3 my-5 ">
            <div className="flex flex-col justify-between w-full h-full">
              <div className="flex justify-between items-start">
                <div className="border-2 border-white rounded-full w-10 h-10 flex justify-center items-center">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <p className="text-sm font-light text-white">
                  {currentAccount ? (shortenAddress(currentAccount)) : "0xweff...sdfefw"}
                </p>
                <p className="text-white font-semibold text-lg mt-1">
                  Ethereum
                </p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <Input placeholder="Address to" name="addressTo" type="text" handleChange={handleChange}/>
            <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange}/>
            <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange}/>
            <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange}/>

            <div className="h-[1px] w-full bg-gray-400 my-2"></div>

            {isLoading ? (
              <Loader />
            ) : (
              <button
                type="submit"
                onClick={handleSubmit}
                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
              >
                Send Now
              </button>
            )}
          </div>

        </div>

        


      </div>
    </div>
  )
}

export default Welcome;