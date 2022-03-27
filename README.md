# Send Crypto
Web 3.0 Blockchain App

## Introduction
Build a Web 3.0 Blockchain App that enables crypto users to transfer Eth to another wallet.

![Screen Shot 2022-03-27 at 2 05 58 pm](https://user-images.githubusercontent.com/58450399/160266176-fc3c3c8e-de56-4cdc-add8-951bc0242874.png)

First, users must have MetaMask installed in their browser for utitlisng the functions in this all. Users are then able to connect their wallets, specify the wallet address to send to, with a message and keyword Gifs attatched. The transanction will be sent through, after paying gas fee for transaction cost, as well as adding a transaction block onto the smart contract (Check the transaction details on the Ropsten **Etherscan** from MetaMask's activity log). Once transanction is complete, users should be able to see the transaction history, with the address sent from, and to, as well as a message log and a Gif image.

![Screen Shot 2022-03-27 at 2 05 42 pm](https://user-images.githubusercontent.com/58450399/160266168-ca8cafce-042e-4b3d-b9ca-dfa53a55b690.png)


This project here is developed using **Vite.js**, with **Hardhat** and **Waffle** for contract developing and testing. **Ropsten network** was used as our test network, and retrieved faucets from https://faucet.egorfine.com. **Alchemy** was used as our node provider. In there, we created a new app, configured using the Development environment, Ethereum chain and Ropsten network. 


## Configuration
To run client side:
```
cd client
npm run dev
```

To deploy contract to the Ropsten network:
```
cd smart_contract![Screen Shot 2022-03-27 at 2 05 19 pm](https://user-images.githubusercontent.com/58450399/160266158-4216bad8-96fb-49d5-a955-cbfde5ac372f.png)

npx hardhat run scripts/deploy.js --network ropsten
```
- If transaction was successful, it should console log the contract address deployed to the network
- Copy the _contract address_, go to "/client/src/utils/constants.js", switch `contractAddress` to the new address

Hardhat configuration:

1) Once a new app has been configured on **Alchemy**, retrieve the key (API Key, Http or WebSocket) 
    - _NOTE: (Http URL was used in this project)_
3) Choose a wallet (on Metamask) to be used for interacting with the smart contract, and retrieve the private key.
4) Add both keys into `hardhat.config` file, specifying in using the `ropsten` network.

_Remember to include `require('@nomiclabs/hardhat-waffle')` in HardHat config file_.

## Installation
Initialising Vite.js for client side:
```
npm init vite@latest
```

Add `tailwind.config.js` file under `./client`:
```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Create `package.json` file under `./smart_contract`:
```
npm init -y
```

Dependecies needed to install for `./smart_contract`:
```
npm install --save-dev hardhat @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers
```

Create a basic project structure:
```
npx hardhat
```
